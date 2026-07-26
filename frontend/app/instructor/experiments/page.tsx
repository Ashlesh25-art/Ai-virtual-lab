import type { Metadata } from 'next';

export const metadata: Metadata = { title: 'Experiments | AI Virtual Lab' };

export default function Page() {
  return (
    <div>
      <h1 className="text-2xl font-bold mb-4">Experiments</h1>
      <p className="text-gray-500 mb-6">View and manage all your lab experiments.</p>
    </div>
  );
}

