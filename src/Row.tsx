import { useAtomValue, useUpdateAtom } from "jotai/utils";
import React, { useMemo } from "react";
import { ALLOWED_LETTERS } from "./constants";
import LetterSlot from "./LetterSlot";
import { getAtomForRowIndex } from "./store";

function Row({ index }: { index: number }) {
  const { currentWordAtom, setLetterAtom, deleteLetterAtom, validationResultAtom } = useAtomValue(
    useMemo(() => getAtomForRowIndex(index), [index])
  );

  const deleteLetter = useUpdateAtom(deleteLetterAtom);
  const setLetter = useUpdateAtom(setLetterAtom);
  const currentWord = useAtomValue(currentWordAtom);
  const validationResult = useAtomValue(validationResultAtom);

  return (
    <div style={{ display: "flex", outline: "none" }}>
      {[...new Array(ALLOWED_LETTERS)].map((_, letterSlotIndex) => {
        return (
          <LetterSlot
            isActive={true}
            validationResult={validationResult[letterSlotIndex]}
            currentLetter={currentWord[letterSlotIndex] || ""}
            onPressLetter={setLetter}
            onDeleteLetter={deleteLetter}
            key={letterSlotIndex}
          />
        );
      })}
    </div>
  );
}

export default React.memo(Row);
