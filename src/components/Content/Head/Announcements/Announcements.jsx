import { Link } from "react-router-dom";
import Slider from "react-slick";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import React, {useEffect, useState} from "react";
import axios from "axios";
import useWindowSize from "../../../useWindowSize/WindowSize.jsx";
import DOMPurify from "dompurify";

const Loader = React.lazy(() => import("../../../../components/Loader/Loader"));

export default function Announcements() {
    const [getObjAnnouncementsHeader, setGetObjAnnouncementsHeader] = useState([]);
    const [isLoading, setIsLoading] = useState(false);
    const [error, setError] = useState(null);

    const { width } = useWindowSize();

    let arrow = width > 800;
    let descr = width > 760;


    const url = window.location.origin === "http://localhost:5173"
        ? "http://127.0.0.1:8000"
        : window.location.origin;


    useEffect(() => {
        const axiosRequest = async () => {
            try {
                const response = await axios.get(`${url}/api/announcements-header`);
                setGetObjAnnouncementsHeader(response.data);
            } catch (e) {
                setError(e);
            } finally {
                setIsLoading(false);
            }
        };

        window.scrollTo({ top: 0, left: 0, behavior: 'smooth' });

        axiosRequest();

    }, [url]);
    const truncate = (str, max, len) => {
        return  str ? str.length > max ? str.substring(0, len) + "..." : str : '';
    };
    const getErrorView = () => {
        return (
            <div>
                Տեղի է ունեցել սխալ !  խնդրում ենք թարմացրեք էջը. {error.message}
            </div>
        )
    }

    const settings = {
        dots: false,
        infinite: true,
        speed: 500,
        slidesToShow: 1,
        slidesToScroll: 1,
        autoplay: false,
        autoplaySpeed: 2000, // 4 seconds
        pauseOnHover: true,
        draggable: true,
        arrows: arrow
    };

   if (isLoading) return <Loader/>;

    return (
        <div className="  px-4 py-8">
            {error && getErrorView()}
            <div className="flex w-50% flex-wrap -mx-3">
                <div className="w-full w-50% lg:w-1/1 md:w-1/1 sm:w-1/1 px-3">
                    <h3 className="text-2xl font-normal my-2 text-gray-100">Հայտարարություններ</h3>
                    <hr className="my-4 border-t border-gray-200"/>
                    <div className="w-full w-50%  bg-gray-400 bg-opacity-80 border border-gray-600 rounded pt-4 px-2">
                        <div >
                            <Slider {...settings}>
                            {Array.isArray(getObjAnnouncementsHeader) && getObjAnnouncementsHeader.length > 0 ? (
                                    getObjAnnouncementsHeader.map((announcement, index) => (
                                        <div key={index} className="flex w-full md:p-2 flex-wrap ">
                                            <div className="break-words w-full h-full  mb-4">
                                                <h4>{announcement.title}</h4>
                                            </div>
                                            <div className="w-full  md:h-24 overflow-y-clip mb-4">
                                                {descr === true ?
                                                    <div
                                                        className="overflow-clip  break-words"
                                                        dangerouslySetInnerHTML={{__html: DOMPurify.sanitize(truncate(announcement.description, 711, 711))}}
                                                    />
                                                    : " "}
                                            </div>
                                            <div className="w-full  mb-4">
                                                <span>Հրապարակված է: {announcement.created_at}</span>
                                            </div>
                                            <div className="w-full text-end  mb-4">
                                                <Link to={`/announcements/${announcement.id}`} className="inline-block bg-blue-500 text-white py-2 px-4 rounded hover:bg-blue-600 transition duration-150 ease-in-out">
                                                    Տեսնել Մանրամասն
                                                </Link>
                                            </div>
                                        </div>
                                    ))): (
                                    <p>Հայտարարություններ չկան</p>
                                    )}
                            </Slider>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}