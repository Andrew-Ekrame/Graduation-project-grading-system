//api links exporting:

// Admin Account API Endpoints: (Completed)

// All Projects Page:

// Request URL: (Finished) (Tested)
export const apiGetFinalProjectIdeas =
  'https://grading-system-app.runasp.net/api/Projects/FinalProjectIdeas';
/*
        This endpoint take a GET request with the following Parameters(Inputs): User Token As Bearer Token.
        Response body:
        {
        "statusCode": 200,
        "message": "Final project ideas retrieved successfully.",
        "data": {
          "isSuccess": true,
          "finalProjectIdeas": [
            {
              "projectId": 3,
              "projectName": null,
              "projectDescription": null,
              "supervisorId": 1,
              "supervisorName": "Dr Ahmed",
              "teamId": null,
              "teamName": null,
              "postedBy": "Doctor",
              "teamMembers": null
            },
            {
              "projectId": 4,
              "projectName": "Ads Server",
              "projectDescription": "Keep All Ads and return them to user.\t",
              "supervisorId": 1,
              "supervisorName": "Dr Ahmed",
              "teamId": 17,
              "teamName": "ADFGH",
              "postedBy": "Team",
              "teamMembers": [
                {
                  "id": 4,
                  "fullName": "Ahmed Emad Hassan",
                  "email": "emad.ahmed53@yahoo.com",
                  "specialty": "CS",
                  "inTeam": true,
                  "profilePicture": "https://grading-system-app.runasp.net/Students/ProfilePictures/f433bd39-4872-4fb2-8172-1efbbc001aff_Screenshot 2025-04-18 130903.png"
                },
                {
                  "id": 6,
                  "fullName": "Hassan Ebrahim",
                  "email": "ae@gmg.com",
                  "specialty": "CS",
                  "inTeam": true,
                  "profilePicture": "https://grading-system-app.runasp.net/Students/ProfilePictures/e4625743-f71f-47ac-acae-860a13d1136d_Screenshot (1).png"
                }
              ]
            },
            {
              "projectId": 11,
              "projectName": "Car Factory",
              "projectDescription": "Keep All Data About Cars and Maintain Them.\t",
              "supervisorId": 2,
              "supervisorName": "Emad Hassan",
              "teamId": 3,
              "teamName": "MEAAA",
              "postedBy": "Doctor",
              "teamMembers": [
                {
                  "id": 2,
                  "fullName": "Ahmed Emad",
                  "email": "ae36574356@gmail.com",
                  "specialty": "CS",
                  "inTeam": true,
                  "profilePicture": "https://grading-system-app.runasp.net/Students/ProfilePictures/5d269d25-8135-4d09-be95-8930ed8a2a43_Screenshot 2025-03-30 215654.png"
                }
              ]
            }
          ]
        }
        }
        */

// Grading Page:

// Request URL: (Finished) (Tested)
export const apiAllTeamsForAdminEvaluation =
  'https://grading-system-app.runasp.net/api/Evaluations/AllTeamsForAdminEvaluation';
/*
          This endpoint take a GET request with the following Parameters(Inputs): (Admin Token As Bearer Token)
          Response body:
          {
  "statusCode": 200,
  "message": "Admin teams retrieved successfully.",
  "data": {
    "isSuccess": true,
    "teamsWithCriteriaBySpecialtyGroup": [
      {
        "specialty": "CS",
        "criterias": [
          {
            "id": 12,
            "name": "Deliverables",
            "description": "Adherence to deadlines: Evaluates the written documentation of the project. Quality of writing, structure, completeness, and technical accuracy.",
            "maxGrade": 10,
            "evaluator": "Admin",
            "givenTo": "Team",
            "specialty": "CS",
            "year": "2024-2025",
            "term": "Second-Term",
            "createdAt": "2025-05-09T00:47:22.2182823"
          }
        ],
        "teams": [
          {
            "teamId": 1,
            "teamName": "AAEM",
            "projectId": 1,
            "projectName": "Graduation Projects Grading System",
            "projectDescription": "<p>A system to manage the graduation projects</p>",
            "scheduleId": 1,
            "scheduleDate": "2025-06-16T00:00:00",
            "scheduleStatus": "Finished",
            "criterias": [],
            "teamMembers": [
              {
                "id": 2,
                "fullName": "Andrew Ekrame",
                "email": "elmasryandrew@gmail.com",
                "specialty": "CS",
                "inTeam": true,
                "profilePicture": "https://grading-system-app.runasp.net/Students/ProfilePictures/7f7fba12-6ab1-4601-b8f6-bfbeb991aa80_discord photo.jpg"
              }
            ]
          },
          {
            "teamId": 3,
            "teamName": "AAAA",
            "projectId": 2,
            "projectName": "edu platform",
            "projectDescription": "<p>a platform for a school</p>",
            "scheduleId": 2,
            "scheduleDate": "2025-06-16T00:00:00",
            "scheduleStatus": "Finished",
            "criterias": [],
            "teamMembers": [
              {
                "id": 1,
                "fullName": "Ahmed Emad",
                "email": "ae36574356@gmail.com",
                "specialty": "CS",
                "inTeam": true,
                "profilePicture": "https://grading-system-app.runasp.net/Students/ProfilePictures/299a59ff-fbd0-4a18-a2b2-f1bfa56fec99_Screenshot (1).png"
              }
            ]
          }
        ]
      }
    ]
  }
}
    */

// Request URL: (Finished) (Tested) ---------------------------------------------
export const apiSubmitGrades =
  'https://grading-system-app.runasp.net/api/Evaluations/SubmitGrades';
/*
          This endpoint take a POST request(App/Json) with the following Parameters(Inputs): (
          {
            "scheduleId": 1,
            "teamId": 1,
            "studentIds": [1, 2],
            "grades": [
              {"criteriaId": 1, "grade": 8},
              {"criteriaId": 2, "grade": 7}
            ]
          }) + (User(Admin or Doctor) Token As Bearer Token)

          {
            "statusCode": 200,
            "message": "Grades submitted successfully.",
            "data": {"IsSuccess": true}
          }
        */

// Request URL: (Finished) (Tested) ----------------------------------------------
export const apiTeamEvaluations =
  'https://grading-system-app.runasp.net/api/Evaluations/TeamEvaluations/';
/*
          This endpoint take a GET request(App/Json) with the following Parameters(Inputs): (teamId As Int, / , scheduleId As Int in url => TeamEvaluations/{teamId}/{scheduleId}) + (Doctor or Admin Token As Bearer Token).
{
  "statusCode": 200,
  "message": "Last evaluations retrieved successfully.",
  "data": {
    "IsSuccess": true,
    "evaluations": [
      {
        "evaluationId": 1,
        "criteriaId": 1,
        "criteriaName": "Technical Quality",
        "criteriaDescription" : "ffffffffff",
        "grade": 5.6,
        "evaluationDate" : "DateTime",
        "evaluatorRole": "Supervisor",
        "EvaluatorId" : 5,
        "teamId" : 5,
        "studentId" : 7
      }
    ]
  }
}
        */

// Admin Dashboard

// Send Instructions(Notification API Endpoints):

// Request URL: (Finished) (Tested)
export const apiSendNotification =
  'https://grading-system-app.runasp.net/api/Notifications/SendNotification';
/*
This endpoint take a POST request(App/Json) with the following Parameters(Inputs): (title As String, description As String, role As String(DropDown List => All, Students, Doctors)) + (Admin Token As Bearer Token)
Response body:
{
  "statusCode": 200,
  "message": "Notification sent successfully!",
  "data": {
    "isSuccess" : true
  }
}
*/

// Request URL: (Finished) (Tested)
export const apiGetAllNotifications =
  'https://grading-system-app.runasp.net/api/Notifications/All';
/*
This endpoint take a GET request with the following Parameters(Inputs): User(Admin, Student, Doctor) Token.
Response body:
{
  ""statusCode": 200,
  "message": "Notification sent successfully!",
  "data": {
    "isSuccess" : true,
    "notifications" :{
      "title": "Deadline Appointments",
      "description": "Hi Everyone!\n The last day to upload project file is 05/19/2025 9:00 PM.",
      "role": "All",
      "sentAt": "2025-03-16T21:43:38.5967217+02:00",
      "isRead": false,
      "adminId": 1
    }
  }
}
*/

// Request URL: (Finished) (Tested)
export const apiGetStudentNotifications =
  'https://grading-system-app.runasp.net/api/Notifications/StudentNotifications';
