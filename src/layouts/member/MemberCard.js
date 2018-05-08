import React, { Component } from 'react'
import { 
    Card, Header
} from 'semantic-ui-react'
import {
    withRouter,
  } from 'react-router-dom';

class MemberCard extends Component {
    state = {
        // member: member, // async db call
    }

    componentDidMount = () => {
        // TO DO
        // fetch member from database
    }

    render = () => {
        const { member } = this.props
        return (
            <Card className='ui fluid card' style={{'margin': '1em'}}>
                <Card.Content onClick={()=>this.props.history.push(`/guild/${member.address}`)}>
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

export default withRouter(MemberCard)
