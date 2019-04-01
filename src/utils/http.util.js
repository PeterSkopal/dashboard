function fetch(url) {
  return new Promise((resolve, reject) => {
    typeof window !== "undefined" &&
      window
        .fetch(url)
        .then(resolve)
        .catch(reject)
  })
}

export default fetch
