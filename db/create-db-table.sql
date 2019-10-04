/*
Evvela postgres kullanıcısıyla login olun.
E-) First login with postgres.
$ sudo su - postgres
Sonra psql'i çalıştırın.
E-) Then run psql.
$ psql
*/

/* 
"u_api" Veritabanı kullanıcısını oluşturun. Ve veritabanı oluşturma yetkisi verin.
E-) Create the "u_api" database user. And authorize database creation.
*/
CREATE ROLE u_api WITH LOGIN PASSWORD 'şifreMGİzli';
ALTER ROLE u_api CREATEDB;
/*

Ardından "psql" yazılımından "\q" komutuyla çıkış yapın. "u_api" veritabanı kullanıcısı ile "psql" yazılımını çalıştırın.
E-) Then exit "psql" with the command "\ q". Run "psql" with the "u_api" database user.
$ psql -d postgres -U u_api
*/
/*
"db_api" İsimli veritabanını oluşturunuz.
E-) Create the database named "db_api".
*/
CREATE DATABASE db_api WITH OWNER u_api TEMPLATE template0 ENCODING 'UTF-8' LC_COLLATE 'tr_TR.UTF-8' LC_CTYPE = 'tr_TR.UTF-8';
--drop table Kullanicilar;
drop table users;
/*
"Kullanıcılar" tablosunu oluşturun.
E-) Create the "Kullanicilar" table.
*/
CREATE TABLE Kullanicilar (
  OKytNo SERIAL PRIMARY KEY,
  Isim VarChar(30) Not Null,
  Soyisim VarChar(30) Not Null,
  Email VarChar(100) Not Null
);
/*
Tabloya birkaç satır veri ekleyin.
E-) Add several rows of data to the table.
*/
INSERT INTO
  Kullanicilar (Isim, Soyisim, Email)
Values
  ('Bekir', 'SADIK', 'bekir.sadik@evrak.gen.tr'),
  ('Ömer', 'ADİL', 'omer.adil@evrak.gen.tr'),
  ('Osman', 'NUR', 'osman.nur@evrak.gen.tr'),
  ('Ali', 'ALİM', 'ali.alim@evrak.gen.tr');
  /*
  Verileri sorgulayın.
  E-) Query the data.
  */
select
  *
from
  Kullanicilar;