import React from 'react';
import hero from '../../images/hero.jpg'
import lightLogo from '../../images/light-logo.png'
import message from '../../images/message.jpg'
import task from '../../images/task.jpg'
import bill from '../../images/bill.jpg'

const bgImageStyle = {
  backgroundImage: `url(${hero})`,
  backgroundSize: 'cover',
  height: '65vh',
  backgroundPosition: 'center center'
}


export default function Landing() {
  return (
    <div>
      <div
        className="bg-image p-5 text-center shadow-1-strong mb-5 text-white d-flex justify-content-center align-items-center"
        style={bgImageStyle}
      >
        <div className="row">
          <div className="col-sm-6 offset-3">
            <img src={lightLogo} alt="roomEZ" className="img-fluid" />
            {/* <h1 className="mb-3 display-1">room<span className='ez'>EZ</span></h1> */}
            <h3 className="my-4">
              The EZ way to live in a sharehouse.
            </h3>
            <a href = "/signup" className="btn btn-secondary">
              Join Now
            </a>
            <h4 className = "mt-4">Already living the EZ life? Login <a className = "link-light" href = "/login">here</a></h4>
          </div>
        </div>
        <div>
        </div>
      </div>
      <div className="container pitch">
      <h1 className="text-center fw-bold">Tired of your chaotic sharehouse? Time to live the EZ life.</h1>
        <div className="row my-3">
          <div className="col-sm-4">
          <img src={task} alt="chore" className="img-fluid" />
            <h3 className="text-center fw-bold my-3">Divvy up chores</h3>
            <p>Never miss another chore thanks to our chore allocation and management system.</p>
          </div>
          <div className="col-sm-4">
          <img src={bill} alt="bill" className="img-fluid" />
            <h3 className="text-center fw-bold my-3">Split your bills</h3>
            <p>Pay your bills on time and make sure you all pay fairly with our bill split technology.</p>
          </div>
          <div className="col-sm-4">
          <img src={message} alt="message" className="img-fluid" />
            <h3 className="text-center fw-bold my-3">Keep in touch</h3>
            <p>Share a laugh, ask a question, or argue (nicely) using our messageboard.</p>
          </div>
        </div>
      </div>
    </div>
  );
}
