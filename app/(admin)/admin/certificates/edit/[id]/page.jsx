import { supabase } from '@/lib/supabaseClient';
import EditCertificateForm from '@/components/admin/EditCertificate';
import { notFound } from 'next/navigation';

async function getCertificate(id) {
  const { data, error } = await supabase
    .from('certificates')
    .select('*')
    .eq('id', id)
    .single();
  if (error) notFound();
  return data;
}

export default async function EditCertificatePage({ params }) {
  const certificate = await getCertificate(params.id);
  return (
    <div>
      <h1 className="text-3xl font-bold mb-6">Edit Certificate</h1>
      <EditCertificateForm certificate={certificate} />
    </div>
  );
}
