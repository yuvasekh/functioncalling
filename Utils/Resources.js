function get_current_weather(location, unit = "fahrenheit") {
    console.log(
        `Called get_current_weather with location: ${location} and unit: ${unit}`
    );


    return JSON.stringify({
        location: location,
        temperature: "32",
        unit: unit,
        forecast: ["sunny", "windy"],
    });
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

    return JSON.stringify(filteredHotels);
}
module.exports.get_clothing_recommendations = get_clothing_recommendations
module.exports.get_current_weather = get_current_weather
module.exports.search_hotels = search_hotels