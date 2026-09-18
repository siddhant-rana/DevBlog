const express = require('express');
const cors = require('cors');
const dotenv = require('dotenv');
const connectDB = require('./config/db');
const { blogs, categories } = require('./seed/mockData');

dotenv.config();

const app = express();

const allowedOrigins = [
    process.env.CLIENT_URL,
    'http://localhost:5173',
    'http://127.0.0.1:5173',
    'https://devblog-2-y4e2.onrender.com',
].filter(Boolean);

app.use(
    cors({
        origin: (origin, callback) => {
            if (!origin || allowedOrigins.includes(origin)) {
                callback(null, true);
                return;
            }

            callback(new Error('Not allowed by CORS'));
        },
        credentials: true,
    })
);

// ===============================
// BODY PARSER
// ===============================
app.use(express.json({ limit: '10mb' }));
app.use(express.urlencoded({ extended: true, limit: '10mb' }));

// ===============================
// DATABASE CONNECTION
// ===============================
const safeConnect = async () => {
    if (!process.env.MONGO_URI) {
        console.log(
            'MongoDB URI not set. Running in demo mode with mock data.'
        );
        return;
    }

    try {
        await connectDB();
        console.log('MongoDB Connected Successfully');
    } catch (error) {
        console.warn(
            'Database connection failed, continuing in demo mode.',
            error.message
        );
    }
};

safeConnect();

// ===============================
// HEALTH CHECK
// ===============================
app.get('/api/health', (req, res) => {
    res.json({
        status: 'ok',
        message: 'MERN Dev Blog API is running'
    });
});

// ===============================
// DEMO BLOGS
// ===============================
app.get('/api/blogs', (req, res) => {
    const {
        category = 'All',
        search = '',
        page = 1
    } = req.query;

    const normalizedCategory = String(category || 'All');
    const normalizedSearch = String(search || '')
        .trim()
        .toLowerCase();

    const filtered = blogs.filter((blog) => {
        const matchesCategory =
            normalizedCategory === 'All' ||
            blog.category === normalizedCategory;

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

    const paginated = filtered.slice(
        start,
        start + pageSize
    );

    res.json({
        blogs: paginated,
        totalPages: Math.max(
            1,
            Math.ceil(filtered.length / pageSize)
        ),
        page: pageNumber,
        total: filtered.length
    });
});

// ===============================
// DEMO CATEGORIES
// ===============================
app.get('/api/categories', (req, res) => {
    res.json({
        categories
    });
});

// ===============================
// DEMO BLOG BY SLUG
// ===============================
app.get('/api/blogs/:slug', (req, res) => {
    const blog = blogs.find(
        (item) => item.slug === req.params.slug
    );

    if (!blog) {
        return res.status(404).json({
            message: 'Blog not found'
        });
    }

    return res.json({
        blog
    });
});

// ===============================
// API ROUTES
// ===============================
app.use('/api/auth', require('./routes/authRoutes'));
app.use('/api/blogs', require('./routes/blogRoutes'));
app.use('/api/categories', require('./routes/categoryRoutes'));
app.use('/api/comments', require('./routes/commentRoutes'));
app.use('/api/contact', require('./routes/contactRoutes'));

// ===============================
// 404 HANDLER
// ===============================
app.use((req, res) => {
    res.status(404).json({
        success: false,
        message: 'API route not found'
    });
});

// ===============================
// ERROR HANDLER
// ===============================
app.use((err, req, res, next) => {
    console.error('Server Error:', err);

    res.status(err.status || 500).json({
        success: false,
        message: err.message || 'Internal Server Error'
    });
});

// ===============================
// START SERVER
// ===============================
const PORT = Number(process.env.PORT) || 5000;

app.listen(PORT, '0.0.0.0', () => {
    console.log(`Server running on port ${PORT}`);
});