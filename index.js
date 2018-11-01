// assume: node 8 or above
const ora = require("ora")
const parseArgs = require("minimist")

const {
  Qtum,
} = require("qtumjs")

const repoData = require("./solar.development.json")
const qtum = new Qtum("http://test:test@localhost:13889", repoData)
const myToken = qtum.contract("cicc-solidity/ContractCreator.sol")

async function NewContract(accountId)
{
    const res = await myToken.call("NewContract", [accountId])
    console.log("New Contract :",res)
}

async function NewContractWithCoin(accountId, amount)
{
    const tx = await myToken.send("NewContractWithCoin", [accountId, amount])
    console.log("NewContractWithCoin tx:", tx.txid)
    console.log(tx)
}

async function main() {
  const argv = parseArgs(process.argv.slice(2))

  const cmd = argv._[0]

  if (process.env.DEBUG) {
    console.log("argv", argv)
    console.log("cmd", cmd)
  }

  switch (cmd) {
    case "Newcon":
      const accountId = argv._[1]
      await NewContract(accountId)
      break
    case "Newconwithcoin":
      const accId = argv._[1]
      const amount = argv._[2]
      await NewContractWithCoin(accId, amount)
      break
    default:
  console.log("unrecognized command", cmd)
  }
}

main().catch(err => {
  console.log("error", err)
})
