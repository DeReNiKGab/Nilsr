import React, {useEffect, useState} from 'react';
import {useParams} from "react-router-dom";
import axios from "axios";
import img from "../../../../assets/images/Lessonlogo.jpg";
import DOMPurify from "dompurify";
const Loader = React.lazy(() => import("../../../Loader/Loader"));



const LessonsAndTrainingItem = () => {

    const [getObjLessonsAndTrainingItem, ObjLessonsAndTrainingItem] = useState([]);
    const [isLoading, setIsLoading] = useState(false);
    const [error, setError] = useState(null);

    let { id } = useParams();

    const url = window.location.origin === "http://localhost:5173"
        ? "http://127.0.0.1:8000"
        : window.location.origin;


    useEffect(() => {
        window.scrollTo(0, 0);
        axiosRequest();
    },[]);

    function  axiosRequest(){
        const getData = async () => {
            await axios.get(url+"/api/LessonsAndTraining-item/"+id)
                .then((resLessonsAndTrainingItem) => {
                    const LessonsAndTrainingItemData = resLessonsAndTrainingItem.data;
                    ObjLessonsAndTrainingItem(LessonsAndTrainingItemData);
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
        <section className="mx-3 relative mb-32 flex flex-col items-center">
            <img
                src={img}
                className="mb-6 w-auto h-auto md:w-[45%] lg:w-[30%]  xl:w-[20%]  rounded-lg"
                alt="image"
            />
            <h1 className="break-words mb-1 text-3xl font-bold text-blue-900">{getObjLessonsAndTrainingItem.title}</h1>
            <div className="mb-12 w-full relative">
                <div className="absolute right-0">
                    <span className="text-black">Հրապարակված է: {getObjLessonsAndTrainingItem.created_at}</span>
                </div>
            </div>
            <div
                className="overflow-clip  text-black font-bold break-words"
                dangerouslySetInnerHTML={{__html: DOMPurify.sanitize(getObjLessonsAndTrainingItem.description)}}
            />
        </section>
    </div>
    )
        ;
};

export default LessonsAndTrainingItem;
