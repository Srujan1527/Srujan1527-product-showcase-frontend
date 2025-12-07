import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { getToken, getUser } from "../utils/auth";

interface Enquiry {
  id: number;
  product_id: number;
  product_name?: string; // assuming backend returns this from JOIN
  name: string;
  email: string;
  phone?: string | null;
  message: string;
  created_at: string;
}
export default function AdminEnquiriesPage() {
  const navigate = useNavigate();
  const [enquiries, setEnquiries] = useState<Enquiry[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");
  const BASE_URL = import.meta.env.VITE_BACKEND_URL;

  useEffect(() => {
    const user = getUser();
    const token = getToken();

    // Frontend guard: only admins can view this page
    if (!user || !token || !user.is_admin) {
      navigate("/login");
      return;
    }
    async function fetchEnquiries() {
      try {
        setLoading(true);
        setError("");

        const res = await fetch(`${BASE_URL}/enquiries/`, {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        });

        const data = await res.json();
        console.log("data", data.data.rows);
        if (!res.ok) {
          setError(data.message || "Failed to load enquiries");
          setLoading(false);
          return;
        }

        setEnquiries(data.data.rows || []);
        setLoading(false);
      } catch (err) {
        const msg =
          err instanceof Error ? err.message : "Something went wrong.";
        setError(msg);
        setLoading(false);
      }
    }

    fetchEnquiries();
  }, []);

  return (
    <div className="max-w-5xl mx-auto px-4 py-6">
      <h1 className="text-xl sm:text-2xl font-semibold text-slate-800 mb-4">
        Admin Dashboard – Enquiries
      </h1>

      {loading && (
        <p className="text-sm text-slate-600 mb-4">Loading enquiries...</p>
      )}

      {error && <p className="text-sm text-red-500 mb-4">{error}</p>}

      {!loading && !error && enquiries.length === 0 && (
        <p className="text-sm text-slate-500">No enquiries found.</p>
      )}

      {!loading && !error && enquiries.length > 0 && (
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
              {enquiries.map((enq) => (
                <tr key={enq.id}>
                  <td className="px-4 py-3 border-b">
                    {enq.product_name || `#${enq.product_id}`}
                  </td>
                  <td className="px-4 py-3 border-b">{enq.name}</td>
                  <td className="px-4 py-3 border-b">{enq.email}</td>
                  <td className="px-4 py-3 border-b">{enq.message}</td>
                  <td className="px-4 py-3 border-b">
                    {new Date(enq.created_at).toLocaleString()}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}
    </div>
  );
}
