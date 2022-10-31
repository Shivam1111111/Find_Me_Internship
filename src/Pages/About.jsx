import React from "react";
// import { usestate, useEffect } from 'react'
import axios from "axios";
import "./PageStyle/about.css";

export default function About() {
  return (
    <div className="aboutContainer">

      <div className="devopsSection">
        <div className="devopsCard">shivam</div>
        <div className="devopsCard">Hemil</div>
        <div className="devopsCard">Kishan</div>
        <div className="devopsCard">Pruthvi</div>
      </div>

      <div className="infoClass">
        <b>Find Me Internship</b> is a website developed for CSE students to
        help them find the internship. The system will serve as a platform for
        students to access the list of available companies which provide
        internship to students and apply for the company which meets their
        requirement.
      </div>
      <br></br>
      <div className="infoClass">
        The purpose of this project is to reduce the confusion of choosing an
        ideal internship for students by providing them all the necessary
        details of the company and their reviews. Problems currently faced by
        students while looking for internship:
        <ul>
          <li>Finding list of available companies for internship.</li>
          <li>
            Checking company profile, their requirements, location through
            different sources.
          </li>
          <li>
            Procedure to do internship in company apart from mentioned in
            university company list.
          </li>
        </ul>
      </div>
      <div className="infoClass">
        The system is designed to overcome the issues faced by student to get
        detailed information when looking for internship, deciding upon a
        suitable option for them and also making the process more convenient by
        providing them all the required details at one place.
      </div>
    </div>
  );
}
