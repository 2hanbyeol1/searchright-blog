/**
 * HTML 텍스트에서 빈 class 속성을 제거
 * @param text HTML 텍스트
 * @returns {string} 빈 class 속성이 제거된 텍스트
 */
export function removeBlankClasses(text: string): string {
  return text.replaceAll(` class=""`, "");
}

/**
 * HTML 텍스트에서 id 속성을 제거
 * @param text HTML 텍스트
 * @returns {string} id 속성이 제거된 텍스트
 */
export function removeIds(text: string): string {
  return text.replaceAll(/ id="[^"]*"/g, "");
}

/**
 * HTML 텍스트에서 공백이 포함된 <p> 태그를 제거
 * @param text HTML 텍스트
 * @returns {string} 공백이 포함된 <p> 태그가 제거된 텍스트
 */
export function removeBlankPTags(text: string): string {
  return text.replaceAll(/<p>\s*<\/p>/g, "");
}
