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
  return bindActionCreators({ registerUser }, dispatch);
}

function mapStateToProps(state) {
  return { currentUser: state.currentUser };
}

export default connect(mapStateToProps, mapDispatchToProps)(UserRegister);
