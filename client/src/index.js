import React from 'react';
import ReactDOM from 'react-dom';
import {
  BrowserRouter as Router
} from 'react-router-dom';
import store from './redux/store';
import './index.css';
import App from './App';
import { Provider } from 'react-redux';
import registerServiceWorker from './registerServiceWorker';
const Root = ()=>(
        <Provider store={store}>
            <Router>
                <App />
            </Router>
          </Provider>
);
ReactDOM.render(<Root />, document.getElementById('root'));
registerServiceWorker();
