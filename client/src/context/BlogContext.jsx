import { createContext, useEffect, useMemo, useState } from 'react';
import API from '../services/api';

const mockBlogs = [
    {
        _id: '1',
        title: 'Building scalable APIs with Node.js and Express',
        slug: 'building-scalable-apis-with-nodejs-and-express',
        excerpt: 'Learn the key patterns for building APIs that remain reliable as traffic grows.',
        content: 'Modern applications need clean API boundaries, consistent validation, and observability from day one. In this article, we explore a strong project structure, error handling, pagination, and monitoring techniques for Node.js APIs built with Express.',
        category: 'Node.js',
        coverImage: 'https://images.unsplash.com/photo-1558494949-ef010cbdcc31?auto=format&fit=crop&w=1200&q=80',
        author: { name: 'Aisha Khan' },
        createdAt: '2025-10-18T12:00:00.000Z',
        readTime: '7 min read',
    },
    {
        _id: '2',
        title: 'React patterns that keep large teams productive',
        slug: 'react-patterns-that-keep-large-teams-productive',
        excerpt: 'From composition to hooks, these patterns help teams scale without chaos.',
        content: 'Large React applications shine when the component model is predictable. We cover component boundaries, state lifting, reusable hooks, and how to keep UI logic readable as the codebase grows.',
        category: 'React',
        coverImage: 'https://images.unsplash.com/photo-1633356122544-f134324a6cee?auto=format&fit=crop&w=1200&q=80',
        author: { name: 'Lucas Reed' },
        createdAt: '2025-09-11T12:00:00.000Z',
        readTime: '5 min read',
    },
    {
        _id: '3',
        title: 'Designing accessible interfaces for developer tools',
        slug: 'designing-accessible-interfaces-for-developer-tools',
        excerpt: 'Focus on contrast, focus states, and meaningful structure to improve the experience.',
        content: 'Accessibility should be part of UX from the first mockup. We take a practical look at keyboard support, color decisions, and semantics that make dashboards easier to navigate for everyone.',
        category: 'CSS',
        coverImage: 'https://images.unsplash.com/photo-1516321318423-f06f85e504b3?auto=format&fit=crop&w=1200&q=80',
        author: { name: 'Maya Patel' },
        createdAt: '2025-08-03T12:00:00.000Z',
        readTime: '6 min read',
    },
    {
        _id: '4',
        title: 'How to grow from junior developer to senior engineer',
        slug: 'how-to-grow-from-junior-developer-to-senior-engineer',
        excerpt: 'Good habits and ownership matter more than years on a résumé.',
        content: 'Senior engineering is a mix of technical depth, communication, and decision-making. This guide breaks down how to build judgment, influence architecture, and become a reliable teammate.',
        category: 'Career',
        coverImage: 'https://images.unsplash.com/photo-1522202176988-66273c2fd55f?auto=format&fit=crop&w=1200&q=80',
        author: { name: 'Noah Chen' },
        createdAt: '2025-07-17T12:00:00.000Z',
        readTime: '8 min read',
    },
    {
        _id: '5',
        title: 'Writing cleaner JavaScript with modern patterns',
        slug: 'writing-cleaner-javascript-with-modern-patterns',
        excerpt: 'A practical checklist for writing code that is easier to reason about and maintain.',
        content: 'Clean JavaScript is about clear naming, small functions, and deliberate reuse. We review the patterns that help teams keep systems readable without sacrificing iteration speed.',
        category: 'JavaScript',
        coverImage: 'https://images.unsplash.com/photo-1515879218367-8466d910aaa4?auto=format&fit=crop&w=1200&q=80',
        author: { name: 'Sara Gomez' },
        createdAt: '2025-06-28T12:00:00.000Z',
        readTime: '4 min read',
    },
    {
        _id: '6',
        title: 'DevOps habits that reduce production stress',
        slug: 'devops-habits-that-reduce-production-stress',
        excerpt: 'Small automation habits can prevent major outages when shipping fast.',
        content: 'Production resilience is usually built through reliable deploy loops, fast rollback paths, and clear ownership. We share the habits that make teams calmer when incidents happen.',
        category: 'DevOps',
        coverImage: 'https://images.unsplash.com/photo-1555949963-aa79dcee981c?auto=format&fit=crop&w=1200&q=80',
        author: { name: 'Daniel Brooks' },
        createdAt: '2025-05-09T12:00:00.000Z',
        readTime: '9 min read',
    },
];

