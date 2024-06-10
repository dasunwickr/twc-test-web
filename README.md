TWC Contacts Portal App
Welcome to the TWC Contacts Portal App! This project is a full-stack application built as part of the TWC internship assignment. It features a login system, contact management functionalities, and adheres strictly to the design provided in Figma.

Table of Contents
Project Overview
Tech Stack
Getting Started
Folder Structure
Documentation
Contributing
License
Project Overview
The TWC Contacts Portal App is designed to:

Authenticate users via a login page.
Allow users to add, view, edit, and delete contacts.
Display a list of contacts in a table format.
Follow a responsive design focusing on desktop screens.
Design Reference: Figma Design

Tech Stack
Frontend
React: JavaScript library for building user interfaces.
Next.js or Vite: Frameworks for React applications. Next.js provides server-side rendering, while Vite offers a fast development environment.
TypeScript: Typed superset of JavaScript that compiles to plain JavaScript.
Tailwind CSS: Utility-first CSS framework for rapid UI development.
Backend
Node.js: JavaScript runtime built on Chrome's V8 engine.
Express.js: Fast, unopinionated, minimalist web framework for Node.js.
MongoDB: NoSQL database for storing user and contact information.
Getting Started
To get a local copy of the project up and running, follow these steps:

Prerequisites
Node.js (v14 or higher)
npm (v6 or higher)
MongoDB (locally or cloud-based like MongoDB Atlas)
Installation
Clone the repository:

bash
Copy code
git clone https://github.com/your-username/twc-test-web.git
cd twc-test-web
Install dependencies:

bash
Copy code
npm install
Start the development server:
For Vite:

bash
Copy code
npm run dev
For Next.js:

bash
Copy code
npm run dev
Start the backend server:
Assuming the backend is in a separate repository or folder:

bash
Copy code
cd ../twc-test-api
npm install
npm start
Open your browser:
Navigate to http://localhost:3000 to view the app.

Note
Ensure MongoDB is running and accessible by the application.

Folder Structure
Here's an overview of the project's folder structure for the front end:

lua
Copy code
twc-test-web/
├── public/                  
├── src/
│   ├── api/                 
│   ├── components/          
│   ├── context/             
│   ├── hooks/               
│   ├── layouts/             
│   ├── pages/               
│   ├── styles/              
│   ├── types/               
│   ├── utils/               
│   ├── App.tsx              
│   ├── index.tsx            
│   └── Router.tsx           
├── tailwind.config.js       
├── postcss.config.js        
├── tsconfig.json            
├── package.json             
├── vite.config.ts           
└── next.config.js           
Documentation
Here are some links to documentation for the main technologies used in this project:

React: React Documentation
Next.js: Next.js Documentation
Vite: Vite Documentation
TypeScript: TypeScript Documentation
Tailwind CSS: Tailwind CSS Documentation
Node.js: Node.js Documentation
Express.js: Express.js Documentation
MongoDB: MongoDB Documentation
Contributing
Contributions are welcome! Please open an issue or submit a pull request if you have any ideas or improvements.

License
This project is licensed under the MIT License - see the LICENSE file for details.
