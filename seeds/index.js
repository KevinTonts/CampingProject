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
        const random1000 = Math.floor(Math.random() * 1000);
        const price = Math.floor(Math.random() * 30) + 10;
        const camp = new Campground({
            author: "673f12b97ce39d3256758c12",
            location: `${cities[random1000].city}, ${cities[random1000].state}`,
            title: `${sample(descriptors)} ${sample(places)}`,
            description: `Just something important`,
            price,
            images: {
                url: 'https://res.cloudinary.com/df5mssvlf/image/upload/v1732504745/CampingApp/jvp30w30gi5olpjnsfit.png',
                filename: 'CampingApp/jvp30w30gi5olpjnsfit',
            }

        })
        await camp.save();
    }
}

seedDB().then(() => {
    mongoose.connection.close();
})