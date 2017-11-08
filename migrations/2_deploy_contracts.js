const FundRaise = artifacts.require("./FundRaise.sol")

module.exports = function(deployer) {
    deployer.deploy(FundRaise)
}
