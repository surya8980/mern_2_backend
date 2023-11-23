const express = require("express");
const cors = require('cors');
const app = express();
const dbConfig = require('./db');
const Pizza = require('./models/pizzaModel');
const bodyParser = require('body-parser');
const mongoose = require('mongoose')

app.use(express.json());
app.use(cors());

const pizzasRoute = require('./routes/pizzasRoute');
const userRoute = require('./routes/userRoute');
const ordersRoute = require('./routes/ordersRoute');


app.use('/api/pizzas/', pizzasRoute);
app.use('/api/users/', userRoute);
app.use('/api/orders/', ordersRoute);

app.get("/", (req, res) => {
    res.send("Server is working");
});

const Reservation = mongoose.model('Reservation', {
    name: String,
    date: Date,
    time: String,
    numberOfPeople: Number,
  });
  app.use(bodyParser.json());
  


// Route to get all pizzas
app.get("/getpizza", async (req, res) => {
    try {   
        const docs = await Pizza.find({}).exec();
        res.send(docs);
    } catch (err) {
        console.error(err);
        res.status(500).send('Internal Server Error');
    }
});

app.post("/booking", async (req, res) => {
    const data = {
        name: req.body.name,
        tableno: req.body.tableno,
        date: req.body.date,
        time: req.body.time
    };

    // Process the received data
    try {
        // Assuming 'collection' here is a placeholder for your MongoDB collection
        await collection.insertOne(data); // Adjust this to match your database logic
        res.status(200).json({ message: 'Table booked successfully', data });
    } catch (error) {
        console.error("Error booking table:", error);
        res.status(500).json({ message: 'Failed to book table' });
    }
});

const port = process.env.PORT || 5000;

app.listen(port, () => {
    console.log(`Server is running on port ${port}`);
});
