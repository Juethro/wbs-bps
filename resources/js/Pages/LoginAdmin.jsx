import React, { Component, useState } from "react";
import NavbarForm from "../Components/NavbarForm";
import { router } from '@inertiajs/react';

function LoginAdmin(){
    const [formData, setFormData] = useState({
        email: '',
        password: '',
        rememberMe: false,
    });

    const [responseMessage, setResponseMessage] = useState(null);
    
    const handleChange = (e) => {
        const { id, value, type, checked } = e.target;
        setFormData((prevData) => ({
          ...prevData,
          [id]: type === 'checkbox' ? checked : value,
        }));
    };

    const handleSubmit = (e) =>{
        e.preventDefault();
        const response = router.post('/login', formData);
        console.log(response);
        // setResponseMessage(response.msg);
    }

    const renderResponsePopup = () => {
        if (!responseMessage) return null;
    
        // You can customize this part based on your UI library or preference
        return (
          <div className="bg-white p-4 border border-green-400 rounded-md shadow-md">
            <p className="text-green-500">{responseMessage}</p>
          </div>
        );
    };

    return(
        <div className="bg-contain bg-fixed bg-center" style={{ backgroundImage: "url('images/bpssby.jpg')", backgroundSize: "cover" }}>
            <div className="bg-blue-500 bg-opacity-45 min-h-screen flex items-center justify-center">
                <div>
                    <NavbarForm/>
                </div>
                <div className="flex justify-center container mx-auto p-4">
                    <div className="flex flex-col mt-40">
                        <div className="flex flex-row bg-biru-2 rounded-t-lg shadow-lg w-[100%]">
                            <h1 className="text-md p-4 font-bold text-center text-white">Login</h1>
                        </div>
                        <div className="bg-white p-16 rounded-b-lg shadow-lg w-[100%]">
                            <form >  
                                <div className="mb-4">
                                    <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="email">
                                        Email
                                    </label>
                                    <input className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline" id="email" type="email" placeholder="Username" value={formData.username} onChange={handleChange}/>
                                </div>
                                <div className="mb-6">
                                    <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="password">
                                        Password
                                    </label>
                                    <input className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 mb-3 leading-tight focus:outline-none focus:shadow-outline" id="password" type="password" placeholder="******************" value={formData.password} onChange={handleChange}/>
                                </div>
                                <div className="mb-4 flex items-center">
                                    <input id="rememberMe" type="checkbox" className="h-4 w-4 text-blue-500 focus:ring-blue-400 border-gray-300 rounded" value={formData.rememberMe} onChange={handleChange}/>
                                    <label htmlFor="rememberMe" className="ml-2 block text-sm text-gray-900">
                                        Remember me
                                    </label>
                                </div>
                                <div className="flex items-center justify-between">
                                    <button className="bg-biru-1 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline" onClick={handleSubmit} >
                                        Login
                                    </button>
                                </div>
                            </form>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    )
};

export default LoginAdmin;