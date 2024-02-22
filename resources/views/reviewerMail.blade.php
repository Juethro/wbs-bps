<!DOCTYPE html>
<html lang="en">
<head>
    <link rel="preconnect" href="https://fonts.googleapis.com">
    <link rel="preconnect" href="https://fonts.gstatic.com" crossorigin>
    <link href="https://fonts.googleapis.com/css2?family=Poppins:ital,wght@0,100;0,200;0,300;0,400;0,500;0,600;0,700;0,800;0,900;1,100;1,200;1,300;1,400;1,500;1,600;1,700;1,800;1,900&display=swap" rel="stylesheet">
    
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <meta http-equiv="X-UA-Compatible" content="ie=edge">
    <title>Email Notification</title>

</head>
<body style="background-color: #E8E8E8; margin: 0px; font-family: 'Poppins', sans-serif;">
    <section style="background-color: #E8E8E8; display: flex; justify-content: center;">
        <section class="main-section" style="background-color: #ffffff; border-radius: 1rem; width: 450px; padding: 0px; position: relative;">
            <header style="background-color: #002B6A; padding: 10px 20px; text-align: left;">
                <img src='https://drive.google.com/uc?export=view&id=1oni9kIBvL_0lBhbHSOPlPcifcTJcMNOm' width="300px" alt="Logo Perusahaan">
            </header>

            <section class="kode" style="background-color: #D9D9D9; border-radius: 15px; text-align: center; margin: 20px 10px; padding: 1rem 0px">
                <h1 style="font-size: 32px; font-weight: bold; margin: 0px">Notifikasi</h1>
            </section>

            {!! $konten !!}

            <hr style="width: 370px">

            <footer style="font-size: 13px; padding: 0px 15px 15px 15px; text-align: center; color: #A4A4A4">
                <p>Ini adalah email otomatis mohon untuk tidak membalas email ini</p>
                <p>Jika kamu ingin melacak proses pengaduanmu bisa mengakses link cekstatus kami.</p>
            </footer>
        </section>
    </section>

</body>
</html>