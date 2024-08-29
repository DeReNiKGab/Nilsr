import React, {useEffect, useState} from 'react';
import {Link} from "react-router-dom";
import useWindowSize from "../../../useWindowSize/WindowSize.jsx";
import axios from "axios";
import ReactPaginate from "react-paginate";
import  img from "../../../../assets/images/Lessonlogo.jpg"
import DOMPurify from "dompurify";
const Loader = React.lazy(() => import("../../../Loader/Loader"));

const LessonsAndTrainingPage = () => {
    const PER_PAGE = 12;
    const [currentPage, setCurrentPage] = useState(1);
    const [getObjLessonsAndTrainingItem, ObjSetLessonsAndTrainingItem] = useState([]);
    const [isLoading, setIsLoading] = useState(false);
    const [error, setError] = useState(null);
    const { width } = useWindowSize();
     
    let signal = axios.CancelToken.source();
    const isMobile = width < 768;
    const pageRangeDisplayed = isMobile ? 1 : 3; // Number of pages to display around the current page
    const marginPagesDisplayed = isMobile ? 2 : 3; // Number of pages to display at the margins

    const url = window.location.origin === "http://localhost:5173"
        ? "http://127.0.0.1:8000" 
        : window.location.origin;
    

    useEffect(() => {
        window.scrollTo({top: 0, left: 0, behavior: 'smooth'});
        axiosRequest(currentPage);
    },[]);

    if (isLoading) return <Loader />;

    function  axiosRequest(defPage){
        axios
            .get(url+"/api/LessonsAndTraining/"+defPage, {
                cancelToken: signal.token,
            })
            .then((resLessonsAndTrainingItem) => {
                const DataItem = resLessonsAndTrainingItem.data;
                ObjSetLessonsAndTrainingItem(DataItem);
            })
            .catch((e) => {
                setError(e);
            })
            .finally(() => setIsLoading(false));
    }
    function handlePageClick(event) {
        let page = event.selected+1;
        setCurrentPage(parseInt(event.selected)+1);
        axiosRequest(page);
        window.scrollTo(0, 0);
    }
    let pageCount = 0;

    if(getObjLessonsAndTrainingItem[0]){
        pageCount = Math.ceil(getObjLessonsAndTrainingItem[0].count / PER_PAGE)
    }

    const getErrorView = () => {
        return (
            <div>
                Տեղի է ունեցել սխալ !  խնդրում ենք թարմացրեք էջը. {error.message}
            </div>
        )
    }

    const truncate = (str, max, len) => {
        return  str ? str.length > max ? str.substring(0, len) + "..." : str : '';
    };


    return (
        <div className="container 2xl:max-w-full mx-auto my-24  md:px-6">
            {error && getErrorView()}
            <section className="mx-3  mb-32 text-center md:text-left">
                <h2 className="mx-3 mb-3 text-center text-2xl sm:text-3xl font-bold  text-blue-900">Դասընթաց և Վերապատրաստում</h2>
                <hr className=" mb-10 border-blue-900 align-middle"/>
                <div className="grid sm:grid-cols-1 md:grid-cols-2 lg:grid-cols-2 xl:grid-cols-3 2xl:grid-cols-4  gap-12">
                    {getObjLessonsAndTrainingItem.map((LessonsAndTrainingItem, index) => (
                        <div key={index}
                             className="mb-12 lg:mb-0 p-2 border-2 border-gray-300 shadow-lg  shadow-black/20 bg-[200%] ">
                            <div className="relative mb-6 overflow-hidden bg-cover bg-no-repeat "
                                 data-te-ripple-init data-te-ripple-color="light">
                                <img src={img} className="w-full" alt="LessonLogo"/>
                                <Link to={`/LessonsAndTraining/${LessonsAndTrainingItem.id}`}>
                                    <div
                                        className="mask absolute top-0 right-0 bottom-0 left-0 h-full w-full overflow-hidden bg-fixed opacity-0 transition duration-300 ease-in-out hover:opacity-100 bg-[hsla(0,0%,98.4%,0.2)]"></div>
                                </Link>
                            </div>
                            <h5 className="break-words p-2 mb-4 w-auto  text-lg font-bold  text-blue-900  h-auto  sm:h-[50px] md:h-[50px] lg:h-[50px] xl:h-[50px] 2xl:h-[50px] 3xl:h-auto">
                                {truncate(LessonsAndTrainingItem.title, 80, 80)}
                            </h5>
                            <div
                                className="mb-4 flex items-center justify-between text-sm font-medium text-primary  text-primary-800 lg:justify-between">
                                <div className=" flex  items-center justify-e text-black">
                                    {LessonsAndTrainingItem.created_at}
                                </div>
                                <Link to={`/LessonsAndTraining/${LessonsAndTrainingItem.id}`}
                                      data-te-ripple-color="light"
                                      className="mb-1 mt-0 md:mt-5 lg:mt-8 xl:mt-4 2xl:mt-4 inline-block rounded-full bg-blue-500 px-6 pt-2.5 pb-2 text-xs font-medium uppercase leading-normal text-white hover:text-white focus:text-white  shadow-[0_4px_9px_-4px_#3b71ca] transition duration-150 ease-in-out hover:bg-primary-800 hover:shadow-[0_8px_9px_-4px_rgba(59,113,202,0.3),0_4px_18px_0_rgba(59,113,202,0.2)] focus:bg-primary-800 focus:outline-none focus:ring-0 active:bg-primary-700   focus:shadow-[0_8px_9px_-4px_rgba(59,113,202,0.2),0_4px_18px_0_rgba(59,113,202,0.1)]  active:shadow-[0_8px_9px_-4px_rgba(59,113,202,0.2),0_4px_18px_0_rgba(59,113,202,0.1)]">
                                    Կարդալ ավելին
                                </Link>
                            </div>
                            <div
                                className="overflow-clip text-black p-2  break-words"
                                dangerouslySetInnerHTML={{__html: DOMPurify.sanitize(truncate(LessonsAndTrainingItem.description, 350, 350))}}
                            />
                        </div>
                    ))}

                </div>
                <nav aria-label="Page  navigation example ">
                    <ReactPaginate
                        className="[&_a]:!text-white [&_a]:hover:text-white  list-style-none flex mt-12 float-end gap-2"
                        breakLabel="..."
                        previousLabel={<p className=" hover:text-white  bg-blue-900 relative block rounded  px-3 py-1.5 text-sm transition duration-300  focus:outline-none focus:ring-0  text-white  hover:bg-blue-900  focus:bg-blue-900  focus:text-white  active:bg-blue-600  active:text-white"
                        >Previous</p>}
                        nextLabel={<p className=" hover:text-white  bg-blue-900 relative block rounded  px-3 py-1.5 text-sm transition duration-300  focus:outline-none focus:ring-0 text-white  hover:bg-blue-900  focus:bg-blue-900  focus:text-white  active:bg-blue-600  active:text-white"
                        >Next</p>}
                        pageCount={pageCount}
                        pageClassName={'className="  bg-blue-900  relative block rounded px-3 py-1.5 text-sm text-surface transition duration-300  focus:bg-blue-600 focus:text-white focus:outline-none active:bg-blue-600 active:text-white  text-white  hover:bg-blue-900  focus:bg-blue-600  focus:text-white  active:bg-blue-600  active:text-white"'}
                        onPageChange={handlePageClick}
                        containerClassName={"pagination"}
                        previousLinkClassName={"pagination__link"}
                        nextLinkClassName={"pagination__link"}
                        disabledClassName={"pagination__link--disabled"}
                        activeClassName={"pagination__link--active"}
                        pageRangeDisplayed={pageRangeDisplayed}
                        marginPagesDisplayed={marginPagesDisplayed}
                    />
                </nav>
            </section>

        </div>
    );
};

export default LessonsAndTrainingPage;
