## Base API url []

| Method | TAGS | Description |
| ------ | ------ | ------ |
| POST | /signin | Sign up new user |
| POST | /login | Log in existed user |
| POST | /token | Update token |
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
