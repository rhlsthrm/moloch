import React, { Component } from 'react'
import PropTypes from 'prop-types'
import { 
    Modal,
    Button,
    Form,
    Input,
    Grid,
    Checkbox,
    Label
} from 'semantic-ui-react'
import MessageList from '../messages/MessageList';

class MemberProposalModal extends Component {
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
            prospectiveMemberAddress: null,
            ethTributeAmount: null,
            tokenTributeAddresses: null, // array of addresses
            tokenTributeAmounts: null, // array of tribute
            votingSharesRequested: null,
            formMessages: [],
            formValid: false,
            isTokenTribute: false,
        }
    }

    validate = () => {
        // TO DO: client side error validation (now just cleans data)
        let {
            prospectiveMemberAddress,
            tokenTributeAddresses,
            tokenTributeAmounts,
            votingSharesRequested,
        } = this.state
        if (!prospectiveMemberAddress || !votingSharesRequested) {
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
            prospectiveMemberAddress,
            ethTributeAmount,
            tokenTributeAddresses,
            tokenTributeAmounts,
            votingSharesRequested
        } = this.state
        const results = {}

        // format csvs, update state
        results.tokenTributeAddresses = tokenTributeAddresses === null ?
            [] :
            tokenTributeAddresses.split(',').map( (address) => {
                return address.trim()
            })

        results.tokenTributeAmounts = tokenTributeAmounts === null ? 
            [] : 
            tokenTributeAmounts.split(',').map( (amount) => {
                return Number(amount.trim())
            })

        // convert eth deposit to wei
        results.ethTributeInWei = this.web3.utils.toWei(ethTributeAmount)

        results.prospectiveMemberAddress = prospectiveMemberAddress
        results.votingSharesRequested = Number(votingSharesRequested)
        return results
    }

    submitMemberProposal = ({
        prospectiveMemberAddress,
        tokenTributeAddresses,
        tokenTributeAmounts,
        votingSharesRequested,
        ethTributeInWei
    }) => {
        try {
            const stackId = this.contracts.Moloch.methods.createMemberProposal.cacheSend(
                prospectiveMemberAddress,
                tokenTributeAddresses,
                tokenTributeAmounts,
                votingSharesRequested,
                {
                    from: this.props.accounts[0],
                    value: ethTributeInWei
                }
            )
            let messages = []
            messages.push({
                icon: 'paper plane outline',
                sentiment: 'positive',
                title: 'Complete your tx on MetaMask',
                content:
                'We have recieved your guild member request! Complete the transaction on MetaMask and refresh the page once it is confirmed on chain.'
            })
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
            const stackId = this.submitMemberProposal(this.cleanData())
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
        let { formMessages, isTokenTribute } = this.state
        return (
            <Modal
            size='small'
            onClose={this.handleClose}
            trigger={<Button basic>New Member Proposal</Button>}
            style={{ position: 'absolute', top: '50%', left: '25%' }}
            >
                <Modal.Header>Submit New Guild Member Proposal</Modal.Header>
                <Modal.Content>
                    <Form>
                        <Form.Field required>
                            <Label basic style={{'border': '0px'}}>Member Address</Label>
                            <Input
                                type='text'
                                name='prospectiveMemberAddress'
                                onChange={this.handleChange}
                            />
                        </Form.Field>

                        <Form.Field>
                            <Label basic style={{'border': '0px'}}>ETH Tribute Amount</Label>
                            <Input
                                type='number'
                                name='ethTributeAmount'
                                onChange={this.handleChange}
                            />
                        </Form.Field>

                        <Form.Field>
                            <Grid>
                                <Checkbox 
                                    className='ui toggle'
                                    defaultChecked={isTokenTribute}
                                    onChange={() => { this.setState({ isTokenTribute: !isTokenTribute }) }}
                                    style={{'marginTop':'1em', 'marginBottom': '1em', 'marginRight': '1em'}}
                                />
                                <Label 
                                    basic 
                                    style={{'border': '0px', 'marginTop':'1em', 'marginBottom': '1em'}}
                                >
                                    Token Tribute
                                </Label>
                            </Grid>
                        </Form.Field>

                        <Form.Field disabled={!isTokenTribute}>
                            <Label basic style={{'border': '0px'}}>Token Tribute Addresses (csv)</Label>
                            <Input
                                type='text'
                                name='tokenTributeAddresses'
                                onChange={this.handleChange}
                            />
                        </Form.Field>
                        <Form.Field disabled={!isTokenTribute}>
                            <Label basic style={{'border': '0px'}}>Token Tribute Amounts (csv)</Label>
                            <Input
                                type='text'
                                name='tokenTributeAmounts'
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

                        <Grid centered style={{'margin':'1em'}}>
                            <Button basic onClick={this.handleSubmit}>Submit</Button>
                        </Grid>

                    </Form>

                    <MessageList messages={formMessages} />
                </Modal.Content>
            </Modal>
        )
    }
}

export default MemberProposalModal
