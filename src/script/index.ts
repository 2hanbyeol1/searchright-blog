import { processDOM, processText } from "./process";

const $textarea = document.querySelector<HTMLTextAreaElement>("textarea")!;
const $warning = document.querySelector<HTMLDivElement>("#warning")!;
const $notionFileInput =
  document.querySelector<HTMLInputElement>("#notion-file-input")!;
const $notionFile = document.getElementById("notion-file");

$notionFile?.addEventListener("change", (e: Event) => {
  const file = (e.target as HTMLInputElement)?.files?.[0];
  if (!file) return;

  (async () => {
    try {
      let text = await readFileAsText(file).then((text) => processText(text));

      const $article = getArticleElementFromText(text);
      if (!$article) return;
      const processedHtml = processDOM($article);

      $textarea.value = processedHtml;
      $textarea.readOnly = false;
      updateWarningMessage(processedHtml);
      $notionFileInput.style.display = "none";
    } catch (e) {
      alert((e as Error).message);
    }
  })();
});

function readFileAsText(file: File): Promise<string> {
  return new Promise((resolve, reject) => {
    if (!file) {
      reject(new Error("파일이 없습니다."));
    }

    const reader = new FileReader();
    reader.readAsText(file);

    reader.onload = (ev: ProgressEvent<FileReader>) => {
      const text = ev.target?.result as string;
      if (!text) reject(new Error("파일의 내용이 없습니다."));
      resolve(text);
    };

    reader.onerror = () => {
      reject(new Error("파일을 읽는 도중 에러가 발생했습니다."));
    };
  });
}

function getArticleElementFromText(text: string) {
  const domparser = new DOMParser();
  const doc = domparser.parseFromString(text, "text/html");
  const $article = doc.querySelector("article");
  if (!$article) {
    throw new Error(
      "문서에서 article 요소를 찾을 수 없습니다. 노션에서 HTML로 내보낸 파일이 맞나요?"
    );
  }
  return $article;
}

$textarea.addEventListener("keyup", () => {
  updateWarningMessage($textarea.value);
});

function updateWarningMessage(text: string) {
  const count = (text.match(/!!!!!/g) || []).length;
  $warning.innerHTML = `<strong>${count}개 항목의 수정이 필요합니다</strong> (ctrl + f로 !!!!! 를 검색하세요)`;
  $warning.style.display = count > 0 ? "block" : "none";
}
