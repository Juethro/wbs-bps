import React, {useState} from "react";
import DewanReviewer from "../Components/Dewan/DewanReviewer";

const DashboardDewan = () => {
    const [menu, setMenu] = useState('Administratif');
    const handleChage = (e)=>{
        setMenu(e)
    }


    return(
        <div className="font-medium flex flex-col h-screen">
            <div className="flex bg-white h-full w-screen">
                <div className="flex flex-col bg-biru-5 h-full w-52 justify-between">

                    <button 
                        className={"bg-biru-5 rounded-lg mr-2 py-3 px-2 mt-2 ml-2 flex items-center hover:bg-biru-6 text-white" +
                        (menu === 'Administratif'? ' bg-biru-6' : '')}
                        onClick={() => handleChage('Administratif')}
                    >
                        <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth="1.5" stroke="white" className="w-6 h-6 mr-2">
                            <path strokeLinecap="round" strokeLinejoin="round" d="M2.25 21h19.5m-18-18v18m10.5-18v18m6-13.5V21M6.75 6.75h.75m-.75 3h.75m-.75 3h.75m3-6h.75m-.75 3h.75m-.75 3h.75M6.75 21v-3.375c0-.621.504-1.125 1.125-1.125h2.25c.621 0 1.125.504 1.125 1.125V21M3 3h12m-.75 4.5H21m-3.75 3.75h.008v.008h-.008v-.008Zm0 3h.008v.008h-.008v-.008Zm0 3h.008v.008h-.008v-.008Z" />
                        </svg>
                        <p className="text-xs">Administratif</p>
                    </button>

                    <a 
                        href="/logout"
                        className="bg-biru-5 rounded-lg mr-2 py-3 px-2 mt-2 ml-2 flex items-center hover:bg-biru-6 text-white mb-4"
                    >
                        <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-6 h-6">
                            <path strokeLinecap="round" strokeLinejoin="round" d="M15.75 9V5.25A2.25 2.25 0 0 0 13.5 3h-6a2.25 2.25 0 0 0-2.25 2.25v13.5A2.25 2.25 0 0 0 7.5 21h6a2.25 2.25 0 0 0 2.25-2.25V15m3 0 3-3m0 0-3-3m3 3H9" />
                        </svg>
                        Logout
                    </a>
                </div>
                
                { 
                    menu == 'Administratif'? <DewanReviewer/> : ''
                }
                
            </div>
        </div>
    )
};

export default DashboardDewan;