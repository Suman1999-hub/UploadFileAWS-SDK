import React, { useEffect, useState } from "react";
import { S3Client, ListObjectsV2Command } from "@aws-sdk/client-s3";

function GetList({
  REGION,
  ACCESS_KEY,
  SECRET_ACCESS_KEY,
  S3_BUCKET,
  loading,
}) {
  const [listUrl, setListUrl] = useState([]);
  const s3Client = new S3Client({
    region: REGION,
    credentials: {
      accessKeyId: ACCESS_KEY,
      secretAccessKey: SECRET_ACCESS_KEY,
    },
  });
  const listBucket = async () => {
    try {
      const command = new ListObjectsV2Command({ Bucket: S3_BUCKET });
      const response = await s3Client.send(command);
      // console.log(response);

      const allUrl =
        response.Contents?.map(
          (item) =>
            `https://${S3_BUCKET}.s3.${REGION}.amazonaws.com/${item.Key}`
        ) || [];
      // console.log(allUrl);
      setListUrl(allUrl);
    } catch (err) {
      console.log("Error", err);
    }
  };
  // console.log(listUrl);
  useEffect(() => {
    listBucket();
  }, [loading]);
  return (
    <>
      <hr style={{ border: "5px solid", borderRadius: "5px" }}></hr>
      <h1>Image Album</h1>
      <div>
        {listUrl.length > 0
          ? listUrl.map((curr, ind) => (
              <span key={curr + ind}>
                <img
                  src={curr}
                  width="300px"
                  height="300px"
                  style={{
                    border: "2px solid aqua",
                    margin: "5px",
                    borderRadius: "10px",
                  }}
                />
              </span>
            ))
          : "No Data Found"}
      </div>
    </>
  );
}

export default GetList;
