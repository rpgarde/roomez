import React, {useState} from "react";
import { useQuery, useMutation } from "@apollo/client";
import { QUERY_HOUSE } from "../utils/queries";
import UploadForm from "../components/UploadForm"
import Auth from "../utils/auth";
import {EDIT_HOUSE_PHOTO} from "../utils/mutations"

const Profile = () => {
  let currentHouseId
  if (Auth.loggedIn()) {
    currentHouseId = Auth.getProfile().data.house._id
  }

  const { loading, data:houseData, refetch } = useQuery(QUERY_HOUSE, {
    variables: {
      _id: currentHouseId ? currentHouseId : null
    }
  });

  const [fileName,setFileName] = useState();

  const house = houseData?.house[0] || {}
  const occupants = house.occupants

  const [editHousePhoto,{error , data }] = useMutation(EDIT_HOUSE_PHOTO)

  const handlePhoto = (photo)=>{
    const photoName = photo.photo
    setFileName(photoName)
  }

  const handleFormSubmit = async (event) => {
    event.preventDefault();
    console.log("uploading")
    console.log(fileName)
    try{
      const { data } = await editHousePhoto({
        variables:{
          photo:fileName,
          _id:house._id
        }
      })
    }
    catch(err){
      console.error(err)
    }
  }

  if (!Auth.loggedIn()) {
    return (
      <h4>
        You need to be logged in to see this. Use the navigation links above to
        sign up or log in!
      </h4>
    );
  }

  if (loading) {
    return <div>Loading...</div>;
  }
  
  return (
    <div className="container-fluid">
      <h1 className="fw-bold text-center my-3">Welcome to your house</h1>
      <div className="row">
        <div className="col-md-6">
          <div className="card mb-3 border-0 shadow">
            <div className="card-body">
              <h5 className="card-title fw-bold">{house.address}</h5>
              {house.photo ? (<img src={house.photo} className="card-img-top" />) : null}
              <p className="card-text">Your code to share with your housemates: <span className="fw-bold">{house.code}</span></p>
              <form onSubmit = {handleFormSubmit}>
                <UploadForm handlePhoto = {handlePhoto}/>
                <button className="btn btn-primary my-3" type="submit">
                Upload
                </button>
              </form>
            </div>
          </div>
        </div>
        <div className="col-md-6">
          <h3 className="fw-bold mb-3">House Directory</h3>
          {occupants.map((user) => (
            <div className="card mb-3 border-0 shadow" key ={user.firstName}>
              <div className="card-body">
                <div className="d-flex justify-content-between align-items-center">
                  <div>
                    <h5 className="fw-bold card-title mb-3">{user.firstName} {user.lastName}</h5>
                    <p><span className="fw-bold">📞</span> {user.mobile}</p>
                    <p><span className="fw-bold">✉️</span> {user.email}</p>
                  </div>
                  {user.photo ? (<img src={user.photo} className="w-25 rounded-pill" />) : null}
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default Profile;
