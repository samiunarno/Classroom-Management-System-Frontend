import React, { useState, useEffect, useCallback } from "react";
import { motion } from "framer-motion";
import {
  Plus,
  FileText,
  Users,
  Calendar,
  Edit,
  Trash2,
  Clock,
} from "lucide-react";
import {
  assignmentApi,
  Assignment,
  Stats,
  Submission,
} from "../api/assignmentApi";
import LoadingSpinner from "../components/LoadingSpinner";
import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  Legend,
  ResponsiveContainer,
} from "recharts";

const MonitorDashboard: React.FC = () => {
  const [activeTab, setActiveTab] = useState<
    "stats" | "assignments" | "create" | "submissions"
  >("stats");

  const [assignments, setAssignments] = useState<Assignment[]>([]);
  const [submissions, setSubmissions] = useState<Submission[]>([]);
  const [stats, setStats] = useState<Stats | null>(null);

  const [loading, setLoading] = useState(true);
  const [submissionsLoading, setSubmissionsLoading] = useState(false);

  const [formData, setFormData] = useState({
    title: "",
    description: "",
    deadline: "",
  });

  const [editingId, setEditingId] = useState<string | null>(null);
  const [submitting, setSubmitting] = useState(false);

  const [showDeleteModal, setShowDeleteModal] = useState(false);
  const [deleteId, setDeleteId] = useState<string | null>(null);

  const [showDeleteSubmissionModal, setShowDeleteSubmissionModal] =
    useState(false);
  const [deleteSubmissionId, setDeleteSubmissionId] = useState<string | null>(
    null
  );

  const minDeadline = new Date().toISOString().slice(0, 16);

  // ---------------- LOAD DATA ----------------
  const loadData = useCallback(async () => {
    setLoading(true);
    try {
      const [assignmentData, statsData] = await Promise.all([
        assignmentApi.getAssignments(),
        assignmentApi.getMonitorStats(),
      ]);
      setAssignments(assignmentData ?? []);
      setStats(statsData ?? null);
    } catch (e) {
      console.error(e);
    } finally {
      setLoading(false);
    }
  }, []);

  useEffect(() => {
    loadData();
  }, [loadData]);

  const loadSubmissions = useCallback(async () => {
    if (assignments.length === 0) {
      setSubmissions([]);
      return;
    }

    setSubmissionsLoading(true);
    try {
      const list = await Promise.all(
        assignments.map((a) => assignmentApi.getAssignmentSubmissions(a._id))
      );
      setSubmissions(list.flat());
    } catch (e) {
      console.error(e);
    } finally {
      setSubmissionsLoading(false);
    }
  }, [assignments]);

  useEffect(() => {
    if (activeTab === "submissions") loadSubmissions();
  }, [activeTab, assignments, loadSubmissions]);

  // ---------------- ASSIGNMENT CRUD ----------------
  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setSubmitting(true);
    try {
      const payload = {
        title: formData.title.trim(),
        description: formData.description.trim(),
        deadline: formData.deadline,
      };
      if (editingId) {
        await assignmentApi.updateAssignment(editingId, payload);
      } else {
        await assignmentApi.createAssignment(payload);
      }
      setFormData({ title: "", description: "", deadline: "" });
      setEditingId(null);
      await loadData();
      setActiveTab("assignments");
    } catch (error) {
      console.error("Failed to save assignment:", error);
    } finally {
      setSubmitting(false);
    }
  };

  const handleEdit = (assignment: Assignment) => {
    setFormData({
      title: assignment.title ?? "",
      description: assignment.description ?? "",
      deadline: assignment.deadline
        ? new Date(assignment.deadline).toISOString().slice(0, 16)
        : "",
    });
    setEditingId(assignment._id);
    setActiveTab("create");
  };

  const handleDelete = async () => {
    if (!deleteId) return;
    try {
      await assignmentApi.deleteAssignment(deleteId);
      await loadData();
    } catch (e) {
      console.error(e);
    } finally {
      setShowDeleteModal(false);
      setDeleteId(null);
    }
  };

  // ---------------- SUBMISSION DELETE ----------------
  const handleDeleteSubmission = async () => {
    if (!deleteSubmissionId) return;
    try {
      await assignmentApi.deleteSubmission(deleteSubmissionId);
      await loadSubmissions();
    } catch (e) {
      console.error(e);
    } finally {
      setShowDeleteSubmissionModal(false);
      setDeleteSubmissionId(null);
    }
  };

  // ---------------- RENDER ----------------
  if (loading)
    return (
      <div className="min-h-screen flex items-center justify-center">
        <LoadingSpinner />
      </div>
    );

  const tabs = [
    { id: "stats" as const, label: "Overview", icon: FileText },
    { id: "assignments" as const, label: "Assignments", icon: FileText },
    {
      id: "create" as const,
      label: editingId ? "Edit Assignment" : "Create Assignment",
      icon: Plus,
    },
    { id: "submissions" as const, label: "Submissions", icon: Users },
  ];

  return (
    <div className="min-h-screen bg-gradient-to-br from-purple-50 via-blue-50 to-indigo-100 py-8">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Heading */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="mb-8"
        >
          <h1 className="text-4xl font-bold bg-gradient-to-r from-purple-600 to-blue-600 bg-clip-text text-transparent">
            Monitor Dashboard
          </h1>
          <p className="text-gray-600">
            Manage assignments and track submissions
          </p>
        </motion.div>

        {/* Tabs */}
        <div className="mb-8">
          <div className="flex space-x-1 bg-white/60 backdrop-blur-sm rounded-2xl p-1 overflow-x-auto">
            {tabs.map((tab) => (
              <button
                key={tab.id}
                onClick={() => setActiveTab(tab.id)}
                className={`flex items-center space-x-2 px-6 py-3 rounded-xl transition-all duration-200 ${
                  activeTab === tab.id
                    ? "bg-white shadow-md text-purple-600"
                    : "text-gray-600 hover:text-gray-900"
                }`}
              >
                <tab.icon className="h-5 w-5" />
                <span className="font-medium">{tab.label}</span>
              </button>
            ))}
          </div>
        </div>

        {/* TAB CONTENT */}
        <motion.div
          key={activeTab}
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
        >
          {/* STATS */}
          {activeTab === "stats" && stats && (
            <ResponsiveContainer width="100%" height={300}>
              <BarChart
                data={[
                  { name: "Assignments", value: stats.assignmentsCreated },
                  { name: "Submissions", value: stats.totalSubmissions },
                  { name: "Upcoming Deadlines", value: stats.upcomingDeadlines },
                ]}
              >
                <CartesianGrid strokeDasharray="3 3" />
                <XAxis dataKey="name" />
                <YAxis />
                <Tooltip />
                <Legend />
                <Bar dataKey="value" />
              </BarChart>
            </ResponsiveContainer>
          )}

          {/* ASSIGNMENTS */}
          {activeTab === "assignments" && (
            <div className="space-y-4">
              {assignments.map((a) => (
                <motion.div
                  key={a._id}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  className="bg-white/70 p-6 rounded-2xl shadow border border-white/30"
                >
                  <h3 className="text-xl font-semibold">{a.title}</h3>
                  <p className="text-gray-600">{a.description}</p>

                  <div className="flex items-center space-x-4 mt-3 text-sm text-gray-500">
                    <span className="flex items-center space-x-1">
                      <Clock className="h-4 w-4" />{" "}
                      <span>
                        Deadline:{" "}
                        {new Date(a.deadline).toLocaleDateString()}
                      </span>
                    </span>

                    <span className="flex items-center space-x-1">
                      <Calendar className="h-4 w-4" />{" "}
                      <span>
                        Created:{" "}
                        {new Date(a.createdAt).toLocaleDateString()}
                      </span>
                    </span>
                  </div>

                  <div className="flex space-x-2 mt-4">
                    <button
                      onClick={() => handleEdit(a)}
                      className="p-2 text-blue-600 hover:bg-blue-50 rounded-lg"
                    >
                      <Edit className="h-5 w-5" />
                    </button>

                    <button
                      onClick={() => {
                        setDeleteId(a._id);
                        setShowDeleteModal(true);
                      }}
                      className="p-2 text-red-600 hover:bg-red-50 rounded-lg"
                    >
                      <Trash2 className="h-5 w-5" />
                    </button>
                  </div>
                </motion.div>
              ))}
            </div>
          )}

          {/* CREATE / EDIT FORM */}
          {activeTab === "create" && (
            <div className="bg-white p-6 rounded-2xl shadow-lg border border-white/30">
              <h2 className="text-2xl font-bold mb-6">
                {editingId ? "Edit Assignment" : "Create New Assignment"}
              </h2>

              <form onSubmit={handleSubmit} className="space-y-6">
                <div>
                  <label className="block mb-2 font-medium">Title</label>
                  <input
                    type="text"
                    required
                    value={formData.title}
                    onChange={(e) =>
                      setFormData({ ...formData, title: e.target.value })
                    }
                    className="w-full px-4 py-3 border rounded-xl"
                  />
                </div>

                <div>
                  <label className="block mb-2 font-medium">Description</label>
                  <textarea
                    required
                    rows={4}
                    value={formData.description}
                    onChange={(e) =>
                      setFormData({ ...formData, description: e.target.value })
                    }
                    className="w-full px-4 py-3 border rounded-xl"
                  />
                </div>

                <div>
                  <label className="block mb-2 font-medium">Deadline</label>
                  <input
                    type="datetime-local"
                    required
                    min={minDeadline}
                    value={formData.deadline}
                    onChange={(e) =>
                      setFormData({ ...formData, deadline: e.target.value })
                    }
                    className="w-full px-4 py-3 border rounded-xl"
                  />
                </div>

                <div className="flex space-x-4">
                  <button
                    type="submit"
                    className="flex-1 py-3 bg-purple-600 text-white rounded-xl"
                  >
                    {editingId ? "Update" : "Create"}
                  </button>

                  <button
                    type="button"
                    onClick={() => {
                      setEditingId(null);
                      setFormData({
                        title: "",
                        description: "",
                        deadline: "",
                      });
                      setActiveTab("assignments");
                    }}
                    className="px-6 py-3 bg-gray-300 rounded-xl"
                  >
                    Cancel
                  </button>
                </div>
              </form>
            </div>
          )}

          {/* SUBMISSIONS */}
          {activeTab === "submissions" && (
            <div className="space-y-4">

              {/* 🔥 DOWNLOAD ALL BUTTON */}
              <div className="flex justify-end mb-4">
                <button
                  onClick={() =>
                    window.open(
                      `https://console.cloudinary.com/console/media_library/folders/${import.meta.env.VITE_CLOUDINARY_CLOUD_NAME}/assignments`,
                      "_blank"
                    )
                  }
                  className="px-5 py-3 bg-purple-600 text-white rounded-xl shadow hover:bg-purple-700"
                >
                  Download All
                </button>
              </div>

              {submissionsLoading ? (
                <LoadingSpinner />
              ) : submissions.length === 0 ? (
                <p className="text-gray-600">No submissions yet.</p>
              ) : (
                submissions.map((s) => (
                  <div
                    key={s._id}
                    className="bg-white/70 p-6 rounded-2xl shadow border border-white/30 flex justify-between items-start"
                  >
                    <div>
                      <h3 className="font-semibold">{s.studentId?.name}</h3>
                      <p className="text-gray-600">
                        Assignment: {s.assignmentId?.title}
                      </p>
                      <p className="text-sm text-gray-500">
                        Uploaded:{" "}
                        {new Date(s.uploadedAt).toLocaleString()}
                      </p>
                    </div>

                    <div className="flex space-x-3">

                      {/* 🔥 PREVIEW BUTTON */}
                      <button
                        onClick={() => window.open(s.cloudinaryUrl, "_blank")}
                        className="p-2 text-blue-600 hover:bg-blue-50 rounded-lg"
                        title="Preview PDF"
                      >
                        <FileText className="h-5 w-5" />
                      </button>

                      {/* DELETE */}
                      <button
                        onClick={() => {
                          setDeleteSubmissionId(s._id);
                          setShowDeleteSubmissionModal(true);
                        }}
                        className="p-2 text-red-600 hover:bg-red-50 rounded-lg"
                      >
                        <Trash2 className="h-5 w-5" />
                      </button>
                    </div>
                  </div>
                ))
              )}
            </div>
          )}

          {/* DELETE ASSIGNMENT MODAL */}
          {showDeleteModal && (
            <div className="fixed inset-0 bg-black/40 flex items-center justify-center z-50">
              <div className="bg-white p-8 rounded-xl shadow">
                <h2 className="text-xl font-bold mb-4">
                  Delete assignment?
                </h2>
                <div className="flex space-x-4">
                  <button
                    onClick={handleDelete}
                    className="px-6 py-3 bg-red-600 text-white rounded-xl"
                  >
                    Yes, Delete
                  </button>
                  <button
                    onClick={() => setShowDeleteModal(false)}
                    className="px-6 py-3 bg-gray-300 rounded-xl"
                  >
                    Cancel
                  </button>
                </div>
              </div>
            </div>
          )}

          {/* DELETE SUBMISSION MODAL */}
          {showDeleteSubmissionModal && (
            <div className="fixed inset-0 bg-black/40 flex items-center justify-center z-50">
              <div className="bg-white p-8 rounded-xl shadow">
                <h2 className="text-xl font-bold mb-4">
                  Delete this submission?
                </h2>
                <div className="flex space-x-4">
                  <button
                    onClick={handleDeleteSubmission}
                    className="px-6 py-3 bg-red-600 text-white rounded-xl"
                  >
                    Yes, Delete
                  </button>
                  <button
                    onClick={() => setShowDeleteSubmissionModal(false)}
                    className="px-6 py-3 bg-gray-300 rounded-xl"
                  >
                    Cancel
                  </button>
                </div>
              </div>
            </div>
          )}
        </motion.div>
      </div>
    </div>
  );
};

export default MonitorDashboard;
