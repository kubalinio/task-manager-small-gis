const formatTaskListItemDate = (date: number) => {
  return new Date(date).toLocaleTimeString("en-UK", {
    hour: "2-digit",
    minute: "2-digit",
    hour12: false,
    day: "2-digit",
    month: "2-digit"
  })
}

export { formatTaskListItemDate }
