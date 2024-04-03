import React, {useState} from "react";
import TeknisProgres from './AdminTeknis/TeknisProgres';
import TeknisSelesai from './AdminTeknis/TeknisSelesai';
import TeknisBaru from './AdminTeknis/TeknisBaru';

function AdminTeknis(){
    const [currentTab, setCurrentTab] = useState('baru');

    function handleChage(e){
        setCurrentTab(e);
    }

    return(
        <div className="flex flex-col h-full w-full">
            <div className="bg-abu-1 h-10 w-full shadow-inner">
                <div className="flex bg-abu-1 h-full w-32">
                    <div className="flex mt-2">
                        <button 
                            className={"bg-gray-400 p-3 px-6 mx-2 hover:bg-gray-700" +
                            (currentTab == 'baru' ? ' bg-gray-700': '')}
                            onClick={()=>handleChage('baru')}
                        >
                            <p className="text-abu-1 text-sm">
                                Baru
                            </p>
                        </button>
                        <button 
                            className={"bg-gray-400 p-3 px-6 mr-2 hover:bg-gray-700" +
                            (currentTab == 'progres' ? ' bg-gray-700': '')}
                            onClick={()=>handleChage('progres')}
                        >
                            <p className="text-abu-1 text-sm">
                                Progres
                            </p>
                        </button>

                        <button 
                            className={"bg-gray-400 p-3 px-6 mr-2 hover:bg-gray-700" +
                            (currentTab == 'selesai' ? ' bg-gray-700': '')}
                            onClick={()=>handleChage('selesai')}
                        >
                            <p className="text-abu-1 text-sm">
                                Selesai
                            </p>
                        </button>
                    </div>
                </div>
            </div>

            { 
                currentTab == 'baru'? <TeknisBaru/> : 
                currentTab == 'progres'? <TeknisProgres/> :
                <TeknisSelesai/>
            }


        </div>
    );
}

export default AdminTeknis;