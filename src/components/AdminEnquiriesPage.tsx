export default function AdminEnquiriesPage() {
  return (
    <div className="max-w-5xl mx-auto px-4 py-6">
      <h1 className="text-xl sm:text-2xl font-semibold text-slate-800 mb-4">
        Admin Dashboard – Enquiries
      </h1>

      <div className="overflow-x-auto bg-white border rounded-lg shadow">
        <table className="min-w-full text-sm">
          <thead className="bg-slate-100 border-b">
            <tr>
              <th className="px-4 py-2 text-left">Product</th>
              <th className="px-4 py-2 text-left">Name</th>
              <th className="px-4 py-2 text-left">Email</th>
              <th className="px-4 py-2 text-left">Message</th>
              <th className="px-4 py-2 text-left">Created At</th>
            </tr>
          </thead>

          <tbody>
            <tr>
              <td className="px-4 py-3 border-b">—</td>
              <td className="px-4 py-3 border-b">—</td>
              <td className="px-4 py-3 border-b">—</td>
              <td className="px-4 py-3 border-b">—</td>
              <td className="px-4 py-3 border-b">—</td>
            </tr>
          </tbody>
        </table>
      </div>
    </div>
  );
}
