import React, {useEffect} from "react";
import { useDispatch, useSelector} from 'react-redux';
import NavBar from "../components/NavBar";
import {fetchBlog} from '../actions/blogActions';
import { useParams } from "react-router-dom"; 
import './ReadBlog.css';

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
            <div className="title_container flex">
            <h1 className="blog_title">{blogs.title}</h1>
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
            
        </div>
    );
    }

export default ReadBlog;