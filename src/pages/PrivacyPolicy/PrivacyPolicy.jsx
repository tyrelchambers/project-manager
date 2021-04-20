import React from "react";
import { H1, H2, H3 } from "../../components/Headings/Headings";
import DisplayWrapper from "../../layouts/DisplayWrapper/DisplayWrapper";

const PrivacyPolicy = () => {
  return (
    <DisplayWrapper>
      <div className="max-w-screen-md">
        <H1>Privacy Policy</H1>
        <p className="italic">Last updated: April 20, 2021</p>
        <p className="mt-6">
          The privacy of your data — and it is your data, not ours! — is a big
          deal to us. In this policy, we lay out: what data we collect and why;
          how your data is handled; and your rights to your data. We promise we
          never sell your data: never have, never will.
        </p>
        <H2 className="mt-6">What we collect and why</H2>
        <p>
          Our guiding principle is to collect only what we need. Here’s what
          that means in practice:
        </p>
        <H3 className="mt-6">Identity &amp; access</H3>
        <p>
          When you sign up for Kanlen, we typically ask for identifying
          information such as your name and email address. That’s just so you
          can personalize your new account, and we can send you updates or other
          essential information. We sometimes also give you the option to add a
          profile picture that displays in Kanlen, but we do not normally look
          at or access that picture. We’ll never sell your personal info to
          third parties, and we won’t use your name in marketing statements
          without your permission either.
        </p>
        <H3 className="mt-6">Voluntary correspondence</H3>
        <p>
          When you write Kanlen with a question or to ask for help, we keep that
          correspondence, including the email address, so that we have a history
          of past correspondences to reference if you reach out in the future.
        </p>
        <p>
          We also store any information you volunteer like surveys. Sometimes
          when we do customer interviews, we may ask for your permission to
          record the conversation for future reference or use. We only do so if
          you give your express consent.
        </p>
        <H3 className="mt-6">Information we do not collect</H3>
        <p>
          We don’t collect any characteristics of protected classifications
          including age, race, gender, religion, sexual orientation, gender
          identity, gender expression, or physical and mental abilities or
          disabilities. You may provide these data voluntarily, such as if you
          include a pronoun preference in your email signature when writing into
          our Support team.
        </p>
        <p className="mt-6">
          We also do not collect any biometric data. You are given the option to
          add a picture to your user profile, which could be a real picture of
          you or a picture of something else that represents you best. We do not
          extract any information from profile pictures: they are for your use
          alone.
        </p>
        <H3 className="mt-6">When we access or share your information</H3>
        <p>
          Our default practice is to not access your information. The only times
          we’ll ever access or share your info are:
        </p>
        <p className="mt-6">
          <span className=" font-bold">
            To help you troubleshoot or squash a software bug, with your
            permission.
          </span>{" "}
          If at any point we need to access your account to help you with a
          Support case, we will ask for your consent before proceeding.
        </p>
        <p className="mt-6">
          <span className=" font-bold">
            To investigate, prevent, or take action regarding restricted uses.
          </span>
          Accessing a customer’s account when investigating potential abuse is a
          measure of last resort. We have an obligation to protect the privacy
          and safety of both our customers and the people reporting issues to
          us. We do our best to balance those responsibilities throughout the
          process. If we do discover you are using our products for a restricted
          purpose, we will report the incident to the appropriate authorities.
        </p>
        <H3 className="mt-6">How we secure your data</H3>
        <p>
          All data is encrypted via SSL/TLS when transmitted from our servers to
          your browser.
        </p>

        <p>
          For Kanlen, most data are not encrypted while they live in our
          database (since it needs to be ready to send to you when you need it),
          but we go to great lengths to secure your data at rest.
        </p>

        <H3 className="mt-6">What happens when you delete data in Kanlen</H3>
        <p>
          If you choose to delete your account, your account is immediately
          deleted in its entirety.
        </p>

        <H3 className="mt-6">Changes &amp; Questions</H3>
        <p>
          Have any questions, comments, or concerns about this privacy policy,
          your data, or your rights with respect to your information? Please get
          in touch by emailing us at tychambers3@gmail.com and we’ll be happy to
          answer them!
        </p>
      </div>
    </DisplayWrapper>
  );
};

export default PrivacyPolicy;
