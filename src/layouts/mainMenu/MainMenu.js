import React, { Component } from 'react'
import { 
    Menu, 
    Grid
} from 'semantic-ui-react'

// routing

import {
    withRouter,
  } from 'react-router-dom';

class MainMenu extends Component {
    state = {
        // TO DO: set to url param
        activeMenuItem: this.props.history[this.props.history.length-1]
    }

    handleMenuItemClick = (e, { name }) => {
        this.setState({ activeMenuItem: name })
        if (name !== 'home') {
            this.props.history.push('/' + name)
        } else if (name === 'home') {
            this.props.history.push('/')
        }
    }

    render = () => {
        console.log()
        const { activeMenuItem } = this.state
        return (
            <Grid style={{'margin': '1em'}}>
                <Grid.Row>
                    <Menu secondary pointing fluid attached='top'>
                        <Menu.Item
                            name='home'
                            active={activeMenuItem === 'home'}
                            onClick={this.handleMenuItemClick}
                            content='Home'
                        />

                        <Menu.Item
                            name='guild'
                            active={activeMenuItem === 'guild'}
                            onClick={this.handleMenuItemClick}
                            content='Guild'
                        />

                        <Menu.Item
                            name='raids'
                            active={activeMenuItem === 'raids'}
                            onClick={this.handleMenuItemClick}
                            content='Raids'
                        />
                    </Menu>
                </Grid.Row>
            </Grid>
        )
    }

}

export default withRouter(MainMenu)
