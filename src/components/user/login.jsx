import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import { loginUser } from '../../actions/firebase_actions';


class UserLogin extends Component {

  constructor(props) {
    super(props);
    this.onFormSubmit = this.onFormSubmit.bind(this);
    this.state = {
      message: '',
    };
  }

  onFormSubmit(event) {
    event.preventDefault();

    const email = this.refs.email.value;
    const password = this.refs.password.value;
    this.props.loginUser({ email, password }).then((data) => {
      if (data.payload.errorCode) {
        this.setState({ message: data.payload.errorMessage });
      } else {
        // where do you want to push on successful login?
        this.props.history.push('/dashboard')
      }
    }
    );
  }


  render() {
    return (
      <div>
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
  return bindActionCreators({ loginUser }, dispatch);
}

function mapStateToProps(mall) {
  return { currentUser: mall.currentUser };
}

export default connect(mapStateToProps, mapDispatchToProps)(UserLogin);