/* 
This endpoint take a GET request with the following Parameters(Inputs): Student Token As Bearer Token.
Response body:
{
  ""statusCode": 200,
  "message": "Notification sent successfully!",
  "data": {
    "isSuccess" : true,
    "studentNotifications" :{
      "title": "Deadline Appointments",
      "description": "Hi Everyone!\n The last day to upload project file is 05/19/2025 9:00 PM.",
      "role": "All",
      "sentAt": "2025-03-16T21:43:38.5967217+02:00",
      "isRead": false,
      "adminId": 1
    }
  }
}
*/

// Request URL: (Finished) (Tested)
export const apiGetDoctorNotifications =
  'https://grading-system-app.runasp.net/api/Notifications/DoctorNotifications';
/* 
This endpoint take a GET request with the following Parameters(Inputs): Doctor Token As Bearer Token.
Response body:
{
  ""statusCode": 200,
  "message": "Notification sent successfully!",
  "data": {
    "isSuccess" : true,
    "doctorNotifications" :{
      "title": "Deadline Appointments",
      "description": "Hi Everyone!\n The last day to upload project file is 05/19/2025 9:00 PM.",
      "role": "All",
      "sentAt": "2025-03-16T21:43:38.5967217+02:00",
      "isRead": false,
      "adminId": 1
    }
  }
}
*/

// Request URL: (Finished) (Tested)
export const apiReadNotification =
  'https://grading-system-app.runasp.net/api/Notifications/MarkAsRead/';
/*
This endpoint take a PUT request with the following Parameters(Inputs): (notificationId As Int in url) + (User(Doctor, or Student) Token As Bearer Token)
Response body:
{
  "statusCode": 200,
  "message": "Notification marked as read successfully!",
  "data": {
    "isSuccess" : true
  }
}
*/

// Request URL: (Finished) (Tested)
export const apiDeleteNotification =
  'https://grading-system-app.runasp.net/api/Notifications/Delete/';
/*
This endpoint take a DELETE request with the following Parameters(Inputs): (notificationId As Int in url) + (User(Doctor, or Student) Token As Bearer Token)
Response body:
{
  "statusCode": 200,
  "message": "Notification deleted successfully!",
  "data": {
    "isSuccess" : true
  }
}
*/
export const notificationHubUrl =
  'https://grading-system-app.runasp.net/api/notificationHub';
// Create Doctor Account Page:

// Request URL: (Finished) (Tested)
export const apiCreateDoctorAccount =
  'https://grading-system-app.runasp.net/api/Auth/DoctorRegister';
/*
      This endpoint take a POST request(App/Json) with the following Parameters(Inputs): fullName As String, email As String, password As String + (Admin Token As Bearer Token).
      Response body:
      {
      "statusCode": 200,
      "message": "Doctor Registered Successfully.",
      "data": null
      }
    */

// Create Schedule Page:

// Request URL: (Finished) (Tested)
export const apiCreateSchedule =
  'https://grading-system-app.runasp.net/api/Schedules/CreateSchedule';
/*
        This endpoint take a POST request(App/Json) with the following Parameters(Inputs): (teamId As Int, scheduleDate As DateTime, and committeeDoctorIds As List<Int>) + (Admin Token As Bearer Token).
        Response body:
        {
          "statusCode": 200,
          "message": "Schedule created successfully for this team ID: '{team.Id}' with schedule ID: '{newSchedule.Id}'.",
          "data": {
            "isSuccess": true,
        }
        }
        */

// Request URL: (Finished) (Tested)
export const apiGetAllDoctors =
  'https://grading-system-app.runasp.net/api/Doctors/All';
/*
          This endpoint take a GET request with the following Parameters(Inputs): (Admin Token As Bearer Token).
          Response body:
          {
          "statusCode": 200,
          "message": "Doctors retrieved successfully.",
          "data": {
            "isSuccess": true,
            "doctorsList": [
              {
                "doctorId": 1,
                "doctorName": "Dr Ahmed"
              },
              {
                "doctorId": 2,
                "doctorName": "Emad Hassan"
              },
              {
                "doctorId": 3,
                "doctorName": "Test esmail"
              },
              {
                "doctorId": 4,
                "doctorName": "testing popup2"
              },
              {
                "doctorId": 5,
                "doctorName": "test on 27/4"
              }
            ]
          }
        }

*/
// Request URL: (Finished) (Tested)
export const apiGetAllTeamsWithProjects =
  'https://grading-system-app.runasp.net/api/Teams/AllTeamsWithProjects';
/*
        This endpoint take a GET request with the following Parameters(Inputs): Admin Token As Bearer Token.
        Response body:
        {
          "statusCode": 200,
          "message": "Teams with projects have been successfully retrieved.",
          "data": {
            "isSuccess": true,
            "teams": [
              {
                "id": 1,
                "name": "AAEM",
                "hasProject": true,
                "leaderId": 1,
                "leaderName": "ST Ahmed Emad",
                "supervisorId": 1,
                "supervisorName": "ST Ahmed Emad",
               },
              {
                 "id": 2,
                "name": "AAAEM",
                "hasProject": true,
                "leaderId": 1,
                "leaderName": "ST Ahmed Emad",
                "supervisorId": 1,
                "supervisorName": "ST Ahmed Emad",
              }          
        ]
          }
        }
        */

// Pending Projects From Doctors Page:

// Request URL: (Finished) (Tested)
export const apiGetPendingDoctorProjects =
  'https://grading-system-app.runasp.net/api/Projects/PendingDoctorProjectIdeas';
/*
        This endpoint take a GET request with the following Parameters(Inputs): Admin Token As Bearer Token.
        Response body:
        {
          "statusCode": 404,
          "message": "No Pending Project Ideas Found.",
          "data": {
            "isSuccess": false,
          }
        }
        If Projects Found:
        Response body:
        {
          "statusCode": 200,
          "message": "Pending project ideas retrieved successfully.",
          "data": {
            "isSuccess": true,
            "pendingDoctorProjects": [
              {
            "id": 2,
            "name": "testing",
            "description": "testing on 4/17",
            "submissionDate": "2025-04-17T12:07:59.8860677",
            "status": "Pending",
            "doctorId": 1,
            "doctorName": "Dr Ahmed"
          },
          {
            "id": 3,
            "name": "ffgf",
            "description": "<p>fgfgfg</p>",
            "submissionDate": "2025-04-17T12:23:35.3473159",
            "status": "Pending",
            "doctorId": 1,
            "doctorName": "Dr Ahmed"
          },
          {
            "id": 4,
            "name": "ghghgh",
            "description": "<p>hghghghgh</p>",
            "submissionDate": "2025-04-17T13:10:07.1108474",
            "status": "Pending",
            "doctorId": 1,
            "doctorName": "Dr Ahmed"
          },
          {
            "id": 5,
            "name": "Ads Server",
            "description": "A server responds with interesting advertisements to the user.",
            "submissionDate": "2025-04-18T15:24:35.3437402",
            "status": "Pending",
            "doctorId": 1,
            "doctorName": "Dr Ahmed"
          },
          {
            "id": 11,
            "name": "Car Factory",
            "description": "Keep All Data About Cars and Maintain Them.",
            "submissionDate": "2025-04-18T23:17:47.3064556",
            "status": "Pending",
            "doctorId": 2,
            "doctorName": "Emad Hassan"
          }
        ]
      }   
    }
        */

// Pending Projects From Teams Page:

// Request URL: (Finished) (Tested)
export const apiGetPendingTeamProjects =
  'https://grading-system-app.runasp.net/api/Projects/PendingTeamProjectIdeas';
/*
          This endpoint take a GET request with the following Parameters(Inputs): Admin Token As Bearer Token.
          If No Projects Found:
          Response body:
          {
            "statusCode": 404,
            "message": "No Pending Project Ideas Found.",
            "data": {
              "isSuccess": false,
            }
          }
          If Projects Found:
          Response body:
          {
            "statusCode": 200,
            "message": "Pending Project Ideas Retrieved Successfully",
            "data": {
              "isSuccess": true,
              "pendingTeamProjects": [
                {
                  "id": 3,
                  "name": "fgrgrgr",
                  "description": "<p>grgrgrgr</p>",
                  "submissionDate": "2025-04-18T20:39:56.6711775",
                  "status": "Pending",
                  "teamId": 9,
                  "teamName": "Testing 18/4",
                  "leaderId": 1,
                  "leaderName": "Andrew Ekrame",
                  "supervisorId": 1,
                  "supervisorName": null
                },
                {
                  "id": 4,
                  "name": "Ads Server",
                  "description": "Keep All Ads and return them to user.",
                  "submissionDate": "2025-04-19T03:48:31.2309429",
                  "status": "Pending",
                  "teamId": 17,
                  "teamName": "ADFGH",
                  "leaderId": 4,
                  "leaderName": "Ahmed Emad Hassan",
                  "supervisorId": null,
                  "supervisorName": null
                }
              ]
            } 
          }
        */

