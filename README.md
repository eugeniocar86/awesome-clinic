# Awesome-Clinic

Dockerized Django Back-end API with Angular Front-end, and simple JWT authentication for appointment management Awesome Clinic.

Used tecnologies
* Django 2.2
* Django Rest Framework 3.10
* Angular 12.2.4
* Docker engine 20.10.7
* PosgreSQL

## Run Demo Deployed on EC2
http://ec2-18-221-2-241.us-east-2.compute.amazonaws.com:8080/


## Installation

In root directory run
```bash
docker-compose up
```

Make sure every dependency is correctly installed 
/django/requirements.txt


## Database migrations
With docker instance running run the following: 
```bash
docker exec -it dj bash
python manage.py makemigrations
python manage.py migrate
```

## Dummy Data
For create dummy data consume the API service (POST) /dummy-data/: 


## Usage
### Angular app
For running locally navigate to /angular/awclinic-app/ and run:
```bash
ng serve 
```
Now go to http://localhost:4200 with default port

### Django API
For running locally navigate to /django/ and run:
```bash
python manage.py runserver 0.0.0.0:80
```

### Default ports
Frontend is running by :8080 port
Backend is running at development server by port 80 

