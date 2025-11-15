# MyLinkVault 🔐

A simple, modern web application to save, organize, and quickly access all your frequently used links and "watch later" items.

🌐 **Live Demo:** [https://mylinkvault.lovable.app/](https://mylinkvault.lovable.app/)

## 💡 The Problem

I found myself scattering links, bookmarks, and videos I wanted to watch later across different apps, text files, and browser tabs. It was disorganized, inefficient, and I could never find what I needed when I needed it.

## ✨ The Solution

**MyLinkVault** is my personal solution to this problem. It's a central website where I can:

* **Store Frequent Links:** Keep all my commonly used links (work tools, favorite sites, documentation) in one place.
* **Build a "Watch Later" Queue:** Save articles, videos, and other media to consume later without cluttering my bookmarks.
* **Access Anywhere:** Since it's a website, I can access my links from any device with a browser.

## 🚀 Key Features

* **Add New Links:** A simple form to add a new URL, a descriptive title, and notes.
* **Categorization:** Easily distinguish between "Frequent Links" and "Watch Later" items.
* **One-Click Access:** Open saved links directly from the dashboard.
* **Edit & Delete:** Easily manage your saved links.
* **Modern UI:** Beautiful, responsive interface with dark mode support.

## 💻 Tech Stack

This project was built using modern web technologies:

* **Frontend Framework:** React 18.3.1 with TypeScript 5.8.3
* **Build Tool:** Vite 5.4.19
* **UI Components:** shadcn/ui (built on Radix UI primitives)
* **Styling:** Tailwind CSS 3.4.17
* **State Management:** TanStack Query (React Query) 5.83.0
* **Routing:** React Router DOM 6.30.1
* **Form Validation:** React Hook Form with Zod schema validation
* **Icons:** Lucide React
* **Theme System:** next-themes (dark mode support)
* **Deployment Platform:** Lovable

## 🛠️ Setup & Installation

To set it up locally:

1.  **Clone the repository:**
    ```bash
    git clone https://github.com/[your-username]/mylinkvault.git
    cd mylinkvault
    ```

2.  **Install Dependencies:**
    ```bash
    npm install
    ```

3.  **Run the Development Server:**
    ```bash
    npm run dev
    ```

4.  Open your browser and navigate to `http://localhost:8080`

## 📦 Build for Production

To create a production build:

```bash
npm run build
```

The optimized files will be generated in the `dist` directory.

## 🔮 Future Ideas

While the main problem is solved, here are some features I might add in the future:

* [ ] Add browser extensions (Chrome/Firefox) to save links in one click.
* [ ] Auto-fetch website titles and favicons when a link is added.
* [ ] Add tagging support for better organization.
* [ ] Export/import functionality for backup and migration.
* [ ] Link sharing capabilities with generated share links.

## 📄 License

This is a personal project. Feel free to fork it, but it's provided as-is.

---

Built with ❤️ using React and TypeScript
