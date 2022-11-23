export default function range(start, end, step) {
  let len = start

  step = !step ? 1 : step

  if (end) {
    len = Math.floor(Math.abs(start - end) / step)
  }

  return new Array(len).fill(0).map(function (el, i) {
    return start + i * step
  })
}
