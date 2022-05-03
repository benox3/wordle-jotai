import { useAtom } from "jotai";
import React, { useEffect, useRef } from "react";
import { ValidationResult } from "./constants";
import { currentWordAtom } from "./store";

export default function ({
  isActive,
  onPressLetter,
  onDeleteLetter,
  currentLetter,
  validationResult,
}: {
  isActive: boolean;
  currentLetter: string;
  validationResult: ValidationResult;
  onPressLetter: (letter: string) => void;
  onDeleteLetter: () => void;
}) {
  const getValidationResultColor = () => {
    switch (validationResult) {
      case ValidationResult.PerfectLetter: {
        return "#538d4e";
      }
      case ValidationResult.CorrectLetter: {
        return "#b59f3b";
      }
      case ValidationResult.WrongLetter: {
        return "gray";
      }
      default: {
        return "#282c34";
      }
    }
  };

  return (
    <div
      style={{
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        width: 60,
        height: 60,
        margin: 2,
        color: "white",
        textTransform: "uppercase",
        fontFamily: "'Clear Sans', 'Helvetica Neue', Arial, sans-serif",
        fontWeight: 700,
        fontSize: "2rem",
        backgroundColor: getValidationResultColor(),
      }}
    >
      {currentLetter}
    </div>
  );
}
