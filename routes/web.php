<?php

use App\Http\Controllers\DashboardController;
use App\Http\Controllers\DataController;
use App\Http\Controllers\EmailController;
use App\Http\Controllers\FormController;
use App\Http\Controllers\LoginController;
use App\Http\Controllers\UserController;
use Illuminate\Support\Facades\Route;
use Inertia\Inertia;

// Form Pelaporan & Tracking Status
Route::get('/', [FormController::class, 'home'])->name('home');
Route::get('/status', [FormController::class, 'status'])->name('status');
Route::get('/pengaduan', [FormController::class, 'pengaduan'])->name('pengaduan');

Route::post('/status/track', [FormController::class, 'track'])->name('status.track');
Route::post('/pengaduan/submit', [FormController::class, 'submitStore'])->name('pengaduan.submit');

// Login
Route::get('/login', [LoginController::class, 'showLogin']);
Route::post('/login', [LoginController::class, 'login'])->name('login');
Route::get('/logout', [LoginController::class, 'logout']);

// HomePage
Route::get('/home', function() {
    return inertia::render('HomePage');
});

// Revisi
Route::post('/revisi', [FormController::class, 'revision'])->name('pengaduan.revision');
Route::get('/revisi', function(){
    return redirect()->to('status');
});
Route::post('/revisi/submitrevisi', [FormController::class, 'submitRevision'])->name('pengaduan.revision.submit');

// Dashboard
Route::group(['prefix' => 'dashboard'], function () {

    // Dashboard Admin
    Route::middleware(['auth', 'onlyAdmin'])->group(function () {
        Route::get('/admin', [DashboardController::class, 'admin'])->name('dashboard.admin');
        
        Route::get('/admin/data', [DataController::class, 'fetchdata'])->name('dashboard.fetchdata');
        Route::get('/admin/data/progres', [DataController::class, 'fetchDataProgresAdmin'])->name('dashboard.fetchdata.progres');
        Route::get('/admin/data/selesai', [DataController::class, 'fetchDataSelesaiAdmin'])->name('dashboard.fetchdata.selesai');

        Route::get('/users', [UserController::class, 'fetchUser'])->name('user.fetchuser');
        Route::post('/users/store', [UserController::class, 'store'])->name('user.store');
        Route::delete('/users/destroy/{id}', [UserController::class, 'destroy'])->name('user.destroy');

        Route::get('/email', [EmailController::class, 'fetchEmail'])->name('admin.fetchemail');
        Route::post('/email/store', [EmailController::class, 'create'])->name('email.store');
        Route::delete('/email/destroy/{id}', [EmailController::class, 'destroy'])->name('email.delete');

        Route::get('/admin/download/{ticket}/{uniqueId}', [DataController::class, 'downloadFileKurator'])->name('admin.download');
        Route::get('/admin/download/berkas/{ticket}/{uniqueId}', [DataController::class, 'downloadFileKuratorBerkas'])->name('admin.download.berkas');
    });

    // Dashboard Tim Validator
    Route::middleware(['auth', 'onlyValidator'])->group(function () {
        Route::get('/validator', [DashboardController::class, 'validator'])->name('dashboard.validator');

        Route::get('/validator/data', [DataController::class, 'fetchdata'])->name('dashboard.validator.fetchdata');
        Route::get('/validator/data/progres', [DataController::class, 'fetchDataProgres'])->name('dashboard.validator.fetchdata.progres');

        Route::patch('/validator/approve', [DataController::class, 'approveLaporanValidator'])->name('validator.approve');
        Route::post('/validator/revisi', [DataController::class, 'revisiLaporan'])->name('validator.revisi');
        Route::get('/validator/download/{ticket}/{uniqueId}', [DataController::class, 'downloadFileValidator'])->name('validator.download');
    });


    // Dashboard Tim Kurator
    Route::middleware(['auth', 'onlyKurator'])->group(function () {
        Route::get('/kurator', [DashboardController::class, 'kurator'])->name('dashboard.kurator');

        Route::get('/kurator/data', [DataController::class, 'fetchdata'])->name('dashboard.kurator.fetchdata');
        Route::get('/kurator/data/selesai', [DataController::class, 'fetchDataSelesaiKurator'])->name('dashboard.kurator.fetchdata.selesai');

        Route::patch('/kurator/investigate/', [DataController::class, 'investigateLaporanKurator'])->name('kurator.investigate');
        Route::post('/kurator/proven/', [DataController::class, 'provenLaporanKurator'])->name('kurator.proven');
        Route::post('/kurator/notproven/', [DataController::class, 'notprovenLaporanKurator'])->name('kurator.notproven');
        Route::get('/kurator/download/{ticket}/{uniqueId}', [DataController::class, 'downloadFileKurator'])->name('kurator.download');
        Route::get('/kurator/download/berkas/{ticket}/{uniqueId}', [DataController::class, 'downloadFileKuratorBerkas'])->name('kurator.download.berkas');
    });


    // Dashboard Dewan
    Route::middleware(['auth', 'onlyDewan'])->group(function () {
        Route::get('/dewan', [DashboardController::class, 'dewan'])->name('dashboard.dewan');

        Route::get('/dewan/data', [DataController::class, 'fetchdata'])->name('dashboard.dewan.fetchdata');
        Route::get('/dewan/data/selesai', [DataController::class, 'fetchDataSelesaiDewan'])->name('dashboard.dewan.fetchdata.selesai');

        Route::patch('/dewan/investigate/', [DataController::class, 'investigateLaporanDewan'])->name('dewan.investigate');
        Route::post('/dewan/proven/', [DataController::class, 'approveLaporanDewan'])->name('dewan.proven');
        Route::post('/dewan/notproven/', [DataController::class, 'deniedLaporanDewan'])->name('dewan.not_proven');
        Route::get('/dewan/download/{ticket}/{uniqueId}', [DataController::class, 'downloadFileDewan'])->name('dewan.download');
        Route::get('/dewan/download/berkas/{ticket}/{uniqueId}', [DataController::class, 'downloadFileDewanBerkas'])->name('dewan.download.berkas');

        Route::post('/dewan/beyond/', [DataController::class, 'beyondOurJurisdiction'])->name('dewan.beyondOurJurisdiction');
        Route::post('/dewan/continue/', [DataController::class, ''])->name('dewan.continue');
    });

});