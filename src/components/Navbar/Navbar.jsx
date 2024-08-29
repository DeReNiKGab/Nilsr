import React, {useEffect, useRef, useState} from "react";
import logo from "../../assets/images/logo.png";
import { Link } from "react-router-dom";
import axios from "axios";
const Loader = React.lazy(() => import("../Loader/Loader"));
import useWindowSize from "../useWindowSize/WindowSize.jsx";

import {
    Collapse,
    Dropdown,
    initTWE,
} from "tw-elements";


const Navbar = () => {
    const { width } = useWindowSize();
    const [getObjNavbar, ObjNavbarSet] = useState([]);
    const [isLoading, setIsLoading] = useState(false);
    const [isChecked, setIsChecked] = useState(false);
    const teInitialized = useRef(false)
    const [error, setError] = useState(null);

    const widthNum = 1279;


     

    const url = window.location.origin === "http://localhost:5173"
        ? "http://127.0.0.1:8000" 
        : window.location.origin;
    


    useEffect(() => {
        setTimeout(() => {
            if (!teInitialized.current) {
                console.debug(`Tailwind Elements initialized`)
                initTWE({ Dropdown ,Collapse })
            }
            teInitialized.current = true
        }, 1000)
        const axiosRequest = async () => {
            try {
                const response = await axios.get(`${url}/api/menu`);
                const navbardata = response.data[0];
                ObjNavbarSet(navbardata);
            } catch (e) {
                setError(e);
            } finally {
                setIsLoading(false);
            }
        };
        window.scrollTo({ top: 0, left: 0, behavior: "smooth" });
        axiosRequest();
    }, []);




    const getErrorView = () => {
        return (
            <div>
                Տեղի է ունեցել սխալ !  խնդրում ենք թարմացրեք էջը. {error.message}
            </div>
        )
    }



    if (isLoading) return <Loader />;

    const toggleCheckbox = () => {
        setIsChecked(!isChecked);
    };

    return (
        <nav className="relative lex-nowrap items-center  py-2 shadow-dark-mild  bg-white xl:flex-wrap xl:justify-start lg:py-4" data-twe-navbar-ref>
            {error && getErrorView()}
            <div className="flex  flex-wrap  items-center">
                <div className="flex  w-full  2xl:w-auto justify-between items-center">
                    <input id="burger-checkbox" className="hidden peer" type="checkbox" checked={isChecked}
                           onChange={toggleCheckbox}/>
                    <div>
                        <Link
                            className="text-blue-900 mx-2 my-1 flex items-center hover:text-neutral-900 focus:text-neutral-900 lg:mb-0 lg:mt-0"
                            to="/">
                            <img className="mr-2" src={logo} alt="TE Logo" loading="lazy"/>
                            <span className="font-medium  text-sm md:text-[15px] "><b>Աշխատանքի և սոցիալական հետազոտությունների ազգային ինստիտուտ </b></span>
                        </Link>
                    </div>
                    <button
                        className="block border-0 bg-transparent px-2 text-black/50 hover:no-underline hover:shadow-none focus:no-underline focus:shadow-none focus:outline-none focus:ring-0  text-neutral-200 xl:hidden"
                        type="button"
                        onClick={toggleCheckbox}
                        aria-label="Toggle navigation"
                        data-twe-target="#navbarSupportedContent7"
                        aria-controls="navbarSupportedContent7"
                        aria-expanded="false"
                        data-twe-collapse-init
                    >
                        <div className="w-9 h-10 gap-[3px] cursor-pointer flex flex-col items-center justify-center">
                            <div
                                className={`w-[50%] h-[2px] bg-black rounded-sm transition-all duration-300 origin-left ${isChecked ? "rotate-[-45deg] translate-y-[0.50rem]" : ""}`}
                            ></div>
                            <div
                                className={`w-[50%] h-[2px] bg-black rounded-md transition-all duration-300 origin-center ${isChecked ? "hidden" : ""}`}
                            ></div>
                            <div
                                className={`w-[50%] h-[2px] bg-black rounded-md transition-all duration-300 origin-left ${isChecked ? "rotate-[45deg] -translate-y-[0.60rem]" : ""}`}
                            ></div>
                        </div>
                    </button>

                </div>
                <div
                    className="!visible hidden flex-grow basis-[100%] items-center lg:mt-0 xl:!flex xl:basis-auto"
                    id="navbarSupportedContent7" data-twe-collapse-item>
                    <ul className=" list-style-none ml-auto flex flex-col ps-0 xl:mt-1 xl:flex-row [&_p]:text-blue-900"
                        data-twe-navbar-nav-ref>
                        {Object.values(getObjNavbar).map((menu) => (
                            menu.sub.length === 0 ? (
                                <li key={menu.id} className="my-4 ps-2 xl:my-0 xl:pe-1 xl:ps-2" data-twe-nav-item-ref>
                                    {width <= widthNum ?
                                        <Link
                                            className="text-blue-900 font-bold hover:text-black focus:text-black xl:px-2"
                                            aria-current="page" to={menu.url} data-twe-nav-link-ref
                                            onClick={toggleCheckbox}>
                                            <b data-twe-collapse-init data-twe-target="#navbarSupportedContent7"
                                               aria-controls="navbarSupportedContent7"
                                               aria-expanded="false">{menu.title}</b>
                                        </Link> :
                                        <Link
                                            className="text-sm md:text-[15px]  text-blue-900 font-bold hover:text-black focus:text-black xl:px-2"
                                            aria-current="page" to={menu.url} data-twe-nav-link-ref
                                            onClick={toggleCheckbox}>
                                            <b>{menu.title}</b>
                                        </Link>
                                    }
                                </li>
                            ) : (
                                <li key={menu.id} className="my-4 ps-2 xl:my-0 xl:pe-1 xl:ps-2" data-twe-nav-item-ref>
                                    <Link
                                        className="text-sm md:text-[15px] inline-flex align-center text-blue-900 font-bold hover:text-black focus:text-black  items-center transition duration-200 hover:ease-in-out motion-reduce:transition-none"
                                        to="#" type="button" id="dropdownMenuButton2" data-twe-dropdown-toggle-ref
                                        aria-expanded="false">
                                        <b>{menu.title}</b>
                                        <span className="ms-1 [&>svg]:w-5">
                                            <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20"
                                                 fill="currentColor">
                                                <path fillRule="evenodd"
                                                      d="M5.23 7.21a.75.75 0 011.06.02L10 11.168l3.71-3.938a.75.75 0 111.08 1.04l-4.25 4.5a.75.75 0 01-1.08 0l-4.25-4.5a.75.75 0 01.02-1.06z"
                                                      clipRule="evenodd"/>
                                            </svg>
                                        </span>
                                    </Link>
                                    <ul className="bg-white absolute z-[1000] float-left m-0 hidden min-w-max list-none overflow-hidden rounded-lg border-none bg-secondary-100 bg-clip-padding text-left text-base shadow-lg data-[twe-dropdown-show]:block  bg-surface-white"
                                        aria-labelledby="dropdownMenuButton1" data-twe-dropdown-menu-ref>
                                        {menu.sub.map((subitem, j) => (
                                            <li key={j} className="px-4 py-2 ">
                                                {width <= widthNum ?
                                                    <Link
                                                        className="block w-full text-blue-900 font-bold hover:text-black focus:text-black xl:px-2 whitespace-nowrap bg-secondary-100  text-sm focus:outline-none  active:no-underline  bg-surface-white "
                                                        to={subitem.url} data-twe-dropdown-item-ref
                                                        onClick={toggleCheckbox}>
                                                        <b data-twe-collapse-init
                                                           data-twe-target="#navbarSupportedContent7"
                                                           aria-controls="navbarSupportedContent7"
                                                           aria-expanded="false">{subitem.title}</b>
                                                    </Link> :
                                                    <Link
                                                        className="block text-sm md:text-[16px] w-full text-blue-900 font-bold hover:text-black focus:text-black xl:px-2 whitespace-nowrap bg-secondary-100 focus:outline-none  active:no-underline  bg-surface-white  "
                                                        to={subitem.url} data-twe-dropdown-item-ref
                                                        onClick={toggleCheckbox}>
                                                        <b>{subitem.title}</b>
                                                    </Link>
                                                }
                                            </li>
                                        ))}
                                    </ul>
                                </li>
                            )
                        ))}
                    </ul>
                </div>
            </div>
        </nav>
    );
};

export default Navbar;