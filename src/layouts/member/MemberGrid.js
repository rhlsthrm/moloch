import React, { Component } from 'react'
import { 
    Grid, Icon, Table, Container, TableHeaderCell, TableHeader, TableRow, TableBody
} from 'semantic-ui-react'
import MemberRow from './MemberRow';
import MemberProposalModalContainer from './MemberProposalModalContainer'

class MemberGrid extends Component {
    state = {
        members: []
    }

    componentWillReceiveProps = (nextProps) => {
        // TO DO
        // get members
        if (!nextProps || nextProps === this.props) {
            return
        }
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
