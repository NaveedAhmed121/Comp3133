const express = require("express");
const Restaurant = require("../models/Restaurant");

const router = express.Router();

/**
 * 4) GET /restaurants
 * - Return all restaurant details (all columns)
 *
 * 6) GET /restaurants?sortBy=ASC|DESC
 * - Selected columns: id, cuisines, name, city, resturant_id
 * - Sort by restaurant_id asc/desc
 */
router.get("/restaurants", async (req, res) => {
    try {
        const { sortBy } = req.query;

        // Requirement #6 (when sortBy is provided)
        if (sortBy) {
            const dir = String(sortBy).toUpperCase() === "DESC" ? -1 : 1;

            const docs = await Restaurant.find(
                {},
                { _id: 1, cuisine: 1, name: 1, city: 1, restaurant_id: 1 }
            ).sort({ restaurant_id: dir });

            // Map field names to match lab text exactly
            const result = docs.map((d) => ({
                id: d._id,
                cuisines: d.cuisine,
                name: d.name,
                city: d.city,
                resturant_id: d.restaurant_id, // (lab typo) keep it as resturant_id
            }));

            return res.json(result);
        }

        // Requirement #4 (no sortBy) => all columns
        const restaurants = await Restaurant.find({});
        return res.json(restaurants);
    } catch (err) {
        return res.status(500).json({ error: err.message });
    }
});

/**
 * 5) GET /restaurants/cuisine/:cuisineName
 * - Return all restaurant details by cuisine (all columns)
 */
router.get("/restaurants/cuisine/:cuisineName", async (req, res) => {
    try {
        const { cuisineName } = req.params;
        const restaurants = await Restaurant.find({ cuisine: cuisineName });
        return res.json(restaurants);
    } catch (err) {
        return res.status(500).json({ error: err.message });
    }
});

/**
 * 7) GET /restaurants/Delicatessen
 * - cuisine == Delicatessen AND city != Brooklyn
 * - selected columns: cuisines, name, city (exclude id)
 * - sort ascending by name
 */
router.get("/restaurants/Delicatessen", async (req, res) => {
    try {
        const docs = await Restaurant.find(
            { cuisine: "Delicatessen", city: { $ne: "Brooklyn" } },
            { _id: 0, cuisine: 1, name: 1, city: 1 }
        ).sort({ name: 1 });

        const result = docs.map((d) => ({
            cuisines: d.cuisine,
            name: d.name,
            city: d.city,
        }));

        return res.json(result);
    } catch (err) {
        return res.status(500).json({ error: err.message });
    }
});

module.exports = router;
