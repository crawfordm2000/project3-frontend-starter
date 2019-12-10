import React from 'react';
import axios from 'axios';
import './appointments.css';
import './App.css';
import Patients from './Patients';
const appointmentUrl = 'https://scheduler-api-backend.herokuapp.com';
class Appointments extends React.Component{
    state = {
        appointments: [],
        newAppointment: {
            date: '',
            time: '',
            patientId: null,
            doctorId: null
        }
    }
    componentDidMount(){
        this.getAppointments();
    }
    getAppointments = () => {
        axios({
            url: `${appointmentUrl}/api/appointments`,
            method: "get"
        }).then(response => {
            console.log('response')
            console.log(response)
            this.setState({
            appointments: response.data.appointments
            //the name what we called in the API (backend-jason object)
            });
        console.log(response);
        });
    };
    createAppointment = e => {
        e.preventDefault();
        axios({
        url: `${appointmentUrl}/api/appointments`,
          method: "post",
          data: { newAppointment: this.state.newAppointment }
        }).then(response => {
          this.setState({ appointment: response.data.appointments });
        });
      };

    deleteAppointment = e => {
        console.log(e.targets)
    axios({
        url: `${appointmentUrl}/api/appointments/${e.target.id}`,
        method: "delete"
    }).then(response => {
        this.setState({ appointments: response.data.appointments });
    });
    };

    render() {
        const appointmentEls = this.state.appointments.map(appointment => {
            return (
              <div key={appointment.id} id="appointmentDiv">
                  <p>Time: {appointment.time}</p>
                  <p>Date: {appointment.date}</p>
                  <p>doctorId: {appointment.doctorId}</p>
                  <p>patientId: {appointment.patientId}</p>
                  <i class="material-icons md-dark" id={appointment.id} onClick={this.deleteAppointment}>delete</i>
              </div>
            );
          });
    return(
        <div id="appointmentDiv">
            <ul>{appointmentEls}</ul>
        </div>
    )}
}
export default Appointments;