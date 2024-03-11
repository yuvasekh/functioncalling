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
export async function sendSelectedFunctions() {
    await axios
        .post(`${rootUrl}api/textupload`, { content: text })
        .then((response) => {
            temp.push(response.data);
        })
        .catch((error) => {
            console.error("Error:", error.message);
        });
}
export async function sendcurrentMessage() {
    let temp
    await axios
        .post(`${rootUrl}api/askWithFunctions`, { content: text })
        .then((response) => {
            temp=response.data;
        })
        .catch((error) => {
            console.error("Error:", error.message);
        });
        return temp
}
