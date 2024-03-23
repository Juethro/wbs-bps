import React, { useState, useEffect } from "react";
import NavbarForm from "../Components/NavbarForm";
import { router } from "@inertiajs/react";

function FormStatus() {
  const [search, setSearch] = useState({
    'ticket': "",
  });
  const [isNotFound, setIsNotFound] = useState(false);
  const [data, setData] = useState(null);
  console.log(data);

  const handleChange = (e) =>{
    const { name, value } = e.target;
    setSearch((prev) => ({
        ...prev,
        [name]: value,
    }));
  }

  const formRevisi = (e) => {
    console.log(e);
    router.post('/revisi', e);
  }
  
  // Post and catch response
  const csrfToken = document.head.querySelector("[name~=csrf_token][content]").content;
  const headers = new Headers({
    'Content-Type': 'application/json',
    'X-CSRF-TOKEN': csrfToken,  // Kunci post
  });
  const searchData = async (ticket) => {
    try {
      const response = await fetch('/status/track', {
        method: 'POST',
        headers: headers,
        body: JSON.stringify({ ticket }),
      });
      setIsNotFound(false);  // setiap fetch semua harus back to null
      setData(null)
  
      if (!response.ok) {
        setIsNotFound(!isNotFound);
      } else{
        const jsonData = await response.json();
        setData(jsonData);
      }
      
    } catch (error) {
      console.error('Error fetching data:', error);
    }
  };

  return (
    <div className="bg-contain bg-fixed bg-center min-h-[100vh]" style={{ backgroundImage: "url('images/bpssby.jpg')", backgroundSize: "cover" }}>
      <div className="bg-blue-500 bg-contain bg-opacity-45 min-h-[100vh]">
        
        <div>
          <NavbarForm/>
        </div>

        <div className="container mx-auto p-4">
          <div className="flex flex-col mt-32">
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

          <div className="bg-white shadow-md rounded landscape:lg:mx-40 portrait:mx-0 landscape:px-8 portrait:px-4 pt-1 pb-8 mt-12 mb-4">
            <div className="border-b border-biru-1 py-1 mt-5">
              <h1 className="text-sm text-biru-1 inline-block">Detail</h1>
            </div>

            <div className="flex flex-col landscape:mx-40 portrait:mx-0">
              <div className="mt-7 mb-4">
                <label className="block text-gray-700 text-md font-bold mb-2" htmlFor="KodeTiket">
                  Kode Tiket
                </label>

                <input
                  className="shadow appearance-none border rounded w-full py-3 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                  id="ticket"
                  name="ticket"
                  type="text"
                  value={search.ticket}
                  onChange={handleChange}
                  placeholder="Isi kode tiket Anda"
                />

                {isNotFound ? (
                  <p className="text-red-500 text-sm py-2 align-middle flex justify-center">Ticket ID tidak ditemukan!</p>
                ): ''}

                <div className="flex items-center text-red-500 text-xs italic mt-2">
                  <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth="1.5" stroke="currentColor" className="w-4 h-4 mr-1">
                    <path strokeLinecap="round" strokeLinejoin="round" d="M12 9v3.75m-9.303 3.376c-.866 1.5.217 3.374 1.948 3.374h14.71c1.73 0 2.813-1.874 1.948-3.374L13.949 3.378c-.866-1.5-3.032-1.5-3.898 0L2.697 16.126ZM12 15.75h.007v.008H12v-.008Z" />
                  </svg>

                  <span className="text-black">
                    Kode tiket anda telah diberikan lewat
                    <span className="font-bold"> Email</span> atau
                    <span className="font-bold"> WhatsApp</span> yang anda isi pada buat pengaduan
                  </span>
                </div>
              </div>

              <div className="flex items-center justify-center">
                <button
                  className="bg-biru-1 hover:bg-blue-700 text-white font-bold py-2 w-full rounded focus:outline-none focus:shadow-outline"
                  type="button"
                  name="ticket"
                  onClick={()=>searchData(search)}
                >
                  Cek Aduan
                </button>
              </div>
              {data && data.some(item => item.form_status === '1') && (
                <div className="flex items-center justify-center mt-2">
                  <button
                    className="bg-red-500 hover:bg-red-600 text-white font-bold w-full py-2 px-4 rounded"
                    type="button"
                    onClick={()=>formRevisi(data[0].ticket)}
                  >
                    Revisi Aduan
                  </button>
                </div>
              )}
            </div>
          </div>
          
          {data ? (
            <div className="bg-white shadow-md rounded landscape:lg:mx-40 portrait:mx-0 landscape:px-8 portrait:px-4 pt-1 pb-8 mt-12 mb-4">
                <div className="border-b border-biru-1 py-1 mt-5">
                  <h1 className="text-sm text-biru-1 inline-block">Riwayat Progress</h1>
                </div>
                <div>
                  {data ? (data.map((item) => (
                    <div key={item.id} className="flex flex-row justify-between landscape:mx-14 portrait:mx-0">
                      <div className="flex flex-row">
                        <div className={`border-l-4 border-gray-200 ml-3 py-3 mr-3 space-y-2 ${item.id === 0 ? 'mt-7' : item.id === data.length - 1 ? 'mb-7' : ''}`} /> {/* mt-7 khusus paling atas, mb-7 khusus paling bawah */}
                        <div className="relative">
                          <div className={`absolute top-5 -left-6 ${item.id === 0 ? 'bg-blue-400' : 'bg-[#ADADAD]'} h-5 w-5 rounded-full border-4 border-white`} /> {/* bg-blue-400 khusus paling atas */}
                          <div className="py-2">
                            <div className="font-bold text-sm">
                              {item.tanggal}
                            </div>
                            <div className="text-sm">
                              {item.description}
                            </div>
                          </div>
                        </div>
                      </div>
                      <div className="text-[#ADADAD] flex items-center text-sm min-w-[70px]">
                          {item.jam}
                      </div>
                    </div>
                  ))): ''}

                </div>
            </div>
          ):''}

        </div>
      </div>
    </div>    
  );
  
}

export default FormStatus;
