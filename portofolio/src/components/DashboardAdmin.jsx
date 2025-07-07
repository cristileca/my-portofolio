"use client";

import { useEffect, useState } from "react";

const API_URL = "http://localhost:3000";

const Dashboard = () => {
    const [submissions, setSubmissions] = useState([]);
    const [loading, setLoading] = useState(true);
    const [expandedIds, setExpandedIds] = useState(new Set());

    // fetch data on mount
    useEffect(() => {
        fetchSubmissions();
    }, []);

    const toggleExpand = (id) => {
        setExpandedIds((prev) => {
            const newSet = new Set(prev);
            if (newSet.has(id)) {
                newSet.delete(id);
            } else {
                newSet.add(id);
            }
            return newSet;
        });
    };

    const fetchSubmissions = async () => {
        try {
            setLoading(true);
            const res = await fetch(`${API_URL}/submissions`);
            const data = await res.json();
            setSubmissions(data);
        } catch (err) {
            console.error("Error fetching submissions:", err);
        } finally {
            setLoading(false);
        }
    };

    const toggleRead = async (id, currentRead) => {
        try {
            await fetch(`${API_URL}/submissions/${id}`, {
                method: "PATCH",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify({ read: !currentRead }),
            });
            fetchSubmissions(); // refresh list
        } catch (err) {
            console.error("Error updating submission:", err);
        }
    };

    const deleteSubmission = async (id) => {
        if (!confirm("Are you sure you want to delete this submission?")) return;
        try {
            await fetch(`${API_URL}/submissions/${id}`, {
                method: "DELETE",
            });
            fetchSubmissions();
        } catch (err) {
            console.error("Error deleting submission:", err);
        }
    };

    return (
        <>

            <div className="min-h-screen bg-gray-100 p-6">
                <div className="max-w-4xl mx-auto bg-white rounded-xl shadow p-6">
                    <h1 className="text-3xl font-bold mb-6">Submissions</h1>
                    <button
                        onClick={() => window.location.href = '/'}
                        className="mb-4 px-4 py-2 bg-blue-600 text-white rounded hover:bg-blue-700"
                    >
                        Go to Homepage
                    </button>
                    {loading ? (
                        <p className="text-gray-500">Loading...</p>
                    ) : submissions.length === 0 ? (
                        <p className="text-gray-500">No submissions yet.</p>
                    ) : (
                        <div className="space-y-4">
                            {submissions.map((sub) => (
                                <div
                                    key={sub.id}
                                    className={`bg-gray-800 text-gray-100 border border-gray-700 rounded-lg p-4 flex flex-col sm:flex-row sm:items-center sm:justify-between transition`}
                                >
                                    <div className="flex-1 space-y-2">
                                        <div className="text-xl font-semibold">
                                            {sub.name} <span className="text-gray-400 text-base font-normal">({sub.email})</span>
                                        </div>
                                        <div className="text-gray-400 text-sm">Details:</div>
                                        <div
                                            className={`text-gray-400 transition-all duration-300 ${expandedIds.has(sub.id) ? "max-h-full" : "max-h-20 overflow-hidden"
                                                }`}
                                        >
                                            {sub.message}
                                        </div>
                                        {sub.message.length >=100 ? <button
                                            onClick={() => toggleExpand(sub.id)}
                                            className="text-sm text-blue-600 hover:underline mt-1"
                                        >
                                            {expandedIds.has(sub.id) ? "Show Less" : "Show More"}
                                        </button> : null}
                                        <div className="text-sm text-gray-400 italic">
                                            📅 {new Date(sub.created_at).toLocaleString()}
                                        </div>
                                        <div className="text-sm">
                                            {sub.read ? (
                                                <span className="text-green-400 font-semibold">✓ Read</span>
                                            ) : (
                                                <span className="text-yellow-400 font-semibold">✗ Unread</span>
                                            )}
                                        </div>
                                    </div>

                                    <div className="mt-4 sm:mt-0 sm:ml-4 flex gap-2">
                                        <button
                                            onClick={() => toggleRead(sub.id, sub.read)}
                                            className={`px-4 py-2 rounded font-medium text-white ${sub.read
                                                ? "bg-yellow-500 hover:bg-yellow-600"
                                                : "bg-green-600 hover:bg-green-700"
                                                }`}
                                        >
                                            {sub.read ? "Mark Unread" : "Mark Read"}
                                        </button>
                                        <button
                                            onClick={() => deleteSubmission(sub.id)}
                                            className="px-4 py-2 rounded font-medium text-white bg-red-600 hover:bg-red-700"
                                        >
                                            Delete
                                        </button>
                                    </div>
                                </div>

                            ))}
                        </div>
                    )}
                </div>
            </div>
        </>
    );
};

export default Dashboard;
