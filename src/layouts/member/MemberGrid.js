import React, { Component } from 'react'
import PropTypes from 'prop-types'

import { 
    Grid, 
    Icon, 
    Table, 
    Container, 
    TableHeaderCell, 
    TableHeader, 
    TableRow, 
    TableBody, 
    Input, 
    Button,
    Header
} from 'semantic-ui-react'

// layouts
import MemberRow from './MemberRow';
import MemberProposalModalContainer from './MemberProposalModalContainer'

// actions
import { getMemberKey, getVotingSharesKey } from '../../actions';

class MemberGrid extends Component {
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
            members: [],
            address: null, // remove when remove display address
            votingShares: null,
            isMember: null,
        }
    }

    componentDidMount = () => {
        // TO DO
        // get members from db
    }

    componentDidUpdate = () => {
        // set display values from fn returns
        this.displayFunctionResults()
    }

    handleChange = (e) => {
        const target = e.target
        const name = target.name
        const value = target.value
        this.setState({ [name]: value })
    }

    // used to test getMember and getVoting shares
    // by member address. should delete after testing
    displayFunctionResults = () => {
        const { Moloch, memberKey, votingSharesKey } = this.props
        const { votingShares, isMember } = this.state

        // get is member from cache
        if (
            memberKey && 
            Moloch.getMember[memberKey] &&
            !Moloch.getMember[memberKey].error &&
            isMember === null
        ) {
            const isMemberValue = Moloch.getMember[memberKey].value
            this.setState({ isMember: isMemberValue })
            console.log('isMember:', isMemberValue)
        }

        // get voting shares from cache
        if (
            votingSharesKey && 
            Moloch.getVotingShares[votingSharesKey] &&
            !Moloch.getVotingShares[votingSharesKey].error &&
            !votingShares
        ) {
            const votingSharesValue = Moloch.getVotingShares[votingSharesKey].value
            this.setState({ votingShares: votingSharesValue })
            console.log('votingShares:', votingSharesValue)
        }
    }

    displayMember = () => {
        const { address } = this.state
        const { dispatch } = this.props
        if ( address === null ) {
            return
        }
        dispatch(getMemberKey(address, this.contracts.Moloch))
        dispatch(getVotingSharesKey(address, this.contracts.Moloch))
    }

    render = () => {
        return (
                <div>
                    <Container>
                        <Grid relaxed style={{'margin': '1em'}}>
                            <Grid.Row centered>
                                <MemberProposalModalContainer />
                            </Grid.Row>
                            <Grid.Row>
                                <h4 className='ui horizontal divider header'>
                                    <Icon className='users' />
                                    Guild Members
                                </h4>
                            </Grid.Row>

                            <Grid.Row centered>
                                <div className='ui action input'>
                                    <Input 
                                        type='text' 
                                        placeholder='Member address...' 
                                        name='address'
                                        onChange={this.handleChange}
                                    />
                                    <Button 
                                        className='ui button'
                                        basic
                                        onClick={this.displayMember}
                                        content='Display'
                                    />
                                </div>
                            </Grid.Row>
                            <Grid.Row centered columns='2'>
                                <Header>
                                    {this.state.isMember !== null ? 
                                        'Is Member? ' + this.state.isMember : 
                                        ''}
                                </Header>
                                <Header>
                                    {this.state.votingShares !== null ? 
                                        'Voting Shares: ' + this.state.votingShares : 
                                        '' }
                                </Header>
                            </Grid.Row>


                            <Grid.Row>
                                <Table celled selectable>
                                    <TableHeader>
                                        <TableRow>
                                            <TableHeaderCell content='Name' />
                                            <TableHeaderCell content='Voting Shares' />
                                            <TableHeaderCell content='Member Since' />
                                            <TableHeaderCell content='Sponsor' />
                                        </TableRow>
                                    </TableHeader>

                                    <TableBody>
                                            {this.state.members.map( (member, index) => {
                                                return (
                                                    <MemberRow member={member} key={index} />
                                                )
                                            })}
                                    </TableBody>
                                </Table>
                            </Grid.Row>

                        </Grid>
                    </Container>
                </div>
        )
    }

}

export default MemberGrid
