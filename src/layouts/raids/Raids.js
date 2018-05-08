import React, { Component } from 'react'
import { 
    Grid,
    Icon
} from 'semantic-ui-react'

class Raids extends Component {
    state = {
    
    }

    componentDidMount = () => {
        // TO DO
    }

    render = () => {
        return (
            <Grid>
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
        )
    }

}

export default Raids
