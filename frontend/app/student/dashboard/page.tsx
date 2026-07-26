import type { Metadata } from 'next';

export const metadata: Metadata = { title: 'Student Dashboard | AI Virtual Lab' };

export default function StudentDashboardPage() {
  return (
    <div>
      <h1 className="text-2xl font-bold mb-6">My Dashboard</h1>
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        {['Enrolled Subjects', 'Completed Labs', 'My Score'].map((label) => (
          <div key={label} className="bg-white rounded-xl p-5 shadow-sm border">
            <p className="text-sm text-gray-500">{label}</p>
            <p className="text-3xl font-bold mt-1">—</p>
          </div>
        ))}
      </div>
    </div>
  );
}
