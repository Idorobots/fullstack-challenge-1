import * as preact from "preact";
import { Field as FieldContents } from "../../store/main";
import * as styles from "./field.css";

interface Props {
  contents: FieldContents;
  onClick?: () => void;
  isSelected: boolean;
}

function typeToClass(type: string): string {
  switch (type) {
  case "empty":
    return "";
  case "gravel":
    return styles.gravel;
  case "boulder":
    return styles.boulder;
  case "wh_entrance":
    return styles.whEntrance;
  case "wh_exit":
    return styles.whExit;
  case "start":
    return styles.start;
  case "end":
    return styles.end;
  default:
    return styles.unknown;
  }
}

export const Field = (props: Props) => (
  <div className={styles.fieldWrapper + " " + (props.isSelected ? styles.selected : "")} onClick={props.onClick}>
    <div className={styles.fieldImage + " " + typeToClass(props.contents.type)} />
  </div>
);
