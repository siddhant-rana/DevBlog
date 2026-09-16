import { Link } from 'react-router-dom';

const NotFound = () => {
    return (
        <main className="mx-auto flex min-h-[70vh] max-w-3xl flex-col items-center justify-center px-4 py-16 text-center sm:px-6">
            <div className="text-7xl font-black text-cyan-300">404</div>
            <h1 className="mt-6 text-3xl font-black text-white sm:text-5xl">Page not found</h1>
            <p className="mt-4 max-w-xl text-lg text-slate-400">
                The page you're looking for may have moved or no longer exists.
            </p>
            <Link to="/" className="mt-8 rounded-full bg-cyan-500 px-6 py-3 font-semibold text-slate-950 transition hover:bg-cyan-400">
                Go home
            </Link>
        </main>
    );
};

export default NotFound;
