-- Create a new database if it does not already exist
CREATE DATABASE IF NOT EXISTS uni_db;
USE uni_db;

-- Create the table if it does not already exist
CREATE TABLE IF NOT EXISTS STUDENTS (
    id varchar(15) PRIMARY KEY,
    student_name VARCHAR(50) NOT NULL,
    cgpa DECIMAL(3,2) NOT NULL,
    age INTEGER NOT NULL
);


INSERT INTO STUDENTS (id, student_name, cgpa, age) VALUES
('22010248', 'Marwan Mohamed Hussien', 3.3, 20),
('22010002', 'Ahmed Alaaeldin Ismail', 3.6, 19),
('22011600', 'Hassan Ahmed Mohamed', 3.4, 20),
('22011534', 'Omar Essam El-Saied', 3.2, 21),
('20221370967', 'Seif El-Deen Hany Mohamed', 3.5, 21)
