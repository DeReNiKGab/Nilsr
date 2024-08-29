import React, { useEffect, useState } from 'react';
import axios from "axios";
import DOMPurify from 'dompurify';
const Loader = React.lazy(() => import("../../../../components/Loader/Loader"));

const MissionAndHistoryPage = () => {

    const [getObjStructure, ObjStructure] = useState([]);
    const [isLoading, setIsLoading] = useState(true);
    const [error, setError] = useState(null);

    const url = window.location.origin === "http://localhost:5173"
        ? "http://127.0.0.1:8000"
        : window.location.origin;

    useEffect(() => {
        window.scrollTo({ top: 0, left: 0, behavior: 'smooth' });
        axiosRequest();
    }, []);

    function axiosRequest() {
        const getData = async () => {
            await axios.get(url + "/api/Structure/")
                .then((resStructure) => {
                    const StructureData = resStructure.data;
                    ObjStructure(StructureData);
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

    if (isLoading) return <Loader />;

    return (
        <div className="mt-20 md:px-6 bg-gradient-to-b from-white to-slate-400 ">
            <section className="pb-20 ">
                {error && getErrorView()}
                <div className="items-center">
                    <div className="mb-12 lg:mb-0">
                        <div className="relative z-[1] block rounded-lg px-1 lg:px-6 py-12  xl:px-12 lg:mr-14">
                            <h2 className=" break-words absolute  right-12 top-0 text-3xl font-bold text-blue-900">
                                {getObjStructure.title}
                            </h2>
                            <hr className="absolute w-2/4 top-16  right-12  border-blue-900" />
                            <div className="mt-14">
                                <img
                                    src={getObjStructure.img}
                                    className="w-auto xl:w-[40%] rounded-lg shadow-lg shadow-black/20 mt-0 mb-[0.5em] mr-[1em] ml-0 float-left"
                                    alt="image"
                                />
                                <div
                                    className="overflow-clip text-black break-words"
                                    dangerouslySetInnerHTML={{ __html: DOMPurify.sanitize(getObjStructure.description) }}
                                />
                                <div className="clear-both"></div>
                            </div>

                        </div>
                    </div>
                </div>

            </section>
        </div>
    )
};

export default MissionAndHistoryPage;
