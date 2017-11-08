import React, { Component } from 'react';
import { browserHistory } from 'react-router-dom';
import { connect } from 'react-redux';
import { Route } from 'react-router';
// import { bindActionCreators } from 'redux';
// import { fetchFeedback } from '../actions/index';
import { DatePicker } from "@blueprintjs/datetime";
import { saveBooking } from '../utils/local_api';
const moment = require('moment');

class Booking extends Component {
  constructor(props) {
    super(props);
    this.onFormCreateBookingSubmit = this.onFormCreateBookingSubmit.bind(this);
    this.state = {
      lengthInput: '',
      timeHourInput: '',
      timeMinutesInput: '',
      pickedDate: null,
      booking: null
    };
  }


  onFormCreateBookingSubmit(event) {
    event.preventDefault();

    // FIXME: this math isn't adding up correctly
    let bookingDate = new Date(this.state.pickedDate);
    bookingDate = moment(bookingDate).subtract(1, 'd');
    bookingDate = moment(bookingDate).add(this.state.timeHourInput, 'h').toDate();
    bookingDate = moment(bookingDate).add(this.state.timeMinutesInput, 'm').toDate();


    let bookingPayload = {
      mentor_user_id: this.props.PGUser.id,
      scheduled_for_date: bookingDate,
      length_in_minutes: this.state.lengthInput
    }


    saveBooking(bookingPayload)
    .then(booking => {
      this.setState({ booking }, () => {
        this.props.history.push('/booking/saved');
      });
    })


  }

  render() {

    return (
      <div>

        <Route path='/booking/saved' render={(props) => {
          
          return (
            <div>
              <div className='pt-callout pt-intent-success'>
                <h4>Booking Successfully Created</h4>
                Length: {this.state.booking.attributes.length_in_minutes }
              </div>
            </div>
          );
        }} />

        <h2>
          <button className='pt-button pt-icon-caret-left pt-intent-success'
            onClick={() => {
              this.props.history.push('/dashboard');
            }}>Back to Dashboard</button>
          Create New Booking
        </h2>
        <p>We're so pleased to see you offering your services to our young Padawans or to your fellow Jedi Masters</p>
        <p>You can use the form below to create an open training session</p>


        <div className='pt-card pt-elevation-1'>
        
        
          <form id="formCreateBooking" role="form" onSubmit={this.onFormCreateBookingSubmit}>
          
            <div className="pt-form-group pt-callout">
              <label className="pt-label pt-label-bigger" htmlFor="jm-date-input">
                Date of Training
              </label>
              <div className="pt-form-content pt-date-picker-custom">
                <DatePicker
                  onChange={(e) => { 
                    this.setState({ pickedDate: e }); }}
                  value={this.state.pickedDate} />
              </div>
            </div>

            <div className="pt-form-group pt-callout">
              <label className="pt-label pt-label-bigger">
                Time of Training
                        <span className="pt-text-muted">( in 24 hour format )</span>
              </label>
              <div className="pt-form-content">
                <input
                  id="jm-time-hour-input"
                  onChange={(e) => { this.setState({ timeHourInput: e.target.value }); }}
                  name="jmtimehourinput"
                  className="pt-input pt-input-time-hour"
                  style={{ width: '50px' }}
                  placeholder="hour"
                  type="text"
                  value={this.state.timeHourInput} />
                <input
                  id="jm-time-minutes-input"
                  onChange={(e) => { this.setState({ timeMinutesInput: e.target.value }); }}
                  name="jmtimeminutesinput"
                  className="pt-input"
                  style={{ width: '50px' }}
                  placeholder="mins"
                  type="text"
                  value={this.state.timeMinutesInput} />
              </div>
            </div>

            <div className="pt-form-group pt-callout">
              <label className="pt-label pt-label-bigger" htmlFor="jm-length-input">
                Length of Training
                        <span className="pt-text-muted">( in minutes, eg: 15, 30, 60, 90 )</span>
              </label>
              <div className="pt-form-content">
                <input
                  id="jm-length-input"
                  onChange={(e) => { this.setState({ lengthInput: e.target.value }); }}
                  name="jmlengthinput"
                  className="pt-input"
                  style={{ width: '50px' }}
                  placeholder="mins"
                  type="text"
                  value={this.state.lengthInput} />
              </div>
            </div>


            <button
              className="pt-button pt-intent-primary"
              type="submit">Save New Booking</button>
          </form>
        
        
        </div>



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
    currentUser: mall.currentUser,
    PGUser: mall.PGUser,
  };
}

export default connect(mapStateToProps, null)(Booking);
