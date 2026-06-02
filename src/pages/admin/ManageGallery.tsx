import React, { useState, useEffect } from 'react';
import { Plus, Trash2, Edit2, Image as ImageIcon, Upload, X, Save, AlertCircle } from 'lucide-react';
import { supabase } from '../../supabase';

interface GalleryItem {
  id: string;
  imageUrl: string;
  title: string;
  category: string;
  createdAt: string;
}

const PREDEFINED_CATEGORIES = [
  'SECURITY',
  'MAINTENANCE',
  'FACILITY',
  'MANPOWER',
  'STAFFING',
  'COMPLIANCE',
  'TAXATION'
];

const ManageGallery = () => {
  const [items, setItems] = useState<GalleryItem[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');
  const [success, setSuccess] = useState('');

  // Form states
  const [isFormOpen, setIsFormOpen] = useState(false);
  const [editingItem, setEditingItem] = useState<GalleryItem | null>(null);
  const [title, setTitle] = useState('');
  const [category, setCategory] = useState('SECURITY');
  const [customCategory, setCustomCategory] = useState('');
  const [imageUrl, setImageUrl] = useState('');
  const [uploadingImage, setUploadingImage] = useState(false);
  const [formSubmitting, setFormSubmitting] = useState(false);

  const fetchItems = async () => {
    try {
      setLoading(true);
      setError('');
      
      const token = localStorage.getItem('adminToken');
      const res = await fetch('/api/admin/gallery', {
        headers: {
          'Authorization': `Bearer ${token}`
        }
      });
      
      if (!res.ok) {
        if (res.status === 401 || res.status === 403) {
          throw new Error('Unauthorized access. Please log in again.');
        }
        throw new Error('Failed to fetch gallery items');
      }
      
      const data = await res.json();
      setItems(data);
    } catch (err: any) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchItems();
  }, []);

  const handleImageUpload = async (file: File) => {
    if (!file) return;
    setUploadingImage(true);
    setError('');

    try {
      const fileExt = file.name.split('.').pop();
      const fileName = `gallery-${Math.random().toString(36).substring(2, 15)}.${fileExt}`;
      const filePath = `${fileName}`;

      const { error: uploadError } = await supabase.storage
        .from('blog-images')
        .upload(filePath, file);

      if (uploadError) {
        throw uploadError;
      }

      const { data } = supabase.storage.from('blog-images').getPublicUrl(filePath);
      setImageUrl(data.publicUrl);
      setSuccess('Image uploaded successfully!');
      setTimeout(() => setSuccess(''), 3000);
    } catch (err: any) {
      setError('Error uploading image: ' + err.message);
    } finally {
      setUploadingImage(false);
    }
  };

  const handleOpenAddForm = () => {
    setEditingItem(null);
    setTitle('');
    setCategory('SECURITY');
    setCustomCategory('');
    setImageUrl('');
    setIsFormOpen(true);
    setError('');
  };

  const handleOpenEditForm = (item: GalleryItem) => {
    setEditingItem(item);
    setTitle(item.title);
    setImageUrl(item.imageUrl);
    
    if (PREDEFINED_CATEGORIES.includes(item.category)) {
      setCategory(item.category);
      setCustomCategory('');
    } else {
      setCategory('OTHER');
      setCustomCategory(item.category);
    }
    
    setIsFormOpen(true);
    setError('');
  };

  const handleCloseForm = () => {
    setIsFormOpen(false);
    setEditingItem(null);
    setTitle('');
    setImageUrl('');
    setError('');
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setFormSubmitting(true);
    setError('');

    const token = localStorage.getItem('adminToken');
    if (!token) {
      setError('No admin token found. Please log in.');
      setFormSubmitting(false);
      return;
    }

    const finalCategory = category === 'OTHER' ? customCategory.toUpperCase() : category;

    if (!finalCategory || finalCategory.trim() === '') {
      setError('Please provide a category');
      setFormSubmitting(false);
      return;
    }

    if (!imageUrl) {
      setError('Please upload an image or provide an image URL');
      setFormSubmitting(false);
      return;
    }

    try {
      const payload = {
        title,
        category: finalCategory.trim(),
        imageUrl
      };

      const url = editingItem ? `/api/admin/gallery/${editingItem.id}` : '/api/admin/gallery';
      const method = editingItem ? 'PUT' : 'POST';

      const res = await fetch(url, {
        method,
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${token}`
        },
        body: JSON.stringify(payload)
      });

      if (!res.ok) {
        const errData = await res.json();
        throw new Error(errData.error || 'Failed to save gallery item');
      }

      setSuccess(editingItem ? 'Gallery item updated successfully!' : 'Gallery item created successfully!');
      setTimeout(() => setSuccess(''), 3500);
      
      handleCloseForm();
      fetchItems();
    } catch (err: any) {
      setError(err.message);
    } finally {
      setFormSubmitting(false);
    }
  };

  const handleDelete = async (id: string) => {
    if (!window.confirm('Are you sure you want to delete this gallery item?')) return;

    try {
      const token = localStorage.getItem('adminToken');
      const res = await fetch(`/api/admin/gallery/${id}`, {
        method: 'DELETE',
        headers: {
          'Authorization': `Bearer ${token}`
        }
      });

      if (!res.ok) {
        throw new Error('Failed to delete gallery item');
      }

      setSuccess('Gallery item deleted successfully!');
      setTimeout(() => setSuccess(''), 3000);
      fetchItems();
    } catch (err: any) {
      setError(err.message);
    }
  };

  return (
    <div className="max-w-6xl space-y-8 animate-in fade-in slide-in-from-bottom-4">
      {/* Header */}
      <div className="flex justify-between items-end">
        <div>
          <h1 className="text-3xl font-headline font-bold text-slate-800">Manage Gallery</h1>
          <p className="text-slate-500 mt-1">Add, update, or remove images and descriptions in the website gallery.</p>
        </div>
        <button
          onClick={handleOpenAddForm}
          className="tactical-gradient text-white px-6 py-2.5 font-bold uppercase tracking-wider text-xs flex items-center gap-2 rounded shadow-lg hover:-translate-y-0.5 transition-transform"
        >
          <Plus size={18} /> Add New Image
        </button>
      </div>

      {/* Messages */}
      {success && (
        <div className="bg-green-50 text-green-700 px-4 py-3 rounded-md text-sm border border-green-200">
          {success}
        </div>
      )}
      {error && !isFormOpen && (
        <div className="bg-red-50 text-red-600 px-4 py-3 rounded-md text-sm border border-red-200 flex items-center gap-2">
          <AlertCircle size={18} />
          {error}
        </div>
      )}

      {/* Form Modal/Section */}
      {isFormOpen && (
        <div className="bg-white p-8 rounded-lg shadow-sm border border-slate-200 border-t-4 border-primary space-y-6 animate-in fade-in slide-in-from-top-4">
          <div className="flex justify-between items-center pb-4 border-b border-slate-100">
            <h2 className="font-headline font-bold text-lg text-slate-800">
              {editingItem ? 'Edit Gallery Image' : 'Add New Gallery Image'}
            </h2>
            <button onClick={handleCloseForm} className="text-slate-400 hover:text-slate-600">
              <X size={20} />
            </button>
          </div>

          {error && (
            <div className="bg-red-50 text-red-600 px-4 py-3 rounded-md text-sm border border-red-200 flex items-center gap-2">
              <AlertCircle size={18} />
              {error}
            </div>
          )}

          <form onSubmit={handleSubmit} className="space-y-6">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div>
                <label className="block text-sm font-bold text-slate-700 mb-2">Description / Title</label>
                <input
                  type="text"
                  required
                  value={title}
                  onChange={(e) => setTitle(e.target.value)}
                  className="w-full border-gray-300 rounded-md shadow-sm focus:border-primary focus:ring focus:ring-primary focus:ring-opacity-50 text-slate-800"
                  placeholder="e.g. Security guard patrolling campus"
                />
              </div>

              <div>
                <label className="block text-sm font-bold text-slate-700 mb-2">Category</label>
                <select
                  value={category}
                  onChange={(e) => setCategory(e.target.value)}
                  className="w-full border-gray-300 rounded-md shadow-sm focus:border-primary focus:ring focus:ring-primary focus:ring-opacity-50 text-slate-800"
                >
                  {PREDEFINED_CATEGORIES.map((cat) => (
                    <option key={cat} value={cat}>
                      {cat}
                    </option>
                  ))}
                  <option value="OTHER">OTHER (Custom Category)</option>
                </select>
                {category === 'OTHER' && (
                  <input
                    type="text"
                    required
                    value={customCategory}
                    onChange={(e) => setCustomCategory(e.target.value)}
                    className="w-full border-gray-300 rounded-md shadow-sm focus:border-primary focus:ring focus:ring-primary focus:ring-opacity-50 mt-3 text-slate-800"
                    placeholder="Enter custom category name (e.g. EVENTS)"
                  />
                )}
              </div>

              <div className="md:col-span-2">
                <label className="block text-sm font-bold text-slate-700 mb-2">Image Source</label>
                <div className="flex flex-col sm:flex-row gap-4 items-stretch">
                  <div className="flex-grow relative">
                    <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                      <ImageIcon size={16} className="text-slate-400" />
                    </div>
                    <input
                      type="url"
                      value={imageUrl}
                      onChange={(e) => setImageUrl(e.target.value)}
                      className="pl-10 w-full border-gray-300 rounded-md shadow-sm focus:border-primary focus:ring focus:ring-primary focus:ring-opacity-50 text-slate-800 h-full min-h-[42px]"
                      placeholder="Image URL or upload a file below"
                    />
                  </div>
                  <div className="flex-shrink-0">
                    <label className="cursor-pointer bg-slate-100 hover:bg-slate-200 text-slate-700 px-6 py-2.5 rounded-md border border-slate-300 flex items-center justify-center gap-2 transition-colors h-full">
                      {uploadingImage ? 'Uploading...' : <><Upload size={16} /> Upload File</>}
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
                {imageUrl && (
                  <div className="mt-4 p-2 border border-slate-100 bg-slate-50 rounded-md inline-block">
                    <img src={imageUrl} alt="Preview" className="max-h-48 rounded object-cover border border-slate-200" />
                  </div>
                )}
              </div>
            </div>

            <div className="flex justify-end gap-3 pt-4 border-t border-slate-100">
              <button
                type="button"
                onClick={handleCloseForm}
                className="bg-white hover:bg-slate-50 text-slate-700 border border-slate-300 px-6 py-2 rounded text-sm font-bold uppercase tracking-wider"
              >
                Cancel
              </button>
              <button
                type="submit"
                disabled={formSubmitting}
                className="tactical-gradient text-white px-8 py-2 rounded text-sm font-bold uppercase tracking-wider flex items-center gap-2 shadow hover:-translate-y-0.5 transition-transform disabled:opacity-55"
              >
                <Save size={16} />
                {formSubmitting ? 'Saving...' : 'Save Gallery Item'}
              </button>
            </div>
          </form>
        </div>
      )}

      {/* Gallery Items Grid/Table */}
      <div className="bg-white rounded-lg shadow-sm border border-slate-200 overflow-hidden">
        <div className="px-6 py-4 border-b border-slate-100 bg-slate-50">
          <h2 className="font-headline font-bold text-lg text-slate-800">Uploaded Gallery Items</h2>
        </div>

        {loading ? (
          <div className="p-12 text-center text-slate-500">Loading gallery items...</div>
        ) : items.length === 0 ? (
          <div className="p-12 text-center text-slate-500">
            No gallery items found. Click "Add New Image" to upload your first gallery photo!
          </div>
        ) : (
          <div className="overflow-x-auto">
            <table className="w-full text-left border-collapse">
              <thead>
                <tr className="bg-slate-50 border-b border-slate-200 text-slate-600 text-sm">
                  <th className="p-4 font-bold w-32">Image</th>
                  <th className="p-4 font-bold">Description / Title</th>
                  <th className="p-4 font-bold">Category</th>
                  <th className="p-4 font-bold">Uploaded Date</th>
                  <th className="p-4 font-bold text-right">Actions</th>
                </tr>
              </thead>
              <tbody>
                {items.map((item) => (
                  <tr key={item.id} className="border-b border-slate-100 hover:bg-slate-50 transition-colors">
                    <td className="p-4">
                      <div className="w-24 h-16 rounded overflow-hidden border border-slate-200 bg-slate-50">
                        <img src={item.imageUrl} alt={item.title} className="w-full h-full object-cover" />
                      </div>
                    </td>
                    <td className="p-4">
                      <div className="font-bold text-slate-800 line-clamp-2">{item.title}</div>
                    </td>
                    <td className="p-4">
                      <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-bold bg-primary-container text-white">
                        {item.category}
                      </span>
                    </td>
                    <td className="p-4 text-sm text-slate-600">
                      {new Date(item.createdAt).toLocaleDateString()}
                    </td>
                    <td className="p-4 text-right">
                      <div className="flex items-center justify-end gap-2">
                        <button
                          onClick={() => handleOpenEditForm(item)}
                          className="p-2 rounded text-primary hover:bg-slate-100 transition-colors"
                          title="Edit"
                        >
                          <Edit2 size={18} />
                        </button>
                        <button
                          onClick={() => handleDelete(item.id)}
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
        )}
      </div>
    </div>
  );
};

export default ManageGallery;
