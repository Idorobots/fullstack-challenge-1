import * as preact from "preact";
import * as styles from "./error.css";

interface Props {
  message?: string;
}

export const Error = (props: Props) => (
  <div className={styles.errorWrapper + " " + (props.message === undefined ? "" : styles.visible)}>
    <div className={styles.errorMessage}>
      { props.message }
    </div>
  </div>
);
