import React, { useState, useEffect } from "react";
import "./styles.css";

// Extended recipe database with realistic food images (using placeholder gradients)
const recipes = [
  {
    id: 1,
    name: "Classic Cheeseburger",
    healthier: "Grilled Turkey Burger",
    image: "https://images.unsplash.com/photo-1568901346375-23c9450c58cd?w=800&h=600&fit=crop",
    calories: { original: 540, healthier: 380 },
    protein: { original: 28, healthier: 32 },
    benefits: ["Lower saturated fat", "More protein", "Whole grain fiber", "Heart-healthy fats"],
    ingredients: {
      original: [
        "150g Ground beef patty (80/20)",
        "1 White flour burger bun",
        "1 slice (28g) American cheese",
        "1 tbsp (15g) Mayonnaise",
        "2 Iceberg lettuce leaves",
        "2 Tomato slices",
        "3 Dill pickle slices"
      ],
      healthier: [
        "150g Lean ground turkey patty",
        "1 Whole wheat burger bun",
        "1 slice (28g) Low-fat Swiss cheese",
        "1 tbsp (15g) Mashed avocado",
        "2 Arugula leaves",
        "2 Tomato slices",
        "3 Dill pickle slices"
      ]
    }
  },
  {
    id: 2,
    name: "French Fries",
    healthier: "Baked Sweet Potato Fries",
    image: "https://images.unsplash.com/photo-1573080496219-bb080dd4f877?w=800&h=600&fit=crop",
    calories: { original: 365, healthier: 220 },
    protein: { original: 4, healthier: 3 },
    benefits: ["High in Vitamin A", "More fiber", "Lower glycemic index", "Natural sweetness"],
    ingredients: {
      original: [
        "200g Russet potatoes, cut into strips",
        "3 cups Vegetable oil (for deep frying)",
        "1 tsp Table salt",
        "Optional: Ketchup for dipping"
      ],
      healthier: [
        "200g Sweet potatoes, cut into strips",
        "1 tbsp Extra virgin olive oil",
        "1/2 tsp Sea salt",
        "1/4 tsp Smoked paprika",
        "Fresh rosemary sprigs"
      ]
    }
  },
  {
    id: 3,
    name: "Fried Chicken",
    healthier: "Air Fried Chicken",
    image: "https://images.unsplash.com/photo-1626645738196-c2a7c87a8f58?w=800&h=600&fit=crop",
    calories: { original: 480, healthier: 290 },
    protein: { original: 35, healthier: 38 },
    benefits: ["70% less fat", "Crispy texture", "No deep frying", "Gluten-free option"],
    ingredients: {
      original: [
        "200g Chicken breast, pounded thin",
        "1 cup All-purpose flour",
        "1 Egg, beaten",
        "1 cup Vegetable oil",
        "1 tsp Salt",
        "1/2 tsp Black pepper",
        "1/2 tsp Garlic powder"
      ],
      healthier: [
        "200g Chicken breast, pounded thin",
        "1/2 cup Almond flour",
        "1 Egg white, beaten",
        "Olive oil spray",
        "1/2 tsp Himalayan pink salt",
        "1/2 tsp Black pepper",
        "1/2 tsp Garlic powder",
        "1/4 tsp Cayenne pepper"
      ]
    }
  },
  {
    id: 4,
    name: "Creamy Pasta Alfredo",
    healthier: "Cauliflower Alfredo Pasta",
    image: "https://images.unsplash.com/photo-1645112411341-6c4fd023714a?w=800&h=600&fit=crop",
    calories: { original: 680, healthier: 320 },
    protein: { original: 18, healthier: 22 },
    benefits: ["Extra vegetables", "Lower carbs", "Rich in vitamins", "Creamy without cream"],
    ingredients: {
      original: [
        "200g Fettuccine pasta",
        "1 cup Heavy cream",
        "1/2 cup Butter",
        "1 cup Parmesan cheese, grated",
        "3 cloves Garlic, minced",
        "Salt and pepper to taste"
      ],
      healthier: [
        "200g Whole wheat fettuccine",
        "2 cups Cauliflower florets, steamed",
        "1/2 cup Unsweetened almond milk",
        "2 tbsp Nutritional yeast",
        "1/4 cup Parmesan cheese, grated",
        "3 cloves Garlic, roasted",
        "Fresh basil for garnish"
      ]
    }
  },
  {
    id: 5,
    name: "Chocolate Milkshake",
    healthier: "Chocolate Banana Smoothie",
    image: "https://images.unsplash.com/photo-1572490122747-3968b75cc699?w=800&h=600&fit=crop",
    calories: { original: 520, healthier: 240 },
    protein: { original: 10, healthier: 18 },
    benefits: ["Natural sugars only", "High protein", "Potassium boost", "No artificial flavors"],
    ingredients: {
      original: [
        "2 cups Vanilla ice cream",
        "1 cup Whole milk",
        "3 tbsp Chocolate syrup",
        "Whipped cream topping",
        "Chocolate sprinkles"
      ],
      healthier: [
        "2 Frozen bananas",
        "1 cup Unsweetened almond milk",
        "2 tbsp Raw cacao powder",
        "1 scoop Vanilla protein powder",
        "1 tbsp Almond butter",
        "Ice cubes"
      ]
    }
  },
  {
    id: 6,
    name: "Pepperoni Pizza",
    healthier: "Cauliflower Crust Pizza",
    image: "https://images.unsplash.com/photo-1565299624946-b28f40a0ae38?w=800&h=600&fit=crop",
    calories: { original: 450, healthier: 280 },
    protein: { original: 16, healthier: 20 },
    benefits: ["Low carb crust", "Extra veggies", "Gluten-free option", "Less sodium"],
    ingredients: {
      original: [
        "1 slice Traditional pizza dough",
        "3 tbsp Pizza sauce",
        "1/2 cup Mozzarella cheese",
        "8 Pepperoni slices",
        "1 tbsp Olive oil"
      ],
      healthier: [
        "1 Cauliflower crust base",
        "3 tbsp Low-sodium marinara",
        "1/4 cup Part-skim mozzarella",
        "Turkey pepperoni slices",
        "Fresh basil leaves",
        "Cherry tomatoes, halved"
      ]
    }
  },
  {
    id: 7,
    name: "Ice Cream Sundae",
    healthier: "Frozen Yogurt Parfait",
    image: "https://images.unsplash.com/photo-1563805042-7684c019e1cb?w=800&h=600&fit=crop",
    calories: { original: 580, healthier: 220 },
    protein: { original: 8, healthier: 15 },
    benefits: ["Probiotics", "Fresh fruit", "Lower sugar", "More protein"],
    ingredients: {
      original: [
        "2 scoops Vanilla ice cream",
        "2 tbsp Hot fudge sauce",
        "2 tbsp Caramel sauce",
        "Whipped cream",
        "Maraschino cherry",
        "Chopped peanuts"
      ],
      healthier: [
        "1 cup Greek frozen yogurt",
        "1/2 cup Mixed berries",
        "1 tbsp Dark chocolate chips",
        "2 tbsp Granola",
        "1 tbsp Honey drizzle",
        "Fresh mint leaf"
      ]
    }
  },
  {
    id: 8,
    name: "Beef Tacos",
    healthier: "Fish Tacos",
    image: "https://images.unsplash.com/photo-1565299585323-38d6b0865b47?w=800&h=600&fit=crop",
    calories: { original: 420, healthier: 310 },
    protein: { original: 22, healthier: 28 },
    benefits: ["Omega-3 fatty acids", "Leaner protein", "Fresh toppings", "Heart healthy"],
    ingredients: {
      original: [
        "150g Ground beef",
        "2 Corn tortillas",
        "1/4 cup Cheddar cheese",
        "2 tbsp Sour cream",
        "Shredded lettuce",
        "Taco seasoning packet"
      ],
      healthier: [
        "150g Grilled mahi-mahi",
        "2 Whole wheat tortillas",
        "1/4 Avocado, sliced",
        "2 tbsp Greek yogurt",
        "Cabbage slaw",
        "Fresh lime juice",
        "Cilantro"
      ]
    }
  },
  {
    id: 9,
    name: "Mac and Cheese",
    healthier: "Butternut Squash Mac",
    image: "https://images.unsplash.com/photo-1543339494-b4cd4f7ba686?w=800&h=600&fit=crop",
    calories: { original: 520, healthier: 340 },
    protein: { original: 18, healthier: 16 },
    benefits: ["Hidden veggies", "Vitamin A rich", "Less processed", "Natural color"],
    ingredients: {
      original: [
        "200g Elbow macaroni",
        "2 cups Cheddar cheese, shredded",
        "1 cup Whole milk",
        "3 tbsp Butter",
        "2 tbsp All-purpose flour",
        "Salt and pepper"
      ],
      healthier: [
        "200g Whole grain elbow pasta",
        "1 cup Butternut squash puree",
        "1/2 cup Sharp cheddar, shredded",
        "1/2 cup Unsweetened almond milk",
        "1 tbsp Nutritional yeast",
        "1/4 tsp Turmeric",
        "Fresh thyme"
      ]
    }
  }
];

