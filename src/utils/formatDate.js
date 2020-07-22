
  export const formatDate = (d) => {
    const date = new Date(d)

    const months = [
      'jan.',
      'fev.',
      'mar.',
      'abr.',
      'maio',
      'jun.',
      'jul.',
      'ago.',
      'set.',
      'out.',
      'nov.',
      'dez.',
    ]

    const day = date.getDate()
    const month = months[date.getMonth()]
    const year = date.getFullYear()

    return `${day} ${month} ${year}`
  }