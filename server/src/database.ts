import pg from "pg";
const { Pool } = pg;

const pool = new Pool({
    user: process.env.USER_DB,
    host: process.env.HOST_DB,
    database: process.env.DATABASE_DB,
    password: process.env.PASSWORD_DB,
    port: Number(process.env.PORT_DB),
    ssl: { rejectUnauthorized: false }
})

export default pool