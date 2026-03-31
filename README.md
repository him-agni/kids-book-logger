# 📚 Kids Book Logger ✨

A full-stack, AI-powered web application designed to help children (ages 0-15) discover new books, log their reading journey, and generate magical custom stories using AI!

## 🌟 Key Features

- **Magical Book Search**: Connects to the massive Apple iTunes Books API to intelligently suggest popular children's books dynamically.
<img width="1211" height="880" alt="image" src="https://github.com/user-attachments/assets/ec452acc-3f86-47a3-941d-9b53fefb558e" />
- **AI Reading Buddy**: Powered by Google Gemini, the AI Buddy understands a child's customized age and preferences to recommend perfectly tailored reading material.
- **Custom Story Generator**: Kids can provide a single topic (e.g., "A brave dog on the moon") and the AI will dynamically generate a safe, engaging, and age-appropriate story!
<img width="851" height="878" alt="image" src="https://github.com/user-attachments/assets/d3be44e8-aab4-46af-977d-3fd14991384d" />

- **My Magic Library**: Securely save your favorite books to MongoDB, mark them as 'Reading' or 'Completed', and curate your own digital shelf.
- **Vibrant UI**: Built with a custom, kid-friendly Vanilla CSS framework utilizing modern design elements like smooth gradients and pop animations.

## 🛠️ Tech Stack

- **Frontend**: React.js, Vite, React Router DOM
- **Backend**: Node.js, Express.js
- **Database**: MongoDB (Mongoose)
- **Authentication**: Firebase Authentication
- **AI Integration**: Google Gemini API
- **Book Data**: OpenLibrary API

## 🚀 Getting Started

Follow these steps to run the application locally. The project is split into two folders: the `frontend` and the `backend`. You will need to start both.

### Prerequisites
- [Node.js](https://nodejs.org/en) installed on your machine
- A [MongoDB Atlas](https://www.mongodb.com/cloud/atlas) account and database
- A [Google Gemini API Key](https://aistudio.google.com/app/apikey)
- A [Firebase](https://firebase.google.com/) web project setup

### 1. Environment Configuration

Inside the `backend/` directory, create a `.env` file and outline your secrets

```env
PORT
MONGODB_URI
GEMINI_API_KEY
```

*Note: The Firebase configuration is placed directly inside `frontend/src/firebase.js`.*

### 2. Starting the Backend Server

Open a terminal at the root of the project and run the following commands:

```bash
cd backend
npm install
node index.js
```
*(You should see a message stating the server is running on port 5000 and successfully connected to MongoDB).*

### 3. Starting the Frontend UI

Open a **second, separate terminal window**, and run:

```bash
cd frontend
npm install
npm run dev
```

Your React application will spark up entirely at `http://localhost:5173/`. Open that link in your browser to see your work!

---

## 🌐 Deploying to Vercel

If you want to host this live on the internet so anyone can use it, you can easily deploy it using Vercel!

1. **Commit to GitHub:** Push this entire repository into a GitHub repository.
2. **Deploy the Backend:** Create a new project on Vercel, select your repository, set the **Root Directory** to `backend`. Be sure to add your `MONGODB_URI` and `GEMINI_API_KEY` to the Vercel Environment Variables section. (A `vercel.json` is already provided for you so Vercel treats Express as Serverless!).
3. **Connect Frontend to Live Backend:** Once the backend gives you a live URL, swap out `http://localhost:5000` in your frontend files.
4. **Deploy the Frontend:** Create a second project on Vercel, select the same repository, but set the **Root Directory** to `frontend`. 

Enjoy your custom reading journey! 📖✨
