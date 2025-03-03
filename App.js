import React, { useState } from "react";
import "./styles.css";

const recipes = [
  {
    name: "Cheeseburger",
    healthier: "Grilled Turkey Burger",
    ingredients: {
      original: [
        "150g Beef patty",
        "1 White bread bun",
        "1 slice (28g) Cheddar cheese",
        "1 tbsp (15g) Mayonnaise",
        "2 Lettuce leaves",
        "2 Tomato slices"
      ],
      healthier: [
        "150g Grilled turkey patty",
        "1 Whole wheat bun",
        "1 slice (28g) Low-fat cheddar cheese",
        "1 tbsp (15g) Avocado spread",
        "2 Lettuce leaves",
        "2 Tomato slices"
      ]
    }
  },
  {
    name: "French Fries",
    healthier: "Baked Sweet Potato Fries",
    ingredients: {
      original: ["200g Russet potatoes", "1 tbsp (15ml) Vegetable oil", "1/2 tsp Salt"],
      healthier: ["200g Sweet potatoes", "1 tbsp (15ml) Olive oil", "1/2 tsp Sea salt"]
    }
  },
  {
    name: "Fried Chicken",
    healthier: "Air Fried Chicken",
    ingredients: {
      original: [
        "200g Chicken breast",
        "1/2 cup (60g) All-purpose flour",
        "2 tbsp (30ml) Vegetable oil",
        "1/2 tsp Salt",
        "1/4 tsp Pepper"
      ],
      healthier: [
        "200g Air-fried chicken breast",
        "1/2 cup (60g) Almond flour",
        "1 tsp Olive oil spray",
        "1/2 tsp Himalayan salt",
        "1/4 tsp Black pepper"
      ]
    }
  }
];

const App = () => {
  const [search, setSearch] = useState("");
  const [ingredientFilter, setIngredientFilter] = useState("");
  const [selectedRecipe, setSelectedRecipe] = useState(null);

  const filteredRecipes = recipes.filter((recipe) =>
    recipe.name.toLowerCase().includes(search.toLowerCase())
  );

  return (
    <div className="app-container">
      <header>
        <h1>Better Bit4es</h1>
        <input
          type="text"
          className="search-bar"
          placeholder="Search recipes..."
          value={search}
          onChange={(e) => setSearch(e.target.value)}
        />
        <input
          type="text"
          className="filter-bar"
          placeholder="Filter by ingredient..."
          value={ingredientFilter}
          onChange={(e) => setIngredientFilter(e.target.value)}
        />
      </header>

      <div className="recipe-grid">
        {filteredRecipes.map((recipe, index) => (
          <div
            key={index}
            className="recipe-card"
            onClick={() => setSelectedRecipe(recipe)}
          >
            <h3>{recipe.name}</h3>
            <p><strong>Healthier Alternative:</strong> {recipe.healthier}</p>
          </div>
        ))}
      </div>

      {selectedRecipe && (
        <div className="recipe-details">
          <button onClick={() => setSelectedRecipe(null)}>Close</button>
          <h2>{selectedRecipe.name}</h2>
          <p><strong>Healthier Alternative:</strong> {selectedRecipe.healthier}</p>
          <h3>Ingredients</h3>
          <p><strong>Original:</strong></p>
          <ul>
            {selectedRecipe.ingredients.original.map((item, idx) => (
              <li key={idx}>{item}</li>
            ))}
          </ul>
          <p><strong>Healthier:</strong></p>
          <ul>
            {selectedRecipe.ingredients.healthier.map((item, idx) => (
              <li key={idx}>{item}</li>
            ))}
          </ul>
        </div>
      )}

      <button className="ai-button" onClick={() => alert("Chatbot coming soon!")}>Ask AI</button>
    </div>
  );
};

export default App;