export const BlogContext = createContext();

const normalizeAuthor = (author) => ({
    name: author?.name || 'DevBlog Writer',
    email: author?.email || '',
});

export const BlogProvider = ({ children }) => {
    const [blogs, setBlogs] = useState(mockBlogs);
    const [loading, setLoading] = useState(false);
    const [selectedCategory, setSelectedCategory] = useState('All');
    const [searchTerm, setSearchTerm] = useState('');

    const isOwner = (blog, user) => {
        if (!blog || !user) return false;
        const author = normalizeAuthor(blog.author);
        const currentUser = {
            name: user.name || '',
            email: user.email || '',
        };

        return (
            author.email && currentUser.email && author.email.toLowerCase() === currentUser.email.toLowerCase()
        ) || (
                author.name && currentUser.name && author.name.toLowerCase() === currentUser.name.toLowerCase()
            );
    };

    const addBlog = (newBlog) => {
        if (!newBlog) return;

        setBlogs((prev) => {
            const normalized = {
                ...newBlog,
                _id: newBlog._id || `local-${Date.now()}`,
                slug: newBlog.slug || newBlog.title?.toLowerCase().replace(/[^a-z0-9]+/g, '-').replace(/(^-|-$)/g, '') || `post-${Date.now()}`,
                author: normalizeAuthor(newBlog.author),
                createdAt: newBlog.createdAt || new Date().toISOString(),
                readTime: newBlog.readTime || '4 min read',
            };

            const exists = prev.some((blog) => blog._id === normalized._id || blog.slug === normalized.slug);
            return exists ? prev : [normalized, ...prev];
        });
    };

    const updateBlog = (blogIdOrSlug, updatedBlog) => {
        setBlogs((prev) => prev.map((blog) => {
            if (blog._id === blogIdOrSlug || blog.slug === blogIdOrSlug) {
                return {
                    ...blog,
                    ...updatedBlog,
                    author: normalizeAuthor(updatedBlog.author || blog.author),
                    slug: updatedBlog.slug || blog.slug,
                };
            }
            return blog;
        }));
    };

    const deleteBlog = (blogIdOrSlug) => {
        setBlogs((prev) => prev.filter((blog) => blog._id !== blogIdOrSlug && blog.slug !== blogIdOrSlug));
    };

    const fetchBlogs = async (page = 1) => {
        setLoading(true);
        try {
            const { data } = await API.get(`/blogs?category=${selectedCategory}&search=${searchTerm}&page=${page}`);
            if (Array.isArray(data?.blogs) && data.blogs.length) {
                setBlogs(data.blogs);
            } else {
                setBlogs(mockBlogs);
            }
        } catch (error) {
            console.warn('Falling back to local blog data.', error.message || error);
            setBlogs(mockBlogs);
        } finally {
            setLoading(false);
        }
    };

    useEffect(() => {
        fetchBlogs();
    }, [selectedCategory, searchTerm]);

    const categories = useMemo(() => ['All', ...new Set(mockBlogs.map((blog) => blog.category))], []);

    return (
        <BlogContext.Provider
            value={{
                blogs,
                loading,
                selectedCategory,
                setSelectedCategory,
                searchTerm,
                setSearchTerm,
                fetchBlogs,
                addBlog,
                updateBlog,
                deleteBlog,
                isOwner,
                categories,
            }}
        >
            {children}
        </BlogContext.Provider>
    );
};