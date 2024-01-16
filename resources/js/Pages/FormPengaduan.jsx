import React from "react";

function FormPengaduan(){
    return(
        <div className="container mx-auto p-4">
            <div className="bg-white shadow-md rounded mx-40 px-8 pt-1 pb-8 mb-4">
                <div className="border-b border-biru-1 py-1">
                    <h1 className="text-sm text-biru-1 inline-block">Identitas Pelapor</h1>
                </div>
                <div className="mx-40">
                    <div className="mt-7 mb-4">
                        <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="nama">
                            Nama
                        </label>
                    <input className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline" id="nama" type="text" placeholder="Isi nama anda" />
                    </div>

                    <div className="mb-4">
                    <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="whatsapp">
                        Nomor WhatsApp
                    </label>
                    <input className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline" id="whatsapp" type="text" placeholder="Isi nomor whatsapp anda" />
                    </div>

                    <div className="mb-4">
                    <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="email">
                        Email
                    </label>
                    <input className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline" id="email" type="email" placeholder="Isi email anda" />
                    <p className="text-red-500 text-xs italic">Pastikan bahwa nomor handphone dan email yang anda masukkan sudah benar</p>
                    </div>
                </div>
                <div className="border-b border-biru-1 py-1">
                    <h1 className="text-sm text-biru-1 inline-block">Identitas Pelapor</h1>
                </div>
                <div className="mx-40">
                    <div className="mt-7 mb-4">
                        <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="nama">
                            Masalah yang dihadapi
                        </label>
                    <input className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline" id="nama" type="text" placeholder="Isi nama anda" />
                    </div>

                    <div className="mb-6">
                    <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="description">
                        Deskripsi Masalah
                    </label>
                    <textarea className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 mb-3 leading-tight focus:outline-none focus:shadow-outline" id="description" placeholder="Berikan deskripsi masalah sedetail dan sejelas mungkin" />
                    </div>

                    <div className="flex items-center justify-between">
                        <button className="bg-biru-1 hover:bg-blue-700 text-white font-bold py-2 px-24 rounded focus:outline-none focus:shadow-outline" type="button">
                            Buat Pengaduan
                        </button>
                    </div>
                </div>
            </div>
        </div>
    )
};

export default FormPengaduan;