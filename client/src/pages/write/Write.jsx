import { useContext, useState } from "react";
import "./write.css";
import { Context } from "../../context/Context";
import {Image} from "@mui/icons-material";
import { axiosInstance } from "../../config";

export default function Write() {
  const [title, setTitle] = useState("");
  const [desc, setDesc] = useState("");
  const [file, setFile] = useState(null);
  const { user } = useContext(Context);

  const handleSubmit = async (e) => {
    e.preventDefault();
    const newPost = {
      username: user.username,
      title,
      desc,
    };
    if (file) {
      const data = new FormData();
      const filename = Date.now() + file.name;
      data.append("name", filename);
      data.append("file", file);
      newPost.photo = filename;
      try {
        await axiosInstance.post("/upload", data);
      } catch (err) {}
      try {
        const res = await axiosInstance.post("/posts", newPost);
        window.location.replace("/post/" + res.data._id);
      } catch (err) {}
    }
  };
  return (
    <div className="write">
      {file && (
        <img className="writeImg" src={URL.createObjectURL(file)} alt="" />
      )}
      <form className="writeForm" onSubmit={handleSubmit}>
        <div className="writeFormGroup">
          <label htmlFor="fileInput">
            <Image className="writeIcon"/>
          </label>
          <input
            type="file"
            id="fileInput"
            style={{ display: "none" }}
            onChange={(e) => setFile(e.target.files[0])}
          />
          <span style={{marginLeft:"20px", fontSize:"30px", fontWeight:"600" }}>Title</span>
          <input
            type="text"
            placeholder=""
            className="writeInput titleInput"
            autoFocus={true}
            onChange={e=>setTitle(e.target.value)}
          />
          <button className="writeSubmit" type="submit"  onClick={()=>{!file && alert("Missing image")}}>
            Publish
          </button>
        </div>
        <div className="writeFormGroup">
          <textarea
            placeholder="Tell us your story..."
            type="text"
            className="writeInput writeText"
            onChange={e=>setDesc(e.target.value)}
          ></textarea>
        </div>
      </form>
    </div>
  );
}