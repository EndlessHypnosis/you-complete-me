import React, { Component } from 'react';
import { browserHistory } from 'react-router-dom';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import { registerUser } from '../../actions/firebase_actions';

class UserRegister extends Component {
  constructor(props) {
    super(props);
    this.onFormSubmit = this.onFormSubmit.bind(this);
    this.state = {
      message: '',
    };
  }

  initializeUserInDataBase(data) {
    console.log('REGISTER USER DATA:', data);
    this.props.history.push('/');
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

          <p>Register</p>

          <div>
            <p>
              <label htmlFor="txtRegEmail">Email Address:</label>
              <input
                type="email"
                ref="email" id="txtEmail"
                placeholder="Enter Email" name="email"
              />
            </p>

            <p>
              <label htmlFor="txtRegPass">Password:</label>
              <input
                type="password"
                ref="password" id="txtPass"
                placeholder="Password" name="password"
              />
            </p>
            <p>
              <button type="submit">Register</button>
            </p>
          </div>

        </form>
      </div>
    );
  }

}

function mapDispatchToProps(dispatch) {
  return bindActionCreators({ registerUser }, dispatch);
}

function mapStateToProps(state) {
  return { currentUser: state.currentUser };
}

export default connect(mapStateToProps, mapDispatchToProps)(UserRegister);
