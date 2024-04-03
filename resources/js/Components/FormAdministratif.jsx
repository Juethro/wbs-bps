import React, { useState } from "react";
import { router, usePage } from '@inertiajs/react';

const FormAdministratif = ({ simpleData }) => {
    const [files, setFiles] = useState([]);
    const [fileError, setFileError] = useState(null);
    const { errors } = usePage().props;

    const [formData, setFormData] = useState({
        namaPelanggar: "",
        tempatKejadian: "",
        tanggalKejadian: "",
        deskripsi: "",
        lampiran: [],
    });

    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormData((prev) => ({
            ...prev,
            [name]: value,
        }));
    }

    const handleSubmit = (e) => {
        e.preventDefault();

        const latestData = {
            nama: simpleData["nama"],
            whatsapp: simpleData["whatsapp"],
            email: simpleData["email"],
            masalah: simpleData["masalah"],
            ...formData
        };
        router.post('/pengaduan/submit', latestData);
    };

    const handleRemoveFile = (index) => {
        setFormData((prevFormData) => {
            const updatedLampiran = [...prevFormData.lampiran];
            updatedLampiran.splice(index, 1);
            return { ...prevFormData, lampiran: updatedLampiran };
        });
    };

    const handleFileChange = (event) => {
        const selectedFiles = event.target.files;

        const newFiles = Array.from(selectedFiles);

        // Check each file individually
        for (const file of newFiles) {
            if (file.size > 5 * 1024 * 1024) {
                setFileError(`File "${file.name}" exceeds the 5MB limit. Please choose a smaller file.`);
                return; // Stop processing further files on the first violation
            }
        }

        setFormData((prevFormData) => ({
            ...prevFormData,
            lampiran: [...prevFormData.lampiran, ...newFiles],
        }));
        setFileError(null);
    };

    const handleDragOver = (event) => {
        event.preventDefault();
    };

    const handleDrop = (event) => {
        event.preventDefault();
    
        const droppedFiles = event.dataTransfer.files;
    
        const newFiles = Array.from(droppedFiles);
    
        // Check each file individually
        for (const file of newFiles) {
            if (file.size > 5 * 1024 * 1024) {
                setFileError(`File "${file.name}" exceeds the 5MB limit. Please choose a smaller file.`);
                return; // Stop processing further files on the first violation
            }
        }
    
        // Add new files to existing files
        setFormData((prevFormData) => ({
            ...prevFormData,
            lampiran: [...prevFormData.lampiran, ...newFiles],
        }));
        setFileError(null);
    };    

    return(
        <div>
            <div className="">
                <p className="text-xs text-black">
                    Contoh administratif : korupsi, kolusi, nepotisme, pungutan liar.
                </p>
            </div>
            <div className="my-2">
                <p className="text-xs text-black opacity-25">
                    form:Administratif
                </p>
            </div>
            <div className="mb-4">
                <label className="block text-gray-700 text-md font-bold mb-2" htmlFor="namaPelanggar">
                    Nama Pelanggar
                </label>
                <input className="shadow appearance-none border border-black rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:border-biru-1" id="namaPelanggar" name="namaPelanggar" type="text" placeholder="Isi nama orang yang melakukan pelanggaran" value={formData.namaPelanggar} onChange={handleChange}/>
            </div>

            <div className="mb-4">
                <label className="block text-gray-700 text-md font-bold mb-2" htmlFor="tempatKejadian">
                    Tempat Kejadian
                </label>
                <input className="shadow appearance-none border border-black rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:border-biru-1" id="tempatKejadian" name="tempatKejadian" type="text" placeholder="Isi tempat dimana pelanggaran terjadi" value={formData.tempatKejadian} onChange={handleChange}/>
            </div>

            <div className="mb-4">
                <label className="block text-gray-700 text-md font-bold mb-2" htmlFor="tanggalKejadian">
                    Tanggal Kejadian
                </label>
                <input 
                    className="shadow appearance-none border border-black rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:border-biru-1"
                    id="tanggalKejadian"
                    name="tanggalKejadian"
                    type="date"
                    placeholder="Pilih tanggal kejadian"
                    value={formData.tanggalKejadian}
                    onChange={handleChange}
                />
            </div>

            <div className="">
                <label className="block text-gray-700 text-md font-bold mb-2" htmlFor="description">
                    Deskripsi Masalah
                </label>
                <textarea 
                    className="h-32 shadow appearance-none border border-black rounded w-full py-2 px-3 text-gray-700 mb-3 leading-tight focus:outline-none focus:border-biru-1" 
                    id="description"
                    name="deskripsi" 
                    placeholder="Berikan deskripsi masalah sedetail dan sejelas mungkin"
                    value={formData.deskripsi}
                    onChange={handleChange}
                />
            </div>

            <div className="mb-4">
                <label htmlFor="lampiran" className="block text-gray-700 text-md font-bold mb-2">
                    Lampiran
                </label>
                    <p className="text-gray-600 text-xs mb-2">Lampirkan bukti foto dan video anda</p>
                <div 
                    className="w-full h-20 bg-white text-gray-700 border-2 border-dashed border-gray-300 rounded-lg flex justify-center items-center relative cursor-pointer"
                    onDragOver={handleDragOver}
                    onDrop={handleDrop}
                >
                    <input 
                    type="file"
                    id="lampiran"
                    className="absolute inset-0 w-full h-full opacity-0"
                    accept=".jpg,.jpeg,.png"
                    onChange={handleFileChange}
                    multiple
                    />
                    <div className="pointer-events-none flex justify-center items-center">
                    {formData.lampiran.length > 0 ? (
                        <span className="text-gray-700">/ tambahkan file berikutnya</span>
                    ) : (
                        <span className="text-gray-700">/ tambah atau tarik file disini</span>
                    )}
                    </div>
                </div>

                {formData.lampiran.length > 0 && (
                    <div className="mt-4">
                        <p className="text-gray-700">Form Submitted:</p>
                        <div className="flex flex-wrap">
                        {formData.lampiran.map((file, index) => (
                            <div key={index} className="bg-gray-200 p-2 m-1 rounded flex items-center">
                            <span className="mr-2">{file.name}</span>
                            <button
                                className="text-red-500 hover:text-gray-700 cursor-pointer"
                                onClick={() => handleRemoveFile(index)}
                            >
                                <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth="1.5" stroke="currentColor" className="w-4 h-4">
                                <path strokeLinecap="round" strokeLinejoin="round" d="m9.75 9.75 4.5 4.5m0-4.5-4.5 4.5M21 12a9 9 0 1 1-18 0 9 9 0 0 1 18 0Z" />
                                </svg>
                            </button>
                            </div>
                        ))}
                        </div>
                    </div>
                )}

                {errors && Object.keys(errors).map(key => (
                <div key={key} className="text-red-500 text-xs italic mt-2">
                    {errors[key]}
                </div>
                ))}

                {fileError && <div className="text-red-500 text-xs italic mt-2">{fileError}</div>}

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
                    <button className="bg-biru-1 hover:bg-biru-2 text-white font-bold py-2 px-24 rounded focus:outline-none focus:shadow-outline" 
                    type="button"
                    onClick={handleSubmit}>
                        Buat Pengaduan
                    </button>
                </div>
            </div>
        </div>
    );
};


export default FormAdministratif;