import { ID } from "@/constants/element";
import Component from "@/core/Component";
import { getTextareaById } from "@/util/elementUtil";

import { updateWarningMessage } from "../WarningText";

import "./FileEditor.scss";

class FileEditor extends Component {
  constructor() {
    super(ID.fileEditor);
  }

  render(): HTMLTextAreaElement {
    const $textarea = document.createElement("textarea");
    $textarea.readOnly = true;
    $textarea.dataset.testid = "file-editor";

    $textarea.addEventListener("keyup", () => {
      updateWarningMessage($textarea.value);
    });

    return $textarea;
  }
}

export function setTextareaValue(text: string) {
  const $fileEditor = getTextareaById(ID.fileEditor);
  $fileEditor.value = text;
  $fileEditor.readOnly = false;
}

export default FileEditor;
