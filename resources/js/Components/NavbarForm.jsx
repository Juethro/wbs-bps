import React from "react";

function NavbarForm(){
    return(
        <div className="flex flex-col">
            <div className="flex bg-biru-2 fixed w-full top-0 z-10">
                <img className="p-2 h-14" src="images/logobps.png" alt="Logo BPS" srcSet="" />
            </div>

            <div className="bg-kuning-1 h-2 fixed w-full top-14 z-10" />
            
            <div className="bg-hijau-1 h-2 fixed w-full top-16 z-10" />

            <div className="flex-grow">
            </div>
        </div>
    )
};

export default NavbarForm;