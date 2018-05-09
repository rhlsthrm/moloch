import React, { Component } from 'react'
import { 
    Header, Modal, Grid, TableRow, TableCell
} from 'semantic-ui-react'
import {
    withRouter,
  } from 'react-router-dom';

class MemberRow extends Component {
    state = {
        // member: member, // async db call
    }

    componentDidMount = () => {
        // TO DO
        // fetch member from database
    }

    modalTrigger = (member) => {
        return (
            <TableRow>
                <TableCell>{member.nickname}</TableCell>
                <TableCell>{member.votingShares}</TableCell>
                <TableCell>{member.dateJoined}</TableCell>
                <TableCell>{member.sponsoredBy ? member.sponsoredBy : 'Founder'}</TableCell>
            </TableRow>
        )
    }

    render = () => {
        const { member } = this.props
        return (
            <Modal
                size='small'
                trigger={this.modalTrigger(member)}
                style={{ position: 'absolute', top: '50%', left: '25%' }}
            >
                <Modal.Header>
                    <Header>{member.firstName} {member.lastName}, AKA {member.nickname}, Details</Header>
                </Modal.Header>
                <Modal.Content>
                    <Grid>
                        <Grid.Row columns='2'>
                            <Grid.Column width='4'>
                                <Header as='h5'>Address:</Header>
                            </Grid.Column>
                            <Grid.Column>
                                <p>{member.address}</p>
                            </Grid.Column>
                        </Grid.Row>

                        <Grid.Row columns='2'>
                            <Grid.Column width='4'>
                                <Header as='h5'>Voting Shares:</Header>
                            </Grid.Column>
                            <Grid.Column>
                                <p>{member.votingShares}</p>
                            </Grid.Column>
                        </Grid.Row>

                        <Grid.Row columns='2'>
                            <Grid.Column width='4'>
                                <Header as='h5'>Member Since:</Header>
                            </Grid.Column>
                            <Grid.Column>
                                <p>{member.dateJoined}</p>
                            </Grid.Column>
                        </Grid.Row>

                        <Grid.Row columns='2'>
                            <Grid.Column width='4'>
                                <Header as='h5'>Sponsor:</Header>
                            </Grid.Column>
                            <Grid.Column>
                                <p>{member.sponsoredBy ? member.sponsoredBy : 'Founder'}</p>
                            </Grid.Column>
                        </Grid.Row>

                        <Grid.Row columns='2'>
                            <Grid.Column width='4'>
                                <Header as='h5'>About:</Header>
                            </Grid.Column>
                            <Grid.Column>
                                <p>{member.description}</p>
                            </Grid.Column>
                        </Grid.Row>

                    </Grid>
                </Modal.Content>
            </Modal>
        )
    }

}

export default withRouter(MemberRow)
