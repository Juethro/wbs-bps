import React, {useState} from "react";
import AdminAdministratif from "../Components/AdminAdministratif";
import AdminTeknis from "../Components/AdminTeknis";
import AdminRole from "../Components/AdminRole";
import AdminEmail from "../Components/AdminEmail";


const DashboardUser = () => {
    const [menu, setMenu] = useState('Administratif');
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
                            (menu === 'Administratif'? ' bg-biru-6' : '')}
                            onClick={() => handleChage('Administratif')}
                        >
                            <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth="1.5" stroke="white" className="w-6 h-6 mr-2">
                                <path strokeLinecap="round" strokeLinejoin="round" d="M2.25 21h19.5m-18-18v18m10.5-18v18m6-13.5V21M6.75 6.75h.75m-.75 3h.75m-.75 3h.75m3-6h.75m-.75 3h.75m-.75 3h.75M6.75 21v-3.375c0-.621.504-1.125 1.125-1.125h2.25c.621 0 1.125.504 1.125 1.125V21M3 3h12m-.75 4.5H21m-3.75 3.75h.008v.008h-.008v-.008Zm0 3h.008v.008h-.008v-.008Zm0 3h.008v.008h-.008v-.008Z" />
                            </svg>
                            <p className="text-xs">Administratif</p>
                        </button>

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

                        <button 
                            className={"bg-biru-5 rounded-lg mr-2 py-3 px-2 mt-2 ml-2 flex w-full items-center hover:bg-biru-6" +
                            (menu === 'Role'? ' bg-biru-6' : '')}
                            onClick={() => handleChage('Role')}
                        >
                            <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth="1.5" stroke="white" className="w-6 h-6 mr-2">
                                <path strokeLinecap="round" strokeLinejoin="round" d="M15 19.128a9.38 9.38 0 0 0 2.625.372 9.337 9.337 0 0 0 4.121-.952 4.125 4.125 0 0 0-7.533-2.493M15 19.128v-.003c0-1.113-.285-2.16-.786-3.07M15 19.128v.106A12.318 12.318 0 0 1 8.624 21c-2.331 0-4.512-.645-6.374-1.766l-.001-.109a6.375 6.375 0 0 1 11.964-3.07M12 6.375a3.375 3.375 0 1 1-6.75 0 3.375 3.375 0 0 1 6.75 0Zm8.25 2.25a2.625 2.625 0 1 1-5.25 0 2.625 2.625 0 0 1 5.25 0Z" />
                            </svg>
                            <p className="text-white text-xs">Role</p>
                        </button>

                        <button 
                            className={"bg-biru-5 rounded-lg mr-2 py-3 px-2 mt-2 ml-2 flex w-full items-center hover:bg-biru-6" +
                            (menu === 'Email'? ' bg-biru-6' : '')}
                            onClick={() => handleChage('Email')}
                        >
                            <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth="1.5" stroke="white" className="w-6 h-6 mr-2">
                                <path strokeLinecap="round" strokeLinejoin="round" d="M21.75 6.75v10.5a2.25 2.25 0 0 1-2.25 2.25h-15a2.25 2.25 0 0 1-2.25-2.25V6.75m19.5 0A2.25 2.25 0 0 0 19.5 4.5h-15a2.25 2.25 0 0 0-2.25 2.25m19.5 0v.243a2.25 2.25 0 0 1-1.07 1.916l-7.5 4.615a2.25 2.25 0 0 1-2.36 0L3.32 8.91a2.25 2.25 0 0 1-1.07-1.916V6.75" />
                            </svg>
                            <p className="text-white text-xs">Email</p>
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
                    menu == 'Administratif'? <AdminAdministratif/> : 
                    menu == 'Teknis'? <AdminTeknis/> :
                    menu == 'Role' ? <AdminRole/> :
                    <AdminEmail/>
                }
                
            </div>
        </div>
    )
};

export default DashboardUser;