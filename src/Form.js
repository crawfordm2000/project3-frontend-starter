import React from 'react';
// import axios from 'axios';
// import './App.css';
import './form.css'
import axios from 'axios';
const appointmentUrl = 'http://localhost:3000/api';
class Form extends React.Component{
        state = {
            newAppointment: {},
            patients:[]
        }
    componentDidMount() {
        this.getPatients()
    }
    getPatients = () => {
        axios({
            url: `${appointmentUrl}/patients`,
            method: 'GET'
        })
        .then(response => {
            console.log(response)
            this.setState({patients: response.data.patients })
        })
    }
    handleChange = e => {
        let newAppointment = {
          [e.target.name]: e.target.value
        };
        this.setState(prevState => ({
            newAppointment: { ...prevState.newAppointment, ...newAppointment }
        }));
      };
      handleSubmit = e => {
        e.preventDefault()
            axios({
              url: `${appointmentUrl}/appointments`,
              method: "post",
              data: this.state.newAppointment
            }).then(response => {
                console.log(response)
              this.setState({ appointment: response.data.appointments });
            });
          };
    render(){
        console.log(this.state)
        const patientOptionTags = this.state.patients.map(patient => {
            return <option key={patient.id} value={patient.id}>{patient.name}</option>
        })
        return(
            <form id="appointmentFormTag" onChange={e => this.handleChange(e)} onSubmit={e => this.handleSubmit(e)}>
                <h1>Schedule an appointment</h1>
                <label>Appointment date:</label>
                <input type="date" name='date'/>
                <label>Appointment time:</label>
                <input type="time" name='time'/>
                <label>Doctor ID:</label>
                <select name='doctorId'>
                    <option value="1">Dr.</option>
                    <option value="2">Dr.</option>
                    <option value="3">Dr.</option>
                    <option value="4">Dr.</option>
                </select>
                <label>Patient Id:</label>
                <select name='patientId'>
                    {patientOptionTags}
                </select>
                {/* <input type="text" name='patientId'/> */}
                <input type='submit'/>
            </form>
        )
    }
}
export default Form;