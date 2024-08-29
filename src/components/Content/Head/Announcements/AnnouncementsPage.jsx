import React, {useEffect, useState} from 'react';
import ReactPaginate from "react-paginate";
import { Link} from "react-router-dom";
import useWindowSize from "../../../useWindowSize/WindowSize.jsx";
import axios from "axios";
const Loader = React.lazy(() => import("../../../Loader/Loader"));
import  img from "../../../../assets/images/annoncelogo.jpg"

const AnnouncementsPage = () => {
    const PER_PAGE = 12;
    const [currentPage, setCurrentPage] = useState(1);
    const [getObjAnnouncementsItem, ObjSetAnnouncementsItem] = useState([]);
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
            .get(url+"/api/announcements/"+defPage, {
                cancelToken: signal.token,
            })
            .then((resAnnouncementsItem) => {
                const DataItem = resAnnouncementsItem.data;
                ObjSetAnnouncementsItem(DataItem);
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

    if(getObjAnnouncementsItem[0]){
        pageCount = Math.ceil(getObjAnnouncementsItem[0].count / PER_PAGE)
    }

    const getErrorView = () => {
        return (
            <div>
                Տեղի է ունեցել սխալ !  խնդրում ենք թարմացրեք էջը. {error.message}
            </div>
        )
    }


    return (
        <div className="container max-w-full  md:px-6 bg-white" >
            <section className="mb-32">
                {error && getErrorView()}
                <h2 className=" mb-2 mt-50 text-2xl sm:text-3xl w-auto font-bold text-blue-900  ">Հայտարարություններ</h2>
                <hr className="w-2/4 mb-10   border-blue-900	"/>
                <div className="grid sm:grid-cols-1 md:grid-cols-1 lg:grid-cols-2 xl:grid-cols-3   2xl:grid-cols-4 gap-12 ">
                    {getObjAnnouncementsItem.map((catAnnouncementsItem, index) => (
                        <div key={"div-" + index}
                             className=" mx-2 sm:mx-0 relative mb-6 overflow-hidden border-2 border-gray-300 bg-cover bg-no-repeat shadow-lg  shadow-black/20 bg-[200%]"
                             data-te-ripple-init data-te-ripple-color="light">
                            <img src={img}
                                 className="w-full pb-16 sm:pb-24 pt-5 align-middle transition duration-300 ease-linear"
                                 alt="announcements-header"/>
                            <Link to={`/announcements/${catAnnouncementsItem.id}`} >
                                <div className="absolute top-0 right-0 bottom-0 left-0 h-full w-full overflow-hidden  bg-fixed">
                                    <div className="flex h-full items-end justify-start">
                                        <div className="mx-3 mb-2 sm:mb-8 md:mb-3 sm:mx-5  text-white [&_p]:!text-black">
                                            <h5 className="break-words sm:h-[56px]  mb-3 text-sm sm:text-lg font-bold text-black">{catAnnouncementsItem.title}</h5>
                                            <p><small>Հրապարակված է: <u>{catAnnouncementsItem.created_at}</u> </small></p>
                                        </div>
                                    </div>
                                </div>
                                <div className="absolute top-0 right-0 bottom-0 left-0 h-full w-full overflow-hidden bg-fixed transition duration-300 ease-in-out hover:bg-[hsla(0,0%,99%,0.15)]"></div>
                            </Link>
                        </div>
                    ))}
                </div>
                <nav aria-label="Page navigation example ">
                    <ReactPaginate
                        className="[&_a]:!text-white [&_a]:hover:text-white  list-style-none flex mt-6 mr-5 float-end gap-2"
                        breakLabel="..."
                        previousLabel={<p className=" hover:text-white  bg-blue-900 relative block rounded  px-3 py-1.5 text-sm transition duration-300 hfocus:outline-none focus:ring-0   text-white  hover:bg-blue-900  focus:bg-blue-900  focus:text-white  active:bg-blue-600  active:text-white"
                        >Previous</p>}
                        nextLabel={<p className=" hover:text-white  bg-blue-900 relative block rounded  px-3 py-1.5 text-sm transition duration-300  focus:outline-none focus:ring-0   text-white  hover:bg-blue-900  focus:bg-blue-900  focus:text-white  active:bg-blue-600  active:text-white"
                        >Next</p>}
                        pageCount={pageCount}
                        pageClassName={'className="  bg-blue-900  relative block rounded  px-3 py-1.5 text-sm text-surface transition duration-300  focus:bg-blue-600 focus:text-white focus:outline-none active:bg-blue-600 active:text-white  text-white  hover:bg-blue-900  focus:bg-blue-600  focus:text-white  active:bg-blue-600  active:text-white"'}
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

export default AnnouncementsPage;
