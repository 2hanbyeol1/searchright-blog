export function readFileAsText(file: File): Promise<string> {
  return new Promise((resolve, reject) => {
    if (!file) {
      reject(new Error("파일이 제공되지 않았습니다."));
      return;
    }

    const reader = new FileReader();
    reader.readAsText(file);

    reader.onload = (ev: ProgressEvent<FileReader>) => {
      const text = ev.target?.result as string;
      if (!text) {
        reject(new Error("파일의 내용이 없습니다."));
        return;
      }
      resolve(text);
    };

    reader.onerror = () => {
      reject(new Error(`${file.name} 파일을 읽는 도중 에러가 발생했습니다.`));
    };
  });
}
