import React, { useEffect } from "react";
import NavBar from "../components/NavBar";
import blog_img from "../assets/blog_img.jpeg";
import "./Blogs.css";
import { useDispatch, useSelector } from "react-redux";
import { fetchBlogs } from "../actions/blogActions";
import { useNavigate, Link } from "react-router-dom";
import Footer from "../components/Footer";

const Blogs = () => {
  const dispatch = useDispatch();
  const { blogs, loading, error } = useSelector((state) => state.blogReducer);
  const auth = useSelector((state) => state.auth);
  const navigate = useNavigate();

  useEffect(() => {
    dispatch(fetchBlogs());
  }, [dispatch]);

  const getExcerpt = (content, wordLimit) => {
    const words = content.split(" ");
    return (
      words.slice(0, wordLimit).join(" ") +
      (words.length > wordLimit ? "..." : "")
    );
  };

  return (
    <div className="blog_container">
      <NavBar />
      <div>
        <img src={blog_img} alt="blogs" className="blogsImg" />
        <div className="h1_container flex items-center place-content-center">
          <h1 className=" mr-10 h1_blogs">Blogs</h1>
          {auth.isAuthenticated && auth.user && auth.user.role === 'admin' && <Link to="/newblog">New blog</Link>}
        </div>
      </div>
      <div className="flex items-center place-content-center">

      
      <div className="blogs_list">
        {loading && <p>Loading...</p>}
        {error && <p>Error: {error}</p>}
        {blogs.length > 0
          ? blogs.map((blog) => (
              <div
                key={blog._id}
                className="blog_item cursor-pointer mb-10"
                onClick={() => navigate(`/blogs/${blog._id}`)}
                style={{
                  backgroundImage: `url(${blog.image})`,
                  backgroundSize: "cover", // covers the div without stretching
                  backgroundPosition: "center", // centers the image
                  backgroundRepeat: "no-repeat", // avoids tiling
                }}
              >
                <p className=" text-lg">{blog.title}</p>
                <p >{getExcerpt(blog.content, 10)}</p>
              </div>
            ))
          : !loading && <p>No blogs available.</p>}
      </div>
      </div>
      <Footer />
    </div>
  );
};

export default Blogs;
