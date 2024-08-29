import React, {useEffect, useState} from 'react';
import axios from "axios";
import DOMPurify from "dompurify";
const Loader = React.lazy(() => import("../../../../components/Loader/Loader"));


const MissionAndHistoryPage = () => {

    const [getObjMisAndHis, setGetObjMissionAndHistoryHeader] = useState([]);
    const [isLoading, setIsLoading] = useState(false);
    const [error, setError] = useState(null);

     

    const url = window.location.origin === "http://localhost:5173"
        ? "http://127.0.0.1:8000" 
        : window.location.origin;
    
    console.log(getObjMisAndHis);


    useEffect(() => {
        window.scrollTo({top: 0, left: 0, behavior: 'smooth'});
        axiosRequest();
    }, []);

    function axiosRequest() {
        const getData = async () => {
            await axios.get(url + "/api/MissionAndHistory")
                .then((resMissionAndHistory) => {
                    const MissionAndHistoryData = resMissionAndHistory.data;
                    setGetObjMissionAndHistoryHeader(MissionAndHistoryData);
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

    if (getObjMisAndHis.length < 2) return <div>No data available</div>;
    const firstObj = getObjMisAndHis[0];
    const secondObj = getObjMisAndHis[1];


    return (
        <div className=" mt-20-24 mx-auto md:px-6 bg-gradient-to-b from-white to-slate-400">
            {error && getErrorView()}
            <div className="mx-1 mt-24 md:px-6">
                <section className="w-full h-full mb-10">
                        <div className="items-center ">
                            <div className="mb-12 lg:mb-0">
                                <div className=" relative z-[1] block rounded-lg px-1 lg:px-6 py-12  xl:px-12 lg:-mr-14">
                                    <h2 className=" break-words mb-8 text-3xl font-bold text-blue-900 ">  {firstObj.title}</h2>
                                    <hr className="w-2/4 mb-10   border-blue-900	"/>
                                    <div className="mt-30">
                                        <img
                                            src={firstObj.img}
                                            className="w-40  rounded-lg shadow-lg  shadow-black/20 ml-6 mb-4 float-right"
                                            alt="image"
                                        />
                                        <div
                                            className="mb-0  overflow-clip text-black break-words"
                                            dangerouslySetInnerHTML={{__html: DOMPurify.sanitize(firstObj.description)}}
                                        />
                                        <div className="clear-both"></div>
                                    </div>
                                </div>
                            </div>
                    </div>
                </section>
            </div>
            <div className="mx-1  md:px-6">
                <section className="pb-20">
                        <div className="items-center">
                            <div className="mb-12 lg:mb-0">
                                <div className="relative z-[1] block rounded-lg px-1 lg:px-6 py-12  xl:px-12 lg:-mr-14">
                                    <h2 className="break-words absolute  right-12 top-0 text-3xl font-bold text-blue-900">
                                        {secondObj.title}
                                    </h2>
                                    <hr className="absolute w-2/4 top-16  right-12  border-blue-900"/>
                                    <div className="mt-14">
                                        <img
                                            src={secondObj.img}
                                            className="w-40  rounded-lg shadow-lg  shadow-black/20 mr-6 mb-4  float-left"
                                            alt="image"
                                        />
                                        <div
                                            className="mb-0  overflow-clip text-black break-words"
                                            dangerouslySetInnerHTML={{__html: DOMPurify.sanitize(secondObj.description)}}
                                        />
                                        <div className="clear-both"></div>

                                    </div>
                                </div>
                            </div>
                    </div>
                </section>
            </div>

        </div>
    );
};

export default MissionAndHistoryPage;
