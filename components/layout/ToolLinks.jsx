import React, { useState } from "react";
import Link from "next/link";
import styled from "styled-components";
const GreyLink = styled.a`
  text-decoration: none;
  color: red;
  display: block;
`;
function ToolLink(props) {
  console.log(props.tools);
  const toolList = props.tools.map(tool => {
    return (
      <div>
        <style jsx>{`
          a {
            text-decoration: none;
            color: grey;
            display: block;
          }

          a:visited {
            text-decoration: none;
            color: red;
            display: block;
          }

          a:hover {
            text-decoration: none;
            color: red;
            display: block;
          }
        `}</style>
        <Link href={`/tools/${tool}`} key={tool} passHref>
          <a>{tool}</a>
        </Link>
      </div>
    );
  });

  return (
    <div>
      {toolList}{" "}
      <Link href={`/protected`} passHref>
        <a>protected</a>
      </Link>
    </div>
  );
}
export default ToolLink;
