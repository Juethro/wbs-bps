import React from "react";

function DashboardUser(){
    return(
        <div>
            <div className="flex flex-col h-screen">
                <div className="bg-abu-1 h-20 w-screen shadow-inner">
                    <div className="flex bg-abu-1 h-full w-32">
                        <div className="flex ml-36">
                            <button className="bg-white p-3 px-6 mt-4 mx-2 rounded-t-lg">
                                <p className="text-black">
                                    Validasi
                                </p>
                            </button>

                            <button className="bg-abu-2 p-3 px-6 mt-4 mr-2 rounded-t-lg hover:bg-white">
                                <p className="text-black">
                                    Review
                                </p>
                            </button>

                            <button className="bg-abu-2 p-3 px-6 mt-4 mr-2 rounded-t-lg hover:bg-white">
                                <p className="text-black">
                                    Pending
                                </p>
                            </button>

                            <button className="bg-abu-2 p-3 px-6 mt-4 rounded-t-lg hover:bg-white">
                                <p className="text-black">
                                    Selesai
                                </p>
                            </button>
                        </div>
                    </div>
                </div>

                <div className="flex bg-white h-full w-screen">
                    <div className="flex flex-col bg-biru-2 h-full w-32">
                        <p className="text-white text-center mt-4">
                            Status
                        </p>

                        <button className="bg-biru-4 rounded-r-lg mr-3 py-3 px-2 mt-2 hover:bg-biru-4">
                            <p className="text-white text-xs">Administratif</p>
                        </button>

                        <button className="bg-biru-3 rounded-r-lg mr-2 py-3 px-2 mt-2 hover:bg-biru-4">
                            <p className="text-white text-xs">Teknis</p>
                        </button>

                        <p className="text-white text-center mt-8">
                            User
                        </p>

                        <button className="bg-biru-3 rounded-r-lg mr-2 py-3 px-2 mt-2 hover:bg-biru-4">
                            <p className="text-white text-xs">Role</p>
                        </button>
                    </div>
                    <div class="bg-white p-6 rounded-md shadow-md w-full">
                        <table class="w-full">
                            <thead>
                                <tr>
                                    <th class="py-2 px-4 border-b">ID</th>
                                    <th class="py-2 px-4 border-b">Masalah</th>
                                    <th class="py-2 px-4 border-b">Nama Pelanggar</th>
                                    <th class="py-2 px-4 border-b">Tempat Kejadian</th>
                                    <th class="py-2 px-4 border-b">Tanggal Kejadian</th>
                                    <th class="py-2 px-4 border-b">Deskripsi Masalah</th>
                                    <th class="py-2 px-4 border-b">Lampiran</th>
                                </tr>
                            </thead>

                            <tbody>
                                <tr>
                                    <td class="py-2 px-4 border-b">1</td>
                                    <td class="py-2 px-4 border-b">Teknis</td>
                                    <td class="py-2 px-4 border-b">John Doe</td>
                                    <td class="py-2 px-4 border-b">Jalan Raya 123</td>
                                    <td class="py-2 px-4 border-b">2024-01-25</td>
                                    <td class="py-2 px-4 border-b">Deskripsi singkat masalah...</td>
                                    <td class="py-2 px-4 border-b">
                                        <a href="#" class="text-blue-500">Lampiran.pdf</a>
                                    </td>
                                </tr>
                            </tbody>
                        </table>
                    </div>
                </div>
            </div>
        </div>
    )
};

export default DashboardUser;