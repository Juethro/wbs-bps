<?php

namespace App\Http\Controllers;

use App\Mail\pelapor_notification;
use App\Mail\reviewer_notification;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Validator;
use Illuminate\Support\Facades\Mail;

use App\Models\email;

class EmailController extends Controller
{
    function fetchEmail()
    {
        $emaildata = email::all();

        return response()->json($emaildata);
        
    }

    function create(Request $request)
    {
        $validator = Validator::make($request->all(), [
            'email' => 'required|email|unique:emails',
            'role' => 'required|in:validator,kurator,dewan',
        ]);

        if ($validator->fails()) {
            return response()->json([
                'success' => false,
                'errors' => $validator->errors()->messages(),
            ], 422);
        }

        $validated = $validator->validate();
        $tujuan = $validated['email'];
        $role = $validated['role'];

        email::create($validated);
        $this->added_email($role, $tujuan);
        return response()->json([
            'success' => true,
            'message' => 'Email Saved!',
        ], 202);
    }

    // Archived
    // function edit(Request $request)
    // {
    //     try {
    //         $validated = Validator::make($request->all(), [
    //             'oldEmail' => ['required', 'email'],
    //             'oldRole' => ['required', 'in:1,2,3'],
    //             'newEmail' => ['required', 'email'],
    //             'newRole' => ['required', 'in:1,2,3']
    //         ])->validate();

    //     } catch (ValidationException $e) {
    //         return redirect()->back()->with(['msg' => 'Email sudah ada!'], 402)->withInput();
    //     }

    //     $foundEmail = Email::where('email', $validated['oldEmail'])
    //                        ->where('role', $validated['oldRole'])
    //                        ->first();

    //     if ($foundEmail) {
    //         // Update data dengan nilai baru
    //         $foundEmail->update([
    //             'email' => $validated['newEmail'],
    //             'role' => $validated['newRole']
    //         ]);

    //         // Redirect atau response sukses jika diperlukan
    //         return redirect()->back()->with(['msg' => 'Email Updated!'], 200)->withInput();

    //     } else {
    //         // Data tidak ditemukan
    //         return redirect()->back()->with(['msg' => 'Data Tidak Ditemukan!'], 404)->withInput();
    //     }
    // }

    function destroy(String $id)
    {
        $role = email::find($id)->role;
        $tujuan = email::find($id)->email;

        // Delete the user
        $res=email::where('id', $id)->delete();
        
        if($res){
            $this->removed_email($role, $tujuan);
            return redirect()->back()->with(['msg' => 'Success'], 204)->withInput();
        }else{
            return redirect()->back()->with(['msg' => 'Failed'], 404)->withInput();   
        }
    }

