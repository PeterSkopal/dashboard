export default function fetch(url: string): Promise<any> {
  return new Promise((resolve, reject) => {
    typeof window !== "undefined" &&
      window
        .fetch(url)
        .then(resolve)
        .catch(reject)
  })
}
