export function parseHTMLTextToDocument(text: string): Document {
  const domparser = new DOMParser();
  return domparser.parseFromString(text, "text/html");
}

export function addBrTag(
  $element: Element,
  numOfBr: number,
  insertPosition: "before" | "after"
) {
  const isBefore = insertPosition === "before";
  const sibiling = isBefore
    ? $element.previousElementSibling
    : $element.nextElementSibling;

  if (!(sibiling instanceof HTMLBRElement))
    $element.insertAdjacentHTML(
      isBefore ? "beforebegin" : "afterend",
      "<br/>".repeat(numOfBr)
    );
}

export function isHrefFromExternalSite($a: HTMLAnchorElement) {
  const href = $a.getAttribute("href");
  return href && !href.includes("searchright.net");
}

export function processImage($figureImg: Element) {
  const $a = $figureImg.querySelector<HTMLAnchorElement>("a");
  const $img = $figureImg.querySelector<HTMLImageElement>("img");
  const $figcaption = $figureImg.querySelector<HTMLElement>("figcaption");
  if (!($a && $img)) return;

  $a.replaceWith($img); // 감싸진 a 태그 삭제
  $img.removeAttribute("style"); // img에 적용된 width style 삭제
  $img.setAttribute("src", "!!!!! 이미지를 base64로 변환해주세요");
  $img.setAttribute(
    "alt",
    $figcaption?.innerText || "!!!!! 이미지의 대체 텍스트를 입력해주세요"
  ); // alt 추가 (figcaption으로)
}

export function processCallout($figureCallout: Element) {
  $figureCallout.removeAttribute("style");

  // figure-callout에 icon 첫번째 태그로 옮기기
  const $icon = $figureCallout.querySelector<HTMLDivElement>(".icon");
  if (!$icon) return;
  const icon = $icon.innerText;
  $icon.parentElement?.remove();

  let $child = $figureCallout.firstElementChild as HTMLElement | null;
  if (!$child) return;
  while ($child.firstElementChild)
    $child = $child.firstElementChild as HTMLElement;
  $child.innerText = `${icon}${"  " + $child.innerText || ""}`;
}
