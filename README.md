 # Unilever Clone E-commerce Project



## 🎯 Project Goal

Django (Backend) + React (Frontend) দিয়ে Unilever-এর মতো একটি প্রফেশনাল ই-কমার্স সাইট তৈরি করা।



## 🛠️ Tech Stack

- **Backend:** Django, Django REST Framework, JWT (SimpleJWT)

- **Frontend:** React (Vite), Tailwind CSS, Axios, React Router DOM

- **Database:** SQLite (development)

- **Auth:** JWT Token (Bearer)



## 📂 Project Structure

project/

├── backend/

│   ├── core/ (main project)

│   ├── products/ (products app)

│   ├── accounts/ (auth app)

│   └── manage.py

└── frontend/

    ├── src/

    │   ├── components/

    │   │   ├── Navbar.jsx

    │   │   ├── CartSidebar.jsx

    │   │   ├── ProductCard.jsx

    │   │   ├── HeroBanner.jsx

    │   │   ├── BrandSection.jsx

    │   │   └── Footer.jsx

    │   ├── pages/

    │   │   ├── Home.jsx

    │   │   ├── Login.jsx

    │   │   └── Signup.jsx

    │   ├── context/

    │   │   ├── AuthContext.jsx

    │   │   └── CartContext.jsx

    │   ├── App.jsx

    │   └── main.jsx



## 🔗 API Endpoints (Backend)

- GET  /api/products/list/          → Product list

- POST /api/accounts/register/      → User registration

- POST /api/login/                  → JWT login

- POST /api/token/refresh/          → Refresh token

- GET  /api/accounts/profile/       → Get user profile (auth required)



## ✅ Completed Features

1. ✅ Django Backend setup with DRF

2. ✅ CORS configuration

3. ✅ Product Model (Category, Brand, Product)

4. ✅ JWT Authentication (Register, Login, Logout)

5. ✅ React frontend with Vite

6. ✅ Tailwind CSS setup

7. ✅ React Router (Home, Login, Signup)

8. ✅ AuthContext (user state management)

9. ✅ CartContext (cart state management)

10. ✅ Navbar with dynamic login/logout

11. ✅ Product Cards

12. ✅ Search functionality

13. ✅ Cart Sidebar (frontend only)

14. ✅ Hero Banner

15. ✅ Brand Section

16. ✅ Footer



## 🔜 Next Tasks (TODO)

1. ⏳ Product Details Page (click product → details page)

2. ⏳ Cart Backend (save cart in database)

3. ⏳ Checkout & Order System

4. ⏳ Category Filter

5. ⏳ User Profile Page

6. ⏳ Order History

7. ⏳ Product Reviews

8. ⏳ Wishlist

9. ⏳ Payment Integration (SSLCommerz/bKash)

10. ⏳ Admin Dashboard improvements



## 🌐 GitHub Repository

https://github.com/anupam-cse/unilever-clone.git



## 💻 How to Run

### Backend:

cd backend

source env/bin/activate  (or .\env\Scripts\activate on Windows)

python manage.py runserver



### Frontend:

cd frontend

npm run dev



## 🎨 Design Notes

- Color theme: Blue-700 (primary), Yellow-300 (accent)

- Style: Modern, clean, professional

- Reference: Unilever.com



🚀 নতুন Chat এ কিভাবে কাজ শুরু করবেন:
নতুন চ্যাট খুলে আমাকে এভাবে মেসেজ দিবেন:

"আমি Django + React দিয়ে Unilever clone ই-কমার্স সাইট বানাচ্ছি। আমার project এর সম্পূর্ণ details নিচে দিচ্ছি। আমি এখন [যেটা করতে চান সেটা লিখুন] করতে চাই।

[উপরের PROJECT_NOTES কপি করে পেস্ট করুন]

GitHub link: https://github.com/anupam-cse/unilever-clone.git"


🎁 Bonus: ChatGPT/AI কে নতুন chat এ কী বলবেন
Template:

"I'm building a Unilever-clone e-commerce site using Django REST Framework (backend) and React + Vite + Tailwind (frontend). I have already completed:

JWT Authentication (login/signup/logout)
Product display with search
Cart sidebar (frontend only)
Tailwind UI with Navbar, Hero Banner, Brand Section, Footer
GitHub: https://github.com/anupam-cse/unilever-clone.git

Now I want to add: [Product Details Page / Cart Backend / Checkout / etc.]

Please continue from here."

