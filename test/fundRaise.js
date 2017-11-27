const FundRaise = artifacts.require('./FundRaise.sol')
const { should, EVMThrow } = require('./helpers')

contract('FundRaise', function ([owner, donor]) {
    let fundRaise

    beforeEach('setup contract for each test', async function () {
        fundRaise = await FundRaise.new(owner)
    })

    it('has an owner', async function () {
        const fundRaiseOwner = await fundRaise.owner()

        fundRaiseOwner.should.be.equal(owner)
    })

    it('accepts funds', async function () {
        await fundRaise.sendTransaction({ value: 1e+18, from: donor })

        const fundRaiseAddress = await fundRaise.address
        web3.eth.getBalance(fundRaiseAddress).should.be.bignumber.equal(1e+18)
    })

    it('is able to pause and unpause fund activity', async function () {
        await fundRaise.pause()
        fundRaise.sendTransaction({ value: 1e+18, from: donor }).should.be.rejectedWith(EVMThrow)

        const fundRaiseAddress = await fundRaise.address
        web3.eth.getBalance(fundRaiseAddress).should.be.bignumber.equal(0)

        // unpausing it
        await fundRaise.unpause()
        await fundRaise.sendTransaction({ value: 1e+18, from: donor })
        web3.eth.getBalance(fundRaiseAddress).should.be.bignumber.equal(1e+18)
    })

    it('permits owner to receive funds', async function () {
        await fundRaise.sendTransaction({ value: 1e+18, from: donor })
        const ownerBalanceBeforeRemovingFunds = web3.eth.getBalance(owner).toNumber()

        const fundRaiseAddress = await fundRaise.address
        web3.eth.getBalance(fundRaiseAddress).should.be.bignumber.equal(1e+18)

        // removing funds
        await fundRaise.removeFunds()
        web3.eth.getBalance(fundRaiseAddress).should.be.bignumber.equal(0)
        web3.eth.getBalance(owner).should.be.bignumber.above(ownerBalanceBeforeRemovingFunds)

    })
})
