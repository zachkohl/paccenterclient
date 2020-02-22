import React, { useState } from "react";
import Link from "next/link";

function ToolLink(props) {
  const toolList = props.tools.map(tool => {
    console.log(tool);
    return (
      <Link key={tool}>
        <a>campaign}</a>{
      </Link>
    );
  });

  return <Link></Link>;
}
