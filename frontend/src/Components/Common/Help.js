import React from "react";
import "./Help.css";
import { useGlobalContext } from "../../context";

function Help() {
  const {info}=useGlobalContext();
  return (
    <div>
      <header className="helpHeader">
        <h2>Help</h2>
        <div className="call-help">
          <a href="tel:+91 6353857230">
            <i className="bi bi-telephone-fill"> Contact Us</i>
          </a>
          <a href="mailto:singhabhinav020@gamil.com">
            <i className="bi bi-envelope-fill"> Mail us</i>
          </a>
        </div>
      </header>
      <hr />
      <div className="faq-header">
        <h1>FAQ! Need Help?</h1>
        <h3>We've got you covered</h3>
      </div>
      <div className="wrapper">
        {info.role !== "Student" && (
          <>
            <Accordion title="How to publish a course?">
              Just simply go through the course Section and fill out all the
              detatils such as course name ,prerequesite,topic, etc
            </Accordion>
            <Accordion title="Where to find my courses?">
              Go to dashboard section and there you will find all the courses
              that had been published by you
            </Accordion>
            <Accordion title="How to make quiz?">
              Go to respective course and click on quiz there you will find
              button of add quiz click on it, then a page will appear where you
              can make quiz by giving necessary detatils,etc
            </Accordion>
            <Accordion title="How to upload files ans assignments?">
              Upload file by choosing from your computer and then click upload .
            </Accordion>
            <Accordion title="How to update your Profile?">
              Go to Profile section in the sidebar and update neccessary feilds,
              you can update name, contact details and profile photo only
            </Accordion>
          </>
        )}

        {info.role === "Student" && (
          <>
            <Accordion title="How can I enroll in a course?">
              Just simply go through the course Section and choose the
              interested code you like by clicking on enroll button, then you
              can go to particular course by clicking on it.
            </Accordion>
            <Accordion title="Where to find enrolled courses?">
              Go to dashboard section and there you will find all the courses
              that had been enrolled by you. Go to respective courses by
              clicking on it.
            </Accordion>
            <Accordion title="How to give quiz?">
              Go to respective course and click on quiz there give respective
              quiz
            </Accordion>
            <Accordion title="How to upload files ans assignments?">
              Upload file by choosing from your computer and then click upload .
            </Accordion>
            <Accordion title="How to update your Profile?">
              Go to Profile section in the sidebar and update neccessary feilds,
              you can update name, contact details and profile photo only
            </Accordion>
          </>
        )}
      </div>
    </div>
  );
}

const Accordion = ({ title, children }) => {
  const [isOpen, setOpen] = React.useState(false);
  return (
    <div className="accordion-wrapper">
      <div
        className={`accordion-title ${isOpen ? "open" : ""}`}
        onClick={() => setOpen(!isOpen)}
      >
        {title}
      </div>
      <div className={`accordion-item ${!isOpen ? "collapsed" : ""}`}>
        <div className="accordion-content">{children}</div>
      </div>
    </div>
  );
};
export default Help;
