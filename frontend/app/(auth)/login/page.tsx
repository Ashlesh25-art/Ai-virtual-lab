import type { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'Login | AI Virtual Lab',
  description: 'Sign in to your AI Virtual Lab account',
};

export default function LoginPage() {
  return (
    <div className="w-full max-w-md p-8 bg-white rounded-2xl shadow-xl">
      <h1 className="text-2xl font-bold text-center mb-6">AI Virtual Lab</h1>
      <p className="text-center text-gray-500 mb-8">Sign in to your account</p>
      {/* LoginForm component will go here */}
      <form className="space-y-4">
        <div>
          <label htmlFor="email" className="block text-sm font-medium mb-1">
            Email
          </label>
          <input
            id="email"
            type="email"
            placeholder="you@institution.edu"
            className="w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
          />
        </div>
        <div>
          <label htmlFor="password" className="block text-sm font-medium mb-1">
            Password
          </label>
          <input
            id="password"
            type="password"
            placeholder="••••••••"
            className="w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
          />
        </div>
        <button
          type="submit"
          className="w-full py-2 bg-blue-600 text-white rounded-lg font-medium hover:bg-blue-700 transition"
        >
          Sign In
        </button>
      </form>
    </div>
  );
}
