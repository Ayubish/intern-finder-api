# Interview API Documentation

This document describes the Interview API endpoints for the Intern Finder application.

## Base URL
```
/api/interviews
```

## Authentication
All endpoints require authentication. Use the appropriate middleware:
- `verifyCompanyAccess` - For company-specific operations
- `verifyInternAccess` - For intern-specific operations  
- `verifyUser` - For general user operations

## Company Side APIs

### 1. Create Interview
**POST** `/companies/:companyId/jobs/:jobId/interviews`

Creates a new interview for a specific job and intern.

**Request Body:**
```json
{
  "internId": "string",
  "date": "2024-01-15T10:00:00Z",
  "type": "video",
  "location": "Zoom",
  "platform": "Zoom",
  "link": "https://zoom.us/j/123456789"
}
```

**Response:** `201 Created`
```json
{
  "id": "interview_id",
  "jobId": "job_id",
  "internId": "intern_id",
  "date": "2024-01-15T10:00:00Z",
  "type": "video",
  "location": "Zoom",
  "platform": "Zoom",
  "link": "https://zoom.us/j/123456789",
  "confirmed": false,
  "createdAt": "2024-01-10T12:00:00Z",
  "updatedAt": "2024-01-10T12:00:00Z",
  "job": { ... },
  "intern": { ... }
}
```

### 2. Get Company Interviews
**GET** `/companies/:companyId/interviews`

Retrieves all interviews for a specific company.

**Response:** `200 OK`
```json
[
  {
    "id": "interview_id",
    "jobId": "job_id",
    "internId": "intern_id",
    "date": "2024-01-15T10:00:00Z",
    "type": "video",
    "location": "Zoom",
    "platform": "Zoom",
    "link": "https://zoom.us/j/123456789",
    "confirmed": false,
    "createdAt": "2024-01-10T12:00:00Z",
    "updatedAt": "2024-01-10T12:00:00Z",
    "job": { ... },
    "intern": { ... }
  }
]
```

### 3. Get Job Interviews
**GET** `/companies/:companyId/jobs/:jobId/interviews`

Retrieves all interviews for a specific job within a company.

**Response:** `200 OK`
```json
[
  {
    "id": "interview_id",
    "jobId": "job_id",
    "internId": "intern_id",
    "date": "2024-01-15T10:00:00Z",
    "type": "video",
    "location": "Zoom",
    "platform": "Zoom",
    "link": "https://zoom.us/j/123456789",
    "confirmed": false,
    "createdAt": "2024-01-10T12:00:00Z",
    "updatedAt": "2024-01-10T12:00:00Z",
    "intern": { ... }
  }
]
```

### 4. Get Company Interview by ID
**GET** `/companies/:companyId/interviews/:id`

Retrieves a specific interview by ID for a company.

**Response:** `200 OK`
```json
{
  "id": "interview_id",
  "jobId": "job_id",
  "internId": "intern_id",
  "date": "2024-01-15T10:00:00Z",
  "type": "video",
  "location": "Zoom",
  "platform": "Zoom",
  "link": "https://zoom.us/j/123456789",
  "confirmed": false,
  "createdAt": "2024-01-10T12:00:00Z",
  "updatedAt": "2024-01-10T12:00:00Z",
  "job": { ... },
  "intern": { ... }
}
```

### 5. Update Interview
**PUT** `/interviews/:id`

Updates an existing interview.

**Request Body:**
```json
{
  "date": "2024-01-16T10:00:00Z",
  "type": "onsite",
  "location": "Company Office",
  "platform": null,
  "link": null
}
```

**Response:** `200 OK`
```json
{
  "id": "interview_id",
  "jobId": "job_id",
  "internId": "intern_id",
  "date": "2024-01-16T10:00:00Z",
  "type": "onsite",
  "location": "Company Office",
  "platform": null,
  "link": null,
  "confirmed": false,
  "createdAt": "2024-01-10T12:00:00Z",
  "updatedAt": "2024-01-10T12:00:00Z",
  "job": { ... },
  "intern": { ... }
}
```

### 6. Delete Interview
**DELETE** `/interviews/:id`

Deletes an interview.

**Response:** `204 No Content`

## Intern Side APIs

### 7. Get Intern Interviews
**GET** `/interns/:internId/interviews`

Retrieves all interviews for a specific intern.

**Response:** `200 OK`
```json
[
  {
    "id": "interview_id",
    "jobId": "job_id",
    "internId": "intern_id",
    "date": "2024-01-15T10:00:00Z",
    "type": "video",
    "location": "Zoom",
    "platform": "Zoom",
    "link": "https://zoom.us/j/123456789",
    "confirmed": false,
    "createdAt": "2024-01-10T12:00:00Z",
    "updatedAt": "2024-01-10T12:00:00Z",
    "job": {
      "id": "job_id",
      "title": "Software Engineer Intern",
      "company": { ... }
    }
  }
]
```

### 8. Get Interview by ID
**GET** `/interviews/:id`

Retrieves a specific interview by ID.

**Response:** `200 OK`
```json
{
  "id": "interview_id",
  "jobId": "job_id",
  "internId": "intern_id",
  "date": "2024-01-15T10:00:00Z",
  "type": "video",
  "location": "Zoom",
  "platform": "Zoom",
  "link": "https://zoom.us/j/123456789",
  "confirmed": false,
  "createdAt": "2024-01-10T12:00:00Z",
  "updatedAt": "2024-01-10T12:00:00Z",
  "job": {
    "id": "job_id",
    "title": "Software Engineer Intern",
    "company": { ... }
  },
  "intern": { ... }
}
```

### 9. Confirm Interview
**PATCH** `/interviews/:id/confirm`

Confirms or unconfirms an interview.

**Request Body:**
```json
{
  "confirmed": true
}
```

**Response:** `200 OK`
```json
{
  "id": "interview_id",
  "jobId": "job_id",
  "internId": "intern_id",
  "date": "2024-01-15T10:00:00Z",
  "type": "video",
  "location": "Zoom",
  "platform": "Zoom",
  "link": "https://zoom.us/j/123456789",
  "confirmed": true,
  "createdAt": "2024-01-10T12:00:00Z",
  "updatedAt": "2024-01-10T12:00:00Z",
  "job": {
    "id": "job_id",
    "title": "Software Engineer Intern",
    "company": { ... }
  },
  "intern": { ... },
  "message": "Interview confirmed successfully"
}
```

## Error Responses

### 400 Bad Request
```json
{
  "error": "Intern ID and date are required"
}
```

### 401 Unauthorized
```json
{
  "error": "Access Denied. No token provided."
}
```

### 403 Forbidden
```json
{
  "error": "Access Denied. You do not own this company."
}
```

### 404 Not Found
```json
{
  "error": "Interview not found or access denied"
}
```

### 409 Conflict
```json
{
  "error": "Interview already scheduled for this intern and job"
}
```

## Database Schema

The Interview model includes the following fields:
- `id`: Unique identifier
- `jobId`: Reference to the job
- `internId`: Reference to the intern
- `date`: Interview date and time
- `type`: Interview type (e.g., "video", "onsite", "phone")
- `location`: Physical location for onsite interviews
- `platform`: Platform for virtual interviews
- `link`: Meeting link for virtual interviews
- `confirmed`: Boolean indicating if the intern has confirmed
- `createdAt`: Creation timestamp
- `updatedAt`: Last update timestamp

## Notes

- All date fields should be in ISO 8601 format
- The `confirmed` field defaults to `false` when creating interviews
- Company users can only access interviews for jobs they own
- Intern users can only access their own interviews
- Interview confirmation is handled by the intern side
