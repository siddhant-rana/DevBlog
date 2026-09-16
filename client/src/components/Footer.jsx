import { Link } from 'react-router-dom';
import logo from '../assets/images/devblog-logo.svg';

const Footer = () => {
    return (
        <footer className="border-t border-slate-800 bg-slate-950">
            <div className="mx-auto grid max-w-6xl gap-12 px-4 py-12 sm:px-6 lg:grid-cols-[1.5fr_1fr_1fr] lg:px-8">
                <div>
                    <div className="mb-4 flex items-center gap-3">
                        <img src={logo} alt="DevBlog logo" className="h-10 w-10 rounded-xl" />
                        <div>
                            <div className="text-lg font-semibold text-slate-100">DevBlog</div>
                        </div>
                    </div>
                    <p className="max-w-md text-sm leading-7 text-slate-400">
                        Practical tutorials, engineering insights, and product stories for teams building modern web experiences.
                    </p>
                </div>

                <div>
                    <h3 className="mb-4 text-sm font-semibold uppercase tracking-[0.2em] text-slate-300">Explore</h3>
                    <ul className="space-y-3 text-sm text-slate-400">
                        <li><Link to="/blogs" className="hover:text-cyan-300">Latest articles</Link></li>
                        <li><Link to="/categories" className="hover:text-cyan-300">Categories</Link></li>
                        <li><Link to="/about" className="hover:text-cyan-300">About</Link></li>
                    </ul>
                </div>

                <div>
                    <h3 className="mb-4 text-sm font-semibold uppercase tracking-[0.2em] text-slate-300">Connect</h3>
                    <ul className="space-y-3 text-sm text-slate-400">
                        <li><a href="mailto:hello@devblog.com" className="hover:text-cyan-300">hello@devblog.com</a></li>
                        <li><a href="https://x.com" target="_blank" rel="noreferrer" className="hover:text-cyan-300">Twitter</a></li>
                        <li><a href="https://github.com" target="_blank" rel="noreferrer" className="hover:text-cyan-300">GitHub</a></li>
                    </ul>
                </div>
            </div>
            <div className="border-t border-slate-800">
                <div className="mx-auto flex max-w-6xl flex-col gap-3 px-4 py-5 text-sm text-slate-500 sm:flex-row sm:items-center sm:justify-between sm:px-6 lg:px-8">
                    <p>© 2025 DevBlog.</p>
                    <p>Built for developers, by Siddhant Rana.</p>
                </div>
            </div>
        </footer>
    );
};

export default Footer;
