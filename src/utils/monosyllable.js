import monosyllableData from "../data/Monosyllable";

export const formatMonosyllable = (text = "") => {
  const [first, secondary] = text.split(" ");

  const isInclude = monosyllableData.includes(first.toLowerCase());

  if (isInclude) {
    return text.replace(
      `${first} ${secondary}`,
      `${first.toUpperCase()} ${secondary.toUpperCase()}`
    );
  }

  return text.replace(first, first.toUpperCase());
};
