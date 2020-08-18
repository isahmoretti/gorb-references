export const formatTime = (time) => {
    if (!time) return

    time = time.split(":")

    return `${time[0]}h${time[1]}`
};
