import axios from "axios";
import { useState } from "react";
import "./App.css";

function App() {
  const [file, setFile] = useState();
  const [fileName, setFileName] = useState();

  const handleOnChange = (e) => {
    setFile(e.target.files[0]);
    setFileName(e.target.files[0].name);
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    const url = "http://localhost:3008/uploads";
    const formData = new FormData();
    formData.append("file", file, fileName);
    axios.post(url, formData).then((response) => {
      console.log("response.data", response.data);
    });
    setFile();
    setFileName()
  };

  const fileData = () =>{
    console.log(file);
    if(file){
      return(
        <div>
          <h2>File Data Show</h2>
          <p>File Name : {fileName}</p>
          <p>File Type : {file.type} </p>
        </div>
      )
    }
  }
  return (
    <div className="App">
      <header className="App-header">
        <form onSubmit={handleSubmit}>
          <h1>React File Upload</h1>
          <input type="file" onChange={handleOnChange} />
          <button type="submit">Upload</button>
        </form>
        {fileData()}
      </header>
    </div>
  );
}

export default App;
