import { Link } from 'react-router-dom';

const Hero = () => {
    return (
        <section className="relative overflow-hidden bg-[radial-gradient(circle_at_top,_rgba(34,211,238,0.18),transparent_40%),linear-gradient(180deg,#020617,#0f172a)]">
            <div className="mx-auto grid max-w-6xl gap-10 px-4 py-16 sm:px-6 lg:grid-cols-[1.1fr_0.9fr] lg:px-8 lg:py-24">
                <div className="flex flex-col justify-center">
                    <span className="mb-4 inline-flex w-fit rounded-full border border-cyan-400/30 bg-cyan-500/10 px-3 py-1 text-xs font-semibold uppercase tracking-[0.2em] text-cyan-200">
                        Developer stories
                    </span>
                    <h1 className="max-w-xl text-4xl font-black leading-tight text-white sm:text-5xl lg:text-6xl">
                        Build better products with{' '}
                        <span className="bg-gradient-to-r from-cyan-300 via-sky-400 to-blue-500 bg-clip-text text-transparent">
                            &lt;/&gt;
                        </span>
                        <span className="text-cyan-300">DevBlog</span>.
                    </h1>
                    <p className="mt-5 max-w-lg text-lg text-slate-300">
                        Read practical engineering lessons, ship smarter ideas, and publish your own stories with the community.
                    </p>
                    <div className="mt-8 flex flex-wrap gap-4">
                        <Link to="/blogs" className="rounded-full bg-cyan-500 px-5 py-3 text-sm font-semibold text-slate-950 transition hover:bg-cyan-400">
                            Explore articles
                        </Link>
                        <Link to="/create-blog" className="rounded-full border border-slate-700 bg-slate-900/50 px-5 py-3 text-sm font-semibold text-slate-200 transition hover:border-cyan-400 hover:text-cyan-300">
                            Publish a post
                        </Link>
                    </div>
                </div>

                <div className="relative mx-auto w-full max-w-xl">
                    <div className="absolute inset-0 -z-10 rounded-[2rem] bg-cyan-500/10 blur-3xl" />
                    <div className="rounded-3xl border border-slate-700 bg-slate-900/60 p-5 shadow-glow backdrop-blur-sm">
                        <img
                            src="https://images.unsplash.com/photo-1522202176988-66273c2fd55f?auto=format&fit=crop&w=1200&q=80"
                            alt="Developer team working together"
                            className="h-72 w-full rounded-2xl object-cover"
                        />
                        <div className="mt-5 grid gap-3 sm:grid-cols-2">
                            <div className="rounded-2xl border border-slate-800 bg-slate-950/70 p-4">
                                <p className="text-xs uppercase tracking-[0.2em] text-slate-400">Trending</p>
                                <h2 className="mt-3 text-lg font-semibold text-white">Shipping faster with clean frontend architecture</h2>
                            </div>
                            <div className="rounded-2xl border border-slate-800 bg-slate-950/70 p-4">
                                <p className="text-xs uppercase tracking-[0.2em] text-slate-400">New</p>
                                <h2 className="mt-3 text-lg font-semibold text-white">How teams use design systems without losing speed</h2>
                            </div>
                        </div>
                    </div>
                </div>
            </div>

            <div className="mx-auto grid max-w-6xl gap-8 px-4 pb-16 sm:px-6 lg:grid-cols-3 lg:px-8">
                <div className="rounded-2xl border border-slate-800 bg-slate-900/50 p-5">
                    <div className="text-2xl font-bold text-white">12k+</div>
                    <div className="mt-2 text-slate-400">Monthly readers</div>
                </div>
                <div className="rounded-2xl border border-slate-800 bg-slate-900/50 p-5">
                    <div className="text-2xl font-bold text-white">240+</div>
                    <div className="mt-2 text-slate-400">Expert posts</div>
                </div>
                <div className="rounded-2xl border border-slate-800 bg-slate-900/50 p-5">
                    <div className="text-2xl font-bold text-white">98%</div>
                    <div className="mt-2 text-slate-400">Reader satisfaction</div>
                </div>
            </div>
        </section>
    );
};

export default Hero;