// Request URL: (Finished) (Tested)
// Use apiGetAllDoctors

// Add Criteria Page:

// Request URL: (Finished) (Tested)
export const apiAddCriteria =
  'https://grading-system-app.runasp.net/api/Criteria/Create';
/*
            This endpoint take a POST request(App/Json) with the following Parameters(Inputs): (name As String, description As String, maxGrade As Int, evaluator As String, givenTo As String, specialty As String, term As String) + (Admin Token As Bearer Token).
            Response body:
            {
              "statusCode": 200,
              "message": "Criteria created successfully with ID: '{newCriteria.Id}' for the specialty: '{newCriteria.Specialty}'.",
              "data": {
                "isSuccess": true
              }
            }
          */

// Update Criteria Page:

// Request URL: (Finished) (Tested)
export const apiGetAllCriteria =
  'https://grading-system-app.runasp.net/api/Criteria/All';
/*
            This endpoint take a GET request with the following Parameters(Inputs): (Admin Token As Bearer Token)
            Response body:
            {
              "statusCode" : 200,
              "message" : "Criteria list retrieved successfully.",
              "data" : {
                "isSuccess" : true,
                "criteriaList" : [
                  {
                    "id" : 1,
                    "name" : "ff",
                    "description" : "",
                    "maxGrade" : 20,
                    "evaluator" : ""
                    "givenTo" : ""
                    "specialty" : ""
                    "year" : ""
                    "term" : ""
                    "isActive : true
                    "CreatedAt" : DateTime
                    "LastUpdatedAt" : DateTime

                  }
                ]
              }
            }

    
    // Delete Criteria Page:
      // Request URL: (Finished) (Tested)
        export const apiDeleteCriteria = 'https://grading-system-app.runasp.net/api/Criteria/DeleteCriteria/';
        /*
          This endpoint take a DELETE request(App/Json) with the following Parameters(Inputs): (criteriaId As Int in url and send it also in body) + (Admin Token As Bearer Token).
          Response body:
          {
            "statusCode": 200,
            "message": "Criteria deleted successfully.",
            "data": {
              "isSuccess": true
            }
          }
          */

// Request URL: (Finished) (Tested)
export const apiUpdateCriteria =
  'https://grading-system-app.runasp.net/api/Criteria/Update';
/*
            This endpoint take a PUT request(App/Json) with the following Parameters(Inputs): (id As Int, name As String, description As String, maxGrade As Int, evaluator As String, givenTo As String, specialty As String, term As String, isActive As bool(true or false)) + (Admin Token As Bearer Token)
            Response body:
            {
              "statusCode" : 200,
              "message" : "Criteria updated successfully.",
              "data" : {
                "isSuccess" : true
              }
            }
          */

// Delete Criteria Page:

// Request URL: (Finished) (Tested)
export const apiDeleteCriteria =
  'https://grading-system-app.runasp.net/api/Criteria/Delete/';
/*
            This endpoint take a Delete request with the following Parameters(Inputs): (criteriaId As Int in url) + (Admin Token As Bearer Token)
            Response body:
            {
              "statusCode" : 200,
              "message" : "Criteria deleted successfully.",
              "data" : {
                "isSuccess" : true
              }
            }
          */

// Create New Appointment(Update term times) Page:

// Request URL: (Finished) (Tested)
export const apiCreateNewAppointment =
  'https://grading-system-app.runasp.net/api/AcademicAppointments/CreateAppointment';
/*
          This endpoint take a POST request(App/Json) with the following Parameters(Inputs): (year As String, firstTermStart As DateTime, firstTermEnd As DateTime, secondTermStart As DateTime, secondTermEnd As DateTime) + (Admin Token As Bearer Token).
          Response body:
          {
            "statusCode": 200,
            "message": "Academic appointment created successfully.",
            "data": {
              "isSuccess": true
            }
          }
          */

// Get All Appointment Years(Set active year) Page:
// Request URL: (Finished) (Tested)
export const apiGetAllAppointmentYears =
  'https://grading-system-app.runasp.net/api/AcademicAppointments/AllYears';
/*
          This endpoint take a GET request with the following Parameters(Inputs): Admin Token As Bearer Token.
          Response body:
          {
            "statusCode": 200,
            "message": "Academic appointment years retrieved successfully.",
            "data": {
              "isSuccess": true,
              "academicYearAppointments": [
                {
                  "id": 1,
                  "year": "2025",
                  "firstTermStart": "DateTime",
                  "firstTermEnd": "DateTime",
                  "secondTermStart": "DateTime",
                  "secondTermEnd": "DateTime",
                  "status": "Active",
                },
                {
                  "id": 1,
                  "year": "2025",
                  "firstTermStart": "DateTime",
                  "firstTermEnd": "DateTime",
                  "secondTermStart": "DateTime",
                  "secondTermEnd": "DateTime",
                  "status": "Active",
                }
              ]
            }
          }
          */

// Request URL: (Finished) (Tested)
export const apiSetActiveYear =
  'https://grading-system-app.runasp.net/api/AcademicAppointments/SetActiveYear/';
/*
          This endpoint take a PUT request with the following Parameters(Inputs): (appointmentId As Int in url) + (Admin Token As Bearer Token).
          Response body:
          {
            "statusCode": 200,
            "message": "This academic year appointment set to active successfully.",
            "data": {
              "isSuccess": true
            }
          }
          */

// --------------------------------------------------------------------------------------------------------------------------------------

// Authentication API Endpoints: (Completed)

// Student Register Page:
// Request URL: (Finished) (Tested)
export const apiRegisterStudent =
  'https://grading-system-app.runasp.net/api/Auth/StudentRegister';
/* 
        This endpoint take a POST request(Form-Data) with the following Parameters(Inputs): (FullName As String, Email As String, Password As String, Specialty As String, ProfilePicture As IFormFile)
          Response body:
          {
            "statusCode": 200,
            "message": "Registration successful, The OTP Code Verification has been sent to your email with expiry time: '4/29/2025 11:18:54 AM'. Check it now",
            "data": {
              "isSuccess": true
            }
          }
         */

// Request URL: (Finished) (Tested)
export const apiOTPVerification =
  'https://grading-system-app.runasp.net/api/Auth/EmailVerificationByOtp/';
/*
        This endpoint take a POST request with the following Parameters(Inputs): otpCode As String. (Please search about how i'm frontend angular send input to url)
        Response body:
        {
          "statusCode": 200,
          "message": "Email verified successfully and user created  with ID: '17'.",
          "data": {
            "isSuccess": true
          }
        }
        */

// Request URL: (Finished) (Tested) (********* Please, create a button 'Resend OTP' to get OTP again below 6 OTP digits)
export const apiResendOtp =
  'https://grading-system-app.runasp.net/api/Auth/ResendOtp/';
/*
        This endpoint take a POST request with the following Parameters(Inputs): studentEmail As String.
        Response body:
        {
          "statusCode": 200,
          "message": "Your OTP Code Verification has been resent to your email until expiry time: '4/29/2025 12:19:53 PM'. Check it now",
          "data": {
            "isSuccess": true
          }
        }
        */

// Login Page:
// Request URL: (Finished) (Tested)
export const apiLogin = 'https://grading-system-app.runasp.net/api/Auth/Login';
/*
        This endpoint take a POST request(App/Json) with the following Parameters(Inputs): email As String, password As String.
        Response body:
        {
          "statusCode": 200,
          "message": "Login successfully.",
          "data": {
            "isSuccess": true,
            "token": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJVc2VySWQiOiJlNmJjMzkzNC01YWQxLTQ5ZmMtYWZhYS01YzlkOTk5YzEyOGYiLCJVc2VyTmFtZSI6IkFobWVkIEFkbWluIiwiVXNlckVtYWlsIjoiYWVoYXNzYW4wMDhAZ21haWwuY29tIiwicm9sZSI6IkFkbWluIiwibmJmIjoxNzQ1OTIwMDcwLCJleHAiOjE3NDcyMTYwNzAsImlhdCI6MTc0NTkyMDA3MCwiaXNzIjoiaHR0cHM6Ly9ncmFkaW5nLXN5c3RlbS1hcHAucnVuYXNwLm5ldC8ifQ.4EutEqgYbMvsQ6sJ5MwjSEBpjIfEYQgU_QOFPHr4YN8"
          }
        }
        */

