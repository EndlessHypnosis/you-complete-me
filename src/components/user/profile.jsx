import React, { Component } from 'react';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import firebase from '../../utils/firebase';
import { fetchUser, updateUser } from '../../actions/firebase_actions';

class UserProfile extends Component {

  constructor(props) {
    super(props);
    this.props.fetchUser();
    this.state = {
      message: '',
    };
    this.onFormSubmit = this.onFormSubmit.bind(this);
  }

  onFormSubmit(event) {
    event.preventDefault();
    const email = this.refs.email.value;
    const displayName = this.refs.displayName.value;
    this.props.updateUser({ email, displayName }).then((data) => {
      if (data.payload.errorCode) {
        this.setState({ message: data.payload.errorMessage });
      } else {
        this.setState({
          message: 'Update successful',
        });
      }
    }
    );
  }

  render() {
    if (!this.props.currentUser) {
      return <p>Loading...</p>;
    }

    return (
      <div>
        <form id="frmProfile" role="form" onSubmit={this.onFormSubmit}>
          {this.state.message !== '' &&
            <p>
              {this.state.message}
            </p>
          }
          
          <div className='pt-card pt-elevation-0'>
            <h3>User Profile</h3>
            <p>
              <label className='pt-label'>
                Email:
                <input
                  type="text" defaultValue={this.props.currentUser.email}
                  id="email"
                  className='pt-input'
                  ref="email" placeholder="Email" name="email"
                />
              </label>
            </p>

            <p>
              <label className='pt-label'>
                Display name:
                <input
                  type="text" defaultValue={this.props.currentUser.displayName}
                  ref="displayName"
                  className='pt-input'
                  id="displayName" placeholder="Display name"
                  name="displayName"
                />
              </label>
            </p>
            <p>
              <button type="submit" className='pt-button pt-intent-primary'>Update</button>
            </p>
          </div>
        </form>
      </div>
    );
  }

}

function mapDispatchToProps(dispatch) {
  return bindActionCreators({ fetchUser, updateUser }, dispatch);
}


function mapStateToProps(state) {
  return { currentUser: state.currentUser };
}


export default connect(mapStateToProps, mapDispatchToProps)(UserProfile);
