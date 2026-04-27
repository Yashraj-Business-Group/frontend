import React, { useEffect, useState } from 'react';
import { useParams, Link } from 'react-router-dom';

interface Blog {
  id: string;
  title: string;
  slug: string;
  content: string;
  coverImage?: string;
  createdAt: string;
  author: {
    name: string;
  };
}

const BlogPost = () => {
  const { slug } = useParams<{ slug: string }>();
  const [blog, setBlog] = useState<Blog | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');

  useEffect(() => {
    const fetchBlog = async () => {
      try {
        const res = await fetch(`http://localhost:5000/api/blogs/${slug}`);
        if (!res.ok) throw new Error('Blog not found');
        const data = await res.json();
        setBlog(data);
      } catch (err: any) {
        setError(err.message);
      } finally {
        setLoading(false);
      }
    };
    fetchBlog();
  }, [slug]);

  if (loading) return <div className="text-center py-40 text-slate-500 font-bold uppercase tracking-widest">Loading...</div>;
  if (error || !blog) return <div className="text-center py-40 text-red-500 font-bold uppercase tracking-widest">{error || 'Blog not found'}</div>;

  return (
    <article className="bg-surface-container-lowest min-h-screen pb-24">
      {/* Hero Header */}
      <div className="relative pt-32 pb-24 px-8 bg-primary text-white overflow-hidden">
        {blog.coverImage && (
          <div className="absolute inset-0 z-0">
            <img src={blog.coverImage} alt={blog.title} className="w-full h-full object-cover opacity-20" />
            <div className="absolute inset-0 bg-gradient-to-t from-primary to-transparent"></div>
          </div>
        )}
        <div className="relative z-10 max-w-4xl mx-auto text-center">
          <Link to="/blog" className="inline-flex items-center gap-2 text-blue-200 hover:text-white uppercase tracking-widest text-xs font-bold mb-8 transition-colors">
            <span className="material-symbols-outlined text-sm">arrow_back</span> Back to Insights
          </Link>
          <h1 className="font-headline text-4xl md:text-6xl font-black mb-6 tracking-tighter">
            {blog.title}
          </h1>
          <div className="flex items-center justify-center gap-6 text-sm text-blue-100 font-bold uppercase tracking-wider">
            <span className="flex items-center gap-2"><span className="material-symbols-outlined text-sm">person</span> {blog.author?.name || 'Admin'}</span>
            <span className="flex items-center gap-2"><span className="material-symbols-outlined text-sm">calendar_today</span> {new Date(blog.createdAt).toLocaleDateString()}</span>
          </div>
        </div>
      </div>

      {/* Content Body */}
      <div className="max-w-4xl mx-auto px-8 -mt-12 relative z-20">
        <div className="bg-white p-8 md:p-16 tactical-shadow prose prose-lg prose-slate max-w-none prose-headings:font-headline prose-headings:text-primary prose-a:text-primary font-medium text-slate-700 whitespace-pre-wrap">
          {blog.content}
        </div>
      </div>
    </article>
  );
};

export default BlogPost;
