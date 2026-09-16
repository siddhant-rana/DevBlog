import { useContext, useEffect, useMemo, useState } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import { AuthContext } from '../context/AuthContext';
import { BlogContext } from '../context/BlogContext';

const EditBlog = () => {
    const { slug } = useParams();
    const navigate = useNavigate();
    const { user } = useContext(AuthContext);
    const { blogs, updateBlog, isOwner } = useContext(BlogContext);
    const blog = blogs.find((item) => item.slug === slug) || null;

    const [form, setForm] = useState({
        title: '',
        category: 'React',
        coverImage: '',
        tags: '',
        excerpt: '',
        content: '',
    });

    const categories = useMemo(() => ['React', 'JavaScript', 'Node.js', 'CSS', 'Career', 'DevOps'], []);

    useEffect(() => {
        if (!blog) return;
        setForm({
            title: blog.title || '',
            category: blog.category || 'React',
            coverImage: blog.coverImage || '',
            tags: Array.isArray(blog.tags) ? blog.tags.join(', ') : '',
            excerpt: blog.excerpt || '',
            content: blog.content || '',
        });
    }, [blog]);

    if (!blog) {
        return (
            <main className="mx-auto max-w-4xl px-4 py-16 text-center sm:px-6">
                <h1 className="text-3xl font-black text-white">Blog not found</h1>
            </main>
        );
    }

    if (!isOwner(blog, user)) {
        return (
            <main className="mx-auto max-w-4xl px-4 py-16 text-center sm:px-6">
                <h1 className="text-3xl font-black text-white">You can only edit your own posts.</h1>
            </main>
        );
    }

    const handleChange = (event) => {
        const { name, value } = event.target;
        setForm((prev) => ({ ...prev, [name]: value }));
    };

    const handleSubmit = (event) => {
        event.preventDefault();
        updateBlog(blog._id || blog.slug, {
            ...blog,
            ...form,
            excerpt: form.excerpt || form.content.slice(0, 140),
            author: { name: user?.name || blog.author?.name || 'DevBlog Writer', email: user?.email || blog.author?.email || '' },
        });
        navigate('/my-blogs');
    };

    return (
        <main className="mx-auto max-w-4xl px-4 py-12 sm:px-6 lg:px-8">
            <div className="mb-8">
                <p className="text-xs font-semibold uppercase tracking-[0.2em] text-cyan-300">Update post</p>
                <h1 className="mt-2 text-3xl font-black text-white">Edit article</h1>
            </div>

            <form onSubmit={handleSubmit} className="space-y-6 rounded-3xl border border-slate-800 bg-slate-900/60 p-6 shadow-xl shadow-slate-950/30 sm:p-8">
                <div className="grid gap-5 md:grid-cols-2">
                    <label className="space-y-2 md:col-span-2">
                        <span className="text-sm font-medium text-slate-200">Post title</span>
                        <input
                            type="text"
                            name="title"
                            value={form.title}
                            onChange={handleChange}
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
                                <option key={category} value={category}>{category}</option>
                            ))}
                        </select>
                    </label>

                    <label className="space-y-2">
                        <span className="text-sm font-medium text-slate-200">Cover image URL</span>
                        <input
                            type="url"
                            name="coverImage"
                            value={form.coverImage}
                            onChange={handleChange}
                            className="w-full rounded-2xl border border-slate-700 bg-slate-950 px-4 py-3 text-slate-100 outline-none focus:border-cyan-400"
                        />
                    </label>

                    <label className="space-y-2 md:col-span-2">
                        <span className="text-sm font-medium text-slate-200">Tags</span>
                        <input
                            type="text"
                            name="tags"
                            value={form.tags}
                            onChange={handleChange}
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
                            className="w-full rounded-2xl border border-slate-700 bg-slate-950 px-4 py-3 text-slate-100 outline-none focus:border-cyan-400"
                            required
                        />
                    </label>
                </div>

                <div className="flex justify-end">
                    <button type="submit" className="rounded-full bg-cyan-500 px-6 py-3 font-semibold text-slate-950 transition hover:bg-cyan-400">
                        Save changes
                    </button>
                </div>
            </form>
        </main>
    );
};

export default EditBlog;
