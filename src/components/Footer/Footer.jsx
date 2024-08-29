import React from 'react';
import {Mail, MapPin, Phone, Facebook } from "lucide-react";

const Footer = () => {
    return (
        <footer className="   bg-gray-100">
            <div className="container h-32 top-0 max-w-full grid grid-cols-1 md:grid-cols-2 gap-8 bg-gradient-to-b from-gray-400 to-gray-100" ></div>
            <div className=" max-w-7xl mx-auto ">

                <section className="mx-12 w-auto h-auto bg-gray-100">
                    <div className="container mx-auto grid grid-cols-1 md:grid-cols-2 gap-8 mb-10">
                        <div>
                            <h2 className="text-2xl  mb-4 text-blue-900 font-bold">Կոնտակտային տվյալներ</h2>
                            <ul className="space-y-4">
                                <li className="flex items-center text-lg font-medium text-black">
                                    <MapPin className="mr-2"/>
                                    Հասցե՝ Երևան Կարապետ Ուլնեցու փող., 68 շենք
                                </li>
                                <li className="flex items-center text-lg font-medium text-black">
                                    <Mail className="mr-2"/>
                                    Էլ. փոստ․ info@nilsr.am
                                </li>
                                <li className="flex items-center text-lg font-medium text-black">
                                    <Phone className="mr-2"/>
                                    Հեռախոսահամար․ (010) 20 83 44
                                </li>
                                <li className="flex items-center text-lg font-medium text-blue-950">
                                    <Facebook className="mr-2"/>
                                    <a href="https://www.facebook.com/NationalInstituteofLabourandSocialResearch/" target="_blank" className="underline"> Ֆեյսբուքյան էջ</a>
                                </li>
                            </ul>
                        </div>
                        <div className="rounded-lg overflow-hidden">
                            <iframe className=" w-full h-full pb-10 overflow-hidden"
                                    src="https://www.google.com/maps/embed?pb=!1m14!1m8!1m3!1d97529.37015091018!2d44.539196!3d40.191424!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x406aa2d30b904659%3A0x75ad4a7583ca0674!2s68%20Karapet%20Ulnetsi%20St%2C%20Yerevan%2C%20Armenia!5e0!3m2!1sen!2sus!4v1724064392408!5m2!1sen!2sus"
                                    loading="lazy">.
                            </iframe>

                        </div>
                    </div>
                </section>
            </div>
            <div className=" p-3 text-center   bg-blue-900  flex justify-center items-center">
                <span className="mr-2  text-black">© 2023 Copyright: </span>
                <p className="copyright text-white"> National Institute of
                    Labour and Social Research. All rights reserved.</p>
            </div>
        </footer>
    );
};

export default Footer;
