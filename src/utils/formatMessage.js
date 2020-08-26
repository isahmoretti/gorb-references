export const formatMessage = (message, length = 100) => {
  if (!message) return

  const msgs = message.split(" ")
  const len = msgs.length
  
  if (len > length) {
    return msgs.slice(0, length - 1).join(" ") + ' [...]' 
  }

  return message
};
