## Base API url [https://rest-api-backend-app.herokuapp.com/]
## This App was implemented with Node.js, Express.js, PostgreSql
### If you want to install this app in your localhost:
1. clone this repository and add .env file for your secret data;
2. Define environment valiable for the port for the server listening (PORT);
3. Add environment valiables data for your Postgres DB (DB_HOST, DB_NAME, DB_USER, DB_PASSWORD);
4. For creating jwt-tokens define secret token as TOKEN in your .env file;
5. For the development mode use command ```npm run serve```
6. For the production mode use command ```npm run prod-deploy```

### If you want to try with deployed app
1. Base URL is [https://rest-api-backend-app.herokuapp.com/];
2. Use methods and instructions below for response data:

| Method | TAGS | Description |
| ------ | ------ | ------ |
| POST | /signin | Sign up new user |
| POST | /login | Log in existed user |
| POST | /token | Update token |
| POST | /logout | Delete token and user from service |
| GET | /user | Get authorized user info |
| PUT | /user | Update authorized user info |
| DELETE | /user | Remove user token and user |
| POST | /tag | Add tag by authorized user |
| GET | /tag/{id} | Receiving tag by id by authorized user |
| GET | /tag?sortByName&sortOrder&page=1&pageSize | Get tag with optional params - sorting by name or sortorder and using page crops by authorized user |
| PUT | /tag/{id} | Update tag by id by authorized user |
| DELETE | /tag/{id} | Remove tag by id by authorized user |
| POST | /user/tag | Post existed in tags in given range to authorized user |
| DELETE | /user/tag/{id} | Remove tag from authorized user by id |
| GET | /user/tag/my | Receiving all authorized user tags |

#### Method: POST /signin
request body should include this fileds:
```json
{
  email: "a@gmail.com",
  password: "ABCdef123",
  nickname: "abc"
}
```

![#f03c15](https://via.placeholder.com/15/f03c15/f03c15.png) Field **email** should be in email format or server will return an error:
```json
{ 
  error: [
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
  error: {
    message: 'EMAIL_EXISTS',
    code: 400
  }
}
```

![#f03c15](https://via.placeholder.com/15/f03c15/f03c15.png) Field **password** should include at least one uppercase letter, one number, minimum - 8 chars at length or server will return an error:
```json
{ 
  error: [
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
  error: [
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
  error: {
    message: 'NICKNAME_EXISTS',
    code: 400
  }
}   
```

![#c5f015](https://via.placeholder.com/15/c5f015/c5f015.png) Success response:
Status: 201
response body: 

```json
{
  token: "ddbfvkdjzfvkjzbdf554dfznfds,jh",
  expire: 1800
}
```
