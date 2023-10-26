import React, { useEffect, useRef } from "react";
import Keyboard from "./Keyboard";
import Row from "./Row";
import { useAtomValue, useUpdateAtom } from "jotai/utils";
import { currentRowAtom, numberOfRowsAtom } from "./store";
import { LOWER_ALPHABET, UPPER_ALPHABET } from "./constants";
import BindKeys from "react-bind-keys";

export default function GameContainer() {
  const containerRef = useRef<HTMLDivElement>(null);
  const numberOfRows = useAtomValue(numberOfRowsAtom);
  const { performWordValidationAtom, setLetterAtom, deleteLetterAtom } =
    useAtomValue(currentRowAtom);

  const performWordValidation = useUpdateAtom(performWordValidationAtom);
  const deleteLetter = useUpdateAtom(deleteLetterAtom);
  const setLetter = useUpdateAtom(setLetterAtom);

  const keyHandlers = {
    SUBMIT: performWordValidation,
    DELETE_LETTER: deleteLetter,
    SET_LETTER: (e: React.KeyboardEvent) => {
      setLetter(e.key);
    },
    NOOP: () => {},
  };

  const keyMap = {
    SET_LETTER: [...LOWER_ALPHABET, ...UPPER_ALPHABET],
    DELETE_LETTER: ["backspace"],
    SUBMIT: ["enter"],
    NOOP: ["meta+r"],
  };

  useEffect(() => {
    containerRef.current?.focus();
  }, []);

  return (
    <BindKeys keyMap={keyMap} keyHandlers={keyHandlers}>
      <div ref={containerRef} tabIndex={-1} style={{ outline: "none" }}>
        {[...new Array(numberOfRows)].map((_, index) => {
          return <Row index={index} key={index} />;
        })}
        <Keyboard deleteLetter={deleteLetter} setLetter={setLetter} />
      </div>
    </BindKeys>
  );
}
