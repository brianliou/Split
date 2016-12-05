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

## BillAuthor
column name     | data type | details
----------------|-----------|-----------------------
id              | integer   | not null, primary key
user_id         | integer   | not null, foreign key (references users), indexed
amount          | integer   | not null
description     | string    | not null
date            | date      | not null

## BillRecipient

column name     | data type | details
----------------|-----------|-----------------------
id              | integer   | not null, primary key
user_id         | integer   | not null, foreign key (references users), indexed
bill_id         | integer   | not null, foreign key (references bills), indexed
paid            | boolean   | not null
amount          | integer   | not null
description     | string    | not null
date            | date      | not null


## Bills

column name     | data type | details
----------------|-----------|-----------------------
id              | integer   | not null, primary key
author_id       | integer   | not null, foreign key (references BillAuthor), indexed
recipient_id    | integer   | not null, foreign key (references BillRecipient), indexed
recipient_id    | integer   | foreign key (references BillRecipient), indexed
recipient_id    | integer   | foreign key (references BillRecipient), indexed
recipient_id    | integer   | foreign key (references BillRecipient), indexed
recipient_id    | integer   | foreign key (references BillRecipient), indexed
recipient_id    | integer   | foreign key (references BillRecipient), indexed
recipient_id    | integer   | foreign key (references BillRecipient), indexed


paid            | boolean   | not null
amount          | integer   | not null
description     | string    | not null
date            | date      | not null

<!-- I'm unsure how to store a bill split with multiple people in the database
     should it just be multiple rows in the bills table? Or should I have like
     a split table? -->
