-- Active: 1705563169667@@35.229.222.197@3306@flyfarLadiesExpress
CREATE TABLE flight_booking(
    id VARCHAR(100) COLLATE utf8mb4_general_ci PRIMARY  KEY,
    uId INT AUTO_INCREMENT UNIQUE,
    bookingRef   varchar(100)   null,
    pax          int            not null,
    booking_id   varchar(100)   not null,
    adultBag     varchar(50)    not null,
    deptFrom     varchar(50)    not null,
    arrivalTo    varchar(50)    not null,
    childBag     varchar(10)    not null,
    infantBag    varchar(10)    null,
    adultCount   int            not null,
    childCount   int            null,
    infantCount  int            null,
    currency     varchar(50)    null,
    status       varchar(100)   null,
    timeLimit    varchar(100)   null,
    airlinesPnr  varchar(50)    null,
    assignTime   varchar(50)    null,
    user_id      varchar(100) COLLATE utf8mb4_general_ci  null,
    remarks      varchar(500)   null,
    tripType     varchar(50)    null,
    bookingId    varchar(100)   null,
    airlinesName varchar(100)   null,
    journeyType  varchar(50)    null,
    amount       decimal(10, 2) null,
    isRefundable tinyint(1)     null,
    createdAt VARCHAR(25),
    Foreign Key (user_id) REFERENCES user(id) ON UPDATE CASCADE ON DELETE SET NULL
    )


    -- auto-generated definition
create table flight_passenger 
(
    id           varchar(100) COLLATE utf8mb4_general_ci not null primary key,
    uId          int auto_increment UNIQUE,
    user_id       varchar(100) COLLATE utf8mb4_general_ci null,
    paxId        varchar(20)   null,
    prefix       varchar(10)   null,
    firstName    varchar(50)   null,
    lastName     varchar(50)   null,
    dob          date          null,
    type         varchar(5)    null,
    passNation   varchar(5)    null,
    passNo       varchar(20)   null,
    passEx       date          null,
    phone        varchar(20)   null,
    email        varchar(50)   null,
    address      varchar(100)  null,
    gender       varchar(10)   null,
    passportCopy varchar(5000) null,
    visaCopy     varchar(5000) null,
    createdAt    datetime      null,
    updatedAt    datetime      null,
    booking_id   varchar(100)  null,
    remarks      varchar(500)  null,
    passenger_id varchar(100)  null,
    Foreign Key (user_id) REFERENCES user(id) ON UPDATE CASCADE ON DELETE SET NULL
);



create table flight_details(
    id         varchar(100)     COLLATE utf8mb4_general_ci        not null
        primary key,
    booking_id varchar(100)                       null,
    data       json                               null,
    user_id    varchar(100)    COLLATE utf8mb4_general_ci                   null,
    createdAt  datetime default CURRENT_TIMESTAMP null,
    Foreign Key (user_id) REFERENCES user(id) ON UPDATE CASCADE ON DELETE SET NULL
)


CREATE TABLE ledger(
    id varchar(100) COLLATE utf8mb4_general_ci not null primary key,
    uid INT AUTO_INCREMENT UNIQUE,
    wallet FLOAT DEFAULT(0.00),
    purchase FLOAT DEFAULT(0.00),
    withdraw FLOAT DEFAULT(0.00),
    createdAt VARCHAR(25),
    actionBy VARCHAR(100),
    updatedAt VARCHAR(25),
    user_id varchar(100) COLLATE utf8mb4_general_ci null,
    Foreign Key (user_id) REFERENCES user(id) ON UPDATE CASCADE ON DELETE SET NULL
)