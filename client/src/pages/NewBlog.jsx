import React, {useState} from "react";
import NavBar from "../components/NavBar";
import './NewBlog.css';
import { useDispatch} from 'react-redux';
import {createBlog} from '../actions/blogActions';

const NewBlog = () => {
    const [title, setTitle] = useState('');
    const [content , setContent] = useState('');
    const [image, setImage] = useState('');
    
    const [message, setMessage] = useState(null);

    const dispatch = useDispatch();

    const handleSubmit = (e) => {
        e.preventDefault();
        const newBlog = { title, content, image };
        dispatch(createBlog(newBlog));
        setMessage('Blog created successfully');

        setTitle('');
        setContent('');
        setImage('');
    }
    return (
        <div>
        <div>   
            <NavBar/>
            </div>
        <div className='create_blog_body '>
            
        <form className='create_blog_form top-24' onSubmit={handleSubmit}>
            <h4>Write your new blog</h4>
            {message && <div>{message}</div>}
        <div className="field border ">
          <input className='create_blog_input' value={title} onChange={(e) => setTitle(e.target.value)} required placeholder='Give a title to your blog'  />
        </div>
        <div className=" create_blog_textarea ">
          <textarea className='border create_blog_input blog_textarea' value={content} onChange={(e) => setContent(e.target.value)} required placeholder='Write the content'  ></textarea>
        </div>
        <div className="field border ">
          <input className='create_blog_input' type="text" value={image} onChange={(e) => setImage(e.target.value)} required placeholder='Image URL' />
        </div>
        <button className="responsive large-elevate primary large create_product_button" type="submit">Upload new blog</button>
        </form>
        </div>
        </div>
    );
    }

export default NewBlog;