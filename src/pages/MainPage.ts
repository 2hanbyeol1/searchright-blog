import Component from "../components/Component";
import Title from "../components/Title";
import FormattedFileEditor from "./components/FormattedFileEditor";
import Instruction from "./components/Instruction";

class MainPage extends Component {
  constructor() {
    super();
  }

  render() {
    const $app = document.createElement("main");
    $app.id = "app";

    const title = new Title({ title: "서치라이트 블로그 포매터" });
    $app.appendChild(title.$element);

    const instruction = new Instruction();
    $app.appendChild(instruction.$element);

    const formattedFileEditor = new FormattedFileEditor();
    $app.appendChild(formattedFileEditor.$element);

    return $app;
  }
}

export default MainPage;
