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

Setup Instructions
Follow these steps to compile and run the backend from source.
Step 1: Clone the Repository
Open a terminal (PowerShell on Windows, Terminal on macOS).
Clone the repository:
git clone
Navigate to the project directory:
cd Graduation-Projects-Grading-System
Step 2: Verify .NET 8 SDK Installation
Check the .NET SDK version:
dotnet --version
Expected output: 8.0.xxx (e.g., 8.0.100).
If not installed, download and install from:
<https://dotnet.microsoft.com/download/dotnet/8.0>
Confirm installation:
dotnet --info
Step 3: Configure the Database
The backend uses Entity Framework Core with SQL Server (Windows) or SQLite (macOS).
Windows (SQL Server)
Install SQL Server Express if not already installed:
Download: <https://www.microsoft.com/sql-server/sql-server-downloads>
Select "Basic" setup and follow the installer.
Verify SQL Server is running:
Open SQL Server Management Studio (SSMS) or run:
net start MSSQL$SQLEXPRESS
Note the connection string (e.g., Server=localhost\SQLEXPRESS; Database=GradingManagementSystemDB; Trusted_Connection=True).
macOS (SQLite)
No installation is needed; SQLite is bundled with EF Core.
A database file (e.g., GradingManagementSystem.db) will be created during migration.
Step 4: Configure Application Settings
Navigate to the API project:
cd src/GradingManagementSystem.APIs
Open appsettings.json in a text editor (e.g., VS Code).
Update the connection string and JWT settings:
Windows (SQL Server):
{
  "ConnectionStrings": {
    "DefaultConnection": "Server=localhost\\SQLEXPRESS;Database=GradingSystem;Trusted_Connection=True;TrustServerCertificate=True;"
  },
  "Jwt": {
    "Key": "SuperSecretKey1234567890",
    "Issuer": "GradingSystem",
    "Audience": "GradingSystemAPI"
  },
  "Logging": {
    "LogLevel": {
      "Default": "Information",
      "Microsoft.AspNetCore": "Warning"
    }
  }
}
macOS (SQLite):
{
  "ConnectionStrings": {
    "DefaultConnection": "Data Source=GradingSystem.db"
  },
  "Jwt": {
    "Key": "SuperSecretKey1234567890",
    "Issuer": "GradingSystem",
    "Audience": "GradingSystemAPI"
  },
  "Logging": {
    "LogLevel": {
      "Default": "Information",
      "Microsoft.AspNetCore": "Warning"
    }
  }
}
Secure JWT Settings:
Replace SuperSecretKey1234567890 with a secure key (at least 32 characters).
For development, store sensitive data in user secrets:
dotnet user-secrets init
dotnet user-secrets set "Jwt: Key" "YourSecureKeyHere"
dotnet user-secrets set "Jwt : Issuer" "GradingSystem"
dotnet user-secrets set "Jwt : Audience" "GradingSystemAPI"
Step 5: Restore Dependencies
Ensure you’re in the src/GradingManagementSystem.APIs directory.
Restore NuGet packages:
dotnet restore
Verify no errors in the output.
Step 6: Apply Database Migrations
Install EF Core CLI if not already installed:
dotnet tool install --global dotnet-ef
Apply migrations to create the database:
dotnet ef database update
Windows: Creates the GradingSystem database in SQL Server.
macOS: Creates GradingSystem.db in the project directory.
Verify the database:
Windows: Use SSMS to connect to localhost\SQLEXPRESS and check GradingSystem.
macOS: Confirm GradingSystem.db exists (e.g., ls GradingSystem.db).
Step 7: Build the Project
Navigate to the solution directory:
cd src
Build the solution:
dotnet build GradingManagementSystem.sln
Check for errors. Build outputs are stored in /exe (e.g., bin/Debug/net8.0).
Step 8: Run the Application
Navigate to the API project:
cd GradingManagementSystem.APIs
Run the application:
dotnet run
The API starts on https://localhost:5001 (or as configured in launchSettings.json).
Access the Swagger UI:
Open a browser and navigate to https://localhost:5001/swagger.
Step 9: Test the API
Obtain a JWT Token:
If an authentication endpoint exists (e.g., /api/Auth/Login), use it to generate a token:
curl -X POST https://localhost:5001/api/Auth/Login -H "Content-Type: application/json" -d '{"username":"admin","password":"password"}'
Alternatively, seed an admin user via the database and authenticate.
Test an Endpoint (e.g., /api/UserProfile/GetProfile):
Use Swagger or a tool like Postman.
Set headers:
Authorization: Bearer <your-jwt-token>
X-User-Timezone: America/New_York
Example curl:
curl -X GET https://localhost:5001/api/UserProfile/GetProfile -H "Authorization: Bearer <token>" -H "X-User-Timezone: America/New_York"
Verify the response (e.g., profile data for Admin, Doctor, or Student).
Troubleshooting Tips
Issue: dotnet command not found.
Solution: Install .NET 8 SDK from https://dotnet.microsoft.com/download/dotnet/8.0 and ensure it’s in your PATH.
Issue: Database connection failure.
Windows: Confirm SQL Server is running:
net start MSSQL$SQLEXPRESS
Verify the connection string in appsettings.json.
macOS: Ensure the SQLite file (GradingSystem.db) is writable (chmod +w GradingSystem.db).
Issue: dotnet ef database update fails.
Solution: Confirm EF Core CLI is installed and migrations exist in /src/GradingManagementSystem.APIs/Migrations. Recreate migrations if needed:
dotnet ef migrations add InitialCreate
Issue: Port conflict (e.g., 5001 in use).
Solution: Edit src/GradingManagementSystem.APIs/Properties/launchSettings.json to use a different port, or free the port:

# Windows

netstat -a -n -o | find "5001"
taskkill /PID <pid> /F

# macOS

lsof -i:5001
kill -9 <pid>
Issue: JWT authentication fails.
Solution: Verify Jwt: Key, Issuer, and Audience in appsettings.json or user secrets. Ensure the token includes UserId and Role claims.
Issue: HTTPS certificate errors.
Solution: Trust the .NET development certificate:
dotnet dev-certs https --trust
Additional Configuration
HTTPS: The API uses HTTPS by default. Ensure the development certificate is trusted (see troubleshooting).
Database Seeding: If seeding is required, check for scripts in /src/GradingManagementSystem.APIs/Data/Seeds or seed users via the database.
Environment Variables: For sensitive settings, use appsettings.Development.json or user secrets to override appsettings.json.
Logging: Adjust log levels in appsettings.json for debugging:
"Logging": {
"LogLevel": {
"Default": "Debug",
"Microsoft.AspNetCore": "Information"
}
}
Integration into the Repository
To add this guide to the repository:
Create the Documentation File:
Navigate to the docs folder:
cd docs
Create backend-setup-guide.md:
echo "<content above>" > backend-setup-guide.md
Replace <content above> with the Markdown content (excluding <xaiArtifact> tags).
Update GitBook Structure:
Open SUMMARY.md in the repository root:
nano SUMMARY.md
Add a reference:

- [Backend Setup Guide](docs/backend-setup-guide.md)
  Update README.md:
  Open README.md:
  nano README.md
  Add a link under Documentation:

### Documentation

- [API Documentation by Controller](docs/api-by-controller.md)
- [Team Assignments](docs/team-assignments.md)
- [Backend Setup Guide](docs/backend-setup-guide.md): Instructions for setting up the backend.
  Commit and Push:
  Stage and commit changes:
  git add docs/backend-setup-guide.md SUMMARY.md README.md
  git commit -m "Add Backend Project Setup Guide"
  git push origin main
