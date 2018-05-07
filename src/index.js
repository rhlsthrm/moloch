import React from 'react';
import ReactDOM from 'react-dom';
import { Router, Route } from 'react-router'
import { syncHistoryWithStore } from 'react-router-redux'
import { DrizzleProvider } from 'drizzle-react'
import { createBrowserHistory } from 'history'
// import { BrowserRouter as Router, Route } from 'react-router-dom'

// themes
import '../semantic/dist/semantic.min.css'

// Layouts
import App from './App'

import store from './store'
import drizzleOptions from './drizzleOptions'

// init history
const history = syncHistoryWithStore(createBrowserHistory(), store)

ReactDOM.render((
    <DrizzleProvider options={drizzleOptions} store={store}>
        <Router history={history}>
          <Route path="/" component={App} />
          {/* <Route path="/members" component={MembersContainer} />
          <Route path="/proposals" component={ProposalsContainer} /> */}
        </Router>
    </DrizzleProvider>
  ),
  document.getElementById('root')
);
