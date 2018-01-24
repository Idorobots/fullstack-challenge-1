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
        <table>
        { this.iota(this.props.store.boardDim.y).map((y) => (
            <tr>
              { this.iota(this.props.store.boardDim.x).map((x) => (
                (
                  <td>
                    <Field contents={this.props.store.getBoard(x, y)}
                           onClick={() => this.userActions.boardClicked(x, y)} />
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
