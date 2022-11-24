# STRUCTURE CODE
![](structure-code.png)


# INSTALASI

- ```.env``` setup
```
    APP_NAME = Gembala App
    VERSION = 1.0.0

    DB_USERNAME = root
    DB_PASSWORD = 
    DB_HOSTNAME = localhost
    DB_NAME = sembadafarm_db
    DB_DIALECT = mariadb

    NODE_ENV = development

    URL = http://localhost:51009

    APP_PORT = 51009
```
- install dependency ``` npm i ```
- create new database 
- migrate database ``` npm run migrate ```
- run app ``` npm run dev ```


# DOC API POSTMAN

https://documenter.getpostman.com/view/16756766/2s83eyrcXr

# TODO

## Mobile

- [x] Dashboard aplikasi
- [x] Feature kandang
    - [x] Get ternak by kandang
- [x] Feature Ternak
    - [x] Filtering ternak
    - [x] Category ternak
    - [x] Detail ternak
    - [x] Update ternak
    - [x] Riwayat penyakit
    - [x] Grafik ADG 
- [x] Feature Kesehatan
    - [x] penyakit
    - [x] kesehatan
- [x] Feature Pakan
    - [x] Management bahan pakan
    - [x] Management pakan
- [x] Feature Perkawinan
    - [x] data perkawinan ternak
    - [x] riwayat perkawinan ternak
- [x] Lembar kerja
    - [x] Pemasukan 
        - [x] riwayat pemasukan ternak
        - [x] integration rfid
    - [x] Adaptasi
        - [x] Adaptasi 1
        - [x] Adaptasi 2
        - [x] Adaptasi 3
        - [x] Adaptasi 4
        - [x] Adaptasi 5
        - [x] Riwayat treatment ternak
    - [x] Perkawinan
        - [x] Create perkawinan
        - [x] Checking ternak perkawinan
        - [x] record riwayat perkawinan
        - [x] tracking status kebuntingan
    - [x] Kebuntingan
        - [x] record riwayat kwbuntingan ternak
        - [x] Check indukan if afkir
    - [x] Kelahiran
        - [x] add cempe ternak
        - [x] move indukan to lacatation fase
        - [x] Check indukan if afkir
    - [x] Lepas Sapih
        - [x] move ternak to lepas sepih fase
        - [x] move indukan to perkawinan fase
        - [x] ternak selection

## Dashboard 
