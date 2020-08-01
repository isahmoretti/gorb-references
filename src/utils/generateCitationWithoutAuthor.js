import React from "react";

export const generateCitationWithoutAuthor = (author, yearOfPublication) => {
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
          ({authors.join("; ")} {date})
        </span>
      );
    }

    if (author.length >= 4) {
      let authSplit = author[0].split(" ");
      authSplit = authSplit[authSplit.length - 1].toUpperCase();
      return (
        <span>
          ({authSplit} et al., {date})
        </span>
      );
    }
  }

  const authorSplit = author.split(" ");

  const lastName = authorSplit[authorSplit.length - 1].toUpperCase();

  return (
    <span>
      ({lastName}, {date})
    </span>
  );
};
