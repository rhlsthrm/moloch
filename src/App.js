import React, { Component } from 'react'

// routing
import {
  BrowserRouter as Router,
  Route,
  Switch
} from 'react-router-dom';

// layouts
import HomeContainer from './layouts/home/HomeContainer';
import MainMenuContainer from './layouts/mainMenu/MainMenuContainer'
import MemberCardContainer from './layouts/member/MemberCardContainer';
import RaidsContainer from './layouts/raids/RaidsContainer';

class App extends Component {
  render() {
    return (
      <Router>
        <div className="App">
          <MainMenuContainer />
          <Switch>
            <Route path='/' exact component={HomeContainer} />
            <Route path='/guild' component={MemberCardContainer} />
            <Route path='/raids' component={RaidsContainer} />
          </Switch>
        </div>
      </Router>
    );
  }
}

export default App
