export const mockApi = {
  // Simulating async delay
  delay: (ms: number) => new Promise((resolve) => setTimeout(resolve, ms)),

  users: {
    getAll: async () => {
      await mockApi.delay(500);
      try {
        const stored = localStorage.getItem("admin_users_v2");
        return stored
          ? JSON.parse(stored)
          : [
              { id: 1, name: "Siddharth Verma", email: "sid@aashita.ai", role: "Admin", status: "Active", lastLogin: "10 mins ago", employeeCode: "AASHITA-1001" },
              { id: 2, name: "Ananya Sharma", email: "anu@aashita.ai", role: "Employee", status: "Inactive", lastLogin: "3 days ago", employeeCode: "AASHITA-1002" },
              { id: 3, name: "Rahul Kapoor", email: "rahul@aashita.ai", role: "Employee", status: "Active", lastLogin: "5 hours ago", employeeCode: "AASHITA-1003" },
              { id: 4, name: "Priya Singh", email: "priya@aashita.ai", role: "Employee", status: "Active", lastLogin: "Just now", employeeCode: "AASHITA-1004" },
              { id: 5, name: "Amit Patel", email: "amit@aashita.ai", role: "Admin", status: "Active", lastLogin: "2 days ago", employeeCode: "AASHITA-1005" },
            ];
      } catch (e) {
        return [];
      }
    },
    create: async (user: any) => {
      await mockApi.delay(800);
      const users = await mockApi.users.getAll();
      const newUser = { ...user, id: Date.now(), lastLogin: "Just Created", status: user.status || "Active" };
      localStorage.setItem("admin_users_v2", JSON.stringify([...users, newUser]));
      return newUser;
    },
    update: async (id: number, updates: any) => {
      await mockApi.delay(600);
      const users = await mockApi.users.getAll();
      const newUsers = users.map((u: any) => (u.id === id ? { ...u, ...updates } : u));
      localStorage.setItem("admin_users_v2", JSON.stringify(newUsers));
      return { id, ...updates };
    },
    delete: async (id: number) => {
      await mockApi.delay(600);
      const users = await mockApi.users.getAll();
      const newUsers = users.filter((u: any) => u.id !== id);
      localStorage.setItem("admin_users_v2", JSON.stringify(newUsers));
      return true;
    },
  },

  teams: {
    getAll: async () => {
      await mockApi.delay(500);
      const stored = localStorage.getItem("admin_teams");
      return stored
        ? JSON.parse(stored)
        : [
            { id: 1, name: "Prashant Sharma", role: "CEO & Founder", dept: "Leadership", email: "prashant@aashita.ai" },
            { id: 2, name: "Varun Gupta", role: "CTO", dept: "Engineering", email: "varun@aashita.ai" },
            { id: 3, name: "Megha Malhotra", role: "Head of Design", dept: "Design", email: "megha@aashita.ai" },
            { id: 4, name: "Deepak Rawat", role: "Senior Backend Dev", dept: "Engineering", email: "deepak@aashita.ai" },
          ];
    },
    create: async (member: any) => {
      await mockApi.delay(800);
      const members = await mockApi.teams.getAll();
      const newMember = { ...member, id: Date.now() };
      localStorage.setItem("admin_teams", JSON.stringify([...members, newMember]));
      return newMember;
    },
    update: async (id: number, updates: any) => {
      await mockApi.delay(600);
      const members = await mockApi.teams.getAll();
      const newMembers = members.map((m: any) => (m.id === id ? { ...m, ...updates } : m));
      localStorage.setItem("admin_teams", JSON.stringify(newMembers));
      return { id, ...updates };
    },
    delete: async (id: number) => {
      await mockApi.delay(600);
      const members = await mockApi.teams.getAll();
      const newMembers = members.filter((m: any) => m.id !== id);
      localStorage.setItem("admin_teams", JSON.stringify(newMembers));
      return true;
    },
  },

  careers: {
    getAll: async () => {
      await mockApi.delay(500);
      const stored = localStorage.getItem("admin_careers");
      return stored
        ? JSON.parse(stored)
        : [
            { id: 1, title: "Full Stack Developer", department: "Engineering", location: "Remote / Noida", type: "Full-time", applicants: 42, status: "Active" },
            { id: 2, title: "AI Research Scientist", department: "Research", location: "Noida", type: "Full-time", applicants: 15, status: "Critical" },
            { id: 3, title: "UI/UX Designer", department: "Design", location: "Remote", type: "Contract", applicants: 28, status: "Active" },
            { id: 4, title: "Business Analyst", department: "Operations", location: "Noida", type: "Full-time", applicants: 56, status: "Closed" },
          ];
    },
    create: async (job: any) => {
      await mockApi.delay(800);
      const jobs = await mockApi.careers.getAll();
      const newJob = { ...job, id: Date.now(), applicants: 0 };
      localStorage.setItem("admin_careers", JSON.stringify([...jobs, newJob]));
      return newJob;
    },
    update: async (id: number, updates: any) => {
      await mockApi.delay(600);
      const jobs = await mockApi.careers.getAll();
      const newJobs = jobs.map((j: any) => (j.id === id ? { ...j, ...updates } : j));
      localStorage.setItem("admin_careers", JSON.stringify(newJobs));
      return { id, ...updates };
    },
    delete: async (id: number) => {
      await mockApi.delay(600);
      const jobs = await mockApi.careers.getAll();
      const newJobs = jobs.filter((j: any) => j.id !== id);
      localStorage.setItem("admin_careers", JSON.stringify(newJobs));
      return true;
    },
  },

  blog: {
    getAll: async () => {
      await mockApi.delay(500);
      const stored = localStorage.getItem("admin_blog");
      return stored
        ? JSON.parse(stored)
        : [
            { id: 1, title: "The Future of AI in Modern Enterprise", author: "Prashant Sharma", date: "Feb 14, 2026", category: "AI Technology", status: "Published", views: "1.2k" },
            { id: 2, title: "Implementing Scalable Microservices with Next.js", author: "Varun Gupta", date: "Feb 10, 2026", category: "Development", status: "Draft", views: "0" },
            { id: 3, title: "Design Systems: Scaling Creativity for Teams", author: "Megha Malhotra", date: "Feb 05, 2026", category: "Design", status: "Published", views: "856" },
          ];
    },
    create: async (post: any) => {
      await mockApi.delay(800);
      const posts = await mockApi.blog.getAll();
      const newPost = { ...post, id: Date.now(), views: "0", date: new Date().toLocaleDateString("en-US", { month: "short", day: "numeric", year: "numeric" }) };
      localStorage.setItem("admin_blog", JSON.stringify([...posts, newPost]));
      return newPost;
    },
    update: async (id: number, updates: any) => {
      await mockApi.delay(600);
      const posts = await mockApi.blog.getAll();
      const newPosts = posts.map((p: any) => (p.id === id ? { ...p, ...updates } : p));
      localStorage.setItem("admin_blog", JSON.stringify(newPosts));
      return { id, ...updates };
    },
    delete: async (id: number) => {
      await mockApi.delay(600);
      const posts = await mockApi.blog.getAll();
      const newPosts = posts.filter((p: any) => p.id !== id);
      localStorage.setItem("admin_blog", JSON.stringify(newPosts));
      return true;
    },
  },
  
  attendance: {
    getAll: async () => {
      await mockApi.delay(500);
      // Fixed data for now, simulation of backend fetch
      return [
        { id: 1, name: "Siddharth Verma", status: "Present", clockIn: "09:05 AM", clockOut: "06:15 PM", duration: "9h 10m", type: "On-site" },
        { id: 2, name: "Ananya Sharma", status: "On Leave", clockIn: "-", clockOut: "-", duration: "-", type: "Remote" },
        { id: 3, name: "Rahul Kapoor", status: "Present", clockIn: "08:55 AM", clockOut: "Pending", duration: "-", type: "On-site" },
        { id: 4, name: "Priya Singh", status: "Late", clockIn: "10:30 AM", clockOut: "07:30 PM", duration: "9h 00m", type: "Remote" },
        { id: 5, name: "Amit Patel", status: "Present", clockIn: "09:15 AM", clockOut: "06:45 PM", duration: "9h 30m", type: "On-site" },
      ];
    },
    markEntry: async (entry: any) => {
      await mockApi.delay(800);
      return { ...entry, id: Date.now() };
    }
  }
};
