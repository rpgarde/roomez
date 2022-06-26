import React, { useState } from "react";
import { Link } from "react-router-dom";

const HouseForm = (props) => {
  
  const [address, setHouseAddress] = useState("");
  const [code, setHouseCode] = useState("");

  const [houseState, setHouseState] = useState("create")

  const handleCodeChange = (event)=> {
    const {value} = event.target;
    setHouseCode(value)
    props.handleHouseForm({
      code: value,
    })
  }

  const handleAddressChange = (event)=> {
    const {value} = event.target;

    setHouseAddress(value)

    props.handleHouseForm({
      address: value,
    })
  }

  return (
    <div>
      <div>
        Are you joining a sharehouse or creating your own?
      </div>
      <div className = "mb-3">
        <div className="form-check">
          <input className="form-check-input" type="radio" name="join" id="join" value="join" onChange={()=>setHouseState("join")} checked={houseState==="join"}/>
          <label className="form-check-label" htmlFor="join">
          Join a sharehouse
          </label>
        </div>
        <div className="form-check">
          <input className="form-check-input" type="radio" name="create" id="create" value="create" onChange={()=>setHouseState("create")} checked={houseState==="create"}/>
          <label className="form-check-label" htmlFor="create">
          Create a new sharehouse
          </label>
        </div>
      </div>
      {
        houseState === "join" ?
          (<div className = "mb-3">
            <label className = "form-label" htmlFor="houseCode">Code you should have gotten from your housemate</label>
            <input
              className="form-control"
              name="houseCode"
              id="houseCode"
              value={code}
              placeholder="code you should have gotten"
              onChange={handleCodeChange}
            />
          </div>
          ) : (
            <div>
              <div className = "mb-3">
                <label className = "form-label" htmlFor="houseCode">Your property`&apos;`s address</label>
                <input
                  className="form-control"
                  id="address"
                  placeholder="address"
                  name="houseAddress"
                  value={address}
                  onChange={handleAddressChange}
                />
              </div>
              <div className = "mb-3">
                <label className = "form-label" htmlFor="houseCode">Create a house code to share with your friends</label>
                <input
                  className="form-control"
                  id="houseCode"
                  name="houseCode"
                  value={code}
                  placeholder="code to share with your friends"
                  onChange={handleCodeChange}
                />
              </div>
            </div>
          )
      }
    </div>
  );
};

export default HouseForm
