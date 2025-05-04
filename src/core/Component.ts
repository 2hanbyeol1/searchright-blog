import { IdType, PropType } from "@/types";

abstract class Component {
  id: IdType;
  element: HTMLElement;
  props: PropType;

  constructor(id: IdType, props?: PropType) {
    this.id = id;
    this.props = props || {};
    this.element = this.render();
    this.element.id = this.id;
  }

  abstract render(): HTMLElement;
}

export default Component;
