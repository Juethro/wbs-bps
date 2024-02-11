import React, {useState} from "react";
import TeknisReview from './AdminTeknis/TeknisReview';
import TeknisSelesai from './AdminTeknis/TeknisSelesai';
import TeknisValidasi from './AdminTeknis/TeknisValidasi';

function AdminTeknis(){
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
                            className={"bg-gray-400 p-3 px-6 mr-2 hover:bg-gray-700" +
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
                currentTab == 'validasi'? <TeknisValidasi/> : 
                currentTab == 'review'? <TeknisReview/> :
                <TeknisSelesai/>
            }


        </div>
    );
}

export default AdminTeknis;