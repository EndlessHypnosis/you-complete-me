import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import { loginUser } from '../../actions/firebase_actions';
import { addUser } from '../../actions/index';
import { getPGUser } from '../../utils/local_api';


class UserLogin extends Component {

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
        this.props.history.push('/dashboard');
      })
  }


  onFormSubmit(event) {
    event.preventDefault();

    const email = this.refs.email.value;
    const password = this.refs.password.value;
    this.props.loginUser({ email, password }).then((data) => {
      if (data.payload.errorCode) {
        this.setState({ message: data.payload.errorMessage });
      } else {
        this.fetchPGUser(data.payload.uid);
        // where do you want to push on successful login?
        // this.props.history.push('/dashboard')
      }
    }
    );
  }


  render() {
    return (
      <div>
        <div className='pt-callout'>
          <button className='pt-button pt-small pt-intent-primary' onClick={() => {
            this.refs.email.value = 'jedi1@jedi1.com';
            this.refs.password.value = 'jedi1jedi1';
          }}>prefill mentor</button>
          <button className='pt-button pt-small pt-intent-primary' onClick={() => {
            this.refs.email.value = 'padawan1@padawan1.com';
            this.refs.password.value = 'padawan1';
          }}>prefill padawan</button>
        </div>

        <form id="frmLogin" role="form" onSubmit={this.onFormSubmit}>
          {this.state.message !== '' &&
            <p>
              {this.state.message}
            </p>
          }
          
          <div className='pt-card pt-elevation-0'>
            <h3>Login</h3>
            <p>
              <label className='pt-label'>
                Email Address:
                <input
                  type="email"
                  id="txtEmail" ref="email"
                  className="pt-input"
                  placeholder="Enter Email" name="email"
                />
              </label>
            </p>

            <p>
              <label className='pt-label'>
              Password:
              <input
                type="password"
                id="txtPass" ref="password"
                className='pt-input'
                placeholder="Password" name="password"
              />
              </label>
            </p>
            <p>
              <button type="submit" className='pt-button pt-intent-primary'>Login</button>
            </p>
          </div>
        </form>
      </div>

    );
  }

}

function mapDispatchToProps(dispatch) {
  return bindActionCreators({ loginUser, addUser }, dispatch);
}

function mapStateToProps(mall) {
  return {
    currentUser: mall.currentUser,
    PGUser: mall.PGUser
  };
}

export default connect(mapStateToProps, mapDispatchToProps)(UserLogin);
