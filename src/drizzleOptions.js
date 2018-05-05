import Moloch from './../build/contracts/Moloch.json'

const drizzleOptions = {
  web3: {
    block: false,
    fallback: {
      type: 'ws',
      url: 'ws://127.0.0.1:8545'
    }
  },
  contracts: [
    Moloch
  ],
  events: {
    Moloch: [ 
      'MemberAccepted',
      'MemberExit'
    ]
  }
}

export default drizzleOptions