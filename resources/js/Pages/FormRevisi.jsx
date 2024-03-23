import React, {useState } from "react";
import { router, usePage } from '@inertiajs/react';
import NavbarForm from "../Components/NavbarForm";

const FormRevisi = () => {
  const [fileError, setFileError] = useState(null);
  const { props } = usePage();
  const data = JSON.parse(props.data);
  const [submitError, setSubmitError] = useState(null);

  const [formData, setFormData] = useState({
    ticketID : data['ticketID'],
    nama : data['nama'],
    no_telp : data['no_telp'],
    email : data['email'],
    jenis_masalah : data['jenis_masalah'],
    namaPelanggar : data['nama_pelanggar'],
    tempatKejadian : data['tempat_kejadian'],
    tanggalKejadian : data['tanggal_kejadian'],
    deskripsi : data['deskripsi_masalah'],
    lampiran_lama : [JSON.parse(data['lampiran_file'])],
    lampiran_baru : [],
  });
  
  console.table(formData);

  const handleChange = (e) =>{
    const { name, value } = e.target;
    setFormData((prev) => ({
        ...prev,
        [name]: value,
    }));
  }

  const handleSubmit = (someData) => {
    switch (true) {
        case someData.namaPelanggar.trim() === "":
            setSubmitError("*Nama Pelanggar tidak boleh kosong");
            break;
        case someData.tempatKejadian.trim() === "":
            setSubmitError("*Tempat Kejadian tidak boleh kosong");
            break;
        case someData.tanggalKejadian.trim() === "":
            setSubmitError("*Tanggal Kejadian tidak boleh kosong");
            break
        case someData.deskripsi.trim() === "":
            setSubmitError("*Deskripsi Kejadian tidak boleh kosong");
            break
        default:
            // console.log(someData);
            router.post('/revisi/submitrevisi',someData);
            break;
    }
  }

  const handleRemoveFile = (index) => {
    const newFormData = {...formData};
    newFormData.lampiran_baru.splice(index, 1);
    setFormData(newFormData);
  };

  const handleRemoveFileLama = (index) => {
    const newFormData = {...formData};
    newFormData.lampiran_lama[0].splice(index, 1);
    setFormData(newFormData);
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
    
    // Add new files to existing files
    setFormData((prevFormData) => ({
        ...prevFormData,
        lampiran_baru: [...prevFormData.lampiran_baru, ...newFiles],
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
        lampiran_baru: [...prevFormData.lampiran_baru, ...newFiles],
    }));
    setFileError(null);
};

  return (
    <div className="bg-contain bg-fixed bg-center min-h-[100vh]" style={{ backgroundImage: "url('images/bpssby.jpg')", backgroundSize: "cover" }}>
      <div className="bg-blue-500 bg-contain bg-opacity-45 min-h-[100vh]">
        <div>
          <NavbarForm></NavbarForm>
        </div>

        <div className="bg-white shadow-md rounded landscape:lg:mx-40 portrait:mx-0 landscape:px-8 portrait:px-4 pt-1 pb-8 mt-28 mb-4">
          <div className="border-b border-biru-1 py-1 mt-5">
            <h1 className="text-sm text-biru-1 inline-block">Revisi</h1>
          </div>
          <div>
            <div className="my-2">
                <p className="text-xs text-black opacity-25">
                    form:Revisi
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

            {formData.lampiran_lama.length > 0 && (
                    <div className="mt-4">
                        <p className="text-gray-700">File Submitted:</p>
                        <div className="flex flex-wrap">
                        {formData.lampiran_lama[0].map((file, index) => (
                            <div key={index} className="bg-gray-200 p-2 m-1 rounded flex items-center">
                            <span className="mr-2">{file.oriFileName}</span>
                            <button
                                className="text-red-500 hover:text-gray-700 cursor-pointer"
                                onClick={() => handleRemoveFileLama(index)}
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

            <div className="mb-4">
                <label htmlFor="lampiran_baru" className="block text-gray-700 text-md font-bold mb-2">
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
                    id="lampiran_baru"
                    className="absolute inset-0 w-full h-full opacity-0"
                    accept=".jpg,.jpeg,.png"
                    onChange={handleFileChange}
                    multiple
                    />
                    <div className="pointer-events-none flex justify-center items-center">
                    {formData.lampiran_baru.length > 0 ? (
                        <span className="text-gray-700">/ tambahkan file berikutnya</span>
                    ) : (
                        <span className="text-gray-700">/ tambah atau tarik file disini</span>
                    )}
                    </div>
                </div>

                {formData.lampiran_baru.length > 0 && (
                    <div className="mt-4">
                        <p className="text-gray-700">File Submitted:</p>
                        <div className="flex flex-wrap">
                        {formData.lampiran_baru.map((file, index) => (
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

                {submitError? (
                    <div className="text-red-500 text-xs italic mt-2">
                        {submitError}
                    </div>
                    ) : ''
                }

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
                    onClick={() => handleSubmit(formData)}>
                        Revisi
                    </button>
                </div>
            </div>
        </div>
        </div>

      </div>
    </div>    
  );
  
};

export default FormRevisi;
