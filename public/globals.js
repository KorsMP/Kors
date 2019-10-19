var domain_url = ['http://front-end ip:3000']
/* More domains can be added to the above array by seperating with comma */

var db_host = "localhost"
var db_port = 3306
var db_user = "root"
var db_password = "root"
var db_name = "kors"
var dialect = "mysql"

var secret_sessionKey = "whiskey"

module.exports = { domain_url, db_host, db_port, db_user, db_password, db_name, secret_sessionKey, dialect }