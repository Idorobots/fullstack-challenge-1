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

  iota(n: number): Array<number> {
    return Array.from(new Array(n).keys());
  }

  render () {
    const dimX = this.props.store.boardDim.x;
    return (
      <div className={styles.boardWrapper}>
        <table>
        { this.iota(this.props.store.boardDim.y).map((y) => (
            <tr>
              { this.iota(dimX).map((x) => (
                // TODO Update the board contents.
                (
                  <td>
                    <Field contents={this.props.store.board[y * dimX + x]}
                           onClick={this.onClick} />
                  </td>
                )
              ))
              }
              </tr>
          ))
        }
        </table>
      </div>
    );
  }
}
