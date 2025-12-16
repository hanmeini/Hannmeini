// In app/projects/[id]/page.js

import { supabase } from "@/lib/supabaseClient";
import Image from "next/image";
import { notFound } from "next/navigation";
import {
  FiGithub,
  FiExternalLink,
  FiClipboard,
  FiLayers,
} from "react-icons/fi";

// Fungsi untuk mengambil data satu proyek (tetap sama)
async function getProject(id) {
  const { data, error } = await supabase
    .rpc("get_project_by_id", { p_id: id })
    .single();

  if (error || !data) {
    notFound();
  }
  return data;
}

// Komponen Info Box (tetap sama)
function InfoBox({ icon, title, value, isLink = false }) {
  const Icon = icon;
  return (
    <div className="bg-gray-50 p-6 rounded-lg border border-gray-200">
      <div className="flex items-start gap-4">
        <Icon className="w-6 h-6 text-gray-500 mt-1" />
        <div>
          <h3 className="text-sm font-semibold text-gray-500">{title}</h3>
          {isLink ? (
            <a
              href={value}
              target="_blank"
              rel="noopener noreferrer"
              className="text-lg font-semibold text-blue-600 hover:underline break-all"
            >
              {value.replace("https://", "")}
            </a>
          ) : (
            <p className="text-lg font-semibold text-gray-800">{value}</p>
          )}
        </div>
      </div>
    </div>
  );
}

// Komponen utama halaman detail (sudah diperbaiki)
export default async function ProjectDetailPage(props) {
  const params = await props.params;
  const project = await getProject(params.id);

  // The useState hook has been removed. That's the only change needed.

  return (
    <div className="max-w-7xl mx-auto px-4 py-24 sm:py-32">
      <main>
        {/* Bagian Utama: Gambar & Deskripsi */}
        <div className="group grid grid-cols-1 lg:grid-cols-2 gap-12 lg:gap-16 items-center">
          {/* Kolom Kiri: Gambar */}
          <div className="w-full h-80 lg:h-[450px] relative rounded-lg overflow-hidden transition-all duration-500 ease-in-out group-hover:shadow-xl group-hover:-translate-y-2">
            <Image
              src={project.image_url}
              alt={`Showcase image for ${project.title}`}
              fill
              className="object-cover rounded-xl"
              priority
            />
          </div>

          {/* Kolom Kanan: Deskripsi */}
          <div className="flex flex-col justify-center">
            <h1 className="text-4xl md:text-5xl font-medium text-gray-900 inline-block">
              <span
                className="pb-2 bg-gradient-to-r from-black to-black bg-no-repeat bg-bottom bg-[length:0%_3px] group-hover:bg-[length:100%_3px] transition-all duration-500"
                style={{ fontFamily: "asgard" }}
              >
                {project.title}
              </span>
            </h1>
            <p className="mt-6 text-lg text-gray-600 leading-relaxed">
              {project.description}
            </p>

            {project.live_url && (
              <a
                href={project.live_url}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-2 mt-8 text-lg font-semibold text-blue-600 hover:text-blue-800 w-fit"
              >
                <span className="pb-1 bg-gradient-to-r from-blue-500 to-blue-500 bg-no-repeat bg-bottom bg-[length:0%_2px] group-hover:bg-[length:100%_2px] transition-all duration-500">
                  View Project
                </span>
                <FiExternalLink className="transition-transform duration-500 group-hover:translate-x-1" />
              </a>
            )}
          </div>
        </div>

        {/* Bagian Bawah: Grid Info */}
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-6 mt-16 lg:mt-24">
          <InfoBox
            icon={FiClipboard}
            title="Type Project"
            value={project.category}
          />
          <InfoBox
            icon={FiGithub}
            title="Source"
            value={project.github_url}
            isLink={true}
          />
          {/* Stack Box */}
          <div className="bg-gray-50 p-6 rounded-lg border border-gray-200">
            <div className="flex items-start gap-4">
              <FiLayers className="w-6 h-6 text-gray-500 mt-1" />
              <div>
                <h3 className="text-sm font-semibold text-gray-500">Stack</h3>
                <div className="flex flex-wrap gap-2 mt-2">
                  {project.technologies.map((tech) => (
                    <span
                      key={tech}
                      className="bg-gray-200 text-gray-800 text-sm font-medium px-3 py-1 rounded-full"
                    >
                      {tech}
                    </span>
                  ))}
                </div>
              </div>
            </div>
          </div>
          <InfoBox
            icon={FiExternalLink}
            title="Link"
            value={project.live_url}
            isLink={true}
          />
        </div>
      </main>
    </div>
  );
}
