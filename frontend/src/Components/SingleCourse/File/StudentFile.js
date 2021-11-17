import React, { useState, useEffect } from "react";
import Axios from "axios";
import file from '../../../assets/file.svg';

function StudentFile({ id }) {
  const [uploadedFile, setUploadedFile] = useState([]);
  useEffect(() => {
    Axios.post("http://localhost:3002/getFile", { courseId: id }).then(
      (res) => {
        setUploadedFile(res.data);
      }
    );
  }, [id]);
  return (
    <main>
      <div className="uploaded">
        {uploadedFile.length === 0 && (
          <div className="no-item">
            <h2>No File has been Uploaded </h2>
            <div>
              <img
                style={{ height: "60vh", width: "40vw" }}
                src={file}
                alt="file"
              />
            </div>
          </div>
        )}
        {uploadedFile.length !== 0 && <h3>Uploaded Files</h3>}
        {uploadedFile.map((file) => {
          return <SingleFile key={file.fileId} {...file} />;
        })}
      </div>
    </main>
  );
}

const SingleFile = ({ file, file_name, fileId }) => {
  return (
    <div className="up-file">
      <a href={file} target="_blank" title={file_name} rel="noreferrer">
        <i className="bi bi-file-text"></i>
        {file_name}
      </a>
    </div>
  );
};

export default StudentFile;
