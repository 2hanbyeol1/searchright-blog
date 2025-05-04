import { IdType, PropType } from "@/types";
import Component from "./Component";

type PathType = string;

abstract class Page extends Component {
  path: PathType;

  constructor(id: IdType, path: PathType, props?: PropType) {
    super(id, props);
    this.path = path;
  }
}

export default Page;
