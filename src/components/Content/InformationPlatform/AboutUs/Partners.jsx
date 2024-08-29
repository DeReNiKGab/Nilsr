import React, {useEffect, useState} from 'react';
import axios from "axios";
const Loader = React.lazy(() => import("../../../../components/Loader/Loader"));



const Partners = () => {
    const [getObjStructureAndPartners, setGetObjStructureAndPartners] = useState([]);
    const [isLoading, setIsLoading] = useState(false);
    const [error, setError] = useState(null);

     

    const url = window.location.origin === "http://localhost:5173"
        ? "http://127.0.0.1:8000" 
        : window.location.origin;
    
    console.log(getObjStructureAndPartners);


    useEffect(() => {
        window.scrollTo({top: 0, left: 0, behavior: 'smooth'});
        axiosRequest();
    }, []);

    function axiosRequest() {
        const getData = async () => {
            await axios.get(url + "/api/Partners")
                .then((resStructureAndPartners) => {
                    const StructureAndPartnersData = resStructureAndPartners.data;
                    setGetObjStructureAndPartners(StructureAndPartnersData);
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
        <div className="container my-24 mx-auto md:px-6">
            {error && getErrorView()}
            <section className="mb-32 text-center">
                <div className="flex justify-center">
                    <div className="max-w-[700px] text-center">
                        <h2 className="mb-6 text-center text-3xl font-bold text-blue-900">
                            Գործընկերներ
                        </h2>
                        <hr className=" mb-10 w-96  border-blue-900	"/>
                    </div>
                </div>

                <div className="grid items-center gap-6 md:grid-cols-2 lg:grid-cols-4">
                    {getObjStructureAndPartners.map((catNewsItem, index) => (
                        <div key={index} className="mb-12 lg:mb-0">
                            <img src={catNewsItem.img}
                                 className="px-6  brightness-150 md:px-12" alt="logo"/>
                        </div>
                    ))}
                </div>
            </section>
        </div>
    );
};

export default Partners;
