import { useContext } from 'react';
import { useNavigate } from 'react-router-dom';
import { AuthContext } from '../context/AuthContext';

const Profile = () => {
    const { user, logout } = useContext(AuthContext);
    const navigate = useNavigate();

    if (!user) {
        return null;
    }

    const initials = user.name
        ?.split(' ')
        .filter(Boolean)
        .slice(0, 2)
        .map((part) => part[0]?.toUpperCase())
        .join('') || 'D';

    const handleLogout = () => {
        logout();
        navigate('/');
    };

    return (
        <main className="mx-auto max-w-4xl px-4 py-12 sm:px-6 lg:px-8">
            <div className="overflow-hidden rounded-3xl border border-slate-800 bg-slate-900/70 shadow-xl shadow-slate-950/30">
                <div className="border-b border-slate-800 bg-gradient-to-r from-cyan-500/10 via-slate-900 to-slate-900 p-6 sm:p-8">
                    <div className="flex flex-col gap-5 sm:flex-row sm:items-center">
                        <div className="flex h-20 w-20 items-center justify-center rounded-full bg-cyan-500 text-2xl font-black text-slate-950">
                            {initials}
                        </div>
                        <div>
                            <p className="text-xs font-semibold uppercase tracking-[0.2em] text-cyan-300">Profile</p>
                            <h1 className="mt-2 text-3xl font-bold text-white">{user.name || 'Developer'}</h1>
                            <p className="mt-1 text-sm text-slate-400">{user.role || 'user'} account</p>
                        </div>
                    </div>
                </div>

                <div className="grid gap-6 p-6 sm:p-8 md:grid-cols-2">
                    <div className="rounded-2xl border border-slate-800 bg-slate-950/40 p-5">
                        <p className="text-xs font-semibold uppercase tracking-[0.2em] text-slate-500">Full name</p>
                        <p className="mt-3 text-lg font-semibold text-white">{user.name || 'N/A'}</p>
                    </div>

                    <div className="rounded-2xl border border-slate-800 bg-slate-950/40 p-5">
                        <p className="text-xs font-semibold uppercase tracking-[0.2em] text-slate-500">Email</p>
                        <p className="mt-3 text-lg font-semibold text-white break-all">{user.email || 'N/A'}</p>
                    </div>

                    <div className="rounded-2xl border border-slate-800 bg-slate-950/40 p-5">
                        <p className="text-xs font-semibold uppercase tracking-[0.2em] text-slate-500">Role</p>
                        <p className="mt-3 text-lg font-semibold text-white">{user.role || 'user'}</p>
                    </div>

                    <div className="rounded-2xl border border-slate-800 bg-slate-950/40 p-5">
                        <p className="text-xs font-semibold uppercase tracking-[0.2em] text-slate-500">Status</p>
                        <p className="mt-3 text-lg font-semibold text-emerald-400">Logged in</p>
                    </div>
                </div>

                <div className="flex justify-end gap-3 border-t border-slate-800 p-6 sm:p-8">
                    <button
                        type="button"
                        onClick={() => navigate('/my-blogs')}
                        className="rounded-full border border-slate-700 bg-slate-900 px-5 py-2.5 text-sm font-medium text-slate-200 transition hover:border-slate-500"
                    >
                        My blogs
                    </button>
                    <button
                        type="button"
                        onClick={handleLogout}
                        className="rounded-full bg-cyan-500 px-5 py-2.5 text-sm font-semibold text-slate-950 transition hover:bg-cyan-400"
                    >
                        Logout
                    </button>
                </div>
            </div>
        </main>
    );
};

export default Profile;
