import React, { useState } from "react";
import axios from "axios";
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

const ContactUs = () => {
    const [formData, setFormData] = useState({
        name: '',
        phone: '',
        email: '',
        message: ''
    });

    const url = window.location.origin === "http://localhost:5173"
        ? "http://127.0.0.1:8000"
        : window.location.origin;

    const handleChange = (e) => {
        setFormData({
            ...formData,
            [e.target.name]: e.target.value
        });
    };

    const handleSubmit = async (e) => {
        e.preventDefault();

        toast.promise(
            axios.post(url + "/api/send-email", formData),
            {
                pending: 'Նամակը ուղարկվում է...',
                success: 'Նամակը հաջողությամբ ուղարկվեց!',
                error: 'Չհաջողվեց ուղարկել նամակը'
            }
        ).then(() => {
            setFormData({
                name: '',
                phone: '',
                email: '',
                message: ''
            });
        });
    };

    return (
        <div className="bg-gradient-to-b from-white to-slate-400 w-full bg-gray-800 py-12">
            <div className="max-w-5xl mx-auto px-6 sm:px-6 lg:px-8">
                <ToastContainer
                    position="top-center"
                    autoClose={5000}
                    hideProgressBar={false}
                    newestOnTop={false}
                    closeOnClick
                    rtl={false}
                    pauseOnFocusLoss
                    draggable
                    pauseOnHover
                    theme="light"
                />
                <div className="w-full rounded p-8 sm:p-12">
                    <p className="text-3xl font-bold leading-7 text-center text-blue-900">Կապվեք մեզ հետ</p>
                    <form onSubmit={handleSubmit}>
                        <div className="md:flex items-center mt-12">
                            <div className="w-full md:w-1/2 flex flex-col">
                                <label className="font-semibold leading-none text-blue-900">Անուն</label>
                                <input
                                    type="text"
                                    name="name"
                                    value={formData.name}
                                    onChange={handleChange}
                                    required
                                    className="border-2 border-blue-900 leading-none text-black p-3 focus:outline-none focus:border-blue-700 mt-4 bg-gradient-to-b from-slate-300 to-slate-400 rounded"
                                />
                            </div>
                            <div className="w-full md:w-1/2 flex flex-col md:ml-6 md:mt-0 mt-4">
                                <label className="font-semibold leading-none text-blue-900">Հեռախոսահամար </label>
                                <input
                                    type="tel"
                                    name="phone"
                                    value={formData.phone}
                                    onChange={handleChange}
                                    required
                                    className="border-2 border-blue-900 leading-none text-black p-3 focus:outline-none focus:border-blue-700 mt-4 bg-gradient-to-b from-slate-300 to-slate-400 rounded"
                                />
                            </div>
                        </div>
                        <div className="md:flex items-center mt-8">
                            <div className="w-full flex flex-col">
                                <label className="font-semibold leading-none text-blue-900">էլ․ հասցե</label>
                                <input
                                    type="email"
                                    name="email"
                                    value={formData.email}
                                    onChange={handleChange}
                                    autoComplete="off"
                                    required
                                    className="border-2 border-blue-900 leading-none text-black p-3 focus:outline-none focus:border-blue-700 mt-4 bg-gradient-to-b from-slate-300 to-slate-400 rounded"
                                />
                            </div>
                        </div>
                        <div>
                            <div className="w-full flex flex-col mt-8">
                                <label className="font-semibold leading-none text-blue-900">Հաղորդագրություն</label>
                                <textarea
                                    name="message"
                                    value={formData.message}
                                    onChange={handleChange}
                                    required
                                    className="border-2 border-blue-900 h-40 text-base leading-none text-black p-3 focus:outline-none focus:border-blue-700 mt-4 bg-gradient-to-b from-slate-300 to-slate-500 rounded"
                                ></textarea>
                            </div>
                        </div>
                        <div className="flex items-center justify-center w-full">
                            <button
                                type="submit"
                                className="mt-9 font-semibold leading-none text-white py-4 px-10 bg-blue-700 rounded hover:bg-blue-600 focus:ring-2 focus:ring-offset-2 focus:ring-blue-700 focus:outline-none"
                            >
                                Ուղարկել Հաղորդագրությունը
                            </button>
                        </div>
                    </form>
                </div>
            </div>
        </div>
    );
};

export default ContactUs;
