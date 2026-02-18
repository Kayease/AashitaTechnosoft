"use client";

import { useState, useEffect, useMemo } from "react";
import {
  Add01Icon,
  Search01Icon,
  FilterIcon,
  Delete02Icon,
  PencilEdit02Icon,
  ArrowLeft01Icon,
  ArrowRight01Icon,
  Loading03Icon,
  UserCircleIcon,
  CreditCardIcon,
  Calendar01Icon,
  CancelCircleIcon,
  CheckmarkCircle01Icon,
} from "@hugeicons/react";
import { mockApi } from "@/lib/mockApi";
import { useToast } from "@/components/ui/Toast";
import Modal from "@/components/ui/Modal";
import AdminDropdown from "@/components/ui/AdminDropdown";
import AdminInput from "@/components/ui/AdminInput";
import AdminBreadcrumb from "@/components/admin/AdminBreadcrumb";

export default function UsersPage() {
  const { showToast } = useToast();
  const [users, setUsers] = useState<any[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [searchQuery, setSearchQuery] = useState("");
  const [isAddModalOpen, setIsAddModalOpen] = useState(false);
  const [isEditModalOpen, setIsEditModalOpen] = useState(false);
  const [isDeleteModalOpen, setIsDeleteModalOpen] = useState(false);
  const [isDeactivateModalOpen, setIsDeactivateModalOpen] = useState(false);
  const [currentUser, setCurrentUser] = useState<any>(null);
  const [isSubmitting, setIsSubmitting] = useState(false);

  // Pagination state
  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = 8;

  // Form state
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    role: "Employee",
    status: "Active",
    employeeCode: "",
  });

  useEffect(() => {
    fetchUsers();
  }, []);

  const fetchUsers = async () => {
    setIsLoading(true);
    try {
      const data = await mockApi.users.getAll();
      setUsers(data);
    } catch (error) {
      showToast("Failed to fetch users", "error");
    } finally {
      setIsLoading(false);
    }
  };

  const resetForm = () => {
    setFormData({
      name: "",
      email: "",
      role: "Employee",
      status: "Active",
      employeeCode: "",
    });
    setCurrentUser(null);
  };

  const handleOpenAdd = () => {
    resetForm();
    setIsAddModalOpen(true);
  };

  const handleOpenEdit = (user: any) => {
    setCurrentUser(user);
    setFormData({
      name: user.name,
      email: user.email,
      role: user.role,
      status: user.status,
      employeeCode:
        user.employeeCode || `AASHITA-${Math.floor(10 + Math.random() * 90)}`,
    });
    setIsEditModalOpen(true);
  };

  const handleOpenDelete = (user: any) => {
    setCurrentUser(user);
    setIsDeleteModalOpen(true);
  };

  const handleOpenDeactivate = (user: any) => {
    setCurrentUser(user);
    setIsDeactivateModalOpen(true);
  };

  const handleAddSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!formData.name || !formData.email) {
      showToast("Name and Email are required", "error");
      return;
    }
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(formData.email)) {
      showToast("Please enter a valid email address", "error");
      return;
    }
    setIsSubmitting(true);
    try {
      const newUser = {
        ...formData,
        employeeCode:
          formData.employeeCode ||
          `AASHITA-${Math.floor(10 + (Date.now() % 90))}`,
        joinedAt: new Date().toISOString(),
      };
      await mockApi.users.create(newUser);
      showToast("User created successfully", "success");
      setIsAddModalOpen(false);
      fetchUsers();
    } catch (error) {
      showToast("Failed to create user", "error");
    } finally {
      setIsSubmitting(false);
    }
  };

  const handleEditSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(formData.email)) {
      showToast("Please enter a valid email address", "error");
      return;
    }
    setIsSubmitting(true);
    try {
      await mockApi.users.update(currentUser.id, formData);
      showToast("User updated successfully", "success");
      setIsEditModalOpen(false);
      fetchUsers();
    } catch (error) {
      showToast("Failed to update user", "error");
    } finally {
      setIsSubmitting(false);
    }
  };

  const handleDeleteSubmit = async () => {
    setIsSubmitting(true);
    try {
      await mockApi.users.delete(currentUser.id);
      showToast("User deleted successfully", "success");
      setIsDeleteModalOpen(false);
      fetchUsers();
    } catch (error) {
      showToast("Failed to delete user", "error");
    } finally {
      setIsSubmitting(false);
    }
  };

  const handleDeactivateSubmit = async () => {
    setIsSubmitting(true);
    try {
      await mockApi.users.update(currentUser.id, { status: "Inactive" });
      showToast("User deactivated successfully", "success");
      setIsDeactivateModalOpen(false);
      fetchUsers();
    } catch (error) {
      showToast("Failed to deactivate user", "error");
    } finally {
      setIsSubmitting(false);
    }
  };

  const filteredUsers = useMemo(() => {
    return users.filter(
      (user) =>
        user.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
        user.email.toLowerCase().includes(searchQuery.toLowerCase()) ||
        (user.employeeCode &&
          user.employeeCode.toLowerCase().includes(searchQuery.toLowerCase())),
    );
  }, [users, searchQuery]);

  const paginatedUsers = useMemo(() => {
    const startIndex = (currentPage - 1) * itemsPerPage;
    return filteredUsers.slice(startIndex, startIndex + itemsPerPage);
  }, [filteredUsers, currentPage]);

  const totalPages = Math.ceil(filteredUsers.length / itemsPerPage);

  // Helper for role badge styling
  const getRoleStyle = (role: string) => {
    switch (role.toLowerCase()) {
      case "admin":
        return "bg-purple-50 text-purple-600 border-purple-100";
      case "employee":
        return "bg-blue-50 text-blue-600 border-blue-100";
      default:
        return "bg-slate-50 text-slate-500 border-slate-100";
    }
  };

  return (
    <div className="space-y-10">
      <div className="flex flex-col gap-2">
        <AdminBreadcrumb />
        <div className="flex flex-col lg:flex-row lg:items-center justify-between gap-6">
          <div>
            <h1 className="text-4xl font-black tracking-tight text-[#1E2A3A]">
              User Accounts
            </h1>
            <p className="text-[#6B7A90] font-medium mt-1">
              Manage platform access, roles and system permissions.
            </p>
          </div>
          <button onClick={handleOpenAdd} className="primary-btn-admin">
            <Add01Icon size={20} />
            <span>Provision New User</span>
          </button>
        </div>
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
              placeholder="Search by name, email, or employee code..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="w-full pl-14 pr-6 py-3.5 bg-[#F6FAFF] border border-[#4DA3FF]/10 rounded-2xl text-sm focus:border-[#4DA3FF] outline-none transition-all"
            />
          </div>
          <div className="flex gap-3">
            <button className="secondary-btn-admin">
              <FilterIcon size={18} />
              <span>Attributes</span>
            </button>
            <button className="secondary-btn-admin px-6">Export</button>
          </div>
        </div>

        {isLoading ? (
          <div className="flex items-center justify-center py-20">
            <Loading03Icon size={40} className="animate-spin text-[#4DA3FF]" />
          </div>
        ) : (
          <>
            <div className="overflow-x-auto min-h-[500px]">
              <table className="data-table-v2">
                <thead>
                  <tr>
                    <th>User</th>
                    <th>Employee Code</th>
                    <th>Role</th>
                    <th>Status</th>
                    <th>Joined</th>
                    <th className="text-right px-6">Actions</th>
                  </tr>
                </thead>
                <tbody>
                  {paginatedUsers.length > 0 ? (
                    paginatedUsers.map((user) => (
                      <tr key={user.id} className="group">
                        <td className="py-5">
                          <div className="flex items-center gap-4">
                            <div className="w-11 h-11 rounded-full bg-[#EAF4FF] border border-[#4DA3FF]/10 flex items-center justify-center font-black text-xs text-[#4DA3FF]">
                              {user.name
                                .split(" ")
                                .map((n: string) => n[0])
                                .join("")}
                            </div>
                            <div>
                              <p className="font-bold text-sm text-[#1E2A3A] group-hover:text-[#4DA3FF] transition-colors">
                                {user.name}
                              </p>
                              <p className="text-[11px] text-[#6B7A90] mt-0.5 font-medium">
                                {user.email}
                              </p>
                            </div>
                          </div>
                        </td>
                        <td>
                          {user.employeeCode ? (
                            <span className="text-[11px] font-bold text-[#6B7A90] bg-[#F6FAFF] px-3 py-1.5 rounded-full border border-[#4DA3FF]/5 shadow-sm">
                              {user.employeeCode}
                            </span>
                          ) : (
                            <span className="text-xs text-slate-300 font-medium">
                              —
                            </span>
                          )}
                        </td>
                        <td>
                          <span
                            className={`text-[11px] font-extrabold uppercase tracking-wide px-3 py-1.5 rounded-lg border ${getRoleStyle(user.role)}`}
                          >
                            {user.role}
                          </span>
                        </td>
                        <td>
                          <span
                            className={`badge-v2 ${user.status === "Active" ? "badge-green" : "badge-red"}`}
                          >
                            <span
                              className={`w-1.5 h-1.5 rounded-full ${user.status === "Active" ? "bg-[#00C07D]" : "bg-[#FF5A5A]"}`}
                            />
                            {user.status}
                          </span>
                        </td>
                        <td>
                          <div className="flex flex-col">
                            <span className="text-xs font-bold text-[#1E2A3A] flex items-center gap-2">
                              <Calendar01Icon
                                size={12}
                                className="text-[#4DA3FF]"
                              />
                              {user.joinedAt
                                ? new Date(user.joinedAt).toLocaleDateString()
                                : new Date().toLocaleDateString()}
                            </span>
                            <span className="text-[10px] font-bold text-[#6B7A90]/60 mt-1 pl-5">
                              {user.joinedAt
                                ? new Date(user.joinedAt).toLocaleTimeString(
                                    [],
                                    { hour: "2-digit", minute: "2-digit" },
                                  )
                                : "12:00 PM"}
                            </span>
                          </div>
                        </td>
                        <td>
                          <div className="flex items-center justify-end gap-2">
                            <button
                              onClick={() => handleOpenEdit(user)}
                              className="w-9 h-9 flex items-center justify-center rounded-xl border border-[#4DA3FF]/20 text-[#4DA3FF] hover:bg-[#EAF4FF] transition-colors shadow-sm"
                            >
                              <PencilEdit02Icon size={16} />
                            </button>
                            {user.status === "Active" && (
                              <button
                                onClick={() => handleOpenDeactivate(user)}
                                className="w-9 h-9 flex items-center justify-center rounded-xl border border-orange-200 text-orange-500 hover:bg-orange-50 transition-colors shadow-sm"
                                title="Deactivate User"
                              >
                                <CancelCircleIcon size={16} />
                              </button>
                            )}
                            <button
                              onClick={() => handleOpenDelete(user)}
                              className="w-9 h-9 flex items-center justify-center rounded-xl border border-rose-200 text-rose-500 hover:bg-rose-50 transition-colors shadow-sm"
                            >
                              <Delete02Icon size={16} />
                            </button>
                          </div>
                        </td>
                      </tr>
                    ))
                  ) : (
                    <tr>
                      <td
                        colSpan={6}
                        className="text-center py-20 text-[#6B7A90] font-medium"
                      >
                        No users found matching your search.
                      </td>
                    </tr>
                  )}
                </tbody>
              </table>
            </div>

            <div className="flex items-center justify-between mt-10 pt-8 border-t border-[#4DA3FF]/10">
              <p className="text-xs font-bold text-[#6B7A90]/60 uppercase tracking-widest">
                Showing{" "}
                {Math.min(
                  filteredUsers.length,
                  (currentPage - 1) * itemsPerPage + 1,
                )}{" "}
                - {Math.min(filteredUsers.length, currentPage * itemsPerPage)}{" "}
                of {filteredUsers.length} entries
              </p>
              <div className="flex gap-3">
                <button
                  onClick={() => setCurrentPage((p) => Math.max(1, p - 1))}
                  disabled={currentPage === 1}
                  className="px-5 py-2 bg-[#F6FAFF] rounded-xl text-xs font-bold text-[#6B7A90] disabled:opacity-50 disabled:cursor-not-allowed border border-[#4DA3FF]/5 hover:bg-[#EAF4FF] transition-all flex items-center gap-2"
                >
                  <ArrowLeft01Icon size={14} /> Previous
                </button>
                <button
                  onClick={() =>
                    setCurrentPage((p) => Math.min(totalPages, p + 1))
                  }
                  disabled={currentPage === totalPages}
                  className="px-5 py-2 bg-white border border-[#4DA3FF]/10 rounded-xl text-xs font-bold text-[#1E2A3A] hover:bg-[#F6FAFF] hover:border-[#4DA3FF]/30 transition-all shadow-sm disabled:opacity-50 disabled:cursor-not-allowed flex items-center gap-2"
                >
                  Next <ArrowRight01Icon size={14} />
                </button>
              </div>
            </div>
          </>
        )}
      </div>

      {/* Add User Modal */}
      <Modal
        isOpen={isAddModalOpen}
        onClose={() => setIsAddModalOpen(false)}
        title="Provision New User"
        width="lg"
      >
        <form onSubmit={handleAddSubmit} className="space-y-6">
          <div className="grid grid-cols-2 gap-5">
            <div>
              <AdminInput
                label="Full Name"
                required
                placeholder="e.g. John Doe"
                value={formData.name}
                onChange={(e) => {
                  if (/^[a-zA-Z\s]*$/.test(e.target.value)) {
                    setFormData({ ...formData, name: e.target.value });
                  }
                }}
              />
            </div>
            <div>
              <label className="text-xs font-bold text-[#6B7A90] uppercase tracking-wider mb-2 block">
                Employee Code{" "}
              </label>
              <input
                type="text"
                placeholder="Auto-generated if blank"
                value={formData.employeeCode}
                onChange={(e) =>
                  setFormData({ ...formData, employeeCode: e.target.value })
                }
                className="w-full px-4 py-3 bg-[#F6FAFF] border border-[#4DA3FF]/10 rounded-xl text-sm focus:border-[#4DA3FF] outline-none transition-all"
              />
            </div>

            <div className="col-span-2">
              <AdminInput
                type="email"
                label="Email Address"
                required
                placeholder="e.g. john@aashita.ai"
                value={formData.email}
                onChange={(e) =>
                  setFormData({ ...formData, email: e.target.value })
                }
              />
            </div>
            <div>
              <label className="text-xs font-bold text-[#6B7A90] uppercase tracking-wider mb-2 block">
                Role
              </label>
              <AdminDropdown
                value={formData.role}
                onChange={(val) => setFormData({ ...formData, role: val })}
                options={[
                  {
                    label: "Employee",
                    value: "Employee",
                    border: "border-l-blue-400",
                    icon: (
                      <UserCircleIcon size={16} className="text-blue-500" />
                    ),
                  },
                  {
                    label: "Admin",
                    value: "Admin",
                    border: "border-l-purple-400",
                    icon: (
                      <UserCircleIcon size={16} className="text-purple-500" />
                    ),
                  },
                ]}
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
                    label: "Inactive",
                    value: "Inactive",
                    border: "border-l-[#FF5A5A]",
                    icon: (
                      <CancelCircleIcon size={16} className="text-[#FF5A5A]" />
                    ),
                  },
                ]}
              />
            </div>
          </div>
          <div className="flex justify-end gap-3 pt-6 border-t border-[#4DA3FF]/10">
            <button
              type="button"
              onClick={() => setIsAddModalOpen(false)}
              className="secondary-btn-admin"
            >
              Cancel
            </button>
            <button
              type="submit"
              disabled={isSubmitting}
              className="primary-btn-admin min-w-[150px]"
            >
              {isSubmitting ? (
                <Loading03Icon className="animate-spin" size={20} />
              ) : (
                "Create Account"
              )}
            </button>
          </div>
        </form>
      </Modal>

      {/* Edit User Modal */}
      <Modal
        isOpen={isEditModalOpen}
        onClose={() => setIsEditModalOpen(false)}
        title="Edit Employee Profile"
        width="lg"
      >
        <form onSubmit={handleEditSubmit} className="space-y-6">
          <div className="grid grid-cols-2 gap-5">
            <div>
              <AdminInput
                label="Full Name"
                required
                value={formData.name}
                onChange={(e) => {
                  if (/^[a-zA-Z\s]*$/.test(e.target.value)) {
                    setFormData({ ...formData, name: e.target.value });
                  }
                }}
              />
            </div>
            <div>
              <label className="text-xs font-bold text-[#6B7A90] uppercase tracking-wider mb-2 block">
                Employee Code
              </label>
              <input
                type="text"
                value={formData.employeeCode}
                onChange={(e) =>
                  setFormData({ ...formData, employeeCode: e.target.value })
                }
                className="w-full px-4 py-3 bg-[#F6FAFF] border border-[#4DA3FF]/10 rounded-xl text-sm focus:border-[#4DA3FF] outline-none transition-all"
              />
            </div>

            <div className="col-span-2">
              <AdminInput
                type="email"
                label="Email Address"
                required
                value={formData.email}
                onChange={(e) =>
                  setFormData({ ...formData, email: e.target.value })
                }
              />
            </div>
            <div>
              <label className="text-xs font-bold text-[#6B7A90] uppercase tracking-wider mb-2 block">
                Role
              </label>
              <AdminDropdown
                value={formData.role}
                onChange={(val) => setFormData({ ...formData, role: val })}
                options={[
                  {
                    label: "Employee",
                    value: "Employee",
                    border: "border-l-blue-400",
                    icon: (
                      <UserCircleIcon size={16} className="text-blue-500" />
                    ),
                  },
                  {
                    label: "Admin",
                    value: "Admin",
                    border: "border-l-purple-400",
                    icon: (
                      <UserCircleIcon size={16} className="text-purple-500" />
                    ),
                  },
                ]}
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
                    label: "Inactive",
                    value: "Inactive",
                    border: "border-l-[#FF5A5A]",
                    icon: (
                      <CancelCircleIcon size={16} className="text-[#FF5A5A]" />
                    ),
                  },
                ]}
              />
            </div>
          </div>
          <div className="flex justify-end gap-3 pt-6 border-t border-[#4DA3FF]/10">
            <button
              type="button"
              onClick={() => setIsEditModalOpen(false)}
              className="secondary-btn-admin"
            >
              Cancel
            </button>
            <button
              type="submit"
              disabled={isSubmitting}
              className="primary-btn-admin min-w-[150px]"
            >
              {isSubmitting ? (
                <Loading03Icon className="animate-spin" size={20} />
              ) : (
                "Save Changes"
              )}
            </button>
          </div>
        </form>
      </Modal>

      {/* Delete User Modal */}
      <Modal
        isOpen={isDeleteModalOpen}
        onClose={() => setIsDeleteModalOpen(false)}
        title="Confirm Deletion"
        width="sm"
      >
        <div className="space-y-4">
          <p className="text-[#6B7A90] text-sm">
            Are you sure you want to permanently delete{" "}
            <span className="font-bold text-[#1E2A3A]">
              {currentUser?.name}
            </span>
            ? This action cannot be undone.
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

      {/* Deactivate User Modal */}
      <Modal
        isOpen={isDeactivateModalOpen}
        onClose={() => setIsDeactivateModalOpen(false)}
        title="Deactivate User"
        width="sm"
      >
        <div className="space-y-4">
          <p className="text-[#6B7A90] text-sm">
            Are you sure you want to deactivate{" "}
            <span className="font-bold text-[#1E2A3A]">
              {currentUser?.name}
            </span>
            ? They will lose access to the platform immediately.
          </p>
          <div className="flex justify-end gap-3 pt-4">
            <button
              onClick={() => setIsDeactivateModalOpen(false)}
              className="secondary-btn-admin"
            >
              Cancel
            </button>
            <button
              onClick={handleDeactivateSubmit}
              disabled={isSubmitting}
              className="px-6 py-3 bg-orange-500 hover:bg-orange-600 text-white rounded-xl font-bold text-sm shadow-md transition-all flex items-center justify-center min-w-[120px]"
            >
              {isSubmitting ? (
                <Loading03Icon className="animate-spin" size={20} />
              ) : (
                "Deactivate"
              )}
            </button>
          </div>
        </div>
      </Modal>
    </div>
  );
}
