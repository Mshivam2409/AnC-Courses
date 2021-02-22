import useScript from "hooks/useScript";
import React, { useEffect } from "react";
// Helper to add scripts to our page
// const insertScript = (src: string, id: string, parentElement: HTMLElement) => {
//   const script = window.document.createElement("script");
//   script.async = true;
//   script.src = src;
//   script.id = id;
//   parentElement.appendChild(script);
//   return script;
// };
// // Helper to remove scripts from our page
// const removeScript = (id: string, parentElement: HTMLElement) => {
//   const script = window.document.getElementById(id);
//   if (script) {
//     parentElement.removeChild(script);
//   }
// };
// The actual component
const Commento = ({ id }: { id: string }) => {
  useScript(
    `http://localhost:3001/.commento/js/commento.js`,
    "commento",
    [id],
    "commento-script"
  );
  // useEffect(() => {
  //   // If there's no window there's nothing to do for us
  //   if (!window) {
  //     return;
  //   }
  //   const document = window.document;
  //   // In case our #commento container exists we can add our commento script
  //   if (document.getElementById("commento")) {
  //     insertScript(
  //       `http://localhost:8080/js/commento.js`,
  //       `commento-script`,
  //       document.body
  //     );
  //   }
  //   // Cleanup; remove the script from the page
  //   return () => removeScript(`commento-script`, document.body);
  // }, [id]);
  return <div id={`commento`} />;
};
export default Commento;
