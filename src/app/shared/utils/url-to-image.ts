export async function urlToImage(url: string): Promise<File> {
  return await fetch(url)
    .then((response) => response.blob())
    .then((blob) => {
      const filename = url.split('/').pop() || 'image.png';
      const file = new File([blob], filename, { type: blob.type });
      return file;
    });
}
