import React, {useEffect, useState} from 'react';
import ReactPaginate from "react-paginate";
import { Link} from "react-router-dom";
import useWindowSize from "../../../useWindowSize/WindowSize.jsx";
import axios from "axios";
import DOMPurify from "dompurify";

const Loader = React.lazy(() => import("../../../Loader/Loader"));


const DataAndReportsPage = () => {
    const PER_PAGE = 12;
    const [currentPage, setCurrentPage] = useState(1);
    const [getObjDataAndReportsItem, ObjSetDataAndReportsItem] = useState([]);
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
            .get(url+"/api/DataAndReports/"+defPage, {
                cancelToken: signal.token,
            })
            .then((resDataAndReportsItem) => {
                const DataItem = resDataAndReportsItem.data;
                ObjSetDataAndReportsItem(DataItem);
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

    if(getObjDataAndReportsItem[0]){
        pageCount = Math.ceil(getObjDataAndReportsItem[0].count / PER_PAGE)
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
        <div className=" my-24 mx-auto md:px-6">
            {error && getErrorView()}
            <section className="mb-32 text-center">
                <h2 className="mb-3 text-center text-3xl font-bold  text-blue-900">
                    Տվյալներ և Զեկույցներ
                </h2>
                <hr className=" mb-10 border-blue-900 align-middle"/>
                <div className="grid  sm:grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4   gap-4">
                    {getObjDataAndReportsItem.map((DataAndReports, index) => (
                        <div key={index} className="mx-3 mt-5 mb-6 lg:mb-0">
                            <div
                                className="relative block rounded-lg shadow-[0_2px_15px_-3px_rgba(0,0,0,0.07),0_10px_20px_-2px_rgba(0,0,0,0.04)] bg-gradient-to-b from-white to-slate-400">
                                <div className="flex">
                                    <div
                                        className="relative mx-4 -mt-4 overflow-hidden rounded-lg bg-cover bg-no-repeat shadow-lg  shadow-black/20"
                                        data-te-ripple-init data-te-ripple-color="light">
                                        <img src={DataAndReports.img} className="w-full" alt=""/>
                                        <Link to={`/DataAndReports/${DataAndReports.id}`}>
                                            <div
                                                className="absolute top-0 right-0 bottom-0 left-0 h-full w-full overflow-hidden bg-fixed opacity-0 transition duration-300 ease-in-out hover:opacity-100 bg-[hsla(0,0%,98.4%,.15)]">
                                            </div>
                                        </Link>
                                    </div>
                                </div>
                                <div className="p-3">
                                    <h5 className=" break-words mb-3  h-auto  sm:h-[50px] md:h-[50px] lg:h-[50px] xl:h-[50px] 2xl:h-[50px] 3xl:h-auto text-lg font-bold text-blue-900">
                                        {truncate(DataAndReports.title, 50, 50)}
                                    </h5>
                                    <div
                                        className="mb-2  h-auto md:h-[140px] lg:h-[150px] 2xl:h-auto text-black font-bold overflow-clip  break-words"
                                        dangerouslySetInnerHTML={{__html: DOMPurify.sanitize(truncate(DataAndReports.description, 150, 186))}}
                                    />
                                    <Link to={`/DataAndReports/${DataAndReports.id}`} data-te-ripple-init
                                          data-te-ripple-color="light"
                                          className="mb-1 mt-0 md:mt-5 lg:mt-8 xl:mt-4 2xl:mt-4 inline-block rounded-full bg-blue-500 px-6 pt-2.5 pb-2 text-xs font-medium uppercase leading-normal text-white hover:text-white focus:text-white  shadow-[0_4px_9px_-4px_#3b71ca] transition duration-150 ease-in-out hover:bg-primary-800 hover:shadow-[0_8px_9px_-4px_rgba(59,113,202,0.3),0_4px_18px_0_rgba(59,113,202,0.2)] focus:bg-primary-800 focus:outline-none focus:ring-0 active:bg-primary-700   focus:shadow-[0_8px_9px_-4px_rgba(59,113,202,0.2),0_4px_18px_0_rgba(59,113,202,0.1)]  active:shadow-[0_8px_9px_-4px_rgba(59,113,202,0.2),0_4px_18px_0_rgba(59,113,202,0.1)]">
                                        Կարդալ ավելին
                                    </Link>
                                </div>
                            </div>
                        </div>
                    ))}
                </div>
                <nav aria-label="Page navigation example ">
                    <ReactPaginate
                        className="[&_a]:!text-white [&_a]:hover:text-white  list-style-none flex mt-6 float-end gap-2"
                        breakLabel="..."
                        previousLabel={<p
                            className=" hover:text-white  bg-blue-900 relative block rounded px-3 py-1.5 text-sm transition duration-300  focus:outline-none focus:ring-0  text-white  hover:bg-blue-900  focus:bg-blue-900  focus:text-white  active:bg-blue-600  active:text-white"
                        >Previous</p>}
                        nextLabel={<p
                            className=" hover:text-white  bg-blue-900 relative block rounded  px-3 py-1.5 text-sm transition duration-300  focus:outline-none focus:ring-0  text-white  hover:bg-blue-900  focus:bg-blue-900  focus:text-white  active:bg-blue-600  active:text-white"
                        >Next</p>}
                        pageCount={pageCount}
                        pageClassName={'className="  bg-blue-900  relative block rounded bg- px-3 py-1.5 text-sm text-surface transition duration-300  focus:bg-blue-600 focus:text-white focus:outline-none active:bg-blue-600 active:text-white  text-white  hover:bg-blue-900  focus:bg-blue-600  focus:text-white  active:bg-blue-600  active:text-white"'}
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

export default DataAndReportsPage;
