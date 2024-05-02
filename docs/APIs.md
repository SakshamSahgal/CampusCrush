
# ALL APIs interacting with the Server

| Sr.No | Endpoints      | Request Method | Required Parameters                                                   |
| ----- | -------------- | -------------- | --------------------------------------------------------------------- |
| 1.    | /RegisterEmail | `POST`         | ```{ email }```                                                       |
| 2.    | /validateOTP   | `POST`         | ```{ email, otp, birthday, batch, name, campus, gender, password }``` |
| 3.    | /login         | `POST`         | ```{ email, password }```                                             |

