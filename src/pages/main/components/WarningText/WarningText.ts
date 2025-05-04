import { ID } from "@/constants/element";
import Component from "@/core/Component";
import { getDivById } from "@/util/elementUtil";

import "./WarningText.scss";

class WarningText extends Component {
  constructor() {
    super(ID.warningText);
  }

  render() {
    const $warningText = document.createElement("div");
    $warningText.style.display = "none";
    return $warningText;
  }
}

export function updateWarningMessage(text: string) {
  const $warningText = getDivById(ID.warningText);
  const count = (text.match(/!!!!!/g) || []).length;
  $warningText.innerHTML = `<strong>${count}개 항목의 수정이 필요합니다</strong> (ctrl + f로 !!!!! 를 검색하세요)`;
  $warningText.style.display = count > 0 ? "block" : "none";
}

export default WarningText;
