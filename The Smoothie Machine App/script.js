// Price data for all smoothie components
const prices = {
    size: {
        small: 3.00, // Price for small size
        medium: 4.50, // Price for medium size
        large: 6.00 // Price for large size
    },
    ingredients: {
        strawberries: 0.50, // Price for strawberries
        bananas: 0.50, // Price for bananas
        blueberries: 0.75, // Price for blueberries
        spinach: 0.40, // Price for spinach
        mango: 0.80 // Price for mango
    },
    base: {
        water: 0.00, // Free base option
        milk: 0.50, // Price for milk
        yogurt: 0.75, // Price for yogurt
        juice: 0.60 // Price for juice
    },
    extras: {
        "Whipped Cream": 0.50, // Price for whipped cream
        "Almond Butter": 1.25, // Price for almond butter
        "Granola": 0.75 // Price for granola
    }
};

// Smoothie class definition
class Smoothie {
    constructor(name, size, ingredients, base, extras) {
        this.name = name; // Customer's name
        this.size = size; // Smoothie size
        this.ingredients = ingredients; // List of selected ingredients
        this.base = base; // Selected base
        this.extras = extras; // Selected extras
    }

    // Generate a description of the smoothie
    getDescription() {
        let description = `${this.name}, here is your ${this.size} smoothie with: `;
        description += `${this.ingredients.join(", ")} blended with ${this.base}. `;
        if (this.extras.length > 0) {
            description += `Extras: ${this.extras.join(", ")}.`; // Include extras if any
        } else {
            description += "No extras added."; // If no extras, add this message
        }
        return description; // Return the description
    }

    // Calculate the total price of the smoothie
    calculatePrice() {
        let total = prices.size[this.size]; // Start with the size price

        // Add prices of all selected ingredients
        total += this.ingredients.reduce((sum, ingredient) => sum + prices.ingredients[ingredient], 0);

        // Add the price of the selected base
        total += prices.base[this.base];

        // Add prices of selected extras
        total += this.extras.reduce((sum, extra) => sum + prices.extras[extra], 0);

        return total.toFixed(2); // Return the total price, formatted to 2 decimal places
    }
}

// Add an event listener for the "Order Smoothie" button
document.getElementById('orderButton').addEventListener('click', () => {
    // Get input values from the form
    const name = document.getElementById('name').value; // Customer's name
    const size = document.getElementById('size').value; // Selected size
    const ingredients = Array.from(document.getElementById('ingredients').selectedOptions)
        .map(option => option.value); // Selected ingredients (multi-select)
    const base = document.getElementById('base').value; // Selected base
    const extras = Array.from(document.querySelectorAll('input[name="extras"]:checked'))
        .map(checkbox => checkbox.value); // Selected extras (checkboxes)

    // Create a new Smoothie object using the form values
    const smoothie = new Smoothie(name, size, ingredients, base, extras);

    // Display the smoothie order summary
    const summaryDiv = document.getElementById('orderSummary');
    summaryDiv.innerHTML = `
        <p>${smoothie.getDescription()}</p>
        <p><strong>Total Price: $${smoothie.calculatePrice()}</strong></p>
    `;
    summaryDiv.style.display = 'block'; // Make the summary visible

    // Show a relevant smoothie image
    updateSmoothieImage(ingredients);
});

// Function to dynamically update the smoothie image based on selected ingredients
function updateSmoothieImage(ingredients) {
    const imageDiv = document.getElementById('smoothieImage');
    imageDiv.innerHTML = ''; // Clear any previous image

    const img = document.createElement('img'); // Create an <img> element
    img.alt = 'Your Smoothie'; // Set alt text for the image

    // Assign a specific image based on selected ingredients
    if (ingredients.includes('strawberries') && ingredients.includes('bananas')) {
        img.src = 'images/strawberry-banana.jpg'; // Image for strawberry-banana combo
    } else if (ingredients.includes('blueberries')) {
        img.src = 'images/blueberry-smoothie.jpg'; // Image for blueberry smoothies
    } else if (ingredients.includes('spinach')) {
        img.src = 'images/green-smoothie.jpg'; // Image for green smoothies
    } else {
        img.src = 'images/default-smoothie.jpg'; // Default image if no specific match
    }

    img.style.width = '200px'; // Set the width of the image
    img.style.borderRadius = '10px'; // Add rounded corners
    imageDiv.appendChild(img); // Add the image to the page
}
