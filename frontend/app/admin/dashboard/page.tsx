import type { Metadata } from 'next';

export const metadata: Metadata = { title: 'Admin Dashboard | AI Virtual Lab' };

export default function AdminDashboardPage() {
  return (
    <div>
      <h1 className="text-2xl font-bold mb-6">Admin Dashboard</h1>
      {/* Summary cards: total students, instructors, active sessions, etc. */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
        {['Total Students', 'Total Instructors', 'Active Sessions', 'Submissions Today'].map(
          (label) => (
            <div key={label} className="bg-white rounded-xl p-5 shadow-sm border">
              <p className="text-sm text-gray-500">{label}</p>
              <p className="text-3xl font-bold mt-1">—</p>
            </div>
          )
        )}
      </div>
    </div>
  );
}
