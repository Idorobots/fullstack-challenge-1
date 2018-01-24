import { observer } from "mobx-observer";
import * as preact from "preact";
import { Error } from "../../components/error/error";
import { ApiService } from "../../services/api";
import { MainStore } from "../../store/main";
import { Board } from "../board/board";
import { ControlPanel } from "../controlPanel/controlPanel";
import * as styles from "./mainContainer.css";

interface Props {
  store: MainStore;
  api: ApiService;
}

@observer
export class MainContainer extends preact.Component<Props, any> {
  render () {
    return (
      <div className={styles.mainWrapper}>
        <ControlPanel store={this.props.store} api={this.props.api} />
        <Board store={this.props.store} />
        <Error message={this.props.store.error}/>
      </div>
    );
  }
}
