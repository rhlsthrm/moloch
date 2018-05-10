import React, { Component } from 'react'
import PropTypes from 'prop-types'

import { 
    Loader, Header, Container, Icon, Button, Grid, Form
} from 'semantic-ui-react'

class CurrentProposal extends Component {
    static contextTypes = {
        drizzle: PropTypes.object.isRequired,
        drizzleStore: PropTypes.object.isRequired
    }
    
    constructor(props, context) {
        super(props)

        this.props = props
        this.context = context
        this.contracts = context.drizzle.contracts
        // init state
        this.state = {
            errors: [],
            currentProposalDetails: null,
            currentProposalIndex: null,
            currentProposalVote: null
        }
    }

    handleVoteChange = (e) => {
        const target = e.target
        const currentProposalVote = Number(target.id)
        this.setState({ currentProposalVote })
    }

    /** CALL CONTRACT FUNCTIONS */
    startCurrentProposalVote = () => {
        try {
            const stackId = this.contracts.Moloch.methods.startProposalVote.cacheSend({
                from: this.props.accounts[0]
            })
            return stackId
        } catch (e) {
            // unknown error
            console.log(e)
            let errors = this.state.errors
            const err = {
                icon: 'bullhorn',
                sentiment: 'warning',
                title: 'Whoops, looks like an error occurred',
                content: e.toString()
            }
            if (errors.indexOf(err) === -1 && errors.length === 0) {
                errors.push(err)
            }
        }
    }

    voteOnCurrentProposal = () => {
        const { currentProposalVote } = this.state
        try {
            const stackId = this.contracts.Moloch.methods.voteOnCurrentProposal.cacheSend(
                currentProposalVote,
                { 
                    from: this.props.accounts[0]
                }
            )
            return stackId
        } catch (e) {
            // unknown error
            console.log(e)
            let errors = this.state.errors
            const err = {
                icon: 'bullhorn',
                sentiment: 'warning',
                title: 'Whoops, looks like an error occurred',
                content: e.toString()
            }
            if (errors.indexOf(err) === -1 && errors.length === 0) {
                errors.push(err)
            }
        }
    }

    transitionCurrentProposal = () => {
        try {
            const stackId = this.contracts.Moloch.methods.transitionProposalToGracePeriod.cacheSend(
                {
                    from: this.props.accounts[0]
                }
            )
            return stackId
        } catch (e) {
            // unknown error
            console.log(e)
            let errors = this.state.errors
            const err = {
                icon: 'bullhorn',
                sentiment: 'warning',
                title: 'Whoops, looks like an error occurred',
                content: e.toString()
            }
            if (errors.indexOf(err) === -1 && errors.length === 0) {
                errors.push(err)
            }
        }
    }

    finishCurrentProposal = () => {
        try {
            const stackId = this.contracts.Moloch.methods.finishProposal.cacheSend(
                {
                    from: this.props.accounts[0]
                }
            )
            return stackId
        } catch (e) {
            // unknown error
            console.log(e)
            let errors = this.state.errors
            const err = {
                icon: 'bullhorn',
                sentiment: 'warning',
                title: 'Whoops, looks like an error occurred',
                content: e.toString()
            }
            if (errors.indexOf(err) === -1 && errors.length === 0) {
                errors.push(err)
            }
        }
    }

    getCurrentProposalInformation = () => {
        const { 
            currentProposalDetailsKey, 
            currentProposalIndexKey,
            Moloch 
        } = this.props
        const { 
            currentProposalIndex,
            currentProposalDetails
        } = this.state
        // get index from cache
        if (
            currentProposalIndexKey && 
            Moloch.getCurrentProposalIndex[currentProposalIndexKey] &&
            !Moloch.getCurrentProposalIndex[currentProposalIndexKey].error &&
            !currentProposalIndex
        ) {
            const currentProposalIndexValue = Moloch.getCurrentProposalIndex[currentProposalIndexKey].value
            console.log('currentProposalIndex:', currentProposalIndexValue)
            this.setState({ currentProposalIndex: currentProposalIndexValue })
        }

        // get details from cache
        if (
            currentProposalDetailsKey && 
            Moloch.getCurrentProposalCommonDetails[currentProposalDetailsKey] &&
            !Moloch.getCurrentProposalCommonDetails[currentProposalDetailsKey].error &&
            !currentProposalDetails
        ) {
            const currentProposalDetailsValue = Moloch.getCurrentProposalCommonDetails[currentProposalDetailsKey].value
            console.log('currentProposalDetails:', currentProposalDetailsValue)
            this.setState({ currentProposalDetails: currentProposalDetailsValue })
        }
    }

    /** LIFECYCLE METHODS */
    componentDidMount = () => {
        this.getCurrentProposalInformation()
    }

    render = () => {
        const { currentProposalDetails, currentProposalIndex } = this.state
        const { fetching } = this.state
        if (!currentProposalDetails || !currentProposalIndex) {
            // no current proposal
            return (
                <Container>
                    <Button basic onClick={this.getCurrentProposalInformation}>Get Current Proposal Info</Button>
                    <h4 className='ui horizontal divider header'>
                        <Icon className='gavel' />
                        Current Proposal
                    </h4>

                    <Header textAlign='center'>None</Header>
                </Container>
            )
        }

        return (
            <Container>
                <Button basic onClick={this.getCurrentProposalInformation}>Get Current Proposal Info</Button>

                <h4 className='ui horizontal divider header'>
                    <Icon className='gavel' />
                    Current Proposal
                </h4>

                <Loader active={fetching} />

                <Header>{'Index: ' + currentProposalIndex}</Header>
                <Header>{'Details: ' + currentProposalDetails.toString()}</Header>

                <Grid centered celled columns='4'>
                    <Grid.Column>
                        <Button 
                            basic 
                            onClick={this.startCurrentProposalVote}
                        >
                            Start Current Proposal Vote
                        </Button>
                    </Grid.Column>
                    <Grid.Column>
                        <Form>
                            <div className='grouped fields'>
                                <label>Cast Vote on Current Proposal</label>
                                <div className='field'>
                                    <div className='ui radio checkbox'>
                                        <input type='radio' name='vote' id='1' onChange={this.handleVoteChange}/> 
                                        <label>Yes</label>                                           
                                    </div>
                                        
                                </div>
                                <div className='field'>
                                    <div className='ui radio checkbox'>
                                        <input type='radio' name='vote' id='0' onChange={this.handleVoteChange}/> 
                                        <label>No</label> 
                                    </div>
                                </div>
                            </div>
                        </Form>
                        <Button 
                            basic 
                            onClick={this.voteOnCurrentProposal}
                        >
                            Submit
                        </Button>
                    </Grid.Column>
                    <Grid.Column>
                        <Button 
                            basic 
                            onClick={this.transitionCurrentProposal}
                        >
                            Transition Current Proposal to Grace Period
                        </Button>
                    </Grid.Column>
                    <Grid.Column>
                        <Button 
                            basic 
                            onClick={this.finishCurrentProposal}
                        >
                            Finish Current Proposal
                        </Button>
                    </Grid.Column>
                </Grid>
            </Container>
        )
    }

}

export default CurrentProposal
