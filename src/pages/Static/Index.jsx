import React from "react";
import CLI from "./CLI";
import CodeShare from "./CodeShare";
import CTA from "./CTA";
import EnvVars from "./EnvVars";
import Feed from "./Feed";
import Footer from "./Footer";
import Hero from "./Hero";
import Packages from "./Packages";
import VSCode from "./VSCode";

const Index = () => {
  return (
    <div className="overflow-y-hidden">
      <Hero />
      <CodeShare />
      <VSCode />
      <Packages />
      <CLI />
      <Feed />
      <EnvVars />
      <Footer />
      <CTA />
    </div>
  );
};

export default Index;
