import React, {useState} from "react";
import { router } from "@inertiajs/react";

const DetailDewanSelesai = ({ dataTeknis }) => {
  const [isOpen, setIsOpen] = useState(false);

  const openModal = () => {
    setIsOpen(true);
  };

  const closeModal = () => {
    setIsOpen(false);
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
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <h3 className="text-lg font-medium leading-6 text-gray-900">
                    Detail Pengaduan
                  </h3>
                  <div className="mt-5 max-h-80 overflow-y-scroll flex">

                    {/* Tabel Kiri Detail Aduan */}
                    <table className="text-left text-gray-500 ">
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
                                  <a target="blank" href={"/dashboard/dewan/download/" + dataTeknis.ticketID + "/" + item.uniqueId}>
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
                </div>

                {/* Tabel Kanan */}
                <div>
                  <h3 className="text-lg font-medium leading-6 text-gray-900">
                    Hasil Investigasi
                  </h3>
                  <div className="mt-5 max-h-80 overflow-y-scroll flex">
                    <table className="text-left text-gray-500 ">
                      <thead>
                        <tr>
                          <th className="px-0 pt-4 whitespace-pre-line text-gray-700 bg-gray-50">
                            Deskripsi
                          </th>
                          <th className="px-2 pt-4 whitespace-pre-line">
                            {dataTeknis.detail_review.laporan_review}
                          </th>
                        </tr>
                        <tr>
                          <th className="px-0 pt-4 whitespace-pre-line text-gray-700 bg-gray-50">
                            Berkas
                          </th>
                          <th className="px-2 pt-4 whitespace-pre-line">
                            <ul className="max-h-24 overflow-y-scroll">
                              {dataTeknis.detail_review.file_laporan.map((item) => (
                                <li className="p-1 flex flex-row justify-between">
                                  {item.oriFileName.substring(0, 35) + '...'}
                                  <a target="blank" href={"/dashboard/dewan/download/berkas/" + dataTeknis.ticketID + "/" + item.uniqueId}>
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
                </div>
              </div>
              
            </div>
          </div>
        </div>
      )}
      </React.Fragment>
    );
  };
    
export default DetailDewanSelesai;