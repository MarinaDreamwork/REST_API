### Method: POST /signin
request body should include this fileds:
```json
{
  "email": "a@gmail.com",
  "password": "ABCdef123",
  "nickname": "abc"
}
```

![#f03c15](https://via.placeholder.com/15/f03c15/f03c15.png) Field **email** should be in email format or server will return an error:
```json
{ 
  "error": [
    {
      "value": "hostel",
      "msg": "Email format is not correct",
      "param": "email",
      "location": "body"
    }
  ] 
}
```

![#f03c15](https://via.placeholder.com/15/f03c15/f03c15.png) Field **email** should be unique or server will return an error:
```json
{
  "error": {
    "message": "EMAIL_EXISTS",
    "code": 400
  }
}
```

![#f03c15](https://via.placeholder.com/15/f03c15/f03c15.png) Field **password** should include at least one uppercase letter, one number, minimum - 8 chars at length or server will return an error:
```json
{ 
  "error": [
    {
      "value": "jhdgjdsh",
      "msg": "Password should have at least one number",
      "param": "password",
      "location": "body"
    }
  ] 
}
```

![#f03c15](https://via.placeholder.com/15/f03c15/f03c15.png) Field **nickname** should not be empty or server will return an error:
```json
 { 
  "error": [
    {
      "value": "",
      "msg": "Nickname should not be empty",
      "param": "nickname",
      "location": "body"
    }
  ] 
}
```

 ![#f03c15](https://via.placeholder.com/15/f03c15/f03c15.png) Field **nickname** should be unique or server will return an error:
 ```json
 {
  "error": {
    "message": "NICKNAME_EXISTS",
    "code": 400
  }
}   
```

![#c5f015](https://via.placeholder.com/15/c5f015/c5f015.png) Success response:
Status: 201
response body: 

```json
{
  "token": "ddbfvkdjzfvkjzbdf554dfznfds,jh",
  "expire": 1800
}
```
### Method: POST /login
request body should include this fileds:
```json
{
  "email": "a@gmail.com",
  "password": "ABCdef123"
}
```

![#f03c15](https://via.placeholder.com/15/f03c15/f03c15.png) Field **email** should be the same as was in signing in or server will return an error:
```json
{
  "error": {
    "message": "EMAIL_NOT_FOUND",
    "code": 400
  }
}
```
![#f03c15](https://via.placeholder.com/15/f03c15/f03c15.png) Field **password** should be the same as was in signing in or server will return an error:
```json
{
  "error": {
    "message": "INVALID_PASSWORD",
    "code": 400
  }
}
```
![#c5f015](https://via.placeholder.com/15/c5f015/c5f015.png) Success response:
Status: 201
response body: 

```json
{
  "token": "ddbfvkdjzfvkjzbdf554dfznfds,jh",
  "expire": 1800
}
```

### Method: POST /token
request body should include this fileds:
```json
{
  "token": "ddbfvkdjzfvkjzbdf554dfznfds,jh",
  "expire": 1800
}
```
![#f03c15](https://via.placeholder.com/15/f03c15/f03c15.png) Field **token** should be the same as is in base and equal to the secret token in app environment or server will return an error:
```json
{
  "error": {
    "message": "Unauthorized",
    "code": 400
  }
}
```
![#c5f015](https://via.placeholder.com/15/c5f015/c5f015.png) Success Response:
Status: 201
response body: 

```json
{
  "token": "ddbfvkdjzfvkjzbdf554dfznfds,jh",
  "expire": 1800
}
```

### Method: POST /logout
Request header should have such format:
Authorization: "Bearer dvdalkjvhaskjhdfh;SLKDVK;JDSVK.DSJ"

if user is not authorized server will send an error:

```json
{
  "error": {
    "message": "Unauthorized",
    "code": 400
  }
}
```

![#c5f015](https://via.placeholder.com/15/c5f015/c5f015.png) Success response:
Status: 200
response body: null
User token will be deleted in service base

### Method: GET /user
Request header should have such format:
Authorization: "Bearer dvdalkjvhaskjhdfh;SLKDVK;JDSVK.DSJ"

if user is not authorized server will send an error:

```json
{
  "error": {
    "message": "Unauthorized",
    "code": 400
  }
}
```

![#c5f015](https://via.placeholder.com/15/c5f015/c5f015.png) Success response:
Status: 200
response body: 

```json
{
  "email": "a@gmail.com",
  "nickname": "alice",
  "tags": [
    {
      "id": "id",
      "name": "example",
      "sortorder": "0" 
    }
  ]
}
```
### Method: PUT /user
Request header should have such format:
Authorization: "Bearer dvdalkjvhaskjhdfh;SLKDVK;JDSVK.DSJ"

if user is not authorized server will send an error:

```json
{
  "error": {
    "message": "Unauthorized",
    "code": 400
  }
}
```
request body should include this fileds:
```json
{
  "email": "a@gmail.com",
  "password": "ABCdef123",
  "nickname": "example"
}
```

![#f03c15](https://via.placeholder.com/15/f03c15/f03c15.png) Field **email** should be in email format or server will return an error:
```json
{ 
  "error": [
    {
      "value": "hostel",
      "msg": "Email format is not correct",
      "param": "email",
      "location": "body"
    }
  ] 
}
```

![#f03c15](https://via.placeholder.com/15/f03c15/f03c15.png) Field **email** should be unique or server will return an error:
```json
{
  "error": {
    "message": "EMAIL_EXISTS",
    "code": 400
  }
}
```

![#f03c15](https://via.placeholder.com/15/f03c15/f03c15.png) Field **password** should include at least one uppercase letter, one number, minimum - 8 chars at length or server will return an error:
```json
{ 
  "error": [
    {
      "value": "jhdgjdsh",
      "msg": "Message of an particular error",
      "param": "password",
      "location": "body"
    }
  ] 
}
```

![#f03c15](https://via.placeholder.com/15/f03c15/f03c15.png) Field **nickname** should not be empty or server will return an error:
```json
 { 
  "error": [
    {
      "value": "",
      "msg": "Nickname should not be empty",
      "param": "nickname",
      "location": "body"
    }
  ] 
}
```

 ![#f03c15](https://via.placeholder.com/15/f03c15/f03c15.png) Field **nickname** should be unique or server will return an error:
 ```json
 {
  "error": {
    "message": "NICKNAME_EXISTS",
    "code": 400
  }
}   
```

![#c5f015](https://via.placeholder.com/15/c5f015/c5f015.png) Success response:
Status: 200
response body: 

```json
{
  "email": "a@gmail.com",
  "nickname": "alice"
}
```
### Method: DELETE /user
Request header should have such format:
Authorization: "Bearer dvdalkjvhaskjhdfh;SLKDVK;JDSVK.DSJ"

if user is not authorized server will send an error:

```json
{
  "error": {
    "message": "Unauthorized",
    "code": 400
  }
}
```
![#c5f015](https://via.placeholder.com/15/c5f015/c5f015.png) Success response:
Status: 200
response body: null

This case will be deleted token and then user.

### Method: POST /tag
Request header should have such format:
Authorization: "Bearer dvdalkjvhaskjhdfh;SLKDVK;JDSVK.DSJ"

if user is not authorized server will send an error:

```json
{
  "error": {
    "message": "Unauthorized",
    "code": 400
  }
}
```
request body should include this fileds:
```json
{
  "name": "example",
  "sortorder": "0"
}
```

![#f03c15](https://via.placeholder.com/15/f03c15/f03c15.png) Field **name** should not be more than 40 chars or server will return an error:
```json
 { 
  "error": [
    {
      "value": "sdfdgsfhfhhfyfyumyiutyui...",
      "msg": "Max length is 40 chars",
      "param": "nickname",
      "location": "body"
    }
  ] 
}
```
![#f03c15](https://via.placeholder.com/15/f03c15/f03c15.png) Field **name** should be unique or server will return an error:
```json
{
  "error": {
    "message": "TAG_NAME_EXISTS",
    "code": 400
  }
}
```
![#c5f015](https://via.placeholder.com/15/c5f015/c5f015.png) Success response:
Status: 200
response body:
```json
{
  "id": "id",
  "name": "example",
  "sortorder": "0"
}
```

### Method: GET /tag/{id}
Request header should have such format:
Authorization: "Bearer dvdalkjvhaskjhdfh;SLKDVK;JDSVK.DSJ"

if user is not authorized server will send an error:

```json
{
  "error": {
    "message": "Unauthorized",
    "code": 400
  }
}
```
![#c5f015](https://via.placeholder.com/15/c5f015/c5f015.png) Success response:
Status: 200
response body:
```json
{
  "creator": {
    "nickname": "nickname",
    "uid": "creator-UID"
  },
  "name": "example",
  "sortorder": "0"
}
```
### Method: GET /tag?sortOrder&sortByName&page=1&pageSize=2
Request header should have such format:
Authorization: "Bearer dvdalkjvhaskjhdfh;SLKDVK;JDSVK.DSJ"

if user is not authorized server will send an error:

```json
{
  "error": {
    "message": "Unauthorized",
    "code": 400
  }
}
```
Query params **sortOrder**, **sortByName**, **page** and **pageSize** are optional

![#c5f015](https://via.placeholder.com/15/c5f015/c5f015.png) Success response:
Status: 200
response body:
```json
{
  "data": [
    {
      "creator": {
        "nickname": "nickname",
        "uid": "creator-UID"
      },
      "name": "example",
      "sortorder": "0"
    },
    {
      "creator": {
        "nickname": "nickname",
        "uid": "creator-UID"
      },
      "name": "example",
      "sortorder": "0"
    }
  ],
  "meta": {
    "page": "1",
    "pageSize": "2",
    "quantity": 10 
  }
}
```
### Method: PUT /tag/{id}
Request header should have such format:
Authorization: "Bearer dvdalkjvhaskjhdfh;SLKDVK;JDSVK.DSJ"

if user is not authorized server will send an error:

```json
{
  "error": {
    "message": "Unauthorized",
    "code": 400
  }
}
```
request body should include this fileds:
```json
{
  "name": "example",
  "sortorder": "0"
}
```
Fields **name** and **sortOrder** are optional

![#c5f015](https://via.placeholder.com/15/c5f015/c5f015.png) Success response:
Status: 200
response body:
```json
{
  "creator": {
    "nickname": "example",
    "uid": "creator-UID"
  },
  "name": "example",
  "sortorder": "0"
}
```

### Method: DELETE /tag/{id}
Request header should have such format:
Authorization: "Bearer dvdalkjvhaskjhdfh;SLKDVK;JDSVK.DSJ"

if user is not authorized server will send an error:

```json
{
  "error": {
    "message": "Unauthorized",
    "code": 400
  }
}
```

![#c5f015](https://via.placeholder.com/15/c5f015/c5f015.png) Success response:
Status: 200
response body: null

### Method: POST /user/tag
Request header should have such format:
Authorization: "Bearer dvdalkjvhaskjhdfh;SLKDVK;JDSVK.DSJ"

if user is not authorized server will send an error:

```json
{
  "error": {
    "message": "Unauthorized",
    "code": 400
  }
}
```
request body should include this fileds:
```json
{
  "tags": [1, 2]
}
```
If id of tags in array in request body are present in DB using an atomic operation, all of them will add to user.
Otherwise, nothing will be added.

![#c5f015](https://via.placeholder.com/15/c5f015/c5f015.png) Success response:
Status: 200
response body:
```json
{
  "tags": [
    {
      "id": 1,
      "name": "example",
      "sortorder": "0"
    },
    {
      "id": 2,
      "name": "example",
      "sortorder": "0"
    }
  ]
}
```
### Method: DELETE /user/tag/{id}
Request header should have such format:
Authorization: "Bearer dvdalkjvhaskjhdfh;SLKDVK;JDSVK.DSJ"

if user is not authorized server will send an error:

```json
{
  "error": {
    "message": "Unauthorized",
    "code": 400
  }
}
```
![#c5f015](https://via.placeholder.com/15/c5f015/c5f015.png) Success response:
Status: 200
response body: null

### Method: GET /user/tag/my
Request header should have such format:
Authorization: "Bearer dvdalkjvhaskjhdfh;SLKDVK;JDSVK.DSJ"

if user is not authorized server will send an error:

```json
{
  "error": {
    "message": "Unauthorized",
    "code": 400
  }
}
```
![#c5f015](https://via.placeholder.com/15/c5f015/c5f015.png) Success response:
Status: 200
response body:
```json
{
  "tags": [
    {
      "id": 1,
      "name": "example",
      "sortorder": "0"
    },
    {
      "id": 2,
      "name": "example",
      "sortorder": "0"
    }
  ]
}
```