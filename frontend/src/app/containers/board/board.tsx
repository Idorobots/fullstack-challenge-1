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
        { this.props.store.board.map((field) => (
            // TODO Update the board contents.
            <Field contents={field} onClick={this.onClick} />
          ))
        }
      </div>
    );
  }
}
