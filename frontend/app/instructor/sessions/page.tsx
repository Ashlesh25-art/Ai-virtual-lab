import type { Metadata } from 'next';

export const metadata: Metadata = { title: 'Sessions | AI Virtual Lab' };

export default function Page() {
  return (
    <div>
      <h1 className="text-2xl font-bold mb-4">Lab Sessions</h1>
      <p className="text-gray-500 mb-6">View all scheduled and past lab sessions.</p>
    </div>
  );
}

