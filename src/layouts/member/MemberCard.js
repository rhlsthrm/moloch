import React, { Component } from 'react'
import { 
    Card, Icon, Header
} from 'semantic-ui-react'

const iconOptions = [
    'chess king',
    'chess queen',
    'chess pawn',
    'chess knight',
    'bug',
    'user secret',
    'hand spock outline',
    'hand rock outline',
    'frown outline',
    'meh outline',
    'smile outline',
    'thumbs down outline',
    'thumps up outline',
    'gem outline',
]

// for testing only
const member = {
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
        icon: null
    }

    componentDidMount = () => {
        this.setRandomIcon()
    }

    setRandomIcon = () => {
        let icon = iconOptions[ Math.floor(Math.random() * iconOptions.length) ]
        this.setState({ icon })
        return
    }

    render = () => {
        const { member, icon } = this.state
        return (
            <Card className='four stackable cards'>
                <Card.Content>
                    <Icon className={icon} size='huge'/>
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
