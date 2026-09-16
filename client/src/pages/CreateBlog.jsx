import { useContext, useMemo, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { AuthContext } from '../context/AuthContext';
import { BlogContext } from '../context/BlogContext';
import API from '../services/api';

const initialForm = {
    title: '',
    category: 'React',
    coverImage: '',
    tags: '',
    excerpt: '',
    content: '',
};

const CreateBlog = () => {
    const navigate = useNavigate();
    const { user, isAuthenticated } = useContext(AuthContext);
    const { addBlog } = useContext(BlogContext);
    const [form, setForm] = useState(initialForm);
    const [error, setError] = useState('');
    const [success, setSuccess] = useState('');
    const [submitting, setSubmitting] = useState(false);

    const handleImageUpload = (event) => {
        const file = event.target.files?.[0];
        if (!file) return;

        const reader = new FileReader();
        reader.onload = () => {
            setForm((prev) => ({ ...prev, coverImage: String(reader.result || '') }));
        };
        reader.readAsDataURL(file);
    };

    const categories = useMemo(
        () => ['React', 'JavaScript', 'Node.js', 'CSS', 'Career', 'DevOps'],
        []
    );

    const handleChange = (event) => {
        const { name, value } = event.target;
        setForm((prev) => ({ ...prev, [name]: value }));
    };

    const handleSubmit = async (event) => {
        event.preventDefault();
        setError('');
        setSuccess('');

        if (!isAuthenticated) {
            setError('You need to be logged in to publish a post.');
            return;
        }

        if (!form.title.trim() || !form.content.trim()) {
            setError('Title and content are required.');
            return;
        }

        const payload = {
            title: form.title.trim(),
            category: form.category,
            coverImage: form.coverImage.trim() || 'https://images.unsplash.com/photo-1516321318423-f06f85e504b3?auto=format&fit=crop&w=1200&q=80',
            tags: form.tags,
            excerpt: form.excerpt.trim() || form.content.trim().slice(0, 140),
            content: form.content.trim(),
            author: {
                name: user?.name || 'DevBlog Writer',
                email: user?.email || '',
            },
        };

        setSubmitting(true);

        try {
            const { data } = await API.post('/blogs', payload);
            const newPost = {
                ...data,
                _id: data._id || `post-${Date.now()}`,
                slug: data.slug || data.title?.toLowerCase().replace(/[^a-z0-9]+/g, '-').replace(/(^-|-$)/g, '') || 'new-post',
                author: data.author || { name: user?.name || 'DevBlog Writer' },
                createdAt: data.createdAt || new Date().toISOString(),
                readTime: data.readTime || '4 min read',
            };

            addBlog(newPost);
            setSuccess('Your post is live. Redirecting to the blog list...');
            setForm(initialForm);
            setTimeout(() => navigate('/blogs'), 900);
            return;
        } catch (err) {
            const fallbackPost = {
                ...payload,
                _id: `local-${Date.now()}`,
                slug: payload.title.toLowerCase().replace(/[^a-z0-9]+/g, '-').replace(/(^-|-$)/g, '') || `post-${Date.now()}`,
                author: {
                    name: user?.name || 'DevBlog Writer',
                    email: user?.email || '',
                },
                createdAt: new Date().toISOString(),
                readTime: '4 min read',
            };

            addBlog(fallbackPost);
            setSuccess('Published successfully in local demo mode. Redirecting to your blog...');
            setForm(initialForm);
            setTimeout(() => navigate('/blogs'), 900);
        } finally {
            setSubmitting(false);
        }
    };

    return (
        <main className="mx-auto max-w-4xl px-4 py-12 sm:px-6 lg:px-8">
            <div className="mb-8">
                <p className="text-xs font-semibold uppercase tracking-[0.2em] text-cyan-300">Writer dashboard</p>
                <h1 className="mt-2 text-3xl font-black text-white sm:text-4xl">Publish a post</h1>
            </div>

            {error && (
                <div className="mb-6 rounded-2xl border border-red-500/40 bg-red-500/10 px-4 py-3 text-sm text-red-200">
                    {error}
                </div>
            )}

            {success && (
                <div className="mb-6 rounded-2xl border border-emerald-500/40 bg-emerald-500/10 px-4 py-3 text-sm text-emerald-200">
                    {success}
                </div>
            )}

            <form onSubmit={handleSubmit} className="space-y-6 rounded-3xl border border-slate-800 bg-slate-900/60 p-6 shadow-xl shadow-slate-950/30 sm:p-8">
                <div className="grid gap-5 md:grid-cols-2">
                    <label className="space-y-2 md:col-span-2">
                        <span className="text-sm font-medium text-slate-200">Post title</span>
                        <input
                            type="text"
                            name="title"
                            value={form.title}
                            onChange={handleChange}
                            placeholder="How I built a faster frontend workflow"
                            className="w-full rounded-2xl border border-slate-700 bg-slate-950 px-4 py-3 text-slate-100 outline-none focus:border-cyan-400"
                            required
                        />
                    </label>

                    <label className="space-y-2">
                        <span className="text-sm font-medium text-slate-200">Category</span>
                        <select
                            name="category"
                            value={form.category}
                            onChange={handleChange}
                            className="w-full rounded-2xl border border-slate-700 bg-slate-950 px-4 py-3 text-slate-100 outline-none focus:border-cyan-400"
                        >
                            {categories.map((category) => (
                                <option key={category} value={category}>
                                    {category}
                                </option>
                            ))}
                        </select>
                    </label>

                    <label className="space-y-2">
                        <span className="text-sm font-medium text-slate-200">Cover image</span>
                        <input
                            type="url"
                            name="coverImage"
                            value={form.coverImage}
                            onChange={handleChange}
                            placeholder="https://... or upload below"
                            className="w-full rounded-2xl border border-slate-700 bg-slate-950 px-4 py-3 text-slate-100 outline-none focus:border-cyan-400"
                        />
                        <input
                            type="file"
                            accept="image/*"
                            onChange={handleImageUpload}
                            className="mt-2 block w-full rounded-2xl border border-dashed border-slate-700 bg-slate-950 px-3 py-2 text-sm text-slate-300 file:mr-3 file:rounded-full file:border-0 file:bg-cyan-500 file:px-3 file:py-1.5 file:text-sm file:font-semibold file:text-slate-950"
                        />
                    </label>

                    {form.coverImage && (
                        <div className="space-y-2 md:col-span-2">
                            <span className="text-sm font-medium text-slate-200">Image preview</span>
                            <img
                                src={form.coverImage}
                                alt="Cover preview"
                                className="h-48 w-full rounded-2xl object-cover border border-slate-700"
                            />
                        </div>
                    )}

                    <label className="space-y-2 md:col-span-2">
                        <span className="text-sm font-medium text-slate-200">Tags</span>
                        <input
                            type="text"
                            name="tags"
                            value={form.tags}
                            onChange={handleChange}
                            placeholder="frontend, react, product"
                            className="w-full rounded-2xl border border-slate-700 bg-slate-950 px-4 py-3 text-slate-100 outline-none focus:border-cyan-400"
                        />
                    </label>

                    <label className="space-y-2 md:col-span-2">
                        <span className="text-sm font-medium text-slate-200">Excerpt</span>
                        <textarea
                            name="excerpt"
                            value={form.excerpt}
                            onChange={handleChange}
                            rows="3"
                            placeholder="A short summary of the article"
                            className="w-full rounded-2xl border border-slate-700 bg-slate-950 px-4 py-3 text-slate-100 outline-none focus:border-cyan-400"
                        />
                    </label>

                    <label className="space-y-2 md:col-span-2">
                        <span className="text-sm font-medium text-slate-200">Content</span>
                        <textarea
                            name="content"
                            value={form.content}
                            onChange={handleChange}
                            rows="10"
                            placeholder="Write your article here..."
                            className="w-full rounded-2xl border border-slate-700 bg-slate-950 px-4 py-3 text-slate-100 outline-none focus:border-cyan-400"
                            required
                        />
                    </label>
                </div>

                <div className="flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between">
                    <p className="text-sm text-slate-400">
                        Publishing as <span className="font-semibold text-cyan-300">{user?.name || 'Reader'}</span>
                    </p>
                    <button
                        type="submit"
                        disabled={submitting}
                        className="rounded-full bg-cyan-500 px-6 py-3 font-semibold text-slate-950 transition hover:bg-cyan-400 disabled:cursor-not-allowed disabled:opacity-60"
                    >
                        {submitting ? 'Publishing...' : 'Publish post'}
                    </button>
                </div>
            </form>
        </main>
    );
};

export default CreateBlog;

