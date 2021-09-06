# Awesome-Clinic

Dockerized Django Back-end API with Angular Front-end, and simple JWT authentication for appointment management Awesome Clinic.

Used tecnologies
* Django 2.2
* Django Rest Framework 3.10
* Angular 12.2.4
* Docker engine 20.10.7
* PosgreSQL


## Installation

Navigating to /django folder run

```bash
docker build .
```

Navigating to /angular folder run

```bash
docker build .
```

In root directory run
```bash
docker-compose up
```

Make sure every dependency is correctly installed 
/django/requirements.txt

if not run the following, with docker instance running: 
```bash
docker exec -it dj bash
pip install *dependency-name*
```

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

### Default ports
Frontend is running by :8080 port
Backend is running at development server by port 80 
```




