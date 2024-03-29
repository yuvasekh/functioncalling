import axios from 'axios'
const rootUrl = 'http://localhost:8001/'
export async function getFunctionName() {
    await axios
        .post(`${rootUrl}api/textupload`, { content: text })
        .then((response) => {
            temp.push(response.data);
        })
        .catch((error) => {
            console.error("Error:", error.message);
        });
}
export async function getallFunctionNames() {
    let temp=[]
    await axios
        .get(`${rootUrl}api/getallFunctionNames`)
        .then((response) => {
            temp=response.data;

        })
        .catch((error) => {
            console.error("Error:", error.message);
            temp=error
        });
        return temp
}
export async function addFunction(content) {
    let temp;
    await axios
        .post(`${rootUrl}api/addfunction`, { input: content })
        .then((response) => {
            temp.push(response.data);
        })
        .catch((error) => {
            console.error("Error:", error.message);
        });
        return temp
}
export async function sendcurrentMessage(data) {
    let temp
    await axios
        .post(`${rootUrl}api/askWithFunctions`, { input: data })
        .then((response) => {
            temp=response.data;
        })
        .catch((error) => {
            console.error("Error:", error.message);
        });
        return temp
}
