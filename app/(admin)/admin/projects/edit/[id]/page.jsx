import { db } from "@/lib/firebase";
import { doc, getDoc } from "firebase/firestore";
import EditProjectForm from "@/components/admin/EditProjects";
import { notFound } from "next/navigation";

// Fungsi ini mengambil data awal untuk satu proyek
async function getProjectData(id) {
  try {
    const docRef = doc(db, "projects", id);
    const docSnap = await getDoc(docRef);

    if (docSnap.exists()) {
      return { id: docSnap.id, ...docSnap.data() };
    } else {
      console.log("No such document!");
      notFound();
    }
  } catch (error) {
    console.error("Error fetching project:", error);
    notFound();
  }
}

export default async function EditProjectPage({ params }) {
  const project = await getProjectData(params.id);

  return (
    <div>
      <h1 className="text-3xl font-bold mb-6">Edit Project: {project.title}</h1>
      <EditProjectForm project={project} />
    </div>
  );
}
