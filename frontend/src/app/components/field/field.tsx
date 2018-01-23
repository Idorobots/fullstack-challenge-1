import * as preact from "preact";
import * as styles from "./field.css";

interface Props {
  onClick?: () => void;
}

export const Field = (props: Props) => (
  <div className={styles.fieldWrapper}>
    Field.
  </div>
);
