# alx-jobs


**Register New User**

```curl -X POST http://localhost:5000/api/v1/auth/register -H "Content-Type: application/json" -d '{ "email": "user2@app.com", "firstName": "MyfirstName", "lastName": "MylastName","password": "userpassword", "confirmPassword": "userpassword" }'
```
***Response***
```
{"success":true,"data":{"message":"Account created. Please verify your email."}}
```

**Verfiy New User**

```curl -X POST http://localhost:5000/api/v1/auth/verify-email -H "Content-Type: application/json" -d '{ "token": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6IjY3MGI1MmM3MWU3NjcyNDVmYzYxOTBlNSIsImlhdCI6MTcyODc5NTMzNSwiZXhwIjoxNzI4Nzk4OTM1fQ.2ZfGHW1nTM7FWwcoX3JL79wFv_r5JINbb9v3EDrvk44" }'
```
***Response***
```
{"success":true,"data":{"message":"Email verified successfully!"}}
```

***Login As a Verified User***
```curl -X POST http://localhost:5000/api/v1/auth/login -H "Content-Type: application/json" -d '{ "email": "user2@app.com","password": "userpassword" }'
```
***Response***
```
{"success":true,"data":{"token":"eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6IjY3MGI1MmM3MWU3NjcyNDVmYzYxOTBlNSIsInJvbGUiOiJ1c2VyIiwiaWF0IjoxNzI4Nzk4MDA4LCJleHAiOjE3Mjg3OTg2MDh9.LV03_riwA9mo1SZHwzS6mGupwnIBIPB79z9GXXzdNrw"}}
```

***Refresh Token for login user***
```curl -X POST http://localhost:5000/api/v1/auth/refresh \
--cookie "refreshToken=<refreshToken_cookie_value>"
```

***Usage of Refresh Token**
```
curl -X POST http://localhost:5000/api/v1/auth/refresh \
--cookie "refreshToken=eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6IjY3MGI1MmM3MWU3NjcyNDVmYzYxOTBlNSIsInJvbGUiOiJ1c2VyIiwiaWF0IjoxNzI4Nzk5OTQ4LCJleHAiOjE3Mjg4ODYzNDh9.BZyQW-quIEQ46A1IgzT93KVJqaZjCAneOGlULwG5FsE"
```
***Response***
```
{"success":true,"data":{"token":"eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6IjY3MGI1MmM3MWU3NjcyNDVmYzYxOTBlNSIsInJvbGUiOiJ1c2VyIiwiaWF0IjoxNzI4ODAwMDEwLCJleHAiOjE3Mjg4MDA2MTB9.YK-RdOqpu0hQrCIplpOY4vLVeE58u2ksjagMEgDWc0w"}}
```

***Forget Password***
```curl -X POST http://localhost:5000/api/v1/auth/forget-password -H "Content-Type: application/json" -d '{"email": "user2@app.com"}'
```
***Response***
```
{"success":true,"data":{"message":"If a user with that email is registered you will receive a password reset email"}}
```

***Reset Password***
```curl -X POST http://localhost:5000/api/v1/auth/reset-password -H "Content-Type: application/json" -d '{"email": "user2@app.com", "newPassword": "userpassword", "resetToken": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6IjY3MGI1MmM3MWU3NjcyNDVmYzYxOTBlNSIsInJvbGUiOiJ1c2VyIiwiaWF0IjoxNzI4ODA1MjUzLCJleHAiOjE3Mjg4MjMyNTN9.iYpqjgnzuFZwGpzEWGq7WEAyuO0CIu7ZsZcqnWl7l7o" }' 
```
***Response***
```
{"success":true,"data":{"message":"Password has been reset successfully"}}
```

***Login***
```curl -X POST http://localhost:5000/api/v1/auth/login -H "Content-Type: application/json" -d '{ "email": "user2@app.com","password": "userpassword" }'
```
**Response**
```
{"success":true,"data":{"token":"eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6IjY3MGI1MmM3MWU3NjcyNDVmYzYxOTBlNSIsInJvbGUiOiJ1c2VyIiwiaWF0IjoxNzI4ODE5ODMyLCJleHAiOjE3Mjg4MjA0MzJ9.HQm4rw1OYJW26Lu5jEIjlwrBJ2aObcSjT9DeedD9FEY"}}
```

***Update Password***
```curl -X POST \
  http://localhost:5000/api/v1/auth/update-password \
  -H "Authorization: Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6IjY3MGI1MmM3MWU3NjcyNDVmYzYxOTBlNSIsInJvbGUiOiJ1c2VyIiwiaWF0IjoxNzI4ODIwNDc1LCJleHAiOjE3Mjg4MjEwNzV9.gfT_p1v64K-NC2koI7Qrioo069j0fZ956lJf_S-J7qc" \
  -H "Content-Type: application/json" \   
  -d '{                                
        "currentPassword": "userpassword",
        "newPassword": "newPassword456"
      }'
```
**Response**
```
{"success":true,"data":{"message":"Password updated successfully"}}
```