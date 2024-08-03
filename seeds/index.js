const mongoose = require("mongoose");
const campgroundModel = require("../model/campground");
const cities = require("./cities");
const {descriptors , places} = require("./seedHelpers");
mongoose.connect("mongodb://127.0.0.1:27017/new-Yelp-Camp")
.then(()=>{
    console.log("Mongoose Connected!");
})
.catch((e)=>{
    e.message()
})

images1 = [
    "https://images.pexels.com/photos/788200/pexels-photo-788200.jpeg?auto=compress&cs=tinysrgb&w=600",
    "https://images.pexels.com/photos/975771/pexels-photo-975771.jpeg?auto=compress&cs=tinysrgb&w=600",
    "https://images.pexels.com/photos/396714/pexels-photo-396714.jpeg?auto=compress&cs=tinysrgb&w=600",
    "https://images.pexels.com/photos/2606532/pexels-photo-2606532.jpeg?auto=compress&cs=tinysrgb&w=600",
    "https://images.pexels.com/photos/1735675/pexels-photo-1735675.jpeg?auto=compress&cs=tinysrgb&w=600",
    "https://images.pexels.com/photos/1761279/pexels-photo-1761279.jpeg?auto=compress&cs=tinysrgb&w=600",
    "https://images.pexels.com/photos/974406/pexels-photo-974406.jpeg?auto=compress&cs=tinysrgb&w=600",
    "https://images.pexels.com/photos/931007/pexels-photo-931007.jpeg?auto=compress&cs=tinysrgb&w=600",
    "https://images.pexels.com/photos/258123/pexels-photo-258123.jpeg?auto=compress&cs=tinysrgb&w=600",
    "https://images.pexels.com/photos/1459534/pexels-photo-1459534.jpeg?auto=compress&cs=tinysrgb&w=600",
    "https://images.pexels.com/photos/814898/pexels-photo-814898.jpeg?auto=compress&cs=tinysrgb&w=600",
    "https://images.pexels.com/photos/1085186/pexels-photo-1085186.jpeg?auto=compress&cs=tinysrgb&w=600",
    "https://images.pexels.com/photos/238631/pexels-photo-238631.jpeg?auto=compress&cs=tinysrgb&w=600",
    "https://images.pexels.com/photos/795622/pexels-photo-795622.jpeg?auto=compress&cs=tinysrgb&w=600",
    "https://images.pexels.com/photos/758744/pexels-photo-758744.jpeg?auto=compress&cs=tinysrgb&w=600",
    "https://images.pexels.com/photos/2609106/pexels-photo-2609106.jpeg?auto=compress&cs=tinysrgb&w=600",
    "https://images.pexels.com/photos/58557/pexels-photo-58557.jpeg?auto=compress&cs=tinysrgb&w=600",
    "https://images.pexels.com/photos/1376755/pexels-photo-1376755.jpeg?auto=compress&cs=tinysrgb&w=600",
    "https://images.pexels.com/photos/1583207/pexels-photo-1583207.jpeg?auto=compress&cs=tinysrgb&w=600",
    "https://images.pexels.com/photos/953969/pexels-photo-953969.jpeg?auto=compress&cs=tinysrgb&w=600",
    "https://images.pexels.com/photos/982021/pexels-photo-982021.jpeg?auto=compress&cs=tinysrgb&w=600",
    "https://images.pexels.com/photos/1761282/pexels-photo-1761282.jpeg?auto=compress&cs=tinysrgb&w=600",
    "https://images.pexels.com/photos/2413238/pexels-photo-2413238.jpeg?auto=compress&cs=tinysrgb&w=600",
    "https://images.pexels.com/photos/3136711/pexels-photo-3136711.jpeg?auto=compress&cs=tinysrgb&w=600",
    "https://images.pexels.com/photos/1697496/pexels-photo-1697496.jpeg?auto=compress&cs=tinysrgb&w=600",
    "https://th.bing.com/th/id/OIP.ky6fTvZ0MGQAZCS8QH9LkgHaFj?w=216&h=180&c=7&r=0&o=5&dpr=1.5&pid=1.7",
    "https://th.bing.com/th?q=Ratnagiri+Jaigad+Temple&w=120&h=120&c=1&rs=1&qlt=90&cb=1&dpr=1.5&pid=InlineBlock&mkt=en-IN&cc=IN&setlang=en&adlt=moderate&t=1&mw=247",
    "https://th.bing.com/th/id/OIP.cnjPtKam6UdcO1M-32SmHwHaDB?rs=1&pid=ImgDetMain",
    "https://th.bing.com/th/id/OIP.PSi58dPT8D3ou7w_GaeeQwHaE8?pid=ImgDet&w=178&h=118&c=7&dpr=1.5",
    "https://wallpaperaccess.com/full/328520.jpg",
    "https://th.bing.com/th/id/OIP.deP7AqTjAZTw7Q8qs3oeTgHaFf?w=480&h=356&rs=1&pid=ImgDetMain",
    "https://th.bing.com/th/id/OIP.Uib6cukxv8PP7GqCPGjZLQHaEK?w=1280&h=720&rs=1&pid=ImgDetMain",
]

const sample = (array)=>{
    return array[Math.floor(Math.random() * array.length)];
}

const seedDB = async ()=>{
    await campgroundModel.deleteMany({});
    for (let i = 0; i < 50 ; i++){
        const random1000 = Math.floor(Math.random() * 1000)
        const camp = new campgroundModel({
            location: `${cities[random1000].city}, ${cities[random1000].state}`,
            title: `${sample(descriptors)}, ${sample(places)}`,
            price:random1000,
            author:"66a2698561d60336382eefcb",
            description:"Lorem, ipsum enaconda peritatis nobis blanditiis.",
            geometry:
            {
                type: 'Point',
                coordinates: [
                    cities[random1000].longitude,
                    cities[random1000].latitude
                ]
            },
            images:[
                {
                    url: 'https://res.cloudinary.com/dnabf9xqv/image/upload/v1722254875/YelpCamp/hciqqjl4kjrwe2ed4go7.jpg',
                    filename: 'YelpCamp/hciqqjl4kjrwe2ed4go7'
                  },
                  {
                    url: 'https://res.cloudinary.com/dnabf9xqv/image/upload/v1722254876/YelpCamp/iyjlpdy9ul4dmy0eaicl.jpg',
                    filename: 'YelpCamp/iyjlpdy9ul4dmy0eaicl' 
                  }
            ]
        })
        await camp.save();
    }
}

seedDB()

