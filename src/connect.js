import mysql from 'mysql2';

//SELECT note from notes
export function connect() {  //funkcija kuri sukuria prisijungima
    return mysql.createConnection({
        host: 'localhost',
        port: 3306,
        user: 'todoapp',
        password: 'bit',
        database: 'todoapp'
    });
}