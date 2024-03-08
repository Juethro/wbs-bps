import React, { useState } from "react";
import AdministratifReview from "./DewanReview";
import AdministratifSelesai from '../AdminAdministratif/AdministratifSelesai';
import AdministratifValidasi from '../AdminAdministratif/AdministratifValidasi';

// Tim Dewan
function DewanReviewer(){
    const [currentTab, setCurrentTab] = useState('review');

    function handleChage(e){
        setCurrentTab(e);
    }

    return(
        <div className="flex flex-col h-full w-full">
            <div className="bg-abu-1 h-10 w-full shadow-inner">
                <div className="flex bg-abu-1 h-full w-32">
                    <div className="flex mt-2">
                        <button 
                            className={"bg-gray-400 p-3 px-6 mr-2 hover:bg-gray-700" +
                            (currentTab == 'review' ? ' bg-gray-700': '')}
                            onClick={()=>handleChage('review')}
                        >
                            <p className="text-abu-1 text-sm">
                                Review
                            </p>
                        </button>
                    </div>
                </div>
            </div>
            
            { 
                currentTab == 'review'? <AdministratifReview/> : 
                currentTab == 'validasi'? <AdministratifValidasi/> :
                <AdministratifSelesai/>
            }

        </div>
    );
}

export default DewanReviewer;