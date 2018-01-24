import * as preact from "preact";
import { Field as FieldContents } from "../../store/main";
import * as styles from "./field.css";

interface Props {
  contents: FieldContents;
  onClick?: () => void;
  isSelected: boolean;
}

export const Field = (props: Props) => (
    <div className={styles.fieldWrapper + " " + (props.isSelected ? styles.selected : "")} onClick={props.onClick}>
    { props.contents.type }
  </div>
);
