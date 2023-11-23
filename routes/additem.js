const Pizza = require('./models/pizzaModel');

app.post('/api/pizzas/add-item', async (req, res) => {
    try {
      const { name, variants, prices, category, image, description } = req.body;
  
      // Create a new Pizza item based on the received data
      const newPizza = new Pizza({
        name,
        variants: variants.split(',').map((variant) => variant.trim()),
        prices: JSON.parse(prices), // Assuming prices are provided as a JSON string
        category,
        image,
        description,
      });
  
      // Save the new Pizza item to the database
      await newPizza.save();
  
      res.status(201).json({ message: 'Pizza added successfully', pizza: newPizza });
    } catch (error) {
      console.error('Error adding pizza:', error);
      res.status(500).json({ message: 'Failed to add pizza' });
    }
  });

  app.get('/api/pizzas', async (req, res) => {
    try {
        // Retrieve all pizzas from the database
        const pizzas = await Pizza.find();

        res.status(200).json({ pizzas });
    } catch (error) {
        console.error('Error retrieving pizzas:', error);
        res.status(500).json({ message: 'Failed to retrieve pizzas' });
    }
});
  module.exports = app;
