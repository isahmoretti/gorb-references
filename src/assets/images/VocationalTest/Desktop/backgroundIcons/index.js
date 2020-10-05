const images = []

for(let i = 1; i <= 46; i++){
    let image = require('./fundo_perguntas_ ('+i+').png').default
    images.push(image)
}

export default images;