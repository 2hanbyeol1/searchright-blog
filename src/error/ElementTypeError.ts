class ElementTypeError extends Error {
  constructor(elementId: string, type: string) {
    super(`"${elementId}" 엘리먼트의 타입이 ${type}이 아닙니다.`);
  }
}

export default ElementTypeError;
