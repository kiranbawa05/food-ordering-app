# 🍔 Food Ordering System (Full Stack Mini Project)

A full-stack web application built using **Node.js, Express, and MongoDB**. It allows users to order food online and admins to manage menu items dynamically.

---

## 📂 Project Structure

```
food-ordering-app/
├── models/
│   ├── User.js
│   ├── Menu.js
│   ├── Order.js
│   ├── Feedback.js
├── routes/
│   ├── authRoutes.js
│   ├── menuRoutes.js
│   ├── orderRoutes.js
│   ├── feedbackRoutes.js
├── public/
│   ├── login.html
│   ├── index.html
│   ├── admin.html
│   ├── feedback.html
│   ├── orders.html
│   ├── script.js
│   ├── admin.js
│   ├── feedback.js
│   ├── style.css
├── server.js
├── package.json
└── .gitignore
```

---

## 🚀 Setup Instructions

```bash
git clone https://github.com/kiranbawa05/food-ordering-app.git
cd food-ordering-app
npm install
node server.js
```

Open in browser: http://localhost:3000/login.html

MongoDB should be running locally:

```
mongodb://127.0.0.1:27017/foodApp
```

---

## 🔐 Default Login Credentials

**Admin:** username: `admin` | password: `1234`
**User:** username: `user` | password: `1234`

---

## 🚀 Features

**User:** Login, browse menu, search, cart, quantity control, order placement, order history, feedback with rating
**Admin:** Admin login, add/update/delete items, manage quantity & availability, image handling

---

## 🛠️ Tech Stack

HTML, CSS, JavaScript, Node.js, Express.js, MongoDB (Mongoose)

---

## 📌 Notes

* Do NOT upload node_modules
* Run npm install before starting
* Ensure MongoDB is running

---

## 🎯 Future Improvements

Image upload (Multer), payment integration, React frontend, order tracking, UI improvements

---

## 👨‍💻 Author

Full Stack Mini Project for academic submission.