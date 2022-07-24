import React from 'react'
import "./BlogItem.scss" 
import Chip from '../Chip/Chip'
import { BsFillTrashFill } from "react-icons/bs";


const BlogItem = ({post, loading, deletePost}) => {
  if (loading) {
    return <h2>Loading...</h2>;
  }
  
  return (
    <div className="blogitem-wrap" id={post["id"]}>
      <h3>{post["title"]}</h3>
      <p className="blogitem-desc">{post["body"]}</p>

      <footer>
        <div className="blogitem-author">
          <Chip label={post["author"] ? post["author"] : "Unknown"} />
        </div>
        <div className="blogitem-btn">
          <button onClick={deletePost}>
            <BsFillTrashFill />
          </button>
        </div>
      </footer>
    </div>
  );
}

export default BlogItem