// Forget Password Page:
// Request URL: (Finished) (Tested)
export const apiForgetPass =
  'https://grading-system-app.runasp.net/api/Auth/ForgetPassword';
/*
          This endpoint take a POST request(App/Json) with the following Parameters(Inputs): email As String.
          Response body:
          {
            "statusCode": 200,
            "message": "Password Reset Link Has Been Sent To Your Email.",
            "data": {
              "isSuccess" : true
            }
          }
        */

// Reset Password Page:
// Request URL: (Finished) (Tested)
export const apiResetPass =
  'https://grading-system-app.runasp.net/api/Auth/ResetPassword';
/*
          This endpoint take a POST request(App/Json) with the following Parameters(Inputs): email As String, newPassword As String, confirmPassword As String, token As String.
          Response body:
          {
            "statusCode": 200,
            "message": "Password Reset Successfully",
            "data": {
              "isSuccess" : true
            }
          }
        */

// -----------------------------------------------------------------------------------------------------------------------------------------

// Doctor Account API Endpoints: (Completed)

// Post Project Page (Doctor): (Put 'Project Description' on quill editor) (Handle error messages if user not entered data or lack of data or entered one field only)
// Request URL: (Finished) (Tested)
export const apiPostProjectDoctor =
  'https://grading-system-app.runasp.net/api/Projects/SubmitDoctorProjectIdea';
/*
This endpoint take a POST request(App/Json)(Body) with the following Parameters(Inputs): (name As String, description As String) + (Doctor Token As Bearer Token).
Response body:
{
  "statusCode": 200,
  "message": "Project submitted successfully with id: '17', Please wait until admin review this idea.",
  "data": {
    "isSuccess": true
  }
}
*/

// My Teams Page: (Please list all the majors available in the college so that the themes can be grouped under them according to the major team.)
// Request URL: (Finished) (Tested)
export const apiGetTeamsForDoctor =
  'https://grading-system-app.runasp.net/api/Teams/DoctorTeams';
/*
This endpoint take a GET request(App/Json) with the following Parameters(Inputs): (Doctor Token As Bearer Token)
Response body:
{
  "statusCode": 200,
  "message": "Teams retrieved successfully.",
  "data": {
    "isSuccess": true,
    "teams": [
      {
        "id": 1,
        "name": "AAEM",
        "hasProject": true,
        "leaderId": 1,
        "supervisorId": 1,
        "members": [
          "id": 6,
          "fullName": "ST Ahmed",
          "email": "emadhassan663@yahoo.com",
          "specialty": "CS",
          "inTeam": false,
          "profilePicture": "https://grading-system-app.runasp.net/Students/ProfilePictures/66d1d7bb-a741-4c97-a882-e5b7d86b501f_Screenshot 2025-02-16 135218.png"
                    ] 
      },
      {
        "id": 2,
        "name": "AAAEM",
        "hasProject": true,
        "leaderId": 1,
        "supervisorId": 1,
        "members": [
         {
          "id": 8,
          "fullName": "ST sAhmed",
          "email": "emadhassan663@yahoo.com",
          "specialty": "CS",
          "inTeam": false,
          "profilePicture": "https://grading-system-app.runasp.net/Students/ProfilePictures/66d1d7bb-a741-4c97-a882-e5b7d86b501f_Screenshot 2025-02-16 135218.png"
          },
          {
          }
                    ] 
      }
    ]
  }
}
*/

// Team-Hub Page:
// Request URL: (Finished) (Tested)
export const apiGetFinalProjectIdea =
  'https://grading-system-app.runasp.net/api/Projects/FinalProjectIdea/';
/*
This endpoint take a GET request(App/Json) with the following Parameters(Inputs): (teamId As Int in url) + (User Token As Bearer Token).
Respone body:
{
  "statusCode": 200,
  "message": "Final project idea retrieved successfully.",
  "data": {
    "isSuccess": true,
    "projectIdea": {
      "projectId": 11,
      "projectName": "Car Factory",
      "projectDescription": "Keep All Data About Cars and Maintain Them.",
      "supervisorId": 2,
      "supervisorName": "Emad Hassan",
      "teamId": 3,
      "teamName": "MEAAA",
      "postedBy": "Doctor"
    }
  }
}
*/

// Request URL: (Finished) (Tested)
export const apiGetTeamMembers =
  'https://grading-system-app.runasp.net/api/Teams/TeamWithMembers/';
/*
This endpoint take a GET request(App/Json) with the following Parameters(Inputs): (teamId As Int in url) + (User Token As Bearer Token) 
Response body:
{
  "statusCode": 200,
  "message": "Team found.",
  "data": {
    "isSuccess": true,
    "team": {
      "id": 1,
      "name": "AAEM",
      "hasProject": true,
      "leaderId": 1,
      "supervisorId": 1,
      "members": [
        {
          "id": 1,
          "fullName": "St Ahmed Emad",
          "email": "ae36574356@gmail.com",
          "specialty": "CS",
          "inTeam": true,
          "profilePicture": "https://grading-system-app.runasp.net/Students/ProfilePictures/d4cbaa32-b596-4518-bd5a-0ea0116cb679_Screenshot 2025-02-16 133638.png"
        }
      ]
    }
  }
}
*/

// Request URL: (Finished) (Tested)
export const apiCreateTask =
  'https://grading-system-app.runasp.net/api/Tasks/CreateTask';
/*
This endpoint take a POST request(Form/Data) with the following Parameters(Inputs): (name As String, description As String, deadline As DateTime, SupervisorId As Int, TeamId As Int, StudentIds As List<Int>) + (Doctor Token As Bearer Token)
Response body:
{
  "statusCode": 200,
  "message": "Task created successfully with id: '3'.",
  "data": {
    "isSuccess": true
  }
}
*/

// Request URL: (Finished) (Tested)
export const apiGetTeamTasks =
  'https://grading-system-app.runasp.net/api/Tasks/TeamTasks/';
/*
This endpoint take a GET request with the following Parameters(Inputs): (teamId As Int in url) (Empty Request Body) + (User(Doctor or Student) Token As Bearer Token)
Response body:
{
  "statusCode": 200,
  "message": "Tasks of this team id: '17' retrieved successfully.",
  "data": {
    "isSuccess": true,
    "tasks": [
      {
        "id": 1,
        "name": "Task 1",
        "description": "Task 1 description",
        "deadline": "2025-04-20T00:00:00",
        "startDate": "2025-04-19T00:00:00",
        "status": "Pending",
        "supervisorId": 1,
        "teamId": 1,
        "teamName": "AAEM",
        "teamMembers": [
          {
            "taskId": 1,
            "taskName": "Task 1",
            "studentId": 1,
            "studentName": "ST Ahmed Emad",
            "studentProfilePicture": "https://grading-system-app.runasp.net/Students/ProfilePictures/d4cbaa32-b596-4518-bd5a-0ea3cc0922de_Screenshot 2025-02-13 132728.png",
            "teamId": 1,
            "teamName": "AAEM",
            "status": "Pending"
      }
    ]
  }
}
*/

// Request URL: (Finished) (Tested)
export const apiReviewTask =
  'https://grading-system-app.runasp.net/api/Tasks/ReviewTask/';
/*
This endpoint take a PUT request(App/Json) with the following Parameters(Inputs): (taskId As Int in url,/, studentId As Int in url) (Empty Request Body) + (Doctor Token As Bearer Token)
Response body:
{
  "statusCode": 200,
  "message": "Task reviewed successfully.",
  "data": {
    "isSuccess": true
  }
}
*/

// Doctor Grading Page: (Preferred put team name and team members only)
// Request URL: (Finished) (Tested) ---------------------------------------------------------------
export const apiAllTeamsForSupervisionEvaluation =
  'https://grading-system-app.runasp.net/api/Evaluations/AllTeamsForDoctorSupervisionEvaluation';
