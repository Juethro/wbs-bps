import React, {useState} from "react";

const DetailModal = ({ data }) => {
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
    
                <div className="inline-block align-bottom bg-white rounded-lg px-4 pt-5 pb-4 text-left overflow-hidden shadow-xl transform transition-all sm:my-8 sm:align-middle sm:max-w-lg sm:w-full sm:p-6">
                  <h3 className="text-lg font-medium leading-6 text-gray-900">
                    Detail Pengaduan
                  </h3>
                  <div className="mt-5">
                    <p className="text-sm text-gray-500">
                      <strong>ID:</strong> {data.id}
                    </p>
                    <p className="text-sm text-gray-500">
                      <strong>Nama Pelanggar:</strong> {data.namaPelanggar}
                    </p>
                    <p className="text-sm text-gray-500">
                      <strong>Tempat Kejadian:</strong> {data.tempatKejadian}
                    </p>
                    <p className="text-sm text-gray-500">
                      <strong>Tanggal Kejadian:</strong> {data.tanggalKejadian}
                    </p>
                    <p className="text-sm text-gray-500">
                      <strong>Deskripsi:</strong> {data.deskripsi}
                    </p>
                    <p className="text-sm text-gray-500">
                      <strong>Lampiran:</strong> {data.lampiran}
                    </p>
                  </div>
                  <div className="mt-4">
                    <button
                      type="button"
                      className="inline-flex justify-center px-4 py-2 text-sm font-medium text-white bg-blue-500 border border-transparent rounded-md hover:bg-blue-600 focus:outline-none focus-visible:ring-2 focus-visible:ring-offset-2 focus-visible:ring-blue-500"
                      onClick={closeModal}
                    >
                      Tutup
                    </button>
                  </div>
                </div>
              </div>
            </div>
          )}
        </React.Fragment>
      );
    };
    
export default DetailModal;