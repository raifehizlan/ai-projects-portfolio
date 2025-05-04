// utils/parseMaskedText.js
export function parseMaskedText(text, entities, labelField = "entity") {
  const sorted = [...entities].sort((a, b) => a.begin - b.begin);
  const result = [];
  let lastIndex = 0;

  for (const entity of sorted) {
    const { begin, end, chunk } = entity;
    const label = entity[labelField]; // Dinamik olarak label alanı seç

    if (begin > lastIndex) {
      result.push({ type: "text", value: text.slice(lastIndex, begin) });
    }

    result.push({
      type: "entity",
      value: chunk,
      label: label,
    });

    lastIndex = end;
  }

  if (lastIndex < text.length) {
    result.push({ type: "text", value: text.slice(lastIndex) });
  }

  return result;
}