// Navigation Component
const Navigation = ({ onScrollTo }) => (
  <nav className="nav">
    <div className="nav-container">
      <a href="#" className="nav-logo">
        <span className="nav-logo-icon">🥗</span>
        BetterBites
      </a>
      <ul className="nav-links">
        <li><span className="nav-link active" onClick={() => onScrollTo('hero')}>Home</span></li>
        <li><span className="nav-link" onClick={() => onScrollTo('recipes')}>Recipes</span></li>
        <li><span className="nav-link" onClick={() => onScrollTo('features')}>Features</span></li>
        <li><span className="nav-link" onClick={() => onScrollTo('footer')}>About</span></li>
      </ul>
    </div>
  </nav>
);

// Hero Section Component
const Hero = ({ onExplore }) => (
  <section className="hero" id="hero">
    <div className="hero-content">
      <span className="hero-badge animate-fade-in-up">
        ✨ Your Health Journey Starts Here
      </span>
      <h1 className="hero-title animate-fade-in-up animate-delay-1">
        Eat <span>Better</span>,<br />Live Better.
      </h1>
      <p className="hero-subtitle animate-fade-in-up animate-delay-2">
        Discover delicious, healthier alternatives to your favorite comfort foods.
        Same great taste, better nutrition.
      </p>
      <div className="hero-cta animate-fade-in-up animate-delay-3">
        <button className="btn btn-primary" onClick={onExplore}>
          <span>Explore Recipes</span>
          <span className="btn-icon">→</span>
        </button>
        <button className="btn btn-secondary">
          Learn More
        </button>
      </div>
    </div>
  </section>
);

