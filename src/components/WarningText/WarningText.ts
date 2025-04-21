import Component from "../Component";

class WarningText extends Component {
  constructor() {
    super();
  }

  render() {
    const $warningParagraph = document.createElement("p");
    $warningParagraph.id = "warning";
    $warningParagraph.style.display = "none";
    return $warningParagraph;
  }
}

export default WarningText;
