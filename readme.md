# Graduation Projects Grading System

A comprehensive web-based platform for managing and evaluating academic graduation projects, featuring role-based functionality for students, supervisors, and administrators.

## Core Features

- **Project Idea Management**: Faculty submission and admin review system
- **Team Management**: Student-led team formation with faculty approval
- **Task Assignment**: Supervisor-controlled task management
- **Grading System**: Customizable criteria and committee-based evaluation
- **Announcements**: Global communication system
- **Account Management**: Administrative control over faculty accounts

# Frontend

## Prerequisites

- Node.js (v16.x or higher)
- npm (v8.x or higher)
- Angular CLI (v19.x)
- Modern web browser (Chrome, Firefox, Safari, or Edge)

## Installation

### Windows Setup

1. Clone the repository:

```bash
git clone https://github.com/your-username/graduation-projects-system.git
cd graduation-projects-system
```

2. Install dependencies:

```bash
npm install
```

3. Start the development server:

```bash
ng serve
```

### macOS Setup

1. Clone the repository:

```bash
git clone https://github.com/your-username/graduation-projects-system.git
cd graduation-projects-system
```

2. Install dependencies:

```bash
npm install
```

3. Start the development server:

```bash
ng serve
```

## Troubleshooting

### Common Issues

1. **Port 4200 already in use**

   ```bash
   ng serve --port 4201
   ```

2. **Node modules issues**

   ```bash
   rm -rf node_modules
   npm clean-cache
   npm install
   ```

## Development Server

Run `ng serve` for a dev server. Navigate to `http://localhost:4200/`. The application will automatically reload if you change any of the source files.

## Building for Production

```bash
ng build --configuration production
```

The build artifacts will be stored in the `dist/` directory.

You can try the production build locally using the a https server or it will not work

You can try our live version here:  
<https://graduation-project-angular.vercel.app/>

# Backend

