import { observer } from "mobx-observer";
import * as preact from "preact";
import { UserActions } from "../../actions/user";
import { Button } from "../../components/button/button";
import { Field } from "../../components/field/field";
import { ApiService } from "../../services/api";
import { MainStore } from "../../store/main";
import * as styles from "./controlPanel.css";

interface Props {
  store: MainStore;
  api: ApiService;
}

@observer
export class ControlPanel extends preact.Component<Props, any> {
  private userActions: UserActions;

  constructor(props: Props) {
    super(props);
    this.userActions = new UserActions(props.store);
  }

  render () {
    return (
      <div className={styles.panelWrapper}>
        <Field contents={this.props.store.selectedField}
               isSelected={true} />
        <div className={styles.separator} />
        { this.props.store.availableFields.map((field) => (
            <div className={styles.controlWrapper}>
              <Field contents={field}
                     onClick={() => this.userActions.fieldSelected(field)}
                     isSelected={false} />
            </div>
          ))
        }
        <div className={styles.separator} />
        <div className={styles.controlWrapper}>
          <Button value="Clear"
                  onClick={() => this.userActions.boardCleared()}
                  isEnabled={true} />
        </div>
        <div className={styles.controlWrapper}>
          <Button value="Solve!"
                  onClick={() => {
                    this.props.api.solve(this.props.store.boardDim, this.props.store.board).then((path) => {
                      this.userActions.boardSolved(path);
                    }).catch((error) => {
                      console.error(error);
                      this.userActions.errored("The board cannot be solved!");
                    });
                  }}
                  isEnabled={this.props.store.solveEnabled} />
        </div>
      </div>
    );
  }
}
