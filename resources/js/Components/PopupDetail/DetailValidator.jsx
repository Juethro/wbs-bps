import { router } from "@inertiajs/react";
import React, { useState } from "react";

const DetailAdministratif = ({ dataAdministratif}) => {
  const [isOpen, setIsOpen] = useState(false);
  const [isTabHidden, setIsTabHidden] = useState(true);
  const [revisiData, setRevisiData] = useState({
    "ticket": dataAdministratif.ticketID,
    "instruksi": ""
  });

  const openModal = () => {
    setIsOpen(true);
  };

  const handleRevisiClick = () => {
    setIsTabHidden(!isTabHidden);
  };

  const handleChange = (e) =>{
    const { name, value } = e.target;
    setRevisiData((prev) => ({
        ...prev,
        [name]: value,
    }));
  };

  const closeModal = () => {
    setIsOpen(false);
  };

  const handleSetujuClick = (ticketID) => {
    router.patch('validator/approve/', ticketID);
    setIsOpen(false);
    window.location.reload(); 
  };

  const submitRevisi = (data) => {
    router.post("/dashboard/validator/revisi",data);
    setIsOpen(false);
    window.location.reload(); 
  }

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

            <div className="inline-block align-bottom bg-white rounded-lg px-4 pt-5 pb-4 text-left overflow-hidden shadow-xl transform transition-all sm:my-8 sm:align-middle sm:max-w-lg sm:w-full sm:p-6">
              <h3 className="text-lg font-medium leading-6 text-gray-900">
                Detail Pengaduan
              </h3>
              <div className="mt-5 max-h-80 overflow-y-scroll">
                <table className="max-w-max text-left text-gray-500 ">
                  <thead>
                    <tr>
                      <th className="px-0 pt-4 whitespace-pre-line text-gray-700 bg-gray-50">
                        ID
                      </th>
                      <th className="px-2 pt-4 whitespace-pre-line">
                        {dataAdministratif.ticketID}
                      </th>
                    </tr>
                    <tr>
                      <th className="px-0 pt-4 whitespace-pre-line text-gray-700 bg-gray-50">
                        Nama Pelanggar
                      </th>
                      <th className="px-2 pt-4 whitespace-pre-line">
                        {dataAdministratif.nama_pelanggar}
                      </th>
                    </tr>
                    <tr>
                      <th className="px-0 pt-4 whitespace-pre-line text-gray-700 bg-gray-50">
                        Tempat Kejadian
                      </th>
                      <th className="px-2 pt-4 whitespace-pre-line">
                        {dataAdministratif.tempat_kejadian}
                      </th>
                    </tr>
                    <tr>
                      <th className="px-0 pt-4 whitespace-pre-line text-gray-700 bg-gray-50">
                        Tanggal Kejadian
                      </th>
                      <th className="px-2 pt-4 whitespace-pre-line">
                        {dataAdministratif.tanggal_kejadian}
                      </th>
                    </tr>
                    <tr>
                      <th className="px-0 pt-4 whitespace-pre-line text-gray-700 bg-gray-50">
                        Deskripsi
                      </th>
                      <th className="px-2 pt-4 whitespace-pre-line max-h-32 overflow-y-auto">
                        {dataAdministratif.deskripsi_masalah}
                      </th>
                    </tr>
                    <tr>
                      <th className="px-0 pt-4 whitespace-pre-line text-gray-700 bg-gray-50">
                        Lampiran
                      </th>
                      <th className="px-2 pt-4 whitespace-pre-line">
                        <ul className="max-h-24 overflow-y-scroll">
                          {dataAdministratif.lampiran_file.map((item) => (
                            <li className="p-1 flex flex-row justify-between">
                              {item.oriFileName.substring(0, 35) + '...'}
                              <a target="blank" href={"/dashboard/validator/download/" + dataAdministratif.ticketID + "/" + item.uniqueId}>
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
              <div className="flex flex-row justify-center mt-4">
                  <button
                    type="button"
                    className="inline-flex justify-center px-4 py-2 text-sm font-medium text-white bg-green-500 border border-transparent rounded-md hover:bg-green-700 focus:outline-none focus-visible:ring-2 focus-visible:ring-offset-2 focus-visible:ring-blue-500"
                    onClick={() => handleSetujuClick(dataAdministratif.ticketID)}
                  >
                    Setuju
                  </button>
                  <button
                    type="button"
                    className="ml-4 inline-flex justify-center px-4 py-2 text-sm font-medium text-white bg-red-500 border border-transparent rounded-md hover:bg-red-600 focus:outline-none focus-visible:ring-2 focus-visible:ring-offset-2 focus-visible:ring-red-500"
                    onClick={handleRevisiClick}>
                      Revisi
                  </button>
                  <button
                    type="button"
                    className="ml-4 inline-flex justify-center px-4 py-2 text-sm font-medium text-white bg-blue-600 border border-transparent rounded-md hover:bg-blue-700 focus:outline-none focus-visible:ring-2 focus-visible:ring-offset-2 focus-visible:ring-blue-500"
                    onClick={closeModal}
                  >
                    Tutup
                  </button>
              </div>
              {!isTabHidden && (
                <div className="mt-4">
                  <textarea
                    className="w-full h-24 p-2 border rounded-md"
                    placeholder="Apa yang perlu direvisi"
                    name="instruksi"
                    value={revisiData.instruksi}
                    onChange={handleChange}
                  />
                  <div className="flex justify-end">
                    <button className="bg-red-500 text-white rounded-md py-1 px-3" onClick={()=>submitRevisi(revisiData)}>Submit</button>
                  </div>
                </div>
              )}
              
            </div>
          </div>
        </div>
      )}
    </React.Fragment>
  );
};

export default DetailAdministratif;