import Moloch from './../build/contracts/Moloch.json'

const drizzleOptions = {
  web3: {
    block: false,
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