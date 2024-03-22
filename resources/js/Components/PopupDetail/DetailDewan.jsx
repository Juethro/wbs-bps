import React, {useState} from "react";
import { router } from "@inertiajs/react";

const DetailDewan = ({ dataTeknis }) => {
  const [isOpen, setIsOpen] = useState(false);
  const isInvestigate = dataTeknis?.review == '6';
  const [formData, setFormData] = useState({
    ticketID : dataTeknis.ticketID,
    hasil_investigasi : "",
    berkas : [],
  });
  const [fileError, setFileError] = useState(null);
  const [error, setError] = useState(null);

  const openModal = () => {
    setIsOpen(true);
  };

  const closeModal = () => {
    setIsOpen(false);
  };

  const handleInvestigate = (ticketID) => {
    router.patch('dewan/investigate/', ticketID);
    setIsOpen(false);
    window.location.reload(); 
  };

  const handleChange = (e) =>{
      const { name, value } = e.target;
      setFormData((prev) => ({
          ...prev,
          [name]: value,
      }));
  }

  const submitTerbukti = (data) => {
    if (data.hasil_investigasi === '' || data.berkas.length == 0) {
      // Set error state
      setError("Hasil investigasi dan berkas tidak boleh kosong.");
      return;
    }

    router.post("/dashboard/dewan/proven",data);
    setIsOpen(false);
    window.location.reload(); 
  }

  const submitTidakTerbukti = (data) => {
    if (data.hasil_investigasi === '' || data.berkas.length == 0) {
      // Set error state
      setError("Hasil investigasi dan berkas tidak boleh kosong.");
      return;
    }

    router.post("/dashboard/dewan/notproven",data);
    setIsOpen(false);
    window.location.reload(); 
  }

  // File Drag n Drop setup
  const handleRemoveFile = (indexToRemove) => {
    setFormData((prevData) => {
      const updatedFiles = [...prevData.berkas];
      updatedFiles.splice(indexToRemove, 1);
  
      return {
        ...prevData,
        berkas: updatedFiles,
      };
    });
  };
  

  const handleFileChange = (event) => {
      const selectedFiles = event.target.files;

      const newFiles = Array.from(selectedFiles);

      // Check each file individually
      for (const file of newFiles) {
        if (file.size > 25 * 1024 * 1024) {
          setFileError(`File "${file.name}" exceeds the 25MB limit. Please choose a smaller file.`);
          return; // Stop processing further files on the first violation
        }
      }
      
      setFormData((prevFormData) => ({
          ...prevFormData,
          berkas: [...prevFormData.berkas, ...newFiles],
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
        if (file.size > 20 * 1024 * 1024) {
          setFileError(`File "${file.name}" exceeds the 20MB limit. Please choose a smaller file.`);
          return; // Stop processing further files on the first violation
        }
      }

      setFormData((prevFormData) => ({
          ...prevFormData,
          berkas: [...prevFormData.berkas, ...newFiles],
        }));
      setFileError(null);
  };

  return (
      <React.Fragment>
        <a
          href="#"
          className="font-medium text-blue-600 dark:text-blue-500 hover:underline"
          onClick={openModal}
        >
          Detail
        </a>
  
        {isOpen && (
        <div className="fixed inset-0 z-10 overflow-y-auto">
          <div className="flex items-end justify-center min-h-screen pt-4 px-4 pb-20 text-center sm:block sm:p-0">
            <div
              className="fixed inset-0 transition-opacity"
              aria-hidden="true"
              onClick={closeModal}
            >
              <div className="absolute inset-0 bg-gray-500 opacity-75"></div>
            </div>

            <span
              className="hidden sm:inline-block sm:align-middle sm:h-screen"
              aria-hidden="true"
            >
              &#8203;
            </span>

            <div className="inline-block align-bottom bg-white rounded-lg px-4 pt-5 pb-4 text-left shadow-xl transform transition-all sm:my-8 sm:align-middle sm:max-w-[80vw] sm:h-full sm:w-full sm:p-6">
              <h3 className="text-lg font-medium leading-6 text-gray-900">
                Detail Pengaduan
              </h3>
              <div className="mt-5 max-h-80 overflow-y-scroll">
                <table className="w-full text-left text-gray-500 ">
                  <thead>
                    <tr>
                      <th className="px-0 pt-4 whitespace-pre-line text-gray-700 bg-gray-50">
                        ID
                      </th>
                      <th className="px-2 pt-4 whitespace-pre-line">
                        {dataTeknis.ticketID}
                      </th>
                    </tr>
                    <tr>
                      <th className="px-0 pt-4 whitespace-pre-line text-gray-700 bg-gray-50">
                        Nama Pelanggar
                      </th>
                      <th className="px-2 pt-4 whitespace-pre-line">
                        {dataTeknis.nama_pelanggar}
                      </th>
                    </tr>
                    <tr>
                      <th className="px-0 pt-4 whitespace-pre-line text-gray-700 bg-gray-50">
                        Tempat Kejadian
                      </th>
                      <th className="px-2 pt-4 whitespace-pre-line">
                        {dataTeknis.tempat_kejadian}
                      </th>
                    </tr>
                    <tr>
                      <th className="px-0 pt-4 whitespace-pre-line text-gray-700 bg-gray-50">
                        Tanggal Kejadian
                      </th>
                      <th className="px-2 pt-4 whitespace-pre-line">
                        {dataTeknis.tanggal_kejadian}
                      </th>
                    </tr>
                    <tr>
                      <th className="px-0 pt-4 whitespace-pre-line text-gray-700 bg-gray-50">
                        Deskripsi
                      </th>
                      <th className="px-2 pt-4 whitespace-pre-line max-h-32 overflow-y-auto">
                        {dataTeknis.deskripsi_masalah}
                      </th>
                    </tr>
                    <tr>
                      <th className="px-0 pt-4 whitespace-pre-line text-gray-700 bg-gray-50">
                        Lampiran
                      </th>
                      <th className="px-2 pt-4 whitespace-pre-line">
                        <ul className="max-h-24 overflow-y-scroll">
                          {dataTeknis.lampiran_file.map((item) => (
                            <li className="p-1 flex flex-row justify-between">
                              {item.oriFileName.substring(0, 35) + '...'}
                              <a target="blank" href={"/dashboard/validator/download/" + dataTeknis.ticketID + "/" + item.uniqueId}>
                                <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-6 h-6 hover:stroke-blue-500">
                                  <path strokeLinecap="round" strokeLinejoin="round" d="M3 16.5v2.25A2.25 2.25 0 0 0 5.25 21h13.5A2.25 2.25 0 0 0 21 18.75V16.5M16.5 12 12 16.5m0 0L7.5 12m4.5 4.5V3" />
                                </svg>
                              </a>
                            </li>
                          ))}
                        </ul>
                      </th>
                    </tr>
                  </thead>
                </table>
              </div>

              <div className="flex flex-col  mt-4">
                {isInvestigate ? 
                  <>
                    <div className="mt-2">
                      <h3 className="text-lg font-medium leading-6 text-gray-900">
                        Hasil Investigasi
                      </h3>
                      <div className="flex flex-row justify-between">
                        <div className="my-5 mr-2 w-[50%]">
                          <label htmlFor="hasil_investigasi" className="block text-gray-700 text-md font-bold mb-2">
                            Tuliskan hasil investigasi
                          </label>
                          <div>
                            <textarea 
                              id="hasil_investigasi"
                              name="hasil_investigasi"
                              className="h-[25vw] w-full border-2 rounded-lg p-2 border-gray-200"
                              placeholder="Tulis Hasil Investigasi Disini"
                              value = {formData.hasil_investigasi}
                              onChange={handleChange}
                              
                            />
                          </div>
                        </div>
                        <div className="my-5 w-[50%]">
                          <label htmlFor="berkas" className="block text-gray-700 text-md font-bold mb-2">
                            Lampirkan berkas hasil investigasi
                          </label>
                          <div
                            className="w-full h-16 bg-white text-gray-700 border-2 border-dashed border-gray-300 rounded-lg flex justify-center items-center relative cursor-pointer"
                            onDragOver={handleDragOver}
                            onDrop={handleDrop}
                          >
                            <input 
                              type="file"
                              id="berkas"
                              className="absolute inset-0 w-full h-full opacity-0"
                              onChange={handleFileChange}
                              multiple
                            />
                            <div className="pointer-events-none flex justify-center items-center">
                              {formData.berkas.length > 0 ? (
                                <span className="text-gray-700">/ tambahkan file berikutnya</span>
                                ) : (
                                <span className="text-gray-700">/ tambah atau tarik file disini</span>
                              )}
                            </div>
                          </div>

                          {fileError && <div className="text-red-500 text-xs italic mt-2">{fileError}</div>}

                          {formData.berkas.length > 0 && (
                              <div className="mt-4">
                                  <p className="text-gray-700">Form Submitted:</p>
                                  <div className="flex flex-wrap max-h-36 overflow-y-auto">
                                  {formData.berkas.map((file, index) => (
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


                        </div>
                      </div>
                      
                    </div>
                    <div className="flex flex-row justify-items-center">
                      <button
                        type="button"
                        className="inline-flex justify-center px-4 py-2 mr-2 text-sm font-medium text-white bg-green-500 border border-transparent rounded-md hover:bg-green-700 focus:outline-none focus-visible:ring-2 focus-visible:ring-offset-2 focus-visible:ring-blue-500"
                        onClick={() => submitTerbukti(formData)}
                      >
                        Terbukti
                      </button>
                      <button
                        type="button"
                        className="inline-flex justify-center px-4 py-2 text-sm font-medium text-white bg-red-500 border border-transparent rounded-md hover:bg-red-700 focus:outline-none focus-visible:ring-2 focus-visible:ring-offset-2 focus-visible:ring-blue-500"
                        onClick={()=> submitTidakTerbukti(formData)}
                      >
                        Tidak Terbukti
                      </button>
                      { error ?
                        <p className="text-red-500 ml-2">
                          {'* ' + error}
                        </p>: ''
                      }
                    </div>
                    
                  </>
                :
                <>
                  <button
                    type="button"
                    className="ml-4 inline-flex justify-center px-4 py-2 text-sm font-medium text-white bg-blue-600 border border-transparent rounded-md hover:bg-blue-700 focus:outline-none focus-visible:ring-2 focus-visible:ring-offset-2 focus-visible:ring-blue-500"
                    onClick={()=>handleInvestigate(dataTeknis.ticketID)}
                  >
                    Investigate
                  </button>
                </>} 
              </div>
              
            </div>
          </div>
        </div>
      )}
      </React.Fragment>
    );
  };
    
export default DetailDewan;