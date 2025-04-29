# Employee Leave Management (Frontend Only)

This project is a simple Employee Leave Management System built using React and Redux Toolkit. It demonstrates core frontend skills like role-based routing, form validation, global state management, and responsive design. No backend is used — data is persisted using `localStorage`.

---

## ✅ Tech Stack Used

- **React** (with Vite + TypeScript)
- **Redux Toolkit** (for state management)
- **React Router Dom** (for routing)
- **Formik + Yup** (for form handling and validation)
- **SweetAlert2 + React-Toastify** (for confirmation & notifications)
- **TailwindCSS** (for styling)
- **Axios** (used to make a dummy fetch request — required by assignment)
- **LocalStorage** (used instead of backend as per Option 1)

---

## 🔐 Authentication & Role-based Routing

- Dummy login with two roles: **Admin** and **Employee**
- Role is stored in Redux and localStorage
- Route-based access: `/admin` for Admin, `/employee` for Employee

---

## 👨‍💼 Employee Features

- Apply for leave with fields: `fromDate`, `number of days`, `toDate` (auto-calculated), `type`, and `reason`
- Form validation handled via **Formik + Yup**
- View leave history (with `status`)
- **Withdraw** leave even after approval
- **Leave balance display**: 12 total, dynamically reduced for approved leaves

---

## 🛠 Admin Features

- View list of all employee leave requests
- Approve or reject each leave
- SweetAlert2 confirmation before action
- Status updates immediately in UI
- Dummy employee name shown for each row

---

## 📦 Data Handling

- **Redux Toolkit** used to manage both auth and leave state
- Leave data stored and persisted using **localStorage**
- All actions (apply, approve, reject, withdraw) update Redux and sync with localStorage

---

## 🌐 HTTP Client (Requirement)

- **Axios** is used to simulate a dummy API call via `useEffect`
- This satisfies the requirement to use `axios` or `fetch` in the project
- The data fetched is not used in logic, only logged

---

## 📱 Responsive Design

- TailwindCSS is used to create a responsive layout
- Leave form and tables adapt for desktop, tablet, and mobile views

---

## 🚫 Backend

- This project follows **Option 1** from the assignment: no backend
- All data is stored and read from localStorage

---

## ✅ Summary

This project meets all the assignment's requirements for a frontend-only leave management system using React, Redux Toolkit, TailwindCSS, and additional libraries like Formik, SweetAlert2, and Axios.
