import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { Plus, Edit, Trash2, Eye, EyeOff } from 'lucide-react';
import { supabase } from '../../supabase';
import { useConfirm } from '../../context/ConfirmContext';

const ManageBlogs = () => {
  const confirm = useConfirm();
  const [blogs, setBlogs] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');

  const fetchBlogs = async () => {
    try {
      const { data, error: fetchErr } = await supabase
        .from('Blog')
        .select('*')
        .order('createdAt', { ascending: false });
      if (fetchErr) throw fetchErr;
      setBlogs(data || []);
    } catch (err: any) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchBlogs();
  }, []);

  const toggleVisibility = async (id: string, currentStatus: boolean) => {
    try {
      const { error: updateErr } = await supabase
        .from('Blog')
        .update({ isPublished: !currentStatus })
        .eq('id', id);
      if (updateErr) throw updateErr;
      
      // Update local state
      setBlogs(blogs.map(b => b.id === id ? { ...b, isPublished: !currentStatus } : b));
    } catch (err: any) {
      await confirm({
        title: 'Error',
        message: err.message,
        alertOnly: true,
        variant: 'danger',
      });
    }
  };

  const deleteBlog = async (id: string, title?: string) => {
    const ok = await confirm({
      title: 'Delete Blog Post',
      message: `Are you sure you want to delete the blog post ${title ? `"${title}"` : ''}? This post will be permanently removed.`,
      confirmText: 'Delete Blog',
      variant: 'danger',
      icon: 'trash',
    });
    if (!ok) return;
    
    try {
      const { error: deleteErr } = await supabase
        .from('Blog')
        .delete()
        .eq('id', id);
      if (deleteErr) throw deleteErr;
      setBlogs(blogs.filter(b => b.id !== id));
    } catch (err: any) {
      await confirm({
        title: 'Error',
        message: err.message,
        alertOnly: true,
        variant: 'danger',
      });
    }
  };

  if (loading) return <div className="p-8">Loading blogs...</div>;
  if (error) return <div className="p-8 text-red-500">{error}</div>;

  return (
    <div className="w-full space-y-8 animate-in fade-in slide-in-from-bottom-4">
      <div className="flex justify-between items-end">
        <div>
          <h1 className="text-3xl font-headline font-bold text-slate-800">Manage Blogs</h1>
          <p className="text-slate-500 mt-1">View, edit, and control visibility of your blog posts.</p>
        </div>
        <Link 
          to="/admin/blogs/create" 
          className="tactical-gradient text-white px-6 py-2 font-bold uppercase tracking-wider text-sm flex items-center gap-2 rounded shadow-lg hover:-translate-y-0.5 transition-transform"
        >
          <Plus size={18} /> Create New
        </Link>
      </div>

      <div className="bg-white rounded-lg shadow-sm border border-slate-200 overflow-hidden">
        <div className="overflow-x-auto">
          <table className="w-full text-left border-collapse">
          <thead>
            <tr className="bg-slate-50 border-b border-slate-200 text-slate-600 text-sm">
              <th className="p-4 font-bold">Title</th>
              <th className="p-4 font-bold">Author</th>
              <th className="p-4 font-bold">Date</th>
              <th className="p-4 font-bold text-center">Status</th>
              <th className="p-4 font-bold text-right">Actions</th>
            </tr>
          </thead>
          <tbody>
            {blogs.length === 0 && (
              <tr>
                <td colSpan={5} className="p-8 text-center text-slate-500">
                  No blogs found. Create your first blog post!
                </td>
              </tr>
            )}
            {blogs.map((blog) => (
              <tr key={blog.id} className="border-b border-slate-100 hover:bg-slate-50 transition-colors">
                <td className="p-4">
                  <div className="font-bold text-slate-800 line-clamp-1">{blog.title}</div>
                  <div className="text-xs text-slate-500 mt-1">/{blog.slug}</div>
                </td>
                <td className="p-4 text-sm text-slate-600">
                  {blog.author?.name || 'Unknown'}
                </td>
                <td className="p-4 text-sm text-slate-600">
                  {new Date(blog.createdAt).toLocaleDateString()}
                </td>
                <td className="p-4 text-center">
                  <span className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium ${blog.isPublished ? 'bg-green-100 text-green-800' : 'bg-yellow-100 text-yellow-800'}`}>
                    {blog.isPublished ? 'Published' : 'Hidden'}
                  </span>
                </td>
                <td className="p-4 text-right">
                  <div className="flex items-center justify-end gap-2">
                    <button 
                      onClick={() => toggleVisibility(blog.id, blog.isPublished)}
                      className={`p-2 rounded hover:bg-slate-200 transition-colors ${blog.isPublished ? 'text-green-600' : 'text-slate-400'}`}
                      title={blog.isPublished ? "Hide from public" : "Publish to public"}
                    >
                      {blog.isPublished ? <Eye size={18} /> : <EyeOff size={18} />}
                    </button>
                    <Link 
                      to={`/admin/blogs/edit/${blog.id}`}
                      className="p-2 rounded text-primary hover:bg-primary-50 transition-colors"
                      title="Edit"
                    >
                      <Edit size={18} />
                    </Link>
                    <button 
                      onClick={() => deleteBlog(blog.id)}
                      className="p-2 rounded text-red-500 hover:bg-red-50 transition-colors"
                      title="Delete"
                    >
                      <Trash2 size={18} />
                    </button>
                  </div>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
        </div>
      </div>
    </div>
  );
};

export default ManageBlogs;
