
const result = document.getElementById("result")
const recipeTitle = document.getElementById("recipeTitle")
const image = document.getElementById("image")

function recipe(userInput){

    const url = `https://www.themealdb.com/api/json/v1/1/search.php?s=${userInput}`

    fetch(url)
    .then(response => response.json())
    .then(data => {

        //console.log(userInput.value)
        const meal = data.meals[0]
    
        //console.log(data)
        //console.log(userInput)
        //console.log(meal.strMealThumb)
        //console.log(meal.strMeal)
        //console.log(meal.strArea)
        //console.log(meal.strInstructions)

        let count = 1
        const ingredients =[]
        for (let i in meal){
            let ingredient = ""
            let measure=""

            if(i.startsWith("strIngredient") && meal[i]){
                ingredient = meal[i]
                measure = meal[`strMeasure` + count]
                count += 1
                //console.log(ingredient, measure)
                ingredients.push(`${measure} ${ingredient} `)
            }
        }

       //console.log(ingredients)
       result.innerHTML= `<img src="${meal.strMealThumb}">
       <div class="details">
       <h2>${meal.strMeal}</h2>
       <h4>${meal.strArea}</h4>
       </div>
       <div id="ingredient-con"></div>
       <div id="recipe">
            <button id="hide-recipe">X</button>
            <pre id="instructions">${meal.strInstructions}</pre>
       </div>
       <button id="show-recipe">View Recipe</button>`

       const ingredientCon = document.getElementById("ingredient-con")
       const parent = document.createElement("ul")
       const recipe = document.getElementById("recipe")
       const hideRecipe = document.getElementById("hide-recipe")
       const showRecipe = document.getElementById('show-recipe')

       ingredients.forEach((i) => {
        const child = document.createElement("li")
        child.textContent = i
        parent.appendChild(child)
        ingredientCon.appendChild(parent)
       })

       hideRecipe.addEventListener("click", () => {
        recipe.style.display = "none"
       })

       showRecipe.addEventListener("click", () => {
        recipe.style.display = "block"
       })

       if(userInput === 0){
         return result.innerHTML = `<h3>Input Field Cannot Be Empty</h3>`
       }

    })
    .catch(err => {
        result.innerHTML = `<h3>Invalid Input</h3>`
    })
}

function searchRecipe(){
    const userInput = document.getElementById("user-input").value
    recipe(userInput)
    

}