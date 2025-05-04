import Title from "@/components/Title";
import Page from "@/core/Page";
import FileUploader, { hideFileUploader } from "@/components/FileUploader";
import FileEditor, { setTextareaValue } from "./components/FileEditor";
import WarningText, { updateWarningMessage } from "./components/WarningText";
import PATH from "@/constants/path";
import { readFileAsText } from "@/util/fileUtil";
import {
  addBrTag,
  isHrefFromExternalSite,
  parseHTMLTextToDocument,
  processCallout,
  processImage,
} from "@/util/domUtil";
import { getElementBySelector } from "@/util/elementUtil";
import { ID } from "@/constants/element";
import {
  removeBlankClasses,
  removeBlankPTags,
  removeIds,
} from "@/util/stringUtil";

class MainPage extends Page {
  constructor() {
    super(ID.main, PATH.main);
  }

  render() {
    const $main = document.createElement("main");

    const { element: $title } = new Title({
      title: "서치라이트 블로그 포매터",
    });
    const { element: $warningText } = new WarningText();
    const { element: $formattedFileEditor } = new FileEditor();

    const { element: $fileUploader } = new FileUploader({
      text: "노션에서 HTML로 내보낸 파일을 업로드해주세요",
      onFileUpload: (e: Event) => {
        const file = (e.target as HTMLInputElement)?.files?.[0]!;
        this.handleFileUpload(file);
      },
    });

    $main.append($title);
    $main.append($fileUploader);
    $main.append($warningText);
    $main.append($formattedFileEditor);

    return $main;
  }

  handleFileUpload(file: File) {
    readFileAsText(file, (text) => {
      const document = parseHTMLTextToDocument(text);
      text = this.processText(text);
      const processedHtml = this.processDom(document);

      setTextareaValue(processedHtml);
      hideFileUploader();
      updateWarningMessage(processedHtml);
    });
  }

  processText(text: string) {
    text = removeBlankClasses(text); // class="" 전부 삭제
    text = removeIds(text); // id 전부 삭제
    text = removeBlankPTags(text); // <p>   </p> 삭제
    return text;
  }

  processDom(document: Document) {
    const $article = getElementBySelector("article", document);
    $article.querySelector("header")?.remove();
    $article
      .querySelectorAll("h3, h4, h5, h6, figure")
      .forEach(($e) => addBrTag($e, 1, "before"));
    $article.querySelectorAll("h2").forEach(($e) => addBrTag($e, 2, "before"));
    $article
      .querySelectorAll("figure")
      .forEach(($e) => addBrTag($e, 1, "after"));
    $article.querySelectorAll(".image").forEach(($e) => processImage($e));
    $article.querySelectorAll("a").forEach(($e) => {
      if (isHrefFromExternalSite($e)) $e.setAttribute("target", "_blank");
    });
    $article.querySelectorAll(".callout").forEach(($e) => processCallout($e));
    return $article.outerHTML;
  }
}

export default MainPage;
