// pages/404.tsx
import Link from "next/link";

export default function Custom404() {
    return (
        <div className="flex flex-col items-center justify-center h-screen text-center">
            <h1 className="text-6xl font-bold text-red-500">404</h1>
            <p className="mt-4 text-lg">Oops! Page not found.</p>
            <Link
                href="/"
                className="mt-6 px-4 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700"
            >
                Go back home
            </Link>
        </div>
    );
}
