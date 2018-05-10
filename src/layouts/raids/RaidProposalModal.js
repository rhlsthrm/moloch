import React, { Component } from 'react'
import PropTypes from 'prop-types'
import { 
    Modal,
    Button,
    Form,
    Input,
    Grid,
    Label
} from 'semantic-ui-react'
import MessageList from '../messages/MessageList';

class RaidProposalModal extends Component {
    static contextTypes = {
        drizzle: PropTypes.object.isRequired,
        drizzleStore: PropTypes.object.isRequired
    }

    constructor (props, context) {
        super(props)

        this.props = props
        this.context = context
        this.contracts = context.drizzle.contracts
        this.web3 = context.drizzle.web3
        // TO DO: bind functions
        // init state
        this.state = {
            raidProposalIpfsHash: null,
            votingSharesRequested: null,
            acceptedMinDeposit: false,
            formMessages: [],
            formValid: false,
        }
    }

    validate = () => {
        // TO DO: client side error validation (now just cleans data)
        let {
            raidProposalIpfsHash,
            votingSharesRequested,
        } = this.state
        if (!raidProposalIpfsHash || !votingSharesRequested) {
            // at least one field is empty
            let formMessages = []
            formMessages.push({
                icon: 'bullhorn',
                sentiment: 'warning',
                title: 'You sure about that?',
                content:
                  'One or more of the required fields is left empty.'
            })
            this.setState({ formMessages })
            return false
        } else {
            // all values entered
            let formMessages = []
            formMessages.push({
                icon: 'tiny paper plane outline',
                sentiment: 'positive',
                title: 'Channel Request Recieved!',
                content:
                'We have recieved your channel request! Complete the transaction on MetaMask and refresh the page once it is confirmed on chain.'
            })
            this.setState({ formMessages: [] })
            return true
        }
    }

    cleanData = () => {
        const { 
            raidProposalIpfsHash, 
            votingSharesRequested 
        } = this.state
        let results = {}
        results.votingSharesRequested = Number(votingSharesRequested)
        results.raidProposalIpfsHash = this.web3.utils.asciiToHex(raidProposalIpfsHash)
        return results
    }

    submitRaidProposal = ({
        raidProposalIpfsHash, 
        votingSharesRequested
    }) => {
        try {
            // TO DO: retrieve this value from the parameters
            const stackId = this.contracts.Moloch.methods.createProjectProposal.cacheSend(
                raidProposalIpfsHash,
                votingSharesRequested,
                {
                    from: this.props.accounts[0],
                    value: 1000000000000000
                }
            )
            let formMessages = []
            formMessages.push({
                icon: 'paper plane outline',
                sentiment: 'positive',
                title: 'Complete your tx on MetaMask',
                content:
                'We have recieved your guild member request! Complete the transaction on MetaMask and refresh the page once it is confirmed on chain.'
            })
            this.setState(formMessages)
            return stackId
        } catch (e) {
            // unknown error
            console.log(e)
            let messages = this.state.formMessages
            const msg = {
                icon: 'bullhorn',
                sentiment: 'warning',
                title: 'Whoops, looks like an error occurred',
                content: e.toString()
            }
            if (messages.indexOf(msg) === -1 && messages.length === 0) {
                messages.push(msg)
            }
        }
    }

    handleChange = (e) => {
        // clear messages
        const target = e.target
        const name = target.name
        const value = target.value
        this.setState({ [name]: value, formMessages: [] })
    }

    handleSubmit = () => {
        if (this.validate()) {
            // add member proposal to queue
            const stackId = this.submitRaidProposal(this.cleanData())
            console.log('New Member Proposal Submitted. StackId:', stackId)
            return
        }
    }

    handleClose = () => {
        // reset message values
        this.setState({ formMessages: [] })
        return
    }


    render = () => {
        let { formMessages, acceptedMinDeposit } = this.state
        return (
            <Modal
            size='small'
            onClose={this.handleClose}
            trigger={<Button basic>New Raid Proposal</Button>}
            style={{ position: 'absolute', top: '50%', left: '25%' }}
            >
                <Modal.Header>Submit New Raid Proposal</Modal.Header>
                <Modal.Content>
                    <Form>
                        <Form.Field required>
                            <Label basic style={{'border': '0px'}}>IPFS Hash of Proposal</Label>
                            <Input
                                type='text'
                                name='raidProposalIpfsHash'
                                onChange={this.handleChange}
                            />
                        </Form.Field>

                        <Form.Field required>
                            <Label basic style={{'border': '0px'}}>Requested Voting Shares</Label>
                            <Input
                                type='number'
                                name='votingSharesRequested'
                                onChange={this.handleChange}
                            />
                        </Form.Field>

                        <Form.Field required>
                            <div className='ui checkbox'>
                                <input type='checkbox' name='acceptedMinDeposit' onChange={this.handleChange}/>
                                <label>I understand the min deposit is 1 ETH</label>

                            </div>
                        </Form.Field>

                        <Grid centered style={{'margin':'1em'}}>
                            <Button 
                                basic 
                                onClick={this.handleSubmit}
                                disabled={!acceptedMinDeposit}
                            >
                                Submit
                            </Button>
                        </Grid>

                    </Form>

                    <MessageList messages={formMessages} />
                </Modal.Content>
            </Modal>
        )
    }
}

export default RaidProposalModal
