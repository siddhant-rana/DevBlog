const CategoryCard = ({ category, count, active, onClick }) => {
    return (
        <button
            type="button"
            onClick={onClick}
            className={`rounded-2xl border p-5 text-left transition ${active
                    ? 'border-cyan-400/60 bg-cyan-500/10 shadow-glow'
                    : 'border-slate-800 bg-slate-900/60 hover:border-slate-700 hover:bg-slate-900'
                }`}
        >
            <div className="flex items-center justify-between gap-3">
                <span className="text-lg font-semibold text-white">{category}</span>
                <span className="rounded-full bg-slate-800 px-2 py-1 text-xs text-slate-300">{count}</span>
            </div>
            <p className="mt-3 text-sm text-slate-400">Explore practical lessons and deep dives in {category.toLowerCase()}.</p>
        </button>
    );
};

export default CategoryCard;
