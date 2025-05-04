import MainPage from "./pages/main/page";
import { getDivById } from "./util/elementUtil";

const $app = getDivById("app");
const { element: $mainPage } = new MainPage();

$app.appendChild($mainPage);
