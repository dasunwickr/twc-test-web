# TWC Contacts Portal Web Client

Welcome to the TWC Contacts Portal App! This project is a full-stack application built as part of the TWC internship assignment. It features a login system, contact management functionalities, and adheres strictly to the design provided in Figma.

## Table of Contents

1. [Project Overview](#project-overview)
2. [Tech Stack](#tech-stack)
3. [Getting Started](#getting-started)
4. [Folder Structure](#folder-structure)
5. [Documentation](#documentation)
6. [Contributing](#contributing)
7. [License](#license)

## Project Overview

The TWC Contacts Portal App is designed to:
- Authenticate users via a login page.
- Allow users to add, view, edit, and delete contacts.
- Display a list of contacts in a table format.
- Follow a responsive design focusing on desktop screens.

Design Reference: [Figma Design](https://www.figma.com/file/4f8t98A25BOn8VmAvymWyF/Contacts-Portal---Intern?type=design&node-id=0%3A1&mode=design&t=HnIJJSl4OTwfHqpn-1)

## Tech Stack

### Frontend
- **React**: JavaScript library for building user interfaces.
- **Next.js** or **Vite**: Frameworks for React applications. Next.js provides server-side rendering, while Vite offers a fast development environment.
- **TypeScript**: Typed superset of JavaScript that compiles to plain JavaScript.
- **Tailwind CSS**: Utility-first CSS framework for rapid UI development.

### Backend
- **Node.js**: JavaScript runtime built on Chrome's V8 engine.
- **Express.js**: Fast, unopinionated, minimalist web framework for Node.js.
- **MongoDB**: NoSQL database for storing user and contact information.

## Getting Started

To get a local copy of the project up and running, follow these steps:

### Prerequisites

- [Node.js](https://nodejs.org/) (v14 or higher)
- [npm](https://www.npmjs.com/) (v6 or higher)
- [MongoDB](https://www.mongodb.com/) (locally or cloud-based like MongoDB Atlas)

### Installation

1. **Clone the repository**:
    ```bash
    git clone https://github.com/your-username/twc-test-web.git
    cd twc-test-web
    ```

2. **Install dependencies**:
    ```bash
    npm install
    ```

3. **Start the development server**:
    For Vite:
    ```bash
    npm run dev
    ```
    For Next.js:
    ```bash
    npm run dev
    ```

4. **Start the backend server**:
    Assuming the backend is in a separate repository or folder:
    ```bash
    cd ../twc-test-api
    npm install
    npm start
    ```

5. **Open your browser**:
    Navigate to `http://localhost:3000` to view the app.

### Note
Ensure MongoDB is running and accessible by the application.

## Folder Structure

Here's an overview of the project's folder structure for the front end:

