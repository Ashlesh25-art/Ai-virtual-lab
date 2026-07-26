import type { Metadata } from 'next';

export const metadata: Metadata = { title: 'Analytics | AI Virtual Lab' };

export default function Page() {
  return (
    <div>
      <h1 className="text-2xl font-bold mb-4">Instructor Analytics</h1>
      <p className="text-gray-500 mb-6">View student performance and experiment insights.</p>
    </div>
  );
}

