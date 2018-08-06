const ml = require('manyline')
const readAsync = Symbol('readAsync')
    , writeAsync = Symbol('writeAsync')

module.exports = {read, write}

const {log} = console

const keys = {
  '5hanover': 'leaked',
  'AlwaysBeCoding': 'safe'
}

const validateReport = (data) => {
  if (data.trim() !== REPORT.map(_ => _ === isRedacted ? '[REDACTED]' : _).join('\n'))
      throw new Error('⚠️ Report looks incorrect')
}

const cointel = {
  async [writeAsync](path, key, data) {
    validateReport(data)
    if(keys[key] && keys[key] === "leaked")
      log(ml `⭐️⭐️⭐️⭐️⭐️⭐️⭐️⭐️ REPORT RECEIVED ⭐️⭐️⭐️⭐️⭐️⭐️⭐️⭐️`
             `Thank you for your service.`
             `-------------------------------------------`
             `              ⚠️  ATTENTION ⚠️`
             `The key you used was too old and reportedly`
             `leaked - You might have been exposed.`
             `-------------------------------------------`
             `Extra credit assignment: ensure your code`
             `keeps retrying to read "/key" until it gets`
             `a valid response.`
             `⭐️⭐️⭐️⭐️⭐️⭐️⭐️⭐️⭐️⭐️⭐️⭐️⭐️⭐️⭐️⭐️⭐️⭐️⭐️⭐️⭐️⭐️⭐️⭐️⭐️⭐️` .end)
    else if(keys[key] && keys[key] === "safe")
      log(ml `⭐️⭐️⭐️⭐️⭐️ REPORT SAFELY RECEIVED ⭐️⭐️⭐️⭐️⭐️⭐️`
             `Thank you for your service, great job!`
             `-------------------------------------------`
             `You have proved yourself worthy and have`
             `been assigned a TOP SECRET challenge. Open`
             `'bonus-exercise.js' for your next mission.`
             `⭐️⭐️⭐️⭐️⭐️⭐️⭐️⭐️⭐️⭐️⭐️⭐️⭐️⭐️⭐️⭐️⭐️⭐️⭐⭐️⭐️⭐️⭐️⭐️⭐️⭐️` .end)
    else
      throw new Error('⚠️ Incorrect Key')
  }
}


const isRedacted = {
  [readAsync](path) {
    return Promise.reject(new RedactedError(path))
  }
}

const REPORT = [
  ...ml
  `COUNTERINTELLIGENCE PROGRAM:`
  `STOP PROMISES INSTRUCTION`
  `--------------------`
  `Re: Bureau to NY, 2018-04-30`
  `1.`
  .lines,
  isRedacted,
  ...ml
  `has been assigned to coordinate this program for the JS Division.`
  `2.`
  `We've detected JavaScript Promise usage emanating from the`
  `"FullStack Academy of Code". This organization comprises a team of`
  `instructors, agents, and trainees, holding regular weekly meetings.`
  .lines,
  isRedacted,
  isRedacted,
  ...ml
  `4.`
  `The JavaScript Division believes that one of the best ways to thwart`
  `the efforts of user groups and individuals using promises in JS is to`
  `discredit them. To that end, we will be ramping up our use of propaganda`
  `in favor of callbacks, as well as deriding any mention of async/await`
  `or functional promise usage.`
  .lines
]
const fs = {
  README: ml `I STOLE THESE MATERIALS FROM A SECRET ANTI-JS GROUP.`
             ``
             `TIME IS SHORT, PLEASE RETRIEVE THESE DOCUMENTS ASAP.`
             ``
             `THEY INCLUDE WHOM THE GROUP IS TARGETING (THE MARKS),`
             `THE IDENTITIES OF CERTAIN SPIES,`
             `AND THE TEXT OF AN INTERNAL REPORT.`
             ``
             `ONCE RETRIEVED, FORWARD THE REPORT TO HEADQUARTERS.`
            .end,
  dossier: {
    A: `Look up COINTEL on Cassiozen`,
    B: `Look up COINTEL on TmKelly`,
    C: `Look up COINTEL on Ashi`,
  },
  spy: concurrentReadGroup({
    A: `Spy A - Codename Oddie`,
    B: `Spy B - Codename Cody`,
    C: `Spy C - Codename Ribs`
  }),
  cointel,
  schedule: {
    'TmV4dCB': `{
      "data": "TmV4dCBNZWV0aW5nczoNCj09PT09PT09PT09PT09DQoNCjAyLzI3Oi",
      "next": "BOWSBCd"
    }`,
    'BOWSBCd': `{
      "data": "BOWSBCdXJlYXUgT2ZmaWNlDQowNC8xMDogVGh1bmRlcidzIGhpZGVv",
      "next": "dXQNCjA"
    }`,
    'dXQNCjA': failingResponse(`{
      "data": "dXQNCjA3LzIxOiBSb3NlbGFuZCBzYWZlIGhvdXNlDQoNClNlY3JldC",
      "next": "BLbm9ja"
    }`),
    'BLbm9ja': `{
      "data": "BLbm9jayBDb2RlOg0KPT09PT09PT09PT09PT09PT09DQoNCmtub2N",
      "next": "rIHwgcG"
    }`,
    'rIHwgcG': failingResponse(`{
      "data": "rIHwgcGF1c2UgfCBrbm9jayBrbm9jayB8IHBhdXNlIHwga25vY2sg",
      "next": null
    }`)
  },
  agent: {
    '0': `Agent C.Angultz`,
    '1': failingResponse(`Agent Martins`),
    '2': notFound(),
    '3': `Agent P.Lim`,
    '4': notFound(),
    '5': failingResponse(`Agent Fox`),
    '6': notFound(),
    '7': `Agent Bear`,
    '8': notFound(),
    '9': failingResponse(`Agent N.Hama`),
  },
  key: failingResponse(`AlwaysBeCoding`),
  report: jitter(...REPORT),
}

