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
                <div className="flex flex-col bg-biru-5 h-full w-32">
                    <p className="text-white text-center mt-4">
                        Status
                    </p>

                    <button 
                        className={"bg-biru-5 rounded-lg mr-2 py-3 px-2 mt-2 ml-2 hover:bg-white text-white hover:text-black"+
                        (menu === 'Administratif'? ' bg-biru-6' : '')}
                        onClick={()=>handleChage('Administratif')}
                    >
                        <p className="text-xs">Administratif</p>
                    </button>

                    <button
                        className={"bg-biru-5 rounded-lg mr-2 py-3 px-2 mt-2 ml-2 hover:bg-white text-white hover:text-black " + (menu === 'Teknis' ? ' bg-gray-500' : '')}
                        onClick={() => handleChage('Teknis')}
                        >
                        <p className="text-xs">Teknis</p>
                    </button>

                    <p className="text-white text-center mt-8">
                        User
                    </p>

                    <button 
                        className={"bg-biru-5 rounded-r-lg mr-2 py-3 px-2 mt-2 hover:bg-biru-6"+
                        (menu === 'Role'? ' bg-biru-6' : '')}
                        onClick={()=>handleChage('Role')}
                    >
                        <p className="text-white text-xs">Role</p>
                    </button>
                    
                    <p className="text-white text-center mt-8">
                        Email
                    </p>

                    <button 
                        className={"bg-biru-5 rounded-r-lg mr-2 py-3 px-2 mt-2 hover:bg-biru-6" +
                        (menu === 'Email'? ' bg-biru-6' : '')}
                        onClick={()=>handleChage('Email')}
                    >
                        <p className="text-white text-xs">Email</p>
                    </button>
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