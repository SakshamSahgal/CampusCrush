# How To Run Docker Container Locally

`NOTE` : Make sure you have`Docker` installed

1. To `Build` and `run` the docker image paste this in one line - 

```

docker build
 --build-arg PORT=8080
 --build-arg CORS_ORIGIN=*
 --build-arg DB_USERNAME=<username>
 --build-arg DB_PASSWORD=<password>
 --build-arg DB_NAME=<dbname>
 --build-arg NodeMailerEmail=<email>
 --build-arg NodeMailerPassword=<password>
 --build-arg OTP_LENGTH=6
 --build-arg OTP_VALIDATION_DURATION_IN_MINUTES=5
 --build-arg JWT_SECRET_KEY=<secret>
 --build-arg HOST=http://localhost:8080
 --build-arg PING_BOT_DURATION_IN_MINUTES=5
 -t testimage . ; docker run -p 8080:8080 testimage
 
```

3. You can then access the web-app from `http://localhost:8080/`
4. In production the Host value is replaced by actual URL.
