import React, { useState } from "react";
import { useSearchParams } from "react-router-dom";

interface EnquiryFormData {
  name: string;
  email: string;
  phoneNumber: string;
  message: string;
}

const EnquiryForm: React.FC = () => {
  const [searchParams] = useSearchParams();

  const productId = searchParams.get("productId");

  const [formData, setFormData] = useState<EnquiryFormData>({
    name: "",
    email: "",
    phoneNumber: "",
    message: "",
  });

  const [isSubmitting, setIsSubmitting] = useState(false);
  const [status, setStatus] = useState<"idle" | "success" | "error">("idle");
  const [errorMessage, setErrorMessage] = useState("");

  // handle input changes
  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  // handle form submit
  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setIsSubmitting(true);
    setStatus("idle");
    setErrorMessage("");

    try {
      const BASE_URL = import.meta.env.VITE_BACKEND_URL;

      const res = await fetch(`${BASE_URL}/enquiries`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        // adjust keys here according to your backend DTO
        body: JSON.stringify({
          product_id: productId,
          name: formData.name,
          email: formData.email,
          phone: formData.phoneNumber,
          message: formData.message,
        }),
      });

      if (!res.ok) {
        const text = await res.text();
        throw new Error(text || "Failed to submit enquiry");
      }

      setStatus("success");
      setFormData({
        name: "",
        email: "",
        phoneNumber: "",
        message: "",
      });
    } catch (error: unknown) {
      console.error(error);
      setStatus("error");

      if (error instanceof Error) {
        setErrorMessage(error.message);
      } else {
        setErrorMessage("Something went wrong");
      }
    }
  };

  return (
    <div className="min-h-screen bg-gray-100 flex justify-center items-center p-4">
      <div className="bg-white shadow-lg rounded-lg w-full max-w-md p-6">
        <h1 className="text-2xl font-semibold text-gray-800 mb-6 text-center">
          Enquiry Form
        </h1>

        <form className="space-y-4 text-left" onSubmit={handleSubmit}>
          {/* Name */}
          <div className="flex flex-col">
            <label
              htmlFor="name"
              className="text-gray-700 mb-1 font-medium text-left"
            >
              Name
            </label>
            <input
              name="name"
              type="text"
              required
              placeholder="Enter your name"
              value={formData.name}
              onChange={handleChange}
              className="border border-gray-300 rounded-md px-3 py-2 focus:ring-2 focus:ring-blue-500 focus:border-blue-500 outline-none"
            />
          </div>

          {/* Email */}
          <div className="flex flex-col">
            <label
              htmlFor="email"
              className="text-gray-700 mb-1 font-medium text-left"
            >
              Email
            </label>
            <input
              name="email"
              type="email"
              required
              placeholder="Enter your email"
              value={formData.email}
              onChange={handleChange}
              className="border border-gray-300 rounded-md px-3 py-2 focus:ring-2 focus:ring-blue-500 focus:border-blue-500 outline-none"
            />
          </div>

          {/* Phone Number */}
          <div className="flex flex-col">
            <label
              htmlFor="phoneNumber"
              className="text-gray-700 mb-1 font-medium text-left"
            >
              Phone Number
            </label>
            <input
              name="phoneNumber"
              type="tel"
              required
              placeholder="Enter your phone number"
              value={formData.phoneNumber}
              onChange={handleChange}
              className="border border-gray-300 rounded-md px-3 py-2 focus:ring-2 focus:ring-blue-500 focus:border-blue-500 outline-none"
            />
          </div>

          {/* Message */}
          <div className="flex flex-col">
            <label
              htmlFor="message"
              className="text-gray-700 mb-1 font-medium text-left"
            >
              Message
            </label>
            <textarea
              name="message"
              placeholder="Write your message..."
              rows={4}
              value={formData.message}
              onChange={handleChange}
              className="border border-gray-300 rounded-md px-3 py-2 focus:ring-2 focus:ring-blue-500 focus:border-blue-500 outline-none"
            ></textarea>
          </div>

          {/* Status Message */}
          {status === "success" && (
            <p className="text-green-600 text-sm">
              ✅ Enquiry submitted successfully!
            </p>
          )}
          {status === "error" && (
            <p className="text-red-600 text-sm">
              ❌ {errorMessage || "Failed to submit enquiry"}
            </p>
          )}

          {/* Submit Button */}
          <button
            type="submit"
            disabled={isSubmitting}
            className="w-full bg-blue-600 text-white py-2 rounded-md text-sm font-medium hover:bg-blue-700 disabled:opacity-60 disabled:cursor-not-allowed transition"
          >
            {isSubmitting ? "Submitting..." : "Submit Enquiry"}
          </button>
        </form>
      </div>
    </div>
  );
};

export default EnquiryForm;
