import React, {useEffect, useState} from 'react';
import { Link} from "react-router-dom";
import axios from "axios";
const Loader = React.lazy(() => import("../../../Loader/Loader"));
import ReactPaginate from 'react-paginate';
import useWindowSize from "../../../useWindowSize/WindowSize";


const NewsPage = () => {
    const PER_PAGE = 12;
    const [currentPage, setCurrentPage] = useState(1);
    const [getObjNewsItem, ObjSetNewsItem] = useState([]);
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
        window.addEventListener('languageChange', (event)=>{
            event.preventDefault();
        });
        axiosRequest(currentPage);
    },[]);

    if (isLoading) return <Loader />;

    function  axiosRequest(defPage){
        axios
            .get(url+"/api/news/"+defPage, {
                cancelToken: signal.token,
            })
            .then((resNewsItem) => {
                const NewsDataItem = resNewsItem.data;
                ObjSetNewsItem(NewsDataItem);
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

    if(getObjNewsItem[0]){
        pageCount = Math.ceil(getObjNewsItem[0].count / PER_PAGE)
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

    return (
        <div className="container max-w-full  md:px-6 bg-white" >
            {error && getErrorView()}
            <section className="mx-3 mb-32">
                <h2 className="w-2/4 mb-2 mt-50 text-3xl font-bold text-blue-900  ">Նորություններ</h2>
                <hr className="w-2/4 mb-10   border-blue-900	"/>
                <div className="grid gap-12 sm:grid-cols-1 md:grid-cols-1 lg:grid-cols-2 xl:grid-cols-3   2xl:grid-cols-4">
                    {getObjNewsItem.map((catNewsItem, index) => (
                        <div key={"div-" + index}
                             className="zoom relative overflow-hidden rounded-lg bg-cover bg-no-repeat shadow-lg  shadow-black/20"
                             data-te-ripple-init data-te-ripple-color="light">
                            <img src={catNewsItem.img} className="w-full align-middle transition duration-300 ease-linear" alt=""/>
                            <Link to={`/news/${catNewsItem.id}`} >
                                <div className="absolute top-0 right-0 bottom-0 left-0 h-full w-full overflow-hidden bg-[hsla(0,0%,0%,0.4)] bg-fixed">
                                    <div className="flex h-full items-end justify-start">
                                        <div
                                            className="w-auto  h-auto m-6 text-white [&_a]:!text-white [&_p]:!text-white">
                                            <h5 className="overflow-y-clip h-12 text-base font-bold">{truncate(catNewsItem.title, 95, 98)}</h5>
                                            <p><small>Հրապարակված է: <u>{catNewsItem.created_at}</u></small></p>
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
                        className="[&_a]:!text-white [&_a]:hover:text-white  list-style-none flex mt-6 float-end gap-2"
                        breakLabel="..."
                        previousLabel={<p className=" hover:text-white  bg-blue-900 relative block rounded px-3 py-1.5 text-sm transition duration-300  focus:outline-none focus:ring-0  text-white  hover:bg-blue-900  focus:bg-blue-900  focus:text-white  active:bg-blue-600  active:text-white"
                        >Previous</p>}
                        nextLabel={<p className=" hover:text-white  bg-blue-900 relative block rounded  px-3 py-1.5 text-sm transition duration-300  focus:outline-none focus:ring-0  text-white  hover:bg-blue-900  focus:bg-blue-900  focus:text-white  active:bg-blue-600  active:text-white"
                        >Next</p>}
                        pageCount={pageCount}
                        pageClassName={ 'className="  bg-blue-900  relative block rounded bg- px-3 py-1.5 text-sm text-surface transition duration-300  focus:bg-blue-600 focus:text-white focus:outline-none active:bg-blue-600 active:text-white  text-white  hover:bg-blue-900  focus:bg-blue-600  focus:text-white  active:bg-blue-600  active:text-white"'}
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

export default NewsPage;
