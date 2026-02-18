"use client";

import { useState, useEffect, useMemo } from "react";
import {
  Add01Icon,
  Search01Icon,
  JobSearchIcon,
  Location01Icon,
  Clock01Icon,
  Delete02Icon,
  PencilEdit02Icon,
  Briefcase01Icon,
  FilterIcon,
  Loading03Icon,
  CheckmarkCircle01Icon,
  CancelCircleIcon,
  CodeIcon,
  PaintBoardIcon,
  Settings01Icon,
  AlertCircleIcon,
  UserCircleIcon,
  Clock02Icon,
  PackageIcon,
} from "@hugeicons/react";
import AdminDropdown from "@/components/ui/AdminDropdown";
import AdminInput from "@/components/ui/AdminInput";
import { motion } from "framer-motion";
import { mockApi } from "@/lib/mockApi";
import { useToast } from "@/components/ui/Toast";
import Modal from "@/components/ui/Modal";
import AdminBreadcrumb from "@/components/admin/AdminBreadcrumb";

export default function CareersAdminPage() {
  const { showToast } = useToast();
  const [jobs, setJobs] = useState<any[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [searchQuery, setSearchQuery] = useState("");
  const [isAddModalOpen, setIsAddModalOpen] = useState(false);
  const [isEditModalOpen, setIsEditModalOpen] = useState(false);
  const [isDeleteModalOpen, setIsDeleteModalOpen] = useState(false);
  const [currentJob, setCurrentJob] = useState<any>(null);
  const [isSubmitting, setIsSubmitting] = useState(false);

  // Form state
  const [formData, setFormData] = useState({
    title: "",
    department: "Engineering",
    customDepartment: "",
    location: "Remote",
    type: "Full-time",
    status: "Active",
  });

  useEffect(() => {
    fetchJobs();
  }, []);

  const fetchJobs = async () => {
    setIsLoading(true);
    try {
      const data = await mockApi.careers.getAll();
      setJobs(data);
    } catch (error) {
      showToast("Failed to fetch jobs", "error");
    } finally {
      setIsLoading(false);
    }
  };

  const resetForm = () => {
    setFormData({
      title: "",
      department: "Engineering",
      customDepartment: "",
      location: "Remote",
      type: "Full-time",
      status: "Active",
    });
    setCurrentJob(null);
  };

  const handleOpenAdd = () => {
    resetForm();
    setIsAddModalOpen(true);
  };

  const handleOpenEdit = (job: any) => {
    setCurrentJob(job);
    setFormData({
      title: job.title,
      department: [
        "Engineering",
        "Product",
        "Design",
        "Research",
        "Operations",
      ].includes(job.department)
        ? job.department
        : "Others",
      customDepartment: [
        "Engineering",
        "Product",
        "Design",
        "Research",
        "Operations",
      ].includes(job.department)
        ? ""
        : job.department,
      location: job.location,
      type: job.type,
      status: job.status,
    });
    setIsEditModalOpen(true);
  };

  const handleOpenDelete = (job: any) => {
    setCurrentJob(job);
    setIsDeleteModalOpen(true);
  };

  const handleAddSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);
    try {
      const submitData = {
        ...formData,
        department:
          formData.department === "Others"
            ? formData.customDepartment
            : formData.department,
      };
      await mockApi.careers.create(submitData);
      showToast("Job posting created successfully", "success");
      setIsAddModalOpen(false);
      fetchJobs();
    } catch (error) {
      showToast("Failed to create job posting", "error");
    } finally {
      setIsSubmitting(false);
    }
  };

  const handleEditSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);
    try {
      const submitData = {
        ...formData,
        department:
          formData.department === "Others"
            ? formData.customDepartment
            : formData.department,
      };
      await mockApi.careers.update(currentJob.id, submitData);
      showToast("Job posting updated successfully", "success");
      setIsEditModalOpen(false);
      fetchJobs();
    } catch (error) {
      showToast("Failed to update job posting", "error");
    } finally {
      setIsSubmitting(false);
    }
  };

  const handleDeleteSubmit = async () => {
    setIsSubmitting(true);
    try {
      await mockApi.careers.delete(currentJob.id);
      showToast("Job posting deleted successfully", "success");
      setIsDeleteModalOpen(false);
      fetchJobs();
    } catch (error) {
      showToast("Failed to delete job posting", "error");
    } finally {
      setIsSubmitting(false);
    }
  };

  const toggleStatus = async (job: any) => {
    const newStatus = job.status === "Active" ? "Closed" : "Active";
    try {
      await mockApi.careers.update(job.id, { status: newStatus });
      fetchJobs();
      showToast(`Job marked as ${newStatus}`, "info");
    } catch (error) {
      showToast("Failed to update status", "error");
    }
  };

  const filteredJobs = useMemo(() => {
    return jobs.filter(
      (job) =>
        job.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
        job.department.toLowerCase().includes(searchQuery.toLowerCase()),
    );
  }, [jobs, searchQuery]);

  return (
    <div className="space-y-10">
      <div className="flex flex-col gap-2">
        <AdminBreadcrumb />
        <div className="flex flex-col lg:flex-row lg:items-center justify-between gap-6">
          <div>
            <h1 className="text-4xl font-black tracking-tight text-[#1E2A3A]">
              Open Positions
            </h1>
            <p className="text-[#6B7A90] font-medium mt-1">
              Manage recruitment pipelines and job requisitions.
            </p>
          </div>
          <button onClick={handleOpenAdd} className="primary-btn-admin">
            <Add01Icon size={20} />
            <span>Post New Job</span>
          </button>
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-4 gap-6">
        {[
          {
            label: "Active Jobs",
            val: jobs.filter((j) => j.status === "Active").length.toString(),
            icon: Briefcase01Icon,
            color: "text-[#4DA3FF]",
            bg: "bg-[#EAF4FF]",
          },
          {
            label: "Total Applications",
            val: jobs
              .reduce((acc, j) => acc + (j.applicants || 0), 0)
              .toString(),
            icon: JobSearchIcon,
            color: "text-[#00C07D]",
            bg: "bg-[#E6F9F0]",
          },
          {
            label: "New Tech",
            val: "12",
            icon: Location01Icon,
            color: "text-[#6366F1]",
            bg: "bg-[#EEF2FF]",
          },
          {
            label: "Closing soon",
            val: "3",
            icon: Clock01Icon,
            color: "text-[#F97316]",
            bg: "bg-[#FFF7ED]",
          },
        ].map((s, i) => (
          <motion.div
            key={i}
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: i * 0.1 }}
            className="stat-card-v2 flex items-center gap-5 py-6 hover:border-[#4DA3FF]/20"
          >
            <div
              className={`w-14 h-14 rounded-2xl flex items-center justify-center ${s.bg} ${s.color}`}
            >
              <s.icon size={26} variant="bulk" />
            </div>
            <div>
              <p className="text-[10px] font-bold uppercase text-[#6B7A90] tracking-widest mb-1">
                {s.label}
              </p>
              <h4 className="text-2xl font-black text-[#1E2A3A]">{s.val}</h4>
            </div>
          </motion.div>
        ))}
      </div>

      <div className="glass-card-v2">
        <div className="flex flex-col md:flex-row gap-4 mb-10">
          <div className="relative flex-1">
            <Search01Icon
              size={18}
              className="absolute left-5 top-1/2 -translate-y-1/2 text-[#6B7A90]"
            />
            <input
              type="text"
              placeholder="Search jobs by title, department or ID..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="w-full pl-14 pr-6 py-3.5 bg-[#F6FAFF] border border-[#4DA3FF]/10 rounded-2xl text-sm focus:border-[#4DA3FF] outline-none transition-all"
            />
          </div>
          <div className="flex gap-3">
            <button className="secondary-btn-admin">
              <FilterIcon size={18} />
              <span>Filters</span>
            </button>
          </div>
        </div>

        {isLoading ? (
          <div className="flex items-center justify-center py-20">
            <Loading03Icon size={40} className="animate-spin text-[#4DA3FF]" />
          </div>
        ) : (
          <div className="space-y-5 min-h-[400px]">
            {filteredJobs.length > 0 ? (
              filteredJobs.map((job) => (
                <div
                  key={job.id}
                  className="flex flex-col lg:flex-row lg:items-center justify-between p-6 bg-white border border-[#4DA3FF]/10 rounded-2xl hover:shadow-[0_8px_30px_rgba(77,163,255,0.1)] hover:border-[#4DA3FF]/30 transition-all group"
                >
                  <div className="flex items-start gap-5">
                    <div className="w-14 h-14 bg-[#F6FAFF] rounded-2xl flex items-center justify-center text-[#4DA3FF] border border-[#4DA3FF]/10 group-hover:scale-105 transition-transform">
                      <Briefcase01Icon size={26} variant="bulk" />
                    </div>
                    <div>
                      <h3 className="font-bold text-lg text-[#1E2A3A] group-hover:text-[#4DA3FF] transition-colors">
                        {job.title}
                      </h3>
                      <div className="flex flex-wrap items-center gap-x-4 gap-y-2 mt-2">
                        <span className="flex items-center gap-1.5 text-xs font-bold text-[#6B7A90] bg-[#F6FAFF] px-2.5 py-1 rounded-lg">
                          <Location01Icon size={12} /> {job.location}
                        </span>
                        <span className="flex items-center gap-1.5 text-xs font-bold text-[#6B7A90] bg-[#F6FAFF] px-2.5 py-1 rounded-lg capitalize">
                          <Clock01Icon size={12} /> {job.type}
                        </span>
                        <span className="px-2.5 py-1 bg-[#EAF4FF] rounded-lg text-xs font-bold text-[#4DA3FF]">
                          {job.department}
                        </span>
                      </div>
                    </div>
                  </div>

                  <div className="flex flex-row items-center justify-between lg:justify-end gap-10 mt-6 lg:mt-0 pl-16 lg:pl-0">
                    <button
                      onClick={() =>
                        showToast(`Viewing applicants for ${job.title}`, "info")
                      }
                      className="text-center min-w-[80px] hover:bg-[#F6FAFF] p-2 rounded-xl transition-colors"
                    >
                      <p className="text-2xl font-black text-[#1E2A3A] leading-none mb-1">
                        {job.applicants}
                      </p>
                      <p className="text-[10px] uppercase font-bold text-[#6B7A90] tracking-wider">
                        Candidates
                      </p>
                    </button>

                    <div className="flex items-center gap-6">
                      <button
                        onClick={() => toggleStatus(job)}
                        className={`badge-v2 cursor-pointer hover:opacity-80 transition-opacity ${job.status === "Active" ? "badge-blue" : job.status === "Paused" || job.status === "Critical" ? "badge-orange" : "badge-red"}`}
                      >
                        <span
                          className={`w-1.5 h-1.5 rounded-full ${
                            job.status === "Active"
                              ? "bg-[#4DA3FF]"
                              : job.status === "Paused" ||
                                  job.status === "Critical"
                                ? "bg-[#F97316]"
                                : "bg-[#FF5A5A]"
                          }`}
                        />
                        {job.status === "Critical" ? "Paused" : job.status}
                      </button>

                      <div className="flex gap-2 transition-opacity">
                        <button
                          onClick={() => handleOpenEdit(job)}
                          className="action-btn bg-[#F6FAFF]"
                        >
                          <PencilEdit02Icon size={18} />
                        </button>
                        <button
                          onClick={() => handleOpenDelete(job)}
                          className="action-btn hover:text-rose-500 hover:bg-rose-50 bg-[#F6FAFF]"
                        >
                          <Delete02Icon size={18} />
                        </button>
                      </div>
                    </div>
                  </div>
                </div>
              ))
            ) : (
              <div className="text-center py-20 text-[#6B7A90] font-medium">
                No job listings found.
              </div>
            )}
          </div>
        )}
      </div>

      {/* Add/Edit Job Modal */}
      <Modal
        isOpen={isAddModalOpen || isEditModalOpen}
        onClose={() => {
          setIsAddModalOpen(false);
          setIsEditModalOpen(false);
        }}
        title={isAddModalOpen ? "Post New Job" : "Edit Job Posting"}
        width="lg"
      >
        <form
          onSubmit={isAddModalOpen ? handleAddSubmit : handleEditSubmit}
          className="space-y-6"
        >
          <div className="grid grid-cols-2 gap-5">
            <div className="col-span-2">
              <AdminInput
                label="Job Title"
                required
                placeholder="e.g. Senior Backend Engineer"
                value={formData.title}
                onChange={(e) =>
                  setFormData({ ...formData, title: e.target.value })
                }
              />
            </div>
            <div>
              <label className="text-xs font-bold text-[#6B7A90] uppercase tracking-wider mb-2 block">
                Department
              </label>
              <AdminDropdown
                value={formData.department}
                onChange={(val) =>
                  setFormData({ ...formData, department: val })
                }
                options={[
                  {
                    label: "Engineering",
                    value: "Engineering",
                    border: "border-l-blue-400",
                    icon: <CodeIcon size={16} className="text-blue-500" />,
                  },
                  {
                    label: "Product",
                    value: "Product",
                    border: "border-l-purple-400",
                    icon: <PackageIcon size={16} className="text-purple-500" />,
                  },
                  {
                    label: "Design",
                    value: "Design",
                    border: "border-l-pink-400",
                    icon: (
                      <PaintBoardIcon size={16} className="text-pink-500" />
                    ),
                  },
                  {
                    label: "Research",
                    value: "Research",
                    border: "border-l-emerald-400",
                    icon: (
                      <Search01Icon size={16} className="text-emerald-500" />
                    ),
                  },
                  {
                    label: "Operations",
                    value: "Operations",
                    border: "border-l-slate-400",
                    icon: (
                      <Settings01Icon size={16} className="text-slate-500" />
                    ),
                  },
                  {
                    label: "Others",
                    value: "Others",
                    border: "border-l-orange-400",
                    icon: (
                      <AlertCircleIcon size={16} className="text-orange-500" />
                    ),
                  },
                ]}
              />
            </div>
            <div>
              <label className="text-xs font-bold text-[#6B7A90] uppercase tracking-wider mb-2 block">
                Employment Type
              </label>
              <AdminDropdown
                value={formData.type}
                onChange={(val) => setFormData({ ...formData, type: val })}
                options={[
                  {
                    label: "Full-time",
                    value: "Full-time",
                    border: "border-l-blue-400",
                    icon: <Clock01Icon size={16} className="text-blue-500" />,
                  },
                  {
                    label: "Part-time",
                    value: "Part-time",
                    border: "border-l-indigo-400",
                    icon: <Clock02Icon size={16} className="text-indigo-500" />,
                  },
                  {
                    label: "Contract",
                    value: "Contract",
                    border: "border-l-amber-400",
                    icon: (
                      <Briefcase01Icon size={16} className="text-amber-500" />
                    ),
                  },
                  {
                    label: "Internship",
                    value: "Internship",
                    border: "border-l-emerald-400",
                    icon: (
                      <UserCircleIcon size={16} className="text-emerald-500" />
                    ),
                  },
                ]}
              />
            </div>
            {formData.department === "Others" && (
              <div className="col-span-2">
                <AdminInput
                  label="Custom Department"
                  required
                  placeholder="e.g. Marketing"
                  value={formData.customDepartment}
                  onChange={(e) =>
                    setFormData({
                      ...formData,
                      customDepartment: e.target.value,
                    })
                  }
                />
              </div>
            )}
            <div>
              <AdminInput
                label="Location"
                required
                value={formData.location}
                onChange={(e) =>
                  setFormData({ ...formData, location: e.target.value })
                }
              />
            </div>
            <div>
              <label className="text-xs font-bold text-[#6B7A90] uppercase tracking-wider mb-2 block">
                Status
              </label>
              <AdminDropdown
                value={formData.status}
                onChange={(val) => setFormData({ ...formData, status: val })}
                options={[
                  {
                    label: "Active",
                    value: "Active",
                    border: "border-l-[#00C07D]",
                    icon: (
                      <CheckmarkCircle01Icon
                        size={16}
                        className="text-[#00C07D]"
                      />
                    ),
                  },
                  {
                    label: "Closed",
                    value: "Closed",
                    border: "border-l-[#FF5A5A]",
                    icon: (
                      <CancelCircleIcon size={16} className="text-[#FF5A5A]" />
                    ),
                  },
                  {
                    label: "Paused",
                    value: "Paused",
                    border: "border-l-[#F97316]",
                    icon: (
                      <AlertCircleIcon size={16} className="text-[#F97316]" />
                    ),
                  },
                ]}
              />
            </div>
          </div>

          <div className="flex justify-end gap-3 pt-6 border-t border-[#4DA3FF]/10">
            <button
              type="button"
              onClick={() => {
                setIsAddModalOpen(false);
                setIsEditModalOpen(false);
              }}
              className="secondary-btn-admin"
            >
              Cancel
            </button>
            <button
              type="submit"
              disabled={isSubmitting}
              className="primary-btn-admin min-w-[120px]"
            >
              {isSubmitting ? (
                <Loading03Icon className="animate-spin" size={20} />
              ) : isAddModalOpen ? (
                "Post Job"
              ) : (
                "Update Job"
              )}
            </button>
          </div>
        </form>
      </Modal>

      {/* Delete Modal */}
      <Modal
        isOpen={isDeleteModalOpen}
        onClose={() => setIsDeleteModalOpen(false)}
        title="Delete Job Listing"
        width="sm"
      >
        <div className="space-y-4">
          <p className="text-[#6B7A90] text-sm">
            Are you sure you want to delete{" "}
            <span className="font-bold text-[#1E2A3A]">
              {currentJob?.title}
            </span>
            ? Applications linked to this job will be archived.
          </p>
          <div className="flex justify-end gap-3 pt-4">
            <button
              onClick={() => setIsDeleteModalOpen(false)}
              className="secondary-btn-admin"
            >
              Cancel
            </button>
            <button
              onClick={handleDeleteSubmit}
              disabled={isSubmitting}
              className="px-6 py-3 bg-rose-500 hover:bg-rose-600 text-white rounded-xl font-bold text-sm shadow-md transition-all flex items-center justify-center min-w-[100px]"
            >
              {isSubmitting ? (
                <Loading03Icon className="animate-spin" size={20} />
              ) : (
                "Delete"
              )}
            </button>
          </div>
        </div>
      </Modal>
    </div>
  );
}
