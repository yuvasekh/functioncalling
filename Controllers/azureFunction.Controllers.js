const { insertFunctions, FunctionNames, AllFunctionNames } = require("../Utils/SqlQueries");

module.exports.addfunction = async (req, res) => {
       console.log(req.body.input)
       let data=req.body.input
       console.log(JSON.parse(data),"data")
       let datalist=JSON.parse(data)
       console.log(typeof(data),"data")
    try {
        if (req.body) {
            await insertFunctions(datalist.functions)
            res.status(200).json("Inserted");
        }
        else {
            res.status(400).json({ message: "Bad Request" });

        }


    } catch (error) {
        res.status(500).json({ message: error });
    }
};
module.exports.getFunctionNames = async (req, res) => {

    try {
        if(req.body.name)
        {
            let FunctionName = await FunctionNames(req.body.name)
            res.status(200).json(FunctionName);
        }
else
{
    res.status(400).json({ message: "Invalid Function Name" });  
}
        
    } catch (error) {
        res.status(500).json({ message: error });
    }
};
module.exports.getAllFunctionNames = async (req, res) => {

    try {

            let FunctionName = await AllFunctionNames()
            res.status(200).json(FunctionName);
        

        
    } catch (error) {
        res.status(500).json({ message: error });
    }
};
module.exports.Editfunction = async (req, res) => {

    try {


        res.status(200).json();
    } catch (error) {
        res.status(500).json({ message: error });
    }
};
module.exports.Deletefunction = async (req, res) => {

    try {


        res.status(200).json();
    } catch (error) {
        res.status(500).json({ message: error });
    }
};