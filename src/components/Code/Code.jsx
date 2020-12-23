import React from "react";
import { Prism as SyntaxHighlighter } from "react-syntax-highlighter";
import { nord } from "react-syntax-highlighter/dist/esm/styles/prism";

const Code = ({ language, code }) => {
  return (
    <SyntaxHighlighter language={language} style={nord}>
      {code}
    </SyntaxHighlighter>
  );
};

export default Code;
