type PropType = Record<string, any>;
type StateType = Record<string, any>;

abstract class Component {
  $element: HTMLElement;
  props: PropType = {};
  state: StateType = {};

  constructor(props?: PropType) {
    this.props = props || {};
    this.$element = this.render();
  }

  abstract render(): HTMLElement;

  setState(newState: StateType) {
    this.state = { ...this.state, ...newState };
    this.update();
  }

  update() {
    const newElement = this.render();
    if (this.$element == newElement) {
      this.$element.replaceWith(newElement);
      this.$element = newElement;
    }
  }
}

export default Component;
