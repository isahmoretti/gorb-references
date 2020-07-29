import React from 'react'

export const generateCitationWithAuthor = (author, yearOfPublication) => {

    const authorSplit = author.split(" ");

    const lastName = authorSplit[authorSplit.length - 1]

    return <span>{lastName} ({yearOfPublication})</span>
}