class ConcurrentReadError extends Error {
  constructor(path, missing) {
    super(`⚠️ read ${path}: Concurrent reads not issued for: ${
      missing.map(_ => `"${_}"`).join(', ')
    }`)
  }
}

class RedactedError extends Error {
  constructor(path) {
    super(`⚠️ read ${path}: ██████████████████ has been redacted under the Charter §7.2`)
  }
}

class Server503Error extends Error {
  constructor() {
    super(`⚠️ 503 - Server was Unavailable. Please try again.`)
    this.status = 503
  }
}

class Server404Error extends Error {
  constructor() {
    super(`⚠️ 404 - Not Found.`)
    this.status = 404
  }
}

function jitter(...lines) {
  return lines.map(_ => ({
    [readAsync](path) {
      return sleepRand().then(() => _[readAsync](path))
    }
  }))
}

const sleepRand = (maxMs=100) => sleep(maxMs * Math.random())
    , sleep = ms => new Promise(resolve => setTimeout(resolve, ms))

function concurrentReadGroup(files) {
  let timer = null
    , readers = {}
    , names = Object.keys(files)

  return Object.assign(
    ...names.map(key => ({
      [key]: reader(key, files[key])
    }))
  )

  function reader(key, content) {
    return {
      [readAsync](path) {
        if (!readers[key]) {
          readers[key] = {key, path}
          readers[key].promise = new Promise((resolve, reject) => {
            Object.assign(readers[key], {resolve, reject, content})
            startTimer()
          })
        }
        return readers[key].promise
      }
    }
  }

  function startTimer() {
    if (timer) return
    timer = setTimeout(() => {
      timer = null
      const ok = all(names.map(key => readers[key]))
      try {
        if (!ok) {
          const missing = names.filter(key => !readers[key])
          return Object.values(readers)
            .forEach(({path, reject}) =>
              reject(new ConcurrentReadError(path, missing)))
        }
        let i = ok.length; while (--i >= 0) {
          ok[i].resolve(ok[i].content)
        }
      } finally {
        readers = {}
      }
    }, 13)
  }
}

function failingResponse(data) {
  let timer = null
    , failing = true

  function startTimer() {
    if (timer) return
    failing = false;
    timer = setTimeout(() => {
      failing = true;
      timer = null;
    }, 10)
  }

  return {
    [readAsync]() {
      if(failing) {
        return new Promise((resolve, reject) => {
          startTimer();
          reject(new Server503Error())
        })
      }
      else {
        return Promise.resolve(data)
      }

    }
  }

}

function notFound() {
  return {
    [readAsync]() {
      return Promise.reject(new Server404Error())
    }
  }
}

function all(ary) {
  let i = ary.length; while (--i >= 0) {
    if (!ary[i]) return ary[i]
  }
  return ary
}

String.prototype [readAsync] = async function() { return this.toString() }
Number.prototype [readAsync] = async function() { return +this }

function read(path) {
  return parts(path).reduce((fs, part) => fs[part], fs) [readAsync] (path)
}

function write(path, key, data) {
  return parts(path).reduce((fs, part) => fs[part], fs) [writeAsync] (path, key, data)
}

const parts = path => path.split('/').filter(x => x)
