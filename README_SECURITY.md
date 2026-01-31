# 🔒 GitHub Pages - Security Setup Required

To make the AI chatbot work securely on GitHub Pages, you MUST add your API Key to your GitHub Repository Secrets.

### **Steps:**

1.  **Open your Repository on GitHub:** `https://github.com/abrar225/Abrar-Akhunji`
2.  **Go to Settings:** Click the **"Settings"** tab at the top.
3.  **Secrets and Variables:** In the left sidebar, click **"Secrets and variables"** -> **"Actions"**.
4.  **New Repository Secret:** Click the green button **"New repository secret"**.
5.  **Name:** `VITE_OPENROUTER_API_KEY`
6.  **Secret:** Paste your API key here (`sk-or-v1-...`)
7.  **Add Secret:** Click **"Add secret"**.

### **What happens next?**
Once you add the secret, the **GitHub Action** I created will automatically:
1.  Build your project.
2.  Inject the secret securely.
3.  Deploy it to your live site.

**Note:** If you push any more changes, the site will update automatically!
