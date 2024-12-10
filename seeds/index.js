const mongoose = require('mongoose');
const cities = require('./cities');
const { places, descriptors } = require('./seedHelpers');
const Campground = require('../models/campground');

mongoose.connect("mongodb://localhost:27017/camp-app", {
    useNewUrlParser: true,
    useUnifiedTopology: true
});

const db = mongoose.connection;

db.on("error", console.error.bind(console, "connection error:"));
db.once("open", () => {
    console.log("Database connected");
});

const sample = array => array[Math.floor(Math.random() * array.length)];


const seedDB = async () => {
    await Campground.deleteMany({});
    for (let i = 0; i < 50; i++) {
        const random100 = Math.floor(Math.random() * 100);
        const price = Math.floor(Math.random() * 30) + 10;
        const camp = new Campground({
            author: "673f12b97ce39d3256758c12", //your user id
            location: `${cities[random100].city}, ${cities[random100].state}`,
            title: `${sample(descriptors)} ${sample(places)}`,
            description: `Just something important`,
            price,
            geometry: {
                type: "Point",
                coordinates: [
                    cities[random100].longitude,
                    cities[random100].latitude
                ]
            },
            images: {
                url: 'https://res.cloudinary.com/df5mssvlf/image/upload/v1733826583/CampingApp/fei1cunmzy1vlds1rwum.jpg',
                filename: 'CampingApp/jvp30w30gi5olpjnsfit',
            }

        })
        await camp.save();
    }
}

seedDB().then(() => {
    mongoose.connection.close();
})