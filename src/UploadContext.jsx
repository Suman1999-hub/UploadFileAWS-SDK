import React, { createContext, useState } from "react";

export const UploadContext = createContext();

export const UploadProvider = ({ children }) => {
  const [files, setFiles] = useState([]);
  const [progresses, setProgresses] = useState([]);

  const addFile = (fileName) => {
    setFiles((prevFiles) => [...prevFiles, fileName]);
  };

  const updateProgress = (index, progress) => {
    setProgresses((prevProgresses) => {
      const newProgresses = [...prevProgresses];
      newProgresses[index] = progress;
      return newProgresses;
    });
  };

  return (
    <UploadContext.Provider
      value={{ files, progresses, addFile, updateProgress }}
    >
      {children}
    </UploadContext.Provider>
  );
};
