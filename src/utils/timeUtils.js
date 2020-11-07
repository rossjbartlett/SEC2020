export function renderTime(totalSeconds) {
  let minutes = Math.floor(totalSeconds / 60) + '';
  let seconds = totalSeconds % 60 + '';
  if (minutes.length < 2) minutes = '0' + minutes
  if (seconds.length < 2) seconds = '0' + seconds
  return `${minutes}:${seconds}`
}