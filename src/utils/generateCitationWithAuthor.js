import React from "react";

export const generateCitationWithAuthor = (author, yearOfPublication) => {
  const date = yearOfPublication.split("-")[0];

  if (Array.isArray(author)) {
    if (!author.length || author[0] === "") return <></>;

    if (author.length === 1) {
      const authors = author.map((auth) => {
        let authSplit = auth.split(" ");
        return authSplit[authSplit.length - 1];
      });
      return (
        <span>
          {authors.join(", ")} ({date})
        </span>
      );
    }

    if (author.length === 2 || author.length === 3) {
      const authors = [];
      author.forEach((auth, index) => {
        let authSplit = auth.split(" ");
        if (index === author.length - 1) {
          authors.push("e");
        }
        authors.push(authSplit[authSplit.length - 1]);
      });
      return (
        <span>
          {authors.map((a, i, arr) => {
            return i <= arr.length - 4 ? `${a}, ` : ` ${a} `;
          })}{" "}
          ({date})
        </span>
      );
    }

    if (author.length >= 4) {
      let authSplit = author[0].split(" ");
      return (
        <>
          {authSplit[authSplit.length - 1].toUpperCase()}, {authSplit[0]}{" "}
          <i>et al.</i> ({date})
        </>
      );
    }
  }

  const authorSplit = author.split(" ");

  const lastName = authorSplit[authorSplit.length - 1];

  return (
    <span>
      {lastName} ({date})
    </span>
  );
};
