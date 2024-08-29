import React, {useEffect, useState} from 'react';
import axios from "axios";
import {useParams} from "react-router-dom";
const Loader = React.lazy(() => import("../../../Loader/Loader"));
import  img from "../../../../assets/images/Lessonlogo.jpg"
import DOMPurify from "dompurify";


const AnnouncementsItem = () => {
    const [getObjDataAndReportsItem, ObjSetDataAndReports] = useState([]);
    const [isLoading, setIsLoading] = useState(false);
    const [error, setError] = useState(null);
     
    let { id } = useParams();

    const url = window.location.origin === "http://localhost:5173"
        ? "http://127.0.0.1:8000" 
        : window.location.origin;
    

    useEffect(() => {
        const axiosRequest = async () => {
            try {
                const response = await axios.get(`${url}/api/announcements-item/`+ id );
                ObjSetDataAndReports(response.data);
            } catch (e) {
                setError(e);
            } finally {
                setIsLoading(false);
            }
        };

        window.scrollTo({ top: 0, left: 0, behavior: 'smooth' });
        axiosRequest();
    },[]);


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
            <section className="mx-3 relative mb-32 flex flex-col items-center">
                <img
                    src={img}
                    className="mb-6 w-auto h-auto md:w-[45%] lg:w-[30%]  xl:w-[20%]  rounded-lg"
                    alt="image"
                />
                <h1 className="break-words mb-1 text-3xl font-bold text-blue-900">{getObjDataAndReportsItem.title}</h1>
                <div className="mb-12 w-full relative">
                    <div className="absolute right-0">
                        <span className="text-black">Հրապարակված է: {getObjDataAndReportsItem.created_at}</span>
                    </div>
                </div>
                <div
                    className="overflow-clip text-black break-words"
                    dangerouslySetInnerHTML={{__html: DOMPurify.sanitize(getObjDataAndReportsItem.description)}}
                />
            </section>
        </div>

    );
};

export default AnnouncementsItem;
