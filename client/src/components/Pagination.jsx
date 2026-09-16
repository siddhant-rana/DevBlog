const Pagination = ({ page, totalPages, onPageChange }) => {
    return (
        <div className="mt-10 flex flex-wrap items-center justify-center gap-3">
            <button
                type="button"
                onClick={() => onPageChange(page - 1)}
                disabled={page === 1}
                className="rounded-full border border-slate-700 bg-slate-900 px-4 py-2 text-sm text-slate-300 disabled:cursor-not-allowed disabled:opacity-40"
            >
                Previous
            </button>
            <span className="rounded-full border border-slate-700 bg-slate-900 px-4 py-2 text-sm text-slate-200">
                {page} / {totalPages}
            </span>
            <button
                type="button"
                onClick={() => onPageChange(page + 1)}
                disabled={page === totalPages}
                className="rounded-full border border-slate-700 bg-slate-900 px-4 py-2 text-sm text-slate-300 disabled:cursor-not-allowed disabled:opacity-40"
            >
                Next
            </button>
        </div>
    );
};

export default Pagination;
