import React, { Component } from 'react';
import { browserHistory } from 'react-router-dom';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import { registerUser } from '../../actions/firebase_actions';
import { getPGUser } from '../../utils/local_api';
import { addUser } from '../../actions/index';

class UserRegister extends Component {
  constructor(props) {
    super(props);
    this.onFormSubmit = this.onFormSubmit.bind(this);
    this.state = {
      message: '',
    };
  }


  fetchPGUser(uid) {
    getPGUser(uid)
      .then(user => {
        this.props.addUser(user);
        // uncomment this:
        this.props.history.push('/dashboard');
      })
  }


  initializeUserInDataBase(data) {
    console.log('REGISTER USER DATA:', data);
    // data.payload.email
    // data.payload.uid

    // console.log('EMAIL:', data.payload.email);
    // console.log('UID:', data.payload.uid);
    

    //TODO: move to action
    fetch('http://localhost:3100/api/v1/users', {
      method: 'POST',
      headers: {
        'Accept': 'application/json, text/plain, */*',
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({ firebase_uid: data.payload.uid, email: data.payload.email })
    })
      .then(data => data.json())
      .then(response => {
        if (response.status == 201) {
          console.log('User created in postgres');
          // set PGUser to newly registered user becuase of auto login
          this.fetchPGUser(data.payload.uid);
          // send user to get more info
          this.props.history.push('/collectinfo');
        }
        if (response.status == 422) {
          console.log(response.error);
        }
      })
      .catch(error => console.log('Error Creating User', error));

  }

  onFormSubmit(event) {
    event.preventDefault();

    const email = this.refs.email.value;
    const password = this.refs.password.value;
    this.props.registerUser({ email, password }).then((data) => {
      if (data.payload.errorCode) {
        this.setState({ message: data.payload.errorMessage })
          ;
      } else {

        // Initialize anything else for the user (maybe in postgres)
        this.initializeUserInDataBase(data);

      }
    }
    );
  }

  render() {
    return (
      <div>
        <form id="frmRegister" role="form" onSubmit={this.onFormSubmit}>
          {this.state.message !== '' &&
            <p>
              {this.state.message}
            </p>
          }

          
          <div className='pt-card pt-elevation-0'>
          <h3>Register</h3>
            <p>
              <label className='pt-label'>
                Email Address:
                <input
                  type="email"
                  ref="email" id="txtEmail"
                  className='pt-input'
                  placeholder="Enter Email" name="email"
                />
              </label>
            </p>

            <p>
              <label className='pt-label'>
                Password:
                <input
                  type="password"
                  ref="password" id="txtPass"
                  className='pt-input'
                  placeholder="Password" name="password"
                />
              </label>
            </p>
            <p>
              <button type="submit" className='pt-button pt-intent-primary'>Register</button>
            </p>
          </div>

        </form>
      </div>
    );
  }

}

function mapDispatchToProps(dispatch) {
  return bindActionCreators({ registerUser, addUser }, dispatch);
}

function mapStateToProps(mall) {
  return {
    currentUser: mall.currentUser,
    PGUser: mall.PGUser
  };
}

export default connect(mapStateToProps, mapDispatchToProps)(UserRegister);
