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

// import requireAuth from './utils/authenticated';

import Main from './components/main';
import Aside from './components/aside';
import UserLogout from './components/user/logout';

import '../node_modules/normalize.css/normalize.css';
import '../node_modules/@blueprintjs/core/dist/blueprint.css';
import './index.css';
import './styles/main.module.scss';

// import App from './App';
// import UserLogin from './components/user/login';
// import UserRegister from './components/user/register';
// import UserProfile from './components/user/profile';
// import ResetPassword from './components/user/reset_password';



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
      <div className='app-core'>
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
              <Route path="/logout" component={UserLogout} />
            </div>
          </div>
          <div className='holygrail-footer'><span className='footer-span'>Built by Nick Svetnicka for Turing</span></div>
        </div>
      </div>
    </ConnectedRouter>
  </Provider>
  , document.getElementById('root')
);
registerServiceWorker();
