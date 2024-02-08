import React, { useState, useEffect } from "react";
import { router, usePage } from '@inertiajs/react';

function AdminRole(){
    const [data, setData] = useState(null);
    const [currentPage, setCurrentPage] = useState(1);
    const [postPerPage] = useState(10);
    const [createData, setCreateData] = useState({
        nama: '',
        email: '',
        passw: '',
        role: '',
    });
    const {errors} = usePage().props;

    const handleChange= (e) => {
        const { name, value } = e.target;
        setCreateData((prev) => ({
            ...prev,
            [name]: value,
        }));
    }

    const handleSubmit = (e) => {
        e.preventDefault();
        console.log({...createData});
        router.post('/dashboard/users/store', {...createData});
        fetchData();
    };

    const deleteUser = (id) => {
        const confirmed = window.confirm("Apakah Anda yakin ingin menghapus pengguna ini?");

        if (confirmed){
            router.delete('/dashboard/users/destroy/'+id);
            fetchData();
        }
    }

    const fetchData = async () => {
        try {
          const response = await fetch('/dashboard/users');
          const jsonData = await response.json();
          setData(jsonData);
        } catch (error) {
          console.error('Error fetching data:', error);
        }
      };

    useEffect(() => {
        fetchData();
      }, []);

    const [sortConfig, setSortConfig] = useState({
        key: null,
        direction: 'ascending',
    });

    const requestSort = (key) => {
        let direction = 'ascending';
        if (sortConfig.key === key && sortConfig.direction === 'ascending') {
        direction = 'descending';
        }
        setSortConfig({ key, direction });
    };

    const sortedData = () => {
        if (!data) return [];
        const sorted = [...data];
        if (sortConfig.key) {
          sorted.sort((a, b) => {
              // Untuk kolom selain tanggal
              if (a[sortConfig.key] < b[sortConfig.key]) {
                return sortConfig.direction === 'ascending' ? -1 : 1;
              }
              if (a[sortConfig.key] > b[sortConfig.key]) {
                return sortConfig.direction === 'ascending' ? 1 : -1;
              }
            return 0;
          });
        }
      return sorted;
    };

    const renderArrow = (key) => {
        return (
        <svg
            key={key}
            className={`w-3 h-3 ms-1.5 ${
            sortConfig.key === key ? (sortConfig.direction === 'descending' ? 'rotate-180' : '') : 'text-white'
            }`}
            aria-hidden="true"
            xmlns="http://www.w3.org/2000/svg"
            fill="currentColor"
            viewBox="0 0 24 24"
        >
            <path d="M8.574 11.024h6.852a2.075 2.075 0 0 0 1.847-1.086 1.9 1.9 0 0 0-.11-1.986L13.736 2.9a2.122 2.122 0 0 0-3.472 0L6.837 7.952a1.9 1.9 0 0 0-.11 1.986 2.074 2.074 0 0 0 1.847 1.086Zm6.852 1.952H8.574a2.072 2.072 0 0 0-1.847 1.087 1.9 1.9 0 0 0 .11 1.985l3.426 5.05a2.123 2.123 0 0 0 3.472 0l3.427-5.05a1.9 1.9 0 0 0 .11-1.985 2.074 2.074 0 0 0-1.846-1.087Z" />
        </svg>
        );
    };

    const lastPostIndex = currentPage * postPerPage;
    const firstPostIndex = lastPostIndex - postPerPage;
    const currentUser = sortedData(data, sortConfig).slice(firstPostIndex, lastPostIndex);

    const paginate = (pageNumber) => {
        setCurrentPage(pageNumber);
    };

    return(
        <div className="relative overflow-x-auto shadow-md w-full bg-gray-700 flex flex-col">
            <div className="bg-gray-100 font-bold p-4 w-full text-2xl">
                --New User--
            </div>
            <div className="flex flex-row align-middle bg-gray-50">
                <div className="flex align-middle p-4 flex-col">
                    <label className="block text-gray-700 text-md font-bold mb-2" htmlFor="namaUser">
                        Nama User
                    </label>
                    <input className="shadow appearance-none border border-black rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:border-biru-1" id="namaUser" name="nama" type="text" placeholder="Nama User" value={createData.nama} onChange={handleChange}/>
                </div>
                <div className="flex align-middle p-4 flex-col">
                    <label className="block text-gray-700 text-md font-bold mb-2" htmlFor="emailUser">
                        Email User
                    </label>
                    <input className="shadow appearance-none border border-black rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:border-biru-1" id="emailUser" name="email" type="email" placeholder="Email" value={createData.email} onChange={handleChange}/>
                </div>
                <div className="flex align-middle p-4 flex-col">
                    <label className="block text-gray-700 text-md font-bold mb-2" htmlFor="passw">
                        Password
                    </label>
                    <input className="shadow appearance-none border border-black rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:border-biru-1" id="passw" name="passw" type="password" placeholder="Password" value={createData.passw} onChange={handleChange}/>
                </div>
                <div className="flex align-middle p-4 flex-col">
                    <label className=" text-gray-700 text-md font-bold mb-2" htmlFor="role">
                        Role
                    </label>
                    <div className="relative">
                        <select className="block appearance-none w-full bg-white border border-black hover:border-gray-500 px-4 py-2 pr-8 rounded shadow leading-tight focus:outline-none focus:border-biru-1 text-sm" 
                        id="role"
                        name="role"
                        onChange={handleChange}>
                            <option value={null}>Pilih Role</option>
                            <option value="admin">Admin</option>
                            <option value="validator">Tim Validator</option>
                            <option value="kurator">Tim Kurator</option>
                            <option value="dewan">Tim Dewan</option>
                        </select>
                        <div className="pointer-events-none absolute inset-y-0 right-0 flex items-center px-2 text-gray-700">
                            <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-4 h-4">
                                <path strokeLinecap="round" strokeLinejoin="round" d="m19.5 8.25-7.5 7.5-7.5-7.5" />
                            </svg>
                        </div>
                    </div>
                    
                </div>
                <div className="flex align-middle p-4 flex-col justify-end">
                    <button 
                        className="bg-gray-100 hover:bg-gray-500 hover:text-white border-2 px-6 py-1 rounded-md"
                        type="submit"
                        onClick={handleSubmit}
                    >
                        Create
                    </button>
                </div>

            </div>

            {/* Error Messages */}
            <div className="bg-gray-50 flex flex-row px-4">
                {errors && Object.keys(errors).map(key => (
                    <div key={key} className="text-red-500 text-xs italic mt-2 mr-2">
                        {errors[key]}
                    </div>
                ))}
            </div>
            
            {/* User Table */}
            <div className="bg-gray-100 font-bold p-4 w-full text-2xl">
                --User Table--
            </div>
            <div className="relative overflow-x-auto shadow-md h-full w-full bg-gray-700">
                <table className="w-full text-sm text-left rtl:text-right text-gray-500 dark:text-gray-400">
                    <thead className="text-xs text-gray-700 uppercase bg-gray-50 dark:bg-gray-700 dark:text-gray-400">
                        <tr>
                            <th
                            scope="col"
                            className="px-6 py-3 cursor-pointer"
                            onClick={() => requestSort('namaUser')}
                            >
                                <div className="flex items-center">
                                    Nama User
                                    {renderArrow('namaUser')}
                                </div>
                            </th>
                            <th
                            scope="col"
                            className="px-6 py-3 cursor-pointer"
                            onClick={() => requestSort('email')}
                            >
                                <div className="flex items-center">
                                    Email
                                    {renderArrow('email')}
                                </div>
                            </th>
                            <th
                            scope="col"
                            className="px-6 py-3 cursor-pointer"
                            onClick={() => requestSort('role')}
                            >
                                <div className="flex items-center">
                                    Role
                                    {renderArrow('role')}
                                </div>
                            </th>
                            <th scope="col" className="px-6 py-3">
                                
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
                                {item.name}
                            </th>
                            <td className="px-6 py-4">{item.email}</td>
                            <td className="px-6 py-4">{item.role}</td>
                            <td className="px-6 py-4">
                                <button className="bg-red-500 hover:bg-red-700 py-2 w-full flex justify-center rounded-md" 
                                        onClick={() => deleteUser(item.id)}>
                                    <svg 
                                        xmlns="http://www.w3.org/2000/svg" 
                                        fill="none" 
                                        viewBox="0 0 24 24" 
                                        strokeWidth={1.5} 
                                        stroke="white" 
                                        className="w-6 h-6">
                                        <path 
                                            strokeLinecap="round" strokeLinejoin="round" d="m14.74 9-.346 9m-4.788 0L9.26 9m9.968-3.21c.342.052.682.107 1.022.166m-1.022-.165L18.16 19.673a2.25 2.25 0 0 1-2.244 2.077H8.084a2.25 2.25 0 0 1-2.244-2.077L4.772 5.79m14.456 0a48.108 48.108 0 0 0-3.478-.397m-12 .562c.34-.059.68-.114 1.022-.165m0 0a48.11 48.11 0 0 1 3.478-.397m7.5 0v-.916c0-1.18-.91-2.164-2.09-2.201a51.964 51.964 0 0 0-3.32 0c-1.18.037-2.09 1.022-2.09 2.201v.916m7.5 0a48.667 48.667 0 0 0-7.5 0" />
                                    </svg>
                                </button>
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
        </div>
        
    )
}

export default AdminRole;