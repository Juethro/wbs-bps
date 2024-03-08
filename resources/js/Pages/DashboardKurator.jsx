import React, {useState} from "react";
import KuratorReviewer from "../Components/Kurator/KuratorReviewer";

const DashboardKurator = () => {
    const [menu, setMenu] = useState('Teknis');
    const handleChage = (e)=>{
        setMenu(e)
    }


    return(
        <div className="font-medium flex flex-col h-screen">
            <div className="flex bg-white h-full w-screen">
                <div className="flex flex-col bg-biru-5 h-full w-52 justify-between">
                    <div>
                        <button
                            className={"bg-biru-5 rounded-lg mr-2 py-3 px-2 mt-2 ml-2 flex w-full items-center hover:bg-biru-6 text-white" + 
                            (menu === 'Teknis' ? ' bg-biru-6' : '')}
                            onClick={() => handleChage('Teknis')}
                        >
                            <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth="1.5" stroke="white" className="w-6 h-6 mr-2">
                                <path strokeLinecap="round" strokeLinejoin="round" d="M3.75 21h16.5M4.5 3h15M5.25 3v18m13.5-18v18M9 6.75h1.5m-1.5 3h1.5m-1.5 3h1.5m3-6H15m-1.5 3H15m-1.5 3H15M9 21v-3.375c0-.621.504-1.125 1.125-1.125h3.75c.621 0 1.125.504 1.125 1.125V21" />
                            </svg>
                            <p className="text-xs">Teknis</p>
                        </button>
                    </div>
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
                    menu == 'Teknis'? <KuratorReviewer/> : ''
                }
                
            </div>
        </div>
    )
};

export default DashboardKurator;