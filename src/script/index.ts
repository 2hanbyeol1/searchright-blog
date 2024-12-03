import { processDOM, processText } from "./process";

const $textarea = document.querySelector<HTMLTextAreaElement>("textarea")!;
const $warning = document.querySelector<HTMLDivElement>("#warning")!;
const $notionFileInput =
  document.querySelector<HTMLInputElement>("#notion-file-input")!;

document
  .getElementById("notion-file")
  ?.addEventListener("change", (e: Event) => {
    const file = (e.target as HTMLInputElement)?.files?.[0];
    if (!file) return;

    const reader = new FileReader();

    reader.onload = (ev: ProgressEvent<FileReader>) => {
      const result = ev.target?.result as ArrayBufferLike;
      if (!result) return;

      const decoder = new TextDecoder();
      const text = decoder.decode(new DataView(result));

      const processedText = processText(text);

      const domparser = new DOMParser();
      const doc = domparser.parseFromString(processedText, "text/html");
      const $article = doc.querySelector("article");
      if (!$article) return "";

      const processedHtml = processDOM($article);
      $textarea.value = processedHtml;
      $textarea.readOnly = false;

      updateWarningMessage();
      $notionFileInput.style.display = "none";
    };

    reader.readAsArrayBuffer(file);
  });

$textarea.addEventListener("keyup", () => {
  updateWarningMessage();
});

function updateWarningMessage() {
  const count = ($textarea.value.match(/!!!!!/g) || []).length;
  $warning.innerHTML = `<strong>${count}개 항목의 수정이 필요합니다</strong> (ctrl + f로 !!!!! 를 검색하세요)`;
  $warning.style.display = count > 0 ? "block" : "none";
}
