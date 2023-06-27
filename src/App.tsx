import { ChangeEvent, useState } from "react";
import { useTyper } from "./hooks/useTyper";

const words = "Imagination and more...";

function App() {
  const [value, setValue] = useState("");
  const { handlePress, status, setStatus } = useTyper(value, words);

  // check if the letter exist on wrong letter list
  const isLetterWrong = (letterIndex: number): boolean => {
    return status.badKeys.includes(letterIndex);
  };

  // manage the input change event
  const handleChange = (event: ChangeEvent<HTMLInputElement>) => {
    if (event.target.value == "") {
      setStatus({
        wrong: false,
        badKeys: [],
      });
    }
    setValue(event.target.value);
  };

  return (
    <div>
      <h1>Doom Type</h1>
      <div className="words">
        {words.split("").map((letter, i) => (
          <span
            key={i}
            style={{ color: `${isLetterWrong(i) ? "red" : "inherit"}` }}
          >
            {letter}
          </span>
        ))}
      </div>
      <input
        type="text"
        value={value}
        onChange={handleChange}
        onKeyDown={handlePress}
        maxLength={words.length}
      />
    </div>
  );
}

export default App;
