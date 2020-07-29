import React from 'react'

export const generateCitationWithoutAuthor = (author, yearOfPublication) => {

    const authorSplit = author.split(" ");

    const lastName = authorSplit[authorSplit.length - 1].toUpperCase();

    return <span>({lastName}, {yearOfPublication})</span>
}