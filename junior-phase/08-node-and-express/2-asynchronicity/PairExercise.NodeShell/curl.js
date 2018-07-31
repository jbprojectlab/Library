// const http = require('http')
const request = require('request')

// implementation using `request`
module.exports = (url, done) => {
  request(url, (err, response, body) => {
    if (err) {
      done(err)
    } else {
      done(body)
    }
  })
}

// implementation using built-in `http`:
// module.exports = (url, done) => {
//   http.get(url, (res) => {
//     let raw = ''
//
//     res
//       .on('data', (chunk) => {
//         raw += chunk
//       })
//       .on('end', () => {
//         done(raw)
//       })
//       .on('error', (err) => {
//         done(err.message)
//       })
//   })
// }
