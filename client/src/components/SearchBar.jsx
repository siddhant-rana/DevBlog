const SearchBar = ({ value, onChange, placeholder = 'Search articles...' }) => {
    return (
        <label className="relative block w-full">
            <span className="sr-only">Search</span>
            <input
                type="search"
                value={value}
                onChange={(event) => onChange(event.target.value)}
                placeholder={placeholder}
                className="w-full rounded-2xl border border-slate-700 bg-slate-900/70 px-4 py-3 pl-11 text-sm text-slate-100 outline-none transition placeholder:text-slate-500 focus:border-cyan-400 focus:ring-2 focus:ring-cyan-500/30"
            />
            <svg
                aria-hidden="true"
                viewBox="0 0 24 24"
                className="pointer-events-none absolute left-4 top-1/2 h-4 w-4 -translate-y-1/2 text-slate-500"
                fill="none"
                stroke="currentColor"
                strokeWidth="1.8"
            >
                <circle cx="11" cy="11" r="6" />
                <path d="M16 16L21 21" strokeLinecap="round" />
            </svg>
        </label>
    );
};

export default SearchBar;
