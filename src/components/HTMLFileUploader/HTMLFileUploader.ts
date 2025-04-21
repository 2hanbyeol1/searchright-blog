import Component from "../Component";

class HTMLFileUploader extends Component {
  constructor() {
    super();
  }

  render() {
    const $htmlFileUploader = document.createElement("input");
    $htmlFileUploader.id = "notion-file";
    $htmlFileUploader.type = "file";
    $htmlFileUploader.accept = ".html";

    const $label = document.createElement("label");
    $label.textContent = "업로드";

    $label.appendChild($htmlFileUploader);

    return $label;
  }
}

export default HTMLFileUploader;
