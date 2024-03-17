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
Route::post('/pengaduan/submitrevisi', [FormController::class, 'submitRevision'])->name('pengaduan.revision');

// Login
Route::get('/login', [LoginController::class, 'showLogin']);
Route::post('/login', [LoginController::class, 'login'])->name('login');
Route::get('/logout', [LoginController::class, 'logout']);

// HomePage
Route::get('/home', function() {
    return inertia::render('HomePage');
});

// Revisi
Route::get('/revisi', function() {
    return inertia::render('FormRevisi');
});

// Dashboard
Route::group(['prefix' => 'dashboard'], function () {


    // Dashboard Admin
    Route::middleware(['auth', 'onlyAdmin'])->group(function () {
        Route::get('/admin', [DashboardController::class, 'admin'])->name('dashboard.admin');
        Route::get('/admin/status/administratif', [DashboardController::class, 'statusAdministratif'])->name('admin.status.administratif');
        Route::get('/admin/status/teknis', [DashboardController::class, 'statusTeknis'])->name('admin.status.teknis');
        
        Route::get('/admin/data', [DataController::class, 'fetchdata'])->name('dashboard.fetchdata');
        Route::put('/admin/update-review', [DataController::class, 'updateReview'])->name('dashboard.updateReview');

        Route::get('/users', [UserController::class, 'fetchUser'])->name('user.fetchuser');
        Route::post('/users/store', [UserController::class, 'store'])->name('user.store');
        Route::delete('/users/destroy/{id}', [UserController::class, 'destroy'])->name('user.destroy');

        Route::get('/email', [EmailController::class, 'fetchEmail'])->name('admin.fetchemail');
        Route::post('/email/store', [EmailController::class, 'create'])->name('email.store');
        Route::delete('/email/destroy/{id}', [EmailController::class, 'destroy'])->name('email.delete');
    });

    // Dashboard Tim Validator
    Route::middleware(['auth', 'onlyValidator'])->group(function () {
        Route::get('/validator', [DashboardController::class, 'validator'])->name('dashboard.validator');

        Route::get('/validator/data', [DataController::class, 'fetchdata'])->name('dashboard.validator.fetchdata');

        Route::patch('/validator/approve', [DataController::class, 'approveLaporanValidator'])->name('validator.approve');
        Route::post('/validator/revisi', [DataController::class, 'revisiLaporan'])->name('validator.revisi');
        Route::get('/validator/download/{ticket}/{uniqueId}', [DataController::class, 'downloadFile'])->name('validator.download');
    });


    // Dashboard Tim Kurator
    Route::middleware(['auth', 'onlyKurator'])->group(function () {
        Route::get('/kurator', [DashboardController::class, 'kurator'])->name('dashboard.kurator');

        Route::get('/kurator/data', [DataController::class, 'fetchdata'])->name('dashboard.kurator.fetchdata');

        Route::patch('/kurator/investigate/', [DataController::class, 'investigateLaporanKurator'])->name('kurator.investigate');
        Route::post('/kurator/proven/', [DataController::class, 'provenLaporanKurator'])->name('kurator.proven');
        Route::post('/kurator/notproven/', [DataController::class, 'notprovenLaporanKurator'])->name('kurator.notproven');
    });


    // Dashboard Dewan
    Route::middleware(['auth', 'onlyDewan'])->group(function () {
        Route::get('/dewan', [DashboardController::class, 'dewan'])->name('dashboard.dewan');

        Route::post('/dewan/investigate/{ticket}', [DataController::class, 'investigateLaporanDewan'])->name('dewan.investigate');
        Route::post('/dewan/proven/{ticket}', [DataController::class, 'approveLaporanDewan'])->name('dewan.proven');
        Route::post('/dewan/notproven/{ticket}', [DataController::class, 'deniedLaporanDewan'])->name('dewan.not_proven');

        Route::post('/dewan/beyond/{ticket}', [DataController::class, 'beyondOurJurisdiction'])->name('dewan.beyondOurJurisdiction');
        Route::post('/dewan/continue/{ticket}', [DataController::class, ''])->name('dewan.continue');
    });

});