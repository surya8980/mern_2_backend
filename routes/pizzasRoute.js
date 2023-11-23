const express = require('express');
const router = express.Router();
const Pizza = require('../models/pizzaModel')

router.get("/getallpizzas",async (req,res)=>{
    try{
        const pizzas = await Pizza.find({})
        res.send(pizzas)
    }catch(error){
        return res.status(400).json({message:error});
    }
});

router.post('/add-item', async (req, res) => {
  try {
    const {
      name,
      variants,
      prices,
      category,
      image,
      description
    } = req.body;

    const newPizza = new Pizza({
      name,
      variants,
      prices,
      category,
      image,
      description,
    });

    await newPizza.save();

    res.status(201).json({ message: 'Pizza added successfully', pizza: newPizza });
  } catch (error) {
    console.error('Error adding pizza:', error);
    res.status(500).json({ message: 'Failed to add pizza' });
  }
});

router.delete('/remove-item/:id', async (req, res) => {
  try {
      const { id } = req.params;
      await Pizza.findByIdAndDelete(id);
      res.status(200).json({ message: 'Pizza removed successfully', removedPizzaId: id });
  } catch (error) {
      console.error('Error removing pizza:', error);
      res.status(500).json({ message: 'Failed to remove pizza' });
  }
});

module.exports= router;