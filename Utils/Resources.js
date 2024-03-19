const axios=require('axios')
async function get_current_weather(config) {
    console.log(
        `Called get_current_weather with config: ${config} `
    );
    let temp="";

    await axios.request(config)
    .then((response) => {
     
      temp=JSON.stringify(response.data)
    })
    .catch((error) => {
      console.log(error);
    });
    console.log(JSON.stringify(temp));
    return temp
}

function get_clothing_recommendations(temperature) {
    console.log(
        `Called get_clothing_recommendations with temperature: ${temperature}`
    );
    let recommendation =
        temperature < 60 ? "warm clothing colourful" : "light clothing tye-dye";
    return JSON.stringify({ recommendation: recommendation });
}

function search_hotels(location, max_price, features) {
    console.log(
        `Called search_hotels with location: ${location}, max_price: ${max_price}, features: ${features}`
    );
    let hotels = [
        {
            name: "Hotel A",
            price: 200,
            features: ["beachfront", "free breakfast"],
        },
        {
            name: "Hotel B",
            price: 250,
            features: ["beachfront", "free wifi"],
        },
        {
            name: "Hotel C",
            price: 300,
            features: ["beachfront", "free breakfast", "free wifi"],
        },
    ];

    let filteredHotels = hotels.filter((hotel) => {
        return (
            hotel.price <= max_price &&
            hotel.features.includes("beachfront") &&
            hotel.features.includes("free breakfast")
        );
    });

    console.log(filteredHotels,"filter")

    return JSON.stringify(filteredHotels);
}
function search_flights(departure_location, destination, departure_date, return_date, max_price) {
    console.log(
        `Called search_flights with departure_location: ${departure_location}, destination: ${destination}, departure_date: ${departure_date}, return_date: ${return_date}, max_price: ${max_price}`
    );
    let flights = [
        {
            airline: "Airline A",
            price: 200,
            departure_time: "2024-03-15T08:00:00",
            arrival_time: "2024-03-15T10:00:00",
        },
        {
            airline: "Airline B",
            price: 250,
            departure_time: "2024-03-15T09:00:00",
            arrival_time: "2024-03-15T11:00:00",
        },
        {
            airline: "Airline C",
            price: 300,
            departure_time: "2024-03-15T10:00:00",
            arrival_time: "2024-03-15T12:00:00",
        },
    ];

    let filteredFlights = flights.filter((flight) => {
        return (
            flight.price <= max_price
        );
    });
    console.log(filteredFlights,"filteredFlights")

    return JSON.stringify(filteredFlights);
}

function get_restaurants(location, cuisine, price_range, rating) {
    console.log(
        `Called get_restaurants with location: ${location}, cuisine: ${cuisine}, price_range: ${price_range}, rating: ${rating}`
    );
    let restaurants = [
        {
            name: "Restaurant A",
            cuisine: "Italian",
            price_range: "medium",
            rating: 4.5,
        },
        {
            name: "Restaurant B",
            cuisine: "Asian",
            price_range: "low",
            rating: 4.0,
        },
        {
            name: "Restaurant C",
            cuisine: "Mexican",
            price_range: "high",
            rating: 4.8,
        },
    ];

    let filteredRestaurants = restaurants.filter((restaurant) => {
        return (
            restaurant.location === location &&
            restaurant.cuisine === cuisine &&
            restaurant.price_range === price_range &&
            (!rating || restaurant.rating >= rating)
        );
    });

    return JSON.stringify(filteredRestaurants);
}

function find_events(location, category, start_date, end_date) {
    console.log(
        `Called find_events with location: ${location}, category: ${category}, start_date: ${start_date}, end_date: ${end_date}`
    );
    let events = [
        {
            name: "Concert A",
            category: "Music",
            start_date: "2024-03-15T19:00:00",
            end_date: "2024-03-15T22:00:00",
        },
        {
            name: "Sports Event B",
            category: "Sports",
            start_date: "2024-03-16T15:00:00",
            end_date: "2024-03-16T18:00:00",
        },
        {
            name: "Art Exhibition C",
            category: "Art",
            start_date: "2024-03-17T10:00:00",
            end_date: "2024-03-17T18:00:00",
        },
    ];

    let filteredEvents = events.filter((event) => {
        return (
            event.location === location &&
            event.category === category &&
            event.start_date >= start_date &&
            (!end_date || event.end_date <= end_date)
        );
    });

    return JSON.stringify(filteredEvents);
}
function processRequest(apiKey, apiUrl,config) {
 
  
    
    axios.request(config)
    .then((response) => {
      console.log(JSON.stringify(response.data));
    })
    .catch((error) => {
      console.log(error);
    });
    
}
module.exports.processRequest = processRequest
module.exports.get_clothing_recommendations = get_clothing_recommendations
module.exports.get_current_weather = get_current_weather
module.exports.search_hotels = search_hotels
module.exports.search_flights = search_flights
module.exports.get_restaurants = get_restaurants
module.exports.find_events = find_events