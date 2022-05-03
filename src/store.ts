import { WORDS } from "./wordlist";
import { atom } from "jotai";
import {
  ALLOWED_ATTEMPTS,
  ALLOWED_LETTERS,
  ValidationResult,
} from "./constants";

function getNumberOfDays(start: Date, end: Date) {
  // One day in milliseconds
  const oneDay = 1000 * 60 * 60 * 24;

  // Calculating the time difference between two dates
  const diffInTime = start.getTime() - end.getTime();

  // Calculating the no. of days between two dates
  const diffInDays = Math.round(diffInTime / oneDay);

  return Math.abs(diffInDays);
}
const startDate = new Date("2/4/2022");
const currentDate = new Date();
export const wordAtom = atom(WORDS[getNumberOfDays(startDate, currentDate)]);
export const lettersUsed = [];

export const currentRowIndexAtom = atom(0);

export const lettersUsedAtom = atom({});

export function createRowAtom() {
  const currentWordAtom = atom("");
  const setLetterAtom = atom(null, (_, set, letter: string) => {
    set(currentWordAtom, (currentWord) => {
      console.log(currentWord.length);
      return `${currentWord}${letter}`;
    });
  });

  const deleteLetterAtom = atom(null, (_, set) => {
    set(
      currentWordAtom,
      (currentWord) => currentWord.slice(0, currentWord.length - 1),
    );
  });

  return {
    currentWordAtom,
    setLetterAtom,
    deleteLetterAtom,
  };
}

const getValidationResult = (
  actualWord: string,
  testWord: string,
): ValidationResult[] => {
  if (WORDS.indexOf(testWord) < 0) {
    return [];
  }
  return testWord.split("").map((letter, index) => {
    if (actualWord[index] === letter) {
      return ValidationResult.PerfectLetter;
    }
    if (actualWord.indexOf(letter) >= 0) {
      return ValidationResult.CorrectLetter;
    }
    return ValidationResult.WrongLetter;
  });
};

export function newCreateRowAtom() {
  const currentWordAtom = atom("");
  const validationResultAtom = atom<ValidationResult[]>([]);
  const setLetterAtom = atom(null, (_, set, letter: string) => {
    set(currentWordAtom, (currentWord) => {
      if (currentWord.length >= ALLOWED_LETTERS) {
        return currentWord;
      }
      return `${currentWord}${letter}`;
    });
  });

  const deleteLetterAtom = atom(null, (_, set) => {
    set(
      currentWordAtom,
      (currentWord) => currentWord.slice(0, currentWord.length - 1),
    );
  });

  const performWordValidationAtom = atom(null, (get, set) => {
    const word = get(wordAtom);
    const currentWord = get(currentWordAtom);
    const validationResult = getValidationResult(word, currentWord);

    set(validationResultAtom, validationResult);

    if (validationResult.length > 0) {
      set(
        currentRowIndexAtom,
        (index) => Math.min(ALLOWED_ATTEMPTS - 1, index + 1),
      );
    }
  });

  return {
    performWordValidationAtom,
    validationResultAtom,
    currentWordAtom,
    setLetterAtom,
    deleteLetterAtom,
  };
}

export const rowAtoms = atom(
  [...new Array(ALLOWED_ATTEMPTS)].map(() => newCreateRowAtom()),
);

export const numberOfRowsAtom = atom((get) => {
  const rows = get(rowAtoms);
  return rows.length;
});

export const getAtomForRowIndex = (rowIndex: number) =>
  atom((get) => {
    const rows = get(rowAtoms);
    return rows[rowIndex];
  });

export const currentRowAtom = atom((get) => {
  const currentRowIndex = get(currentRowIndexAtom);
  const rows = get(rowAtoms);

  return rows[currentRowIndex];
});