    function pelapor_email(String $ticket, String $status,String $tanggal, String $tujuan, String $instruksi = "")
    {
        switch ($status)
        {
            case 2:
                $subject = "[WBS] Laporan Telah Diterima BPS Kota Surabaya";
                $konten = '<section class="teks" style="padding: 0px 20px 20px 20px;">
                            <p>
                                Halo,
                                <br>
                                <br>
                                Kami ingin memberitahu bahwa laporan Anda dengan ID ' . $ticket . ' pada tanggal ' . $tanggal . ' telah diterima oleh BPS Kota Surabaya. Terima kasih atas partisipasinya.'.
                                ' <br>
                                <br>
                                Terima kasih,
                                Sistem
                            </p>
                        </section>';

                Mail::send(new pelapor_notification($ticket, $tanggal, $subject, $tujuan, $konten));
                // return new pelapor_notification($ticket, $tanggal, $tujuan ,$subject, $konten);
                break;

            case 1:
                $subject = "[WBS] Laporan Telah Diterima BPS Kota Surabaya";
                $konten = '<section class="teks" style="padding: 0px 20px 20px 20px;">
                            <p>
                                Halo,
                                <br>
                                <br>
                                Kami ingin memberitahu bahwa laporan Anda dengan ID ' . $ticket . ' pada tanggal ' . $tanggal . ' telah diterima oleh BPS Kota Surabaya. Terima kasih atas partisipasinya.'.
                                ' <br>
                                <br>
                                Terima kasih,
                                Sistem
                            </p>
                        </section>';

                Mail::send(new pelapor_notification($ticket, $tanggal, $subject, $tujuan, $konten));
                // return new pelapor_notification($ticket, $tanggal, $tujuan ,$subject, $konten);
                break;

            case 3:
                $subject = "[WBS] Laporan Perlu Diperbarui";
                $konten = '<section class="teks" style="padding: 0px 20px 20px 20px;">
                            <p>
                                Halo,
                                <br>
                                <br>
                                Diharapkan memperbarui laporan sesuai dengan instruksi dibawah ini:
                                <br><br> '
                                . $instruksi .
                                ' <br>
                                <br>
                                Terima kasih,
                                Sistem
                            </p>
                        </section>';


                Mail::send(new pelapor_notification($ticket, $tanggal, $subject, $tujuan, $konten));
                // return new pelapor_notification($ticket, $tanggal, $tujuan ,$subject, $konten);
                break;

            case 4:
                $subject = "[WBS] Kabar Laporan - ". $ticket;
                $konten = '<section class="teks" style="padding: 0px 20px 20px 20px;">
                            <p>
                                Halo,
                                <br>
                                <br>
                                Laporan yang anda kirim dengan ID '. $ticket .' sedang diproses oleh Tim Dewan kami. Harap menunggu kabar berikutnya. Untuk Tracking Laporan anda bisa kunjungi link ini.'.
                                ' <br>
                                <br>
                                Terima kasih,
                                Sistem
                            </p>
                        </section>';

                Mail::send(new pelapor_notification($ticket, $tanggal, $subject, $tujuan, $konten));
                // return new pelapor_notification($ticket, $tanggal, $tujuan ,$subject, $konten);
                break;

            case 5:
                $subject = "[WBS] Kabar Laporan - ". $ticket;
                $konten = '<section class="teks" style="padding: 0px 20px 20px 20px;">
                            <p>
                                Halo,
                                <br>
                                <br>
                                Laporan yang anda kirim dengan ID '. $ticket .' sedang diproses oleh Tim Kurator kami. Harap menunggu kabar berikutnya. Untuk Tracking Laporan anda bisa kunjungi link ini.'.
                                ' <br>
                                <br>
                                Terima kasih,
                                Sistem
                            </p>
                        </section>';

                Mail::send(new pelapor_notification($ticket, $tanggal, $subject, $tujuan, $konten));
                // return new pelapor_notification($ticket, $tanggal, $tujuan ,$subject, $konten);
                break;
            case 6:
                $subject = "[WBS] Kabar Laporan - ". $ticket;
                $konten = '<section class="teks" style="padding: 0px 20px 20px 20px;">
                            <p>
                                Halo,
                                <br>
                                <br>
                                Laporan yang anda kirim dengan ID '. $ticket .' sedang dalam proses penyelidikan. Harap menunggu kabar berikutnya. Untuk Tracking Laporan anda bisa kunjungi link ini.'.
                                ' <br>
                                <br>
                                Terima kasih,
                                Sistem
                            </p>
                        </section>';

                Mail::send(new pelapor_notification($ticket, $tanggal, $subject, $tujuan, $konten));
                // return new pelapor_notification($ticket, $tanggal, $tujuan ,$subject, $konten);
                break;

            case 7:
                $subject = "[WBS] Kabar Laporan - ". $ticket;
                $konten = '<section class="teks" style="padding: 0px 20px 20px 20px;">
                            <p>
                                Halo,
                                <br>
                                <br>
                                Mohon maaf, laporan yang anda kirim dengan ID '. $ticket .' tidak bisa kami proses, sehingga harus dikirim ke tingkat Provinsi. Harap menunggu kabar berikutnya. Untuk Tracking Laporan anda bisa kunjungi link ini.
                                '.
                                ' <br>
                                <br>
                                Terima kasih,
                                Sistem
                            </p>
                        </section>';

                Mail::send(new pelapor_notification($ticket, $tanggal, $subject, $tujuan, $konten));
                // return new pelapor_notification($ticket, $tanggal, $tujuan ,$subject, $konten);
                break;
            case 8:
                $subject = "[WBS] Kabar Laporan - ". $ticket;
                $konten = '<section class="teks" style="padding: 0px 20px 20px 20px;">
                            <p>
                                Halo,
                                <br>
                                <br>
                                Laporan yang anda kirim dengan ID '. $ticket .' terbukti. Laporan akan segera kami tindak lanjuti. Harap menunggu kabar berikutnya. Untuk Tracking Laporan anda bisa kunjungi link ini.
                                '.
                                ' <br>
                                <br>
                                Terima kasih,
                                Sistem
                            </p>
                        </section>';

                Mail::send(new pelapor_notification($ticket, $tanggal, $subject, $tujuan, $konten));
                // return new pelapor_notification($ticket, $tanggal, $tujuan ,$subject, $konten);
                break;
            case 9:
                $subject = "[WBS] Kabar Laporan - ". $ticket;
                $konten = '<section class="teks" style="padding: 0px 20px 20px 20px;">
                            <p>
                                Halo,
                                <br>
                                <br>
                                Laporan yang anda kirim dengan ID '. $ticket .' telah ditindaklanjuti'.
                                ' <br>
                                <br>
                                Terima kasih,
                                Sistem
                            </p>
                        </section>';

                Mail::send(new pelapor_notification($ticket, $tanggal, $subject, $tujuan, $konten));
                // return new pelapor_notification($ticket, $tanggal, $tujuan ,$subject, $konten);
                break;
        }
    }

