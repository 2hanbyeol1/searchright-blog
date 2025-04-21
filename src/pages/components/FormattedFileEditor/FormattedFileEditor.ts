import Component from "../../../components/Component";

class FormattedFileEditor extends Component {
  constructor() {
    super();
  }

  render() {
    const $textarea = document.createElement("textarea");
    $textarea.readOnly = true;
    $textarea.dataset.testid = "file-editor";
    // ! 경고 메시지 개수 바꾸는 리스너
    // $textarea.addEventListener("keyup", () => {
    //   updateWarningMessage($textarea.value);
    // });
    return $textarea;
  }

  // ! 너무 구려요
  //   updateWarningMessage(text: string) {
  //     const count = (text.match(/!!!!!/g) || []).length;
  //     $warning.innerHTML = `<strong>${count}개 항목의 수정이 필요합니다</strong> (ctrl + f로 !!!!! 를 검색하세요)`;
  //     $warning.style.display = count > 0 ? "block" : "none";
  //   }
}

export default FormattedFileEditor;
