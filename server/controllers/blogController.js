const Blog = require('../models/Blog');
const generateSlug = require('../utils/generateSlug');

// @desc    Get all blogs with filtering & pagination
// @route   GET /api/blogs
exports.getBlogs = async (req, res) => {
  try {
    const { category, search, page = 1, limit = 6 } = req.query;
    let query = {};

    if (category && category !== 'All') query.category = category;
    if (search) {
      query.$or = [
        { title: { $regex: search, $options: 'i' } },
        { content: { $regex: search, $options: 'i' } }
      ];
    }

    const count = await Blog.countDocuments(query);
    const blogs = await Blog.find(query)
      .populate('author', 'name avatar')
      .sort({ createdAt: -1 })
      .limit(limit * 1)
      .skip((page - 1) * limit);

    res.json({ blogs, totalPages: Math.ceil(count / limit), currentPage: Number(page) });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// @desc    Create new blog
// @route   POST /api/blogs
exports.createBlog = async (req, res) => {
  try {
    const { title, content, category, tags, coverImage } = req.body;
    const slug = generateSlug(title);

    const blog = await Blog.create({
      title,
      slug,
      content,
      excerpt: content.substring(0, 120) + '...',
      category,
      tags: tags ? tags.split(',').map(t => t.trim()) : [],
      coverImage: coverImage || 'https://images.unsplash.com/photo-1555066931-4365d14bab8c',
      author: req.user._id
    });

    res.status(201).json(blog);
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
};