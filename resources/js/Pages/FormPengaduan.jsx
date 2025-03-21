import React, { useState, useEffect } from "react";
import NavbarForm from "../Components/NavbarForm";
import FormAdministratif from "../Components/FormAdministratif";
import FormTeknis from "../Components/FormTeknis";

function FormPengaduan(){
    const [simpleData, setSimpleData] = useState({
        nama: "",
        whatsapp: "",
        email: "",
        masalah: "Administratif",
    });
    
    const handleChange = (e) =>{
        const { name, value } = e.target;
        setSimpleData((prev) => ({
            ...prev,
            [name]: value,
        }));
    }

    return(
        <div className="bg-contain bg-fixed bg-center" style={{ backgroundImage: "url('images/bpssby.jpg')", backgroundSize: "cover" }}>
            <div className="bg-blue-500 bg-contain bg-opacity-45">
            <div className="">
                <div>
                    <NavbarForm/>
                </div>

                <div className="container mx-auto p-4">
                    <div className="flex flex-col mt-40">
                        <div className="flex justify-center text-2xl font-bold text-white">
                            Buat Pengaduan
                        </div>
                        <div className="flex justify-center mt-5 text-sm text-white">
                            Kami disini untuk membantu masalah anda,
                        </div>
                        <div className="flex justify-center text-sm text-white">
                            silahkan mengisi form terlebih dahulu untuk mendapatkan tiket pengaduan.
                        </div>
                    </div>
                    <div className="bg-white shadow-md rounded landscape:lg:mx-40 portrait:mx-0 landscape:px-8 portrait:px-4 pt-1 pb-8 mt-12 mb-4">
                        <div className="border-b border-biru-1 py-1 mt-5">
                            <h1 className="text-sm text-biru-1 inline-block">Identitas Pelapor</h1>
                        </div>
                        <div className="flex flex-col landscape:mx-40 portrait:mx-0">
                            <div className="mt-7 mb-4">
                                <label className="block text-gray-700 text-md font-bold mb-2" htmlFor="nama">
                                    Nama
                                </label>
                                <input className="shadow appearance-none border border-black rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:border-biru-1" id="nama" name="nama" type="text" placeholder="Isi nama anda" value={simpleData.nama} onChange={handleChange}/>
                            </div>

                            <div className="mb-4">
                                <label className="block text-gray-700 text-md font-bold mb-2" htmlFor="whatsapp">
                                    Nomor Telepon (WhatsApp)
                                </label>
                                <input className="shadow appearance-none border border-black rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:border-biru-1" id="whatsapp" name="whatsapp" type="text" placeholder="Isi nomor whatsapp anda" value={simpleData.whatsapp}  onChange={handleChange}/>
                            </div>

                            <div className="mb-4">
                                <label className="block text-gray-700 text-md font-bold mb-2" htmlFor="email">
                                    Email
                                </label>

                                <input className="shadow appearance-none border border-black rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:border-biru-1" id="email" name="email" type="email" placeholder="Isi email anda" value={simpleData.email} onChange={handleChange} />

                                <div className="flex items-center text-red-500 text-xs italic mt-2">
                                    <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth="1.5" stroke="currentColor" className="w-4 h-4 mr-1">
                                        <path strokeLinecap="round" strokeLinejoin="round" d="M12 9v3.75m-9.303 3.376c-.866 1.5.217 3.374 1.948 3.374h14.71c1.73 0 2.813-1.874 1.948-3.374L13.949 3.378c-.866-1.5-3.032-1.5-3.898 0L2.697 16.126ZM12 15.75h.007v.008H12v-.008Z" />
                                    </svg>

                                    <span className="text-black">
                                        Pastikan bahwa 
                                        <span className="font-bold"> nomor handphone</span> dan 
                                        <span className="font-bold"> email</span> yang anda masukkan sudah benar
                                    </span>
                                </div>
                            </div>
                        </div>
                        <div className="border-b border-biru-1 py-1">
                            <h1 className="text-sm text-biru-1 inline-block">Keterangan Masalah</h1>
                        </div>

                        <div className="flex flex-col landscape:mx-40 portrait:mx-0">
                            <div className="mt-7 mb-4">
                                <label className="block text-gray-700 text-md font-bold mb-2" htmlFor="masalah">
                                    Masalah yang dihadapi
                                </label>
                                <div className="relative">
                                    <select className="block appearance-none w-full bg-white border border-black hover:border-gray-500 px-4 py-2 pr-8 rounded shadow leading-tight focus:outline-none focus:border-biru-1 text-sm" 
                                    id="masalah"
                                    name="masalah"
                                    onChange={handleChange}>
                                        <option value="Administratif">Administratif</option>
                                        <option value="Teknis">Teknis</option>
                                    </select>
                                    <div className="pointer-events-none absolute inset-y-0 right-0 flex items-center px-2 text-gray-700">
                                        <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-4 h-4">
                                            <path strokeLinecap="round" strokeLinejoin="round" d="m19.5 8.25-7.5 7.5-7.5-7.5" />
                                        </svg>
                                    </div>
                                </div>
                            </div>
                            {simpleData.masalah === 'Administratif' && <FormAdministratif simpleData={simpleData} />}
                            {simpleData.masalah === 'Teknis' && <FormTeknis simpleData={simpleData} />}
                        </div>
                    </div>
                </div>
            </div>
            </div>
        </div>
    )
};

export default FormPengaduan;