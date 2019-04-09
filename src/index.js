// {
//   "id": 1,
//   "name": "Good Burger",
//   "description": "What a Good Burger!",
//   "image": "https://www.lovelesscafe.com/uploads/recipeimages/BBQBaconBurger-web.jpg"
// }

/*track application state  */
let burgers = []

/* initial dom manipulation variables */
let burgerURL = 'http://localhost:3000/burgers'
let customBurgerForm = document.querySelector('form#custom-burger')
let burgerMenu = document.querySelector('div#burger-menu')
let orderList = document.querySelector('ul#order-list')
let burgerAdapter = adapter(burgerURL)


// html for rendering
let summary = (burger) => {
  return `
 <div class="burger">
   <h3 class="order">${burger.name}</h3>
 </div>`}
 
 let profile = (burger) => {
 return `
 <div class="burger">
   <h3 class="burger_title">${burger.name}</h3>
     <img src=${burger.image}>
     <p class="burger_description">
     ${burger.description}
     </p>
     <button data-id="${burger.id}" data-action="Add-to-Order" class="button">Add to Order</button>
 </div>`}

// event listeners
(async () => {
  burgers = await burgerAdapter.getAll()
  renderAllBurgers(burgerMenu)
  })()


burgerMenu.addEventListener('click', e => {
  const selectedBurger = burgers.find(burger => burger.id === parseInt(e.target.dataset.id))
  renderBurger(selectedBurger, orderList, summary)
})

function renderBurger(burger, element, html) {
element.innerHTML += html(burger)
}

function renderAllBurgers(element) {
  burgers.forEach(burger => renderBurger(burger, element, profile))
}


// After that, build out the functionality that will allow customers to add their own burger creations to the menu. 
// After submitting the form, the burger should be appended to the menu with the correct information typed in the form.
//  It should also be added to customer's order as well as persist in the database, so that when we refresh the page, the 
//  burger is added to the menu for future customers.

customBurgerForm.addEventListener('submit', e => {
  e.preventDefault()
  console.log(e.target)
  let name = document.getElementById('burger-name').value
  let description = document.getElementById('burger-description').value
  let image = document.getElementById('burger-image').value

(async () => {
  let customBurger = await burgerAdapter.create({name, description, image})
  renderBurger(customBurger, burgerMenu, profile)
  renderBurger(customBurger, orderList, summary)
})()

e.target.reset()
})







