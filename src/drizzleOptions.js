import SimpleStorage from './../build/contracts/SimpleStorage.json'

const drizzleOptions = {
  web3: {
    block: false,
    fallback: {
      type: 'ws',
      url: 'ws://127.0.0.1:8545'
    }
  },
  contracts: [
    SimpleStorage
  ],
  events: {
    SimpleStorage: [ 'StorageSet' ]
  }
}

export default drizzleOptions