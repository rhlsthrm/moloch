import React, { Component } from 'react'
import { 
    Card, Header
} from 'semantic-ui-react'

// for testing only
let member = {
    votingShares: '723',
    address: '0x00',
    firstName: 'First',
    lastName: 'Last',
    nickname: 'Nickname',
    description: 'Short bio about the member and stuff',
    dateJoined: '12/12/12',
    sponsoredBy: null,
}

class MemberCard extends Component {
    state = {
        member: member, // async db call
    }

    componentDidMount = () => {
        // TO DO
        // fetch member from database
    }

    render = () => {
        const { member } = this.state
        return (
            <Card className='four stackable cards'>
                <Card.Content>
                    <Header as='h3'>
                        {member.firstName} {member.lastName}, AKA {member.nickname}
                    </Header>
                    <Header.Subheader as='h5'>
                        {member.address.substring(0,10) + '...'}
                    </Header.Subheader>
                    <div className='meta'>
                        <span className='date'>Guild Member since {member.dateJoined}</span>
                    </div>
                    <div className='description'>
                        {member.description}
                    </div>               
                </Card.Content>
            </Card>
        )
    }

}

export default MemberCard
