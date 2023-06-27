import { useState, KeyboardEvent } from "react";

interface StatusType {
  wrong: boolean;
  badKeys: number[];
}

export const useTyper = (value: string, words: string) => {
  const [status, setStatus] = useState<StatusType>({
    wrong: false,
    badKeys: [],
  });

  // catch when the pressed key is a mod key
  const catchMod = (key: string) => {
    if (key !== "Backspace") return;
    if (!status.badKeys.includes(value.length - 1)) return;
    const newArr = [...status.badKeys].filter(
      (item) => item !== value.length - 1
    );
    setStatus({ ...status, badKeys: newArr });
  };

  // check if the pressed key is a mod key.
  const isModKey = (key: string): boolean => {
    if (
      key === "Backspace" ||
      key === "Alt" ||
      key === "Control" ||
      key === "Esc" ||
      key === "Shift"
    )
      return true;
    return false;
  };

  // check if the pressed key is the correct
  const check = (currentKey: string) => {
    const i = value.length;
    // check if the current key is correct
    if (currentKey === words[i]) return;
    setStatus({
      wrong: true,
      badKeys: [...status.badKeys, i],
    });
  };

  // manage the event when the user press a key inside the input
  const handlePress = (event: KeyboardEvent<HTMLInputElement>) => {
    const { key } = event;
    if (isModKey(key)) return catchMod(key);
    check(key);
  };

  return { handlePress, status, setStatus };
};
