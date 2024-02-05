<?php

use App\Http\Controllers\DashboardController;
use App\Http\Controllers\EmailController;
use App\Http\Controllers\FormController;
use App\Http\Controllers\LoginController;
use App\Http\Controllers\UserController;
use Illuminate\Support\Facades\Route;
use SebastianBergmann\CodeCoverage\Report\Html\Dashboard;

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
Route::get('/cek', [LoginController::class, 'check']);

// HomePage
Route::get('/home', function() {
    return inertia::render('HomePage');
});

// Dashboard
Route::group(['prefix' => 'dashboard'], function () {


    // Dashboard Admin
    Route::middleware(['auth', 'onlyAdmin'])->group(function () {
        Route::get('/admin', [DashboardController::class, 'admin'])->name('dashboard.admin');
        Route::get('/admin/status/administratif', [DashboardController::class, 'statusAdministratif'])->name('admin.status.administratif');
        Route::get('/admin/status/teknis', [DashboardController::class, 'statusTeknis'])->name('admin.status.teknis');
        Route::get('/admin/user', [DashboardController::class, 'user'])->name('admin.user');
        Route::get('/admin/email', [DashboardController::class, 'email'])->name('admin.email');

        Route::get('/users', [UserController::class, 'index'])->name('user.index');
        Route::get('/users/create', [UserController::class, 'create'])->name('user.create');
        Route::post('/users/store', [UserController::class, 'store'])->name('user.store');
        Route::get('/users/{user}/edit', [UserController::class, 'edit'])->name('user.edit');
        Route::patch('/users/{user}/update', [UserController::class, 'update'])->name('user.update');
        Route::delete('/users/{user}/destroy', [UserController::class, 'destroy'])->name('user.destroy');

        Route::post('/admin/email/new', [EmailController::class, 'create'])->name('email.create');
        Route::patch('/admin/email/update', [EmailController::class, 'update'])->name('email.update');
        Route::delete('/admin/email/delete', [EmailController::class, 'delete'])->name('email.delete');

    });

    // Dashboard Tim Validator
    Route::middleware(['auth', 'onlyDireksi'])->group(function () {
        Route::get('/validator', [DashboardController::class, 'validator'])->name('dashboard.validator');

        Route::post('/validator/approve/{ticket}', [DashboardController::class, 'approveLaporanValidator'])->name('validator.approve');
        Route::post('/validator/edit/{ticket}', [DashboardController::class, 'editLaporan'])->name('validator.editable');
    });


    // Dashboard Tim Kurator
    Route::middleware(['auth', 'onlyHumas'])->group(function () {
        Route::get('/kurator', [DashboardController::class, 'kurator'])->name('dashboard.kurator');

        Route::post('/kurator/approve/{ticket}', [DashboardController::class, 'approveLaporanKurator'])->name('kurator.approve');
        Route::post('/kurator/denied/{ticket}', [DashboardController::class, 'deniedLaporanKurator'])->name('kurator.denied');
    });


    // Dashboard Dewan
    Route::middleware(['auth', 'onlyDewan'])->group(function () {
        Route::get('/dewan', [DashboardController::class, 'dewan'])->name('dashboard.dewan');

        Route::post('/dewan/approve/{ticket}', [DashboardController::class, 'approveLaporanDewan'])->name('dewan.approve');
        Route::post('/dewan/denied/{ticket}', [DashboardController::class, 'deniedLaporanDewan'])->name('dewan.denied');
        Route::post('/dewan/beyond/{ticket}', [DashboardController::class, 'beyondOurJurisdiction'])->name('dewan.beyondOurJurisdiction');
        Route::post('/dewan/continue/{ticket}', [DashboardController::class, ''])->name('dewan.continue');
    });

});


///User
// Route::get('/usercoba', function () {
//     return Inertia::render('UserCoba');
// });

