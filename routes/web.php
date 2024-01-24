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
Route::get('/dashboard', [DashboardController::class, 'index'])->name('dashboard');
