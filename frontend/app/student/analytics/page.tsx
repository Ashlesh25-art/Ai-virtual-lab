import type { Metadata } from 'next';

export const metadata: Metadata = { title: 'Analytics | AI Virtual Lab' };

export default function Page() {
  return (
    <div>
      <h1 className="text-2xl font-bold mb-4">My Analytics</h1>
      <p className="text-gray-500 mb-6">Track your personal performance and knowledge mastery.</p>
    </div>
  );
}
