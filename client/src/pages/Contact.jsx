const Contact = () => {
    return (
        <main className="mx-auto max-w-4xl px-4 py-16 sm:px-6 lg:px-8">
            <div className="rounded-3xl border border-slate-800 bg-slate-900/60 p-5 shadow-xl shadow-slate-950/30 sm:p-10">
                <p className="text-xs font-semibold uppercase tracking-[0.2em] text-cyan-300">Contact</p>
                <h1 className="mt-3 text-3xl font-black text-white sm:text-4xl">Let’s talk about your next project.</h1>

                <form className="mt-8 grid gap-5">
                    <div className="grid gap-5 md:grid-cols-2">
                        <input className="rounded-2xl border border-slate-700 bg-slate-950 px-4 py-3 text-slate-100 outline-none focus:border-cyan-400" placeholder="Your name" />
                        <input className="rounded-2xl border border-slate-700 bg-slate-950 px-4 py-3 text-slate-100 outline-none focus:border-cyan-400" placeholder="Email address" type="email" />
                    </div>
                    <input className="rounded-2xl border border-slate-700 bg-slate-950 px-4 py-3 text-slate-100 outline-none focus:border-cyan-400" placeholder="Subject" />
                    <textarea rows="6" className="rounded-2xl border border-slate-700 bg-slate-950 px-4 py-3 text-slate-100 outline-none focus:border-cyan-400" placeholder="How can we help?" />
                    <button type="submit" className="w-full rounded-full bg-cyan-500 px-6 py-3 font-semibold text-slate-950 transition hover:bg-cyan-400 sm:w-fit">
                        Send message
                    </button>
                </form>
            </div>
        </main>
    );
};

export default Contact;
