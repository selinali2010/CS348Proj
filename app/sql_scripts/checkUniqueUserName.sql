-- Checks if username is already used
SELECT COUNT(*) as count FROM user WHERE userName = %s;