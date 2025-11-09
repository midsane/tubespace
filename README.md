# 🎬 TubeSpace

**TubeSpace** is an **automated YouTube collaboration and publishing platform** that connects creators and editors in a seamless, end-to-end workflow from raw footage upload to public video without ever touching YouTube Studio.

It automates the entire process using the **YouTube Data API**, **Cloudinary**, and **WebSocket-driven streaming**, enabling a clean, fast, and bandwidth-efficient experience for both creators and editors.

---

## 🚀 Features

* **Creator–Editor Workflow:**
  Creators upload raw footage and assign editors who edit and re-upload final versions.

* **Automated YouTube Publishing:**
  Once approved, the backend automatically:

  * Uploads the video (private)
  * Uploads the thumbnail
  * Sets title, tags, and metadata
  * Publishes the video publicly

* **Real-Time Notifications:**

  * Push + Email notifications when videos are ready for review.
  * Instant preview link to watch the video.

* **Smart Streaming:**

  * Video streamed in chunks via **Cloudinary → Creator**, not through the client.
  * Real-time progress updates using **secure WebSockets**.
  * **No client upload/download overhead** — fully server-managed.

* **Seamless Approval Flow:**
  Creators just **review → approve → done**.
  No manual uploads, no waiting, no YouTube Studio required.

---

## 🧠 Tech Stack

| Layer             | Technologies                                |
| ----------------- | ------------------------------------------- |
| **Frontend**      | React.js, Recoil, WebSocket Client          |
| **Backend**       | Node.js, Express                            |
| **Automation**    | YouTube Data API, Cloudinary SDK            |
| **Communication** | Secure WebSockets                           |
| **Notifications** | Email + Push via Backend Events             |
| **Storage**       | Cloudinary for video & thumbnail management |
| **Deployment**    | Digital Ocean / Vercel (based on configuration)    |

---

## ⚙️ System Workflow

1. **Creator** creates a task and uploads raw footage with instructions.
2. **Editor** picks up the task, edits the video, and uploads it to TubeSpace.
3. **Backend** processes the upload:

   * Streams video to Cloudinary
   * Updates progress in real-time through WebSockets
   * Uploads thumbnail + metadata to YouTube via API
4. **Creator** gets notifications + preview link.
5. On approval → TubeSpace makes the video public on YouTube.

---

## 🧩 Setup and Installation

1. **Clone the Repository:**

   ```bash
   git clone https://github.com/your-username/tubespace.git
   cd tubespace
   ```

2. **Install Dependencies:**

   ```bash
   npm install
   ```

3. **Set Environment Variables:**
   Create a `.env` file and configure:

   ```
   YT_API_KEY=<your-youtube-data-api-key>
   CLOUDINARY_URL=<your-cloudinary-url>
   SOCKET_SECRET=<your-secure-socket-key>
   EMAIL_SERVICE_KEY=<for-notifications>
   ```

4. **Run the Development Server:**

   ```bash
   npm run dev
   ```

5. **Access the App:**
   Open `http://localhost:3000` in your browser.

---

## 🧪 Current Status

🧩 **Working Upload Pipeline:**

* Worker uploads the final video
* Progress relayed to client via secure WebSocket
* Uploads thumbnail, sets metadata, and makes video public
* Returns live YouTube video URL

⚠️ Still in **early phase**, focused on bug fixes and stability improvements.

---

## 🌐 Vision

TubeSpace aims to become the **go-to backend workflow** for YouTubers and editors — automating every step from file handoff to public publishing, allowing creators to focus purely on content, not the upload process.

---

## 💡 Future Enhancements

* Role-based dashboards (Creator / Editor)
* AI-driven task recommendations (based on creator style)
* Version history & automatic backups
* Advanced analytics (views, engagement, upload insights)
* Integration with alternative video platforms

---