    function reviewer_email(String $ticket,String $status, String $tujuan)
    {
        switch ($status)
        {
            case 1:
                $subject = "[Laporan Administratif] - Ticket ID ". $ticket;
                $konten = '<section class="teks" style="padding: 0px 20px 20px 20px;">
                            <p>
                                Halo Tim Validator,
                                <br>
                                <br>
                                Kami ingin memberitahu bahwa ada laporan baru yang perlu di review dengan ID ' . $ticket . '. Mohon waktu dan perhatiannya untuk mengevaluasi laporan ini.'.
                                ' <br>
                                <br>
                                Terima kasih,
                                Sistem
                            </p>
                        </section>';

                Mail::send(new reviewer_notification($ticket, $subject ,$tujuan, $konten));
                // return new reviewer_notification($ticket, $tujuan ,$subject, $konten);
                break;
            case 2:
                $subject = "[Laporan Teknis] - Ticket ID ". $ticket;
                $konten = '<section class="teks" style="padding: 0px 20px 20px 20px;">
                            <p>
                                Halo Tim Validator,
                                <br>
                                <br>
                                Kami ingin memberitahu bahwa ada laporan baru yang perlu di review dengan ID ' . $ticket . '. Mohon waktu dan perhatiannya untuk mengevaluasi laporan ini.'.
                                ' <br>
                                <br>
                                Terima kasih,
                                Sistem
                            </p>
                        </section>';

                Mail::send(new reviewer_notification($ticket, $subject ,$tujuan, $konten));
                // return new reviewer_notification($ticket, $tujuan ,$subject, $konten);
                break;
            case 3:
                $subject = "Laporan Direvisi";
                $konten = '<section class="teks" style="padding: 0px 20px 20px 20px;">
                            <p>
                                Halo Tim Validator,
                                <br>
                                <br>
                                Terdapat revisi laporan dengan ID ' . $ticket . '. Mohon lakukan review ulang.'.
                                ' <br>
                                <br>
                                Terima kasih,
                                Sistem
                            </p>
                        </section>';

                Mail::send(new reviewer_notification($ticket, $subject ,$tujuan, $konten));
                // return new reviewer_notification($ticket, $tujuan ,$subject, $konten);
                break;
            case 4:
                $subject = "[Laporan Administratif] - Ticket ID ". $ticket;
                $konten = '<section class="teks" style="padding: 0px 20px 20px 20px;">
                            <p>
                                Halo Tim Dewan,
                                <br>
                                <br>
                                Laporan baru telah diajukan untuk direview dengan ID ' . $ticket . '. Mohon tinjau dan berikan hasil penyelidikan anda.'.
                                ' <br>
                                <br>
                                Terima kasih,
                                Sistem
                            </p>
                        </section>';

                Mail::send(new reviewer_notification($ticket, $subject ,$tujuan, $konten));
                // return new reviewer_notification($ticket, $tujuan ,$subject, $konten);
                break;
            case 5:
                $subject = "[Laporan Teknis] - Ticket ID ". $ticket;
                $konten = '<section class="teks" style="padding: 0px 20px 20px 20px;">
                            <p>
                                Halo Tim Kurator,
                                <br>
                                <br>
                                Laporan baru telah diajukan untuk direview dengan ID ' . $ticket . '. Mohon tinjau dan berikan penyelidikan anda.'.
                                ' <br>
                                <br>
                                Terima kasih,
                                Sistem
                            </p>
                        </section>';

                Mail::send(new reviewer_notification($ticket, $subject ,$tujuan, $konten));
                // return new reviewer_notification($ticket, $tujuan ,$subject, $konten);
                break;
            case 6:
                dd($ticket);
                break;
            case 7:
                dd($ticket);
                break;
            case 8:
                dd($ticket);
                break;
            case 9:
                dd($ticket);
                break;
        }
    }
    
