import React, { useState, useEffect } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import { Save, Image as ImageIcon, Upload } from 'lucide-react';
import { supabase } from '../../supabase';

const EditBlog = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const [title, setTitle] = useState('');
  const [coverImage, setCoverImage] = useState('');
  const [content, setContent] = useState('');
  const [isPublished, setIsPublished] = useState(false);
  const [loading, setLoading] = useState(false);
  const [fetching, setFetching] = useState(true);
  const [uploadingImage, setUploadingImage] = useState(false);
  const [error, setError] = useState('');

  useEffect(() => {
    const fetchBlog = async () => {
      try {
        const res = await fetch(`/api/admin/blogs`);
        const data = await res.json();
        const blog = data.find((b: any) => b.id === id);
        if (blog) {
          setTitle(blog.title);
          setCoverImage(blog.coverImage || '');
          setContent(blog.content);
          setIsPublished(blog.isPublished);
        } else {
          setError('Blog not found');
        }
      } catch (err: any) {
        setError(err.message);
      } finally {
        setFetching(false);
      }
    };
    fetchBlog();
  }, [id]);

  const handleImageUpload = async (file: File) => {
    if (!file) return;
    setUploadingImage(true);
    setError('');

    try {
      const fileExt = file.name.split('.').pop();
      const fileName = `${Math.random().toString(36).substring(2, 15)}.${fileExt}`;
      const filePath = `${fileName}`;

      const { error: uploadError } = await supabase.storage
        .from('blog-images')
        .upload(filePath, file);

      if (uploadError) {
        throw uploadError;
      }

      const { data } = supabase.storage.from('blog-images').getPublicUrl(filePath);
      setCoverImage(data.publicUrl);
    } catch (err: any) {
      setError('Error uploading image: ' + err.message);
    } finally {
      setUploadingImage(false);
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setError('');

    const userStr = localStorage.getItem('adminUser');
    const token = localStorage.getItem('adminToken');
    
    if (!userStr || !token) {
      setError('You must be logged in to edit a blog.');
      setLoading(false);
      return;
    }

    try {
      const res = await fetch(`/api/blogs/${id}`, {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          title,
          content,
          coverImage,
          isPublished,
        })
      });

      if (!res.ok) {
        const data = await res.json();
        throw new Error(data.error || 'Failed to update blog');
      }

      navigate('/admin/blogs');
    } catch (err: any) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  };

  if (fetching) return <div className="p-8">Loading...</div>;

  return (
    <div className="max-w-4xl space-y-8 animate-in fade-in slide-in-from-bottom-4">
      <div className="flex justify-between items-end">
        <div>
          <h1 className="text-3xl font-headline font-bold text-slate-800">Edit Blog Post</h1>
          <p className="text-slate-500 mt-1">Update your blog content.</p>
        </div>
      </div>

      <form onSubmit={handleSubmit} className="bg-white rounded-lg shadow-sm overflow-hidden border-t-4 border-primary">
        <div className="p-8 space-y-6">
          {error && (
            <div className="bg-red-50 text-red-600 px-4 py-3 rounded-md text-sm border border-red-200">
              {error}
            </div>
          )}

          <div>
            <label className="block text-sm font-bold text-slate-700 mb-2">Post Title</label>
            <input 
              type="text" 
              required
              value={title}
              onChange={(e) => setTitle(e.target.value)}
              className="w-full border-gray-300 rounded-md shadow-sm focus:border-primary focus:ring focus:ring-primary focus:ring-opacity-50 text-lg py-3" 
              placeholder="e.g. How to Secure Your Corporate Campus" 
            />
          </div>

          <div>
            <label className="block text-sm font-bold text-slate-700 mb-2">Cover Image (Optional)</label>
            <div className="flex items-center gap-4">
              <div className="relative flex-grow">
                <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                  <ImageIcon size={16} className="text-slate-400" />
                </div>
                <input 
                  type="url" 
                  value={coverImage}
                  onChange={(e) => setCoverImage(e.target.value)}
                  className="pl-10 w-full border-gray-300 rounded-md shadow-sm focus:border-primary focus:ring focus:ring-primary focus:ring-opacity-50" 
                  placeholder="Image URL or upload a file" 
                />
              </div>
              <div className="flex-shrink-0">
                <label className="cursor-pointer bg-slate-100 hover:bg-slate-200 text-slate-700 px-4 py-2 rounded-md border border-slate-300 flex items-center gap-2 transition-colors">
                  {uploadingImage ? 'Uploading...' : <><Upload size={16} /> Upload</>}
                  <input 
                    type="file" 
                    accept="image/*"
                    className="hidden" 
                    disabled={uploadingImage}
                    onChange={(e) => {
                      if (e.target.files && e.target.files[0]) {
                        handleImageUpload(e.target.files[0]);
                      }
                    }}
                  />
                </label>
              </div>
            </div>
            {coverImage && (
              <div className="mt-4">
                <img src={coverImage} alt="Cover Preview" className="max-h-48 rounded-md object-cover border border-slate-200" />
              </div>
            )}
          </div>

          <div>
            <label className="block text-sm font-bold text-slate-700 mb-2">Content Body</label>
            <textarea 
              required
              rows={15}
              value={content}
              onChange={(e) => setContent(e.target.value)}
              className="w-full border-gray-300 rounded-md shadow-sm focus:border-primary focus:ring focus:ring-primary focus:ring-opacity-50 font-medium text-slate-700" 
              placeholder="Write your blog content here..." 
            />
          </div>

          <div className="flex items-center gap-3 bg-slate-50 p-4 rounded-md border border-slate-200">
            <input 
              type="checkbox" 
              id="publish" 
              checked={isPublished}
              onChange={(e) => setIsPublished(e.target.checked)}
              className="w-5 h-5 text-primary border-gray-300 rounded focus:ring-primary"
            />
            <label htmlFor="publish" className="text-sm font-bold text-slate-700 cursor-pointer select-none">
              Published
            </label>
            <span className="text-xs text-slate-500">(If unchecked, it will be hidden from the public)</span>
          </div>
        </div>

        <div className="bg-slate-50 px-8 py-5 border-t border-slate-100 flex justify-end gap-4">
          <button 
            type="button"
            onClick={() => navigate('/admin/blogs')}
            className="px-6 py-3 font-bold uppercase tracking-wider text-sm text-slate-600 hover:bg-slate-200 rounded transition-colors"
          >
            Cancel
          </button>
          <button 
            type="submit"
            disabled={loading}
            className="tactical-gradient text-white px-8 py-3 font-bold uppercase tracking-wider text-sm flex items-center gap-2 rounded shadow-lg hover:-translate-y-0.5 transition-transform disabled:opacity-50 disabled:hover:translate-y-0"
          >
            {loading ? 'Saving...' : <><Save size={18} /> Update Blog Post</>}
          </button>
        </div>
      </form>
    </div>
  );
};

export default EditBlog;