/*
This endpoint take a GET request(App/Json) with the following Parameters(Inputs): (Doctor Token As Bearer Token)
Response body:
{
  "statusCode": 200,
  "message": "Supervision teams retrieved successfully.",
  "data": {
    "IsSuccess": true,
    "supervisorTeamsWithCriteriaBySpecialtyGroup": [
      {
        "Specialty": "CS",
        "Teams": [
          {
            "TeamId": 1,
            "TeamName": "Team Alpha",
            "ProjectId": "PRJ-1001",
            "ProjectName": "AI Learning Platform",
            "ProjectDescription": "An adaptive learning platform using machine learning",
            "ScheduleId": 101,
            "ScheduleDate": "2023-06-15T14:00:00",
            "ScheduleStatus": "Scheduled",
            "Criterias": [
              {
                "Id": 5,
                "Name": "Technical Complexity",
                "Description": "Evaluation of technical difficulty",
                "MaxGrade": 20,
                "Evaluator": "Admin",
                "GivenTo": "Team",
                "Specialty": "CS",
                "Year": 2023,
                "Term": "Spring",
                "CreatedAt": "2023-01-10T09:00:00"
              },
              {
                "Id": 6,
                "Name": "Innovation",
                "Description": "Evaluation of project innovation",
                "MaxGrade": 15,
                "Evaluator": "Admin",
                "GivenTo": "Team",
                "Specialty": "Computer Science",
                "Year": 2023,
                "Term": "Spring",
                "CreatedAt": "2023-01-10T09:00:00"
              }
            ],
            "TeamMembers": [
              {
                "Id": 1001,
                "FullName": "John Doe",
                "Email": "john.doe@university.edu",
                "Specialty": "Computer Science",
                "InTeam": true,
                "ProfilePicture": "profile1001.jpg"
              },
              {
                "Id": 1002,
                "FullName": "Jane Smith",
                "Email": "jane.smith@university.edu",
                "Specialty": "Computer Science",
                "InTeam": true,
                "ProfilePicture": "profile1002.jpg"
              }
            ]
          }
        ]
      },
      {
        "Specialty": "Electrical Engineering",
        "Teams": [
          {
            "TeamId": 2,
            "TeamName": "Team Beta",
            "ProjectId": "PRJ-1002",
            "ProjectName": "Smart Grid System",
            "ProjectDescription": "IoT-based energy management system",
            "ScheduleId": 102,
            "ScheduleDate": "2023-06-16T10:00:00",
            "ScheduleStatus": "Scheduled",
            "Criterias": [
              {
                "Id": 7,
                "Name": "Practical Application",
                "Description": "Evaluation of real-world applicability",
                "MaxGrade": 25,
                "Evaluator": "Admin",
                "GivenTo": "Team",
                "Specialty": "Electrical Engineering",
                "Year": 2023,
                "Term": "Spring",
                "CreatedAt": "2023-01-10T09:00:00"
              }
            ],
            "TeamMembers": [
              {
                "Id": 1003,
                "FullName": "Alex Johnson",
                "Email": "alex.johnson@university.edu",
                "Specialty": "Electrical Engineering",
                "InTeam": true,
                "ProfilePicture": "profile1003.jpg"
              }
            ]
          }
        ]
      }
    ]
  }
}
*/

// Request URL: (Finished) (Tested) ----------------------------------------------------------------
export const apiAllTeamsForExaminationEvaluation =
  'https://grading-system-app.runasp.net/api/Evaluations/AllTeamsForDoctorExaminationEvaluation';
/*
This endpoint take a GET request(App/Json) with the following Parameters(Inputs): (Doctor Token As Bearer Token)
Response body:
{
  "statusCode": 200,
  "message": "Examination teams retrieved successfully.",
  "data": {
    "IsSuccess": true,
    "examinerTeamsWithCriteriaBySpecialtyGroup": [
      {
        "Specialty": "CS",
        "Teams": [
          {
            "TeamId": 1,
            "TeamName": "Team Alpha",
            "ProjectId": "PRJ-1001",
            "ProjectName": "AI Learning Platform",
            "ProjectDescription": "An adaptive learning platform using machine learning",
            "ScheduleId": 101,
            "ScheduleDate": "2023-06-15T14:00:00",
            "ScheduleStatus": "Scheduled",
            "Criterias": [
              {
                "Id": 5,
                "Name": "Technical Complexity",
                "Description": "Evaluation of technical difficulty",
                "MaxGrade": 20,
                "Evaluator": "Admin",
                "GivenTo": "Team",
                "Specialty": "CS",
                "Year": 2023,
                "Term": "Spring",
                "CreatedAt": "2023-01-10T09:00:00"
              },
              {
                "Id": 6,
                "Name": "Innovation",
                "Description": "Evaluation of project innovation",
                "MaxGrade": 15,
                "Evaluator": "Admin",
                "GivenTo": "Team",
                "Specialty": "Computer Science",
                "Year": 2023,
                "Term": "Spring",
                "CreatedAt": "2023-01-10T09:00:00"
              }
            ],
            "TeamMembers": [
              {
                "Id": 1001,
                "FullName": "John Doe",
                "Email": "john.doe@university.edu",
                "Specialty": "Computer Science",
                "InTeam": true,
                "ProfilePicture": "profile1001.jpg"
              },
              {
                "Id": 1002,
                "FullName": "Jane Smith",
                "Email": "jane.smith@university.edu",
                "Specialty": "Computer Science",
                "InTeam": true,
                "ProfilePicture": "profile1002.jpg"
              }
            ]
          }
        ]
      },
      {
        "Specialty": "Electrical Engineering",
        "Teams": [
          {
            "TeamId": 2,
            "TeamName": "Team Beta",
            "ProjectId": "PRJ-1002",
            "ProjectName": "Smart Grid System",
            "ProjectDescription": "IoT-based energy management system",
            "ScheduleId": 102,
            "ScheduleDate": "2023-06-16T10:00:00",
            "ScheduleStatus": "Scheduled",
            "Criterias": [
              {
                "Id": 7,
                "Name": "Practical Application",
                "Description": "Evaluation of real-world applicability",
                "MaxGrade": 25,
                "Evaluator": "Admin",
                "GivenTo": "Team",
                "Specialty": "Electrical Engineering",
                "Year": 2023,
                "Term": "Spring",
                "CreatedAt": "2023-01-10T09:00:00"
              }
            ],
            "TeamMembers": [
              {
                "Id": 1003,
                "FullName": "Alex Johnson",
                "Email": "alex.johnson@university.edu",
                "Specialty": "Electrical Engineering",
                "InTeam": true,
                "ProfilePicture": "profile1003.jpg"
              }
            ]
          }
        ]
      }
    ]
  }
}
*/

// Doctor Grading Page: (Preferred and easier for me and you each form of team grades or student grades has a confirm button)
// Request URL: (Finished) (Tested)
export const apiSubmitGradesByDoctor =
  'https://grading-system-app.runasp.net/api/Evaluations/SubmitGrades';
/*
This endpoint take a POST request(App/Json) with the following Parameters(Inputs): (scheduleId As Int, teamId As Int, studentId As Int(when evaluating team not sending it bec. it's nullable, grades As List<>) + (Doctor Token As Bearer Token)
{
  "scheduleId": 1,
  "teamId": 1,
  "studentId": 1,
  "grades": [
    {"criteriaId": 1, "grade": 8},
    {"criteriaId": 2, "grade": 7}
  ]
}

{
  "statusCode": 200,
  "message": "Grades submitted successfully.",
  "data": {"IsSuccess": true}
}
*/

// Request URL: (Finished) (Tested)
export const apiTeamEvaluationsForDoctor =
  'https://grading-system-app.runasp.net/api/Evaluations/TeamEvaluations/';
/*
This endpoint take a GET request(App/Json) with the following Parameters(Inputs): (teamId As Int, scheduleId As Int in url => TeamEvaluations/{teamId}/{scheduleId}) + (Doctor Token As Bearer Token).
{
  "statusCode": 200,
  "message": "Last evaluations retrieved successfully.",
  "data": {
    "IsSuccess": true,
    "evaluations": [
      {
        "evaluationId": 1,
        "criteriaId": 1,
        "criteriaName": "Technical Quality",
        "criteriaDescription" : "ffffffffff",
        "grade": 5.6,
        "evaluationDate" : "DateTime",
        "evaluatorRole": "Supervisor",
        "EvaluatorId" : 5,
        "teamId" : 5,
        "studentId" : 7
      }
    ]
  }
}
*/

