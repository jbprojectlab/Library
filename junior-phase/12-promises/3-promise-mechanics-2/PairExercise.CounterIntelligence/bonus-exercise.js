'use strict'

const {read, write} = require('./secrets')

// This is where we strike back.

async function theDoubleAgents() {
  // 1. `read` the double agents files
  //    /agent/0 through
  //    /agent/9
  // 2. Some of the reads will fail. Retry in case of error 503
  //    (server unavailable).
  //    DO NOT RETRY in case of error 404 (Not Found) - just skip those
  //    (they were either retired or gave up)
  // 3. `console.log` them (in any order)
  for (let i = 0; i < 10; i++) {
    const filepath = `/agent/${i}`;
    try {
      console.log(await read(filepath));
    } catch (error) {
      if (error.status === 503) {
        console.log(await read(filepath));
      }
    }
  }
}

async function theSchedule() {

  // We need to find and infiltrate their upcoming meetings
  // Their schedule data is encoded in Base64 and splited
  // into multiple json Files.
  // Each file contains part of the information and a reference
  // to the next file.
  //
  // We got intel on the first file: '/schedule/TmV4dCB'
  //
  // 1. `read` /schedule/TmV4dCB - it's a JSON file - parse it
  // 2. The parsed data contains a `data` and `next` keys
  // 3. Keep reading the next files by following the `next` key
  //    until there is no next file.
  // 4. Server is inconsistent. Retry in case of error 503
  //    (server unavailable)
  let messageText = '';
  let schedule = {next: 'TmV4dCB'};
  while (schedule.next !== null) {
    const filepath = `/schedule/${schedule.next}`;
    let jsonStr;
    try {
      jsonStr = await read(filepath);
    } catch (error) {
      if (error.status === 503) {
        jsonStr = await read(filepath);
      }
    }
    if (!jsonStr) break;
    schedule = JSON.parse(jsonStr);
    messageText += schedule.data;
  }
  const humanReadableMessage = new Buffer(messageText, 'base64').toString('utf8');
  console.log(humanReadableMessage);
}


(async () => {
  try {
    console.log('--- 1. the double agents ---')
    await theDoubleAgents()
    console.log('--- 2. the schedule ---')
    await theSchedule()
  } catch (err) { console.error(err) }
})()
