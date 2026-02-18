"use client";

import { useState, useEffect, useMemo } from "react";
import {
  Add01Icon,
  Search01Icon,
  PencilEdit02Icon,
  Delete02Icon,
  ViewIcon,
  DocumentCodeIcon,
  Calendar01Icon,
  FilterIcon,
  MoreHorizontalIcon,
  Loading03Icon,
  ArrowLeft01Icon,
  ArrowRight01Icon,
  LaptopIcon,
  PaintBoardIcon,
  Briefcase01Icon,
  AiBrain01Icon,
  CodeIcon,
  ViewOffIcon,
  CheckmarkCircle01Icon,
  Archive01Icon,
} from "@hugeicons/react";
import AdminDropdown from "@/components/ui/AdminDropdown";
import { motion } from "framer-motion";
import { mockApi } from "@/lib/mockApi";
import { useToast } from "@/components/ui/Toast";
import Modal from "@/components/ui/Modal";
import AdminBreadcrumb from "@/components/admin/AdminBreadcrumb";
import AdminInput from "@/components/ui/AdminInput";

import { useRouter } from "next/navigation";

export default function BlogAdminPage() {
  const router = useRouter();
  const { showToast } = useToast();
  const [posts, setPosts] = useState<any[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [searchQuery, setSearchQuery] = useState("");
  const [statusFilter, setStatusFilter] = useState("All");
  // isAddModalOpen removed
  const [isEditModalOpen, setIsEditModalOpen] = useState(false);
  const [isDeleteModalOpen, setIsDeleteModalOpen] = useState(false);
  const [currentPost, setCurrentPost] = useState<any>(null);
  const [isSubmitting, setIsSubmitting] = useState(false);

  // Pagination state
  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = 5;

  // Form state
  const [formData, setFormData] = useState({
    title: "",
    category: "Technology",
    author: "Prashant Sharma", // Defaulting for now
    status: "Draft",
    content: "",
  });

  useEffect(() => {
    fetchPosts();
  }, []);

  const fetchPosts = async () => {
    setIsLoading(true);
    try {
      const data = await mockApi.blog.getAll();
      setPosts(data);
    } catch (error) {
      showToast("Failed to fetch articles", "error");
    } finally {
      setIsLoading(false);
    }
  };

  const handleOpenAdd = () => {
    router.push("/admin/blog/create");
  };

  const handleOpenEdit = (post: any) => {
    setCurrentPost(post);
    setFormData({
      title: post.title,
      category: post.category,
      author: post.author,
      status: post.status,
      content: post.content || "",
    });
    setIsEditModalOpen(true);
  };

  const handleOpenDelete = (post: any) => {
    setCurrentPost(post);
    setIsDeleteModalOpen(true);
  };

  const handleEditSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);
    try {
      await mockApi.blog.update(currentPost.id, formData);
      showToast("Article updated successfully", "success");
      setIsEditModalOpen(false);
      fetchPosts();
    } catch (error) {
      showToast("Failed to update article", "error");
    } finally {
      setIsSubmitting(false);
    }
  };

  const handleDeleteSubmit = async () => {
    setIsSubmitting(true);
    try {
      await mockApi.blog.delete(currentPost.id);
      showToast("Article deleted successfully", "success");
      setIsDeleteModalOpen(false);
      fetchPosts();
    } catch (error) {
      showToast("Failed to delete article", "error");
    } finally {
      setIsSubmitting(false);
    }
  };

  const filteredPosts = useMemo(() => {
    return posts.filter((post) => {
      const matchesSearch =
        post.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
        post.author.toLowerCase().includes(searchQuery.toLowerCase());
      const matchesStatus =
        statusFilter === "All" || post.status === statusFilter;
      return matchesSearch && matchesStatus;
    });
  }, [posts, searchQuery, statusFilter]);

  const paginatedPosts = useMemo(() => {
    const startIndex = (currentPage - 1) * itemsPerPage;
    return filteredPosts.slice(startIndex, startIndex + itemsPerPage);
  }, [filteredPosts, currentPage]);

  const totalPages = Math.ceil(filteredPosts.length / itemsPerPage);

  return (
    <div className="space-y-10">
      <div className="flex flex-col gap-2">
        <AdminBreadcrumb />
        <div className="flex flex-col lg:flex-row lg:items-center justify-between gap-6">
          <div>
            <h1 className="text-4xl font-black tracking-tight text-[#1E2A3A]">
              Content Studio
            </h1>
            <p className="text-[#6B7A90] font-medium mt-1">
              Manage articles, thought leadership and press releases.
            </p>
          </div>
          <button onClick={handleOpenAdd} className="primary-btn-admin">
            <Add01Icon size={20} />
            <span>Write Article</span>
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
              placeholder="Search by title, author, or tag..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="w-full pl-14 pr-6 py-3.5 bg-[#F6FAFF] border border-[#4DA3FF]/10 rounded-2xl text-sm focus:border-[#4DA3FF] outline-none transition-all"
            />
          </div>
          <div className="flex gap-3">
            <button
              onClick={() =>
                setStatusFilter((prev) =>
                  prev === "All"
                    ? "Published"
                    : prev === "Published"
                      ? "Draft"
                      : "All",
                )
              }
              className="secondary-btn-admin min-w-[120px] justify-between"
            >
              <div className="flex items-center gap-2">
                <FilterIcon size={18} />
                <span>
                  {statusFilter === "All" ? "All Status" : statusFilter}
                </span>
              </div>
            </button>
          </div>
        </div>

        {isLoading ? (
          <div className="flex items-center justify-center py-20">
            <Loading03Icon size={40} className="animate-spin text-[#4DA3FF]" />
          </div>
        ) : (
          <>
            <div className="overflow-x-auto min-h-[400px]">
              <table className="data-table-v2">
                <thead>
                  <tr>
                    <th>Article Metadata</th>
                    <th>Category</th>
                    <th>Author</th>
                    <th>Status</th>
                    <th className="text-right px-6">Actions</th>
                  </tr>
                </thead>
                <tbody>
                  {paginatedPosts.length > 0 ? (
                    paginatedPosts.map((post) => (
                      <tr key={post.id} className="group">
                        <td>
                          <div className="flex items-start gap-4">
                            <div className="w-11 h-11 rounded-xl bg-[#F6FAFF] border border-[#4DA3FF]/10 flex items-center justify-center text-[#4DA3FF] group-hover:bg-[#EAF4FF] transition-colors">
                              <DocumentCodeIcon size={20} variant="bulk" />
                            </div>
                            <div>
                              <h4 className="font-bold text-sm text-[#1E2A3A] mb-1 group-hover:text-[#4DA3FF] transition-colors line-clamp-1">
                                {post.title}
                              </h4>
                              <div className="flex items-center gap-3 text-[10px] font-bold text-[#6B7A90] tracking-wide uppercase">
                                <span className="flex items-center gap-1">
                                  <Calendar01Icon size={12} /> {post.date}
                                </span>
                                <span className="w-1 h-1 rounded-full bg-[#6B7A90]/30" />
                                <span className="flex items-center gap-1">
                                  <ViewIcon size={12} /> {post.views}
                                </span>
                              </div>
                            </div>
                          </div>
                        </td>
                        <td>
                          <span className="inline-flex items-center gap-2 px-3 py-1.5 rounded-lg bg-[#F6FAFF] border border-[#4DA3FF]/5 text-[11px] font-bold text-[#6B7A90]">
                            <span className="w-1.5 h-1.5 rounded-full bg-[#4DA3FF]" />
                            {post.category}
                          </span>
                        </td>
                        <td>
                          <div className="flex items-center gap-2.5">
                            <div className="w-7 h-7 rounded-full bg-[#EAF4FF] border border-[#4DA3FF]/10 flex items-center justify-center text-[10px] font-black text-[#4DA3FF]">
                              {post.author
                                .split(" ")
                                .map((n: string) => n[0])
                                .join("")}
                            </div>
                            <span className="text-xs font-bold text-[#1E2A3A]">
                              {post.author}
                            </span>
                          </div>
                        </td>
                        <td>
                          <span
                            className={`badge-v2 ${
                              post.status === "Published"
                                ? "badge-green"
                                : "badge-orange"
                            }`}
                          >
                            <span
                              className={`w-1.5 h-1.5 rounded-full ${
                                post.status === "Published"
                                  ? "bg-[#00C07D]"
                                  : "bg-[#F97316]"
                              }`}
                            />
                            {post.status}
                          </span>
                        </td>
                        <td>
                          <div className="flex items-center justify-end gap-1.5 opacity-60 group-hover:opacity-100 transition-opacity">
                            <button
                              onClick={() => handleOpenEdit(post)}
                              className="action-btn"
                            >
                              <PencilEdit02Icon size={18} />
                            </button>
                            <button
                              onClick={() => handleOpenDelete(post)}
                              className="action-btn hover:text-rose-500 hover:bg-rose-50"
                            >
                              <Delete02Icon size={18} />
                            </button>
                          </div>
                        </td>
                      </tr>
                    ))
                  ) : (
                    <tr>
                      <td
                        colSpan={5}
                        className="text-center py-20 text-[#6B7A90] font-medium"
                      >
                        No articles found.
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
                  filteredPosts.length,
                  (currentPage - 1) * itemsPerPage + 1,
                )}{" "}
                - {Math.min(filteredPosts.length, currentPage * itemsPerPage)}{" "}
                of {filteredPosts.length} posts
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

      {/* Edit Post Modal */}
      <Modal
        isOpen={isEditModalOpen}
        onClose={() => {
          setIsEditModalOpen(false);
        }}
        title="Edit Article"
        width="lg"
      >
        <form onSubmit={handleEditSubmit} className="space-y-6">
          <div className="grid grid-cols-2 gap-5">
            <div className="col-span-2">
              <AdminInput
                label="Article Title"
                required
                placeholder="e.g. The Future of AI"
                value={formData.title}
                onChange={(e) =>
                  setFormData({ ...formData, title: e.target.value })
                }
                className="font-bold text-[#1E2A3A]"
              />
            </div>
            <div>
              <label className="text-xs font-bold text-[#6B7A90] uppercase tracking-wider mb-2 block">
                Category
              </label>
              <AdminDropdown
                value={formData.category}
                onChange={(val) => setFormData({ ...formData, category: val })}
                options={[
                  {
                    label: "Technology",
                    value: "Technology",
                    border: "border-l-blue-400",
                    icon: <LaptopIcon size={16} className="text-blue-500" />,
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
                    label: "Development",
                    value: "Development",
                    border: "border-l-indigo-400",
                    icon: <CodeIcon size={16} className="text-indigo-500" />,
                  },
                  {
                    label: "Business",
                    value: "Business",
                    border: "border-l-emerald-400",
                    icon: (
                      <Briefcase01Icon size={16} className="text-emerald-500" />
                    ),
                  },
                  {
                    label: "AI Research",
                    value: "AI Research",
                    border: "border-l-amber-400",
                    icon: (
                      <AiBrain01Icon size={16} className="text-amber-500" />
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
                    label: "Draft",
                    value: "Draft",
                    border: "border-l-slate-400",
                    icon: <ViewOffIcon size={16} className="text-slate-500" />,
                  },
                  {
                    label: "Published",
                    value: "Published",
                    border: "border-l-[#00C07D]",
                    icon: (
                      <CheckmarkCircle01Icon
                        size={16}
                        className="text-[#00C07D]"
                      />
                    ),
                  },
                  {
                    label: "Archived",
                    value: "Archived",
                    border: "border-l-orange-400",
                    icon: (
                      <Archive01Icon size={16} className="text-orange-500" />
                    ),
                  },
                ]}
              />
            </div>
            <div className="col-span-2">
              <label className="text-xs font-bold text-[#6B7A90] uppercase tracking-wider mb-2 block">
                Content Abstract
              </label>
              <textarea
                rows={6}
                placeholder="Start writing or paste content here..."
                value={formData.content}
                onChange={(e) =>
                  setFormData({ ...formData, content: e.target.value })
                }
                className="w-full px-4 py-3 bg-[#F6FAFF] border border-[#4DA3FF]/10 rounded-xl text-sm focus:border-[#4DA3FF] outline-none transition-all resize-none font-medium text-[#1E2A3A]"
              />
            </div>
          </div>

          <div className="flex justify-end gap-3 pt-6 border-t border-[#4DA3FF]/10">
            <button
              type="button"
              onClick={() => {
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
              ) : (
                "Update Article"
              )}
            </button>
          </div>
        </form>
      </Modal>

      {/* Delete Modal */}
      <Modal
        isOpen={isDeleteModalOpen}
        onClose={() => setIsDeleteModalOpen(false)}
        title="Delete Article"
        width="sm"
      >
        <div className="space-y-4">
          <p className="text-[#6B7A90] text-sm">
            Are you sure you want to delete{" "}
            <span className="font-bold text-[#1E2A3A]">
              {currentPost?.title}
            </span>
            ? This usage data will be lost.
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
