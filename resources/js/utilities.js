export const clone = v => JSON.parse(JSON.stringify(v))
export const entrySorter = (e1, e2) => {
  if (e1.date < e2.date ) {
    return 1
  } else if (e1.date > e2.date) {
    return -1
  } else {
    return 0
  }
}