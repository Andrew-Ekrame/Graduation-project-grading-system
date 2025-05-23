﻿using GradingManagementSystem.Core.DTOs;
using GradingManagementSystem.Core.CustomResponses;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using GradingManagementSystem.Repository.Data.DbContexts;
using GradingManagementSystem.Core.Entities;
using GradingManagementSystem.Core;
using GradingManagementSystem.Core.Repositories.Contact;

namespace GradingManagementSystem.APIs.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class TeamsController : ControllerBase
    {
        private readonly GradingManagementSystemDbContext _dbContext;
        private readonly IUnitOfWork _unitOfWork;
        private readonly ITeamRepository _teamRepository;

        public TeamsController(GradingManagementSystemDbContext dbContext,
                               IUnitOfWork unitOfWork,
                               ITeamRepository teamRepository)
        {
            _dbContext = dbContext;
            _unitOfWork = unitOfWork;
            _teamRepository = teamRepository;
        }

        // Finished / Reviewed / Tested
        [HttpGet("AllTeamsWithProjects")]
        [Authorize(Roles = "Admin, Student, Doctor")]
        public async Task<IActionResult> GetAllTeams()
        {
            var teams = await _dbContext.Teams.Include(t => t.Leader)
                                              .Include(t => t.Supervisor)
                                              .Include(t => t.Schedules)
                                              .Where(t => t.HasProject == true && !t.Schedules.Any(s => s.TeamId == t.Id)).ToListAsync();
            if (teams == null || !teams.Any())
                return NotFound(CreateErrorResponse404NotFound("No teams found."));

            var result = teams.Select(t => new TeamForSettingScheduleDto
            {
                Id = t.Id,
                Name = t.Name,
                HasProject = t.HasProject,
                LeaderId = t.LeaderId,
                LeaderName = t.Leader?.FullName,
                SupervisorId = t.SupervisorId,
                SupervisorName = t.Supervisor?.FullName,
            }).ToList();
            return Ok(new ApiResponse(200, "Teams with projects have been successfully retrieved.", new { IsSuccess = true, Teams = result }));
        }

        // Finished / Reviewed / Tested
        [HttpGet("TeamWithMembers/{teamId}")]
        [Authorize(Roles = "Admin, Student, Doctor")]
        public async Task<IActionResult> GetTeamWithMembersById(int? teamId)
        {
            if (teamId == null)
                return BadRequest(CreateErrorResponse400BadRequest("TeamId is required."));
            if (teamId <= 0)
                return BadRequest(CreateErrorResponse400BadRequest("TeamId must be positive number."));

            var team = await _dbContext.Teams.Include(t => t.Students).ThenInclude(s => s.AppUser).FirstOrDefaultAsync(T => T.Id == teamId);
            if (team == null)
                return NotFound(CreateErrorResponse404NotFound("Team not found."));

            var teamMembers = await _dbContext.Students.Include(s => s.AppUser).Where(s => s.TeamId == teamId).ToListAsync();
            if (teamMembers == null || !teamMembers.Any())
                return NotFound(CreateErrorResponse404NotFound("No team members found for this team."));

            var teamWithMembers = new TeamWithMembersDto
            {
                Id = team.Id,
                Name = team.Name,
                HasProject = team.HasProject,
                LeaderId = team.LeaderId,
                SupervisorId = team.SupervisorId,
                Members = team.Students.Select(s => new TeamMemberDto
                {
                    Id = s.Id,
                    FullName = s.FullName,
                    Email = s.Email,
                    Specialty = s.Specialty,
                    InTeam = s.InTeam,
                    ProfilePicture = s.AppUser.ProfilePicture
                }).ToList()
            };

            return Ok(new ApiResponse(200, "Team and team members found.", new { IsSuccess = true, Team = teamWithMembers }));
        }

        // Finished / Reviewed / Tested
        [HttpPost("CreateTeam")]
        [Authorize(Roles = "Student")]
        public async Task<IActionResult> CreateTeam([FromBody] CreateTeamDto model)
        {
            if (model is null)
                return BadRequest(CreateErrorResponse400BadRequest("Invalid input data."));
            if (string.IsNullOrEmpty(model.TeamName))
                return BadRequest(CreateErrorResponse400BadRequest("Team name is required."));

            var studentAppUserId = User.FindFirst("UserId")?.Value;
            if (studentAppUserId == null)
                return NotFound(CreateErrorResponse404NotFound("Student not found."));

            var student = await _unitOfWork.Repository<Student>().FindAsync(S => S.AppUserId == studentAppUserId);
            if (student == null)
                return NotFound(CreateErrorResponse404NotFound("Student not found."));

            if (student.InTeam && student.TeamId != null)
                return BadRequest(CreateErrorResponse400BadRequest("You are already exist in a team."));

            if (student.LeaderOfTeamId != null)
                return BadRequest(CreateErrorResponse400BadRequest("You are already a leader of a team."));

            var teamExists = await _unitOfWork.Repository<Team>().FindAsync(t => t.Name == model.TeamName);
            if (teamExists != null)
                return BadRequest(CreateErrorResponse400BadRequest("Team name already exists, Please type another unique name."));

            if(teamExists?.LeaderId != null && teamExists?.LeaderId == student.Id)
                return BadRequest(CreateErrorResponse400BadRequest("You are already a leader of this team."));

            var teamCreated = new Team
            {
                Name = model.TeamName,
                Specialty = student.Specialty,
                LeaderId = student.Id,
            };

            await _unitOfWork.Repository<Team>().AddAsync(teamCreated);
            await _unitOfWork.CompleteAsync();

            student.InTeam = true;
            student.TeamId = teamCreated?.Id;
            student.LeaderOfTeamId = teamCreated?.LeaderId;
            _unitOfWork.Repository<Student>().Update(student);
            await _unitOfWork.CompleteAsync();

            var TeamInvitationsForStudent = await _unitOfWork.Repository<Invitation>().FindAllAsync(i => i.StudentId == student.Id);
            foreach (var ti in TeamInvitationsForStudent)
                ti.Status = "Rejected";

            await _unitOfWork.CompleteAsync();
            
            return Ok(new ApiResponse(200, $"Team {teamCreated?.Name} created successfully, You're leader of this team.", new { IsSuccess = true }));
        }

        // Finished / Reviewed / Tested
        [HttpGet("DoctorTeams")]
        [Authorize(Roles = "Doctor")]
        public async Task<IActionResult> GetAllTeamsForDoctorThatSupervisionOnThem()
        {
            var doctorAppUserId = User.FindFirst("UserId")?.Value;
            if (doctorAppUserId == null)
                return NotFound(CreateErrorResponse404NotFound("Doctor not found."));

            var doctor = await _unitOfWork.Repository<Doctor>().FindAsync(d => d.AppUserId == doctorAppUserId);
            if (doctor == null)
                return NotFound(CreateErrorResponse404NotFound("Doctor not found."));

            var TeamsList = await _teamRepository.GetAllTeamsForDoctorAsync(doctor.Id);
            if (TeamsList == null || !TeamsList.Any())
                return NotFound(CreateErrorResponse404NotFound("No teams found for his doctor."));

            return Ok(new ApiResponse(200, "Teams retrieved successfully.", new { IsSuccess = true, Teams = TeamsList }));
        }

        // Finished / Reviewed / Tested
        [HttpPost("InviteStudent")]
        [Authorize(Roles = "Student")]
        public async Task<IActionResult> SendInvitation([FromBody] InviteStudentDto model)
        {
            if (model is null)
                return BadRequest(CreateErrorResponse400BadRequest("Invalid input data."));

            var studentAppUserId = User.FindFirst("UserId")?.Value;
            if (studentAppUserId == null)
                return NotFound(CreateErrorResponse404NotFound("Student not found."));
            
            var leader = await _unitOfWork.Repository<Student>().FindAsync(s => s.Id == model.LeaderId);
            if (leader == null)
                return NotFound(CreateErrorResponse404NotFound("Leader not found."));

            var student = await _unitOfWork.Repository<Student>()
                                           .FindAsync(s => s.Id == model.StudentId &&
                                                      s.InTeam == false &&
                                                      s.LeaderOfTeamId == null &&
                                                      s.TeamId == null);
            if (student == null)
                return NotFound(CreateErrorResponse404NotFound("Student not found or already in a team."));

            var team = await _unitOfWork.Repository<Team>().FindAsync(t => t.Id == model.TeamId);
            if (team == null)
                return NotFound(CreateErrorResponse404NotFound("Team not found."));

            var existingInvitation = await _unitOfWork.Repository<Invitation>()
                                                      .FindAsync(i => i.TeamId == model.TeamId &&
                                                                 i.StudentId == model.StudentId &&
                                                                 i.LeaderId == model.LeaderId &&
                                                                 i.Status == StatusType.Pending.ToString());

            if (existingInvitation != null)
                return BadRequest(CreateErrorResponse400BadRequest("Invitation already exists."));

            var invitation = new Invitation
            {
                TeamId = model.TeamId,
                StudentId = model.StudentId,
                LeaderId = model.LeaderId,
            };

            await _unitOfWork.Repository<Invitation>().AddAsync(invitation);
            await _unitOfWork.CompleteAsync();

            return Ok(new ApiResponse(200, "Invitation sent successfully.", new { IsSuccess = true }));
        }

        // Finished / Reviewed / Tested
        [HttpGet("TeamInvitations")]
        [Authorize(Roles = "Student")]
        public async Task<IActionResult> GetTeamInvitations()
        {
            var studentAppUserId = User.FindFirst("UserId")?.Value;
            if (studentAppUserId == null)
                return Unauthorized(new ApiResponse(401, "Unauthorized access.", new { IsSuccess = false }));

            var student = await _unitOfWork.Repository<Student>().FindAsync(s => s.AppUserId == studentAppUserId);
            if (student == null)
                return NotFound(CreateErrorResponse404NotFound("Student not found."));

            var invitations = await _dbContext.Invitations
                                    .Include(i => i.Team)
                                        .ThenInclude(t => t.Students)
                                            .ThenInclude(s => s.AppUser)
                                    .Include(i => i.Leader)
                                        .ThenInclude(l => l.AppUser)
                                    .Where(i => i.StudentId == student.Id && i.Status == StatusType.Pending.ToString())
                                    .ToListAsync();

            if (invitations.Count == 0 || !invitations.Any() || invitations == null)
                return NotFound(CreateErrorResponse404NotFound("No invitations found."));

            var result = invitations.Select(i => new TeamInvitationDto
            {
                InvitationId = i.Id,
                TeamId = i.TeamId,
                TeamName = i.Team.Name,
                LeaderId = i.LeaderId,
                LeaderName = i.Leader.FullName,
                StudentId = i.StudentId,
                StudentName = i.Student.FullName,
                InvitationSentDate = i.SentDate,
                InvitationStatus = i.Status,
                TeamMembers = i.Team.Students.Select(s => new TeamMemberDto
                {
                    Id = s.Id,
                    FullName = s.FullName,
                    Email = s.Email,
                    Specialty = s.Specialty,
                    InTeam = s.InTeam,
                    ProfilePicture = s.AppUser.ProfilePicture
                }).ToList()
            });
            return Ok(new ApiResponse(200, "Team invitations retrieved successfully.", new { IsSuccess = true, Invitations = result }));
        }

        // Finished / Reviewed  / Tested
        [HttpPut("ReviewTeamInvitation")]
        [Authorize(Roles = "Student")]
        public async Task<IActionResult> ReviewTeamInvitation([FromBody] ReviewTeamInvitationDto model)
        {
            if (model.invitationId <= 0)
                return BadRequest(CreateErrorResponse400BadRequest("InvitationId is required."));
            if (model.newStatus != "Accepted" && model.newStatus != "Rejected")
                return BadRequest(CreateErrorResponse400BadRequest("Invalid Status Value. Use 'Accepted' or 'Rejected'."));

            var studentAppUserId = User.FindFirst("UserId")?.Value;
            if (studentAppUserId == null)
                return NotFound(CreateErrorResponse404NotFound("Student not found."));

            var student = await _unitOfWork.Repository<Student>().FindAsync(s => s.AppUserId == studentAppUserId);
            if (student == null)
                return NotFound(CreateErrorResponse404NotFound("Student not found."));

            if (student.InTeam)
                return BadRequest(CreateErrorResponse400BadRequest("Student is already in a team."));

            var invitation = await _dbContext.Invitations.Include(i => i.Team)
                                                         .FirstOrDefaultAsync(i => i.Id == model.invitationId &&
                                                                              i.StudentId == student.Id &&
                                                                              i.Status == StatusType.Pending.ToString());
            if (invitation == null)
                return NotFound(CreateErrorResponse404NotFound("Invitation not found."));

            var leader = await _unitOfWork.Repository<Student>().FindAsync(s => s.Id == invitation.LeaderId);
            if (leader == null)
                return NotFound(CreateErrorResponse404NotFound("Leader not found."));

            invitation.Status = (model.newStatus == StatusType.Accepted.ToString()) ? StatusType.Accepted.ToString()
                                                                                  : StatusType.Rejected.ToString();
            invitation.RespondedDate = DateTime.Now;

            if (model.newStatus == StatusType.Accepted.ToString())
            {
                student.InTeam = true;
                student.TeamId = invitation.TeamId;
                student.LeaderOfTeamId = invitation.LeaderId;
                _unitOfWork.Repository<Student>().Update(student);

                var team = await _dbContext.Teams.Include(t => t.Students).FirstOrDefaultAsync(t => t.Id == invitation.TeamId);
                if (team != null)
                {
                    team.Students.Add(student);
                    _unitOfWork.Repository<Team>().Update(team);
                }
                var otherInvitations = await _unitOfWork.Repository<Invitation>()
                                                        .FindAllAsync(i => i.StudentId == student.Id &&
                                                                      i.Id != model.invitationId &&
                                                                      i.Status == StatusType.Pending.ToString());

                foreach (var otherInvitation in otherInvitations)
                {
                    otherInvitation.Status = "Rejected";
                    otherInvitation.RespondedDate = DateTime.Now;
                    _unitOfWork.Repository<Invitation>().Update(otherInvitation);
                }
            }
            _unitOfWork.Repository<Invitation>().Update(invitation);
            await _unitOfWork.CompleteAsync();
            return Ok(new ApiResponse(200, $"Invitation {model.newStatus.ToLower()} successfully.", new { IsSuccess = true }));
        }


        private static ApiResponse CreateErrorResponse400BadRequest(string message)
        {
            return new ApiResponse(400, message, new { IsSuccess = false });
        }

        private static ApiResponse CreateErrorResponse404NotFound(string message)
        {
            return new ApiResponse(404, message, new { IsSuccess = false });
        }
    }
}
