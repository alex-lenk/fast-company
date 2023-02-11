export function dateAgo(data) {
  const now = new Date()
  const date = new Date(parseInt(data))
  const year = now.getFullYear() - date.getFullYear()

  if (year) return `${pad(date.getDate())}.${pad((date.getMonth() + 1))}.${date.getFullYear()}`

  const day = now.getDate() - date.getDate()

  if (day) return date.toLocaleString('ru-RU', {
    month: '2-digit',
    day: '2-digit'
  })

  const hour = now.getHours() - date.getHours()

  if (hour) return `${date.getHours()}:${date.getMinutes()}`

  const minutes = now.getMinutes() - date.getMinutes()

  if (minutes < 5 && minutes >= 0) return '1 минуту назад'

  if (minutes < 10 && minutes >= 5) return '5 минут назад'

  if (minutes < 30 && minutes >= 10) return '10 минут назад'

  return '30 минут назад'
}

function pad(n) {
  return n < 10 ? '0' + n : n
}
