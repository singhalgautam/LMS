import React from 'react'
import { useGlobalContext } from "../../context";
import StudentDashboard from './StudentDashboard';
import TeacherDashboard from './TeacherDashboard';

function Dashboard() {
  const { info } = useGlobalContext();
  let choice = <TeacherDashboard />;
  if (info.role === "Student") {
    choice = <StudentDashboard />;
  }
    return (
      <div className="dabba">
        <header>
          <h2>Dashboard</h2>
          <hr />
        </header>
        <main>{choice}</main>
      </div>
    );
}

export default Dashboard
