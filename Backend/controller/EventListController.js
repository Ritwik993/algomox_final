const cloudinary = require("cloudinary").v2;
// const FoodList = require("../models/List");
const eventlist = require("../models/eventList");

exports.addProduct = async (req, res, next) => {
  try {
    if (!req.files) {
      return next(Error("images are required", 401));
    }
    const photo = req.files.image;
    const { name, description, price, category, ticket, date, location } =
      req.body;
    const result = await cloudinary.uploader.upload(photo.tempFilePath, {
      folder: "FoodAppProducts",
    });
    const prod = {
      name,
      description,
      price,
      image: {
        id: result.public_id,
        secure_url: result.secure_url,
      },
      category,
      ticket,
      date,
      location,
    };
    const data = await eventlist.create(prod);
    res.status(200).send({
      sucess: true,
      prod,
    });
  } catch (error) {
    console.log(error);
    res.send(error);
  }
};

exports.adminDeleteOneProduct = async (req, res, next) => {
  try {
    let product = await eventlist.findById(req.params.id);

    if (!product) {
      return next(Error("Product not found"));
    }
    await cloudinary.uploader.destroy(product.image.id);
    await eventlist.findByIdAndDelete(req.params.id);
    res.status(200).json({
      success: true,
      message: "Product deleted !",
    });
  } catch (error) {
    console.log(error);
    res.send(error);
  }
};

exports.getAllProduct = async (req, res, next) => {
  try {
    const product = await eventlist.find({});
    res.send({
      success: true,
      data: product,
    });
  } catch (error) {
    res.send(error);
    console.log(error);
  }
};



// Decrease the number of available tickets for a specific event
exports.decreaseAvailableTickets = async (req, res, next) => {
  try {
    const { id } = req.params; // Get the event ID from the request parameters
    const { quantity } = req.body; // Get the number of tickets to decrease from the request body

    // Find the event by ID
    const event = await eventlist.findById(id);

    if (!event) {
      return next(new Error("Event not found"));
    }



    // Check if the number of tickets to decrease is valid
    if (quantity <= 0) {
      return next(new Error("Invalid number of tickets"));
    }

    // Check if there are enough available tickets
    if (event.ticket < quantity) {
      return next(new Error("Not enough tickets available"));
    }

    // Decrease the number of available tickets
    event.ticket -= quantity;

    // Save the updated event
    await event.save();

    // Respond with success message
    res.status(200).json({
      success: true,
      message: "Tickets decreased successfully",
      ticket: event.ticket,
    });
  } catch (error) {
    console.log(error);
    res.status(500).send(error);
  }
};

