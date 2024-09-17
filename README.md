## TaleVault-Frontend
### Overview 
A web-based project is built to manage and display a diverse collection of stories, offering users an intuitive and immersive platform to explore, organize, and enjoy various narrative content.

### Team Members
- Hồ Minh Nhựt ([Kaito](https://github.com/Kaito0506))
- Nguyễn Thị Diễm My ([Minhify](https://github.com/minhify))
---

### Setup and Installation
After pulling the backend code, run the following commands to install the necessary dependencies:
```sh
npm install --save
npm i knex mysql
npm i express-session
```
#### Setup .env file
Create and configure the .env file with the following content
```sh
PORT=3000

DB_HOST="localhost"
DB_PORT=3306
DB_USER="root"
DB_PASS="your-password"
DB_NAME="your-database-name"

SESSION_SECRET="your-secret-key"
```

**To start server, using command**: ``npm start ``

