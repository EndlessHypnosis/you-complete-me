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
      <div className='pt-card pt-elevation-0'>
        <h3>Dashboard</h3>
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
