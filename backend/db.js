// const mongoose = require('mongoose');
// const mongoURI = 'mongodb+srv://sdas99579:SouRavDas12@cluster0.hie90xv.mongodb.net/?retryWrites=true&w=majority'
// const mongoDB =async() =>{
//     await mongoose.connect(mongoURI,{useNewUrlParser: true},(err, result) =>{
//             if (err) console.log("----", err);
//             else {
//                 console.log("connected");
//             }

//         });
// }

// module.exports=mongoDB;

const mongoose = require('mongoose');
const mongoURI = 'mongodb+srv://sdas99579:SouRavDas12@cluster0.hie90xv.mongodb.net/gofoodmern?retryWrites=true&w=majority';

const mongoDB = async () => {
  try {
    await mongoose.connect(mongoURI, {
      useNewUrlParser: true,
      useUnifiedTopology: true,
    });
    console.log("Connected to MongoDB");
    
    const fetched_data = mongoose.connection.db.collection("food_items");
    const data = await fetched_data.find({}).toArray();
    global.food_items = data;
    const foodCategory = mongoose.connection.db.collection("foodCategory");
    const catData = await foodCategory.find({}).toArray();
    global.foodCategory = catData;
    // console.log(global.foodCategory);
    // console.log(global.food_items)
    // console.log(data);
  } catch (error) {
    console.error("Error connecting to MongoDB:", error);
  }
}

module.exports = mongoDB;


