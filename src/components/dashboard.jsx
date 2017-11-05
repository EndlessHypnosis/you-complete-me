import React, { Component } from 'react';
import { browserHistory } from 'react-router-dom';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';

class Dashboard extends Component {
  constructor(props) {
    super(props);
    // this.onFormSubmit = this.onFormSubmit.bind(this);
    this.state = {
      message: '',
    };
  }

  render() {
    return (
      <div>
        <h2>Dashboard</h2>
        <div className='pt-card pt-elevation-0'>
          <p>
            Hello there young Padawan. Fear not, for you are on your path of becoming a Jedi Master.
            As a Padawan, you will be matched only with Jedi Masters for your training.
          </p>
          <p className='pt-intro-secondary'>
            Once you are ready to help train others, you can graduate to become a Jedi Master!
            Head over to your
            <button className='pt-button pt-small pt-intent-primary' onClick={() => {
              this.props.history.push('/profile');
            }}>profile</button>
            to start the graduation process!
          </p>
        </div>
      </div>
    );
  }

}

// function mapDispatchToProps(dispatch) {
//   return bindActionCreators({ registerUser }, dispatch);
// }

function mapStateToProps(state) {
  return { currentUser: state.currentUser };
}

export default connect(mapStateToProps, null)(Dashboard);
