-- Creating the schema and the master user
CREATE SCHEMA IF NOT EXISTS masterSchema;
CREATE USER "hillash" WITH LOGIN NOSUPERUSER INHERIT CREATEDB NOCREATEROLE NOREPLICATION;
ALTER USER "hillash" WITH password 'H35iaUstXA3s';
GRANT ALL ON SCHEMA masterSchema TO "hillash";
ALTER USER "hillash" SET search_path = masterSchema;

-- Creating the Table
drop table testUsers;
create type role ('admin', 'case_manager', 'therapist');
create table testUsers (
id serial primary key,
full_name varchar(40) not null,
email varchar(80) not null,
password varchar(12) not null,
role role,
registered_at timestamptz default now());

-- Inserting testUsers dummy data
insert into testusers (full_name, email, password, role)
values ('גברת קראבאפל', 'mrs.cra@gmail.com', '123456', 'admin'),
('מגי סימפסון', 'mag.sim@gmail.com', '123456', 'case_manager'),
('ליסה סימפסון', 'lis.sim@gmail.com', '123456', 'case_manager'),
('בארט סימפסון', 'bar.sim@gmail.com', '123456', 'therapist'),
('מארג'' סימפסון', 'mar.sim@gmail.com', '123456', 'therapist')
