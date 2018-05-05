import React from 'react';
import ReactDOM from 'react-dom';
import { Router, Route, IndexRoute } from 'react-router-dom'
import { syncHistoryWithStore } from 'react-router-redux'
import { DrizzleProvider } from 'drizzle-react'
import { createBrowserHistory } from 'history'
// import { BrowserRouter as Router, Route } from 'react-router-dom'

// Layouts
import App from './App'
import HomeContainer from './layouts/home/HomeContainer'

import store from './store'
import drizzleOptions from './drizzleOptions'

// init history
const history = syncHistoryWithStore(createBrowserHistory(), store)

ReactDOM.render((
    <DrizzleProvider options={drizzleOptions} store={store}>
        <Router history={history}>
          <Route path="/" component={App}>
            <IndexRoute component={HomeContainer} />
          </Route>
        </Router>
    </DrizzleProvider>
  ),
  document.getElementById('root')
);
