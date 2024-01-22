import React from "react";

function LoginAdmin(){
    return(
        <div className="bg-contain bg-fixed bg-center" style={{ backgroundImage: "url('images/bpssby.jpg')", backgroundSize: "cover" }}>
        <div className="bg-blue-500 bg-opacity-45 min-h-screen flex items-center justify-center">
            <div className="flex justify-center container mx-auto p-4">
            <div className="flex flex-col mt-40">
                <div className="flex flex-row bg-biru-2 rounded-t-lg shadow-lg w-[100%]">
                    <h1 className="text-md p-4 font-bold text-center text-white">Login</h1>
                </div>
                <div className="bg-white p-16 rounded-b-lg shadow-lg w-[100%]">
                    <form>  
                        <div className="mb-4">
                            <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="username">
                                Username
                            </label>
                            <input className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline" id="username" type="text" placeholder="Username"/>
                        </div>
                        <div className="mb-6">
                            <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="password">
                                Password
                            </label>
                            <input className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 mb-3 leading-tight focus:outline-none focus:shadow-outline" id="password" type="password" placeholder="******************"/>
                        </div>
                        <div class="mb-4 flex items-center">
                            <input id="remember_me" type="checkbox" class="h-4 w-4 text-blue-500 focus:ring-blue-400 border-gray-300 rounded"/>
                            <label for="remember_me" class="ml-2 block text-sm text-gray-900">
                                Remember me
                            </label>
                        </div>
                        <div className="flex items-center justify-between">
                            <button className="bg-biru-1 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline" type="submit">
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