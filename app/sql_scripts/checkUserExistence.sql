-- Checks if username and password already exist in DB
SELECT COUNT(*) as count FROM user WHERE userName = %s AND password = %s;