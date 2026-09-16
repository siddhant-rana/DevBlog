import { Link, useParams } from 'react-router-dom';
import { useContext } from 'react';
import { BlogContext } from '../context/BlogContext';
import { AuthContext } from '../context/AuthContext';

const BlogDetails = () => {
    const { slug } = useParams();
    const { blogs, deleteBlog, isOwner } = useContext(BlogContext);
    const { user } = useContext(AuthContext);
    const blog = blogs.find((item) => item.slug === slug) || null;
    const canManagePost = blog ? isOwner(blog, user) : false;

    const handleDelete = () => {
        if (!blog) return;
        deleteBlog(blog._id || blog.slug);
    };

    if (!blog) {
        return (
            <main className="mx-auto max-w-4xl px-4 py-16 text-center sm:px-6">
                <h1 className="text-3xl font-black text-white">Article not found</h1>
                <Link to="/blogs" className="mt-6 inline-block rounded-full bg-cyan-500 px-5 py-3 font-semibold text-slate-950">
                    Browse articles
                </Link>
            </main>
        );
    }

    return (
        <main className="mx-auto max-w-5xl px-4 py-12 sm:px-6 lg:px-8">
            <article className="overflow-hidden rounded-3xl border border-slate-800 bg-slate-900/60">
                <img src={blog.coverImage} alt={blog.title} className="h-72 w-full object-cover sm:h-96" />
                <div className="p-6 sm:p-10">
                    <div className="mb-6 flex flex-wrap items-center gap-3 text-sm text-slate-400">
                        <span className="rounded-full border border-cyan-400/30 bg-cyan-500/10 px-3 py-1 text-cyan-300">{blog.category}</span>
                        <span>{blog.readTime || '5 min read'}</span>
                        <span>By {blog.author?.name || 'Admin'}</span>
                    </div>

                    <div className="flex flex-col gap-5 md:flex-row md:items-start md:justify-between">
                        <h1 className="text-3xl font-black leading-tight text-white sm:text-5xl">{blog.title}</h1>
                        {canManagePost && (
                            <div className="flex gap-2">
                                <Link
                                    to={`/blog/${blog.slug}/edit`}
                                    className="rounded-full border border-cyan-500/40 bg-cyan-500/10 px-3 py-2 text-xs font-semibold text-cyan-300 transition hover:bg-cyan-500/20"
                                >
                                    Edit
                                </Link>
                                <button
                                    type="button"
                                    onClick={handleDelete}
                                    className="rounded-full border border-red-500/40 bg-red-500/10 px-3 py-2 text-xs font-semibold text-red-300 transition hover:bg-red-500/20"
                                >
                                    Delete
                                </button>
                            </div>
                        )}
                    </div>

                    <p className="mt-5 text-lg leading-8 text-slate-300">{blog.excerpt}</p>

                    <div className="mt-8 space-y-5 text-base leading-8 text-slate-300">
                        <p>{blog.content}</p>
                    </div>

                    <div className="mt-10 flex items-center justify-between border-t border-slate-800 pt-6 text-sm text-slate-400">
                        <span>{new Date(blog.createdAt).toLocaleDateString(undefined, { month: 'long', day: 'numeric', year: 'numeric' })}</span>
                        <Link to="/blogs" className="text-cyan-300 hover:text-cyan-200">← Back to articles</Link>
                    </div>
                </div>
            </article>
        </main>
    );
};

export default BlogDetails;
