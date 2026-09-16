import { useContext, useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { GoogleLogin } from '@react-oauth/google';
import { AuthContext } from '../context/AuthContext';

const Login = () => {
    const navigate = useNavigate();
    const { login, googleLogin, loading } = useContext(AuthContext);
    const [form, setForm] = useState({ email: '', password: '' });
    const [error, setError] = useState('');

    const handleChange = (event) => {
        setForm((prev) => ({ ...prev, [event.target.name]: event.target.value }));
    };

    const handleSubmit = async (event) => {
        event.preventDefault();
        setError('');

        try {
            await login(form.email, form.password);
            navigate('/');
        } catch (err) {
            setError(err?.response?.data?.message || 'Login failed. Please try again.');
        }
    };

    const handleGoogleLogin = async (response) => {
        setError('');

        try {
            await googleLogin(response.credential);
            navigate('/');
        } catch (err) {
            setError(err?.response?.data?.message || 'Google sign-in failed.');
        }
    };

    return (
        <main className="mx-auto flex min-h-[70vh] max-w-md items-center justify-center px-4 py-10 sm:px-6 sm:py-16">
            <div className="w-full rounded-3xl border border-slate-800 bg-slate-900/70 p-5 shadow-xl shadow-slate-950/30 sm:p-8">
                <p className="text-xs font-semibold uppercase tracking-[0.2em] text-cyan-300">Welcome back</p>
                <h1 className="mt-3 text-3xl font-black text-white">Log in to DevBlog</h1>

                {error && (
                    <div className="mt-4 rounded-2xl border border-red-500/40 bg-red-500/10 px-3 py-2 text-sm text-red-200">
                        {error}
                    </div>
                )}

                <form className="mt-8 space-y-5" onSubmit={handleSubmit}>
                    <input
                        className="w-full rounded-2xl border border-slate-700 bg-slate-950 px-4 py-3 text-slate-100 outline-none focus:border-cyan-400"
                        type="email"
                        name="email"
                        placeholder="Email"
                        value={form.email}
                        onChange={handleChange}
                        required
                    />
                    <input
                        className="w-full rounded-2xl border border-slate-700 bg-slate-950 px-4 py-3 text-slate-100 outline-none focus:border-cyan-400"
                        type="password"
                        name="password"
                        placeholder="Password"
                        value={form.password}
                        onChange={handleChange}
                        required
                    />
                    <button type="submit" disabled={loading} className="w-full rounded-full bg-cyan-500 px-5 py-3 font-semibold text-slate-950 transition hover:bg-cyan-400 disabled:cursor-not-allowed disabled:opacity-60">
                        {loading ? 'Signing in...' : 'Sign in'}
                    </button>
                </form>

                <div className="my-6 flex items-center gap-3 text-xs uppercase tracking-[0.2em] text-slate-500">
                    <div className="h-px flex-1 bg-slate-700" />
                    <span>or</span>
                    <div className="h-px flex-1 bg-slate-700" />
                </div>

                {import.meta.env.VITE_GOOGLE_CLIENT_ID ? (
                    <div className="flex w-full justify-center overflow-hidden rounded-full [&>div]:w-full">
                        <GoogleLogin
                            onSuccess={handleGoogleLogin}
                            onError={() => setError('Google sign-in failed.')}
                            useOneTap={false}
                            theme="filled_black"
                            shape="pill"
                            size="large"
                            text="continue_with"
                            width="360"
                        />
                    </div>
                ) : (
                    <p className="rounded-2xl border border-amber-500/40 bg-amber-500/10 px-3 py-2 text-center text-sm text-amber-200">
                        Google sign-in is not configured for this build.
                    </p>
                )}

                <p className="mt-6 text-center text-sm text-slate-400">
                    Don’t have an account?{' '}
                    <Link to="/register" className="font-medium text-cyan-300 hover:text-cyan-200">
                        Create one
                    </Link>
                </p>
            </div>
        </main>
    );
};

export default Login;
