const mongoose = require("mongoose");

const AddressSchema = new mongoose.Schema(
    {
        building: String,
        street: String,
        zipcode: String,
    },
    { _id: false }
);

const RestaurantSchema = new mongoose.Schema(
    {
        address: AddressSchema,
        city: String,            // ✅ top-level city (matches your seed)
        cuisine: String,
        name: String,
        restaurant_id: String,
        grades: { type: Array, default: [] } // optional, seed doesn’t include grades but ok
    },
    { collection: "Restaurants" } // must match Atlas collection name exactly
);

module.exports = mongoose.model("Restaurant", RestaurantSchema);