    function added_email(String $role, String $tujuan)
    {
        $ticket = '';
        $subject = "Anda Ditambahkan ke Dalam Tim ". $role;
        $konten = '<section class="teks" style="padding: 0px 20px 20px 20px;">
                    <p>
                        Halo,
                        <br>
                        <br>
                        Administrator telah menambahkan email anda ke dalam Tim '. $role .
                        ' <br>
                        <br>
                        Terima kasih,
                        Sistem
                    </p>
                </section>';

        Mail::send(new reviewer_notification($ticket, $subject ,$tujuan, $konten));
        // return new reviewer_notification($ticket, $subject, $tujuan, $konten);
                
    
    }
    function removed_email(String $role, String $tujuan)
    {
        $ticket = '';
        $subject = "Anda Dihapus Dari Tim ". $role;
        $konten = '<section class="teks" style="padding: 0px 20px 20px 20px;">
                    <p>
                        Halo,
                        <br>
                        <br>
                        Administrator telah menghapus email anda dari Tim '. $role .
                        ' <br>
                        <br>
                        Terima kasih,
                        Sistem
                    </p>
                </section>';

        Mail::send(new reviewer_notification($ticket, $subject ,$tujuan, $konten));
        // return new reviewer_notification($ticket, $subject, $tujuan, $konten);
                
    }
    
    function added_user(String $role, String $tujuan)
    {
        $ticket = '';  # ga penting cuma biar bisa make Mail
        $subject = "Anda Ditambahkan ke Dalam Tim ". $role;
        $konten = '<section class="teks" style="padding: 0px 20px 20px 20px;">
                    <p>
                        Halo,
                        <br>
                        <br>
                        Administrator telah menambahkan user anda ke dalam Tim '. $role .
                        ' <br>
                        <br>
                        Terima kasih,
                        Sistem
                    </p>
                </section>';

        Mail::send(new reviewer_notification($ticket, $subject ,$tujuan, $konten));
        // return new reviewer_notification($ticket, $subject, $tujuan, $konten);
                
    
    }
    function removed_user(String $role, String $tujuan)
    {
        $ticket = '';   # ga penting cuma biar bisa make Mail
        $subject = "Anda Dihapus Dari Tim ". $role;
        $konten = '<section class="teks" style="padding: 0px 20px 20px 20px;">
                    <p>
                        Halo,
                        <br>
                        <br>
                        Administrator telah menghapus user anda dari Tim '. $role .
                        ' <br>
                        <br>
                        Terima kasih,
                        Sistem
                    </p>
                </section>';

        Mail::send(new reviewer_notification($ticket, $subject ,$tujuan, $konten));
        // return new reviewer_notification($ticket, $subject, $tujuan, $konten);
                
    }

}
