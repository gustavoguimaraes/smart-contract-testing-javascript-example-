const BigNumber = web3.BigNumber

const should = require('chai')
    .use(require('chai-as-promised'))
    .use(require('chai-bignumber')(BigNumber))
    .should()

const EVMThrow = 'invalid opcode'

module.exports = { should, EVMThrow }
