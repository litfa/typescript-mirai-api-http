export const randomId = () => {
  return Number(Date.now().toString() + Math.floor(Math.random() * 10000).toString())
}
