import "../styles/main.css";
import { HistoryItem } from "../types/HistoryItem";

/**
 * Props for the REPLHistory component.
 */
interface REPLHistoryProps {
  commandHistory: HistoryItem[];
  mode: string;
  commandResultMap: Map<HistoryItem, any>;
}

/**
 * Component responsible for displaying the command history and corresponding results.
 * @param {REPLHistoryProps} props - The properties required for rendering the component.
 */
export function REPLHistory(props: REPLHistoryProps) {
  const { commandHistory, mode, commandResultMap } = props;

  /**
   * Function for rendering different types of data in the command history.
   * @param {any} data - The data to be rendered.
   * @returns {JSX.Element} - The rendered data as JSX.
   */
  const renderData = (data: any) => {
    if (Array.isArray(data) && Array.isArray(data[0])) {
      return (
        <table className="center-table">
          <tbody>
            {data.map((row: string[], rowIndex: number) => (
              <tr key={rowIndex}>
                {row.map((cell: string, cellIndex: number) => (
                  <td key={cellIndex}>{cell}</td>
                ))}
              </tr>
            ))}
          </tbody>
        </table>
      );
    } else if (typeof data === "string") {
      return data;
    } else {
      return JSON.stringify(data);
    }
  };

  return (
    <div className="repl-history">
      <h2>COMMAND HISTORY</h2>
      <ul>
        {commandHistory.map((command, index) => (
          <li key={index}>
            {mode === "brief" ? (
              <div>{renderData(commandResultMap.get(command))}</div>
            ) : (
              <div>
                <div>Command: {command.command}</div>
                <div>Output: {renderData(commandResultMap.get(command))}</div>
              </div>
            )}
          </li>
        ))}
      </ul>
    </div>
  );
}
