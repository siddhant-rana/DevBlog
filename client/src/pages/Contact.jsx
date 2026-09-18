import { useState } from 'react';
import API from '../services/api';

const Contact = () => {
    const [form, setForm] = useState({ name: '', email: '', subject: '', message: '' });
    const [status, setStatus] = useState({ type: '', text: '' });
    const [isSending, setIsSending] = useState(false);

    const handleChange = (event) => {
        setForm((current) => ({ ...current, [event.target.name]: event.target.value }));
    };

    const handleSubmit = async (event) => {
        event.preventDefault();
        setStatus({ type: '', text: '' });
        setIsSending(true);

        try {
            await API.post('/contact', form);
            setForm({ name: '', email: '', subject: '', message: '' });
            setStatus({ type: 'success', text: 'Message sent successfully. We will get back to you soon.' });
        } catch (error) {
            setStatus({
                type: 'error',
                text: error.response?.data?.message || 'Unable to send your message right now. Please try again.',
            });
        } finally {
            setIsSending(false);
        }
    };

    return (
        <main className="mx-auto max-w-4xl px-4 py-16 sm:px-6 lg:px-8">
            <div className="rounded-3xl border border-slate-800 bg-slate-900/60 p-5 shadow-xl shadow-slate-950/30 sm:p-10">
                <p className="text-xs font-semibold uppercase tracking-[0.2em] text-cyan-300">Contact</p>
                <h1 className="mt-3 text-3xl font-black text-white sm:text-4xl">Let’s talk about your next project.</h1>

                <form className="mt-8 grid gap-5" onSubmit={handleSubmit}>
                    <div className="grid gap-5 md:grid-cols-2">
                        <input name="name" value={form.name} onChange={handleChange} required maxLength="100" className="rounded-2xl border border-slate-700 bg-slate-950 px-4 py-3 text-slate-100 outline-none focus:border-cyan-400" placeholder="Your name" />
                        <input name="email" value={form.email} onChange={handleChange} required className="rounded-2xl border border-slate-700 bg-slate-950 px-4 py-3 text-slate-100 outline-none focus:border-cyan-400" placeholder="Email address" type="email" />
                    </div>
                    <input name="subject" value={form.subject} onChange={handleChange} required maxLength="150" className="rounded-2xl border border-slate-700 bg-slate-950 px-4 py-3 text-slate-100 outline-none focus:border-cyan-400" placeholder="Subject" />
                    <textarea name="message" value={form.message} onChange={handleChange} required maxLength="5000" rows="6" className="rounded-2xl border border-slate-700 bg-slate-950 px-4 py-3 text-slate-100 outline-none focus:border-cyan-400" placeholder="How can we help?" />
                    {status.text && <p className={status.type === 'success' ? 'text-sm text-emerald-400' : 'text-sm text-rose-400'}>{status.text}</p>}
                    <button disabled={isSending} type="submit" className="w-full rounded-full bg-cyan-500 px-6 py-3 font-semibold text-slate-950 transition hover:bg-cyan-400 disabled:cursor-not-allowed disabled:opacity-60 sm:w-fit">
                        {isSending ? 'Sending...' : 'Send message'}
                    </button>
                </form>
            </div>
        </main>
    );
};

export default Contact;
