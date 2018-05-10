import Moloch from './../build/contracts/Moloch.json'
import TownHallLib from './../build/contracts/TownHallLib.json'

const drizzleOptions = {
  web3: {
    block: false,
  },
  contracts: [
    Moloch,
    TownHallLib,
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