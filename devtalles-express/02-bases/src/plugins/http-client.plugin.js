const httpClientPlugin = {
  get: async(url) => {
    const resp = await fetch(url)
    return await resp.json()
  },
  post: async(url, body) => {},
  put: async(url, body) => {},
  patch: async(url, body) => {},
  delete: async(url, body) => {},
}

module.exports = {
  httpClientPlugin
}