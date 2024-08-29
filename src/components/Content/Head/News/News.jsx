import React, {useEffect, useState} from 'react';
import axios from "axios";
import {Link} from "react-router-dom";
import Slider from "react-slick";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import useWindowSize from "../../../useWindowSize/WindowSize.jsx";

const Loader = React.lazy(() => import("../../../../components/Loader/Loader"));

const   News = () => {
    const [getObjNewsHeader, setGetObjNewsHeader] = useState([]);
    const [isLoading, setIsLoading] = useState(false);
    const [error, setError] = useState(null);

    const { width } = useWindowSize();
    const CarouselItemNum = () => (width < 650 ? 1 : (width < 1030 ? 2 : (width < 1450 ? 3 : 4)));


     

    const url = window.location.origin === "http://localhost:5173"
        ? "http://127.0.0.1:8000" 
        : window.location.origin;
    

    useEffect(() => {
        window.scrollTo({top: 0, left: 0, behavior: 'smooth'});
        window.addEventListener('languageChange', (event) => {
            event.preventDefault();
            axiosRequest();
        });
        axiosRequest();
    }, []);

    function axiosRequest() {
        const getData = async () => {
            await axios.get(url + "/api/news-header")
                .then((resNews) => {
                    const NewsData = resNews.data;
                    setGetObjNewsHeader(NewsData);
                })
                .catch((e) => {
                    setError(e);
                })
                .finally(() => setIsLoading(false));
        };
        return getData();
    }
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

    if (isLoading) return <Loader/>;
    const settings = {
        dots: true,
        infinite: true,
        speed: 500,
        slidesToShow: CarouselItemNum(),
        slidesToScroll: 1,
        autoplay: false,
        autoplaySpeed: 2000, // 4 seconds
        pauseOnHover: true,
        draggable: true,
        arrows: false,

    };

    return (
        <section className="mb-32 mx-5">
            {error && getErrorView()}
            <h3 className="text-2xl font-semibold mt-8 mb-8 text-blue-800 text-left">
                Նորություններ
            </h3>
            <hr className="my-5 border-t border-blue-800"/>

            <Slider {...settings}>
                {Array.isArray(getObjNewsHeader) && getObjNewsHeader.length > 0 ? (
                    getObjNewsHeader.map((news, index) => (
                        <div key={index} className="bg-white grid ">
                            <div className="container  mx-auto md:px-2 ">
                                <section className="mb-10">
                                    <div className="grid ">
                                        <div className="w-90 zoom relative  rounded-lg bg-cover bg-no-repeat shadow-lg  shadow-black/20"
                                            data-te-ripple-init data-te-ripple-color="light">
                                            <img src={news.img}
                                                 className="aspect-auto lg:h-72 w-full  align-middle transition duration-300 ease-linear"
                                                 alt="news-header"/>
                                            <div className="absolute top-0 right-0 bottom-0 left-0 h-full w-full overflow-hidden bg-[hsla(0,0%,0%,0.4)] bg-fixed">
                                                <Link to={`/news/${news.id}`}>
                                                    <div className="flex h-full items-end justify-start">
                                                        <div className="mt-6 mb-4 mx-2 text-white w-full">
                                                            <h5 className="break-words overflow-y-clip h-14 w-auto text-lg font-bold  text-left">{truncate(news.title, 95, 95)}</h5>
                                                            <div className="mt-1  flex justify-between ">
                                                                <p className="text-white">
                                                                    <small> {news.created_at} </small>
                                                                </p>
                                                            </div>
                                                        </div>
                                                    </div>
                                                    <div className="absolute top-0 right-0 bottom-0 left-0 h-full w-full overflow-hidden bg-fixed transition duration-300 ease-in-out hover:bg-[hsla(0,0%,99%,0.15)]"></div>
                                                </Link>
                                            </div>
                                        </div>
                                    </div>
                                </section>
                            </div>
                        </div>
                    ))
                ) : (
                    <p>Նորություններ չկան</p>
                )}
            </Slider>
            <Link to="/news"
                  className="bg-blue-500  hover:bg-blue-600 text-white mt-11 font-bold py-2 px-4 rounded-full absolute right-10 hover:text-white focus:text-white"><span
                aria-hidden="true" className="absolute inset-0"></span>Տեսնել բոլորը</Link>
        </section>
    );
}
export default News;