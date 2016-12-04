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
user_first_id  | integer   | not null, foreign key (references users), indexed
user_second_id | integer   | not null, foreign key (references users), indexed

## bills
column name     | data type | details
----------------|-----------|-----------------------
id              | integer   | not null, primary key
user_id         | integer   | not null, foreign key (references users), indexed
charged_user_id | integer   | not null, foreign key (references users), indexed
amount          | integer   | not null
paid            | boolean   | not null
