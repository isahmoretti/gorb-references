import React from "react";

export const formatAuthorName = (authors) => {
    if (Array.isArray(authors)) {
        if (!authors.length) return <></>

        const authSplit = authors[0].split(" ")

        if (authors.length === 2 || authors.length === 3) {
            const authorsTogether = authors.map((author) => {
                const authorSplit = author.split(" ")

                if (authorSplit.length <= 1) {
                    return authorSplit[0]
                }
                if (authorSplit.length >= 2) {
                    return `${authorSplit[authorSplit.length - 1].toUpperCase() + ', '} ${authorSplit[0]}`
                }
            })
            return <>{authorsTogether.join("; ")}</>
        }

        if (authors.length >= 4) {
            return <>{authSplit[authSplit.length - 1].toUpperCase()}, {authSplit[0]}. <i>et al.</i></>
        }
    }

    const authorSplit = authors.split(" ");

    if (authorSplit.length <= 1) {
        return <>{authorSplit[0]}</>
    }
    if (authorSplit.length >= 2) {
        return <>{authorSplit[authorSplit.length - 1].toUpperCase()}, {authorSplit[0]}.</>
    }
    return <></>
}


