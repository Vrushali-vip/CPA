"use client";

import { useState } from "react";

export default function AssignTicketClient({ ticketId }: { ticketId: string }) {
  const [isOpen, setIsOpen] = useState(false);
  const [userId, setUserId] = useState("");
  const [loading, setLoading] = useState(false);

  async function handleAssign() {
    setLoading(true);
    try {
      const res = await fetch("/api/assign-ticket", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ ticketId, userId }),
      });

      if (res.ok) {
        alert("Ticket assigned successfully!");
        setIsOpen(false);
      } else {
        alert("Failed to assign ticket.");
      }
    } catch (error) {
      console.error("Error assigning ticket:", error);
      alert("An error occurred.");
    } finally {
      setLoading(false);
    }
  }

  return (
    <>
      <button
        onClick={() => setIsOpen(true)}
        className="mt-2 px-4 py-2 bg-blue-600 text-white rounded-lg"
      >
        Assign
      </button>

      {isOpen && (
        <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50 z-50">
          <div className="bg-white p-6 rounded-lg shadow-lg w-96">
            <h3 className="text-lg font-semibold mb-4">Assign Ticket</h3>
            <label htmlFor="user" className="block text-sm font-medium mb-2">
              Assign to User:
            </label>
            <input
              id="user"
              type="text"
              placeholder="Enter user ID"
              value={userId}
              onChange={(e) => setUserId(e.target.value)}
              className="w-full border rounded px-3 py-2 mb-4"
            />
            <div className="flex justify-end space-x-2">
              <button
                onClick={() => setIsOpen(false)}
                className="px-4 py-2 bg-gray-300 text-black rounded-md"
              >
                Cancel
              </button>
              <button
                onClick={handleAssign}
                className={`px-4 py-2 bg-blue-600 text-white rounded-md ${
                  loading ? "opacity-50 cursor-not-allowed" : ""
                }`}
                disabled={loading}
              >
                {loading ? "Assigning..." : "Assign"}
              </button>
            </div>
          </div>
        </div>
      )}
    </>
  );
}
