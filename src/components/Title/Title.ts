import { ID } from "@/constants/element";
import Component from "@/core/Component";

import "./Title.scss";

interface TitleProps {
  title: string;
}

class Title extends Component {
  constructor(props: TitleProps) {
    super(ID.title, props);
  }

  render() {
    const $title = document.createElement("h1");
    $title.innerText = this.props.title;
    return $title;
  }
}

export default Title;
