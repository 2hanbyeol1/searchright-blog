import { getArticleElementFromText } from "../util/domProcessor";
import { readFileAsText } from "../util/fileReader";
import { processDOM, processText } from "./process";

const $textarea = document.querySelector<HTMLTextAreaElement>("textarea")!;
const $notionFileInput =
  document.querySelector<HTMLInputElement>("#notion-file-input")!;
const $notionFile = document.getElementById("notion-file");

$notionFile?.addEventListener("change", (e: Event) => {
  const file = (e.target as HTMLInputElement)?.files?.[0] as File;

  (async () => {
    try {
      let text = await readFileAsText(file).then((text) => processText(text));

      const $article = getArticleElementFromText(text);
      if (!$article) return;
      const processedHtml = processDOM($article);

      $textarea.value = processedHtml;
      $textarea.readOnly = false;
      // ! 너무 구려요 22
      // updateWarningMessage(processedHtml);
      $notionFileInput.style.display = "none";
    } catch (e) {
      alert((e as Error).message);
    }
  })();
});
