import type { ServerResponse } from 'http'
import axios from 'axios'

export default async (res: ServerResponse) => {
  let t: any
  try {
    t = await axios.get('https://jsonplaceholder.typicode.com/todos/1')
  } catch (error) {
    // eslint-disable-next-line no-console
    console.log(error)
  } finally {
    res.end(JSON.stringify(t.data))
  }
}
