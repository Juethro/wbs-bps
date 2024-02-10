import React, { useState } from "react";

function HomePage() {
  const [showSubMenu, setShowSubMenu] = useState(false);
  const [showMenu, setShowMenu] = useState(false);

  const handleInfoClick = () => {
    setShowSubMenu(!showSubMenu);
  };

  const handleMenuClick = () => {
    setShowMenu(!showMenu);
  };

  return (
    <div className="bg-white m-0 p-0 h-screen">
        <nav>
          <div className="flex justify-between w-full top-0 left-0 z-10 bg-biru-2">
            <img src="../images/logobps.png" alt="BPS Kota Surabaya" className="p-2 h-14" />

            {/* Portrait Non Active */}
            <div className="flex justify-end mr-4 portrait:hidden">
              <a href="/" className="hover:bg-biru-3 text-white px-4 py-2 rounded-md flex items-center">Beranda</a>
              <div>
                <button 
                  className="hover:bg-biru-3 h-full text-white px-4 py-2 rounded-md"
                  onClick={()=>handleInfoClick()}
                >
                    Informasi
                </button>
                  {showSubMenu && (
                      <ul className="absolute text-white bg-biru-2 shadow-md z-10 mt-2 rounded-md w-24">
                        <li className="hover:bg-biru-3 p-2">
                          <a href="#kriteria">Kriteria Pengaduan</a>
                        </li>
                        <li className="hover:bg-biru-3 p-2">
                          <a href="#tatacara">Tata Cara Pengaduan</a>
                        </li>
                        <li className="hover:bg-biru-3 p-2">
                          <a href="#kontak">Kontak Informasi</a>
                        </li>
                      </ul>
                    )}
              </div>
              <a href="/pengaduan" className="hover:bg-biru-3 text-white px-4 py-2 rounded-md flex items-center">Tulis Pengaduan</a>
              <a href="/status" className="hover:bg-biru-3 text-white px-4 py-2 rounded-md flex items-center">Pantau Aduan</a>
            </div>

            {/* Portrait Active */}
            <div className="landscape:hidden px-2 pt-2">
                <button onClick={()=>handleMenuClick()}>
                  <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="white" className="w-9 h-full">
                    <path strokeLinecap="round" strokeLinejoin="round" d="M3.75 6.75h16.5M3.75 12h16.5m-16.5 5.25h16.5" />
                  </svg>
                </button>
            </div>
            
          </div>

          <div className="w-full top-14 left-0 h-2 bg-kuning-1"></div>
          <div className="w-full top-16 left-0 h-2 bg-hijau-1"></div>
          {showMenu && (
              <div className="bg-biru-2 absolute z-10 w-full text-center">
                <div className="flex flex-col">
                  <a href="/" className="hover:bg-biru-3 text-white px-4 py-4 rounded-md ">Beranda</a>
                </div>
                
                <div className="flex flex-col">
                  <button className="hover:bg-biru-3 h-full text-white px-4 py-4 rounded-md" onClick={()=>handleInfoClick()}>
                    Informasi
                  </button>
                    {showSubMenu && (
                        <ul className="text-white bg-biru-2 shadow-md z-10 mt-2 rounded-md text-center">
                          <li className="bg-biru-3 px-2 py-4">
                            <a href="#kriteria">Kriteria Pengaduan</a>
                          </li>
                          <li className="bg-biru-3 px-2 py-4">
                            <a href="#tatacara">Tata Cara Pengaduan</a>
                          </li>
                          <li className="bg-biru-3 px-2 py-4">
                            <a href="#kontak">Kontak Informasi</a>
                          </li>
                        </ul>
                      )}
                </div>

                <div className="flex flex-col">
                  <a href="/pengaduan" className="hover:bg-biru-3 text-white px-4 py-4 rounded-md ">Tulis Pengaduan</a>
                </div>
                
                <div className="flex flex-col">
                  <a href="/status" className="hover:bg-biru-3 text-white px-4 py-4 rounded-md ">Pantau Aduan</a>
                </div>
              </div>
            )}
        </nav>

        <section className="flex flex-col text-center align-middle justify-center landscape:h-[40vw] portrait:h-[70vh]" style={{backgroundImage: "url('images/bpssby.jpg')", backgroundSize: "cover", backgroundPosition: "center"}}>
          <h2 className="text-white text-5xl font-bold shadow-x-2 shadow-y-2 shadow-blur-1 drop-shadow-[2px_2px_4px_rgba(0,0,255,0.5)] bg-clip-text bg-gradient-to-r from-blue-500 to-blue-700 mb-3 ">
            Layanan Pengaduan
          </h2>
          <h2 className="text-white text-4xl font-bold shadow-x-2 shadow-y-2 shadow-blur-1 drop-shadow-[2px_2px_4px_rgba(0,0,255,0.5)] bg-clip-text bg-gradient-to-r from-blue-500 to-blue-700 mb-3 ">
            Badan Pusat Statistik Kota Surabaya
          </h2>
          <h2 class="text-white drop-shadow-lg max-w-[50vw] mx-auto">
            Mari bersama-sama menyediakan kebutuhan data yang berkualitas bagi pemerintah dan masyarakat. Laporkan setiap pelanggaran kerja yang terjadi di Badan Pusat Statistik Kota Surabaya.
          </h2>
        </section>

        <section id="definisi" className="bg-white pt-12 px-12">
          <div className="container mx-auto text-center">
            <h2 className="text-3xl font-bold text-gray-800 mb-4">
              <span className="text-gray-400">Definisi</span> Layanan Pengaduan BPS Kota Surabaya?
            </h2>
            <p className="text-lg text-gray-600 mb-12 max-w-[60vw] mx-auto">
              Layanan Pengaduan BPS Kota Surabaya adalah sebuah layanan pengaduan dugaan tindak pelanggaran SOP (Standart Operasional Kerja) yang telah terjadi atau akan terjadi yang melibatkan pegawai dan mitra Badan Pusat Statistik Kota Surabaya. Pelanggaran ini dapat terjadi di lingkungan kerja BPS Kota Surabaya maupun ketika pengambilan data lapangan dilakukan.
            </p>
          </div>
        </section>
        
        <section id="kriteria" className="bg-white pt-12 px-12 mb-6">
          <div className="container mx-auto text-center">
            <h2 className="text-3xl font-bold text-gray-800 mb-4">
              <span className="text-gray-400">KRITERIA</span> PENGADUAN
            </h2>
            <p className="text-lg text-gray-600 mb-4 ">
              Syarat/Kriteria Laporan Agar Bisa Diproses Lebih Lanjut
            </p>

            <div className="grid sm:grid-cols-2 md:grid-cols-3 gap-4 mb-4">
              <div className="bg-kuning-1 hover:bg-hijau-1 duration-300 text-white px-4 py-8 rounded-md flex flex-col items-center justify-center">
                <span className="text-3xl font-bold">WHAT</span>
                <span className="text-lg text-center">Apa perbuatan pelanggaran yang diketahui?</span>
              </div>
              <div className="bg-kuning-1 hover:bg-hijau-1 duration-300 text-white px-4 py-8 rounded-md flex flex-col items-center justify-center">
                <span className="text-3xl font-bold">WHO</span>
                <span className="text-lg text-center">Siapa yang terlibat dalam pelanggaran tersebut?</span>
              </div>
              <div className="bg-kuning-1 hover:bg-hijau-1 duration-300 text-white px-4 py-8 rounded-md flex flex-col items-center justify-center">
                <span className="text-3xl font-bold">WHERE</span>
                <span className="text-lg text-center">Dimana tempat terjadinya  pelanggaran tersebut?</span>
              </div>
              <div className="bg-kuning-1 hover:bg-hijau-1 duration-300 text-white px-4 py-8 rounded-md flex flex-col items-center justify-center">
                <span className="text-3xl font-bold">WHEN</span>
                <span className="text-lg text-center">Kapan waktu  pelanggaran tersebut dilakukan?</span>
              </div>
              <div className="bg-kuning-1 hover:bg-hijau-1 duration-300 text-white px-4 py-8 rounded-md flex flex-col items-center justify-center">
                <span className="text-3xl font-bold">HOW</span>
                <span className="text-lg text-center">Bagaimana pelanggaran tersebut dilakukan (modus, cara, dan sebagainya)</span>
              </div>
              <div className="bg-kuning-1 hover:bg-hijau-1 duration-300 text-white px-4 py-8 rounded-md flex flex-col items-center justify-center">
                <span className="text-3xl font-bold">EVIDENCE</span>
                <span className="text-lg text-center">Dilengkapi bukti permulaan (dokumen / gambar / rekaman) yang mendukung</span>
              </div>
            </div>
          </div>
        </section>

        <section id="tatacara" className="bg-white pt-12 px-12 mb-4">
          <div className="container mx-auto text-center w-[70vw]">
            <h2 className="text-3xl font-bold text-gray-800 mb-4">
              <span className="text-gray-400">TATA CARA</span> PENGADUAN
            </h2>
            <p className="text-lg text-gray-600 mb-12">
              Tata Cara Memebuat Pengaduan
            </p>

            <div className="grid sm:grid-cols-2 md:grid-cols-3 gap-4 mb-4">
              <div className="text-center">
                <div className="w-[16vh] h-[16vh] duration-100 bg-white hover:bg-blue-600 border-blue-600 hover:border-transparent border-4 text-blue-600 hover:text-white rounded-full flex items-center mx-auto mb-3">
                  <div className="text-6xl mx-auto ">
                    <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor" className="w-12 h-12">
                      <path d="M12 9a3.75 3.75 0 1 0 0 7.5A3.75 3.75 0 0 0 12 9Z" />
                      <path fillRule="evenodd" d="M9.344 3.071a49.52 49.52 0 0 1 5.312 0c.967.052 1.83.585 2.332 1.39l.821 1.317c.24.383.645.643 1.11.71.386.054.77.113 1.152.177 1.432.239 2.429 1.493 2.429 2.909V18a3 3 0 0 1-3 3h-15a3 3 0 0 1-3-3V9.574c0-1.416.997-2.67 2.429-2.909.382-.064.766-.123 1.151-.178a1.56 1.56 0 0 0 1.11-.71l.822-1.315a2.942 2.942 0 0 1 2.332-1.39ZM6.75 12.75a5.25 5.25 0 1 1 10.5 0 5.25 5.25 0 0 1-10.5 0Zm12-1.5a.75.75 0 1 0 0-1.5.75.75 0 0 0 0 1.5Z" clipRule="evenodd" />
                    </svg>
                  </div>
                </div>
                <p className="text-lg text-gray-600 mb-12">
                  Kumpulkan Bukti Pelanggaran
                </p>
              </div>

              <div className="text-center">
                <div className="w-[16vh] h-[16vh] duration-100 bg-white hover:bg-blue-600 border-blue-600 hover:border-transparent border-4 text-blue-600 hover:text-white rounded-full flex items-center mx-auto mb-3">
                  <div className="text-6xl mx-auto ">
                    <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor" className="w-12 h-12">
                      <path fillRule="evenodd" d="M7.502 6h7.128A3.375 3.375 0 0 1 18 9.375v9.375a3 3 0 0 0 3-3V6.108c0-1.505-1.125-2.811-2.664-2.94a48.972 48.972 0 0 0-.673-.05A3 3 0 0 0 15 1.5h-1.5a3 3 0 0 0-2.663 1.618c-.225.015-.45.032-.673.05C8.662 3.295 7.554 4.542 7.502 6ZM13.5 3A1.5 1.5 0 0 0 12 4.5h4.5A1.5 1.5 0 0 0 15 3h-1.5Z" clipRule="evenodd" />
                      <path fillRule="evenodd" d="M3 9.375C3 8.339 3.84 7.5 4.875 7.5h9.75c1.036 0 1.875.84 1.875 1.875v11.25c0 1.035-.84 1.875-1.875 1.875h-9.75A1.875 1.875 0 0 1 3 20.625V9.375ZM6 12a.75.75 0 0 1 .75-.75h.008a.75.75 0 0 1 .75.75v.008a.75.75 0 0 1-.75.75H6.75a.75.75 0 0 1-.75-.75V12Zm2.25 0a.75.75 0 0 1 .75-.75h3.75a.75.75 0 0 1 0 1.5H9a.75.75 0 0 1-.75-.75ZM6 15a.75.75 0 0 1 .75-.75h.008a.75.75 0 0 1 .75.75v.008a.75.75 0 0 1-.75.75H6.75a.75.75 0 0 1-.75-.75V15Zm2.25 0a.75.75 0 0 1 .75-.75h3.75a.75.75 0 0 1 0 1.5H9a.75.75 0 0 1-.75-.75ZM6 18a.75.75 0 0 1 .75-.75h.008a.75.75 0 0 1 .75.75v.008a.75.75 0 0 1-.75.75H6.75a.75.75 0 0 1-.75-.75V18Zm2.25 0a.75.75 0 0 1 .75-.75h3.75a.75.75 0 0 1 0 1.5H9a.75.75 0 0 1-.75-.75Z" clipRule="evenodd" />
                    </svg>
                  </div>
                </div>
                <p className="text-lg text-gray-600 mb-12">
                  Isi Formulir Pengaduan
                </p>
              </div>

              <div className="text-center">
                <div className="w-[16vh] h-[16vh] duration-100 bg-white hover:bg-blue-600 border-blue-600 hover:border-transparent border-4 text-blue-600 hover:text-white rounded-full flex items-center mx-auto mb-3">
                  <div className="text-6xl mx-auto ">
                    <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor" className="w-12 h-12">
                      <path fillRule="evenodd" d="M12 2.25c-5.385 0-9.75 4.365-9.75 9.75s4.365 9.75 9.75 9.75 9.75-4.365 9.75-9.75S17.385 2.25 12 2.25ZM12.75 6a.75.75 0 0 0-1.5 0v6c0 .414.336.75.75.75h4.5a.75.75 0 0 0 0-1.5h-3.75V6Z" clipRule="evenodd" />
                    </svg>
                  </div>
                </div>
                <p className="text-lg text-gray-600 mb-12">
                  Pantau Aduan
                </p>
              </div>
            </div>
          </div>
        </section>
        
        <section id="kontak" className="bg-white pt-4 px-12 mb-8">
          <div className="container mx-auto text-center">
            <h2 className="text-3xl font-bold text-gray-800 mb-4">
                <span className="text-gray-400">KONTAK</span> INFORMASI
            </h2>
            <p className="text-lg text-gray-600 mb-4 ">
                Untuk informasi lebih lanjut bisa menghubungi kontak dibawah ini 
            </p>
            <div className="flex gap-6 justify-center">
                <a href="#" className="py-2 px-8 bg-white hover:bg-green-400 border-2 border-green-400 hover:border-transparent text-green-400 hover:text-white rounded-full">
                    Whatsapp
                </a>
                <a href="#" className="py-2 px-8 bg-white hover:bg-pink-500 border-2 border-pink-500 hover:border-transparent text-pink-500 hover:text-white rounded-full">
                    Instagram
                </a>
            </div>
          </div>
        </section>

        <footer className="bg-biru-2">
          <p className="text-white text-center text-sm">
            © 2024 Badan Pusat Statistik Kota Surabaya - surabayakota.bps.go.id
          </p>
        </footer>

    </div>
  );
}

export default HomePage;
