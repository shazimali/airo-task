# Airo Task

Coding Challenge

## Backend server

Run `cd backend`

Run `docker-compose up -d`

onse project all images installed and go in their running state, so now we need to install componser, for this we need to go in backend image, then we are able to run composer command

Run `docker exec -it backend-backend-1 bash` 

Run `composer install`

Run `php artisan migrate`

Now we can access our API's on this url http://localhost:8000/api

For phpmyadmin http://localhost:8001/

phpmyadmin credentials are described below

Server: mysql

Username:root

password:root

## Frontend

Run `cd ..`

Run `cd frontend`

Run `npm install`

Run `ng serve --o`

Now we can access our frontend on this url http://localhost:4200


