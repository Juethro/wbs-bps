import React, {useState} from "react";
import DetailModal from "../DetailModal";

function TeknisValidasi(){
    const [currentPage, setCurrentPage] = useState(1);
    const [postPerPage] = useState(11);

    const initialData = [
        {
        id: '#TR32190312089',
        namaPelanggar: 'Kenang',
        tempatKejadian: 'Surabaya',
        tanggalKejadian: '27-02-2003',
        deskripsi: 'Ini Teknis',
        lampiran: 'bukti.pdf',
        },
        {
        id: '#TR23178312782',
        namaPelanggar: 'Dennis',
        tempatKejadian: 'Surabaya',
        tanggalKejadian: '02-03-2039',
        deskripsi: 'Penggunaan HP saat berkendara',
        lampiran: 'bukti.pdf',
        },
        {
        id: '#TR23078329782',
        namaPelanggar: 'Asfa Lazuardi W.',
        tempatKejadian: 'Surabaya, Mulyosari',
        tanggalKejadian: '09-09-2045',
        deskripsi: 'Penggunaan HP saat berkendara',
        lampiran: 'bukti.pdf',
        },
        {
        id: '#TR32190332131',
        namaPelanggar: 'Kenang Alfa A.',
        tempatKejadian: 'Surabaya, Rungkut',
        tanggalKejadian: '27-02-2003',
        deskripsi: 'Penggunaan HP saat berkendara',
        lampiran: 'bukti.pdf',
        },
        {
        id: '#TR23179870234',
        namaPelanggar: 'Dennis M. Jethro',
        tempatKejadian: 'Surabaya, Jambangan',
        tanggalKejadian: '02-03-2039',
        deskripsi: 'Penggunaan HP saat berkendara',
        lampiran: 'bukti.pdf',
        },
        {
        id: '#TR23078312894',
        namaPelanggar: 'Asfa Lazuardi W.',
        tempatKejadian: 'Surabaya, Mulyosari',
        tanggalKejadian: '09-09-2045',
        deskripsi: 'Penggunaan HP saat berkendara',
        lampiran: 'bukti.pdf',
        },
        {
        id: '#TR93412323133',
        namaPelanggar: 'Kenang Alfa A.',
        tempatKejadian: 'Surabaya, Rungkut',
        tanggalKejadian: '27-02-2003',
        deskripsi: 'Penggunaan HP saat berkendara',
        lampiran: 'bukti.pdf',
        },
        {
        id: '#TR09312989921',
        namaPelanggar: 'Dennis M. Jethro',
        tempatKejadian: 'Surabaya, Jambangan',
        tanggalKejadian: '02-03-2039',
        deskripsi: 'Penggunaan HP saat berkendara',
        lampiran: 'bukti.pdf',
        },
        {
        id: '#TR23321032978',
        namaPelanggar: 'Asfa Lazuardi W.',
        tempatKejadian: 'Surabaya, Mulyosari',
        tanggalKejadian: '09-09-2045',
        deskripsi: 'Penggunaan HP saat berkendara',
        lampiran: 'bukti.pdf',
        },
        {
        id: '#TR32196252089',
        namaPelanggar: 'Kenang Alfa A.',
        tempatKejadian: 'Surabaya, Rungkut',
        tanggalKejadian: '27-02-2003',
        deskripsi: 'Penggunaan HP saat berkendara',
        lampiran: 'bukti.pdf',
        },
        {
        id: '#TR23178312709',
        namaPelanggar: 'Dennis M. Jethro',
        tempatKejadian: 'Surabaya, Jambangan',
        tanggalKejadian: '02-03-2039',
        deskripsi: 'Penggunaan HP saat berkendara',
        lampiran: 'bukti.pdf',
        },
        {
        id: '#TR23321032910',
        namaPelanggar: 'Asfa Lazuardi W.',
        tempatKejadian: 'Surabaya, Mulyosari',
        tanggalKejadian: '09-09-2045',
        deskripsi: 'Penggunaan HP saat berkendara',
        lampiran: 'bukti.pdf',
        },
        {
        id: '#TR32196252323',
        namaPelanggar: 'Kenang Alfa A.',
        tempatKejadian: 'Surabaya, Rungkut',
        tanggalKejadian: '27-02-2003',
        deskripsi: 'Penggunaan HP saat berkendara',
        lampiran: 'bukti.pdf',
        },
        {
        id: '#TR23178312921',
        namaPelanggar: 'Dennis M. Jethro',
        tempatKejadian: 'Surabaya, Jambangan',
        tanggalKejadian: '02-03-2039',
        deskripsi: 'Penggunaan HP saat berkendara',
        lampiran: 'bukti.pdf',
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

    const lastPostIndex = currentPage * postPerPage;
    const firstPostIndex = lastPostIndex - postPerPage;
    const currentPosts = sortedData(initialData, sortConfig).slice(firstPostIndex, lastPostIndex);

    const paginate = (pageNumber) => {
        setCurrentPage(pageNumber);
    };

    return(
        <div className="h-full w-full flex flex-col relative overflow-x-auto shadow-md w-full bg-gray-700">
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
                {currentPosts.map((item) => (
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
                    <td className="px-6 py-4">
                        <DetailModal data={item} />
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

export default TeknisValidasi;