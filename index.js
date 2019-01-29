#!/usr/bin/env node

const 
  Karma = require("karmachain"),
  { PrivateKey } = require("karmajs"),
  readline = require('readline'),
  read = readline.createInterface({ input: process.stdin, output: process.stdout });

Karma.subscribe("connected", start)


const answer = question => {
  return new Promise(resolve => {
    read.question(question, resolve)
  })
}

async function start() {
  let privateKey = await answer("Enter the private key: ")

  let account = await Karma.db.get_key_references([
    PrivateKey.fromWif(privateKey).toPublicKey().toString()
  ]).catch(console.log)

  if (account[0][0])
    console.log("Your account name is ", (await Karma.accounts[account[0][0]]).name)
  else
    console.log("Account not found")

  await Karma.disconnect()
}
