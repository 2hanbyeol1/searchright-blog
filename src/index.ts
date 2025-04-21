import ElementNotFoundError from "./error/ElementNotFoundError";
import MainPage from "./pages/MainPage";

const root = document.body;
if (!root) throw new ElementNotFoundError("body");

const mainPage = new MainPage();
root.appendChild(mainPage.$element);
