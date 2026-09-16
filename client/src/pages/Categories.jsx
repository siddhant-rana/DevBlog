import { useContext } from 'react';
import { BlogContext } from '../context/BlogContext';
import CategoryCard from '../components/CategoryCard';

const Categories = () => {
    const { blogs, categories, selectedCategory, setSelectedCategory } = useContext(BlogContext);

    return (
        <main className="mx-auto max-w-6xl px-4 py-12 sm:px-6 lg:px-8">
            <p className="text-xs font-semibold uppercase tracking-[0.2em] text-cyan-300">Topics</p>
            <h1 className="mt-2 text-3xl font-black text-white sm:text-4xl">Explore by category</h1>

            <div className="mt-8 grid gap-5 md:grid-cols-2 xl:grid-cols-4">
                {categories.map((category) => (
                    <CategoryCard
                        key={category}
                        category={category}
                        count={blogs.filter((blog) => category === 'All' || blog.category === category).length}
                        active={selectedCategory === category}
                        onClick={() => setSelectedCategory(category)}
                    />
                ))}
            </div>
        </main>
    );
};

export default Categories;
