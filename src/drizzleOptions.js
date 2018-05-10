import Moloch from './../build/contracts/Moloch.json'
import GuildBank from './../build/contracts/GuildBank.json'
import LootToken from './../build/contracts/LootToken.json'
import TownHallLib from './../build/contracts/TownHallLib.json'
import VotingLib from './../build/contracts/VotingLib.json'
import VotingShares from './../build/contracts/VotingShares.json'

const drizzleOptions = {
  web3: {
    block: false,
  },
  contracts: [
    Moloch,
    GuildBank,
    LootToken,
    TownHallLib,
    VotingLib,
    VotingShares
  ],
  events: {
    Moloch: [ 
      'MemberAccepted',
      'MemberExit'
    ],
    TownHallLib: [
      'ProposalCreated',
      'ProposalVotingStarted',
      'ProposalGracePeriodStarted',
      'ProposalCompleted'
    ],
  }
}

export default drizzleOptions