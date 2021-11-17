import React, { useState } from "react";
import { FaCloudUploadAlt } from "react-icons/fa";
import "./profile.css";
import Axios from "axios";
import { useGlobalContext } from "../../context";

function Profile() {
  const { info, name, setName, contact, setContact, image, setImage } =
    useGlobalContext();
  const [file, setFile] = useState();
  const [fileName, setFileName] = useState("");

  const saveFile = (e) => {
    setFile(e.target.files[0]);
    setFileName(e.target.files[0].name);
    setImage(URL.createObjectURL(e.target.files[0]));
  };

  const id = info.id;
  const uploadFile = async (e) => {
    e.preventDefault();
    if (file) {
      const formData = new FormData();
      formData.append("file", file);
      formData.append("fileName", fileName);
      formData.append("id", id);
      formData.append("name", name);
      if (contact) formData.append("contact", contact);
      console.log(formData);
      try {
        await Axios.post("http://localhost:3002/upload", formData).then(
          (res) => {
            alert("Your profile is succesfully updated");
          }
        );
      } catch (ex) {
        console.log(ex);
      }
    } else {
      Axios.post("http://localhost:3002/updateProfile", {
        id,
        contact,
        name,
      }).then((res) => {
        alert("Your profile is succesfully updated");
      });
    }
  };

  const removePhoto = () => {
    Axios.post("http://localhost:3002/removePhoto", { id: info.id }).then(
      (res) => {
        console.log("succesfully removed");
      }
    );
    setImage(null);
  };

  // useEffect(() => {
  //     Axios.post("http://localhost:3002/getProfile",{id:id}).then((res)=>{
  //       setName(res.data[0].name);
  //       if (res.data[0].photo) setImage(res.data[0].photo);
  //       setContact(res.data[0].contact);
  //     })
  //   }, [id]);
  const email = info.email;
  const role = info.role;
  return (
    <div>
      <header>
        <h2>Profile</h2>
        <hr />
      </header>
      <div className="flex-container">
        <form className="form" onSubmit={uploadFile}>
          <br />
          <h3>Edit your Profile</h3>
          <br />
          <label>Name : </label>
          <input
            type="text"
            name="Name"
            id="Name"
            value={name}
            onChange={(e) => setName(e.target.value)}
          />
          <label>Email : </label>
          <input
            readOnly
            type="text"
            name="desc"
            id="desc"
            value={email}
            style={{ backgroundColor: "hsl(212, 33%, 89%)", outline: "none" }}
          />
          <label>Role : </label>
          <input
            readOnly
            type="text"
            name="role"
            id="role"
            value={role}
            style={{ backgroundColor: "hsl(212, 33%, 89%)", outline: "none" }}
          />
          <label>Contact Number : </label>
          <input
            type="number"
            name="contact"
            id="contact"
            placeholder="Enter your contact number"
            value={contact}
            onChange={(e) => setContact(e.target.value)}
          />
          <br />
          <button className="opt-val-btn">Save</button>
        </form>

        <div className="upload-container container">
          <div className="wrapper">
            <div className="image">
              {image && <img src={image} alt="profile-pic" />}
            </div>
            <div className="content">
              <div className="icon">
                <FaCloudUploadAlt />
              </div>
              <div className="text">No file chosen, yet!</div>
            </div>
            <div
              id="cancel-btn"
              style={image == null ? { display: "none" } : {}}
            >
              <i className="bi bi-x-octagon" onClick={removePhoto}></i>
            </div>
            <div className="file-name">File name here</div>
          </div>
          <label htmlFor="file-upload" className="custom-file-upload">
            <p>Choose a photo</p>
          </label>
          <input
            type="file"
            name="file-upload"
            id="file-upload"
            onChange={saveFile}
          />
        </div>
      </div>
    </div>
  );
}

export default Profile;
