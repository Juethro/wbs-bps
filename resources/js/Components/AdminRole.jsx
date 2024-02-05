import React, { useState } from "react";

function AdminRole(){

    return(
        <div className="relative overflow-x-auto shadow-md w-full bg-gray-700">
            <table className="w-full text-sm text-left rtl:text-right text-gray-500 dark:text-gray-400">
                <thead className="text-xs text-gray-700 uppercase bg-gray-50 dark:bg-gray-700 dark:text-gray-400">
                <tr>
                    <th
                    scope="col"
                    className="px-6 py-3 cursor-pointer"
                    onClick={() => requestSort('id')}
                    >
                    <div className="flex items-center">
                        ID Pengaduan
                        {renderArrow('id')}
                    </div>
                    </th>
                    <th
                    scope="col"
                    className="px-6 py-3 cursor-pointer"
                    onClick={() => requestSort('namaPelanggar')}
                    >
                    <div className="flex items-center">
                        Nama Pelanggar
                        {renderArrow('namaPelanggar')}
                    </div>
                    </th>
                    <th
                    scope="col"
                    className="px-6 py-3 cursor-pointer"
                    onClick={() => requestSort('tempatKejadian')}
                    >
                    <div className="flex items-center">
                        Tempat Kejadian
                        {renderArrow('tempatKejadian')}
                    </div>
                    </th>
                    <th
                    scope="col"
                    className="px-6 py-3 cursor-pointer"
                    onClick={() => requestSort('tanggalKejadian')}
                    >
                    <div className="flex items-center">
                        Tanggal Kejadian
                        {renderArrow('tanggalKejadian')}
                    </div>
                    </th>
                    <th scope="col" className="px-6 py-3">
                    <span className="sr-only">Detail</span>
                    </th>
                </tr>
                </thead>

                <tbody>
                {currentUser.map((item) => (
                    <tr
                    key={item.id}
                    className="bg-white border-b dark:bg-gray-800 hover:bg-gray-50 dark:hover:bg-gray-600"
                    >
                    <th
                        scope="row"
                        className="px-6 py-4 font-medium text-gray-900 whitespace-nowrap dark:text-white"
                    >
                        {item.id}
                    </th>
                    <td className="px-6 py-4">{item.namaPelanggar}</td>
                    <td className="px-6 py-4">{item.tempatKejadian}</td>
                    <td className="px-6 py-4">{item.tanggalKejadian}</td>
                    <td className="px-6 py-4 text-right">
                        <a
                        href="#"
                        className="font-medium text-blue-600 dark:text-blue-500 hover:underline"
                        >
                        Detail
                        </a>
                    </td>
                    </tr>
                ))}
                </tbody>
            </table>
            <nav aria-label="Page navigation example" className="flex justify-center absolute inset-x-0 bottom-0 w-full mb-4">
                <ul className="flex items-center -space-x-px h-8 text-sm">
                    <li>
                        <a
                            href="#"
                            onClick={() => paginate(currentPage - 1)}
                            className="flex items-center justify-center px-3 h-8 ms-0 leading-tight text-gray-500 bg-white border border-e-0 border-gray-300 rounded-s-lg hover:bg-gray-100 hover:text-gray-700 dark:bg-gray-800 dark:border-gray-700 dark:text-gray-400 dark:hover:bg-gray-700 dark:hover:text-white"
                        >
                            <span className="sr-only">Previous</span>
                            <svg
                            className="w-2.5 h-2.5 rtl:rotate-180"
                            aria-hidden="true"
                            xmlns="http://www.w3.org/2000/svg"
                            fill="none"
                            viewBox="0 0 6 10"
                            >
                            <path stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M5 1 1 5l4 4"/>
                            </svg>
                        </a>
                    </li>

                    {Array.from({ length: Math.ceil(sortedData().length / postPerPage) }, (_, index) => (
                    <li key={index + 1}>
                        <a
                        href="#"
                        onClick={() => paginate(index + 1)}
                        className={`flex items-center justify-center px-3 h-8 leading-tight text-gray-500 bg-white border border-gray-300 hover:bg-gray-100 hover:text-gray-700 dark:bg-gray-800 dark:border-gray-700 dark:text-gray-400 dark:hover:bg-gray-700 dark:hover:text-white ${index + 1 === currentPage ? 'font-bold' : ''}`}
                        >
                        {index + 1}
                        </a>
                    </li>
                    ))}

                    <li>
                    <a
                        href="#"
                        onClick={() => paginate(currentPage + 1)}
                        className="flex items-center justify-center px-3 h-8 leading-tight text-gray-500 bg-white border border-gray-300 rounded-e-lg hover:bg-gray-100 hover:text-gray-700 dark:bg-gray-800 dark:border-gray-700 dark:text-gray-400 dark:hover:bg-gray-700 dark:hover:text-white"
                    >
                        <span className="sr-only">Next</span>
                        <svg
                        className="w-2.5 h-2.5 rtl:rotate-180"
                        aria-hidden="true"
                        xmlns="http://www.w3.org/2000/svg"
                        fill="none"
                        viewBox="0 0 6 10"
                        >
                        <path stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="m1 9 4-4-4-4"/>
                        </svg>
                    </a>
                    </li>
                </ul>
            </nav>
        </div>
    )
}

export default AdminRole;