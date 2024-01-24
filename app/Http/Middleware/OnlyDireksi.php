<?php

namespace App\Http\Middleware;

use Closure;
use Illuminate\Http\Request;
use Symfony\Component\HttpFoundation\Response;
use Illuminate\Support\Facades\Auth;

class OnlyDireksi
{
    /**
     * Handle an incoming request.
     *
     * @param  \Closure(\Illuminate\Http\Request): (\Symfony\Component\HttpFoundation\Response)  $next
     */
    public function handle(Request $request, Closure $next): Response
    {
        if (!Auth::check()) {
            return redirect()->route('login');
        }

        if (Auth::user()->role == 'admin'){

            return redirect()->route('dashboard.admin');

        } else if (Auth::user()->role == 'humas'){

            return redirect()->route('dashboard.humas');

        } else if (Auth::user()->role == 'direksi'){

            return $next($request);

        } else if (Auth::user()->role == 'dewan'){

            return redirect()->route('dashboard.dewan');

        }
    }
}
