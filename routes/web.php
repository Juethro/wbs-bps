<?php

use App\Http\Controllers\DashboardController;
use App\Http\Controllers\FormController;
use App\Http\Controllers\LoginController;
use Illuminate\Support\Facades\Route;

// Form Pelaporan & Tracking Status
Route::get('/', [FormController::class, 'Index'])->name('home');
Route::get('/status', [FormController::class, 'Status'])->name('status');

// Login
Route::get('/login', [LoginController::class, 'showLogin']);
Route::post('/login', [LoginController::class, 'login'])->name('login');
Route::get('/logout', [LoginController::class, 'logout']);
Route::get('/cek', [LoginController::class, 'check']);

// Dashboard
Route::group(['prefix' => 'dashboard'], function () {

    // Dashboard Admin
    Route::middleware(['auth', 'onlyAdmin'])->group(function () {
        Route::get('/admin', [DashboardController::class, 'index'])->name('dashboard.admin');
    });
    
    // Dashboard Humas
    Route::middleware(['auth', 'onlyHumas'])->group(function () {
        Route::get('/humas', [DashboardController::class, 'humas'])->name('dashboard.humas');
    });

    // Dashboard Direksi
    Route::middleware(['auth', 'onlyDireksi'])->group(function () {
        Route::get('/direksi', [DashboardController::class, 'direksi'])->name('dashboard.direksi');
    });

    // Dashboard Dewan
    Route::middleware(['auth', 'onlyDewan'])->group(function () {
        Route::get('/dewan', [DashboardController::class, 'dewan'])->name('dashboard.dewan');
    });

});

