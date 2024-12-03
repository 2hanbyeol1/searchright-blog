export function processText(text: string): string {
  return text
    .replaceAll(` class=""`, "")
    .replaceAll(/ id="[^"]*"/g, "")
    .replaceAll(/<p>\s*<\/p>/g, "");
}

export function processDOM($article: HTMLElement): string {
  $article.querySelector("header")?.remove();
  $article.querySelector("h1")?.remove();

  processHeadings($article);
  processFigures($article);
  processImages($article);
  processCallouts($article);
  processLinks($article);

  return $article.outerHTML;
}

function processHeadings($article: HTMLElement) {
  $article.querySelectorAll("h2").forEach(($h2) => {
    $h2.insertAdjacentHTML("beforebegin", "<br/><br/>");
  });

  $article.querySelectorAll("h3, h4, h5, h6").forEach(($h) => {
    if ($h.previousElementSibling?.tagName !== "BR") {
      $h.insertAdjacentHTML("beforebegin", "<br/>");
    }
  });
}

function processFigures($article: HTMLElement) {
  $article.querySelectorAll("figure").forEach(($figure) => {
    if ($figure.previousElementSibling?.tagName !== "BR") {
      $figure.insertAdjacentHTML("beforebegin", "<br/>");
    }
    if ($figure.nextElementSibling?.tagName !== "BR") {
      $figure.insertAdjacentHTML("afterend", "<br/>");
    }
  });
}

function processImages($article: HTMLElement) {
  $article.querySelectorAll(".image").forEach(($figureImg) => {
    const $a = $figureImg.querySelector<HTMLAnchorElement>("a");
    const $img = $figureImg.querySelector<HTMLImageElement>("img");
    const $figcaption = $figureImg.querySelector<HTMLElement>("figcaption");

    if ($a && $img) {
      $a.replaceWith($img); // a 태그 없애기
      $img.removeAttribute("style");
      $img.setAttribute("src", "!!!!! 이미지를 base64로 변환해주세요");

      const altText = $figcaption
        ? $figcaption.innerText
        : "!!!!! 캡션이 없습니다. 임의의 alt 값을 넣어주세요";
      $img.setAttribute("alt", altText);
    }
  });
}

function processCallouts($article: HTMLElement) {
  $article.querySelectorAll(".callout").forEach(($figureCallout) => {
    const $icon = $figureCallout.querySelector(
      ".icon"
    ) as HTMLDivElement | null;
    if (!$icon) return;

    const icon = $icon.innerText;
    ($icon.parentNode as Element)?.remove();
    $figureCallout.removeAttribute("style");

    let $child: HTMLElement | null =
      $figureCallout.firstElementChild as HTMLElement;
    while ($child?.firstElementChild) {
      $child = $child.firstElementChild as HTMLElement;
    }

    if ($child) {
      $child.innerText = `${icon}  ${$child.innerText || ""}`;
    }
  });
}

function processLinks($article: HTMLElement) {
  $article.querySelectorAll("a").forEach(($a) => {
    const href = $a.getAttribute("href");
    if (href && !href.includes("searchright.net")) {
      $a.setAttribute("target", "_blank");
    }
  });
}
