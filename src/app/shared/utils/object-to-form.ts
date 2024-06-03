export function objectToFormData(object: Record<string, any>): FormData {
  const formData = new FormData();

  for (let key in object) {
    if (object[key] === null || object[key] === undefined) continue;
    formData.append(key, object[key as keyof object] as File | string);
  }

  return formData;
}