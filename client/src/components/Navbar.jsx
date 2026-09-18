import { useContext, useState } from 'react';
import { Link, NavLink, useNavigate } from 'react-router-dom';
import { AuthContext } from '../context/AuthContext';
import logo from '../assets/images/devblog-logo.svg';

const navItems = [
    { label: 'Home', to: '/' },
    { label: 'Blogs', to: '/blogs' },
    { label: 'Categories', to: '/categories' },
    { label: 'About', to: '/about' },
    { label: 'Contact', to: '/contact' },
];

const Navbar = () => {
    const navigate = useNavigate();
    const { user, logout, isAuthenticated } = useContext(AuthContext);
    const [menuOpen, setMenuOpen] = useState(false);

    const handleLogout = () => {
        logout();
        setMenuOpen(false);
        navigate('/');
    };

    const closeMenu = () => setMenuOpen(false);

    return (
        <header className="sticky top-0 z-50 border-b border-slate-800/80 bg-slate-950/85 backdrop-blur-md">
            <nav className="mx-auto flex max-w-6xl flex-wrap items-center justify-between gap-3 px-4 py-3 sm:px-6 sm:py-4 lg:px-8">
                <Link to="/" className="flex items-center gap-3">
                    <img src={logo} alt="DevBlog logo" className="h-10 w-10 rounded-xl shadow-glow" />
                    <div>
                        <div className="text-lg font-semibold tracking-wide text-slate-100">DevBlog</div>
                    </div>
                </Link>

                <div className="hidden items-center gap-6 md:flex">
                    {navItems.map((item) => (
                        <NavLink
                            key={item.to}
                            to={item.to}
                            className={({ isActive }) =>
                                `text-sm transition ${isActive ? 'text-cyan-300' : 'text-slate-300 hover:text-white'}`
                            }
                        >
                            {item.label}
                        </NavLink>
                    ))}
                </div>

                <div className="flex items-center gap-2 sm:gap-3">
                    {isAuthenticated ? (
                        <>
                            <Link to="/profile" className="hidden text-sm text-slate-300 transition hover:text-white sm:inline-block">
                                Profile
                            </Link>
                            <Link to="/my-blogs" className="hidden text-sm text-slate-300 transition hover:text-white sm:inline-block">
                                My Blogs
                            </Link>
                            <span className="hidden text-sm text-slate-300 sm:inline-block">Hi, {user?.name?.split(' ')[0] || 'Dev'}</span>
                            <button
                                type="button"
                                onClick={handleLogout}
                                className="rounded-full border border-slate-700 bg-slate-900 px-4 py-2 text-sm font-medium text-slate-200 transition hover:border-slate-500"
                            >
                                Logout
                            </button>
                        </>
                    ) : (
                        <>
                            <Link to="/login" className="hidden text-sm text-slate-300 transition hover:text-white sm:inline-block">
                                Log in
                            </Link>
                            <Link
                                to="/register"
                                className="rounded-full border border-cyan-400/70 bg-cyan-500/10 px-4 py-2 text-sm font-medium text-cyan-200 transition hover:border-cyan-300 hover:bg-cyan-500/20"
                            >
                                Join now
                            </Link>
                        </>
                    )}
                    <button
                        type="button"
                        aria-expanded={menuOpen}
                        aria-controls="mobile-navigation"
                        aria-label="Toggle navigation menu"
                        onClick={() => setMenuOpen((open) => !open)}
                        className="inline-flex h-10 w-10 items-center justify-center rounded-xl border border-slate-700 bg-slate-900 text-lg text-slate-200 md:hidden"
                    >
                        {menuOpen ? '×' : '☰'}
                    </button>
                </div>

                {menuOpen && (
                    <div id="mobile-navigation" className="order-3 basis-full border-t border-slate-800 pt-3 md:hidden">
                        <div className="grid gap-1">
                            {navItems.map((item) => (
                                <NavLink
                                    key={item.to}
                                    to={item.to}
                                    onClick={closeMenu}
                                    className={({ isActive }) =>
                                        `rounded-xl px-3 py-2.5 text-sm ${isActive ? 'bg-cyan-500/10 text-cyan-300' : 'text-slate-300 hover:bg-slate-900 hover:text-white'}`
                                    }
                                >
                                    {item.label}
                                </NavLink>
                            ))}
                            {isAuthenticated ? (
                                <>
                                    <Link to="/profile" onClick={closeMenu} className="rounded-xl px-3 py-2.5 text-sm text-slate-300 hover:bg-slate-900 hover:text-white">
                                        Profile
                                    </Link>
                                    <Link to="/my-blogs" onClick={closeMenu} className="rounded-xl px-3 py-2.5 text-sm text-slate-300 hover:bg-slate-900 hover:text-white">
                                        My Blogs
                                    </Link>
                                </>
                            ) : (
                                <Link to="/login" onClick={closeMenu} className="rounded-xl px-3 py-2.5 text-sm text-slate-300 hover:bg-slate-900 hover:text-white">
                                    Log in
                                </Link>
                            )}
                        </div>
                    </div>
                )}
            </nav>
        </header>
    );
};

export default Navbar;

