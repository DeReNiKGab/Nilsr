import React from 'react';
import img  from "../../../assets/images/featue-bg.jpg";

const News = React.lazy(() => import("./News/News"));
const Announcements = React.lazy(() => import("./Announcements/Announcements"));

const HomePage = () => {


    return (
        <div className="relative overflow-hidden">
            {/* Background Image */}
            <div className="fixed inset-0 -z-10">
                <img
                    src={img}
                    alt="Background"
                    className="w-full h-full object-cover"
                />
            </div>

            {/* First Section */}
            <section className="relative py-80 bg-transparent">
                <div className="relative container mx-auto">
                    <div className="flex justify-center items-center">
                        <div className="text-center">
                            <h1 className=" break-words text-white text-4xl md:text-5xl font-light uppercase tracking-custom leading-60 pb-4">
                                NATIONAL INSTITUTE OF LABOUR AND SOCIAL RESEARCH
                            </h1>
                        </div>
                    </div>
                </div>
            </section>
            <section className="relative bg-white text-center py-12 z-10">
                <div className="container max-w-fit">
                    <News />
                </div>
            </section>
            <section className="relative py-32 bg-transparent">
                <div className="w-full max-w-[1500px] 2xl:mx-auto ">
                    <Announcements />
                </div>
            </section>
        </div>
    );
};

export default HomePage;
