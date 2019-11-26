
import React from "react";
import axios from "axios";
import './patient.css'
// import './App.css';
const patientUrl = "http://localhost:3000/api";
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
  getPatients = () => {
    axios({
      url: `${patientUrl}/patients`,
      method: "get"
    }).then(response => {
      this.setState({
        patients: response.data.patients
      });
      console.log(response);
    });
  };
  createPatient = e => {
    e.preventDefault();
    axios({
      url: `${patientUrl}/patients`,
      method: "post",
      data: { newPatient: this.state.newPatient }
    }).then(response => {
      //   this.setState(prevState => ({
      //     patients: [...prevState.patients, response.data.patients]
      //   }));
      this.setState({ patients: response.data.patients });
    });
  };


  changePatient = e => {
    let newPatient = {
      [e.target.name]: e.target.value
    };
    console.log(newPatient.id);
    this.setState((prevState, currentState) => ({
      newPatient: { ...prevState.newPatient, ...newPatient }
    }));
  };
  // when we moved the functions we lost the state for newPatient; id is now returning as not a number
  editPatient = e => {
    e.preventDefault();
    let id = this.state.newPatient.id;
    let intId = Number(id);
    axios({
      url: `${patientUrl}/patients/${intId}`,
      method: "put",
      data: this.state.newPatient
    }).then(response => {
      this.setState({patients: response.data.patients});
    });
  };


  updatePatient = e => {
    e.preventDefault();
    axios({
      url: `${patientUrl}/patients`,
      method: "put",
      data: { newPatient: this.state.newPatient }
    }).then(response => {
      //   this.setState(prevState => ({
      //     patients: [...prevState.patients, response.data.patients]
      //   }));
      this.setState({ patients: response.data.patients });
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
  deletePatient = e => {
    axios({
      url: `${patientUrl}/patients/${e.target.id}`,
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
                <i class="material-icons md-dark" id={patient.id} onClick={this.handleChange}>delete</i>
                {/* <button id={patient.id} onClick={this.createPatient}>
               Create Patient
              </button> */}
            </div>
            // <li key={patient.id}>
            //   {patient.name} -- {patient.age} -- {patient.gender} -- {patient.patientId}
            //   <button id={patient.id} onClick={this.deletePatient}>
            //     Delete Patient
            //   </button>
            //   <button id={patient.id} onClick={this.createPatient}>
            //     Update Patient
            //   </button>
            // </li>
          );
        });
        return(
            <div id="patientDiv">
              <h1>Create Patient</h1>
                    <form onSubmit={this.createPatient} onChange={e => this.handleChange(e)}>
                      Name: <input type="text" name="name" />
                      Gender: <input type="text" name="gender" />
                      Age: <input type="number" name="age" />
                      <input type="submit" value="New patient Submit" />
                    </form>
              {/* <i class="material-icons md-dark" id="addButton">add_circle</i> */}
              <ul>{patientEls}</ul>
              <h1>Update Patient</h1>
                    <form onSubmit={this.editPatient} onChange={e => this.changePatient(e)}>
                      Name: <input type="text" name="name" />
                      Gender: <input type="text" name="gender" />
                      Age: <input type="number" name="age" />
                      Id: <input type="number" name="id" />
                      <input type="submit" value="New patient Submit" />
                    </form>
            </div>
        )
    }
}
export default Patients;