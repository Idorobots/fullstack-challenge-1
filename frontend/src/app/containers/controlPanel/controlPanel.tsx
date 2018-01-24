import { observer } from "mobx-observer";
import * as preact from "preact";
import { UserActions } from "../../actions/user";
import { Button } from "../../components/button/button";
import { Field } from "../../components/field/field";
import { MainStore } from "../../store/main";
import * as styles from "./controlPanel.css";

interface Props {
  store: MainStore;
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
        <div className={styles.controlWrapper + " " + styles.selected}>
          <Field contents={this.props.store.selectedField} />
        </div>
        { this.props.store.availableFields.map((field) => (
            <div className={styles.controlWrapper}>
              <Field contents={field}
                     onClick={() => this.userActions.fieldSelected(field)} />
            </div>
          ))
        }
        <div className={styles.controlWrapper}>
          <Button value="Clear"
                  onClick={() => this.userActions.boardCleared()}
                  isEnabled={true} />
        </div>
        <div className={styles.controlWrapper}>
          <Button value="Solve!"
                  onClick={() => console.log("Path finding not yet implemented!")}
                  isEnabled={this.props.store.solveEnabled} />
        </div>
      </div>
    );
  }
}
