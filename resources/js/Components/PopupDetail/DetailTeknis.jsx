import React, {useState} from "react";

const DetailTeknis = ({ dataTeknis }) => {
    const [isOpen, setIsOpen] = useState(false);

    const [isTabHidden, setIsTabHidden] = useState(true);
  
    const openModal = () => {
      setIsOpen(true);
    };
  
    const handleRevisiClick = () => {
      setIsTabHidden(false);
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
    
                <div className="inline-block align-bottom bg-white rounded-lg px-4 pt-5 pb-4 text-left overflow-hidden shadow-xl transform transition-all sm:my-8 sm:align-middle sm:max-w-lg sm:w-full sm:p-6">
                  <h3 className="text-lg font-medium leading-6 text-gray-900">
                    Detail Pengaduan
                  </h3>
                  <div className="mt-5">
                    <p className="text-sm text-gray-500">
                      <strong>ID:</strong> {dataTeknis.ticketID}
                    </p>
                    <p className="text-sm text-gray-500">
                      <strong>Nama Pelanggar:</strong> {dataTeknis.nama_pelanggar}
                    </p>
                    <p className="text-sm text-gray-500">
                      <strong>Tempat Kejadian:</strong> {dataTeknis.tempat_kejadian}
                    </p>
                    <p className="text-sm text-gray-500">
                      <strong>Tanggal Kejadian:</strong> {dataTeknis.tanggal_kejadian}
                    </p>
                    <p className="text-sm text-gray-500">
                      <strong>Deskripsi:</strong> {dataTeknis.deskripsi_masalah}
                    </p>
                    <p className="text-sm text-gray-500">
                      <strong>Lampiran:</strong> {dataTeknis.lampiran_masalah}
                    </p>
                  </div>
                  <div className="flex flex-row justify-center mt-4">
                    <button
                      type="button"
                      className="inline-flex justify-center px-4 py-2 text-sm font-medium text-white bg-green-500 border border-transparent rounded-md hover:bg-green-700 focus:outline-none focus-visible:ring-2 focus-visible:ring-offset-2 focus-visible:ring-blue-500"
                      // onClick={() => handleSetujuClick(dataAdministratif.ticketID)}
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
                      className="ml-4 inline-flex justify-center px-4 py-2 text-sm font-medium text-white bg-blue-500 border border-transparent rounded-md hover:bg-blue-700 focus:outline-none focus-visible:ring-2 focus-visible:ring-offset-2 focus-visible:ring-blue-500"
                      onClick={closeModal}
                    >
                      Tutup
                    </button>
                  </div>
                  {!isTabHidden && (
                    <div className="mt-4">
                      {<textarea
                      className="w-full h-24 p-2 border rounded-md"
                      placeholder="Apa yang perlu direvisi"/>}
                    </div>
                  )}
                </div>
              </div>
            </div>
          )}
        </React.Fragment>
      );
    };
    
export default DetailTeknis;