import { Outlet, Link } from "react-router-dom";

export default function AdminLayout() {
  return (
    <div className="flex">
      <aside className="w-64 h-screen bg-gray-800 text-white p-4">
        <h2 className="text-xl font-bold mb-4">Admin</h2>
        <nav className="flex flex-col gap-2">
          <Link to="/admin">Dashboard</Link>
        </nav>
      </aside>
      <main className="flex-1 p-8">
        <Outlet />
      </main>
    </div>
  );
}
