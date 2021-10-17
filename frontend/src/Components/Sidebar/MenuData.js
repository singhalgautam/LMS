import Calender from "../Common/Calender"
import Courses from "../Students/Courses"
import Profile from "../Common/Profile";
import Help from "../Common/Help";
import Settings from "../Common/Settings";
import Doubts from "../Common/Doubts";

export const MenuData = [
  // {
  //   name: "Dashboard",
  //   to: "/",
  //   iconClassName: "bi bi-speedometer2",
  // },
  {
    name: "Profile",
    to: "/profile",
    iconClassName: "bi bi-person-circle",
    exact:true,
    link: <Profile />,
  },
  {
    name: "Courses",
    to: "/",
    // iconClassName: `${BiBook}`,
    iconClassName: "bi bi-book",
    exact:true,
    link: <Courses />,
  },
  {
    name: "Calendar",
    to: `/calendert`,
    iconClassName: "bi bi-calendar-plus",
    exact:true,
    link: <Calender />,
  },
  {
    name: "Doubts",
    to: `/doubts`,
    iconClassName: "bi bi-question-circle-fill",
    exact:true,
    link: <Doubts />,
    // subMenus: [
    //   { name: "Courses", to: "/content/courses" },
    //   { name: "Videos", to: "/content/videos" },
    // ],
  },

  {
    name: "Settings",
    to: `/settings`,
    iconClassName: "bi bi-nut",
    exact:true,
    link: <Settings />,
  },

  {
    name: "Help",
    to: `/help`,
    iconClassName: "bi bi-telephone",
    exact:true,
    link: <Help />,
  },
];
