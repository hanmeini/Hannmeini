import { supabase } from "@/lib/supabaseClient";
import Link from "next/link";
import Image from "next/image";
import DeleteProjectButton from "@/components/admin/DeleteProjectButton";

export default async function ListProjectsPage() {
  const { db } = await import("@/lib/firebase");
  const { collection, getDocs, query, orderBy } = await import(
    "firebase/firestore"
  );

  let projects = [];
  try {
    const q = query(
      collection(db, "projects"),
      orderBy("project_date", "desc")
    );
    const querySnapshot = await getDocs(q);
    projects = querySnapshot.docs.map((doc) => ({
      id: doc.id,
      ...doc.data(),
    }));
  } catch (error) {
    console.error("Firebase error details:", error);
  }

  // const { data: projects, error } = await supabase
  //   .from('projects')
  //   .select('*')
  //   .order('project_date', { ascending: false });

  return (
    <div>
      <div className="flex justify-between items-center mb-6">
        <h1 className="text-3xl font-bold">Manage Projects</h1>
        <Link
          href="/admin/projects/new"
          className="bg-green-500 text-white px-4 py-2 rounded-lg hover:bg-green-600 transition-colors"
        >
          + Add New Project
        </Link>
      </div>
      <div className="bg-white rounded-lg shadow overflow-x-auto">
        <table className="w-full text-left">
          <thead className="bg-gray-50">
            <tr className="border-b">
              <th className="p-4 font-semibold">Image</th>
              <th className="p-4 font-semibold">Title</th>
              <th className="p-4 font-semibold">Category</th>
              <th className="p-4 font-semibold">Date</th>
              <th className="p-4 font-semibold">Actions</th>
            </tr>
          </thead>
          <tbody>
            {projects.map((project) => (
              <tr key={project.id} className="border-b hover:bg-gray-50">
                <td className="p-4">
                  <Image
                    src={project.image_url}
                    alt={project.title}
                    width={80}
                    height={45}
                    className="rounded object-cover"
                  />
                </td>
                <td className="p-4 font-medium text-gray-800">
                  {project.title}
                </td>
                <td className="p-4 text-gray-600">{project.category}</td>
                <td className="p-4 text-gray-600">
                  {new Date(project.project_date).toLocaleDateString()}
                </td>
                <td className="p-4 flex items-center gap-4">
                  <Link
                    href={`/admin/projects/edit/${project.id}`}
                    className="text-blue-500 hover:underline"
                  >
                    Edit
                  </Link>
                  <DeleteProjectButton projectId={project.id} />
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}
