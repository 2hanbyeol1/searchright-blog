class ElementNotFoundError extends Error {
  constructor(elementId: string) {
    super(`"${elementId}" 엘리먼트를 찾을 수 없습니다.`);
  }
}

export default ElementNotFoundError;
