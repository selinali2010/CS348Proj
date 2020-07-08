-- Checks if username and password already exist in DB
SELECT userId 
FROM user 
WHERE userName = %s AND password = %s;