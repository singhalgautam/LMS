import React, { useState, useEffect } from "react";
import Axios from "axios";

function TeacherAnnouncement({ id }) {
  const [announcement, setAnnouncement] = useState("");
  const [postAnnouncement, setPostAnnouncement] = useState([]);
  const getAllAnnouncement = () => {
    Axios.post("http://localhost:3002/getAnnouncement", { id: id }).then(
      (res) => {
        //    const newAnnouncements=[]
        //    res.data.forEach((announce)=>{
        //      newAnnouncements.push(announce.announcement);
        //    })
        setPostAnnouncement(res.data);
      }
    );
  };
  useEffect(() => {
    getAllAnnouncement();
  }, []);

  const handleAnnouncement = (e) => {
    e.preventDefault();
    Axios.post("http://localhost:3002/createAnnouncement", {
      id,
      announcement,
    }).then((res) => {
      console.log(res);
      alert("successfully created announcement!");
      setAnnouncement("");
      getAllAnnouncement();
    });
  };
  return (
    <div>
      <form className="form" onSubmit={handleAnnouncement}>
        <label htmlFor="announcement">Make a new announcement</label>
        <br />
        <textarea
          type="text"
          name="announcement"
          id="announcement"
          value={announcement}
          onChange={(e) => {
            setAnnouncement(e.target.value);
          }}
        />
        <br />
        <button className="btn">Post</button>
      </form>
      <br />
      {postAnnouncement.length !== 0 && (
        <div className="heading">Previous Announcements</div>
      )}

      <br />
      {postAnnouncement
        .slice(0)
        .reverse()
        .map((announcement) => {
          return (
            <SingleAnnouncement
              key={announcement.announcementId}
              {...announcement}
            />
          );
        })}
    </div>
  );
}
const SingleAnnouncement = ({ announcement, my_timestamp }) => {
  const monthNames = [
    "Jan",
    "Feb",
    "Mar",
    "Apr",
    "May",
    "Jun",
    "Jul",
    "Aug",
    "Sep",
    "Oct",
    "Nov",
    "Dec",
  ];
  return (
    <main className="announce-container">
      <div className="announceTime">
        {my_timestamp.slice(8, 10) +
          " " +
          monthNames[my_timestamp.slice(5, 7)] +
          " " +
          my_timestamp.slice(11, 16)}
      </div>
      <div className="announcWrapper">
        <i className="bi bi-megaphone"></i>
        <div>{announcement}</div>
      </div>
    </main>
  );
};
export default TeacherAnnouncement;
