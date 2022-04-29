export function limitDecimalPlace(value: string, place: number): string {
  let privateValue = value;

  const hasComma = value.includes(',');

  if (hasComma) {
    privateValue = value.replace(',', '.');
  }
  if (value.length === 0) {
    return value;
  }
  if (Number.isNaN(Number(privateValue))) {
    return value;
  }
  privateValue = Number(privateValue).toFixed(place);
  if (hasComma) {
    privateValue = privateValue.replace('.', ',');
  }

  return privateValue;
}
