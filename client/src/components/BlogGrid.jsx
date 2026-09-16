import BlogCard from './BlogCard';

const BlogGrid = ({ blogs = [] }) => {
    if (!blogs.length) {
        return (
            <div className="rounded-2xl border border-dashed border-slate-700 bg-slate-900/40 px-6 py-12 text-center text-slate-400">
                No articles match the selected filters.
            </div>
        );
    }

    return (
        <div className="grid gap-6 sm:grid-cols-2 xl:grid-cols-3">
            {blogs.map((blog) => (
                <BlogCard key={blog._id || blog.slug} blog={blog} />
            ))}
        </div>
    );
};

export default BlogGrid;