// My Schedules Page: (Preferred put team name and supervisor name of this team and posted by (Doctor or Team))
// Request URL: (Finished) (Tested)
export const apiGetAllDoctorSchedules =
  'https://grading-system-app.runasp.net/api/Schedules/AllDoctorSchedules';
/*
This endpoint take a GET request(App/Json) with the following Parameters(Inputs): (Doctor Token As Bearer Token)
Response body:
{
  "statusCode": 200,
  "message": "Doctor schedules retrieved successfully.",
  "data": {
    "isSuccess": true,
    "doctorSchedules": [
      {
        "scheduleId": 1,
        "scheduleDate": "2025-06-15T10:00:00",
        "status": "Upcoming",
        "teamId": 101,
        "teamName": "Team Alpha",
        "teamLeaderId": 201,
        "teamLeaderName": "John Smith",
        "specialty": "CS",
        "projectId": 301,
        "projectName": "AI-Powered Healthcare System",
        "projectDescription": "A system to assist doctors with patient diagnosis using AI.",
        "doctorRole": "Supervisor",
        "postedBy": "Dr. Jane Doe",
        "supervisorId": 401,
        "supervisorName": "Dr. Emily Brown",
        "teamMembers": [
          {
            "id": 501,
            "fullName": "Alice Johnson",
            "email": "alice.johnson@example.com",
            "inTeam": true,
            "specialty": "Data Science",
            "profilePicture": "alice_profile.jpg"
          },
          {
            "id": 502,
            "fullName": "Bob Williams",
            "email": "bob.williams@example.com",
            "inTeam": true,
            "specialty": "Web Development",
            "profilePicture": "default.jpg"
          }
        ],
        "examiners": [
          {
            "examinerId": 601,
            "examinerName": "Dr. Michael Lee"
          },
          {
            "examinerId": 602,
            "examinerName": "Dr. Sarah Davis"
          }
        ]
      },
      {
        "scheduleId": 2,
        "scheduleDate": "2025-06-20T14:00:00",
        "status": "Pending",
        "teamId": 102,
        "teamName": "Team Beta",
        "teamLeaderId": 202,
        "teamLeaderName": "Emma Wilson",
        "specialty": "Cybersecurity",
        "projectId": 302,
        "projectName": "Secure Data Vault",
        "projectDescription": "A secure platform for storing sensitive data.",
        "doctorRole": "Supervisor",
        "postedBy": "Dr. Robert Clark",
        "supervisorId": 401,
        "supervisorName": "Dr. Emily Brown",
        "teamMembers": [
          {
            "id": 503,
            "fullName": "David Miller",
            "email": "david.miller@example.com",
            "inTeam": true,
            "specialty": "Network Security",
            "profilePicture": "david_profile.jpg"
          }
        ],
        "examiners": [
          {
            "examinerId": 603,
            "examinerName": "Dr. Laura Martinez"
          }
        ]
      }
    ]
  }
}
*/
//schedule for student
export const apiGetAllStudentSchedules =
  'https://grading-system-app.runasp.net/api/Schedules/AllStudentSchedules';
// Project Requests Page:
// Request URL: (Finished) (Tested)
export const apiGetPendingTeamRequestsForDoctorProjectIdeas =
  'https://grading-system-app.runasp.net/api/Projects/PendingTeamRequestsForDoctorProjectIdeas/';
/*
This endpoint take a GET request with the following Parameters(Inputs): (doctorId As Int in url) + (Doctor Token As Bearer Token).
Response body:
{
  "statusCode": 200,
  "message": "Pending team requests for project ideas belong to his doctor: Emad Hassan retrieved successfully.",
  "data": {
    "isSuccess": true,
    "pendingTeamRequests": [
      {
        "requestId": 8,
        "status": "Pending",
        "requestedDate": "2025-04-19T07:35:45.7172309",
        "teamId": 3,
        "teamName": "MEAAA",
        "leaderId": 2,
        "leaderName": "Ahmed Emad",
        "doctorId": 2,
        "doctorName": "Emad Hassan",
        "doctorProjectIdeaId": 11,
        "doctorProjectIdeaName": "Car Factory",
        "teamMembers": [
          {
            "id": 2,
            "fullName": "Ahmed Emad",
            "email": "ae36574356@gmail.com",
            "specialty": "CS",
            "inTeam": true,
            "profilePicture": "https://grading-system-app.runasp.net/Students/ProfilePictures/5d269d25-8135-4d09-be95-8930ed8a2a43_Screenshot 2025-03-30 215654.png"
          }
        ]
      }
    ]
  }
}
*/

// Request URL: (Finished) (Tested)
export const apiReviewTeamProjectRequest =
  'https://grading-system-app.runasp.net/api/Projects/ReviewTeamProjectRequest';
/*
This endpoint take a PUT request(App/Json) with the following Parameters(Inputs): (requestId As Int, newStatus As String, doctorId As Int) + (Doctor Token As Bearer Token).
Response body:
{
  "statusCode": 200,
  "message": "Project Request approved and other requests rejected successfully!",
  "data": {
    "isSuccess": true
  }
}
*/

// --------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------

// Student Account API Endpoints:

// Post Project (Student) Page:

// Request URL: (Finished) (Tested)
export const apiPostProjectTeam =
  'https://grading-system-app.runasp.net/api/Projects/SubmitTeamProjectIdea';
/*
This endpoint take a POST request(App/Json) with the following Parameters(Inputs): name As String, description As String, teamId As int + (Student(Leader) Token As Bearer Token).
Response body:
{
  "statusCode": 200,
  "message": "Project submitted successfully with id:4, Please wait until admin review this idea.",
  "data": {
    "isSuccess": true
    }
}
*/

// Create Team Page:

// Request URL: (Finished) (Tested)
export const apiCreateTeam =
  'https://grading-system-app.runasp.net/api/Teams/CreateTeam/';
/*
This endpoint take a POST request(App/Json) with the following Parameters(Inputs): (teamname As String in url) + (Student Token As Bearer Token).
Response body:
{
  "statusCode": 200,
  "message": "Team AAFFA is created successfully, You're leader of this team.",
  "data": {
    "isSuccess": true
  }
}
*/

// Team-Hub Page:

// Request URL: (Finished) (Tested)
export const apiGetStudentsWithoutTeams =
  'https://grading-system-app.runasp.net/api/Students/StudentsWithoutTeams';
/*
This endpoint take a GET request with the following Parameters(Inputs): User(Admin or Student or Doctor) Token As Bearer Token.
Response body:
{
  "statusCode": 200,
  "message": "Students Without Teams found.",
  "data": {
    "isSuccess": true,
    "students": [
      {
        "id": 6,
        "fullName": "ST Ahmed",
        "email": "emadhassan663@yahoo.com",
        "specialty": "CS",
        "inTeam": false,
        "profilePicture": "https://grading-system-app.runasp.net/Students/ProfilePictures/66d1d7bb-a741-4c97-a882-e5b7d86b501f_Screenshot 2025-02-16 135218.png"
      },
      {
        "id": 8,
        "fullName": "Ahmed Hassan",
        "email": "emad.ahmed53@yahoo.com",
        "specialty": "CS",
        "inTeam": false,
        "profilePicture": "https://grading-system-app.runasp.net/Students/ProfilePictures/e8d1202b-657d-452a-9a49-2fc7f144b10e_1000148668.jpg"
      }
    ]
  }
}
*/

// Request URL: (Finished) (Tested)
export const apiSendInvitation =
  'https://grading-system-app.runasp.net/api/Teams/InviteStudent';
/*
This endpoint take a POST request(App/Json) with the following Parameters(Inputs): (leaderId As Int, teamId As Int, studentId As Int) + (Student(Leader) Token As Bearer Token).
Response body:
{
  "statusCode": 200,
  "message": "Invitation sent successfully.",
  "data": {
    "isSuccess": true,
    "invitationData": {
      "invitationId": 1,
      "teamId": 1,
      "teamName": "AAEM",
      "studentId": 6,
      "studentName": "ST Ahmed",
      "leaderId": 1,
      "leaderName": "ST Ahmed Emad",
      "invitationSentDate" : "datetime",
      "InvitationStatus": "Pending"
    }
  }
}
*/

// Request URL: (Finished) (Tested)
// Use apiGetFinalProjectIdea

// Request URL: (Finished) (Tested)
// Use apiGetTeamTasks

// Available Projects Page:

