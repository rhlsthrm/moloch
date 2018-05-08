import React, { Component } from 'react'

// routing
import {
  BrowserRouter as Router, Switch, Route
} from 'react-router-dom';

// layouts
import HomeContainer from './layouts/home/HomeContainer'
import MainMenuContainer from './layouts/mainMenu/MainMenuContainer'
import RaidsContainer from './layouts/raids/RaidsContainer'
import MemberGridContainer from './layouts/member/MemberGridContainer';

class App extends Component {

  render() {
    return (
      <Router>
        <div className="App">
          <MainMenuContainer />

          <Switch>
              <Route path='/' exact component={HomeContainer} />
              <Route path='/guild' component={MemberGridContainer} />
              <Route path='/raids' component={RaidsContainer} />
          </Switch>
          
        </div>
      </Router>
    );
  }
}

export default App