// Search Section Component
const SearchSection = ({ search, setSearch }) => (
  <section className="search-section">
    <div className="search-container">
      <div className="search-wrapper">
        <span className="search-icon">🔍</span>
        <input
          type="text"
          className="search-input"
          placeholder="Search for any dish..."
          value={search}
          onChange={(e) => setSearch(e.target.value)}
        />
      </div>
    </div>
  </section>
);

// Recipe Card Component
const RecipeCard = ({ recipe, onClick, index }) => (
  <div
    className="recipe-card animate-fade-in-up"
    style={{ animationDelay: `${index * 0.1}s` }}
    onClick={() => onClick(recipe)}
  >
    <div className="recipe-card-image">
      <img
        src={recipe.image}
        alt={recipe.name}
        className="recipe-card-img"
        onError={(e) => {
          e.target.style.background = 'linear-gradient(135deg, #f5f5f7 0%, #e8e8ed 100%)';
          e.target.style.display = 'flex';
          e.target.style.alignItems = 'center';
          e.target.style.justifyContent = 'center';
        }}
      />
      <div className="recipe-card-gradient"></div>
      <span className="recipe-card-badge">
        🌱 Healthier Swap
      </span>
    </div>
    <div className="recipe-card-content">
      <h3 className="recipe-card-title">{recipe.name}</h3>
      <div className="recipe-card-swap">
        <span className="recipe-card-arrow">→</span>
        <span className="recipe-card-healthier">{recipe.healthier}</span>
      </div>
      <div className="recipe-card-stats">
        <div className="recipe-stat">
          <span className="recipe-stat-value">-{recipe.calories.original - recipe.calories.healthier}</span>
          <span className="recipe-stat-label">Calories</span>
        </div>
        <div className="recipe-stat">
          <span className="recipe-stat-value">{recipe.protein.healthier}g</span>
          <span className="recipe-stat-label">Protein</span>
        </div>
      </div>
    </div>
  </div>
);

