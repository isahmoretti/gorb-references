import React from 'react';

const Content = (props) => {
    const { data, answers } = props
    const { question, alternatives } = data

    // const options = alternatives
    console.log('data content --> ', alternatives)
    console.log('answers --> ', answers)

    return (
        <div>
            <h2>{question}</h2>
            {
                alternatives?.map((alternative, index) => <div key={index}>{alternative}</div>)
            }
        </div>
    );
}

export default Content;