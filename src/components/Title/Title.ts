import Component from "../Component";

interface TitleProps {
  title: string;
}

class Title extends Component {
  constructor(props: TitleProps) {
    super(props);
  }

  render() {
    const $title = document.createElement("h1");
    $title.innerText = this.props.title;
    return $title;
  }
}

export default Title;
