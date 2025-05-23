﻿using GradingManagementSystem.Core.CustomResponses;
using GradingManagementSystem.Core.DTOs;
using GradingManagementSystem.Core.Entities;
using GradingManagementSystem.Repository.Data.DbContexts;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;

namespace GradingManagementSystem.APIs.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class StudentsController : ControllerBase
    {
        private readonly GradingManagementSystemDbContext _dbContext;

        public StudentsController(GradingManagementSystemDbContext dbContext)
        {
            _dbContext = dbContext;
        }

        // Finished / Reviewed / Tested 
        [HttpGet("StudentsWithoutTeams")]
        [Authorize(Roles = "Admin, Student, Doctor")]
        public async Task<IActionResult> GetAllStudentsWithoutTeams()
        {
            var userId = User.FindFirst("UserId")?.Value;
            if (string.IsNullOrEmpty(userId))
                return Unauthorized(new ApiResponse(401, "Unauthorized user.", new { IsSuccess = false }));

            var student = await _dbContext.Students.FirstOrDefaultAsync(s => s.AppUserId == userId);
            if (student == null)
                return NotFound(new ApiResponse(404, "Student not found.", new { IsSuccess = false }));

            List<Student> students = new List<Student>();
            
            if (student.Specialty == "CS")
                students = await _dbContext.Students.Include(s => s.AppUser).Where(s => s.TeamId == null && s.InTeam == false && (s.Specialty == "CS")).ToListAsync();
            else if (student.Specialty == "CS & MATH")
                students = await _dbContext.Students.Include(s => s.AppUser).Where(s => s.TeamId == null && s.InTeam == false && (s.Specialty == "CS & MATH")).ToListAsync();
            else if (student.Specialty == "CS & STAT")
                students = await _dbContext.Students.Include(s => s.AppUser).Where(s => s.TeamId == null && s.InTeam == false && (s.Specialty == "CS & STAT")).ToListAsync();
            else
                students = await _dbContext.Students.Include(s => s.AppUser).Where(s => s.TeamId == null && s.InTeam == false && (s.Specialty == "CS & PHYS")).ToListAsync();

            if (students == null || !students.Any())
                return NotFound(new ApiResponse(404, "Students not found.", new { IsSuccess = false }));

            var result = students.Select(s => new TeamMemberDto
            {
                Id = s.Id,
                FullName = s.FullName,
                Email = s.Email,
                Specialty = s.Specialty,
                InTeam = s.InTeam,
                ProfilePicture = s.AppUser.ProfilePicture,
            }).ToList();

            return Ok(new ApiResponse(200, "Students Without Teams found.", new { IsSuccess = true, Students = result }));
        }
    }
}
