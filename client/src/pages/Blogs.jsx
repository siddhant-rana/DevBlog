import { useContext, useMemo, useState } from 'react';
import { BlogContext } from '../context/BlogContext';
import BlogGrid from '../components/BlogGrid';
import SearchBar from '../components/SearchBar';
import CategoryCard from '../components/CategoryCard';
import Loader from '../components/Loader';

const Blogs = () => {
    const { blogs, loading, selectedCategory, setSelectedCategory, searchTerm, setSearchTerm, categories } = useContext(BlogContext);
    const [currentPage, setCurrentPage] = useState(1);

    const filteredBlogs = useMemo(() => {
        const searchValue = searchTerm.trim().toLowerCase();
        return blogs.filter((blog) => {
            const matchesCategory = selectedCategory === 'All' || blog.category === selectedCategory;
            const matchesSearch =
                !searchValue ||
                blog.title.toLowerCase().includes(searchValue) ||
                blog.excerpt.toLowerCase().includes(searchValue) ||
                blog.category.toLowerCase().includes(searchValue);
            return matchesCategory && matchesSearch;
        });
    }, [blogs, selectedCategory, searchTerm]);

    const itemsPerPage = 6;
    const totalPages = Math.max(1, Math.ceil(filteredBlogs.length / itemsPerPage));
    const pageStart = (currentPage - 1) * itemsPerPage;
    const currentBlogs = filteredBlogs.slice(pageStart, pageStart + itemsPerPage);

    const handleCategoryChange = (category) => {
        setSelectedCategory(category);
        setCurrentPage(1);
    };

    const handleSearch = (term) => {
        setSearchTerm(term);
        setCurrentPage(1);
    };

    return (
        <main className="mx-auto max-w-6xl px-4 py-12 sm:px-6 lg:px-8">
            <div className="mb-8 flex flex-col gap-6">
                <div>
                    <p className="text-xs font-semibold uppercase tracking-[0.2em] text-cyan-300">Discover</p>
                    <h1 className="mt-2 text-3xl font-bold text-white sm:text-4xl">All articles</h1>
                </div>

                <div className="grid gap-4 lg:grid-cols-[1.2fr_0.8fr]">
                    <SearchBar value={searchTerm} onChange={handleSearch} />
                    <div className="rounded-2xl border border-slate-800 bg-slate-900/60 p-3 text-sm text-slate-300">
                        Showing <span className="font-semibold text-white">{filteredBlogs.length}</span> articles
                    </div>
                </div>
            </div>

            <div className="mb-8 grid gap-4 sm:grid-cols-2 xl:grid-cols-4">
                {categories.map((category) => (
                    <CategoryCard
                        key={category}
                        category={category}
                        count={blogs.filter((blog) => category === 'All' || blog.category === category).length}
                        active={selectedCategory === category}
                        onClick={() => handleCategoryChange(category)}
                    />
                ))}
            </div>

            {loading ? <Loader /> : <BlogGrid blogs={currentBlogs} />}

            {totalPages > 1 && (
                <div className="mt-10 flex items-center justify-center gap-3">
                    <button
                        type="button"
                        onClick={() => setCurrentPage((page) => Math.max(1, page - 1))}
                        disabled={currentPage === 1}
                        className="rounded-full border border-slate-700 bg-slate-900 px-4 py-2 text-sm text-slate-300 disabled:cursor-not-allowed disabled:opacity-40"
                    >
                        Previous
                    </button>
                    <span className="rounded-full border border-slate-700 bg-slate-900 px-4 py-2 text-sm text-slate-100">
                        {currentPage} / {totalPages}
                    </span>
                    <button
                        type="button"
                        onClick={() => setCurrentPage((page) => Math.min(totalPages, page + 1))}
                        disabled={currentPage === totalPages}
                        className="rounded-full border border-slate-700 bg-slate-900 px-4 py-2 text-sm text-slate-300 disabled:cursor-not-allowed disabled:opacity-40"
                    >
                        Next
                    </button>
                </div>
            )}
        </main>
    );
};

export default Blogs;
