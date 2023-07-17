export function getWeekDays() {
  const formatter = new Intl.DateTimeFormat('pt-BR', {
    weekday: 'long',
  })

  return Array.from(Array(7).keys()).map((weekDay) =>
    formatter.format(Date.UTC(2022, 5, weekDay)),
  )
}
