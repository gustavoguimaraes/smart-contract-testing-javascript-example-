const FundRaise = artifacts.require('./FundRaise.sol')

contract('FundRaise', function ([owner]) {
    let fundRaise

    beforeEach('setup contract for each test', async function () {
        fundRaise = await FundRaise.new(owner)
    })

    it('has an owner', async function () {
        assert.equal(await fundRaise.owner(), owner)
    })
})
