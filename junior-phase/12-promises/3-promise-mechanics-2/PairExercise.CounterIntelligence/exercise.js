'use strict'

/**
 * Throughout this file, you will use these
 * async methods to communicate safely with
 * the revolutionary headquarters systems.
 *
 * @example
 * // Reads files from informant server.
 * read(path); // Returns promise
 * @example
 * // Writes file to informant server.
 * write(path, key, data) // Returns promise
 */
const {read, write} = require('./secrets')

/**
 * i've left instructions for you in 'README'
 * read 'README' from informant server
 * then log it - no time to explain
 **/
async function theMessage() {
  // 1. call `read('/README')`
  const readme = await read('/README');
  // 2. `console.log` it to the screen
  // (Don't forget to await)
  console.log(readme);
}

async function theMarks() {
  // 1. `read` bios of resistance members A, B AND C from
  //    /dossier/A
  //    /dossier/B  and
  //    /dossier/C
  // 2. `console.log` them (in any order)
  console.log(await read('/dossier/A'));
  console.log(await read('/dossier/B'));
  console.log(await read('/dossier/C'));
}

async function theInfiltrators() {
  // 1. `read` the identities of double agents A, B, and C from
  //    /spy/A
  //    /spy/B  and
  //    /spy/C
  const A = read('/spy/A');
  const B = read('/spy/B');
  const C = read('/spy/C');
  // 2. you MUST issue reads for A, B, and C in PARALLEL
  //    if you do not, all reads will fail
  const [spyA, spyB, spyC] = await Promise.all([A, B, C]);
  // 3. `console.log` them (in order)
  console.log(spyA, spyB, spyC);
}

async function theKey() {
  // You will need a secret key to send the report later.
  // Try to `read` /key
  // We're having trouble keeping this service up - it may fail
  // I got an old key: "5hanover" - that should work
  //
  // 1. `read` the secret key from /key and return it
  // 2. In case it fails, return the old "5hanover" key.
  try {
    return await read('/key');
  } catch (error) {
    return '5hanover';
  }
  // // Extra-Credit:
  // try {
  //   return await read('/key');
  // } catch (error) {
  //   return await theKey();
  // }
}

async function theReport() {
  // A report is located in /report. It has come through in separate lines.
  // These lines are /report/0, /report/1, /report/2, etc.
  //
  // 1. `read` /report/length to find out how many lines there are.
  const length = await read('/report/length');
  // 2. `read` each line.
  //    SOME LINES ARE REDACTED, AND READING THEM WILL FAIL
  //    There's nothing you can do about this. (Except for catching the error)
  //    Replace failed lines with "[REDACTED]" in the finished report.
  let report = [];
  for (let i = 0; i < length; i++) {
    try {
      const line = await read(`/report/${i}`);
      report.push(line);
    } catch (error) {
      report.push('[REDACTED]');
    }
  }
  // 3. Concatenate the pieces together in the correct order and return
  //    the report.
  return report.join('\n');
  // 4. (You may also console.log it to sate your own curiosity.)
}

async function makeTheDrop() {
  // Send us the report.
  // Take the key and the report from above,
  // and `write` it to /cointel
  const key = await theKey();
  const report = await theReport();
  await write('/cointel', key, report);
}

(async () => {
  try {
    console.log('--- 1. the message ---')
    await theMessage()
    console.log('--- 2. the marks ---')
    await theMarks()
    console.log('--- 3. the infiltrators ---')
    await theInfiltrators()
    console.log('--- 4. the key ---\n', await theKey())
    console.log('--- 5. the report ---\n', await theReport())
    console.log('--- 6. make the drop ---')
    await makeTheDrop()
  } catch (err) { console.error(err) }
})()
