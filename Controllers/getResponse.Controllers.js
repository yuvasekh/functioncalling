const { get_current_weather, get_clothing_recommendations, search_hotels, search_flights, get_restaurants, find_events } = require("../Utils/Resources");
const axios = require('axios');
const { FunctionNames } = require("../Utils/SqlQueries");
module.exports.getResponseAzure = async (req, res) => {
    console.log("calling")
    try {

        async function run_conversation() {
            const baseURL = "https://openai-test-service.openai.azure.com/openai/deployments/gpt-35-turbo-16k/chat/completions?api-version=2023-07-01-preview";

            const headers = {
                "Content-Type": "application/json",
                "api-key": '9c621621a0f64b7894fa9b4b421e1d29',
            };

            let data = {
                messages: [
                    {
                        role: "user",
                        content:
                            "what is the weather in visakhapatnam",
                    },
                ],
                model: "gpt-35-turbo",

                functions: [
                    {
                        "name": "get_current_weather",
                        "description": "what is the weather in visakhapatnam",
                        "parameters": {
                            "type": "object",
                            "properties": {
                                "location": {
                                    "type": "string",
                                    "description": "The location of the hotel (i.e. Seattle, WA)"
                                },
                                "max_price": {
                                    "type": "number",
                                    "description": "The maximum price for the hotel"
                                },
                                "features": {
                                    "type": "string",
                                    "description": "A comma separated list of features (i.e. beachfront, free wifi, etc.)"
                                }
                            },
                            "required": ["location"]
                        }
                    }
                ],

                function_call: "auto",
            };

            try {
                console.log(`Sending initial request to OpenAI API...`);
                let response = await axios.post(baseURL, data, { headers });
                response = response.data;
                console.log(response.choices[0].message, "response")

                let executedFunctions = {};

                while (
                    response.choices[0].message.function_call &&
                    response.choices[0].finish_reason !== "stop"
                ) {
                    console.log("Inside while loop");
                    let message = response.choices[0].message;
                    const function_name = message.function_call.name;

                    if (executedFunctions[function_name]) {
                        break;
                    }

                    let function_response = "";

                    switch (function_name) {
                        case "get_current_weather":
                            let weatherArgs = JSON.parse(message.function_call.arguments);
                            function_response = get_current_weather(
                                weatherArgs.location,
                                weatherArgs.unit
                            );
                            break;
                        case "get_clothing_recommendations":
                            let recommendationArgs = JSON.parse(message.function_call.arguments);
                            function_response = get_clothing_recommendations(
                                recommendationArgs.temperature
                            );
                            break;
                        case "search_hotels":
                            let hotelArgs = JSON.parse(message.function_call.arguments);
                            function_response = search_hotels(
                                hotelArgs.location,
                                hotelArgs.max_price,
                                hotelArgs.features
                            );
                            break;
                        default:
                            throw new Error(`Unsupported function: ${function_name}`);
                    }

                    executedFunctions[function_name] = true;

                    data.messages.push({
                        role: "function",
                        name: function_name,
                        content: function_response,
                    });

                    console.log(`Sending request to OpenAI with ${function_name} response...`);
                    response = await axios.post(baseURL, data, { headers });
                    response = response.data;
                }

                console.log(response.choices[0].message.content);
                return response;
            } catch (error) {
                console.error("Error:", error);
            }
        }

        run_conversation()
            .then((response) => {
                console.log(response.choices[0].message.content);
                res.status(200).json(response.choices[0].message.content);
            })
            .catch((error) => {
                console.error("Error:", error);
            });

    } catch (error) {
        res.status(500).json({ message: error });
    }
};
module.exports.askWithFunctions = async (req, res) => {
    // console.log("calling",req.body)
let requestbody
    const {content,functionNames}=req.body.input
    try {
        if (content && functionNames)
            var functionInfo = await FunctionNames(functionNames)
if(functionInfo.length>0)
{

    functionInfo.map((item,index)=>
    {
        functionInfo[index].parameters = JSON.parse(functionInfo[index].parameters)
        
    })

}
console.log(JSON.stringify(functionInfo), "getfromdb")

        async function run_conversation() {
            const baseURL = "https://openai-test-service.openai.azure.com/openai/deployments/gpt-35-turbo-16k/chat/completions?api-version=2023-07-01-preview";

            const headers = {
                "Content-Type": "application/json",
                "api-key": '9c621621a0f64b7894fa9b4b421e1d29',
            };

            let data = {
                messages: [
                    {
                        role: "user",
                        content:
                            content,
                    },
                ],
                model: "gpt-35-turbo",

                functions: functionInfo,

                function_call: "auto",
            };
console.log(data,"data")
            try {
                console.log(`Sending initial request to OpenAI API...`);
                let response = await axios.post(baseURL, data, { headers });
                response = response.data;
                console.log(response.choices[0].message, "response")

                let executedFunctions = {};

                while (
                    response.choices[0].message.function_call &&
                    response.choices[0].finish_reason !== "stop"
                ) {
                    console.log("Inside while loop");
                    let message = response.choices[0].message;
                    const function_name = message.function_call.name;

                    if (executedFunctions[function_name]) {
                        break;
                    }

                    let function_response = "";

                    switch (function_name) {
                        case "search_flights":
                            let flightArgs = JSON.parse(message.function_call.arguments);
                            function_response = search_flights(
                                flightArgs.departure_location,
                                flightArgs.destination,
                                flightArgs.departure_date,
                                flightArgs.return_date,
                                flightArgs.max_price
                            );
                            break;
                        case "get_restaurants":
                            let restaurantArgs = JSON.parse(message.function_call.arguments);
                            function_response = get_restaurants(
                                restaurantArgs.location,
                                restaurantArgs.cuisine,
                                restaurantArgs.price_range,
                                restaurantArgs.rating
                            );
                            break;
                        case "find_events":
                            let eventArgs = JSON.parse(message.function_call.arguments);
                            function_response = find_events(
                                eventArgs.location,
                                eventArgs.category,
                                eventArgs.start_date,
                                eventArgs.end_date
                            );
                            break;
                        case "get_current_weather":
                            let weatherArgs = JSON.parse(message.function_call.arguments);
                            function_response = get_current_weather(
                                weatherArgs.location,
                                weatherArgs.unit
                            );
                            break;
                        case "get_clothing_recommendations":
                            let recommendationArgs = JSON.parse(message.function_call.arguments);
                            function_response = get_clothing_recommendations(
                                recommendationArgs.temperature
                            );
                            break;
                        case "search_hotels":
                            let hotelArgs = JSON.parse(message.function_call.arguments);
                            function_response = search_hotels(
                                hotelArgs.location,
                                hotelArgs.max_price,
                                hotelArgs.features
                            );
                            break;
                        default:
                            throw new Error(`Unsupported function: ${function_name}`);
                    }
                    

                    executedFunctions[function_name] = true;
console.log(function_response,"fun")
                    data.messages.push({
                        role: "function",
                        name: function_name,
                        content: function_response,
                    });

                    console.log(`Sending request to OpenAI with ${function_name} response...`);
                    requestbody= data
                    response = await axios.post(baseURL, data, { headers });
                    response = response.data;
                }

                console.log(response.choices[0].message.content);
                return response;
            } catch (error) {
                console.error("Error:", error);
            }
        }

        run_conversation()
            .then((response) => {
                console.log(response.choices[0].message.content);
                res.status(200).json({requestbody:requestbody,response:response.choices[0].message.content});
            })
            .catch((error) => {
                console.error("Error:", error);
            });

    } catch (error) {
        res.status(500).json({ message: error });
    }
};