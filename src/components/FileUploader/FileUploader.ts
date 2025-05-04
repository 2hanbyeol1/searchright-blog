import { ID } from "@/constants/element";
import Component from "@/core/Component";
import { getDivById } from "@/util/elementUtil";

import "./FileUploader.scss";

interface FileUploaderProps {
  text: string;
  onFileUpload: (e: Event) => void;
}

class FildUploader extends Component {
  constructor(props: FileUploaderProps) {
    super(ID.fileUploader, props);
  }

  render() {
    const $fileUploader = document.createElement("div");

    const $label = document.createElement("label");
    $label.textContent = this.props.text;

    const $input = document.createElement("input");
    $input.type = "file";
    $input.accept = ".html";

    $fileUploader.appendChild($label);
    $label.appendChild($input);

    $input?.addEventListener("change", this.props.onFileUpload);

    return $fileUploader;
  }
}

export function hideFileUploader() {
  const $fileUploader = getDivById(ID.fileUploader);
  $fileUploader.style.display = "none";
}

export default FildUploader;
