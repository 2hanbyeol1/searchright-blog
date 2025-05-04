import FileUploader, { hideFileUploader } from "@/components/FileUploader";
import Title from "@/components/Title";
import { ID } from "@/constants/element";
import PATH from "@/constants/path";
import Page from "@/core/Page";
import {
  addBrTag,
  isHrefFromExternalSite,
  parseHTMLTextToDocument,
  processCallout,
  processImage,
  removeFirstBrs,
} from "@/util/domUtil";
import { getElementBySelector } from "@/util/elementUtil";
import { readFileAsText } from "@/util/fileUtil";
import {
  removeBlankClasses,
  removeBlankPTags,
  removeIds,
} from "@/util/stringUtil";

import FileEditor, { setTextareaValue } from "./components/FileEditor";
import WarningText, { updateWarningMessage } from "./components/WarningText";

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
        const file = (e.target as HTMLInputElement)?.files?.[0];
        if (!file) throw new Error("업로드된 파일이 없습니다");
        this.handleFileUpload(file);
      },
    });

    $main.append($title);
    $main.append($fileUploader);
    $main.append($warningText);
    $main.append($formattedFileEditor);

    return $main;
  }

  async handleFileUpload(file: File) {
    try {
      let text = await readFileAsText(file);
      text = this.processText(text);
      const document = parseHTMLTextToDocument(text);
      const processedHtml = this.processDom(document);

      setTextareaValue(processedHtml);
      hideFileUploader();
      updateWarningMessage(processedHtml);
    } catch (e) {
      alert(
        e instanceof Error
          ? e.message
          : "파일 업로드 중, 알 수 없는 에러가 발생했습니다.",
      );
    }
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
    removeFirstBrs($article);
    return $article.outerHTML;
  }
}

export default MainPage;
