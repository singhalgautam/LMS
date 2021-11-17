import React, { useState, useEffect } from "react";
import Axios from "axios";
import announcementImg from '../../../assets/announcement.png';

function StudentAnnouncement({ id }) {
  const [postAnnouncement, setPostAnnouncement] = useState([]);
  useEffect(() => {
    Axios.post("http://localhost:3002/getAnnouncement", { id: id }).then(
      (res) => {
        setPostAnnouncement(res.data);
      }
    );
  }, [id]);
  return (
    <div style={{ textAlign: "center", marginTop: "5em" }}>
      {postAnnouncement.length === 0 && (
        <div className="no-item">
          <h3>Stay tuned in for new Announcements</h3>
          <img
            style={{ height: "60vh", width: "35vw" }}
            src={announcementImg}
            alt="announcementImg"
          />
        </div>
      )}
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
      {my_timestamp.slice(8, 10) +
        " " +
        monthNames[my_timestamp.slice(5, 7)] +
        " " +
        my_timestamp.slice(11, 16)}
      <div className="announcWrapper">
        <i className="bi bi-megaphone"></i>
        <div>{announcement}</div>
      </div>
    </main>
  );
};
export default StudentAnnouncement