// Recipe Modal Component
const RecipeModal = ({ recipe, onClose }) => {
  if (!recipe) return null;

  return (
    <div className={`modal-overlay ${recipe ? 'active' : ''}`} onClick={onClose}>
      <div className="modal" onClick={(e) => e.stopPropagation()}>
        <div className="modal-header">
          <img
            src={recipe.image}
            alt={recipe.name}
            className="modal-header-img"
          />
          <div className="modal-header-gradient"></div>
          <button className="modal-close" onClick={onClose}>✕</button>
          <div className="modal-title-area">
            <h2 className="modal-title">{recipe.name}</h2>
            <span className="modal-healthier-badge">
              🌱 Try: {recipe.healthier}
            </span>
          </div>
        </div>
        <div className="modal-body">
          <div className="comparison-grid">
            <div className="comparison-card original">
              <span className="comparison-label">Original Recipe</span>
              <ul className="ingredient-list">
                {recipe.ingredients.original.map((item, idx) => (
                  <li key={idx} className="ingredient-item">
                    <span className="ingredient-bullet"></span>
                    {item}
                  </li>
                ))}
              </ul>
            </div>
            <div className="comparison-card healthier">
              <span className="comparison-label">✓ Healthier Version</span>
              <ul className="ingredient-list">
                {recipe.ingredients.healthier.map((item, idx) => (
                  <li key={idx} className="ingredient-item">
                    <span className="ingredient-bullet"></span>
                    {item}
                  </li>
                ))}
              </ul>
            </div>
          </div>
          <div className="modal-benefits">
            <h4 className="benefits-title">
              💪 Health Benefits
            </h4>
            <div className="benefits-list">
              {recipe.benefits.map((benefit, idx) => (
                <span key={idx} className="benefit-tag">{benefit}</span>
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

// Features Section Component
const FeaturesSection = () => (
  <section className="section features-section" id="features">
    <div className="section-header">
      <span className="section-label">Why BetterBites</span>
      <h2 className="section-title">Healthy eating, simplified.</h2>
      <p className="section-subtitle">
        We make it easy to swap your favorite comfort foods for nutritious alternatives.
      </p>
    </div>
    <div className="features-grid">
      <div className="feature-card">
        <div className="feature-icon">🔄</div>
        <h3 className="feature-title">Smart Swaps</h3>
        <p className="feature-description">
          Intelligent suggestions that maintain the flavors you love while boosting nutrition.
        </p>
      </div>
      <div className="feature-card">
        <div className="feature-icon">📊</div>
        <h3 className="feature-title">Nutrition Facts</h3>
        <p className="feature-description">
          Clear comparisons showing exactly how many calories and nutrients you'll save.
        </p>
      </div>
      <div className="feature-card">
        <div className="feature-icon">🤖</div>
        <h3 className="feature-title">AI-Powered</h3>
        <p className="feature-description">
          Ask our AI assistant for personalized recommendations based on your preferences.
        </p>
      </div>
    </div>
  </section>
);

// Footer Component
const Footer = () => (
  <footer className="footer" id="footer">
    <div className="footer-logo">
      <span>🥗</span>
      BetterBites
    </div>
    <p className="footer-text">
      Making healthy eating accessible, one swap at a time.
    </p>
    <ul className="footer-links">
      <li><a href="#" className="footer-link">Privacy</a></li>
      <li><a href="#" className="footer-link">Terms</a></li>
      <li><a href="#" className="footer-link">Contact</a></li>
    </ul>
  </footer>
);

// Empty State Component
const EmptyState = () => (
  <div className="empty-state">
    <div className="empty-state-icon">🔍</div>
    <h3 className="empty-state-title">No recipes found</h3>
    <p className="empty-state-text">Try searching for something else</p>
  </div>
);

// Main App Component
const App = () => {
  const [search, setSearch] = useState("");
  const [selectedRecipe, setSelectedRecipe] = useState(null);

  const filteredRecipes = recipes.filter((recipe) =>
    recipe.name.toLowerCase().includes(search.toLowerCase()) ||
    recipe.healthier.toLowerCase().includes(search.toLowerCase())
  );

  const scrollTo = (id) => {
    const element = document.getElementById(id);
    if (element) {
      element.scrollIntoView({ behavior: 'smooth' });
    }
  };

  const handleExplore = () => {
    scrollTo('recipes');
  };

  // Handle escape key to close modal
  useEffect(() => {
    const handleEscape = (e) => {
      if (e.key === 'Escape') {
        setSelectedRecipe(null);
      }
    };
    window.addEventListener('keydown', handleEscape);
    return () => window.removeEventListener('keydown', handleEscape);
  }, []);

  // Prevent body scroll when modal is open
  useEffect(() => {
    if (selectedRecipe) {
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = 'unset';
    }
  }, [selectedRecipe]);

  return (
    <div className="app">
      <Navigation onScrollTo={scrollTo} />

      <Hero onExplore={handleExplore} />

      <SearchSection search={search} setSearch={setSearch} />

      <section className="section recipes-section" id="recipes">
        <div className="section-header">
          <span className="section-label">Discover</span>
          <h2 className="section-title">Popular Swaps</h2>
          <p className="section-subtitle">
            Click on any dish to see the healthier alternative and full ingredient comparison.
          </p>
        </div>

        {filteredRecipes.length > 0 ? (
          <div className="recipe-grid">
            {filteredRecipes.map((recipe, index) => (
              <RecipeCard
                key={recipe.id}
                recipe={recipe}
                index={index}
                onClick={setSelectedRecipe}
              />
            ))}
          </div>
        ) : (
          <EmptyState />
        )}
      </section>

      <FeaturesSection />

      <Footer />

      <RecipeModal
        recipe={selectedRecipe}
        onClose={() => setSelectedRecipe(null)}
      />

      <button
        className="ai-chat-fab"
        onClick={() => alert("AI Assistant coming soon! 🤖")}
        title="Chat with AI"
      >
        💬
      </button>
    </div>
  );
};

export default App;
