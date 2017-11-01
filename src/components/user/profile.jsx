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

          <p>User Profile</p>

          <div>
            <p>
              <label htmlFor="email">Email: </label>
              <input
                type="text" defaultValue={this.props.currentUser.email}
                id="email"
                ref="email" placeholder="Email" name="email"
              />
            </p>

            <p>
              <label htmlFor="displayName">Display name: </label>
              <input
                type="text" defaultValue={this.props.currentUser.displayName}
                ref="displayName"
                id="displayName" placeholder="Display name"
                name="displayName"
              />
            </p>
            <p>
              <button type="submit">Update</button>
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
