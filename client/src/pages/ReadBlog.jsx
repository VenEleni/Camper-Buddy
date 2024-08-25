import React, {useEffect} from "react";
import { useDispatch, useSelector} from 'react-redux';
import NavBar from "../components/NavBar";
import {fetchBlog} from '../actions/blogActions';
import { useParams } from "react-router-dom"; 
import './ReadBlog.css';
import Footer from "../components/Footer";

const ReadBlog = () => {
    const { id } = useParams();
    const dispatch = useDispatch();
    const { blogs, loading, error } = useSelector(state => state.blogReducer);
    console.log("blogs is : ", blogs);
    useEffect(() => {
        dispatch(fetchBlog(id));
        
        
    }, [dispatch]);


    return (
        <div>
            <NavBar/>
            <div>
            <img src={blogs.image} alt={blogs.title} className="blogsImg" />
            <div className="flex items-center place-content-center">
            <div className="title_container">
            <h1 className="blog_title">{blogs.title}</h1>
            </div>
            </div>
           
            </div>
            <div className="content_container px-40">
            {blogs.content ? (
                    blogs.content.split('\n').map((paragraph, index) => (
                        <p key={index} className="text-black my-4">{paragraph}</p>
                    ))
                ) : (
                    <p>Loading content...</p> 
                )}
            </div>
            <Footer/>
            
        </div>
    );
    }

export default ReadBlog;