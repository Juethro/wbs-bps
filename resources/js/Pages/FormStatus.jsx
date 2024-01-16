import React, { useState } from "react";

function FormStatus() {
  const [buttonClicked, setButtonClicked] = useState(false);
  const [keterangan, setKeterangan] = useState("");
  const [selectedStatus, setSelectedStatus] = useState(""); // Menambah state untuk status radio button

  const handleButtonClick = () => {
    setButtonClicked(true);
    setKeterangan("Pengaduan Anda telah kami terima, mohon tunggu kabar berikutnya");
  };

  return (
    <div className="container mx-auto p-4">
      <div className="bg-white shadow-md rounded mx-40 px-8 pt-1 pb-8 mb-4">
        <div className="border-b border-biru-1 py-1">
          <h1 className="text-sm text-biru-1 inline-block">Detail</h1>
        </div>
        <div className="mx-40">
          <div className="mb-4">
            <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="KodeTiket">
              Kode Tiket
            </label>
            <input
              className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
              id="email"
              type="email"
              placeholder="Isi kode tiket Anda"
            />
            <p className="text-red-500 text-xs italic">Kode tiket anda telah diberikan lewat e-mail atau WhatsApp</p>
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
        <div className="border-b border-biru-1 py-1">
          <h1 className="text-sm text-biru-1 inline-block">Status</h1>
        </div>
        <div className="mx-40">
          <div className="mt-7 mb-4">
            <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="Status">
              Status Tiket
            </label>

            <div className="flex flex-col space-y-4">
              {/* Radio button for "Tahap 1" */}
              <label className="inline-flex items-center">
                <input
                  type="radio"
                  className="form-radio text-biru-1"
                  value="Tahap 1"
                  checked={selectedStatus === "Tahap 1"}
                  onChange={() => setSelectedStatus("Tahap 1")}
                />
                <div className="grid grid-cols-1 ml-2 flex items-center w-full justify-between">
                  <div className="flex items-center">
                      <span className="text-black font-bold">01 Januari 2024</span>
                    </div>
                    <div className = "flex items-venter space-x-40">
                      <span className="text-gray-700">Pengaduan anda diterima, mohon tunggu kabar berikutnya!</span>
                      <div className="text-gray-700">07.30 WIB</div>
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
                <div className="grid grid-cols-1 ml-2 flex items-center w-full justify-between">
                  <div className="flex items-center">
                      <span className="text-black font-bold">02 Januari 2024</span>
                    </div>
                    <div className = "flex items-venter space-x-60">
                      <span className="text-gray-700">Pengaduan anda dalam proses validasi oleh Tim</span>
                      <div className="text-gray-700">07.40 WIB</div>
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
                <div className="grid grid-cols-1 ml-2 flex items-center w-full justify-between">
                  <div className="flex items-center">
                      <span className="text-black font-bold">02 Januari 2024</span>
                    </div>
                    <div className = "flex items-venter space-x-60">
                      <span className="text-gray-700">Pengaduan anda dalam proses review oleh Timm</span>
                      <div className="text-gray-700">08.00 WIB</div>
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
                <div className="grid grid-cols-1 ml-2 flex items-center w-full justify-between">
                  <div className="flex items-center">
                      <span className="text-black font-bold">02 Januari 2024</span>
                    </div>
                    <div className = "flex items-venter space-x-60">
                      <span className="text-gray-700">Pengaduan anda Tidak Lengkap, Harap Dilengkapi</span>
                      <div className="text-gray-700">09.30 WIB</div>
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
                <div className="grid grid-cols-1 ml-2 flex items-center w-full justify-between">
                  <div className="flex items-center">
                      <span className="text-black font-bold">02 Januari 2024</span>
                    </div>
                    <div className = "flex items-venter space-x-10">
                      <span className="text-gray-700">Pengaduan anda dirujuk ke sistem pusat, harap menunggu kabar lebih lanjut</span>
                      <div className="text-gray-700">14.00 WIB</div>
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
                <div className="grid grid-cols-1 ml-2 flex items-center w-full justify-between">
                  <div className="flex items-center">
                      <span className="text-black font-bold">05 Januari 2024</span>
                    </div>
                    <div className = "flex items-venter space-x-60">
                      <span className="text-gray-700">Pengaduan anda selesai diproses</span>
                      <div className="text-gray-700">10.00 WIB</div>
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
  );
  
}

export default FormStatus;
