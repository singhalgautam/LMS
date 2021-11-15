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
            <i class="bi bi-telephone-fill"> Contact Us</i>
          </a>
          <a href="mailto:singhabhinav020@gamil.com">
            <i class="bi bi-envelope-fill"> Mail us</i>
          </a>
        </div>
      </header>
      <hr />
      <div className="faq-header">
        <h1>FAQ! Need Help?</h1>
        <h3>We've got you covered</h3>
      </div>
      <div className="wrapper">
        {info.role==='Student' && <><Accordion title="How to publish a course?">
          Sunlight reaches Earth's atmosphere and is scattered in all directions
          by all the gases and particles in the air. Blue light is scattered
          more than the other colors because it travels as shorter, smaller
          waves. This is why we see a blue sky most of the time.
        </Accordion>
        <Accordion title="Where to find my courses?">
          It's really hot inside Jupiter! No one knows exactly how hot, but
          scientists think it could be about 43,000°F (24,000°C) near Jupiter's
          center, or core.
        </Accordion>
        <Accordion title="How to make quiz?">
          A black hole is an area of such immense gravity that nothing -- not
          even light -- can escape from it.
        </Accordion>
        <Accordion title="How to upload files ans assignments?">
          A black hole is an area of such immense gravity that nothing -- not
          even light -- can escape from it.
        </Accordion>
        <Accordion title="How to update your Profile?">
          A black hole is an area of such immense gravity that nothing -- not
          even light -- can escape from it.
        </Accordion></>}

        {info.role!=='Student' && <><Accordion title="How can I enroll in a course?">
          Sunlight reaches Earth's atmosphere and is scattered in all directions
          by all the gases and particles in the air. Blue light is scattered
          more than the other colors because it travels as shorter, smaller
          waves. This is why we see a blue sky most of the time.
        </Accordion>
        <Accordion title="Where to find enrolled courses?">
          It's really hot inside Jupiter! No one knows exactly how hot, but
          scientists think it could be about 43,000°F (24,000°C) near Jupiter's
          center, or core.
        </Accordion>
        <Accordion title="How to give quiz?">
          A black hole is an area of such immense gravity that nothing -- not
          even light -- can escape from it.
        </Accordion>
        <Accordion title="How to upload files ans assignments?">
          A black hole is an area of such immense gravity that nothing -- not
          even light -- can escape from it.
        </Accordion>
        <Accordion title="How to update your Profile?">
          A black hole is an area of such immense gravity that nothing -- not
          even light -- can escape from it.
        </Accordion></>}
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
