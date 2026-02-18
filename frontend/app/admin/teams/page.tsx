"use client";

import { useState, useEffect, useRef } from "react";
import {
  Add01Icon,
  PencilEdit02Icon,
  Delete02Icon,
  Loading03Icon,
  Camera01Icon,
  Menu01Icon,
  ViewOffIcon,
  ViewIcon,
  CheckmarkCircle01Icon,
  CancelCircleIcon,
  CodeIcon,
  PackageIcon,
  PaintBoardIcon,
  Search01Icon,
  Settings01Icon,
  AlertCircleIcon,
} from "@hugeicons/react";
import AdminDropdown from "@/components/ui/AdminDropdown";
import AdminInput from "@/components/ui/AdminInput";
import { motion, Reorder, useDragControls } from "framer-motion";
import { mockApi } from "@/lib/mockApi";
import { useToast } from "@/components/ui/Toast";
import Modal from "@/components/ui/Modal";
import AdminBreadcrumb from "@/components/admin/AdminBreadcrumb";

interface TeamMemberRowProps {
  member: any;
  index: number;
  handleOpenEdit: (member: any) => void;
  handleOpenDeactivate: (member: any) => void;
  handleOpenDelete: (member: any) => void;
}

function TeamMemberRow({
  member,
  index,
  handleOpenEdit,
  handleOpenDeactivate,
  handleOpenDelete,
}: TeamMemberRowProps) {
  const controls = useDragControls();

  return (
    <Reorder.Item
      value={member}
      as="tr"
      dragListener={false}
      dragControls={controls}
      className="group bg-white hover:bg-[#F2F8FF] transition-colors border-b border-[#4DA3FF]/5 last:border-0 relative select-none"
      whileDrag={{
        boxShadow: "0px 10px 30px rgba(0,0,0,0.1)",
        backgroundColor: "#ffffff",
        scale: 1.01,
        zIndex: 50,
      }}
      layout
    >
      <td className="pl-6 py-5">
        <div className="flex items-center gap-3">
          <div
            className="cursor-grab active:cursor-grabbing p-1 hover:bg-[#EAF4FF] rounded-md transition-colors"
            onPointerDown={(e) => controls.start(e)}
          >
            <Menu01Icon size={16} className="text-[#6B7A90]/40" />
          </div>
          <span className="w-6 h-6 rounded-md bg-[#F6FAFF] border border-[#4DA3FF]/10 flex items-center justify-center text-[10px] font-bold text-[#6B7A90]">
            {index + 1}
          </span>
        </div>
      </td>
      <td className="py-5">
        <div className="flex items-center gap-4">
          <div className="w-11 h-11 rounded-full bg-[#EAF4FF] border border-[#4DA3FF]/10 flex items-center justify-center overflow-hidden">
            {member.image ? (
              <img
                src={member.image}
                alt={member.name}
                className="w-full h-full object-cover"
              />
            ) : (
              <span className="font-black text-xs text-[#4DA3FF]">
                {member.name.substring(0, 2).toUpperCase()}
              </span>
            )}
          </div>
          <div>
            <p className="font-bold text-sm text-[#1E2A3A] group-hover:text-[#4DA3FF] transition-colors">
              {member.name}
            </p>
            <p className="text-[11px] text-[#6B7A90] mt-0.5 font-medium">
              Exp: {member.experience}
            </p>
          </div>
        </div>
      </td>
      <td>
        <div className="flex flex-col gap-2">
          <p className="font-bold text-sm text-[#3b82f6] cursor-pointer hover:underline">
            {member.role}
          </p>
          <div className="flex flex-wrap gap-2">
            {member.expertise &&
              member.expertise.map((tag: string, i: number) => (
                <span
                  key={i}
                  className="text-[10px] bg-[#F1F5F9] text-[#64748B] px-2 py-0.5 rounded-full font-medium border border-slate-200"
                >
                  {tag}
                </span>
              ))}
          </div>
        </div>
      </td>
      <td>
        <span
          className={`badge-v2 ${member.status?.toLowerCase() === "active" ? "badge-green" : "badge-red"}`}
        >
          <span
            className={`w-1.5 h-1.5 rounded-full ${member.status?.toLowerCase() === "active" ? "bg-[#00C07D]" : "bg-[#FF5A5A]"}`}
          />
          {member.status || "Active"}
        </span>
      </td>
      <td className="pr-6">
        <div className="flex items-center justify-end gap-2">
          <button
            onClick={() => handleOpenEdit(member)}
            className="w-9 h-9 flex items-center justify-center rounded-xl border border-[#4DA3FF]/20 text-[#4DA3FF] hover:bg-[#EAF4FF] transition-colors shadow-sm"
          >
            <PencilEdit02Icon size={16} />
          </button>
          <button
            onClick={() => handleOpenDeactivate(member)}
            className={`w-9 h-9 flex items-center justify-center rounded-xl border transition-colors shadow-sm ${
              member.status === "Active"
                ? "border-emerald-200 text-emerald-500 hover:bg-emerald-50"
                : "border-rose-200 text-rose-500 hover:bg-rose-50"
            }`}
            title={
              member.status === "Active"
                ? "Deactivate Member"
                : "Activate Member"
            }
          >
            {member.status === "Active" ? (
              <ViewOffIcon size={16} />
            ) : (
              <ViewIcon size={16} />
            )}
          </button>
          <button
            onClick={() => handleOpenDelete(member)}
            className="w-9 h-9 flex items-center justify-center rounded-xl border border-rose-200 text-rose-500 hover:bg-rose-50 transition-colors shadow-sm"
          >
            <Delete02Icon size={16} />
          </button>
        </div>
      </td>
    </Reorder.Item>
  );
}

