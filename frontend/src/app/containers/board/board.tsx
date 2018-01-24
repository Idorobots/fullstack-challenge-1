import { observer } from "mobx-observer";
import * as preact from "preact";
import { UserActions } from "../../actions/user";
import { Field } from "../../components/field/field";
import { MainStore } from "../../store/main";
import * as styles from "./board.css";

interface Props {
  store: MainStore;
}

@observer
export class Board extends preact.Component<Props, any> {
  private userActions: UserActions;

  constructor(props: Props) {
    super(props);
    this.userActions = new UserActions(props.store);
  }

  private iota(n: number): Array<number> {
    return Array.from(new Array(n).keys());
  }

  render () {
    return (
      <div className={styles.boardWrapper}>
        <table className={styles.board}>
        { this.iota(this.props.store.boardDim.y).map((y) => (
            <tr className={styles.boardRow}>
              { this.iota(this.props.store.boardDim.x).map((x) => (
                (
                  <td className={styles.boardField}>
                    <Field contents={this.props.store.getBoard(x, y)}
                           onClick={() => this.userActions.boardClicked(x, y)}
                           isSelected={this.props.store.solvedPath.find((c) => c.x === x && c.y === y) !== undefined} />
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
