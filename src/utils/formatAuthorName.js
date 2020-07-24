import React from "react";

const replaceNameAuthor = (author, abbreviate) => {
  let parent = "";
  let lastName = "";
  let otherNames = "";

  const arrAuthor = author.trim().split(" ");

  if (author.toLowerCase().includes("filho")) parent = "FILHO";
  if (author.toLowerCase().includes("júnior")) parent = "JÚNIOR";
  if (author.toLowerCase().includes("junior")) parent = "JUNIOR";
  if (author.toLowerCase().includes("neto")) parent = "NETO";
  if (author.toLowerCase().includes("sobrinho")) parent = "SOBRINHO";

  if (arrAuthor[arrAuthor.length - 1].toUpperCase() === parent) {
    lastName = arrAuthor[arrAuthor.length - 2];
  } else {
    lastName = arrAuthor[arrAuthor.length - 1];
  }

  if (arrAuthor.some((item) => item.toUpperCase().includes(parent))) {
    const test = arrAuthor
      .map((item) => {
        if (item.toUpperCase() === parent || item === lastName) {
          return item.replace(item, "");
        }
        return item;
      })
      .filter((item) => item);

    if (abbreviate) {
      const names = test
        .filter((item) => item)
        .map((item) => item.substr(0, 1).toUpperCase())
        .join(". ")
        .trim();
      otherNames = `${names}.`;
    } else {
      otherNames = test.join(" ").trim();
    }
  } else {
    if (abbreviate) {
      const names = arrAuthor
        .map((item) => item.substr(0, 1).toUpperCase())
        .join(". ")
        .replace(` ${lastName}`, "");
      otherNames = names;
    } else {
      otherNames = arrAuthor.join(" ").replace(` ${lastName}`, "");
    }
  }

  return `${lastName.toUpperCase()}${parent ? ` ${parent}` : ""}${
    arrAuthor.length === 1 || (arrAuthor.length === 2 && parent) ? "" : ", "
  }${otherNames.trim()}`;
};

export const formatAuthorName = (authors, abbreviate = false) => {
  if (Array.isArray(authors)) {
    if (!authors.length) return <></>;

    const authSplit = authors[0].split(" ");

    if (authors.length >= 4) {
      return (
        <>
          {authSplit[authSplit.length - 1].toUpperCase()}, {authSplit[0]}.{" "}
          <i>et al.</i>
        </>
      );
    }

    const authorsTogether = authors.map((author) =>
      replaceNameAuthor(author, abbreviate)
    );

    return `${authorsTogether.join("; ")}${abbreviate ? " " : ". "}`;
  }

  const authorSplit = authors.split(" ");

  if (authorSplit.length <= 1) {
    return <>{authorSplit[0]}</>;
  }

  return `${replaceNameAuthor(authors)} `;
};
