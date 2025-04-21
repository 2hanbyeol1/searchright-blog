import Component from "../../../components/Component";
import HTMLFileUploader from "../../../components/HTMLFileUploader";
import WarningText from "../../../components/WarningText";

class Instruction extends Component {
  constructor() {
    super();
  }

  render() {
    const $instruction = document.createElement("div");
    $instruction.id = "instruction";
    const $p = document.createElement("p");
    $p.id = "notion-file-input";
    $p.textContent = "노션에서 ";
    const $strong = document.createElement("strong");
    $strong.textContent = "HTML로 내보낸 파일";
    $p.appendChild($strong);
    $p.append("을 ");
    const htmlFileUploader = new HTMLFileUploader();
    $p.appendChild(htmlFileUploader.$element);
    $p.append(" 해주세요");
    $instruction.append($p);
    const warningText = new WarningText();
    $instruction.appendChild(warningText.$element);
    return $instruction;
  }
}

export default Instruction;
