import type { Metadata } from 'next';

export const metadata: Metadata = { title: 'Instructor Dashboard | AI Virtual Lab' };

export default function Page() {
  return (
    <div>
      <h1 className="text-2xl font-bold mb-4">Instructor Dashboard</h1>
      <p className="text-gray-500 mb-6">Overview of experiments, sessions, and student progress.</p>
    </div>
  );
}
