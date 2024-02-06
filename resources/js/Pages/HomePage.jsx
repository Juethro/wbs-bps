import React, { useState } from "react";

function HomePage() {
  const [showSubMenu, setShowSubMenu] = useState(false);

  const containerStyle = {
    backgroundImage: "url('images/bpssby.jpg')",
    backgroundSize: "cover",
    backgroundPosition: "center",
    height: "100vh",
    display: "flex",
    flexDirection: "column",
    backgroundColor: "rgba(255, 255, 255, 0.5)",
  };

  const headerStyle = {
    backgroundColor: "rgba(255, 255, 255, 0.8)",
    padding: "10px",
    textAlign: "left",
  };

  const navbarStyle = {
    backgroundColor: "rgba(255, 255, 255, 0.5)",
    padding: "10px",
  };

  const navItemStyle = {
    marginRight: "20px",
    cursor: "pointer",
  };

  const submenuStyle = {
    listStyle: "none",
    margin: 0,
    padding: 0,
    display: "flex",
  };

  const mainContentStyle = {
    flex: 1,
    display: "flex",
    flexDirection: "column",
    alignItems: "center",
    justifyContent: "center",
    textAlign: "center",
  };

  const welcomeTextStyle = {
    color: "white",
    fontSize: "2em",
    background: "linear-gradient(to right, #0099FF, #0066CC)",
    WebkitBackgroundClip: "text",
    WebkitTextFillColor: "transparent",
  };

  const handleInfoClick = () => {
    setShowSubMenu(!showSubMenu);
  };


  const kalimatBawahBulatan = [
    "Periksa Kelengkapan Laporan Anda",
    "Isi Formulir Pengaduan",
    "Simpan Kode Akun utnuk Menjaga Kerahasiaan Akun Anda",
    "Pantau Pengaduan Anda melalui Status"
    ];


  return (
    <div>
      <div style={containerStyle}>
        <header style={headerStyle}>
          <h1>Badan Pusat Statistik</h1>
        </header>
        <nav style={navbarStyle}>
          <ul style={{ listStyle: "none", display: "flex", justifyContent: "flex-end" }}>
            <li style={navItemStyle}>BERANDA</li>
            <li style={navItemStyle} onClick={handleInfoClick}>
              INFORMASI
              {showSubMenu && (
                <ul style={submenuStyle}>
                  <li style={navItemStyle}>Kriteria Pengaduan</li>
                  <li style={navItemStyle}>Tata Cara Pengaduan</li>
                </ul>
              )}
            </li>
            <li style={navItemStyle}>TULIS PENGADUAN</li>
            <li style={navItemStyle}>PANTAU ADUAN</li>
          </ul>
        </nav>
        <main style={mainContentStyle}>
          <h2
            style={{
              ...welcomeTextStyle,
              background: "linear-gradient(to right, #0099FF, #0066CC)",
              WebkitBackgroundClip: "text",
              WebkitTextFillColor: "white",
              fontWeight: "bold",
              textShadow: "2px 2px 4px rgba(0, 0, 255, 0.5)",
            }}
          >
            Layanan Pengaduan
          </h2>
          <h2
            style={{
              ...welcomeTextStyle,
              background: "linear-gradient(to right, #0099FF, #0066CC)",
              WebkitBackgroundClip: "text",
              WebkitTextFillColor: "white",
              fontWeight: "bold",
              textShadow: "2px 2px 4px rgba(0, 0, 255, 0.5)",
            }}
          >
            Badan Pusat Statistik Kota Surabaya
          </h2>
          <h2
            style={{
              ...welcomeTextStyle,
              color: "white",
              fontSize: "1em",
              WebkitTextFillColor: "white",
            }}
          >
            Mari bersama-sama menyediakan kebutuhan data yang berkualitas bagi pemerintah dan masyarakat. Laporkan setiap pelanggaran kerja yang terjadi di Badan Pusat Statistik Kota Surabaya
          </h2>
        </main>
      </div>

      {/* Container baru dengan latar belakang putih */}
      <div style={{ backgroundColor: "white", padding: "20px", textAlign: "center" }}>
        <h2>
            <span style={{ fontWeight: "bold", color: "black", fontSize: "16px" }}>Definisi</span>{" "}
            <span style={{ fontWeight: "bold", color: "#0066CC", fontSize: "26px" }}>Layanan Pengaduan BPS Kota Surabaya?</span>
        </h2>
        <p style={{ fontSize: "16px", marginBottom: "25px" }}>
            Layanan Pengaduan BPS Kota Surabaya adalah sebuah layanan pengaduan dugaan tindak pelanggaran SOP (Standart Operasional Kerja) yang telah terjadi atau akan terjadi yang melibatkan pegawai dan mitra Badan Pusat Statistik Kota Surabaya. Pelanggaran ini dapat terjadi di lingkungan kerja BPS Kota Surabaya maupun ketika pengambilan data lapangan dilakukan.
        </p>

        <h2>
            <span style={{ fontWeight: "bold", color: "black", fontSize: "26px" }}>KRITERIA</span>{" "}
            <span style={{ fontWeight: "bold", color: "#0066CC", fontSize: "26px" }}>PENGADUAN</span>
        </h2>
        <p style={{ fontSize: "16px", marginBottom: "10px" }}>
            Syarat/Kriteria Laporan Agar Bisa Diproses Lebih Lanjut
        </p>

        {/* Garis horizontal */}
        <hr style={{ position: "absolute", width: "5cm", left: "50%", transform: "translateX(-50%)", borderColor: "#0066CC", borderWidth: "2px"}} />


        <div style={{ display: "flex", flexWrap: "wrap-reverse", justifyContent: "center", marginTop: "20px"}}>
            {/* Perulangan pertama untuk 3 kotak di atas */}
            {[
                { id: 1, title: "WHAT", description: "Apa perbuatan pelanggaran yang diketahui?" },
                { id: 2, title: "WHO", description: "Siapa yang terlibat dalam pelanggaran tersebut" },
                { id: 3, title: "WHERE", description: "Dimana tempat terjadinya  pelanggaran tersebut?" },
            ].map((item) => (
                <div key={item.id} style={{ width: "400px", height: "100px", backgroundColor: "#0066CC", color: "white", margin: "10px", display: "flex", flexDirection: "column", alignItems: "center", justifyContent: "center", transition: "background-color 0.3s", cursor: "pointer" }} 
                    onMouseEnter={(e) => e.target.style.backgroundColor = "green"} 
                    onMouseLeave={(e) => e.target.style.backgroundColor = "#0066CC"}>
                    <span style={{ fontSize: "20px", marginBottom: "5px", fontWeight: "bold" }}>{item.title}</span>
                    <span style={{ fontSize: "13px" }}>{item.description}</span>
                </div>
            ))}
            </div>

            <div style={{ display: "flex", flexWrap: "wrap-reverse", justifyContent: "center", marginBottom: "25px" }}>
            {/* Perulangan kedua untuk 3 kotak di bawah */}
            {[
                { id: 4, title: "WHEN", description: "Kapan waktu  pelanggaran tersebut dilakukan?" },
                { id: 5, title: "HOW", description: "Bagaimana pelanggaran tersebut dilakukan (modus, cara, dan sebagainya)" },
                { id: 6, title: "EVIDENCE", description: "Dilengkapi bukti permulaan (dokumen / gambar / rekaman) yang mendukung" },
            ].map((item) => (
                <div key={item.id} style={{ width: "400px", height: "100px", backgroundColor: "#0066CC", color: "white", margin: "10px", display: "flex", flexDirection: "column", alignItems: "center", justifyContent: "center", transition: "background-color 0.3s", cursor: "pointer" }} 
                    onMouseEnter={(e) => e.target.style.backgroundColor = "green"} 
                    onMouseLeave={(e) => e.target.style.backgroundColor = "#0066CC"}>
                    <span style={{ fontSize: "20px", marginBottom: "5px", fontWeight: "bold" }}>{item.title}</span>
                    <span style={{ fontSize: "13px" }}>{item.description}</span>
                </div>
            ))}
        </div>


        <h2>
            <span style={{ fontWeight: "bold", color: "black", fontSize: "26px" }}>TATA CARA</span>{" "}
            <span style={{ fontWeight: "bold", color: "#0066CC", fontSize: "26px" }}>PENGADUAN</span>
        </h2>
        <p style={{ fontSize: "16px" }}>
            Tata Cara Memebuat Pengaduan
        </p>

        {/* Garis horizontal */}
        <hr style={{ position: "absolute", width: "5cm", left: "50%", transform: "translateX(-50%)", borderColor: "#0066CC", borderWidth: "2px" }} />

        <div style={{ display: "flex", justifyContent: "center", marginTop: "20px" }}>
        {[1, 2, 3, 4].map((number, index) => (
            <div key={number} style={{ width: "50px", textAlign: "center", margin: "0 90px" }}>
            <div style={{ width: "50px", height: "50px", borderRadius: "50%", backgroundColor: "#0066CC", color: "white", display: "flex", alignItems: "center", justifyContent: "center", marginBottom: "5px" }}>
                {number}
            </div>
            <p style={{ fontSize: "12px" }}>{kalimatBawahBulatan[index]}</p>
            </div>
        ))}
        </div>




      </div>


    </div>
  );
}

export default HomePage;
