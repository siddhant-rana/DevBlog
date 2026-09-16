const About = () => {
    return (
        <main className="mx-auto max-w-5xl px-4 py-16 sm:px-6 lg:px-8">
            <div className="rounded-3xl border border-slate-800 bg-slate-900/60 p-8 shadow-xl shadow-slate-950/30 sm:p-10">
                <p className="text-xs font-semibold uppercase tracking-[0.2em] text-cyan-300">Our story</p>
                <h1 className="mt-3 text-3xl font-black text-white sm:text-5xl">We write about the craft of building digital products.</h1>
                <p className="mt-6 max-w-3xl text-lg leading-8 text-slate-300">
                    MERN Dev Blog exists to make modern engineering clearer. We publish tutorials, design notes, and career advice for developers who want to build thoughtful and scalable experiences.
                </p>

                <div className="mt-10 grid gap-6 md:grid-cols-3">
                    {[
                        ['240+', 'Expert articles'],
                        ['12k+', 'Monthly readers'],
                        ['50+', 'Industry contributors'],
                    ].map(([value, label]) => (
                        <div key={label} className="rounded-2xl border border-slate-800 bg-slate-950 p-5">
                            <div className="text-3xl font-black text-cyan-300">{value}</div>
                            <div className="mt-2 text-sm text-slate-400">{label}</div>
                        </div>
                    ))}
                </div>
            </div>
        </main>
    );
};

export default About;
