import React from "react";
import HtmlCode from "../../html/Terms";

export default function Index() {
  return <div dangerouslySetInnerHTML={{ __html: HtmlCode }} />;
}
