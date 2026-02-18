"use client";

import { useState, useEffect, useRef } from "react";
import { useRouter } from "next/navigation";
import {
  ArrowLeft01Icon,
  ImageAdd02Icon,
  Delete02Icon,
  Loading03Icon,
  TextIcon,
  Link01Icon,
  QuoteUpIcon,
  Heading01Icon,
  TextBoldIcon,
  TextItalicIcon,
  TextUnderlineIcon,
  Menu01Icon,
  Menu02Icon,
  CodeIcon,
  TextAlignLeftIcon,
  TextAlignCenterIcon,
  TextAlignRightIcon,
  Calendar01Icon,
  Tag01Icon,
  CheckmarkCircle01Icon,
  ViewOffIcon,
  LaptopIcon,
  PaintBoardIcon,
  Briefcase01Icon,
  AiBrain01Icon,
} from "@hugeicons/react";
import AdminDropdown from "@/components/ui/AdminDropdown";
import { useToast } from "@/components/ui/Toast";
import { mockApi } from "@/lib/mockApi";
import AdminInput from "@/components/ui/AdminInput";
import "quill/dist/quill.snow.css";

export default function CreateBlogPage() {
  const router = useRouter();
  const { showToast } = useToast();
  const [isLoading, setIsLoading] = useState(false);
  const [isSavingDraft, setIsSavingDraft] = useState(false);

  // Form State
  const [title, setTitle] = useState("");
  const [excerpt, setExcerpt] = useState("");
  const [content, setContent] = useState("");
  const [featuredImage, setFeaturedImage] = useState<string | null>(null);

  // Right Panel State
  const [status, setStatus] = useState("Draft");
  const [publishDate, setPublishDate] = useState("");
  const [isFeatured, setIsFeatured] = useState(false);
  const [category, setCategory] = useState("Technology");

  // SEO State
  const [seoTitle, setSeoTitle] = useState("");
  const [seoDescription, setSeoDescription] = useState("");
  const [seoKeywords, setSeoKeywords] = useState("");

  // Tags State
  const [tagInput, setTagInput] = useState("");
  const [tags, setTags] = useState<string[]>([]);

  // Slug State
  const [slug, setSlug] = useState("");
  const [isSlugEdited, setIsSlugEdited] = useState(false);
  const [textFormat, setTextFormat] = useState("Normal");
  const [isSeoTitleEdited, setIsSeoTitleEdited] = useState(false);
  const [isSeoDescEdited, setIsSeoDescEdited] = useState(false);

  const editorRef = useRef<HTMLDivElement>(null);
  const quillRef = useRef<any>(null);

  // Auto-generate slug from title
  useEffect(() => {
    if (!isSlugEdited) {
      const generatedSlug = title
        .toLowerCase()
        .replace(/[^a-z0-9]+/g, "-")
        .replace(/(^-|-$)+/g, "");
      setSlug(generatedSlug);
    }
  }, [title, isSlugEdited]);

  // Sync SEO with Title/Excerpt
  useEffect(() => {
    if (!isSeoTitleEdited) setSeoTitle(title);
  }, [title, isSeoTitleEdited]);

  useEffect(() => {
    if (!isSeoDescEdited) setSeoDescription(excerpt);
  }, [excerpt, isSeoDescEdited]);

  // Initialize Quill
  useEffect(() => {
    if (
      typeof window !== "undefined" &&
      editorRef.current &&
      !quillRef.current
    ) {
      const Quill = require("quill").default;
      quillRef.current = new Quill(editorRef.current, {
        theme: "snow",
        placeholder: "Write your masterpiece here...",
        modules: {
          toolbar: [
            [{ header: [1, 2, 3, false] }],
            ["bold", "italic", "underline", "strike"],
            ["blockquote", "code-block"],
            [{ list: "ordered" }, { list: "bullet" }],
            ["link", "image"],
            ["clean"],
          ],
        },
      });

      quillRef.current.on("text-change", () => {
        setContent(quillRef.current.root.innerHTML);
      });
    }
  }, []);

  // Auto-save draft simulation
  useEffect(() => {
    const interval = setInterval(() => {
      if (title || content) {
        setIsSavingDraft(true);
        setTimeout(() => setIsSavingDraft(false), 800);
      }
    }, 30000);
    return () => clearInterval(interval);
  }, [title, content]);

  const handleImageUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      if (file.size > 10 * 1024 * 1024) {
        showToast("Image size exceeds 10MB limit", "error");
        return;
      }
      // Create object URL for preview
      const objectUrl = URL.createObjectURL(file);
      setFeaturedImage(objectUrl);
      showToast("Image uploaded successfully", "success");
    }
  };

  const handleAddTag = () => {
    if (tagInput.trim() && !tags.includes(tagInput.trim())) {
      setTags([...tags, tagInput.trim()]);
      setTagInput("");
    }
  };

  const handleRemoveTag = (tagToRemove: string) => {
    setTags(tags.filter((tag) => tag !== tagToRemove));
  };

  const handlePublish = async () => {
    if (!title) {
      showToast("Blog Title is required", "error");
      return;
    }
    if (content.length < 50) {
      showToast("Content must be at least 50 characters", "error");
      return;
    }

    setIsLoading(true);
    try {
      const blogData = {
        title,
        excerpt,
        content,
        image: featuredImage,
        status,
        publishDate,
        isFeatured,
        category,
        seoTitle,
        seoDescription,
        seoKeywords,
        tags,
        slug,
        author: "Admin User", // Mock author
        views: "0",
      };

      await mockApi.blog.create(blogData);
      showToast("Blog post created successfully!", "success");
      setTimeout(() => router.push("/admin/blog"), 1000);
    } catch (error) {
      showToast("Failed to create blog post", "error");
    } finally {
      setIsLoading(false);
    }
  };

  const handleCancel = () => {
    if (
      confirm(
        "You have unsaved changes. Are you sure you want to discard them?",
      )
    ) {
      router.push("/admin/blog");
    }
  };

  return (
    <div className="min-h-screen bg-[#F6FAFF] pb-20">
      {/* Sticky Header */}
      <div className="sticky top-0 z-40 bg-white/80 backdrop-blur-md border-b border-[#4DA3FF]/10 px-6 py-4 flex items-center justify-between">
        <div className="flex items-center gap-4">
          <button
            onClick={() => router.back()}
            className="text-[#6B7A90] hover:text-[#1E2A3A] transition-colors"
            aria-label="Back to Blogs"
          >
            <ArrowLeft01Icon size={24} />
          </button>
          <div>
            <h1 className="text-xl font-black text-[#1E2A3A]">
              Create New Blog Post
            </h1>
            <div className="flex items-center gap-2">
              <span className="text-[10px] font-bold text-[#6B7A90] uppercase tracking-wider">
                {status} Mode
              </span>
              {isSavingDraft && (
                <span className="text-[10px] text-[#4DA3FF] flex items-center gap-1 font-medium animate-pulse">
                  <Loading03Icon size={10} className="animate-spin" /> Saving
                  draft...
                </span>
              )}
            </div>
          </div>
        </div>
        <div className="flex items-center gap-3">
          <button
            onClick={handleCancel}
            className="px-6 py-2.5 rounded-xl border border-[#6B7A90]/20 text-[#6B7A90] font-bold text-sm hover:bg-slate-50 transition-colors"
          >
            Cancel
          </button>
          <button
            onClick={handlePublish}
            disabled={isLoading}
            className="px-8 py-2.5 rounded-xl bg-[#4DA3FF] text-white font-bold text-sm shadow-[0_4px_14px_rgba(77,163,255,0.4)] hover:shadow-[0_6px_20px_rgba(77,163,255,0.6)] hover:-translate-y-0.5 transition-all flex items-center gap-2"
          >
            {isLoading ? (
              <Loading03Icon className="animate-spin" size={18} />
            ) : (
              "Create Blog"
            )}
          </button>
        </div>
      </div>

      <div className="max-w-[1600px] mx-auto p-8 flex flex-col xl:flex-row gap-8">
        {/* LEFT MAIN CONTENT */}
        <div className="flex-1 space-y-8 min-w-0">
          <div className="bg-white rounded-[20px] p-8 shadow-sm border border-[#4DA3FF]/5">
            <AdminInput
              placeholder="Enter blog title..."
              value={title}
              onChange={(e) => setTitle(e.target.value)}
              className="text-4xl font-black text-[#1E2A3A] placeholder:text-[#6B7A90]/30 border-none px-0 py-0 bg-transparent focus:border-transparent"
              required
            />
          </div>

          {/* Excerpt */}
          <div className="bg-white rounded-[20px] p-8 shadow-sm border border-[#4DA3FF]/5">
            <div className="flex justify-between items-center mb-4">
              <label className="text-xs font-bold text-[#6B7A90] uppercase tracking-wider">
                Excerpt{" "}
                <span className="text-[#6B7A90]/50 font-normal ml-1">
                  (Brief summary)
                </span>
              </label>
              <span
                className={`text-xs font-bold ${excerpt.length > 200 ? "text-rose-500" : "text-[#6B7A90]/50"}`}
              >
                {excerpt.length}/200
              </span>
            </div>
            <textarea
              rows={3}
              value={excerpt}
              onChange={(e) => setExcerpt(e.target.value)}
              placeholder="Write a brief summary for SEO and preview cards (max 200 chars)..."
              className="w-full p-4 bg-[#F6FAFF] rounded-xl border border-[#4DA3FF]/10 text-sm focus:border-[#4DA3FF] outline-none transition-all resize-none text-[#1E2A3A]"
              maxLength={200}
            />
            <p className="text-[10px] text-[#6B7A90] mt-2 flex items-center gap-1">
              <CheckmarkCircle01Icon size={12} className="text-[#00C07D]" />
              Recommended 150-160 characters for best SEO
            </p>
          </div>

          {/* Featured Image */}
          <div className="bg-white rounded-[20px] p-8 shadow-sm border border-[#4DA3FF]/5">
            <label className="text-xs font-bold text-[#6B7A90] uppercase tracking-wider mb-6 block">
              Featured Image
            </label>

            {featuredImage ? (
              <div className="relative group rounded-2xl overflow-hidden border border-[#4DA3FF]/10 bg-[#F6FAFF] max-h-[300px] aspect-[21/9]">
                <img
                  src={featuredImage}
                  alt="Featured"
                  className="w-full h-full object-cover"
                />
                <div className="absolute inset-0 bg-black/50 opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center gap-4">
                  <button
                    onClick={() =>
                      document.getElementById("image-upload")?.click()
                    }
                    className="px-5 py-2 bg-white/20 backdrop-blur-md rounded-xl text-white font-bold text-xs hover:bg-white/30 transition-colors"
                  >
                    Replace
                  </button>
                  <button
                    onClick={() => setFeaturedImage(null)}
                    className="p-2 bg-rose-500/80 backdrop-blur-md rounded-xl text-white hover:bg-rose-600 transition-colors"
                  >
                    <Delete02Icon size={18} />
                  </button>
                </div>
              </div>
            ) : (
              <div
                onClick={() => document.getElementById("image-upload")?.click()}
                className="border-2 border-dashed border-[#4DA3FF]/20 rounded-2xl p-10 flex flex-col items-center justify-center gap-4 cursor-pointer hover:bg-[#F6FAFF] hover:border-[#4DA3FF]/40 transition-all group"
              >
                <div className="w-16 h-16 rounded-full bg-[#EAF4FF] flex items-center justify-center text-[#4DA3FF] group-hover:scale-110 transition-transform">
                  <ImageAdd02Icon size={32} />
                </div>
                <div className="text-center">
                  <p className="text-sm font-bold text-[#1E2A3A]">
                    Click to upload or drag and drop
                  </p>
                  <p className="text-xs text-[#6B7A90] mt-1">
                    SVG, PNG, JPG or GIF (max. 10MB)
                  </p>
                </div>
              </div>
            )}
            <input
              type="file"
              id="image-upload"
              className="hidden"
              accept="image/*"
              onChange={handleImageUpload}
            />
          </div>

          {/* Rich Content Editor */}
          <div className="bg-white rounded-[20px] shadow-sm border border-[#4DA3FF]/5 min-h-[500px] flex flex-col overflow-hidden">
            <div
              ref={editorRef}
              className="flex-1 text-[#1E2A3A] text-lg leading-relaxed"
            />

            <div className="px-6 py-3 border-t border-[#4DA3FF]/10 flex justify-end items-center bg-[#F6FAFF]/30">
              <span className="text-[10px] font-bold text-[#6B7A90] uppercase tracking-widest opacity-40">
                {content.length} Characters
              </span>
            </div>
          </div>
        </div>

        {/* RIGHT SIDEBAR */}
        <div className="w-full xl:w-[400px] space-y-6 flex-shrink-0">
          {/* Publish Panel */}
          <div className="bg-white rounded-[20px] p-6 shadow-sm border border-[#4DA3FF]/5">
            <h3 className="text-sm font-black text-[#1E2A3A] uppercase tracking-wider mb-6 pb-4 border-b border-[#4DA3FF]/10">
              Publishing
            </h3>

            <div className="space-y-6">
              <div>
                <label className="text-xs font-bold text-[#6B7A90] uppercase tracking-wider mb-2 block">
                  Status
                </label>
                <AdminDropdown
                  value={status}
                  onChange={setStatus}
                  options={[
                    {
                      label: "Draft",
                      value: "Draft",
                      border: "border-l-slate-400",
                      icon: (
                        <ViewOffIcon size={16} className="text-slate-500" />
                      ),
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
                      label: "Scheduled",
                      value: "Scheduled",
                      border: "border-l-blue-400",
                      icon: (
                        <Calendar01Icon size={16} className="text-blue-500" />
                      ),
                    },
                  ]}
                />
              </div>

              <div>
                <label className="text-xs font-bold text-[#6B7A90] uppercase tracking-wider mb-2 block">
                  Publish Date
                </label>
                <div className="relative">
                  <input
                    type="datetime-local"
                    value={publishDate}
                    onChange={(e) => setPublishDate(e.target.value)}
                    className="w-full px-4 py-3 bg-[#F6FAFF] border border-[#4DA3FF]/10 rounded-xl text-sm font-bold text-[#1E2A3A] focus:border-[#4DA3FF] outline-none transition-all"
                  />
                </div>
              </div>

              <div
                className="flex items-center gap-3 p-4 bg-[#F6FAFF] rounded-xl border border-[#4DA3FF]/10 cursor-pointer"
                onClick={() => setIsFeatured(!isFeatured)}
              >
                <div
                  className={`w-5 h-5 rounded-md border-2 flex items-center justify-center transition-colors ${isFeatured ? "bg-[#4DA3FF] border-[#4DA3FF]" : "border-[#6B7A90]/30 bg-white"}`}
                >
                  {isFeatured && (
                    <CheckmarkCircle01Icon size={14} className="text-white" />
                  )}
                </div>
                <span className="text-sm font-bold text-[#1E2A3A]">
                  Mark as Featured
                </span>
              </div>
            </div>
          </div>

          {/* Category & Tags */}
          <div className="bg-white rounded-[20px] p-6 shadow-sm border border-[#4DA3FF]/5">
            <h3 className="text-sm font-black text-[#1E2A3A] uppercase tracking-wider mb-6 pb-4 border-b border-[#4DA3FF]/10">
              Organization
            </h3>

            <div className="space-y-6">
              <div>
                <label className="text-xs font-bold text-[#6B7A90] uppercase tracking-wider mb-2 block">
                  Category
                </label>
                <AdminDropdown
                  value={category}
                  onChange={setCategory}
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
                      label: "Business",
                      value: "Business",
                      border: "border-l-emerald-400",
                      icon: (
                        <Briefcase01Icon
                          size={16}
                          className="text-emerald-500"
                        />
                      ),
                    },
                    {
                      label: "Artificial Intelligence",
                      value: "Artificial Intelligence",
                      border: "border-l-amber-400",
                      icon: (
                        <AiBrain01Icon size={16} className="text-amber-500" />
                      ),
                    },
                    {
                      label: "Development",
                      value: "Development",
                      border: "border-l-indigo-400",
                      icon: <CodeIcon size={16} className="text-indigo-500" />,
                    },
                  ]}
                />
              </div>

              <div>
                <label className="text-xs font-bold text-[#6B7A90] uppercase tracking-wider mb-2 block">
                  Tags
                </label>
                <div className="flex gap-2 mb-3">
                  <input
                    type="text"
                    placeholder="Add tag..."
                    value={tagInput}
                    onChange={(e) => setTagInput(e.target.value)}
                    onKeyDown={(e) => e.key === "Enter" && handleAddTag()}
                    className="flex-1 px-4 py-2 bg-[#F6FAFF] border border-[#4DA3FF]/10 rounded-xl text-sm outline-none focus:border-[#4DA3FF] transition-all"
                  />
                  <button
                    onClick={handleAddTag}
                    className="p-2 bg-[#EAF4FF] text-[#4DA3FF] rounded-xl font-bold hover:bg-[#4DA3FF] hover:text-white transition-colors"
                  >
                    <Tag01Icon size={18} />
                  </button>
                </div>
                <div className="flex flex-wrap gap-2">
                  {tags.map((tag, i) => (
                    <span
                      key={i}
                      className="inline-flex items-center gap-1.5 px-3 py-1 bg-[#F6FAFF] border border-[#4DA3FF]/10 rounded-lg text-xs font-bold text-[#6B7A90]"
                    >
                      {tag}
                      <button
                        onClick={() => handleRemoveTag(tag)}
                        className="hover:text-rose-500"
                      >
                        <Delete02Icon size={12} />
                      </button>
                    </span>
                  ))}
                  {tags.length === 0 && (
                    <span className="text-xs text-[#6B7A90]/50 italic p-1">
                      No tags added yet.
                    </span>
                  )}
                </div>
              </div>
            </div>
          </div>

          {/* SEO Settings */}
          <div className="bg-white rounded-[20px] p-6 shadow-sm border border-[#4DA3FF]/5">
            <h3 className="text-sm font-black text-[#1E2A3A] uppercase tracking-wider mb-6 pb-4 border-b border-[#4DA3FF]/10">
              SEO Settings
            </h3>

            <div className="space-y-4">
              <div>
                <div className="flex justify-between mb-2">
                  <label className="text-xs font-bold text-[#6B7A90] uppercase tracking-wider">
                    SEO Title
                  </label>
                  <span className="text-[10px] font-bold text-[#6B7A90]/50">
                    {seoTitle.length}/60
                  </span>
                </div>
                <input
                  type="text"
                  placeholder="Meta Title"
                  maxLength={60}
                  value={seoTitle}
                  onChange={(e) => {
                    setSeoTitle(e.target.value);
                    setIsSeoTitleEdited(true);
                  }}
                  className="w-full px-4 py-3 bg-[#F6FAFF] border border-[#4DA3FF]/10 rounded-xl text-sm focus:border-[#4DA3FF] outline-none transition-all"
                />
              </div>
              <div>
                <div className="flex justify-between mb-2">
                  <label className="text-xs font-bold text-[#6B7A90] uppercase tracking-wider">
                    Description
                  </label>
                  <span className="text-[10px] font-bold text-[#6B7A90]/50">
                    {seoDescription.length}/160
                  </span>
                </div>
                <textarea
                  rows={3}
                  placeholder="Meta Description"
                  maxLength={160}
                  value={seoDescription}
                  onChange={(e) => {
                    setSeoDescription(e.target.value);
                    setIsSeoDescEdited(true);
                  }}
                  className="w-full px-4 py-3 bg-[#F6FAFF] border border-[#4DA3FF]/10 rounded-xl text-sm focus:border-[#4DA3FF] outline-none transition-all resize-none"
                />
              </div>
              <div>
                <label className="text-xs font-bold text-[#6B7A90] uppercase tracking-wider mb-2 block">
                  Slug
                </label>
                <div className="flex items-center bg-[#F6FAFF] border border-[#4DA3FF]/10 rounded-xl px-4 py-3 text-sm text-[#6B7A90]">
                  <span className="opacity-50">/blog/</span>
                  <input
                    type="text"
                    value={slug}
                    onChange={(e) => {
                      setSlug(e.target.value);
                      setIsSlugEdited(true);
                    }}
                    className="bg-transparent border-none outline-none text-[#1E2A3A] font-bold w-full ml-1"
                  />
                </div>
                <p className="text-[10px] text-[#6B7A90] mt-1.5 ml-1">
                  Auto-generated from title
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