// Request URL: (Finished) (Tested)
export const apiGetAccProjectsFromDrs =
  'https://grading-system-app.runasp.net/api/Projects/AcceptedDoctorProjectIdeas';
/*
This endpoint take a GET request with the following Parameters(Inputs): Student Token As Bearer Token.
Response body:
{
  "statusCode": 200,
  "message": "Accepted project ideas retrieved successfully",
  "data": {
    "isSuccess": true,
    "acceptedDoctorProjects": [
      {
        "id": 1,
        "name": "Blogs",
        "description": "Create blogs for literary characters or historical figures. Create an actual blog for free at blogger.com or just have students write and organize articles on white printer paper if the internet is not available.",
        "submissionDate": "2025-03-31T01:34:36",
        "status": "Accepted",
        "doctorId": 1,
        "doctorName": "Dr Ahmed"
      },
      {
        "id": 11,
        "name": "Car Factory",
        "description": "Keep All Data About Cars and Maintain Them.",
        "submissionDate": "2025-04-18T23:17:47.3064556",
        "status": "Accepted",
        "doctorId": 2,
        "doctorName": "Emad Hassan"
      }
    ]
  }
}
*/

// Request URL: (Finished) (Tested)
export const apiApplyOnDoctorProject =
  'https://grading-system-app.runasp.net/api/Projects/RequestDoctorProjectIdea';
/*
This endpoint take a POST request(App/Json) with the following Parameters(Inputs): (projectId As Int, teamId As Int, teamLeaderId As Int, doctorId As Int) + (Student(Leader) Token As Bearer Token).
Response body:
{
  "statusCode": 200,
  "message": "Request Of Project id: '11' successfully submitted!",
  "data": {
    "isSuccess": true
  }
}
*/

// My Schedule Page:

// Request URL: (Finished) (Tested) ---------------------------------------------------------------

// My Grades Page: -----------------------------------------------------------------------------------

// My Inivites Page:

// Request URL: (Finished) (Tested)
export const apiGetTeamInvitations =
  'https://grading-system-app.runasp.net/api/Teams/TeamInvitations';
/*
This endpoint take a GET request with the following Parameters(Inputs): (Student Token As Bearer Token).
Response body:
{
  "statusCode": 200,
  "message": "Team invitations retrieved successfully.",
  "data": {
    "isSuccess": true,
    "invitations": [
      {
        "invitationId": 1,
        "teamId": 1,
        "teamName": "AAEM",
        "leaderId": 1,
        "leaderName": "ST Ahmed Emad",
        "studentId": 6,
        "studentName": "ST Ahmed",
        "leaderId": 1,
        "leaderName": "ST Ahmed Emad",
        "invitationSentDate" : "datetime",
        "InvitationStatus": "Pending",
        "teamMembers": [
          {
            "id": 6,
            "fullName": "ST Ahmed",
            "email": ""
            "specialty": "CS",
            "inTeam": false,
            "profilePicture": "https://grading-system-app.runasp.net/Students/ProfilePictures/66d1d7bb-a741-4c97-a882-e5b7d86b501f_Screenshot 2025-02-16 135218.png"
      },
       {
          "id": 6,
            "fullName": "ST Ahmed",
            "email": ""
            "specialty": "CS",
            "inTeam": false,
            "profilePicture": "https://grading-system-app.runasp.net/Students/ProfilePictures/66d1d7bb-a741-4c97-a882-e5b7d86b501f_Screenshot 2025-02-16 135218.png"
      }
    ]
  }
}
*/

// Request URL: (Finished) (Tested)
export const ReviewTeamInvitation =
  'https://grading-system-app.runasp.net/api/Teams/ReviewTeamInvitation';
/*
This endpoint take a PUT request(App/Json) with the following Parameters(Inputs): (invitationId As Int , newStatus As String ) + (Student Token As Bearer Token).
Response body:
{
  "statusCode": 200,
  "message": "Invitation {newStatus} successfully.",
  "data": {
    "isSuccess": true
  }
}
*/

// Request URL: (Finished) (Tested)
export const apiGetAccProjectsForDoctor =
  'https://grading-system-app.runasp.net/api/Projects/AcceptedProjectIdeasForDoctor/';
/*
This endpoint take a GET request with the following Parameters(Inputs): (doctorId As Int in url) + (Doctor Token As Bearer Token).
Response body:
{
  "statusCode": 200,
  "message": "Accepted project ideas retrieved successfully for his doctor.",
  "data": {
    "isSuccess": true,
    "acceptedProjectIdeasForDoctor": [
      {
        "id": 11,
        "name": "Car Factory",
        "description": "Keep All Data About Cars and Maintain Them.",
        "submissionDate": "2025-04-18T23:17:47.3064556",
        "status": "Accepted",
        "doctorId": 2,
        "doctorName": "Emad Hassan"
      }
    ]
  }
}
*/

// Request URL: (Finished) (Tested)
export const apiDrProjectUpdate =
  'https://grading-system-app.runasp.net/api/Projects/ReviewDoctorProjectIdea';
/*
This endpoint take a PUT request(App/Json) with the following Parameters(Inputs): (projectId As Int, newStatus As String) + (Admin Token As Bearer Token).
Response body:
{
  "statusCode": 200,
  "message": "Status Of Project id: '11' updated to 'accepted' successfully!",
  "data": {
    "isSuccess": true
  }
}
*/

// Request URL: (Finished) (Tested)
export const apiTeamProjectUpdate =
  'https://grading-system-app.runasp.net/api/Projects/ReviewTeamProjectIdea';
/*
This endpoint take a PUT request(App/Json) with the following Parameters(Inputs): (projectId As Int, newStatus As String, SupervisorId As Int) + (Admin Token As Bearer Token).
Response body:
{
  "statusCode": 200,
  "message": "Status Of Project id: '4' Updated To 'accepted' Successfully!",
  "data": {
    "isSuccess": true
  }
}
*/

// Request URL: (Finished) (Tested)
export const apiGetAccProjectsFromTeams =
  'https://grading-system-app.runasp.net/api/Projects/AcceptedTeamProjectIdeas';
/*
This endpoint take a GET request with the following Parameters(Inputs): User(Admin or Student or Doctor) Token As Bearer Token.
Reponse Body:
{
  "statusCode": 200,
  "message": "Accepted Project Ideas Retrieved Successfully",
  "data": {
    "isSuccess": true,
    "acceptedTeamProjects": [
      {
        "id": 4,
        "name": "Ads Server",
        "description": "Keep All Ads and return them to user.",
        "submissionDate": "2025-04-19T03:48:31.2309429",
        "status": "Accepted",
        "teamId": 17,
        "teamName": "ADFGH",
        "leaderId": 4,
        "leaderName": "Ahmed Emad Hassan",
        "supervisorId": 1,
        "supervisorName": null
      }
    ]
  }
}
*/

// --------------------------------------------------------------------------------------------------------------------------------------

// UserProfile API Endpoints:

// Request URL:
export const apiGetUserProfile =
  'https://grading-system-app.runasp.net/api/UserProfile/GetProfile';
/*
This endpoint take a GET request with the following Parameters(Inputs): We Are Backend Extracting The User ID From The Token.
Response body:
{
  "id": 1,
  "fullName": "Ahmed Emad",
  "email": "aehassan008@gmail.com",
  "role": "Admin",
  "profilePicture": "https://grading-system-app.runasp.net/ChangedProfilePictures/51bdfb4d-6073-4bfa-9070-0ba3cc0922de_Screenshot 2025-02-13 132728.png"
}
*/

// Request URL:
export const apiChangeUsername =
  'https://grading-system-app.runasp.net/api/UserProfile/ChangeUsername';
/*
This endpoint take a PUT request(App/Json) with the following Parameters(Inputs): newUsername As String.
Response body:
{
  "statusCode": 200,
  "message": "Username changed successfully.",
  "data": null
}
*/

// Request URL:
export const apiChangePassword =
  'https://grading-system-app.runasp.net/api/UserProfile/ChangePassword';
/*
This endpoint take a PUT request(App/Json) with the following Parameters(Inputs): currentPassword As String, newPassword As String.
Response body:
{
  "statusCode": 200,
  "message": "Password changed successfully.",
  "data": null
}
*/

// Request URL:
export const apiChangeProfilePicture =
  'https://grading-system-app.runasp.net/api/UserProfile/ChangeProfilePicture';
