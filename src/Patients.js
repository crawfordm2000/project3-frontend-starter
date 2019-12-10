
import React from "react";
import axios from "axios";
import './patient.css'
// import './App.css';
const patientUrl = "https://scheduler-api-backend.herokuapp.com";
class Patients extends React.Component {
  state = {
    patients: [],
    newPatient: {
      name: "",
      age: "",
      gender: ""
    }
  };
  componentDidMount() {
    this.getPatients();
  }
  // to Read all patients
  getPatients = () => {
    axios({
      url: `${patientUrl}/api/patients`,
      method: "get"
    }).then(response => {
      this.setState({
        patients: response.data.patients
      });
      console.log(response);
    });
  };

  // to create a patient
  createPatient = e => {
    e.preventDefault();
    axios({
      url: `${patientUrl}/api/patients`,
      method: "post",
      data: { newPatient: this.state.newPatient }
    }).then(response => {
      //   this.setState(prevState => ({
      //     patients: [...prevState.patients, response.data.patients]
      //   }));
      this.setState({ patients: response.data.patients });
    });
  };

// to update the state of the patient 
  changePatient = e => {
    let newPatient = {
      [e.target.name]: e.target.value
    };
    console.log(newPatient.id);
    this.setState((prevState, currentState) => ({
      newPatient: { ...prevState.newPatient, ...newPatient }
    }));
  };
  // axios call to change state of the array of patients
  editPatient = e => {
    e.preventDefault();
    let id = this.state.newPatient.id;
    let intId = Number(id);
    axios({
      url: `${patientUrl}/api/patients/${intId}`,
      method: "put",
      data: this.state.newPatient
    }).then(response => {
      this.setState({patients: response.data.patients});
    });
  };


  handleChange = e => {
    let newPatient = {
      [e.target.name]: e.target.value,
      [e.target.age]: e.target.value,
      [e.target.gender]: e.target.value
    };
    this.setState((prevState, currentState) => ({
      newPatient: { ...prevState.newPatient, ...newPatient }
    }));
  };

  // Delete a patient
  deletePatient = e => {
    axios({
      url: `${patientUrl}/api/patients/${e.target.id}`,
      method: "delete"
    }).then(response => {
      this.setState({ patients: response.data.patients });
    });
  };


      render() {
        console.log(this.state);
        const patientEls = this.state.patients.map(patient => {
          return (
            <div key={patient.id} className="patientsCardDiv">
                <p>Name: {patient.name}</p>
                <p>Age: {patient.age}</p>
                <p>Gender: {patient.gender}</p>
                <p>ID: {patient.id}</p>
                <i class="material-icons md-dark" id={patient.id} onClick={this.deletePatient}>delete</i>
            </div>
          );
        });
        return(
            <div>
              <div className="wrapper">
                    <form className="patientCreateContainer" onSubmit={this.createPatient} onChange={e => this.handleChange(e)}>
                    <h3 className="input">Create Patient</h3>
                      Name: <input className="input" type="text" name="name" /><br />
                      Gender: <input className="input" type="text" name="gender" /><br />
                      Age: <input className="input" type="number" name="age" /><br />
                      <input className="button" type="submit" value="Create" />
                    </form>
              
                    <form className="patientUpdateContainer" onSubmit={this.editPatient} onChange={e => this.changePatient(e)}>
                    <h3 className="input">Update Patient</h3>
                      Name: <input className="input" type="text" name="name" />
                      Gender: <input className="input" type="text" name="gender" />
                      Age: <input className="input" type="number" name="age" /><br />
                      Id: <input className="input" type="number" name="id" />
                      <input className="button" type="submit" value="Update" />
                    </form>
                    </div>
                    <ul>{patientEls}</ul>
            </div>
        )
    }
}
export default Patients;