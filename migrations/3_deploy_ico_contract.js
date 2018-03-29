var SafeMath = artifacts.require('./SafeMath.sol');
var EXON = artifacts.require("./EXON.sol");
var ExonICO = artifacts.require("./ExonICO.sol");
var EthPriceProvider = artifacts.require("./EthPriceProvider.sol");
var BtcPriceProvider = artifacts.require("./BtcPriceProvider.sol");
var InvestorWhiteList = artifacts.require("./InvestorWhiteList.sol");

module.exports = function(deployer) {
  deployer.deploy(SafeMath);
  deployer.link(SafeMath, EXON);
  deployer.link(SafeMath, ExonICO);
  deployer.deploy(EXON).then(async function() {
    const hardCap = 26600000; //in EXON
    const softCap = 2500000; //in EXON
    const token = EXON.address;
    const beneficiary = web3.eth.accounts[0];
    const startBlock = web3.eth.blockNumber;
    const endBlock = web3.eth.blockNumber + 2000;
    await deployer.deploy(InvestorWhiteList);
    await deployer.deploy(ExonICO, hardCap, softCap, token, beneficiary, InvestorWhiteList.address, 25500, 420000, startBlock, endBlock);
    await deployer.deploy(EthPriceProvider);
    await deployer.deploy(BtcPriceProvider);

    const icoInstance = web3.eth.contract(ExonICO.abi).at(ExonICO.address);
    const ethProvider = web3.eth.contract(EthPriceProvider.abi).at(EthPriceProvider.address);
    const btcProvider = web3.eth.contract(BtcPriceProvider.abi).at(BtcPriceProvider.address);

    icoInstance.setEthPriceProvider(EthPriceProvider.address, { from: web3.eth.accounts[0] });
    icoInstance.setBtcPriceProvider(BtcPriceProvider.address, { from: web3.eth.accounts[0] });
    ethProvider.setWatcher(ExonICO.address, { from: web3.eth.accounts[0] });
    btcProvider.setWatcher(ExonICO.address, { from: web3.eth.accounts[0] });

    //start update and send ETH to cover Oraclize fees
    ethProvider.startUpdate(30000, { value: web3.toWei(1000), from: web3.eth.accounts[0], gas: 200000 });
    btcProvider.startUpdate(650000, { value: web3.toWei(1000), from: web3.eth.accounts[0], gas: 200000 });
  });
};
