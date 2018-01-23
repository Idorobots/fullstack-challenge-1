import * as preact from "preact";
import * as styles from "./button.css";

interface Props {
  onClick: () => void;
}

export const Button = (props: Props) => (
  <div className={styles.buttonWrapper}>
    Button.
  </div>
);
