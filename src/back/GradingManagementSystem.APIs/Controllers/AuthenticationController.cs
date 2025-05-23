﻿using GradingManagementSystem.Core.CustomResponses;
using GradingManagementSystem.Core.DTOs;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;
using IAuthenticationService = GradingManagementSystem.Core.Services.Contact.IAuthenticationService;

namespace GradingManagementSystem.APIs.Controllers
{
    // This class handles HTTP requests and responses
    [Route("api/Auth")]
    [ApiController]
    public class AuthenticationController : ControllerBase
    {
        private readonly IAuthenticationService _authService;

        public AuthenticationController(IAuthenticationService authService)
        {
            _authService = authService;
        }

        // Finished / Tested
        // Student Registration/Creation Flow/Logic
        [HttpPost("StudentRegister")]
        public async Task<IActionResult> StudentRegister([FromForm] StudentRegisterDto model)
        {
            if (model is null)
                return BadRequest(new ApiResponse(400, "Invalid input data.", new { IsSuccess = false }));
        
            var result = await _authService.RegisterStudentAsync(model);

            if (result.StatusCode == 400)
                return BadRequest(result);
            if (result.StatusCode == 401)
                return Unauthorized(result);
            if (result.StatusCode == 404)
                return NotFound(result);

            return Ok(result);
        }

        // Finished / Tested
        // Doctor Registration Flow
        [HttpPost("DoctorRegister")]
        [Authorize(Roles = "Admin")]
        public async Task<IActionResult> DoctorRegister([FromBody] DoctorRegisterDto model)
        {
            if (model is null)
                return BadRequest(new ApiResponse(400, "Invalid input data.", new { IsSuccess = false }));

            var result = await _authService.RegisterDoctorAsync(model);

            if (result.StatusCode == 400)
                return BadRequest(result);
            if (result.StatusCode == 401)
                return Unauthorized(result);
            if (result.StatusCode == 404)
                return NotFound(result);

            return Ok(result);
        }

        // Finished / Tested
        // User Login Flow
        [HttpPost("Login")]
        public async Task<IActionResult> Login([FromBody] LoginDto model)
        {
            if (model is null)
                return BadRequest(new ApiResponse(400, "Invalid input data.", new { IsSuccess = false }));

            var result = await _authService.LoginAsync(model);

            if (result.StatusCode == 400)
                return BadRequest(result);
            if (result.StatusCode == 401)
                return Unauthorized(result);
            if (result.StatusCode == 404)
                return NotFound(result);
            return Ok(result);
        }

        // Finished / Tested
        // User ForgetPassword Flow
        [HttpPost("ForgetPassword")]
        public async Task<IActionResult> ForgetPassword([FromBody] ForgetPasswordDto model)
        {
            if (model is null)
                return BadRequest(new ApiResponse(400, "Invalid input data.", new { IsSuccess = false }));

            var result = await _authService.ForgetPasswordAsync(model);

            if (result.StatusCode == 400)
                return BadRequest(result);
            if (result.StatusCode == 401)
                return Unauthorized(result);
            if (result.StatusCode == 404)
                return NotFound(result);

            return Ok(result);
        }

        // Finished / Tested
        // User ResetPassword Flow
        [HttpPost("ResetPassword")]
        public async Task<IActionResult> ResetPassword([FromBody] ResetPasswordDto model)
        {
            if (model is null)
                return BadRequest(new ApiResponse(400, "Invalid input data.", new { IsSuccess = false }));

            var result = await _authService.ResetPasswordAsync(model);

            if (result.StatusCode == 400)
                return BadRequest(result);
            if (result.StatusCode == 401)
                return Unauthorized(result);
            if (result.StatusCode == 404)
                return NotFound(result);

            return Ok(result);
        }

        // Finished / Tested
        // Student Email Verification Flow
        [HttpPost("EmailVerificationByOtp/{otpCode}")]
        public async Task<IActionResult> VerifyEmailByOTP(string otpCode)
        {
            if (string.IsNullOrEmpty(otpCode))
                return BadRequest(new ApiResponse(400, "Invalid input data.", new { IsSuccess = false }));

            var result = await _authService.VerifyEmailByOTPAsync(otpCode);

            if (result.StatusCode == 400)
                return BadRequest(result);
            if (result.StatusCode == 401)
                return Unauthorized(result);
            if (result.StatusCode == 404)
                return NotFound(result);

            return Ok(result);
        }

        // Finished / Tested
        // Resend OTP Code Verification Flow
        [HttpPost("ResendOtp/{studentEmail}")]
        public async Task<IActionResult> ResendOtpCodeVerification(string studentEmail)
        {
            if(string.IsNullOrEmpty(studentEmail))
                return BadRequest(new ApiResponse(400, "Invalid input data.", new {IsSuccess = false }));

            var result = await _authService.ResendOtpAsync(studentEmail);

            if (result.StatusCode == 400)
                return BadRequest(result);
            if (result.StatusCode == 401)
                return Unauthorized(result);
            if (result.StatusCode == 404)
                return NotFound(result);

            return Ok(result);
        }
    }
}
