import React from "react";

const KeyboardKey = function (
  { keyboardKey, onClick }: { keyboardKey: string; onClick: () => void },
) {
  return (
    <div
      onClick={onClick}
      style={{
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        margin: 1,
        color: "white",
        backgroundColor: "gray",
        width: 30,
        height: 30,
        cursor: "pointer",
        borderRadius: 3,
      }}
    >
      {keyboardKey}
    </div>
  );
};
export default function Keyboard(
  { setLetter, deleteLetter }: {
    deleteLetter: () => void;
    setLetter: (key: string) => void;
  },
) {
  const keys = [
    ["q", "w", "e", "r", "t", "y", "u", "i", "o", "p"],
    ["a", "s", "d", "f", "g", "h", "j", "k", "l"],
    ["z", "x", "c", "v", "b", "n", "m", "⌫"],
  ];

  return (
    <div>
      {keys.map((keysInRow, keyRowIndex) => (
        <div
          style={{ display: "flex", justifyContent: "center" }}
          key={keyRowIndex}
        >
          {keysInRow.map((key) => (
            <KeyboardKey
              onClick={() => {
                if (key === "⌫") {
                  deleteLetter();
                } else {
                  setLetter(key);
                }
              }}
              keyboardKey={key}
              key={key}
            />
          ))}
        </div>
      ))}
    </div>
  );
}
