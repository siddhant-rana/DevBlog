import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { GoogleOAuthProvider } from '@react-oauth/google';
import { BlogProvider } from './context/BlogContext';
import { AuthProvider } from './context/AuthContext';
import Navbar from './components/Navbar';
import Footer from './components/Footer';
import ProtectedRoute from './components/ProtectedRoute';
import Home from './pages/Home';
import Blogs from './pages/Blogs';
import BlogDetails from './pages/BlogDetails';
import Categories from './pages/Categories';
import About from './pages/About';
import Contact from './pages/Contact';
import Login from './pages/Login';
import Register from './pages/Register';
import Profile from './pages/Profile';
import CreateBlog from './pages/CreateBlog';
import EditBlog from './pages/EditBlog';
import MyBlogs from './pages/MyBlogs';
import NotFound from './pages/NotFound';

const App = () => {
    return (
        <GoogleOAuthProvider clientId={import.meta.env.VITE_GOOGLE_CLIENT_ID || 'missing-google-client-id'}>
            <Router>
                <AuthProvider>
                    <BlogProvider>
                        <div className="min-h-screen bg-slate-950 text-slate-100">
                            <Navbar />
                            <Routes>
                                <Route path="/" element={<Home />} />
                                <Route path="/blogs" element={<Blogs />} />
                                <Route path="/blog/:slug" element={<BlogDetails />} />
                                <Route path="/categories" element={<Categories />} />
                                <Route path="/about" element={<About />} />
                                <Route path="/contact" element={<Contact />} />
                                <Route path="/login" element={<Login />} />
                                <Route path="/register" element={<Register />} />
                                <Route
                                    path="/profile"
                                    element={
                                        <ProtectedRoute>
                                            <Profile />
                                        </ProtectedRoute>
                                    }
                                />
                                <Route
                                    path="/create-blog"
                                    element={
                                        <ProtectedRoute>
                                            <CreateBlog />
                                        </ProtectedRoute>
                                    }
                                />
                                <Route
                                    path="/my-blogs"
                                    element={
                                        <ProtectedRoute>
                                            <MyBlogs />
                                        </ProtectedRoute>
                                    }
                                />
                                <Route
                                    path="/blog/:slug/edit"
                                    element={
                                        <ProtectedRoute>
                                            <EditBlog />
                                        </ProtectedRoute>
                                    }
                                />
                                <Route path="*" element={<NotFound />} />
                            </Routes>
                            <Footer />
                        </div>
                    </BlogProvider>
                </AuthProvider>
            </Router>
        </GoogleOAuthProvider>
    );
};

export default App;

