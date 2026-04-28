import Home from './pages/Home';

import { Routes, Route } from 'react-router-dom';

import Services from './pages/Services';
import JobPortal from './pages/JobPortal';
import Contact from './pages/Contact';
import BlogList from './pages/BlogList';
import BlogPost from './pages/BlogPost';

import PublicLayout from './layouts/PublicLayout';
import AdminLayout from './layouts/AdminLayout';
import AdminDashboard from './pages/admin/Dashboard';
import AdminPartners from './pages/admin/Partners';
import CreateBlog from './pages/admin/CreateBlog';
import ManageBlogs from './pages/admin/ManageBlogs';
import EditBlog from './pages/admin/EditBlog';
import CompanyProfile from './pages/CompanyProfile';
import ServiceDetail from './pages/ServiceDetail';
import Login from './pages/admin/Login';

function App() {
  return (
    <Routes>
      {/* Public Routes */}
      <Route element={<PublicLayout />}>
        <Route path="/" element={<Home />} />
        <Route path="/company-profile" element={<CompanyProfile />} />
        <Route path="/services" element={<Services />} />
        <Route path="/services/:serviceId" element={<ServiceDetail />} />
        <Route path="/job-portal" element={<JobPortal />} />
        <Route path="/contact" element={<Contact />} />
        <Route path="/blog" element={<BlogList />} />
        <Route path="/blog/:slug" element={<BlogPost />} />
      </Route>

      {/* Admin Login Route */}
      <Route path="/admin/login" element={<Login />} />

      {/* Admin Routes */}
      <Route path="/admin" element={<AdminLayout />}>
        <Route index element={<AdminDashboard />} />
        <Route path="requests" element={<div className="p-8">Service Requests Coming Soon</div>} />
        <Route path="jobs" element={<div className="p-8">Job Applications Coming Soon</div>} />
        <Route path="partners" element={<AdminPartners />} />
        <Route path="users" element={<div className="p-8">Users Coming Soon</div>} />
        <Route path="settings" element={<div className="p-8">Settings Coming Soon</div>} />
        <Route path="blogs" element={<ManageBlogs />} />
        <Route path="blogs/create" element={<CreateBlog />} />
        <Route path="blogs/edit/:id" element={<EditBlog />} />
      </Route>
    </Routes>
  );
}

export default App;
