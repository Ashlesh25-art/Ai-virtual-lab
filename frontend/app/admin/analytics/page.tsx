import type { Metadata } from 'next';

export const metadata: Metadata = { title: 'Analytics | AI Virtual Lab' };

export default function Page() {
  return (
    <div>
      <h1 className="text-2xl font-bold mb-4">Platform Analytics</h1>
      <p className="text-gray-500 mb-6">Platform-wide usage and performance analytics.</p>
    </div>
  );
}

