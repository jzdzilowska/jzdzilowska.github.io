import "../styles/main.css";
import { Dispatch, SetStateAction, useState } from "react";
import { ControlledInput } from "./ControlledInput";
import {
  mockedLoadData,
  mockedSearchData,
  mockedViewData,
} from "../data/mockedJson";
import { HistoryItem } from "../types/HistoryItem";

/**
 * Props for the REPLInputProps component.
 */
interface REPLInputProps {
  history: HistoryItem[];
  setHistory: Dispatch<SetStateAction<HistoryItem[]>>;
  mode: string;
  setMode: (newMode: string) => void;
  commandResultMap: Map<HistoryItem, any>;
  updateCommandResult: (command: string, output: any) => void;
}

/**
 * React component responsible for handling user input and executing commands.
 * @param {REPLInputProps} props - The properties required for rendering the component.
 */
export function REPLInput(props: REPLInputProps) {
  const [loadedDataset, setLoadedDataset] = useState<string | null>(null);
  const [commandString, setCommandString] = useState<string>("");
  const [count, setCount] = useState<number>(0);
  const {
    mode,
    setMode,
    history,
    setHistory,
    commandResultMap,
    updateCommandResult,
  } = props;

  /**
   * Function triggered when the "Submit" button is clicked to process the user's command.
   * @param {string} commandString - The command entered by the user.
   */
  function handleSubmit(commandString: string) {
    const trimmedCommand = commandString.trim();
    if (trimmedCommand === "") {
      alert("Command cannot be empty");
      return;
    }
    if (trimmedCommand === "mode") {
      alert("Missing mode type");
      return;
    }
    const modeMatch = trimmedCommand.match(/^mode\s+(.+)/i);
    if (modeMatch) {
      const newMode = modeMatch[1].trim();
      handleMode(newMode);
    } else {
      const input: string[] = trimmedCommand.split(/\s+/);
      if (input[0] === "load_file") {
        handleLoadFile(input);
      } else if (input[0] === "view") {
        handleViewFile();
      } else if (input[0] === "search") {
        handleSearchFile(commandString.trim());
      } else {
        const wrongResult = "Invalid command: " + commandString;
        updateCommandResult(commandString, wrongResult);
      }
      setCount(count + 1);
    }
    setCommandString("");
  }

  /**
   * Function to handle changing the mode of the REPL interface.
   * @param {string} input - The new mode to set.
   */
  function handleMode(input: string) {
    const validModes = ["brief", "verbose"];
    if (validModes.includes(input)) {
      setMode(input);
      updateCommandResult(commandString, "Mode changed to " + input);
    } else {
      alert("Invalid mode: " + input + ". Use brief or verbose");
    }
  }

  /**
   * Function to handle loading a file and updating the loaded dataset.
   * @param {string[]} input - The command and arguments for loading a file.
   */
  function handleLoadFile(input: string[]) {
    const loadResult = mockedLoadData(input, setLoadedDataset);
    updateCommandResult(commandString, loadResult);
  }

  /**
   * Function to handle viewing the loaded dataset.
   */
  function handleViewFile() {
    const viewResult = mockedViewData(loadedDataset);
    updateCommandResult(commandString, viewResult);
  }

  /**
   * Function to handle searching within the loaded dataset.
   * @param {string} trimmedCommand - The trimmed search command.
   */
  function handleSearchFile(trimmedCommand: string) {
    const searchResult = mockedSearchData(trimmedCommand, loadedDataset);
    updateCommandResult(commandString, searchResult);
  }

  return (
    <div className="repl-input">
      <fieldset>
        <legend>Enter a command:</legend>
        <ControlledInput
          value={commandString}
          setValue={setCommandString}
          ariaLabel={"Command input"}
        />
      </fieldset>
      <button onClick={() => handleSubmit(commandString)}>
        Submitted {count} times
      </button>
    </div>
  );
}
