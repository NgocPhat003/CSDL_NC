const sql = require('mssql');
// Cấu hình kết nối đến SQL Server
const config = {
  user: 'sa',
  password: '123456',
  server: 'LAPTOP-UFHV2KPG',
  database: 'QLNhaKhoa_CSDLNC',
  options: {
    trustedConnection:true,
    trustServerCertificate: true,
  },
  driver: 'SQL Server'
};

const connn = new sql.ConnectionPool(config).connect().then(pool => {
    return pool;
});

module.exports = {
    conn: connn,
    sql: sql
}