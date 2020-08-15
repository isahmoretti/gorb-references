export const formatMessage = (message) => {
  if (!message) return

  const msgs = message.split(" ")
  const len = msgs.length
  
  if (len > 100) {
    return msgs.slice(0, 99).join(" ") + ' [...]' 
  }

  return message
};
