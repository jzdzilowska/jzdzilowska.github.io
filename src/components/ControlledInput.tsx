import "../styles/main.css";
import { Dispatch, SetStateAction } from "react";

/**
 * Props for the ControlledInput component.
 */
interface ControlledInputProps {
  value: string;
  setValue: Dispatch<SetStateAction<string>>;
  ariaLabel: string;
}

/**
 * A controlled input component corresponding to user's input in the command box.
 * Allows for its value to be managed externally.
 * @param {ControlledInputProps} props - The props for the ControlledInput component.
 */
export function ControlledInput({
  value,
  setValue,
  ariaLabel,
}: ControlledInputProps) {
  return (
    <input
      type="text"
      className="repl-command-box"
      value={value}
      placeholder="Enter command here!"
      onChange={(ev) => setValue(ev.target.value)}
      aria-label={ariaLabel}
    ></input>
  );
}
