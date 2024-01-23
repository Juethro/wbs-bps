import React from "react";

function FormDefault(){
    return(
        <div>
            <div className="">
                <label className="block text-gray-700 text-md font-bold mb-2" htmlFor="description">
                    Deskripsi Masalah
                </label>
                <textarea className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 mb-3 leading-tight focus:outline-none focus:shadow-outline" id="description" placeholder="Berikan deskripsi masalah sedetail dan sejelas mungkin" />
            </div>

            <div className="mb-4">
                <label htmlFor="lampiran" className="block text-gray-700 text-md font-bold mb-2">
                    Lampiran
                </label>
                    <p className="text-gray-600 text-xs mb-2">Lampirkan bukti foto dan video anda</p>
                <div 
                    className="w-full h-32 bg-white text-gray-700 border-2 border-dashed border-gray-300 rounded-lg flex justify-center items-center relative cursor-pointer"
                >
                    <input 
                    type="file"
                    id="lampiran"
                    className="absolute inset-0 w-full h-full opacity-0"
                    accept=".jpg,.jpeg,.png"
                    onChange={(event) => console.log(event.target.files)}
                    />
                    <div className="pointer-events-none flex justify-center items-center">
                        <span className="text-gray-700">/ tambah atau tarik file disini</span>
                    </div>
                </div>

                <div className="text-red-500 text-xs italic flex items-center mt-2">
                    <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth="1.5" stroke="currentColor" className="w-4 h-4 mr-1">
                        <path strokeLinecap="round" strokeLinejoin="round" d="M12 9v3.75m-9.303 3.376c-.866 1.5.217 3.374 1.948 3.374h14.71c1.73 0 2.813-1.874 1.948-3.374L13.949 3.378c-.866-1.5-3.032-1.5-3.898 0L2.697 16.126ZM12 15.75h.007v.008H12v-.008Z" />
                    </svg>

                    <span className="text-black">
                            Format foto 
                        <span className="font-bold"> .jpg</span>, 
                        <span className="font-bold"> .jpeg</span>, 
                            dan 
                        <span className="font-bold"> .png </span> 
                            ukuran maks. 
                        <span className="font-bold"> 5MB</span>
                    </span>
                </div>
            
                <div className="flex justify-center mt-7">
                    <button className="bg-biru-1 hover:bg-blue-700 text-white font-bold py-2 px-24 rounded focus:outline-none focus:shadow-outline" type="button">
                        Buat Pengaduan
                    </button>
                </div>
            </div>
        </div>
    )
};

export default FormDefault;