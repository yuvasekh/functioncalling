const sql = require("mssql");
const DB_CONNECTION_POOL_SIZE = 25;
require("dotenv").config();
const config = {
    server: process.env.server,
    database: process.env.database,
    user: process.env.user,
    password: process.env.password,
    options: {
        enableArithAbort: true,
        encrypt: true,
    },
    pool: {
        max: DB_CONNECTION_POOL_SIZE,
        min: 0,
    },
};

var pool;
sql
    .connect(config)
    .then((data) => {
        console.log(
            "SqlQueries: SQL DB connected with pool size: ",
            DB_CONNECTION_POOL_SIZE
        );
        pool = data;
    })
    .catch((error) => {
        console.log(error, " connecting to DB");
    });
    async function FunctionNames(functionNames) {
        const formattedString = functionNames.map(item => `'${item}'`).join(", ");
        console.log(functionNames, "sqlquery", formattedString);
        const selectQuery = `select name, description, parameters from azurefunctions where name In (${formattedString})`;
        console.log(selectQuery, "query");
    
        try {
            // let pool = await sql.connect(config);
            const result = await pool.request().query(selectQuery);
            const selectResult = result.recordset;
    
            return selectResult;
        } catch (error) {
            console.log("Query execution failed:", error);
            return null;
        }
    }
    
    
async function AllFunctionNames(name1) {
    console.log(name1,"sqlname")
    const selectQuery = `select name,description,parameters from azurefunctions`;

    try {
        // let pool = await sql.connect(config);
        const result = await pool.request().query(selectQuery); // Fixed the variable name 'query' to 'selectQuery'
        const selectResult = result.recordset; // Assuming 'selectResult' is available here
   

        return selectResult; // Return the converted data
    } catch (error) {
        console.log("Query execution failed:", error);
        return null;
    }
}
async function insertFunctions(functions) {
    console.log(functions,"sql")
    try {
        // Assuming 'pool' is your database connection pool

        
        for (const func of functions) {
            console.log(func.parameters)
            const insertQuery = `
                INSERT INTO azurefunctions (name, description, parameters)
                VALUES ('${func.name}', '${func.description}', N'${JSON.stringify(func.parameters)}');
            `;
            
            await pool.request().query(insertQuery);
        }
        
        console.log("Functions inserted successfully");
        return true;
    } catch (error) {
        console.error("Failed to insert functions:", error);
        return false;
    }
}

module.exports.AllFunctionNames = AllFunctionNames;
module.exports.FunctionNames = FunctionNames;
module.exports.insertFunctions = insertFunctions;