"use client";
import { db } from "@/lib/firebase";
import { doc, deleteDoc } from "firebase/firestore";
import { useRouter } from "next/navigation";
import { FiTrash2 } from "react-icons/fi";

export default function DeleteExperienceButton({ experienceId }) {
  const router = useRouter();

  const handleDelete = async () => {
    if (window.confirm("Are you sure you want to delete this experience?")) {
      try {
        await deleteDoc(doc(db, "experiences", experienceId.toString()));
        alert("Experience deleted successfully.");
        router.refresh();
      } catch (error) {
        alert("Error deleting experience: " + error.message);
      }

      // const { error } = await supabase
      //   .from('experiences')
      //   .delete()
      //   .eq('id', experienceId);

      if (error) {
        alert("Error deleting experience: " + error.message);
      } else {
        alert("Experience deleted successfully.");
        router.refresh(); // Refresh halaman daftar
      }
    }
  };

  return (
    <button
      onClick={handleDelete}
      className="text-red-500 hover:text-red-700 transition-colors p-2 rounded-full hover:bg-red-100"
    >
      <FiTrash2 />
    </button>
  );
}
