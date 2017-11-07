import React, { Component } from 'react';
import { browserHistory } from 'react-router-dom';
import { connect } from 'react-redux';
// import { bindActionCreators } from 'redux';
// import { fetchFeedback } from '../actions/index';

class Booking extends Component {
  constructor(props) {
    super(props);
    // this.onFormSubmit = this.onFormSubmit.bind(this);
    // this.state = {
    //   message: '',
    //   feedbackArray: []
    // };
  }

  // componentDidMount() {
  //   this.props.fetchFeedback()
  //     .then(results => results.payload.json())
  //     .then(feedback => {
  //       console.log('FEEDBACK:', feedback);
  //       this.setState({
  //         feedbackArray: feedback
  //       })
  //     })
  // }

  render() {

    return (
      <div>
        THIS IS THE BOOKING COMPONENT
      </div>
    );
  }

}

// function mapDispatchToProps(dispatch) {
//   return bindActionCreators({
//     fetchFeedback
//   }, dispatch);
// }

function mapStateToProps(mall) {
  return {
    currentUser: mall.currentUser
  };
}

export default connect(mapStateToProps, null)(Booking);
