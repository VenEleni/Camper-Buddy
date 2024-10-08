import React from "react";
import work_in_progress from '../assets/work_in_progress.png';

const ForumErrorPage = () => {
    return (
        <div className="flex flex-col items-center place-content-center">
            <img className="w-40 top-20" src={work_in_progress} alt="work-in-progress-image" />
        <h1 className="text-black top-24">Forum Page is under construction ...</h1>
        </div>
    );
    }

export default ForumErrorPage;