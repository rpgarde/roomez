import React from 'react';
import profile from '../../images/profile-pic.png'
export default function About() {
  return (
    <div className = "row">
      <div>
        <div className="card mb-3 border-0">
          <div className="row g-0">
            <div className="col-md-6 col-lg-5">
              <img src={profile} className="img-fluid rounded-start" alt="paolo garde"/>
            </div>
            <div className="card-body col-md-6 col-lg-7">
              <div>
                <h3>Hello World 👋</h3>
                <h1 className = "fw-bold">I'm Paolo Garde.</h1>
                <h3>Web Developer</h3>
                <p className = "mt-4">I have over 8 years of Ops leadership experience in
                  startups like Uber, FoodByUs, and :Different. I've always been interested in the tech side and I've recently decided to get into the world of web development.</p>
                <p className = "mt-2"> I'm finishing up a Coding Bootcamp at The University of Sydney, graduating Nov 2021. </p>
              </div>
            </div>
          </div>
        </div>
      </div>    
      </div>
  );
}
