var domain_url = ['http://localhost:3000']
//var domain_url = ['http://front-end ip:3000']
/* More domains can be added to the above array by seperating with comma */

var db_host = "localhost"
var db_port = 3306
var db_user = "root"
var db_password = "root"
var db_name = "kors"
var dialect = "mysql"

var pageSize = 4

var secret_sessionKey = "whisky"

module.exports = { domain_url, db_host, db_port, db_user, db_password, db_name, pageSize, secret_sessionKey, dialect }