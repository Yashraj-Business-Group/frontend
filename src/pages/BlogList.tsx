import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { supabase } from '../supabase';
import { useSEO } from '../hooks/useSEO';

interface Blog {
  id: string;
  title: string;
  slug: string;
  coverImage?: string;
  createdAt: string;
  author?: {
    name: string;
  };
}

const BlogList = () => {
  useSEO({
    title: 'Insights & Blog',
    description: 'Read the latest insights on security, facility management, and corporate solutions from Yashraj Business Group.'
  });
  const [blogs, setBlogs] = useState<Blog[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchBlogs = async () => {
      try {
        const { data, error } = await supabase
          .from('Blog')
          .select('*')
          .eq('isPublished', true)
          .order('createdAt', { ascending: false });
        if (error) throw error;
        setBlogs(data || []);
      } catch (err) {
        console.error(err);
      } finally {
        setLoading(false);
      }
    };
    fetchBlogs();
  }, []);

  return (
    <div className="bg-surface-container-low min-h-screen py-24 px-8">
      <div className="max-w-7xl mx-auto">
        <h1 className="font-headline text-5xl font-black text-primary mb-12 uppercase tracking-tighter">
          Insights & Updates
        </h1>
        
        {loading ? (
          <div className="text-center py-20 text-slate-500 font-bold uppercase tracking-widest">
            Loading...
          </div>
        ) : blogs.length === 0 ? (
          <div className="bg-white p-12 text-center text-slate-500 rounded tactical-shadow">
            No published blogs available yet.
          </div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {blogs.map((blog) => (
              <Link 
                key={blog.id} 
                to={`/blog/${blog.slug}`}
                className="bg-white tactical-shadow group hover:-translate-y-1 transition-transform overflow-hidden block"
              >
                <div className="aspect-video bg-slate-200 overflow-hidden relative">
                  {blog.coverImage ? (
                    <img 
                      src={blog.coverImage} 
                      alt={blog.title} 
                      className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                    />
                  ) : (
                    <div className="w-full h-full bg-primary-container flex items-center justify-center text-primary font-bold uppercase tracking-widest text-sm">
                      No Image
                    </div>
                  )}
                </div>
                <div className="p-8">
                  <div className="text-xs text-slate-500 uppercase tracking-wider mb-2 font-bold flex items-center justify-between">
                    <span>{new Date(blog.createdAt).toLocaleDateString()}</span>
                    <span className="text-primary">{blog.author?.name || 'Admin'}</span>
                  </div>
                  <h2 className="font-headline text-2xl font-bold text-slate-800 group-hover:text-primary transition-colors line-clamp-2">
                    {blog.title}
                  </h2>
                  <div className="mt-6 text-primary font-bold uppercase text-xs tracking-widest flex items-center gap-2">
                    Read Article <span className="material-symbols-outlined text-sm">trending_flat</span>
                  </div>
                </div>
              </Link>
            ))}
          </div>
        )}
      </div>
    </div>
  );
};

export default BlogList;
