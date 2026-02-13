# Attendance App

A modern React-based web application for managing daily attendance with a clean and intuitive user interface.

## Features

- **User Authentication**: Secure login with email and password.
- **Enhanced Input Fields**:
    - **Password Visibility Toggle**: Easily switch between showing and hiding your password.
    - **Clear Buttons**: Quickly clear input fields with a single click.
- **Dashboard**:
    - View daily attendance status.
    - Check weekly attendance statistics.
    - Review recent attendance history.
- **Accessibility**:
    - **Font Size Toggle**: Adjust the text size for better readability.
- **Navigation**:
    - **Bottom Navigation Bar**: Easy access to Home, Search, Likes, Notifications, and Profile sections.
- **Responsive Design**: Optimized for mobile and desktop views.

## Tech Stack

- **Frontend Framework**: [React](https://react.dev/)
- **Build Tool**: [Vite](https://vitejs.dev/)
- **Styling**: [Sass (SCSS)](https://sass-lang.com/)
- **Icons**: [Lucide React](https://lucide.dev/)

## Getting Started

Follow these steps to set up and run the project locally.

### Prerequisites

- Node.js (v14 or higher)
- npm or yarn

### Installation

1.  Clone the repository:
    ```bash
    git clone https://github.com/your-username/attendance-app.git
    cd attendance-app
    ```

2.  Install dependencies:
    ```bash
    npm install
    ```

### Running the Application

Start the development server:

```bash
npm run dev
```

Open your browser and navigate to `http://localhost:5173` (or the port shown in your terminal).

## Project Structure

```
src/
├── assets/         # Images and static assets
├── components/     # Reusable components (e.g., BottomNav)
├── pages/          # Application pages (Login, Main)
├── scss/           # Global and component-specific styles
├── App.jsx         # Main application component
└── main.jsx        # Entry point
```

## Recent Updates

- **Login Page**: Added clear buttons ('x') to email and password fields for better usability.
- **Refactoring**: Extracted the bottom navigation bar into a reusable `BottomNav` component for better code maintainability.
