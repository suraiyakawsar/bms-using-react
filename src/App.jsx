import Axios from "axios";
import "./App.scss";
import { useState, useEffect } from "react";
import Header from "./component/Header/Header";
import Pagination from "./component/Pagination/Pagination";
import BlogItem from "./component/BlogItem/BlogItem";
import AddPost from "./component/AddPost/AddPost";

const Api_key =
  "6b246ed014ebbc955b112ee4d17d0b6791576ec471ba1ed1308cc25caf0bd4ee";

const client = Axios.create({
  baseURL: `https://gorest.co.in/public/v2`,
  headers: { Authorization: `Bearer ${Api_key}` },
});

function App() {
  const [posts, setPosts] = useState([]);
  const [loading, setLoading] = useState(false);
  const [data, setData] = useState({
    user_id: 4518,
    title: "",
    body: "",
  });

  //Get the author name according to the id
  async function getAuthor(id) {
    var result = await client.get(`/users/${id}`);
    var author = result.data.name ? result.data.name : "";
    return author;
  }

  async function getPosts(pageNumber) {
    setLoading(true);
    const response = await client.get(`/posts?page=${pageNumber}`);
    // console.log(response);
    try {
      var totalPosts = response.headers["x-pagination-total"]; //1332

      for (let i = 0; i <= totalPosts; i++) {
        response.data[i].author = await getAuthor(response.data[i].user_id);
        setPosts(response.data);
        setLoading(false);
      }
    } catch (e) {
      // console.log(e);
    }
  }

  async function addPosts() {
    let postData = {
      user_id: 4518,
      title: data.title,
      body: data.body,
    };
    await client
      .post("/posts", postData)
      .then((res) => {
        console.log("Successfully added ", data);
        setPosts([res.data, ...posts]);
        setData({
          title: "",
          body: "",
        });
      })
      .catch((e) => {
        console.log(e);
      });
  }

  async function deletePost(id) {
    client
      .delete(`/posts/${id}`)
      .then((res) => {
        console.log("Successfully Deleted the post with id=", id);
        getPosts();
      })
      .catch((e) => {
        console.log(e);
      });
  }

  useEffect(() => {
    getPosts();
  }, []);

  const handleSubmit = (e) => {
    e.preventDefault();
    addPosts();
  };

  //change page
  const paginate = (currentPage) => {
    getPosts(currentPage);
    // setCurrentPage(currentPage);
  };

  return (
    <div>
      <Header />
      <div className="container">
        <AddPost
          data={data}
          handleTitle={(e) => setData({ ...data, title: e.target.value })}
          handleBody={(e) => setData({ ...data, body: e.target.value })}
          formSubmit={handleSubmit}
        />
        <div className="blog-post">
          <h1>Blog Posts</h1>
          {posts.map((post) => {
            return (
              <BlogItem
                post={post}
                loading={loading}
                key={post["id"]}
                deletePost={() => deletePost(post["id"])}
              />
            );
          })}
        </div>

        <Pagination paginate={paginate} />
      </div>
    </div>
  );
}

export default App;
