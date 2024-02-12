const ingredients = [
    { name: "Popcorn", carbs: 8, protein: 10, fats: 10 },
    { name: "Almonds", carbs: 12, protein: 15, fats: 6 },
    { name: "Dried Cranberries", carbs: 5, protein: 1, fats: 5 },
    { name: "Pretzel Sticks", carbs: 10, protein: 3, fats: 2 },
    { name: "Dark Chocolate Chips", carbs: 7, protein: 4, fats: 13 }
];

const selectedIngredients = {};

function createIngredientCard(ingredient) {
    const card = document.createElement('div');
    card.classList.add('p-4', 'bg-white', 'rounded', 'shadow');
    card.innerHTML = `
        <h3 class="font-bold">${ingredient.name}</h3>
        <div>Carbs: ${ingredient.carbs}%</div>
        <div>Protein: ${ingredient.protein}%</div>
        <div>Fats: ${ingredient.fats}%</div>
        <input type="number" min="0" value="0" class="quantity-input mt-2" data-name="${ingredient.name}" />
    `;
    return card;
}

function updateNutritionalDisplay() {
    // Calculate and update the nutritional chart
    let totalCarbs = 0, totalProtein = 0, totalFats = 0;
    for (const [name, quantity] of Object.entries(selectedIngredients)) {
        const ingredient = ingredients.find(ing => ing.name === name);
        totalCarbs += ingredient.carbs * quantity;
        totalProtein += ingredient.protein * quantity;
        totalFats += ingredient.fats * quantity;
    }
    const nutritionalChart = document.getElementById('nutritionalChart');
    nutritionalChart.innerHTML = `
        <div>Total Carbohydrates: ${totalCarbs}%</div>
        <div>Total Protein: ${totalProtein}%</div>
        <div>Total Fats: ${totalFats}%</div>
    `;
}

function init() {
    const ingredientsContainer = document.getElementById('ingredients');
    ingredients.forEach(ingredient => {
        const card = createIngredientCard(ingredient);
        ingredientsContainer.appendChild(card);
    });

    document.querySelectorAll('.quantity-input').forEach(input => {
        input.addEventListener('change', e => {
            const name = e.target.getAttribute('data-name');
            const quantity = parseInt(e.target.value, 10);
            selectedIngredients[name] = quantity;
            updateNutritionalDisplay();
        });
    });

    document.getElementById('submitBtn').addEventListener('click', () => {
        // Handle mix submission and provide feedback
        alert('Mix submitted!');
    });
}

init();