export default function TeamsAdminPage() {
  const { showToast } = useToast();
  const [members, setMembers] = useState<any[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [isAddModalOpen, setIsAddModalOpen] = useState(false);
  const [isEditModalOpen, setIsEditModalOpen] = useState(false);
  const [isDeleteModalOpen, setIsDeleteModalOpen] = useState(false);
  const [isDeactivateModalOpen, setIsDeactivateModalOpen] = useState(false);
  const [currentMember, setCurrentMember] = useState<any>(null);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const fileInputRef = useRef<HTMLInputElement>(null);

  const handleImageClick = () => {
    fileInputRef.current?.click();
  };

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      if (file.size > 2 * 1024 * 1024) {
        showToast("Image size should be less than 2MB", "error");
        return;
      }
      const reader = new FileReader();
      reader.onloadend = () => {
        setFormData((prev) => ({ ...prev, image: reader.result as string }));
      };
      reader.readAsDataURL(file);
    }
  };

  const handleRemoveImage = (e: React.MouseEvent) => {
    e.stopPropagation();
    setFormData((prev) => ({ ...prev, image: "" }));
    if (fileInputRef.current) fileInputRef.current.value = "";
  };

  // Form state
  const [formData, setFormData] = useState({
    name: "",
    role: "",
    dept: "Engineering",
    customDept: "",
    email: "",
    image: "",
    status: "Active",
    expertise: [] as string[],
    experience: "1+ years",
    expertiseInput: "",
  });

  useEffect(() => {
    fetchMembers();
  }, []);

  const fetchMembers = async () => {
    setIsLoading(true);
    try {
      const data = await mockApi.teams.getAll();
      // Ensure data has order, experience, expertise, status
      const formattedData = data.map((item: any, index: number) => ({
        ...item,
        order: item.order || index + 1,
        experience: item.experience || "2+ years",
        expertise: item.expertise || ["Strategy", "Leadership"],
        status: item.status || "Active",
      }));
      setMembers(formattedData.sort((a: any, b: any) => a.order - b.order));
    } catch (error) {
      showToast("Failed to fetch team members", "error");
    } finally {
      setIsLoading(false);
    }
  };

  const resetForm = () => {
    setFormData({
      name: "",
      role: "",
      dept: "Engineering",
      customDept: "",
      email: "",
      image: "",
      status: "Active",
      expertise: [],
      experience: "1+ years",
      expertiseInput: "",
    });
    setCurrentMember(null);
  };

  const handleOpenAdd = () => {
    resetForm();
    setIsAddModalOpen(true);
  };

  const handleOpenEdit = (member: any) => {
    setCurrentMember(member);
    setFormData({
      name: member.name,
      role: member.role,
      dept: [
        "Engineering",
        "Product",
        "Design",
        "Research",
        "Operations",
      ].includes(member.dept)
        ? member.dept
        : "Others",
      customDept: [
        "Engineering",
        "Product",
        "Design",
        "Research",
        "Operations",
      ].includes(member.dept)
        ? ""
        : member.dept,
      email: member.email,
      image: member.image || "",
      status: member.status || "Active",
      expertise: member.expertise || [],
      experience: member.experience || "1+ years",
      expertiseInput: "",
    });
    setIsEditModalOpen(true);
  };

  const handleOpenDelete = (member: any) => {
    setCurrentMember(member);
    setIsDeleteModalOpen(true);
  };

  const handleOpenDeactivate = (member: any) => {
    setCurrentMember(member);
    setIsDeactivateModalOpen(true);
  };

  const handleExpertiseAdd = (e: React.KeyboardEvent) => {
    if (e.key === "Enter" && formData.expertiseInput.trim()) {
      e.preventDefault();
      if (!formData.expertise.includes(formData.expertiseInput.trim())) {
        setFormData({
          ...formData,
          expertise: [...formData.expertise, formData.expertiseInput.trim()],
          expertiseInput: "",
        });
      }
    }
  };

  const removeExpertise = (tag: string) => {
    setFormData({
      ...formData,
      expertise: formData.expertise.filter((t) => t !== tag),
    });
  };

  const handleAddSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);
    try {
      const submitData = {
        ...formData,
        dept: formData.dept === "Others" ? formData.customDept : formData.dept,
        order: members.length + 1,
      };
      // cleanup temporary fields
      const { expertiseInput, customDept, ...finalSubmitData } =
        submitData as any;
      await mockApi.teams.create(finalSubmitData);
      showToast("Team member added successfully", "success");
      setIsAddModalOpen(false);
      fetchMembers();
    } catch (error) {
      showToast("Failed to add team member", "error");
    } finally {
      setIsSubmitting(false);
    }
  };

  const handleEditSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);
    try {
      const { expertiseInput, customDept, ...submitData } = {
        ...formData,
        dept: formData.dept === "Others" ? formData.customDept : formData.dept,
      } as any;
      await mockApi.teams.update(currentMember.id, submitData);
      showToast("Member updated successfully", "success");
      setIsEditModalOpen(false);
      fetchMembers();
    } catch (error) {
      showToast("Failed to update member", "error");
    } finally {
      setIsSubmitting(false);
    }
  };

  const handleDeleteSubmit = async () => {
    setIsSubmitting(true);
    try {
      await mockApi.teams.delete(currentMember.id);
      showToast("Member removed successfully", "success");
      setIsDeleteModalOpen(false);
      fetchMembers();
    } catch (error) {
      showToast("Failed to remove member", "error");
    } finally {
      setIsSubmitting(false);
    }
  };

  const handleDeactivateSubmit = async () => {
    setIsSubmitting(true);
    try {
      const newStatus =
        currentMember.status === "Active" ? "Inactive" : "Active";
      await mockApi.teams.update(currentMember.id, { status: newStatus });
      showToast(`Member marked as ${newStatus}`, "success");
      setIsDeactivateModalOpen(false);
      fetchMembers();
    } catch (error) {
      showToast("Failed to update status", "error");
    } finally {
      setIsSubmitting(false);
    }
  };

  const handleReorder = (newOrder: any[]) => {
    setMembers(newOrder);
  };

  return (
    <div className="space-y-10">
      <div className="flex flex-col gap-2">
        <AdminBreadcrumb />
        <div className="flex flex-col lg:flex-row lg:items-center justify-between gap-6">
          <div>
            <h1 className="text-4xl font-black tracking-tight text-[#1E2A3A]">
              Team Structure
            </h1>
            <p className="text-[#6B7A90] font-medium mt-1">
              Organize stakeholders and core members for the public portal.
            </p>
          </div>
          <button onClick={handleOpenAdd} className="primary-btn-admin">
            <Add01Icon size={20} />
            <span>Onboard Member</span>
          </button>
        </div>
      </div>

      {isLoading ? (
        <div className="flex items-center justify-center py-40">
          <Loading03Icon size={40} className="animate-spin text-[#4DA3FF]" />
        </div>
      ) : (
        <div className="glass-card-v2 p-0 overflow-hidden">
          <div className="overflow-x-hidden min-h-[500px]">
            <table className="data-table-v2 w-full">
              <thead>
                <tr>
                  <th className="w-24 pl-6">Order</th>
                  <th className="w-1/4">Member</th>
                  <th className="w-1/3">Role & Expertise</th>
                  <th className="w-32">Status</th>
                  <th className="text-right px-6">Actions</th>
                </tr>
              </thead>
              <Reorder.Group
                as="tbody"
                axis="y"
                values={members}
                onReorder={handleReorder}
              >
                {members.map((member, index) => (
                  <TeamMemberRow
                    key={member.id}
                    member={member}
                    index={index}
                    handleOpenEdit={handleOpenEdit}
                    handleOpenDeactivate={handleOpenDeactivate}
                    handleOpenDelete={handleOpenDelete}
                  />
                ))}
              </Reorder.Group>
            </table>
          </div>
        </div>
      )}

      {/* Add/Edit Modal Form */}
      <Modal
        isOpen={isAddModalOpen || isEditModalOpen}
        onClose={() => {
          setIsAddModalOpen(false);
          setIsEditModalOpen(false);
        }}
        title={isAddModalOpen ? "Onboard Team Member" : "Update Profile"}
        width="lg"
      >
        <form
          onSubmit={isAddModalOpen ? handleAddSubmit : handleEditSubmit}
          className="space-y-6"
        >
          <div className="flex items-center justify-center mb-6">
            <input
              type="file"
              ref={fileInputRef}
              onChange={handleFileChange}
              accept="image/*"
              className="hidden"
            />
            <div className="flex flex-col items-center gap-3">
              <div
                onClick={handleImageClick}
                className="w-24 h-24 rounded-full bg-[#F6FAFF] border-2 border-dashed border-[#4DA3FF]/30 flex items-center justify-center relative group cursor-pointer hover:bg-[#EAF4FF] transition-colors overflow-hidden"
              >
                {formData.image ? (
                  <img
                    src={formData.image}
                    className="w-full h-full object-cover"
                    alt="Profile"
                  />
                ) : (
                  <Camera01Icon size={32} className="text-[#4DA3FF]/50" />
                )}
                <div className="absolute inset-0 flex items-center justify-center bg-black/40 opacity-0 group-hover:opacity-100 transition-opacity">
                  <span className="text-[10px] text-white font-bold">
                    Change
                  </span>
                </div>
              </div>
              {formData.image && (
                <button
                  type="button"
                  onClick={handleRemoveImage}
                  className="text-[10px] font-bold text-rose-500 hover:text-rose-600 transition-colors uppercase tracking-wider"
                >
                  Remove Image
                </button>
              )}
            </div>
          </div>

          <div className="grid grid-cols-2 gap-5">
            <div>
              <AdminInput
                label="Full Name"
                required
                onlyLetters
                placeholder="e.g. Sarah Connor"
                value={formData.name}
                onChange={(e) =>
                  setFormData({ ...formData, name: e.target.value })
                }
              />
            </div>
            <div>
              <AdminInput
                label="Job Title"
                required
                placeholder="e.g. Senior AI Engineer"
                value={formData.role}
                onChange={(e) =>
                  setFormData({ ...formData, role: e.target.value })
                }
              />
            </div>
            <div>
              <label className="text-xs font-bold text-[#6B7A90] uppercase tracking-wider mb-2 block">
                Experience
              </label>
              <input
                type="text"
                placeholder="e.g. 5+ years"
                value={formData.experience}
                onChange={(e) =>
                  setFormData({ ...formData, experience: e.target.value })
                }
                className="w-full px-4 py-3 bg-[#F6FAFF] border border-[#4DA3FF]/10 rounded-xl text-sm focus:border-[#4DA3FF] outline-none transition-all"
              />
            </div>
            <div>
              <AdminInput
                type="email"
                label="Email (Internal)"
                required
                placeholder="e.g. sarah@aashita.ai"
                value={formData.email}
                onChange={(e) =>
                  setFormData({ ...formData, email: e.target.value })
                }
              />
            </div>
          </div>

          <div>
            <label className="text-xs font-bold text-[#6B7A90] uppercase tracking-wider mb-2 block">
              Expertise Tags (Press Enter to add)
            </label>
            <div className="bg-[#F6FAFF] border border-[#4DA3FF]/10 rounded-xl p-2 flex flex-wrap gap-2 min-h-[50px] focus-within:border-[#4DA3FF] transition-all">
              {formData.expertise.map((tag, idx) => (
                <span
                  key={idx}
                  className="bg-white px-3 py-1 rounded-lg text-xs font-bold text-[#4DA3FF] shadow-sm border border-[#4DA3FF]/10 flex items-center gap-2"
                >
                  {tag}
                  <button
                    type="button"
                    onClick={() => removeExpertise(tag)}
                    className="hover:text-rose-500"
                  >
                    <Delete02Icon size={12} />
                  </button>
                </span>
              ))}
              <input
                type="text"
                value={formData.expertiseInput}
                onChange={(e) =>
                  setFormData({ ...formData, expertiseInput: e.target.value })
                }
                onKeyDown={handleExpertiseAdd}
                placeholder={
                  formData.expertise.length === 0
                    ? "Type skill and press Enter..."
                    : ""
                }
                className="bg-transparent text-sm outline-none flex-1 min-w-[120px] h-full py-1 px-2"
              />
            </div>
          </div>

          <div className="grid grid-cols-2 gap-5">
            <div>
              <label className="text-xs font-bold text-[#6B7A90] uppercase tracking-wider mb-2 block">
                Department
              </label>
              <AdminDropdown
                value={formData.dept}
                onChange={(val) => setFormData({ ...formData, dept: val })}
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

          {formData.dept === "Others" && (
            <AdminInput
              label="Custom Department"
              required
              placeholder="e.g. Marketing"
              value={formData.customDept}
              onChange={(e) =>
                setFormData({ ...formData, customDept: e.target.value })
              }
            />
          )}

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
                "Add Member"
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
        title="Confirm Removal"
        width="sm"
      >
        <div className="space-y-4">
          <p className="text-[#6B7A90] text-sm">
            Are you sure you want to remove{" "}
            <span className="font-bold text-[#1E2A3A]">
              {currentMember?.name}
            </span>{" "}
            from the team listing?
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
                "Remove"
              )}
            </button>
          </div>
        </div>
      </Modal>

      {/* Deactivate User Modal */}
      <Modal
        isOpen={isDeactivateModalOpen}
        onClose={() => setIsDeactivateModalOpen(false)}
        title={
          currentMember?.status === "Active"
            ? "Deactivate Member"
            : "Activate Member"
        }
        width="sm"
      >
        <div className="space-y-4">
          <p className="text-[#6B7A90] text-sm">
            Are you sure you want to{" "}
            {currentMember?.status === "Active" ? "deactivate" : "activate"}{" "}
            <span className="font-bold text-[#1E2A3A]">
              {currentMember?.name}
            </span>
            ?
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
              className="px-6 py-3 bg-slate-800 hover:bg-black text-white rounded-xl font-bold text-sm shadow-md transition-all flex items-center justify-center min-w-[120px]"
            >
              {isSubmitting ? (
                <Loading03Icon className="animate-spin" size={20} />
              ) : (
                "Confirm"
              )}
            </button>
          </div>
        </div>
      </Modal>
    </div>
  );
}
