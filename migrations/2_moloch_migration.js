/* global artifacts */

const Moloch = artifacts.require('./Moloch.sol')
const VotingShares = artifacts.require('./VotingShares.sol')
const LootToken = artifacts.require('./LootToken.sol')
const GuildBank = artifacts.require('./GuildBank.sol')
const TownHallLib = artifacts.require('./TownHallLib.sol')
const VotingLib = artifacts.require('./VotingLib.sol')

const foundersJSON = require('./founders.json')
const configJSON = require('./config.json')

module.exports = (deployer, network, accounts) => {
  deployer.deploy(VotingShares)
    .then(() => {
      return deployer.deploy(VotingLib)
    })
    .then(() => {
      deployer.link(VotingLib, TownHallLib)
      return deployer.deploy(TownHallLib)
    })
    .then(() => {
      return deployer.deploy(LootToken)
    })
    .then(() => {
      return deployer.deploy(GuildBank, LootToken.address)
    })
    .then(() => {
      deployer.link(TownHallLib, Moloch)
      return deployer.deploy(
        Moloch,
        VotingShares.address,
        LootToken.address,
        GuildBank.address,
        foundersJSON.addresses,
        foundersJSON.shares,
        configJSON.PROPOSAL_VOTE_TIME_SECONDS,
        configJSON.GRACE_PERIOD_SECONDS,
        configJSON.MIN_PROPOSAL_CREATION_DEPOSIT_WEI
      )
    })
}
