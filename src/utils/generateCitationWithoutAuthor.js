import React from "react";

import monosyllableData from "../data/Monosyllable";

export const generateCitationWithoutAuthor = (
  author,
  yearOfPublication,
  abbreviate = false,
  flag = false
) => {
  yearOfPublication = String(yearOfPublication);

  const date = yearOfPublication.split("-")[0];

  if (Array.isArray(author)) {
    if (!author.length || author[0] === "") return <></>;

    if (author.length === 1 || author.length === 2 || author.length === 3) {
      const authors = author.map((auth) => {
        let authSplit = auth.split(" ");
        return authSplit[authSplit.length - 1].toUpperCase();
      });
      return (
        <span>
          ({authors.join("; ")}, {date})
        </span>
      );
    }

    if (author.length >= 4) {
      let parent = "";
      let lastName = "";
      if (author[0].toLowerCase().includes("filho")) parent = "FILHO";
      if (author[0].toLowerCase().includes("júnior")) parent = "JÚNIOR";
      if (author[0].toLowerCase().includes("junior")) parent = "JUNIOR";
      if (author[0].toLowerCase().includes("neto")) parent = "NETO";
      if (author[0].toLowerCase().includes("sobrinho")) parent = "SOBRINHO";

      let authSplit = author[0].split(" ");

      // if(authSplit.find(a => a === parent)){
      //   const v = authSplit[0]
      // }
      if (authSplit[authSplit.length - 1].toUpperCase() === parent) {
        lastName = authSplit[authSplit.length - 2];
      } else {
        lastName = authSplit[authSplit.length - 1];
      }

      return (
        <span>
          ({lastName.toUpperCase()} et al., {date})
        </span>
      );
    }
  }

  const authorSplit = author.split(" ");

  const lastName = authorSplit[authorSplit.length - 1].toUpperCase();

  return (
    <span>
      ({lastName} {abbreviate} {flag && `et al.`} {date})
    </span>
  );
};

export const generateCitationWithoutAuthorSpread = (text = "", yaer = 0) => {
  const [frist, secondary] = text.split(" ");

  if (monosyllableData.includes(frist.toLowerCase())) {
    return `(${frist.toUpperCase()} ${secondary.toUpperCase()}..., ${yaer})`;
  }

  return `(${frist.toUpperCase()}..., ${yaer})`;
};
