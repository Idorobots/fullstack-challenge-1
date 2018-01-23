import * as preact from "preact";
import * as styles from "./button.css";

interface Props {
  onClick: () => void;
  value: string;
  isEnabled: boolean;
}

export const Button = (props: Props) => (
  <div className={styles.buttonWrapper}>
    <button disabled={!props.isEnabled} onClick={props.onClick}>
      {props.value}
    </button>
  </div>
);
