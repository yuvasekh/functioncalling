const {getFunctionNames,Deletefunction,Editfunction,addfunction, getAllFunctionNames}=require('../Controllers/azureFunction.Controllers')
const {getResponseAzure, askWithFunctions}=require('../Controllers/getResponse.Controllers')
module.exports = (app) => {
    app.route("/getFunctionNames").get(getFunctionNames);
    app.route("/getallFunctionNames").get(getAllFunctionNames);
    app.route("/Deletefunction").get(Deletefunction);
    app.route("/askWithFunctions").post(askWithFunctions);
    app.route("/Editfunction").get(Editfunction);
    app.route("/addfunction").post(addfunction);
    app.route("/getResponseAzure").get(getResponseAzure);
}