import { supabase } from '@/lib/supabaseClient';
import Link from 'next/link';
import { Analytics } from "@vercel/analytics/next"
import VisitorsChart from "@/components/admin/ChartView"
import { FiFileText, FiAward, FiBriefcase, FiPlus, FiBarChart2, FiExternalLink } from 'react-icons/fi';

// Komponen Kartu Statistik
const StatCard = ({ title, value, icon, color }) => {
  const Icon = icon;
  return (
    <div className="bg-white p-6 rounded-lg shadow">
      <div className="flex items-center">
        <div className={`p-3 rounded-full mr-4 ${color}`}>
          <Icon className="w-6 h-6 text-white" />
        </div>
        <div>
          <h3 className="text-lg font-semibold text-gray-600">{title}</h3>
          <p className="text-4xl font-bold text-gray-800">{value}</p>
        </div>
      </div>
    </div>
  );
};

// Komponen Tombol Aksi Cepat
const ActionButton = ({ title, href, icon, color }) => {
  const Icon = icon;
  return (
    <Link href={href} className={`flex items-center justify-center p-6 rounded-lg shadow text-white font-bold text-lg hover:opacity-90 transition-opacity ${color}`}>
      <Icon className="w-6 h-6 mr-3" />
      {title}
    </Link>
  );
};

// Komponen Baru untuk Kartu Analitik
const AnalyticsCard = () => {
  return (
    <div className="bg-white p-6 rounded-lg shadow col-span-1 md:col-span-3">
      <div className="flex flex-col md:flex-row items-start gap-6">
        <FiBarChart2 className="w-8 h-8 text-indigo-500 flex-shrink-0" />
        <div className="w-full">
          <h3 className="text-xl font-bold text-gray-800">Website Analytics</h3>
          <p className="text-gray-600 mt-2 mb-4">
            A summary of visitor traffic over the last 7 days. For a detailed report, please visit your Vercel Analytics dashboard.
          </p>
          
          {/* Container untuk Chart */}
          <div className="w-full h-64 mb-4">
            <VisitorsChart />
            <Analytics/>
          </div>

          <a 
            href="https://vercel.com/hanmeinis-projects/hanmeini/analytics?environment=all" 
            target="_blank" 
            rel="noopener noreferrer" 
            className="inline-flex items-center gap-2 bg-indigo-500 text-white font-semibold px-4 py-2 rounded-lg hover:bg-indigo-600 transition-colors"
          >
            <FiExternalLink />
            View Full Analytics
          </a>
        </div>
      </div>
    </div>
  );
};

export default async function AdminDashboard() {
  // Ambil jumlah data untuk setiap tabel
  const { count: projectCount } = await supabase.from('projects').select('id', { count: 'exact', head: true });
  const { count: certCount } = await supabase.from('certificates').select('id', { count: 'exact', head: true });
  const { count: expCount } = await supabase.from('experiences').select('id', { count: 'exact', head: true });

  return (
    <div>
      <h1 className="text-3xl font-bold text-gray-800 mb-6">Dashboard</h1>
      
      {/* Kartu Statistik */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mb-12">
        <StatCard title="Total Projects" value={projectCount || 0} icon={FiFileText} color="bg-blue-500" />
        <StatCard title="Total Certificates" value={certCount || 0} icon={FiAward} color="bg-green-500" />
        <StatCard title="Total Experiences" value={expCount || 0} icon={FiBriefcase} color="bg-yellow-500" />
      </div>

      {/* Kartu Analitik */}
      {/* <div className="mb-12">
        <AnalyticsCard />
      </div> */}

      {/* Tombol Aksi Cepat */}
      <h2 className="text-2xl font-bold text-gray-800 mb-4">Quick Actions</h2>
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        <ActionButton title="Add New Project" href="/admin/projects/new" icon={FiPlus} color="bg-blue-600" />
        <ActionButton title="Add New Certificate" href="/admin/certificates/new" icon={FiPlus} color="bg-green-600" />
        <ActionButton title="Add New Experience" href="/admin/experiences/new" icon={FiPlus} color="bg-yellow-600" />
      </div>
    </div>
  );
}