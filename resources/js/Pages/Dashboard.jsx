import React from "react";
import NavbarForm from "../Components/NavbarForm";

function DashboardUser(){
    return(
        <div>
            <div className="flex flex-col h-screen">
                <div className="bg-abu-1 h-20 w-screen shadow-inner">
                    <div className="flex bg-biru-3 h-full w-32">
                        <div className="flex ml-32">
                            <button className="bg-white p-3 px-6 mt-4 mx-2 rounded-t-lg">
                                <p className="text-black">
                                    Validasi
                                </p>
                            </button>

                            <button className="bg-abu-2 p-3 px-6 mt-4 mr-2 rounded-t-lg hover:bg-white">
                                <p className="text-black">
                                    Review
                                </p>
                            </button>

                            <button className="bg-abu-2 p-3 px-6 mt-4 mr-2 rounded-t-lg hover:bg-white">
                                <p className="text-black">
                                    Pending
                                </p>
                            </button>

                            <button className="bg-abu-2 p-3 px-6 mt-4 rounded-t-lg hover:bg-white">
                                <p className="text-black">
                                    Selesai
                                </p>
                            </button>
                        </div>
                    </div>
                </div>

                <div className="bg-white h-full w-screen">
                    <div className="flex flex-col bg-biru-3 h-full w-32">
                        <p className="text-white text-center mt-4">
                            Status
                        </p>

                        <button className="bg-biru-2 rounded-r-lg mr-3 p-4 mt-2 hover:bg-biru-4">
                            <p className="text-white text-sm">Administratif</p>
                        </button>

                        <button className="bg-biru-2 rounded-r-lg mr-2 p-4 mt-2 hover:bg-biru-4">
                            <p className="text-white text-sm">Teknis</p>
                        </button>

                        <button className="bg-biru-2 rounded-r-lg mr-2 p-4 mt-2 hover:bg-biru-4">
                            <p className="text-white text-sm">Pelanggaran</p>
                        </button>

                        <p className="text-white text-center mt-8">
                            User
                        </p>

                        <button className="bg-biru-2 rounded-r-lg mr-2 p-4 mt-2 hover:bg-biru-4">
                            <p className="text-white text-sm">Role</p>
                        </button>
                    </div>
                </div>
            </div>
        </div>
    )
};

export default DashboardUser;