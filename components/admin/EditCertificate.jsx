'use client';

import { useState } from 'react';
import { supabase } from '@/lib/supabaseClient';
import { useRouter } from 'next/navigation';
import Image from 'next/image';

export default function EditCertificateForm({ certificate }) {
  const [title, setTitle] = useState(certificate.title);
  const [description, setDescription] = useState(certificate.description || '');
  const [issuingOrganization, setIssuingOrganization] = useState(certificate.issuing_organization || '');
  const [issueDate, setIssueDate] = useState(certificate.issue_date || '');
  const [credentialUrl, setCredentialUrl] = useState(certificate.credential_url || '');
  
  const [imageFile, setImageFile] = useState(null); 
  const [currentImageUrl, setCurrentImageUrl] = useState(certificate.image_url);
  
  const [loading, setLoading] = useState(false);
  const [message, setMessage] = useState('');
  const router = useRouter();

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setMessage('');

    try {
      let imageUrl = currentImageUrl;

      // Langkah 1: Jika ada file gambar baru, unggah terlebih dahulu
      if (imageFile) {
        // Hapus gambar lama dari storage untuk menghemat ruang (opsional tapi direkomendasikan)
        const oldFileName = currentImageUrl.split('/').pop();
        await supabase.storage.from('certificate-images').remove([oldFileName]);

        // Unggah gambar baru
        const newFileName = `${Date.now()}_${imageFile.name}`;
        const { error: uploadError } = await supabase.storage
          .from('certificate-images')
          .upload(newFileName, imageFile);
        if (uploadError) throw uploadError;

        // Dapatkan URL publik dari gambar yang baru
        const { data } = supabase.storage
          .from('certificate-images')
          .getPublicUrl(newFileName);
        
        imageUrl = data.publicUrl;
      }

      // Langkah 2: Update data di tabel 'certificates'
      const { error: updateError } = await supabase
        .from('certificates')
        .update({
          title,
          description,
          issuing_organization: issuingOrganization,
          issue_date: issueDate,
          credential_url: credentialUrl,
          image_url: imageUrl, // Gunakan URL baru jika ada, atau URL lama jika tidak
        })
        .eq('id', certificate.id); // Kondisi WHERE untuk memastikan hanya baris yang benar yang di-update

      if (updateError) throw updateError;
      
      setMessage('Certificate updated successfully!');
      // Arahkan kembali ke halaman daftar setelah berhasil
      router.push('/admin/certificates');
      router.refresh(); // Memaksa refresh data di halaman daftar

    } catch (error) {
      setMessage('Error updating certificate: ' + error.message);
      console.error(error);
    } finally {
      setLoading(false);
    }
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-6 bg-white p-8 rounded-lg shadow-md">
      {/* Input untuk Judul */}
      <div>
        <label htmlFor="title" className="block text-sm font-medium text-gray-700">Certificate Title</label>
        <input id="title" type="text" value={title} onChange={e => setTitle(e.target.value)} className="mt-1 w-full p-3 border rounded-md" required />
      </div>

      {/* Input untuk Deskripsi */}
      <div>
        <label htmlFor="description" className="block text-sm font-medium text-gray-700">Description</label>
        <textarea id="description" value={description} onChange={e => setDescription(e.target.value)} className="mt-1 w-full p-3 border rounded-md" rows="4" />
      </div>

      {/* Input untuk Organisasi Penerbit */}
      <div>
        <label htmlFor="organization" className="block text-sm font-medium text-gray-700">Issuing Organization</label>
        <input id="organization" type="text" value={issuingOrganization} onChange={e => setIssuingOrganization(e.target.value)} className="w-full p-3 border rounded-md" />
      </div>

      {/* Input untuk Tanggal Terbit */}
      <div>
        <label htmlFor="issueDate" className="block text-sm font-medium text-gray-700">Issue Date</label>
        <input id="issueDate" type="date" value={issueDate} onChange={e => setIssueDate(e.target.value)} className="w-full p-3 border rounded-md" required />
      </div>

      {/* Input untuk URL Kredensial */}
      <div>
        <label htmlFor="credentialUrl" className="block text-sm font-medium text-gray-700">Credential URL (Optional)</label>
        <input id="credentialUrl" type="url" value={credentialUrl} onChange={e => setCredentialUrl(e.target.value)} className="w-full p-3 border rounded-md" />
      </div>

      {/* Input untuk Gambar */}
      <div>
        <label className="block text-sm font-medium text-gray-700 mb-1">Change Certificate Image</label>
        <div className="flex items-center gap-4 mt-2">
          <Image src={currentImageUrl} alt="Current certificate image" width={120} height={84} className="rounded-md object-cover border" />
          <input type="file" onChange={e => setImageFile(e.target.files[0])} className="w-full text-sm text-gray-500 file:mr-4 file:py-2 file:px-4 file:rounded-full file:border-0 file:text-sm file:font-semibold file:bg-blue-50 file:text-blue-700 hover:file:bg-blue-100" />
        </div>
        <p className="text-xs text-gray-500 mt-1">Leave empty if you don't want to change the image.</p>
      </div>

      {/* Tombol Aksi */}
      <div className="flex items-center gap-4 pt-4 border-t">
        <button type="submit" disabled={loading} className="bg-blue-600 text-white px-8 py-3 rounded-md disabled:bg-gray-400 hover:bg-blue-700 transition-colors">
          {loading ? 'Saving...' : 'Save Changes'}
        </button>
        <button type="button" onClick={() => router.back()} className="bg-gray-200 text-gray-800 px-8 py-3 rounded-md hover:bg-gray-300 transition-colors">
          Cancel
        </button>
        {message && <p className={`text-sm ${message.startsWith('Error') ? 'text-red-600' : 'text-green-600'}`}>{message}</p>}
      </div>
    </form>
  );
}