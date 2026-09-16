import { useContext } from 'react';
import { BlogContext } from '../context/BlogContext';
import BlogCard from '../components/BlogCard';
import Hero from '../components/Hero';

const Home = () => {
    const { blogs, loading } = useContext(BlogContext);

    return (
        <div className="bg-slate-950 text-slate-100">
            <Hero />
            <main className="mx-auto max-w-6xl px-4 py-12 sm:px-6 lg:px-8">
                <div className="mb-8 flex flex-col gap-3 sm:flex-row sm:items-end sm:justify-between sm:gap-4">
                    <div>
                        <p className="text-xs font-semibold uppercase tracking-[0.2em] text-cyan-300">Fresh reads</p>
                        <h2 className="mt-2 text-3xl font-bold text-white">Latest Articles</h2>
                    </div>
                    <a href="/blogs" className="hidden text-sm font-medium text-cyan-300 hover:text-cyan-200 sm:inline-block">
                        View all posts →
                    </a>
                </div>

                {loading ? (
                    <div className="rounded-2xl border border-slate-800 bg-slate-900/40 px-6 py-16 text-center text-slate-400">
                        Loading articles...
                    </div>
                ) : (
                    <div className="grid gap-6 md:grid-cols-2 xl:grid-cols-3">
                        {blogs.slice(0, 6).map((blog) => (
                            <BlogCard key={blog._id} blog={blog} />
                        ))}
                    </div>
                )}
            </main>
        </div>
    );
};

export default Home;