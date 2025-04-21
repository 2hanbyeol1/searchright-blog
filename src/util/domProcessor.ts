export function getArticleElementFromText(text: string) {
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
