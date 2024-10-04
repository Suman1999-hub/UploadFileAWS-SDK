import React, { useContext, useEffect, useRef } from "react";
import { toast, ToastContainer } from "react-toastify";
import { UploadContext } from "../UploadContext"; // Adjust the import based on your file structure
import "react-toastify/dist/ReactToastify.css";

function About() {
  return (
    <div>
      <h1 style={{ textAlign: "center" }}>About</h1>
    </div>
  );
}

export default About;
