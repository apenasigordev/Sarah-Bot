import postgres from 'postgres'

const sql = postgres(process.env.DB) // will use psql environment varia wwwbles

export default sql