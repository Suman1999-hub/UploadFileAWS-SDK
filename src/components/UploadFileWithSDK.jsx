import React, { useState, useContext } from "react";
import AWS from "aws-sdk";
import { Box, Typography, CircularProgress, Button } from "@mui/material";
import { UploadContext } from "../UploadContext";
import { Link } from "react-router-dom";

const S3_BUCKET = "suman-ls";
const REGION = "ap-south-1";

AWS.config.update({
  accessKeyId: "AKIA5**********3KO5XV",
  secretAccessKey: "q0DB************************+nvs5ik",
});

const myBucket = new AWS.S3({
  params: { Bucket: S3_BUCKET },
  region: REGION,
});

function UploadFileWithSDK() {
  const { addFile, updateProgress, progresses } = useContext(UploadContext); // Get the context values
  const [multipleFile, setMultipleFile] = useState([]);
  const [loading, setLoading] = useState(false);
  const [currIndex, setCurrIndex] = useState(0);
  const [lastIndex, setLastIndex] = useState(false);

  const handleFileInput = (event) => {
    const selectedFiles = Array.from(event.target.files);
    setMultipleFile(selectedFiles);
  };

  const uploadFileOneByOne = (file, ind) => {
    setCurrIndex(ind);
    setLoading(true);
    updateProgress(ind, 0);

    const params = {
      ACL: "public-read",
      Body: file,
      Bucket: S3_BUCKET,
      Key: file.name,
    };

    myBucket
      .putObject(params)
      .on("httpUploadProgress", (evt) => {
        const progress = Math.round((evt.loaded / evt.total) * 100);
        updateProgress(ind, progress);
      })
      .send((err) => {
        if (err) {
          console.log(err);
        } else {
          addFile(file.name);
        }
        setLoading(false);

        if (ind + 1 < multipleFile.length) {
          uploadFileOneByOne(multipleFile[ind + 1], ind + 1);
        }
        if (ind + 1 === multipleFile.length) {
          setLastIndex(true);
        }
      });
  };

  const uploadFile = () => {
    if (multipleFile.length > 0) {
      uploadFileOneByOne(multipleFile[0], 0);
    }
  };

  return (
    <>
      <div style={{ textAlign: "center", margin: "100px" }}>
        <Link to="/about">
          <Button variant="contained">About</Button>
        </Link>
      </div>

      <Box
        sx={{
          width: "50%",
          height: "50%",
          padding: "50px",
          textAlign: "center",
          margin: "auto",
          marginTop: "100px",
          borderRadius: 1,
          bgcolor: "aqua",
        }}
      >
        <h1>Upload Image</h1>

        <input type="file" onChange={handleFileInput} multiple />
        <button
          onClick={uploadFile}
          style={{
            height: "40px",
            width: "100px",
            backgroundColor: "black",
            color: "white",
          }}
        >
          Upload
        </button>
      </Box>

      <Box
        sx={{
          width: "70%",
          height: "50%",
          padding: "50px",
          textAlign: "center",
          margin: "auto",
          marginTop: "100px",
          borderRadius: 1,
        }}
      >
        {multipleFile.length > 0 ? (
          multipleFile.map((curr, index) => (
            <Box
              key={`${curr.name}-${index}`}
              sx={{
                display: "flex",
                alignItems: "center",
                justifyContent: "space-between",
                boxShadow:
                  "rgba(0, 0, 0, 0.25) 0px 14px 28px, rgba(0, 0, 0, 0.22) 0px 10px 10px",
                margin: "20px",
                padding: "20px",
              }}
            >
              <img src="../public/copy-unscreen.gif" width="30px" />
              <Typography>{curr.name}</Typography>
              {currIndex === index && loading && (
                <>
                  <CircularProgress
                    variant="determinate"
                    value={progresses[index] || 0} // Use the progress from context
                    size="20px"
                  />
                  <h6>{progresses[index] || 0}%</h6>
                </>
              )}
              {(currIndex - 1 >= index || lastIndex) && (
                <img src="../public/check.png" width="20px" />
              )}
            </Box>
          ))
        ) : (
          <Typography>No files selected</Typography>
        )}
      </Box>
    </>
  );
}

export default UploadFileWithSDK;
