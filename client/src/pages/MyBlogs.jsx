import { useContext } from 'react';
import { Link } from 'react-router-dom';
import { AuthContext } from '../context/AuthContext';
import { BlogContext } from '../context/BlogContext';
import BlogCard from '../components/BlogCard';

const MyBlogs = () => {
    const { user } = useContext(AuthContext);
    const { blogs, isOwner } = useContext(BlogContext);

    const myBlogs = blogs.filter((blog) => isOwner(blog, user));

    return (
        <main className="mx-auto max-w-6xl px-4 py-12 sm:px-6 lg:px-8">
            <div className="mb-8 flex flex-col gap-4 sm:flex-row sm:items-end sm:justify-between">
                <div>
                    <p className="text-xs font-semibold uppercase tracking-[0.2em] text-cyan-300">Your writing</p>
                    <h1 className="mt-2 text-3xl font-bold text-white">My blogs</h1>
                </div>
                <Link to="/create-blog" className="rounded-full bg-cyan-500 px-5 py-3 text-sm font-semibold text-slate-950">
                    New post
                </Link>
            </div>

            {myBlogs.length === 0 ? (
                <div className="rounded-2xl border border-slate-800 bg-slate-900/60 p-8 text-slate-300">
                    You haven’t published any blog yet.
                </div>
            ) : (
                <div className="grid gap-6 md:grid-cols-2 xl:grid-cols-3">
                    {myBlogs.map((blog) => (
                        <BlogCard key={blog._id} blog={blog} />
                    ))}
                </div>
            )}
        </main>
    );
};

export default MyBlogs;
