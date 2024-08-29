import React, {useEffect, useState} from 'react';
import axios from "axios";
import {useParams} from "react-router-dom";
import DOMPurify from "dompurify";
const Loader = React.lazy(() => import("../../../Loader/Loader"));



const NewsItem = () => {
    const [getObjNewsItem, ObjSetNews] = useState([]);
    const [isLoading, setIsLoading] = useState(false);
    const [error, setError] = useState(null);
     
    let { id } = useParams();

    const url = window.location.origin === "http://localhost:5173"
        ? "http://127.0.0.1:8000" 
        : window.location.origin;
    

    useEffect(() => {
        window.scrollTo(0, 0);
        window.addEventListener('languageChange', (event)=>{
            event.preventDefault();
            axiosRequest();
        })
        axiosRequest();
    },[]);

    function  axiosRequest(){
        const getData = async () => {
            await axios.get(url+"/api/news-item/"+id)
                .then((resNews) => {
                    const NewsData = resNews.data;
                    ObjSetNews(NewsData);
                })
                .catch((e) => {
                    setError(e);
                })
                .finally(() => setIsLoading(false));
        };
        return getData();
    }
    if (isLoading) return <Loader />;

    const getErrorView = () => {
        return (
            <div>
                Տեղի է ունեցել սխալ !  խնդրում ենք թարմացրեք էջը. {error.message}
            </div>
        )
    }
    return (
        <div className="container my-24 mx-auto md:px-6">
            {error && getErrorView()}
            <section className="mx-3  mb-32">
                <img src={getObjNewsItem.img} className="mb-6 w-full rounded-lg shadow-lg  shadow-black/20"
                     alt="image"/>
                <div className="mb-6 flex items-center">
                    <div><span className="text-black"> Հրապարակված է: {getObjNewsItem.created_at} </span></div>
                </div>
                <h1 className="mb-6 text-3xl font-bold text-blue-900">{getObjNewsItem.title}</h1>
                <div
                    className="overflow-clip  break-words font-bold text-black"
                    dangerouslySetInnerHTML={{__html: DOMPurify.sanitize(getObjNewsItem.description)}}
                />

            </section>
        </div>
    );
};

export default NewsItem;
