# Schema Information

## users
column name     | data type | details
----------------|-----------|-----------------------
id              | integer   | not null, primary key
username        | string    | not null, indexed, unique
email           | string    | not null, indexed, unique
password_digest | string    | not null
session_token   | string    | not null, indexed, unique

## UserRelationship
column name    | data type | details
---------------|-----------|--------------
id             | integer   | not null, primary key
user_id        | integer   | not null, foreign key (references users), indexed
friend_id      | integer   | not null, foreign key (references users), indexed


## BillSplits

column name     | data type | details
----------------|-----------|-----------------------
id              | integer   | not null, primary key
bill_id         | integer   | not null, foreign key (references Bills), indexed
author_id       | integer   | not null, foreign key (references Users), indexed
recipient_id    | integer   | not null, foreign key (references Users), indexed
paid            | boolean   | default value of false

## Bills

column name     | data type | details
----------------|-----------|-----------------------
id              | integer   | not null, primary key
amount          | integer   | not null
description     | string    | not null
date            | date      | not null
paid            | boolean   | default value of false
