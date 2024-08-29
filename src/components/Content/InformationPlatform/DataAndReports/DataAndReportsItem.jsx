import React, {useEffect, useState} from 'react';
import axios from "axios";
import {useParams} from "react-router-dom";
import DOMPurify from "dompurify";
const Loader = React.lazy(() => import("../../../Loader/Loader"));


const DataAndReportsItem = () => {
    const [getObjDataAndReportsItem, ObjDataAndReports] = useState([]);
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
            await axios.get(url+"/api/DataAndReports-item/"+id)
                .then((resDataAndReports) => {
                    const DataAndReportsData = resDataAndReports.data;
                    ObjDataAndReports(DataAndReportsData);
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
            <section className="mx-3 mb-32">
                <img src={getObjDataAndReportsItem.img} className="mb-6 w-full rounded-lg shadow-lg  shadow-black/20"
                     alt="image"/>
                <div className="mb-6 flex items-center">
                    <div><span className="text-black"> Հրապարակված է: {getObjDataAndReportsItem.created_at} </span>
                    </div>
                </div>
                <h1 className="mb-6 text-3xl font-bold text-blue-900">{getObjDataAndReportsItem.title}</h1>
                <div
                    className="  overflow-clip text-black break-words"
                    dangerouslySetInnerHTML={{__html: DOMPurify.sanitize(getObjDataAndReportsItem.description)}}
                />
            </section>
        </div>
    );
};

export default DataAndReportsItem;
