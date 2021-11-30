import { Link } from "react-router-dom";
import "./post.css";

export default function Post({post}) {
  const PF = "https://ltweb-blog.herokuapp.com/images/";
  
  return (
    <div className="post">
      {post.photo &&
        (<img
          className="postImg"
          src={PF+ post.photo}
          alt=""
        />)
      }
      <div className="postInfo">
        {/*Some adjustments for the postCats*/}
        <div className="postCats">{
          post.categories.map(c =>(
            <Link to={`/?cat=${c.name}`} className="link" key={c._id}>
              <span className="postCat">{c.name}</span>
            </Link>
        ))}         
        </div>
        <Link to={`/post/${post._id}`} className="link">
          <span className="postTitle">{post.title}</span>
        </Link>
        <hr />
        <span className="postDate">{new  Date(post.createdAt).toDateString()}</span>
      </div>
      <p className="postDesc">
        {post.desc}
      </p>
    </div>
  );
}