import React, { useState } from "react";
import Validasi from './AdministratifValidasi';
import Progres from './AdministratifProgres';

function AdministratifValidator(){
    const [currentTab, setCurrentTab] = useState('validasi');

    function handleChage(e){
        setCurrentTab(e);
    }

    return(
        <div className="flex flex-col h-full w-full">
            <div className="bg-abu-1 h-10 w-full shadow-inner">
                <div className="flex bg-abu-1 h-full w-32">
                    <div className="flex mt-2">
                        <button 
                            className={"bg-gray-400 p-3 px-6 ml-2 mr-2 hover:bg-gray-700" +
                            (currentTab == 'validasi' ? ' bg-gray-700': '')}
                            onClick={()=>handleChage('validasi')}
                        >
                            <p className="text-abu-1 text-sm">
                                Validasi
                            </p>
                        </button>
                        <button 
                            className={"bg-gray-400 p-3 px-6 ml-2 mr-2 hover:bg-gray-700" +
                            (currentTab == 'progres' ? ' bg-gray-700': '')}
                            onClick={()=>handleChage('progres')}
                        >
                            <p className="text-abu-1 text-sm">
                                Progres
                            </p>
                        </button>
                    </div>
                </div>
            </div>
            { 
                currentTab == 'validasi'? <Validasi/> : 
                currentTab == 'progres'? <Progres/> :
                <Progres/>
            }
        </div>
    );
}

export default AdministratifValidator;