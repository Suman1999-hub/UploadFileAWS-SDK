import "./App.css";
import UploadFile from "./components/UploadFile";
import UploadFileWithSDK from "./components/UploadFileWithSDK";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import About from "./components/About";
import { useContext, useEffect, useRef } from "react";
import { UploadContext } from "./UploadContext";
import { toast, ToastContainer } from "react-toastify";

function App() {
  const { files, progresses } = useContext(UploadContext);
  const notifiedIndices = useRef(new Set());
  console.log(files);
  useEffect(() => {
    progresses.forEach((progress, index) => {
      if (
        progress === 100 &&
        !notifiedIndices.current.has(index) &&
        files[index] !== undefined
      ) {
        notifiedIndices.current.add(index);
        toast(`${files[index]} upload complete!`);
      } else if (progress < 100 && notifiedIndices.current.has(index)) {
        notifiedIndices.current.delete(index);
      }
    });
  }, [progresses, files]);

  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<UploadFileWithSDK />} />
        <Route path="/about" element={<About />} />
      </Routes>
      <ToastContainer
        position="top-right"
        autoClose={5000}
        hideProgressBar={false}
        newestOnTop={false}
        closeOnClick
        rtl={false}
        pauseOnFocusLoss
        draggable
        pauseOnHover
        theme="light"
        transition:Bounce
      />
    </BrowserRouter>
  );
}

export default App;
