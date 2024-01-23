import React from "react";
import NavbarForm from "../Components/NavbarForm";

function DashboardUser(){
    return(
        <div>
            <NavbarForm />

            <div className="flex flex-row">
                <div className="bg-biru-3 h-full fixed w-32">
                    <div className="flex flex-col mt-36 justify-center">
                        <button className="bg-biru-4 text-white p-4">
                            Status
                        </button>
                        <button className="bg-biru-4 text-white p-4">
                            User
                        </button>
                    </div>
                </div>
                <div>

                </div>
            </div>
        </div>
    )
};

export default DashboardUser;