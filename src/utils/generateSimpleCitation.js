export const withAutor = (name = "", year = 0) => {
  const toUpperCaseName = name.toUpperCase();

  const response = `${toUpperCaseName} (${year})`;

  return response;
};

export const finalParagraph = (name = "", year = 0) => {
  const toUpperCaseName = name.toUpperCase();

  const response = `(${toUpperCaseName}, ${year})`;

  return response;
};

export const withAutorArray = (names = [], year = 0) => {
  const toUpperCaseName = names.map((name) => name.toUpperCase()).join(", ");

  const response = `${toUpperCaseName} (${year})`;

  return response;
};

export const finalParagraphArray = (names = [], year = 0) => {
  const toUpperCaseName = names.map((name) => name.toUpperCase()).join(", ");

  const response = `(${toUpperCaseName}, ${year})`;

  return response;
};
