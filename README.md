# 📘 SmartLab Admin Dashboard  

SmartLab is a **lab automation and monitoring system** designed for administrators. It provides real-time insights into **energy consumption, user activity, appliance control, and CCTV monitoring** — all in one dashboard.  

---

## 🚀 Features  

### 🔑 Authentication  
- Admin-only login (secure, no public signup).  

### 📊 Dashboard Overview  
- Current energy consumption (real-time).  
- Active users (students logged in).  
- Running appliances (count + alerts).  
- Notifications for abnormal activity.  

### ⚡ Energy Monitoring  
- Table: Appliance | Current (A) | Voltage (V) | Power (W) | Status.  
- Graphs: Line (trend), Bar (totals), Pie (appliance-wise share).  
- Time filters: Day / Week / Month.  
- Export reports (CSV / PDF).  

### 👥 User Activity Tracking  
- Table: Student Name | Login | Logout | Duration | Status.  
- Charts: Login frequency, peak usage heatmap.  
- Alerts for unusually long sessions or late usage.  

### 🔌 Appliance Control  
- List of appliances with On/Off toggle.  
- Bulk controls (e.g., "Turn Off All").  
- Scheduling for automated ON/OFF.  
- Warnings for high-power devices.  

### 🎥 CCTV Monitoring  
- Live video feed from lab cameras.  
- Multi-camera support with grid view.  
- Snapshot and recording options.  

### 📑 Reports & Settings  
- Downloadable reports (energy, user, appliance usage).  
- Manage appliances and configure thresholds.  
- Admin settings for alerts and notifications.  

---

## 🎨 UI Theme  

| Element | Color |
|---------|--------|
| Background | `#0F172A` (dark navy) |
| Sidebar | `#1E293B` |
| Card Background | `#1E293B – #334155` |
| Primary Highlight | `#3B82F6` (blue-500) |
| Hover/Active | `#2563EB` (blue-600) |
| Chart Blue | `#60A5FA` |
| Running | `#22C55E` (green-500) |
| Failed | `#EF4444` (red-500) |
| Pending | `#F59E0B` (amber-500) |
| Text (primary) | `#FFFFFF` |
| Text (secondary) | `#94A3B8` |

---

## 🛠️ Tech Stack  

- **Frontend:** React + TailwindCSS  
- **UI Components:** shadcn/ui  
- **Charts:** Recharts  
- **Backend (suggested):** Node.js / Django / Flask (depending on preference)  
- **Database:** PostgreSQL / MySQL / MongoDB  
- **CCTV Integration:** RTSP / WebRTC (future upgrade)  

---

## ⚡ Installation & Setup  

```bash
# Clone repository
git clone https://github.com/your-username/smartlab-dashboard.git
cd smartlab-dashboard

# Install dependencies
npm install

# Start development server
npm run dev

# Build for production
npm run build
```
---

## 📂 Project Structure
```smartlab-dashboard/
│── public/           # Static assets
│── src/
│   ├── components/   # Reusable UI components
│   ├── pages/        # Dashboard, Login, Modules
│   ├── charts/       # Energy & user activity graphs
│   ├── utils/        # Helper functions
│   ├── styles/       # Tailwind configs
│   └── App.jsx       # Root app
│── package.json
│── README.md
```
---

## 🔮 Future Improvements  

- AI-based anomaly detection for power surges  
- Predictive analytics for energy optimization  
- Mobile app integration  
- Face recognition in CCTV feeds  
- Voice assistant support (Alexa / Google)  

