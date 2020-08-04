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
      let parent = "";
      let lastName = "";

      if (author[0].toLowerCase().includes("filho")) parent = "FILHO";
      if (author[0].toLowerCase().includes("júnior")) parent = "JÚNIOR";
      if (author[0].toLowerCase().includes("junior")) parent = "JUNIOR";
      if (author[0].toLowerCase().includes("neto")) parent = "NETO";
      if (author[0].toLowerCase().includes("sobrinho")) parent = "SOBRINHO";
    
      let authSplit = author[0].split(" ");
      
      if (authSplit[authSplit.length - 1].toUpperCase() === parent) {
        lastName = authSplit[authSplit.length - 2];
      } else {
        lastName = authSplit[authSplit.length - 1];
      }
      
      return (
        <>
          {lastName.toUpperCase()}, {authSplit[0]}{" "}
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
