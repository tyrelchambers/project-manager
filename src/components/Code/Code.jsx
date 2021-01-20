import React from "react";
import { Prism as SyntaxHighlighter } from "react-syntax-highlighter";
import { nord } from "react-syntax-highlighter/dist/esm/styles/prism";

const Code = ({ language, code }) => {
  return (
    <SyntaxHighlighter
      language={language}
      style={nord}
      customStyle={{ marginTop: 0, maginBotton: 0 }}
    >
      {code}
    </SyntaxHighlighter>
  );
};

export default Code;
