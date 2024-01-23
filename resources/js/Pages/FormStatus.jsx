import React, { useState } from "react";
import NavbarForm from "../Components/NavbarForm";

function FormStatus() {
  const [buttonClicked, setButtonClicked] = useState(false);
  const [keterangan, setKeterangan] = useState("");
  const [selectedStatus, setSelectedStatus] = useState(""); // Menambah state untuk status radio button

  const handleButtonClick = () => {
    setButtonClicked(true);
    setKeterangan("Pengaduan Anda telah kami terima, mohon tunggu kabar berikutnya");
  };

  return (
    <div className="bg-contain bg-fixed bg-center" style={{ backgroundImage: "url('images/bpssby.jpg')", backgroundSize: "cover" }}>
      <div className="bg-blue-500 bg-contain bg-opacity-45">
        <div>
          <NavbarForm/>
        </div>
        <div className="container mx-auto p-4">
          <div className="flex flex-col mt-40">
            <div className="flex justify-center text-2xl font-bold text-white">
              Cek Pengaduan
            </div>

            <div className="flex justify-center mt-5 text-sm text-white">
              Kami disini untuk membantu masalah anda,
            </div>

            <div className="flex justify-center text-sm text-white">
              silahkan mengisi form terlebih dahulu untuk melihat status tiket anda.
            </div>
          </div>

          <div className="bg-white shadow-md rounded mx-40 px-8 pt-1 pb-8 mb-4 mt-12">
            <div className="border-b border-biru-1 py-1 mt-5">
              <h1 className="text-sm text-biru-1 inline-block">Detail</h1>
            </div>

            <div className="mx-40">
              <div className="mt-9 mb-4">
                <label className="block text-gray-700 text-md font-bold mb-2" htmlFor="KodeTiket">
                  Kode Tiket
                </label>

                <input
                  className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                  id="email"
                  type="email"
                  placeholder="Isi kode tiket Anda"
                />

                <div className="flex items-center text-red-500 text-xs italic mt-2">
                  <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth="1.5" stroke="currentColor" className="w-4 h-4 mr-1">
                    <path strokeLinecap="round" strokeLinejoin="round" d="M12 9v3.75m-9.303 3.376c-.866 1.5.217 3.374 1.948 3.374h14.71c1.73 0 2.813-1.874 1.948-3.374L13.949 3.378c-.866-1.5-3.032-1.5-3.898 0L2.697 16.126ZM12 15.75h.007v.008H12v-.008Z" />
                  </svg>

                  <span className="text-black">
                    Kode tiket anda telah diberikan lewat
                    <span className="font-bold"> email</span> atau
                    <span className="font-bold"> WhatsApp</span> yang anda isi pada buat pengaduan
                  </span>
                </div>
              </div>

              <div className="flex items-center justify-center">
                <button
                  className={`${
                    buttonClicked ? "bg-blue-700" : "bg-biru-1 hover:bg-blue-700"
                  } text-white font-bold py-2 px-24 rounded focus:outline-none focus:shadow-outline`}
                  type="button"
                  onClick={handleButtonClick}
                >
                  Cek Tiket
                </button>
              </div>
            </div>
          </div>

          <div className="bg-white shadow-md rounded mx-40 px-8 pt-1 pb-8 mb-4">
            <div className="border-b border-biru-1 py-1 mt-5">
              <h1 className="text-sm text-biru-1 inline-block">Status</h1>
            </div>

            <div className="mx-40">
              <div className="mt-7 mb-4">
                <label className="block text-black text-md font-bold mb-2" htmlFor="Status">
                  Status Tiket
                </label>

                <div className="flex flex-col space-y-4 mt-10">
                  {/* Radio button for "Tahap 1" */}
                  <label className="inline-flex items-center">
                    <input
                      type="radio"
                      className="form-radio text-biru-1"
                      value="Tahap 1"
                      checked={selectedStatus === "Tahap 1"}
                      onChange={() => setSelectedStatus("Tahap 1")}
                    />
                    <div className="grid grid-cols-1 ml-2 flex items-center w-full justify-between text-sm">
                      <div className="flex flex-row items-center justify-between">
                          <span className="text-black font-bold">01 Januari 2024</span>
                          <div className="text-gray-700 opacity-50">07.30 WIB</div>
                      </div>

                      <div className = "flex items-venter space-x-40 mt-4">
                        <span className="text-gray-700">Pengaduan anda diterima, mohon tunggu kabar berikutnya!</span>
                      </div>                  
                    </div>
                  </label>

                  {/* Radio button for "Tahap 2" */}
                  <label className="inline-flex items-center">
                    <input
                      type="radio"
                      className="form-radio text-biru-1"
                      value="Tahap 2"
                      checked={selectedStatus === "Tahap 2"}
                      onChange={() => setSelectedStatus("Tahap 2")}
                    />
                    <div className="grid grid-cols-1 ml-2 flex items-center w-full justify-between text-sm">
                      <div className="flex flex-row items-center justify-between">
                          <span className="text-black font-bold">02 Januari 2024</span>
                          <div className="text-gray-700 opacity-50">07.40 WIB</div>
                      </div>
                      <div className = "flex items-venter space-x-60 mt-4">
                        <span className="text-gray-700">Pengaduan anda dalam proses validasi oleh Tim</span>
                      </div>                  
                    </div>
                  </label>   

                  {/* Radio button for "Tahap 3" */}
                  <label className="inline-flex items-center">
                    <input
                      type="radio"
                      className="form-radio text-biru-1"
                      value="Tahap 3"
                      checked={selectedStatus === "Tahap 3"}
                      onChange={() => setSelectedStatus("Tahap 3")}
                    />
                    <div className="grid grid-cols-1 ml-2 flex items-center w-full justify-between text-sm">
                      <div className="flex flex-row items-center justify-between">
                          <span className="text-black font-bold">03 Januari 2024</span>
                          <div className="text-gray-700 opacity-50">08.00 WIB</div>
                      </div>
                      <div className = "flex items-venter space-x-60 mt-4">
                        <span className="text-gray-700">Pengaduan anda dalam proses review oleh Timm</span>
                      </div>                  
                    </div>
                  </label>            

                  {/* Radio button for "Tahap 4" */}
                  <label className="inline-flex items-center">
                  <input
                      type="radio"
                      className="form-radio text-biru-1"
                      value="Tahap 4"
                      checked={selectedStatus === "Tahap 4"}
                      onChange={() => setSelectedStatus("Tahap 4")}
                    />
                    <div className="grid grid-cols-1 ml-2 flex items-center w-full justify-between text-sm">
                      <div className="flex flex-row items-center justify-between">
                          <span className="text-black font-bold">04 Januari 2024</span>
                          <div className="text-gray-700 opacity-50">09.30 WIB</div>
                        </div>
                        <div className = "flex items-venter space-x-60 mt-4">
                          <span className="text-gray-700">Pengaduan anda Tidak Lengkap, Harap Dilengkapi</span>
                        </div>                  
                      </div>
                    </label>  

                  {/* Radio button for "Tahap 5" */}
                  <label className="inline-flex items-center">
                  <input
                      type="radio"
                      className="form-radio text-biru-1"
                      value="Tahap 5"
                      checked={selectedStatus === "Tahap 5"}
                      onChange={() => setSelectedStatus("Tahap 5")}
                    />
                    <div className="grid grid-cols-1 ml-2 flex items-center w-full justify-between text-sm">
                      <div className="flex flex-row items-center justify-between">
                          <span className="text-black font-bold">05 Januari 2024</span>
                          <div className="text-gray-700 opacity-50">14.00 WIB</div>
                        </div>
                        <div className = "flex flex-col item-venter mt-4">
                          <span className="text-gray-700">Pengaduan anda dirujuk ke sistem pusat, harap menunggu kabar</span>
                          <span className="text-gray-700">lebih lanjut</span>
                        </div>                  
                      </div>
                    </label>  

                  {/* Radio button for "Tahap 6" */}
                  <label className="inline-flex items-center">
                  <input
                      type="radio"
                      className="form-radio text-biru-1"
                      value="Tahap 6"
                      checked={selectedStatus === "Tahap 6"}
                      onChange={() => setSelectedStatus("Tahap 6")}
                    />
                    <div className="grid grid-cols-1 ml-2 flex items-center w-full justify-between text-sm">
                      <div className="flex flex-row items-center justify-between">
                          <span className="text-black font-bold">06 Januari 2024</span>
                          <div className="text-gray-700 opacity-50">10.00 WIB</div>
                        </div>
                        <div className = "flex items-venter mt-4">
                          <span className="text-gray-700">Pengaduan anda selesai diproses</span>
                        </div>                  
                      </div>
                    </label>  

                </div>
              </div>
              
              {buttonClicked && (
                <div className="mb-4">
                  <p className="text-gray-700">{keterangan}</p>
                </div>
              )}
            </div>
          </div>
        </div>
      </div>
    </div>    
  );
  
}

export default FormStatus;
