import type { Metadata } from 'next';

export const metadata: Metadata = { title: 'Submissions | AI Virtual Lab' };

export default function Page() {
  return (
    <div>
      <h1 className="text-2xl font-bold mb-4">My Submissions</h1>
      <p className="text-gray-500 mb-6">View all your submitted lab work.</p>
    </div>
  );
}
