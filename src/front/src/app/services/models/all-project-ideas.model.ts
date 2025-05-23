export interface ProjectIdeasResponse {
  statusCode: number;
  message: string;
  data: ProjectIdeasData;
}

export interface ProjectIdeasData {
  isSuccess: boolean;
  finalProjectIdeas: ProjectIdea[];
}

export interface ProjectIdea {
  projectId: number;
  projectName: string | null;
  projectDescription: string | null;
  supervisorId: number;
  supervisorName: string;
  teamId: number | null;
  teamName: string | null;
  postedBy: 'Doctor' | 'Team';
  teamMembers: TeamMember[] | null;
}

export interface TeamMember {
  id: number;
  fullName: string;
  email: string;
  specialty: string;
  inTeam: boolean;
  profilePicture: string;
}

const response: ProjectIdeasResponse = {
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
};