const express = require('express');
const { blogs } = require('../seed/mockData');
const router = express.Router();

const slugify = (value) =>
    String(value || '')
        .toLowerCase()
        .trim()
        .replace(/[^a-z0-9]+/g, '-')
        .replace(/(^-|-$)/g, '') || `post-${Date.now()}`;

router.get('/', (req, res) => {
    const { category = 'All', search = '' } = req.query;
    const filtered = blogs.filter((blog) => {
        const matchesCategory = category === 'All' || blog.category === category;
        const matchesSearch =
            !search ||
            blog.title.toLowerCase().includes(String(search).toLowerCase()) ||
            blog.excerpt.toLowerCase().includes(String(search).toLowerCase());
        return matchesCategory && matchesSearch;
    });

    return res.json({ blogs: filtered, total: filtered.length });
});

router.post('/', (req, res) => {
    const { title, content, category, tags, excerpt, coverImage, author } = req.body || {};

    if (!title || !content) {
        return res.status(400).json({ message: 'Title and content are required.' });
    }

    const newBlog = {
        _id: `post-${Date.now()}`,
        title: String(title).trim(),
        slug: slugify(title),
        category: category || 'React',
        coverImage: coverImage || 'https://images.unsplash.com/photo-1516321318423-f06f85e504b3?auto=format&fit=crop&w=1200&q=80',
        tags: tags ? String(tags).split(',').map((tag) => tag.trim()).filter(Boolean) : [],
        excerpt: excerpt || String(content).trim().slice(0, 140),
        content: String(content).trim(),
        author: {
            name: author?.name || 'DevBlog Writer',
            email: author?.email || '',
        },
        createdAt: new Date().toISOString(),
        readTime: '4 min read',
    };

    blogs.unshift(newBlog);
    return res.status(201).json(newBlog);
});

router.put('/:slug', (req, res) => {
    const blogIndex = blogs.findIndex((blog) => blog.slug === req.params.slug || blog._id === req.params.slug);
    if (blogIndex === -1) {
        return res.status(404).json({ message: 'Blog not found.' });
    }

    const updated = {
        ...blogs[blogIndex],
        ...req.body,
        slug: req.body.slug || blogs[blogIndex].slug,
        title: req.body.title || blogs[blogIndex].title,
        content: req.body.content || blogs[blogIndex].content,
        excerpt: req.body.excerpt || blogs[blogIndex].excerpt,
        category: req.body.category || blogs[blogIndex].category,
        coverImage: req.body.coverImage || blogs[blogIndex].coverImage,
    };

    blogs[blogIndex] = updated;
    return res.json({ message: 'Blog updated successfully.', blog: updated });
});

router.delete('/:slug', (req, res) => {
    const index = blogs.findIndex((blog) => blog.slug === req.params.slug || blog._id === req.params.slug);

    if (index === -1) {
        return res.status(404).json({ message: 'Blog not found.' });
    }

    const [removed] = blogs.splice(index, 1);
    return res.json({ message: 'Blog deleted successfully.', deletedBlog: removed });
});

router.get('/:slug', (req, res) => {
    const blog = blogs.find((item) => item.slug === req.params.slug);
    if (!blog) {
        return res.status(404).json({ message: 'Blog not found' });
    }

    return res.json({ blog });
});

module.exports = router;
