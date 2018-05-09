import React, { Component } from 'react'
import PropTypes from 'prop-types'

import { 
    Loader, Header, Container, Icon
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
        }
    }

    componentDidMount = () => {
        this.getCurrentProposalInformation()
    }

    // componentDidUpdate = () => {
    //     // get key values from cache
    //     this.getCurrentProposalInformation()
    // }

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
            const currentProposalIndex = Moloch.getCurrentProposalIndex[currentProposalIndexKey].value
            this.setState({ currentProposalIndex })
        }

        // get details from cache
        if (
            currentProposalDetailsKey && 
            Moloch.getCurrentProposalCommonDetails[currentProposalDetailsKey] &&
            !Moloch.getCurrentProposalCommonDetails[currentProposalDetailsKey].error &&
            !currentProposalDetails
        ) {
            const currentProposalDetails = Moloch.getCurrentProposalCommonDetails[currentProposalDetailsKey].value
            this.setState({ currentProposalDetails })
        }
    }

    render = () => {
        const { currentProposalDetails, currentProposalIndex } = this.state
        const { fetching } = this.state
        if (!currentProposalDetails || !currentProposalIndex) {
            // no current proposal
            return (
                <Container>
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
                <h4 className='ui horizontal divider header'>
                    <Icon className='gavel' />
                    Current Proposal
                </h4>

                <Loader active={fetching} />
            </Container>
        )
    }

}

export default CurrentProposal
