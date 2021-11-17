import React, { useState, useEffect } from "react";
import Axios from "axios";
import fileImg from "../../../assets/file.svg";

function TeacherFile({ id }) {
  const [file, setFile] = useState();
  const [fileName, setFileName] = useState("");
  // const [filePreview,setFilePreview]=useState(null);
  const saveFile = (e) => {
    setFile(e.target.files[0]);
    setFileName(e.target.files[0].name);
    // setFilePreview(URL.createObjectURL(e.target.files[0]));
  };
  const uploadFile = async (e) => {
    e.preventDefault();
    const formData = new FormData();
    formData.append("file", file);
    formData.append("fileName", fileName);
    formData.append("courseId", id);
    console.log(formData);
    try {
      await Axios.post("http://localhost:3002/uploadFile", formData).then(
        (res) => {
          alert("File has been successfuly uploaded!");
        }
      );
      getUploadedFile();
    } catch (ex) {
      console.log(ex);
    }
  };
  const [uploadedFile, setUploadedFile] = useState([]);
  const getUploadedFile = () => {
    Axios.post("http://localhost:3002/getFile", { courseId: id }).then(
       (res) => {
        setUploadedFile((res.data).reverse());
      }
    );
    setFile();
    setFileName('');
  };
  useEffect(() => {
    getUploadedFile();
  }, []);
  return (
    <main>
      <div className="fileUpload">
        {/* <iframe src={filePreview} title={fileName}>
            {fileName}
          </iframe> */}
        <label htmlFor="file-upload" className="custom-file-upload">
          <p>Choose a file</p>
        </label>
        <input
          type="file"
          name="file-upload"
          id="file-upload"
          onChange={saveFile}
        />
        <h4 style={{ marginTop: "2em" }}>{fileName}</h4>
        <button className="opt-val-btn" onClick={uploadFile}>
          Upload
        </button>
      </div>

      <div className="uploaded">
        {uploadedFile.length === 0 && (
          <div className="no-item">
            <h2>No File has been Uploaded </h2>
            <div>
              <img
                style={{ height: "60vh", width: "40vw" }}
                src={fileImg}
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
export default TeacherFile;
