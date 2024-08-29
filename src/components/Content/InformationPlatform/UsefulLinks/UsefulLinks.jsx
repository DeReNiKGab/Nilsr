import React, {useEffect, useState} from 'react';
import axios from "axios";
import { Link} from "react-router-dom";
const Loader = React.lazy(() => import("../../../../components/Loader/Loader"));



const UsefulLinks = () => {
    const [getObjUsefulLinks, setGetObjUsefulLinks] = useState([]);
    const [isLoading, setIsLoading] = useState(false);
    const [error, setError] = useState(null);
     



    const url = window.location.origin === "http://localhost:5173"
        ? "http://127.0.0.1:8000" 
        : window.location.origin;
    
    console.log(getObjUsefulLinks);


    useEffect(() => {
        window.scrollTo({top: 0, left: 0, behavior: 'smooth'});
        axiosRequest();
    }, []);

    function axiosRequest() {
        const getData = async () => {
            await axios.get(url + "/api/UsefulLink")
                .then((resUsefulLinks) => {
                    const UsefulLinksData = resUsefulLinks.data;
                    setGetObjUsefulLinks(UsefulLinksData);
                })
                .catch((e) => {
                    setError(e);
                })
                .finally(() => setIsLoading(false));
        };
        return getData();
    }



    const getErrorView = () => {
        return (
            <div>
                Տեղի է ունեցել սխալ !  խնդրում ենք թարմացրեք էջը. {error.message}
            </div>
        )
    }

    if (isLoading) return <Loader/>;


    return (
        <div className=" mt-24 mx-auto ">
            {error && getErrorView()}
            <section >
                <div className="block rounded-lg shadow-[0_2px_15px_-3px_rgba(0,0,0,0.07),0_10px_20px_-2px_rgba(0,0,0,0.04)]  bg-gradient-to-b from-white to-slate-400">
                    <div className="flex flex-wrap items-center">
                        <div className="w-full shrink-0 grow-0 basis-auto ">
                            <div className="px-6 mb-60 md:px-12">
                                <h2 className="w-2/4 mb-2 mt-50 text-3xl font-bold text-blue-900  ">  Օգտակար հղումներ</h2>
                                <hr className="w-2/4 mb-10  border-blue-900	"/>
                                <div className="grid gap-x-6 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
                                    {getObjUsefulLinks.map((UsefulLinkItems, index) => (
                                        <div key={index} className="mb-6">
                                            <Link target="_blank" rel="noopener noreferrer"
                                                  className="flex  text-black hover:text-gray-700 focus:text-black"
                                                  to={UsefulLinkItems.url}>
                                                {UsefulLinkItems.title}
                                            </Link>
                                        </div>
                                    ))}
                                </div>

                            </div>

                        </div>
                    </div>
                </div>
            </section>
        </div>
    );
};

export default UsefulLinks;
