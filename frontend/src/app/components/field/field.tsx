import * as preact from "preact";
import { Field as FieldContents } from "../../store/main";
import * as styles from "./field.css";

interface Props {
  contents: FieldContents;
  onClick?: () => void;
}

export const Field = (props: Props) => (
  <div className={styles.fieldWrapper}>
    { props.contents.type }
  </div>
);
