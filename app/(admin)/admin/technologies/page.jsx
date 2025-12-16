import Link from "next/link";
import { db } from "@/lib/firebase";
import { collection, getDocs, query, orderBy } from "firebase/firestore";
import DeleteTechnologyButton from "@/components/admin/DeleteTechnologyButton";

export const dynamic = "force-dynamic";

export default async function TechnologiesPage() {
  let technologies = [];
  try {
    const q = query(collection(db, "technologies"), orderBy("name"));
    const querySnapshot = await getDocs(q);
    technologies = querySnapshot.docs.map((doc) => ({
      id: doc.id,
      ...doc.data(),
    }));
  } catch (error) {
    console.error("Error fetching technologies:", error);
  }

  return (
    <div>
      <div className="flex justify-between items-center mb-6">
        <h1 className="text-3xl font-bold">Manage Technologies</h1>
        <Link
          href="/admin/technologies/new"
          className="bg-green-500 text-white px-4 py-2 rounded-lg hover:bg-green-600 transition-colors"
        >
          + Add New Technology
        </Link>
      </div>

      <div className="bg-white p-6 rounded-lg shadow">
        {technologies.length === 0 ? (
          <p className="text-gray-500">No technologies found.</p>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
            {technologies.map((tech) => (
              <div
                key={tech.id}
                className="flex items-center justify-between p-4 border rounded-lg hover:shadow-md transition-shadow"
              >
                <div className="font-medium text-lg">{tech.name}</div>
                <div className="flex items-center gap-3">
                  <Link
                    href={`/admin/technologies/edit/${tech.id}`}
                    className="text-blue-500 hover:text-blue-700"
                  >
                    Edit
                  </Link>
                  <DeleteTechnologyButton techId={tech.id} />
                </div>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
}
