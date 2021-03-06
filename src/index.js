import React from 'react';
import ReactDOM from 'react-dom';
import registerServiceWorker from './registerServiceWorker';
import { Provider } from 'react-redux';
import { createStore, applyMiddleware } from 'redux';
import { createBrowserHistory } from 'history';
import { Route } from 'react-router';
import { ConnectedRouter, routerMiddleware } from 'react-router-redux';
import ReduxPromise from 'redux-promise';
import rootReducers from './reducers';
import Main from './components/main';
import Aside from './components/aside';
import UserLogout from './components/user/logout';
import '../node_modules/normalize.css/normalize.css';
import '../node_modules/@blueprintjs/core/dist/blueprint.css';
import '../node_modules/@blueprintjs/datetime/dist/blueprint-datetime.css';
import './styles/ionicons.css';
import './index.css';
import './styles/main.module.scss';

const devTools = window.__REDUX_DEVTOOLS_EXTENSION__ && window.__REDUX_DEVTOOLS_EXTENSION__();

const browserHistory = createBrowserHistory();

const store = createStore(
  rootReducers,
  devTools,
  applyMiddleware(ReduxPromise)
)
window.appStore = store;    // In case you want to see what's inside
                            // by executing appStore.getState() in console;

ReactDOM.render(
  <Provider store={store}>
    <ConnectedRouter history={browserHistory}>
      <div className='app-core pt-dark'>
        <div className='app-wrapper'>
          <div className='holygrail-header'>
            <h1>You Complete Me</h1>
          </div>
          <div className='holygrail-body'>
            <div className='holygrail-content'>
              <Route path="/" component={Main} />
            </div>
            <div className='holygrail-left'>
              <Route path="/" component={Aside} />
            </div>
            <div className='holygrail-right'>
            </div>
          </div>
          <div className='holygrail-footer'><span className='footer-span'> </span></div>
        </div>
      </div>
    </ConnectedRouter>
  </Provider>
  , document.getElementById('root')
);
registerServiceWorker();
