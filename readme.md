# Graduation Projects Grading System

A web-based platform for managing and evaluating academic graduation projects with role-based functionality for students, supervisors, and administrators.

## Core Features

- **Project Idea Management**: Faculty submissions with admin review.
- **Team Management**: Student-led team formation with faculty approval.
- **Task Assignment**: Supervisor-controlled task management.
- **Grading System**: Customizable criteria and committee-based evaluation.
- **Announcements**: Global communication system.
- **Account Management**: Administrative control for faculty accounts.

---

## Frontend

### Prerequisites

- Node.js (v16.x or higher)
- npm (v8.x or higher)
- Angular CLI (v19.x)
- Modern web browser (Chrome, Firefox, Safari, or Edge)

### Installation (Windows & macOS)

1. **Clone the Repository:**
   ```bash
   git clone https://github.com/your-username/graduation-projects-system.git
   cd graduation-projects-system
   ```

2. **Install Dependencies:**
   ```bash
   npm install
   ```

3. **Start the Development Server:**
   ```bash
   ng serve
   ```

---

## Troubleshooting

### Common Issues

1. **Port 4200 Already in Use**

   ```bash
   ng serve --port 4201
   ```

2. **Node Modules Issues**

   ```bash
   rm -rf node_modules
   npm clean-cache
   npm install
   ```

Run `ng serve` for a dev server. Navigate to `http://localhost:4200/` to view the application.

### Production Build

```bash
ng build --configuration production
```
The build artifacts will be stored in the `dist/` directory.

You can serve the production build with an HTTPS server to ensure proper functionality.

A live version of the application is available at:
https://graduation-project-angular.vercel.app/

---

## Backend

### Setup Instructions

1. **Clone and Prepare**

   ```bash
   git clone <repository-url>
   cd Graduation-Projects-Grading-System
   ```

2. **Verify .NET 8 SDK Installation**

   ```bash
   dotnet --version
   dotnet --info
   ```

3. **Configure the Database**

   **Windows (SQL Server)**
   - Install SQL Server Express from:
     https://www.microsoft.com/sql-server/sql-server-downloads
   - Ensure SQL Server is running:
     ```bash
     net start MSSQL$SQLEXPRESS
     ```
   - Example connection string:
     ```
     Server=localhost\SQLEXPRESS;Database=GradingManagementSystemDB;Trusted_Connection=True;
     ```

   **macOS (SQLite)**
   - No installation needed. EF Core will create a .db file during migration.

4. **Configure Application Settings**

   Navigate to the API project:
   ```bash
   cd src/GradingManagementSystem.APIs
   ```
   Edit `appsettings.json` for Windows (SQL Server):
   ```json
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
   ```
   or for macOS (SQLite):
   ```json
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
   ```
   **Secure JWT Settings:**  
   Replace `SuperSecretKey1234567890` with a secure key (at least 32 characters) and consider using user secrets:
   ```bash
   dotnet user-secrets init
   dotnet user-secrets set "Jwt:Key" "YourSecureKeyHere"
   dotnet user-secrets set "Jwt:Issuer" "GradingSystem"
   dotnet user-secrets set "Jwt:Audience" "GradingSystemAPI"
   ```

5. **Restore and Update Database**

   ```bash
   dotnet restore
   dotnet tool install --global dotnet-ef
   dotnet ef database update
   ```

6. **Build and Run the Project**

   From the solution directory:
   ```bash
   cd ..
   dotnet build GradingManagementSystem.sln
   ```
   Then run the API:
   ```bash
   cd GradingManagementSystem.APIs
   dotnet run
   ```
   The API starts on https://localhost:5001. View Swagger UI at:
   https://localhost:5001/swagger

7. **Test the API**

   Obtain a JWT token:
   ```bash
   curl -X POST https://localhost:5001/api/Auth/Login \
        -H "Content-Type: application/json" \
        -d '{"username":"admin","password":"password"}'
   ```
   Test an endpoint:
   ```bash
   curl -X GET https://localhost:5001/api/UserProfile/GetProfile \
        -H "Authorization: Bearer <your-jwt-token>" \
        -H "X-User-Timezone: America/New_York"
   ```

### Additional Information

- **HTTPS:** Enabled by default. Trust the .NET development certificate:
  ```bash
  dotnet dev-certs https --trust
  ```
- **Database Seeding:** Check `/Data/Seeds` or seed via the database.
- **Environment Variables:** Use `appsettings.Development.json` or user secrets.
- **Logging:** Configured in `appsettings.json`.

---

This adjusted README provides the essential steps while keeping the backend section concise.