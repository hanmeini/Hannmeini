'use client';

import { useState } from 'react';
import { supabase } from '@/lib/supabaseClient';
import { useRouter } from 'next/navigation';

export default function NewCertificatePage() {
  const [title, setTitle] = useState('');
  const [description, setDescription] = useState(''); 
  const [issuingOrganization, setIssuingOrganization] = useState('');
  const [issueDate, setIssueDate] = useState('');
  const [credentialUrl, setCredentialUrl] = useState('');
  const [imageFile, setImageFile] = useState(null);
  
  const [loading, setLoading] = useState(false);
  const [message, setMessage] = useState('');
  const router = useRouter();

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!imageFile) {
      setMessage('Please select an image file.');
      return;
    }
    setLoading(true);
    setMessage('');

    try {
      // 1. Upload gambar ke bucket baru 'certificate-images'
      const fileName = `${Date.now()}_${imageFile.name}`;
      const { error: uploadError } = await supabase.storage
        .from('certificates-image') // Pastikan bucket ini ada
        .upload(fileName, imageFile);
      if (uploadError) throw uploadError;

      // 2. Dapatkan URL publik
      const { data: { publicUrl } } = supabase.storage
        .from('certificates-image')
        .getPublicUrl(fileName);

      // 3. Insert ke tabel 'certificates'
      const { error: insertError } = await supabase.from('certificates').insert({
        title,
        description, // Tambahkan deskripsi jika ada kolomnya
        issuing_organization: issuingOrganization,
        issue_date: issueDate,
        credential_url: credentialUrl,
        image_url: publicUrl,
      });
      if (insertError) throw insertError;

      setMessage('Certificate added successfully!');
      router.push('/admin/certificates');
      router.refresh();

    } catch (error) {
      setMessage('Error adding certificate: ' + error.message);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div>
      <h1 className="text-3xl font-bold mb-6">Add New Certificate</h1>
      <form onSubmit={handleSubmit} className="space-y-6 bg-white p-8 rounded-lg shadow-md">
        <input type="text" placeholder="Certificate Title" value={title} onChange={e => setTitle(e.target.value)} className="w-full p-3 border rounded-md" required />
        <textarea placeholder="Description" value={description} onChange={e => setDescription(e.target.value)} className="w-full p-3 border rounded-md" rows="4" />
        <input type="text" placeholder="Issuing Organization" value={issuingOrganization} onChange={e => setIssuingOrganization(e.target.value)} className="w-full p-3 border rounded-md" />
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1">Issue Date</label>
          <input type="date" value={issueDate} onChange={e => setIssueDate(e.target.value)} className="w-full p-3 border rounded-md" required />
        </div>
        <input type="url" placeholder="Credential URL (Optional)" value={credentialUrl} onChange={e => setCredentialUrl(e.target.value)} className="w-full p-3 border rounded-md" />
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1">Certificate Image</label>
          <input type="file" onChange={e => setImageFile(e.target.files[0])} className="w-full text-sm text-gray-500 file:mr-4 file:py-2 file:px-4 file:rounded-full file:border-0 file:text-sm file:font-semibold file:bg-blue-50 file:text-blue-700 hover:file:bg-blue-100" required />
        </div>
        <div className="flex items-center gap-4">
          <button type="submit" disabled={loading} className="bg-green-600 text-white px-8 py-3 rounded-md disabled:bg-gray-400 hover:bg-green-700 transition-colors">
            {loading ? 'Saving...' : 'Add Certificate'}
          </button>
          {message && <p className={`text-sm ${message.startsWith('Error') ? 'text-red-600' : 'text-green-600'}`}>{message}</p>}
        </div>
      </form>
    </div>
  );
}