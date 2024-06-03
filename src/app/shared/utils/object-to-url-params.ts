export function objectToUrlParams(object: Record<string, any>): string {
  return Object.keys(object)
    .map((key) => {
      if (object[key] !== undefined && object[key] !== null) {
        return `${key}=${object[key]}`;
      }
      return '';
    })
    .join('&');
}
