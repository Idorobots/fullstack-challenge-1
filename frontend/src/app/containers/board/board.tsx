import { observer } from "mobx-observer";
import * as preact from "preact";
import { Field } from "../../components/field/field";
import { MainStore } from "../../store/main";
import * as styles from "./board.css";

interface Props {
  store: MainStore;
}

@observer
export class Board extends preact.Component<Props, any> {
  onClick() {
    console.log("Board clicked!");
  }

  render () {
    return (
      <div className={styles.boardWrapper}>
        Board.
        <Field onClick={this.onClick} />
        <Field onClick={this.onClick} />
        <Field onClick={this.onClick} />
        <Field onClick={this.onClick} />
      </div>
    );
  }
}
