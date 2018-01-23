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

  onClick() {
    console.log("Control panel clicked!");
  }

  render () {
    return (
      <div className={styles.panelWrapper}>
        <div className={styles.selected}>
          <Field contents={this.props.store.selectedField} />
        </div>
        { this.props.store.availableFields.map((field) => (
            <Field contents={field}
                   onClick={() => this.userActions.fieldSelected(field)} />
          ))
        }
        <Button onClick={this.onClick} />
      </div>
    );
  }
}
