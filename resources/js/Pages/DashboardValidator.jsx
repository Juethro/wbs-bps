import React, {useState} from "react";
import AdministratifValidator from "../Components/Validator/AdministratifValidator";
import AdminRole from "../Components/AdminRole";
import AdminEmail from "../Components/AdminEmail";
import TeknisValidator from "../Components/Validator/TeknisValidator";


const DashboardValidator = () => {
    const [menu, setMenu] = useState('Administratif');
    const handleChage = (e)=>{
        
        setMenu(e)
    }


    return(
        <div className="font-medium flex flex-col h-screen">
            <div className="flex bg-white h-full w-screen">
                <div className="flex flex-col bg-biru-5 h-full w-52">
                    <p className="text-white text-center mt-8">
                        
                    </p>

                    <button 
                        className={"bg-biru-5 rounded-lg mr-2 py-3 px-2 mt-2 ml-2 flex items-center hover:bg-biru-6 text-white" +
                        (menu === 'Administratif'? ' bg-biru-6' : '')}
                        onClick={() => handleChage('Administratif')}
                    >
                        <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="white" class="w-6 h-6 mr-2">
                            <path stroke-linecap="round" stroke-linejoin="round" d="M2.25 21h19.5m-18-18v18m10.5-18v18m6-13.5V21M6.75 6.75h.75m-.75 3h.75m-.75 3h.75m3-6h.75m-.75 3h.75m-.75 3h.75M6.75 21v-3.375c0-.621.504-1.125 1.125-1.125h2.25c.621 0 1.125.504 1.125 1.125V21M3 3h12m-.75 4.5H21m-3.75 3.75h.008v.008h-.008v-.008Zm0 3h.008v.008h-.008v-.008Zm0 3h.008v.008h-.008v-.008Z" />
                        </svg>
                        <p className="text-xs">Administratif</p>
                    </button>

                    <button
                        className={"bg-biru-5 rounded-lg mr-2 py-3 px-2 mt-2 ml-2 flex items-center hover:bg-biru-6 text-white" + 
                        (menu === 'Teknis' ? ' bg-biru-6' : '')}
                        onClick={() => handleChage('Teknis')}
                    >
                        <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="white" class="w-6 h-6 mr-2">
                            <path stroke-linecap="round" stroke-linejoin="round" d="M3.75 21h16.5M4.5 3h15M5.25 3v18m13.5-18v18M9 6.75h1.5m-1.5 3h1.5m-1.5 3h1.5m3-6H15m-1.5 3H15m-1.5 3H15M9 21v-3.375c0-.621.504-1.125 1.125-1.125h3.75c.621 0 1.125.504 1.125 1.125V21" />
                        </svg>
                        <p className="text-xs">Teknis</p>
                    </button>
                </div>
                
                { 
                    menu == 'Administratif'? <AdministratifValidator/> : 
                    menu == 'Teknis'? <TeknisValidator/> :
                    menu == 'Role' ? <AdminRole/> :
                    <AdminEmail/>
                }
                
            </div>
        </div>
    )
};

export default DashboardValidator;