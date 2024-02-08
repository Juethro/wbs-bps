<?php

namespace App\Http\Middleware;

use Closure;
use Illuminate\Http\Request;
use Symfony\Component\HttpFoundation\Response;
use Illuminate\Support\Facades\Auth;

class OnlyDewan
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

        } else if (Auth::user()->role == 'kurator'){

            return redirect()->route('dashboard.kurator');

        } else if (Auth::user()->role == 'validator'){

            return redirect()->route('dashboard.validator');

        } else if (Auth::user()->role == 'dewan'){

            return $next($request);

        }
    }
}
