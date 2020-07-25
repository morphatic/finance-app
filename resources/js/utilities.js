import { format } from 'date-fns'
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
export const calculateDayTotals = entries => {
  let day
  return entries.reduce((totals, e, i) => {
    // are we on a new date
    const date = format(new Date(e.date), 'y-MM-dd')
    if (date !== day) {
      // yes, create new array index
      day = date
      totals[date] = parseFloat(e.value)
    } else {
      totals[date] += parseFloat(e.value)
    }
    return totals
  }, {})
}
