import React, {useState} from "react";

const DashboardUser = () => {
    const initialData = [
        {
        id: '#TR32190312089',
        namaPelanggar: 'Kenang Alfa A.',
        tempatKejadian: 'Surabaya, Rungkut',
        tanggalKejadian: '27-02-2003',
        },
        {
        id: '#TR23178312782',
        namaPelanggar: 'Dennis M. Jethro',
        tempatKejadian: 'Surabaya, Jambangan',
        tanggalKejadian: '02-03-2039',
        },
        {
        id: '#TR23078329782',
        namaPelanggar: 'Asfa Lazuardi W.',
        tempatKejadian: 'Surabaya, Mulyosari',
        tanggalKejadian: '09-09-2045',
        },
    ];
  
    const [data, setData] = useState(initialData);
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
        const sorted = [...data];
        if (sortConfig.key) {
          sorted.sort((a, b) => {
            if (sortConfig.key === 'tanggalKejadian') {
              // Konversi tanggal ke format yang bisa dibandingkan langsung
              const dateA = new Date(
                a[sortConfig.key].split('-').reverse().join('-')
              ).getTime();
              const dateB = new Date(
                b[sortConfig.key].split('-').reverse().join('-')
              ).getTime();
    
              if (dateA < dateB) {
                return sortConfig.direction === 'ascending' ? -1 : 1;
              }
              if (dateA > dateB) {
                return sortConfig.direction === 'ascending' ? 1 : -1;
              }
            } else {
              // Untuk kolom selain tanggal
              if (a[sortConfig.key] < b[sortConfig.key]) {
                return sortConfig.direction === 'ascending' ? -1 : 1;
              }
              if (a[sortConfig.key] > b[sortConfig.key]) {
                return sortConfig.direction === 'ascending' ? 1 : -1;
              }
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

    return(
        <div className="font-medium">
            <div className="flex flex-col h-screen">
                <div className="bg-abu-1 h-20 w-screen shadow-inner">
                    <div className="flex bg-abu-1 h-full w-32">
                        <div className="flex ml-36">
                            <button className="bg-gray-700 p-3 px-6 mt-4 mx-2 rounded-t-lg">
                                <p className="text-abu-1 text-sm">
                                    Validasi
                                </p>
                            </button>

                            <button className="bg-gray-600 p-3 px-6 mt-4 mr-2 rounded-t-lg hover:bg-gray-700">
                                <p className="text-abu-1 text-sm">
                                    Review
                                </p>
                            </button>

                            <button className="bg-gray-500 p-3 px-6 mt-4 mr-2 rounded-t-lg hover:bg-gray-700">
                                <p className="text-abu-1 text-sm">
                                    Pending
                                </p>
                            </button>

                            <button className="bg-gray-400 p-3 px-6 mt-4 rounded-t-lg hover:bg-gray-700">
                                <p className="text-abu-1 text-sm">
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
                            {sortedData().map((item) => (
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
                    </div>

                </div>
            </div>
        </div>
    )
};

export default DashboardUser;