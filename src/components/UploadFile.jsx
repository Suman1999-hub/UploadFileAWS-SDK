import React, { useState } from "react";
import S3FileUpload from "react-s3";
import { Buffer } from "buffer/";
import GetList from "./GetList";
import DeleteFile from "./DeleteFile";

window.Buffer = Buffer;

const S3_BUCKET = "suman-ls";
const REGION = "ap-south-1";
const ACCESS_KEY = "AKIA5**********KO5XV";
const SECRET_ACCESS_KEY = "q0DB***********************yvs5ik";

const config = {
  bucketName: S3_BUCKET,
  region: REGION,
  accessKeyId: ACCESS_KEY,
  secretAccessKey: SECRET_ACCESS_KEY,
};

function UploadFile() {
  const [multipleFile, setMultipleFile] = useState(null);
  const [loading, setLoading] = useState(false);

  const handleInputFile = (event) => {
    setMultipleFile(event.target.files);
  };

  const uploadFile = async () => {
    if (!multipleFile) return;

    setLoading(true);
    const newUrls = [];

    for (const file of multipleFile) {
      try {
        const data = await S3FileUpload.uploadFile(file, config);
        newUrls.push(data.location);
      } catch (err) {
        console.error(err);
      }
    }

    setLoading(false);
  };

  return (
    <div style={{ textAlign: "center" }}>
      <input type="file" onChange={handleInputFile} multiple />
      <button
        onClick={uploadFile}
        disabled={loading}
        style={{
          height: "40px",
          width: "100px",
          backgroundColor: "black",
          borderRadius: "10px",
          color: "white",
          cursor: loading ? "not-allowed" : "pointer",
        }}
      >
        Upload
      </button>

      <DeleteFile />

      <GetList
        loading={loading}
        S3_BUCKET={S3_BUCKET}
        REGION={REGION}
        ACCESS_KEY={ACCESS_KEY}
        SECRET_ACCESS_KEY={SECRET_ACCESS_KEY}
      />
    </div>
  );
}

export default UploadFile;
