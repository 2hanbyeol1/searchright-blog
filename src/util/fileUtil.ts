export function readFileAsText(
  file: File,
  onSuccess: (text: string) => void,
): void {
  const reader = new FileReader();
  reader.readAsText(file);

  reader.onload = (ev: ProgressEvent<FileReader>) => {
    const text = ev.target?.result as string;
    if (!text) throw new Error("파일의 내용이 없습니다.");
    onSuccess(text);
  };

  reader.onerror = () => {
    throw new Error(`${file.name} 파일을 읽는 도중 에러가 발생했습니다.`);
  };
}
