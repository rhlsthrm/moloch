import React, { Component } from 'react'
import { 
    Grid, Icon
} from 'semantic-ui-react'
import MemberCardContainer from './MemberCardContainer';
import MemberProposalModal from './MemberProposalModal'
// test members
import members from './membersTest'

class MemberGrid extends Component {
    state = {
        members: members
    }

    componentDidMount = () => {
        // TO DO
    }

    render = () => {
        return (
                <div className='ui fluid link cards'>
                    <Grid relaxed style={{'margin': '1em'}}>
                        <Grid.Row centered>
                            <MemberProposalModal />
                        </Grid.Row>
                        <Grid.Row>
                            <h4 className='ui horizontal divider header'>
                                <Icon className='user plus' />
                                Proposed Guild Members
                            </h4>
                        </Grid.Row>
                        <Grid.Row>
                            {this.state.members.map( (member, index) => {
                                return (
                                    <div key={index}>
                                        <Grid.Column style={{'margin': '1em'}}>
                                            <MemberCardContainer member={member} />
                                        </Grid.Column>
                                    </div>
                                )
                            })}
                        </Grid.Row>
                        <Grid.Row>
                            <h4 className='ui horizontal divider header'>
                                <Icon className='users' />
                                Current Guild Members
                            </h4>
                        </Grid.Row>
                        <Grid.Row>
                            {this.state.members.map( (member, index) => {
                                return (
                                    <div key={index}>
                                        <Grid.Column style={{'margin': '1em'}}>
                                            <MemberCardContainer member={member} />
                                        </Grid.Column>
                                    </div>
                                )
                            })}
                        </Grid.Row>
                    </Grid>
                </div>
        )
    }

}

export default MemberGrid
