class ElementNotFoundError extends Error {
  constructor(elementName: string) {
    super(`"${elementName}" 엘리먼트를 찾을 수 없습니다.`);
  }
}

export default ElementNotFoundError;
