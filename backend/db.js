const mongoose = require('mongoose');
const mongoURI = 'mongodb+srv://BiteBliss:0147258369@cluster0.vfz3i0y.mongodb.net/BiteBliss?retryWrites=true&w=majority&appName=Cluster0';

const mongoDB = async () => {
    try {
        await mongoose.connect(mongoURI, { useNewUrlParser: true });
        console.log("Connected to MongoDB");

        const collection = mongoose.connection.db.collection("food_items");
        const fetched_data = await collection.find({}).toArray();
        
        const foodCategoryCollection = mongoose.connection.db.collection("sample");
        const catData=await foodCategoryCollection.find({}).toArray();
                    
        global.food_items = fetched_data;
        global.foodCategory = catData;
            
        // global.food_items = fetched_data;
        // console.log(global.food_items);

        // console.log(fetched_data);


    } catch (error) {
        console.error("Error connecting to MongoDB:", error);
    }
};

module.exports = mongoDB;


// this command for running in terminal
// D:\Study Material\SEM-6\ReactProject\foodapp\backend> nodemon .\index.js




        // const fetched_data = await mongoose.connection.db.collection ("food_items");
        // fetched_data.find({}).toArray(function(err, data) {
        //     if(err) console.log(err);
        //     else console.log(data); 
        // })