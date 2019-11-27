import React from 'react';
import axios from 'axios';
import Home from './Home.js';
import Doctors from './Doctors';
import Schedule from './Schedule';
import Appointments from './Appointments';
import Patients from './Patients';
import './navagation.css';

import {
    BrowserRouter as Router,
    Route,
    Link
  } from 'react-router-dom';

  var moment = require('moment');


  const doctorUrl = 'http://localhost:3000/api';




class Navagation extends React.Component{
    render(){
        const time =  moment().format('LT'); 
        return(
        // <Router>
            
            <div id="bodyDiv">
                    {/* <div id="headerDiv">
                        <p>Medical app</p>
                        <p>{time}</p>
                    </div> */}
                    <div id="navagationDiv">
                    <ul id="navagationUl">
                    
                        <Link to="/doctors">

                        <div className="navagationLinkDiv">
                        <li className="navagationLis">
                                <i class="material-icons">account_circle</i>
                            
                                <p>Doctors</p>
                        </li>
                        </div>
                        </Link>

                        <Link to="/patients">
                        <div className="navagationLinkDiv">
                            <li className="navagationLis">
                                
                                <i class="material-icons">assignment_ind</i>
                                
                                <p>Patients</p>
                            </li>
                        </div>
                        </Link>

                        <Link to="/schedule">
                        <div className="navagationLinkDiv">
                            <li className="navagationLis">
                                <i class="material-icons">calendar_today</i>
                                
                                    <p>Create Appointment</p>
                            </li>
                        </div>
                        </Link>

                        <Link to="/appointments">
                        <div className="navagationLinkDiv">
                            <li className="navagationLis">
                                    <i class="material-icons">event</i>
                                
                                    <p>Appointments</p>
                            </li>
                        </div>
                        </Link>

                    </ul>
                    
                </div>
            </div>   
        // </Router>
        )
    }
}




export default Navagation;

