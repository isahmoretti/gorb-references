import React, { useState } from 'react';
import { TEST_CONTENT } from "./constants";
import Content from "./Content";

const VocationalTest = () => {
    const [state, setState] = useState({
        total: 14,
        part: 7,
        answers: {
            a: 0,
            b: 0,
            c: 0,
            d: 0,
            e: 0,
        },
    })
    const { total, part, answers } = state

    const data = TEST_CONTENT[part - 1]
    const fragment = (100 / 14) * part
    console.log('fragment -> ', fragment)
    console.log('answers -----> ', answers)
    return (
        <div>
            <div style={{
                width: `${fragment}%`,
                backgroundColor: '#ff0',
            }}>{part}/{total}</div>
            <Content data={data} answers={answers} />
        </div>
    );
}

export default VocationalTest;