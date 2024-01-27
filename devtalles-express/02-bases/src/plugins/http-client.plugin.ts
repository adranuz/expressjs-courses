import axios from 'axios'

export const httpClientPlugin = {
  get: async(url:string) => {
    const { data } = await axios.get(url)
    return data
  },
  // post: async(url:string, body) => {},
  // put: async(url:string, body) => {},
  // patch: async(url:string, body) => {},
  // delete: async(url:string, body) => {},
}

// module.exports = {
//   httpClientPlugin
// }