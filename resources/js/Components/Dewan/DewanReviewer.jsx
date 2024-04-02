import React, { useState } from "react";
import Review from "./DewanReview";
import Selesai from '../Dewan/DewanSelesai';

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
                            className={"bg-gray-400 p-3 px-6 mx-2 hover:bg-gray-700" +
                            (currentTab == 'review' ? ' bg-gray-700': '')}
                            onClick={()=>handleChage('review')}
                        >
                            <p className="text-abu-1 text-sm">
                                Review
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
                currentTab == 'review'? <Review/> : 
                currentTab == 'selesai'? <Selesai/> :
                <Selesai/>
            }

        </div>
    );
}

export default DewanReviewer;