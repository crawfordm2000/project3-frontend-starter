import React from 'react';
import axios from 'axios';
// import './App.css';
import './doctors.css';


const doctorUrl = 'http://localhost:3000/api';



class Doctors extends React.Component{
    state = {
        doctors: [],
        newDoctor: {
            name: "",
            address: "",
            phone: null,
        }
    }
    componentDidMount() {
      this.getDoctors();
    }
    getDoctors = () => {
      axios({
        url: `${doctorUrl}/doctors`,
        method: "get"
      }).then(response => {
        this.setState({
          doctors: response.data.doctors
        });
        console.log(response);
      });
    };
    createDoctor = e => {
      e.preventDefault();
      axios({
        url: `${doctorUrl}/doctors`,
        method: "post",
        data: { newDoctor: this.state.newDoctor }
      }).then(response => {
        //   this.setState(prevState => ({
        //     doctors: [...prevState.doctsors, response.data.doctors]
        //   }));
        this.setState({ doctors: response.data.doctors });
      });
    };
    handleChange = e => {
      let newDoctor = {
        [e.target.name]: e.target.value,
        [e.target.address]: e.target.value,
        [e.target.phone]: e.target.value
      };
      this.setState((prevState, currentState) => ({
        newDoctor: { ...prevState.newDoctor, ...newDoctor }
      }));
    };
    deleteDoctor = e => {
      axios({
        url: `${doctorUrl}/doctors/${e.target.id}`,
        method: "delete"
      }).then(response => {
        this.setState({ doctors: response.data.doctors });
      });
    };
      render() {
        console.log(this.state);
        const doctorEls = this.state.doctors.map(doctor => {
          return (
                  <div>
                    <div key={doctor.id} className="doctorsCardDiv">
                        {/* <img src="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTB-ckJyRnhYpswKfyGR1aLAPiLFx3eh5yUk_P1fh7dpeZ8SHBW&s" /> */}
                        <p>Dr.{doctor.name}</p>
                        <p>Address: {doctor.address}</p>
                        <p>Phone: {doctor.phone}</p>
                        <p>Id: {doctor.id}</p>
                        <i class="material-icons md-dark" id={doctor.id} onClick={this.deleteDoctor}>delete</i>
                    </div>
            
                  </div>
             
          );
        });
        return(
            <div id="doctorsDiv">
              
              
              
                    <form className="doctorCreateContainer" onSubmit={this.createDoctor} onChange={e => this.handleChange(e)}>
                    <h3 className="input">Create Doctor Profile</h3>
                      Name: <input className="input" type="text" name="name" />
                      Address: <input className="input" type="text" name="address" />
                      Phone: <input className="input" type="number" name="phone" />
                      <input className="button" type="submit" value="Create" />
                    </form>
              <ul>{doctorEls}</ul>
            </div>
        )
    }
}




export default Doctors;


// const doctors = this.props."doctors go here".map((word) => {
//     return <h1 className="doctorsListDiv">{word}</h1>
//    })
    
//     return(
//         <div>
//             {/* <input type="text"/>
//             <button>Search</button> */}
//             <div id="doctorsDiv" >
//                {doctors}
//             </div>
//         </div>





{/* <img src="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTB-ckJyRnhYpswKfyGR1aLAPiLFx3eh5yUk_P1fh7dpeZ8SHBW&s" />
               <h3>Dr.Meridith Grey</h3>
               <h5>Oncology</h5>
               <p>
               Well, the way they make shows is, they make one show. That show's called a pilot. Then they show that show to the people who make shows, and on the strength of that one show they decide if they're going to make more shows. Some pilots get picked and become television programs. Some don't, become nothing. She starred in one of the ones that became nothing.
               </p> */}