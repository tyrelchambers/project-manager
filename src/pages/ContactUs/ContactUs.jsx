import React from "react";
import { H1 } from "../../components/Headings/Headings";
import DisplayWrapper from "../../layouts/DisplayWrapper/DisplayWrapper";

const ContactUs = () => {
  return (
    <DisplayWrapper>
      <div className="max-w-screen-md">
        <H1>Need to chat or have an idea for a feature?</H1>
        <p>Send me an email at tychambers3@gmail.com.</p>

        <H1 className="mt-6">Found a bug?</H1>
        <p>
          Head over to my github repo and submit an issue. I'll be sure to look
          at it as soon as I can.{" "}
          <a
            href="https://github.com/tyrelchambers/project-manager/issues"
            target="_blank"
            rel="noopener noreferrer"
            className="link"
          >
            Submit a bug report
          </a>
        </p>
      </div>
    </DisplayWrapper>
  );
};

export default ContactUs;
