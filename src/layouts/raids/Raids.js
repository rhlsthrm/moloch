import React, { Component } from 'react'
import { 
    Grid,
    Icon,
    Container,
} from 'semantic-ui-react'
import RaidProposalModalContainer from './RaidProposalModalContainer';

class Raids extends Component {
    state = {
    
    }

    componentDidMount = () => {
        // TO DO
    }

    render = () => {
        return (
            <Container>
            <Grid centered>
                <Grid.Row>
                    <RaidProposalModalContainer />
                </Grid.Row>
                <Grid.Row>
                    <h4 className='ui horizontal divider header'>
                        <Icon className='crosshairs' />
                        Current Raids
                    </h4>
                </Grid.Row>
                <Grid.Row>
                    <h4 className='ui horizontal divider header'>
                        <Icon className='gavel' />
                        Proposed Raids
                    </h4>
                </Grid.Row>
            </Grid>
            </Container>
        )
    }

}

export default Raids
