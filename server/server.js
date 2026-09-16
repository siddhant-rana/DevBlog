const express = require('express');
const cors = require('cors');
const dotenv = require('dotenv');
const connectDB = require('./config/db');
const { blogs, categories } = require('./seed/mockData');

dotenv.config();

const app = express();

app.use(cors({ origin: 'https://devblog-1-2a53.onrender.com' }));
app.use(express.json({ limit: '10mb' }));
app.use(express.urlencoded({ extended: true, limit: '10mb' }));

const safeConnect = async () => {
    if (!process.env.MONGO_URI) {
        console.log('MongoDB URI not set. Running in demo mode with mock data.');
        return;
    }

    try {
        await connectDB();
    } catch (error) {
        console.warn('Database connection failed, continuing in demo mode.', error.message);
    }
};

safeConnect();

app.get('/api/health', (req, res) => {
    res.json({ status: 'ok', message: 'MERN Dev Blog API is running' });
});

app.get('/api/blogs', (req, res) => {
    const { category = 'All', search = '', page = 1 } = req.query;
    const normalizedCategory = String(category || 'All');
    const normalizedSearch = String(search || '').trim().toLowerCase();
    const filtered = blogs.filter((blog) => {
        const matchesCategory = normalizedCategory === 'All' || blog.category === normalizedCategory;
        const matchesSearch =
            !normalizedSearch ||
            blog.title.toLowerCase().includes(normalizedSearch) ||
            blog.excerpt.toLowerCase().includes(normalizedSearch) ||
            blog.category.toLowerCase().includes(normalizedSearch);
        return matchesCategory && matchesSearch;
    });

    const pageSize = 6;
    const pageNumber = Number(page) || 1;
    const start = (pageNumber - 1) * pageSize;
    const paginated = filtered.slice(start, start + pageSize);

    res.json({
        blogs: paginated,
        totalPages: Math.max(1, Math.ceil(filtered.length / pageSize)),
        page: pageNumber,
        total: filtered.length,
    });
});

app.get('/api/categories', (req, res) => {
    res.json({ categories });
});

app.get('/api/blogs/:slug', (req, res) => {
    const blog = blogs.find((item) => item.slug === req.params.slug);
    if (!blog) {
        return res.status(404).json({ message: 'Blog not found' });
    }

    return res.json({ blog });
});

app.use('/api/auth', require('./routes/authRoutes'));
app.use('/api/blogs', require('./routes/blogRoutes'));
app.use('/api/categories', require('./routes/categoryRoutes'));
app.use('/api/comments', require('./routes/commentRoutes'));

const PORT = Number(process.env.PORT) || 5001;
app.listen(PORT, '0.0.0.0', () => {
    console.log(`Server running on port ${PORT}`);
});
