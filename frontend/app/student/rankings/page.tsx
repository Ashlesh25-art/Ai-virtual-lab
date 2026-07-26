import type { Metadata } from 'next';

export const metadata: Metadata = { title: 'Rankings | AI Virtual Lab' };

export default function Page() {
  return (
    <div>
      <h1 className="text-2xl font-bold mb-4">Class Rankings</h1>
      <p className="text-gray-500 mb-6">See where you stand among your peers.</p>
    </div>
  );
}
