export function objectToFormData(object: object): FormData {
  const formData = new FormData();

  for (let key in object) {
    if (key === 'image' && key in object && object[key] === null) continue;
    formData.append(key, object[key as keyof object] as File | string);
  }

  return formData;
}