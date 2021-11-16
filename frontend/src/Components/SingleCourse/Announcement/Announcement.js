import React from 'react'
import { useGlobalContext } from "../../../context";
import TeacherAnnouncement from './TeacherAnnouncement';
import StudentAnnouncement from './StudentAnnouncement';
import "./announce.css";
function Announcement({id}) {
    const { info } = useGlobalContext();
    let choice = <TeacherAnnouncement id={id} />;
    if (info.role === "Student") {
      choice = <StudentAnnouncement id={id} />;
    }
    return (
        <div>
            {choice}
        </div>
    )
}

export default Announcement
