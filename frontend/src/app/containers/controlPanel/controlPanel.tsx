import { observer } from "mobx-observer";
import * as preact from "preact";
import { Button } from "../../components/button/button";
import { Field } from "../../components/field/field";
import { MainStore } from "../../store/main";
import * as styles from "./controlPanel.css";

interface Props {
  store: MainStore;
}

@observer
export class ControlPanel extends preact.Component<Props, any> {
  onClick() {
    console.log("Control panel clicked!");
  }

  render () {
    return (
      <div className={styles.panelWrapper}>
        Control panel.
        <Field />
        <Field />
        <Button onClick={this.onClick} />
      </div>
    );
  }
}
