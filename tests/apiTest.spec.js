import { test, expect} from '@playwright/test'
const BASE_URL = 'https://monitor.dev.zinclabs.dev/'

require('dotenv').config() // Load environment variables from .env

test('should authenticate user and capture auth token', async ({request}) => {
  const username = process.env.ZO_ROOT_USER_EMAIL
  const password = process.env.ZO_ROOT_USER_PASSWORD

//   USE OF CAPTURE AUTH TOKEN METHOD
  const response = await request.post(`${BASE_URL}auth/login`, {
    headers: {
        'Content-Type': 'application/json',
      },
    data: {
      name: username,
      password: password
    }
  })

  const headers = response.headers()
  const setCookieHeader = headers['set-cookie']

  console.log('Set-Cookie Header:', setCookieHeader)

  // Step 3: Validate response and verify it is not empty [Working]
  expect(response.status()).toBe(200)  
  expect(await response.body()).toBeTruthy()


  // Validate search api result
  const payLoad = {
    end_time: 1728053281975000,
    from: 0,
    quick_mode: false,
    size: 100,
    sql: "select * from \"default\" ",
    start_time: 1727621281975000,
  }

  const response1 = await request.post('https://monitor.dev.zinclabs.dev/api/qa-test/_search?type=logs&search_type=UI&use_cache=true',{
    headers: {
        'Cookie': setCookieHeader, // Pass the cookies here
      },
    data: payLoad,
  })

 // Validate the response
  expect(response1.status()).toBe(200) 
  expect(await response1.body()).toBeTruthy()
})
