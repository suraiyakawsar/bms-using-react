import React from "react";
import "./AddPost.scss";
import { IoIosCreate } from "react-icons/io";

const AddPost = ({ data, handleTitle, handleBody, formSubmit }) => {
  return (
    <div>
      <form onSubmit={formSubmit}>
        <div className="createicon">
          <IoIosCreate className="icon"/>
          <h1>Create Post</h1>
        </div>

        <input
          type="text"
          id="title"
          placeholder="Title"
          onChange={handleTitle}
          value={data.title}
        />
        <textarea
          id="body"
          rows="9"
          placeholder="Body"
          onChange={handleBody}
          value={data.body}
        />

        <button>Add Post</button>
      </form>
    </div>
  );
};

export default AddPost;
