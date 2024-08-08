import React from "react";
import HtmlCode from "../../html/privacy";

export default function Index() {
  return <div dangerouslySetInnerHTML={{ __html: HtmlCode }} />;
}
