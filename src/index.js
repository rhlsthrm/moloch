import React from 'react';
import ReactDOM from 'react-dom';
import { DrizzleProvider } from 'drizzle-react'

// themes
import '../semantic/dist/semantic.min.css'

// Layouts
import App from './App'

import store from './store'
import drizzleOptions from './drizzleOptions'

ReactDOM.render((
    <DrizzleProvider options={drizzleOptions} store={store}>
      <div>
        <App />
      </div>
    </DrizzleProvider>
  ),
  document.getElementById('root')
);