/*
This endpoint take a PUT request(Form-Data) with the following Parameters(Inputs): ProfilePicture As File.
Response body:
{
  "statusCode": 200,
  "message": "Profile picture updated successfully.",
  "data": null
}
*/
export const apiGetExcel =
  'https://grading-system-app.runasp.net/api/Evaluations/ExportGradesForSpecialty/';
/*
takes specialty in url , content type is (application/vnd.openxmlformats-officedocument.spreadsheetml.sheet) 
*/
export const apiGetMyCriteria =
  'https://grading-system-app.runasp.net/api/Criteria/AllForStudent';
/*
this takes the student token as bearer token

on success the response is
{
  "statusCode": 200,
  "message": "Criteria list retrieved successfully.",
  "data": {
    "isSuccess": true,
    "criteriaList": [
      {
        "id": 1,
        "name": "Problem Statement",
        "description": "Evaluates the project's relevance and feasibility. Clarity of the problem statement, motivation for the project, and the scope of work.",
        "maxGrade": 25,
        "evaluator": "Examiner",
        "givenTo": "Team",
        "specialty": "CS",
        "year": "2024-2025",
        "term": "Second-Term",
        "isActive": true,
        "createdAt": "2025-05-09T00:29:52.4523915",
        "lastUpdatedAt": null
      },
      {
        "id": 2,
        "name": "Idea Innovation",
        "description": "Evaluates how innovative and complex the project is. Originality of ideas and sophistication of the implemented solution.",
        "maxGrade": 25,
        "evaluator": "Examiner",
        "givenTo": "Team",
        "specialty": "CS",
        "year": "2024-2025",
        "term": "Second-Term",
        "isActive": true,
        "createdAt": "2025-05-09T00:34:51.2680227",
        "lastUpdatedAt": null
      },
      {
        "id": 3,
        "name": "Impact",
        "description": "Evaluates how the project contributes to practical applications. Potential influence on industry practices or societal issues. Potential for publication or practical application in real-world scenarios.",
        "maxGrade": 25,
        "evaluator": "Examiner",
        "givenTo": "Team",
        "specialty": "CS",
        "year": "2024-2025",
        "term": "Second-Term",
        "isActive": true,
        "createdAt": "2025-05-09T00:35:23.7793394",
        "lastUpdatedAt": null
      },
      {
        "id": 4,
        "name": "Presentation",
        "description": "Assesses how well students communicate their project. Organization of content, clarity of presentation, and ability to answer questions effectively.",
        "maxGrade": 10,
        "evaluator": "Examiner",
        "givenTo": "Student",
        "specialty": "CS",
        "year": "2024-2025",
        "term": "Second-Term",
        "isActive": true,
        "createdAt": "2025-05-09T00:35:46.0836712",
        "lastUpdatedAt": null
      },
      {
        "id": 5,
        "name": "Discussion",
        "description": "Assesses students' understanding of their project and its context. Ability to discuss methods and results comprehensively and respond to critiques.",
        "maxGrade": 10,
        "evaluator": "Examiner",
        "givenTo": "Student",
        "specialty": "CS",
        "year": "2024-2025",
        "term": "Second-Term",
        "isActive": true,
        "createdAt": "2025-05-09T00:36:21.4331886",
        "lastUpdatedAt": null
      },
      {
        "id": 6,
        "name": "Use of Technologies",
        "description": "Assesses the incorporation of new or advanced technologies. Understanding and application of technologies that are new to the student.",
        "maxGrade": 10,
        "evaluator": "Examiner",
        "givenTo": "Student",
        "specialty": "CS",
        "year": "2024-2025",
        "term": "Second-Term",
        "isActive": true,
        "createdAt": "2025-05-09T00:36:58.2921292",
        "lastUpdatedAt": null
      },
      {
        "id": 7,
        "name": "Team Work",
        "description": "Assesses collaboration skills. Ability to work effectively in a team setting, demonstrating professionalism and ethical behavior.",
        "maxGrade": 25,
        "evaluator": "Supervisor",
        "givenTo": "Team",
        "specialty": "CS",
        "year": "2024-2025",
        "term": "Second-Term",
        "isActive": true,
        "createdAt": "2025-05-09T00:37:26.5414634",
        "lastUpdatedAt": null
      },
      {
        "id": 9,
        "name": "Project Development",
        "description": "Evaluates the technical execution of the project. Quality of code, adherence to coding standards, and originality of work.",
        "maxGrade": 25,
        "evaluator": "Supervisor",
        "givenTo": "Team",
        "specialty": "CS",
        "year": "2024-2025",
        "term": "Second-Term",
        "isActive": true,
        "createdAt": "2025-05-09T00:38:37.4204201",
        "lastUpdatedAt": null
      },
      {
        "id": 10,
        "name": "Deliverables",
        "description": "Assesses the student's engagement throughout the project duration. Timeliness in meetings and deliverables, as well as overall independence in managing the project.",
        "maxGrade": 25,
        "evaluator": "Supervisor",
        "givenTo": "Student",
        "specialty": "CS",
        "year": "2024-2025",
        "term": "Second-Term",
        "isActive": true,
        "createdAt": "2025-05-09T00:38:58.2707271",
        "lastUpdatedAt": null
      },
      {
        "id": 12,
        "name": "Deliverables",
        "description": "Adherence to deadlines: Evaluates the written documentation of the project. Quality of writing, structure, completeness, and technical accuracy.",
        "maxGrade": 10,
        "evaluator": "Admin",
        "givenTo": "Team",
        "specialty": "CS",
        "year": "2024-2025",
        "term": "Second-Term",
        "isActive": true,
        "createdAt": "2025-05-09T00:47:22.2182823",
        "lastUpdatedAt": "2025-05-09T00:47:53.9817153"
      }
    ]
  }
}
*/
export const apiGetMyGrades =
  'https://grading-system-app.runasp.net/api/Evaluations/StudentGrades';

/*
this takes bearer token of student

response on success
{
  "statusCode": 200,
  "message": "Student grades retrieved successfully.",
  "data": {
    "isSuccess": true,
    "grades": [
      {
        "criteriaId": 12,
        "criteriaName": "Deliverables",
        "criteriaDescription": "Adherence to deadlines: Evaluates the written documentation of the project. Quality of writing, structure, completeness, and technical accuracy.",
        "givenTo": "Team",
        "maximumGrade": 10,
        "grade": 7,
        "evaluatorRole": "Admin"
      },
      {
        "criteriaId": 1,
        "criteriaName": "Problem Statement",
        "criteriaDescription": "Evaluates the project's relevance and feasibility. Clarity of the problem statement, motivation for the project, and the scope of work.",
        "givenTo": "Team",
        "maximumGrade": 25,
        "grade": 25,
        "evaluatorRole": "Examiner"
      },
      {
        "criteriaId": 2,
        "criteriaName": "Idea Innovation",
        "criteriaDescription": "Evaluates how innovative and complex the project is. Originality of ideas and sophistication of the implemented solution.",
        "givenTo": "Team",
        "maximumGrade": 25,
        "grade": 25,
        "evaluatorRole": "Examiner"
      },
      {
        "criteriaId": 3,
        "criteriaName": "Impact",
        "criteriaDescription": "Evaluates how the project contributes to practical applications. Potential influence on industry practices or societal issues. Potential for publication or practical application in real-world scenarios.",
        "givenTo": "Team",
        "maximumGrade": 25,
        "grade": 25,
        "evaluatorRole": "Examiner"
      },
      {
        "criteriaId": 4,
        "criteriaName": "Presentation",
        "criteriaDescription": "Assesses how well students communicate their project. Organization of content, clarity of presentation, and ability to answer questions effectively.",
        "givenTo": "Student",
        "maximumGrade": 10,
        "grade": 10,
        "evaluatorRole": "Examiner"
      },
      {
        "criteriaId": 5,
        "criteriaName": "Discussion",
        "criteriaDescription": "Assesses students' understanding of their project and its context. Ability to discuss methods and results comprehensively and respond to critiques.",
        "givenTo": "Student",
        "maximumGrade": 10,
        "grade": 10,
        "evaluatorRole": "Examiner"
      },
      {
        "criteriaId": 6,
        "criteriaName": "Use of Technologies",
        "criteriaDescription": "Assesses the incorporation of new or advanced technologies. Understanding and application of technologies that are new to the student.",
        "givenTo": "Student",
        "maximumGrade": 10,
        "grade": 9.666666666666666,
        "evaluatorRole": "Examiner"
      }
    ]
  }
}
*/