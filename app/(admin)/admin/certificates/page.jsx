import { supabase } from "@/lib/supabaseClient";
import Link from "next/link";
import Image from "next/image";
import DeleteCertificateButton from "@/components/admin/DeleteCertificateButton";

export default async function ListCertificatesPage() {
  const { db } = await import("@/lib/firebase");
  const { collection, getDocs, query, orderBy } = await import(
    "firebase/firestore"
  );

  let certificates = [];
  try {
    const q = query(
      collection(db, "certificates"),
      orderBy("issue_date", "desc")
    );
    const querySnapshot = await getDocs(q);
    certificates = querySnapshot.docs.map((doc) => ({
      id: doc.id,
      ...doc.data(),
    }));
  } catch (error) {
    console.error("Firebase error:", error);
  }

  // const { data: certificates, error } = await supabase
  //   .from('certificates')
  //   .select('*')
  //   .order('issue_date', { ascending: false });

  return (
    <div>
      <div className="flex justify-between items-center mb-6">
        <h1 className="text-3xl font-bold">Manage Certificates</h1>
        <Link
          href="/admin/certificates/new"
          className="bg-green-500 text-white px-4 py-2 rounded-lg hover:bg-green-600 transition-colors"
        >
          + Add New Certificate
        </Link>
      </div>
      <div className="bg-white rounded-lg shadow overflow-x-auto">
        <table className="w-full text-left">
          <thead className="bg-gray-50">
            <tr className="border-b">
              <th className="p-4 font-semibold">Image</th>
              <th className="p-4 font-semibold">Title</th>
              <th className="p-4 font-semibold">Organization</th>
              <th className="p-4 font-semibold">Date</th>
              <th className="p-4 font-semibold">Actions</th>
            </tr>
          </thead>
          <tbody>
            {certificates.map((cert) => (
              <tr key={cert.id} className="border-b hover:bg-gray-50">
                <td className="p-4">
                  <Image
                    src={cert.image_url}
                    alt={cert.title}
                    width={100}
                    height={70}
                    className="rounded object-cover"
                  />
                </td>
                <td className="p-4 font-medium text-gray-800">{cert.title}</td>
                <td className="p-4 text-gray-600">
                  {cert.issuing_organization}
                </td>
                <td className="p-4 text-gray-600">
                  {new Date(cert.issue_date).toLocaleDateString()}
                </td>
                <td className="p-4 flex items-center gap-4">
                  <Link
                    href={`/admin/certificates/edit/${cert.id}`}
                    className="text-blue-500 hover:underline"
                  >
                    Edit
                  </Link>
                  <DeleteCertificateButton certificateId={cert.id} />
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}
