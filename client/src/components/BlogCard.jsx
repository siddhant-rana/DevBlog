import { useContext } from 'react';
import { Link } from 'react-router-dom';
import { BlogContext } from '../context/BlogContext';
import { AuthContext } from '../context/AuthContext';

const BlogCard = ({ blog }) => {
    const { deleteBlog, isOwner } = useContext(BlogContext);
    const { user } = useContext(AuthContext);
    const date = blog.createdAt ? new Date(blog.createdAt).toLocaleDateString(undefined, {
        month: 'short',
        day: 'numeric',
        year: 'numeric',
    }) : 'Recently';
    const canManagePost = isOwner(blog, user);

    const handleDelete = (event) => {
        event.preventDefault();
        event.stopPropagation();
        deleteBlog(blog._id || blog.slug);
    };

    return (
        <article className="group relative overflow-hidden rounded-2xl border border-slate-800 bg-slate-900/70 shadow-lg shadow-slate-950/20 transition duration-300 hover:-translate-y-1 hover:border-cyan-500/50 hover:shadow-cyan-950/30">
            {canManagePost && (
                <button
                    type="button"
                    onClick={handleDelete}
                    className="absolute right-3 top-3 z-10 rounded-full border border-red-500/30 bg-slate-950/80 px-2 py-1 text-[10px] font-medium text-red-300 transition hover:bg-red-500/10"
                >
                    Delete
                </button>
            )}

            <div className="overflow-hidden">
                <img
                    src={blog.coverImage}
                    alt={blog.title}
                    className="h-52 w-full object-cover transition duration-500 group-hover:scale-105"
                />
            </div>

            <div className="p-4 sm:p-5">
                <div className="flex flex-wrap items-center justify-between gap-2">
                    <span className="rounded-full border border-cyan-400/30 bg-cyan-500/10 px-2.5 py-1 text-[10px] font-semibold uppercase tracking-[0.15em] text-cyan-300">
                        {blog.category}
                    </span>
                    <span className="text-xs text-slate-400">{blog.readTime || '5 min read'}</span>
                </div>

                <h3 className="mt-4 text-xl font-bold text-white transition hover:text-cyan-300">
                    <Link to={`/blog/${blog.slug}`}>{blog.title}</Link>
                </h3>

                <p className="mt-3 line-clamp-3 text-sm leading-6 text-slate-400">{blog.excerpt}</p>

                <div className="mt-5 flex flex-wrap items-center justify-between gap-x-3 gap-y-1 border-t border-slate-800 pt-4 text-xs text-slate-400">
                    <span>By {blog.author?.name || 'Admin'}</span>
                    <span>{date}</span>
                </div>
            </div>
        </article>
    );
};

export default BlogCard;