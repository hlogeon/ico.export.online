var SafeMath = artifacts.require('./SafeMath.sol');
var EXON = artifacts.require("./EXON.sol");
var ExonPreSale = artifacts.require("./ExonPreSale.sol");

module.exports = function(deployer) {
  deployer.deploy(SafeMath);
  deployer.link(SafeMath, EXON);
  deployer.link(SafeMath, ExonPreSale);
  deployer.deploy(EXON).then(function() {
    const hardCap = 350000; //in USD
    const softCap = 150000; //in USD
    const token = EXON.address;
    const totalTokens = 1400000; //NOT in wei, converted by contract
    const limit = 50000; //in USD
    const beneficiary = web3.eth.accounts[0];
    const startBlock = web3.eth.blockNumber;
    const endBlock = web3.eth.blockNumber + 100;
    deployer.deploy(ExonPreSale, hardCap, softCap, token, beneficiary, totalTokens, 255, limit, startBlock, endBlock);
  });
};
