import { useContext, useEffect, useState } from "react";
import { useLocation } from "react-router";
import { Link } from "react-router-dom";
import { Context } from "../../context/Context";
import "./singlePost.css";
import {Edit, Delete} from "@mui/icons-material";
import { axiosInstance } from "../../config";

export default function SinglePost() {
  const location = useLocation();
  const path = location.pathname.split("/")[2];
  const [post, setPost] = useState({});
  const PF = "https://ltweb-blog.herokuapp.com/images/";
  const { user } = useContext(Context);
  const [title, setTitle] = useState("");
  const [desc, setDesc] = useState("");
  const [categories, setCategories] = useState([]);
  const [updateMode, setUpdateMode] = useState(false);

  useEffect(() => {
    const getPost = async () => {
      const res = await axiosInstance.get("/posts/" + path);
      setPost(res.data);
      setTitle(res.data.title);
      setDesc(res.data.desc);
      setCategories(res.data.categories);
    };
    getPost();
  }, [path]);

  const handleDelete = async () => {
    try {
      await axiosInstance.delete(`/posts/${post._id}`, {
        data: { username: user.username },
      });
      window.location.replace("/");
    } catch (err) {}
  };

  const handleUpdate = async () => {
    try {
      await axiosInstance.put(`/posts/${post._id}`, {
        username: user.username,
        title,
        desc,
        categories,
      });
      setUpdateMode(false)
    } catch (err) {}
  };

  return (
    <div className="singlePost">
      <div className="singlePostWrapper">
        {post.photo && (
          <img src={PF + post.photo} alt="" className="singlePostImg" />
        )}
        {updateMode ? (
          <input
            type="text"
            value={title}
            className="singlePostTitleInput"
            autoFocus
            onChange={(e) => setTitle(e.target.value)}
          />
        ) : (
          <h1 className="singlePostTitle">
            {title}
            {post.username === user?.username && 
              (<div className="singlePostEdit">
                <Edit className="singlePostIcon" onClick={() => setUpdateMode(true)}/>
                <Delete className="singlePostIcon" onClick={handleDelete}/>
              </div>)}
          </h1>
        )}
        <div className="singlePostInfo">
          <span className="singlePostAuthor">
            Author:
            <Link to={`/?user=${post.username}`} className="link">
              <b> {post.username}</b>
            </Link>
          </span>
          {categories &&
            (<span className="singlePostCats">
            Categories:
            {categories.map(c =>(
              <Link to={`/?cat=${c.name}`} className="link" key={c._id}>
                <span className="postCat">{c.name}</span>
              </Link>
            ))}
            </span>
          )}        
          <span className="singlePostDate">
            {new Date(post.createdAt).toDateString()}
          </span>
        </div>
        {updateMode ? (
          <>
          <button className="singlePostButton" onClick={handleUpdate}>
          Update
          </button>
          <textarea
            className="singlePostDescInput"
            value={desc}
            onChange={(e) => setDesc(e.target.value)}
          />
          </>
        ) : (
          <p className="singlePostDesc">{desc}</p>
        )}
      </div>
    </div>
  );
}