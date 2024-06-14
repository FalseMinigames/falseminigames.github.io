const sidebar = document.querySelector(".sidebar");
const closeGoal = "translateX(-12vw)";
const cartCounter = document.querySelector("#cartCounter");
var cartItems = localStorage.getItem("cartItemCount");
cartCounter.textContent = cartItems;
sidebar.style.transform = closeGoal;

function hideSidebar() {
  sidebar.style.transform = closeGoal;
}
function toggleSidebar() {
  if (sidebar.style.transform == closeGoal) {
    sidebar.style.transform = "translateX(0vw)";
  } else {
    sidebar.style.transform = closeGoal;
  }
}
function addItemToCart() {
  var button = this.document.activeElement;

  if (button.getAttribute("class") == "shopButton pointerOnHover") {
    cartItems = Number(cartItems) + 1;
    cartCounter.textContent = cartItems;
    localStorage.setItem("cartItemCount", cartItems);

    button.style.background = "none";
    button.setAttribute("class", "shopButton purchased");
    button.textContent = "EN EL CARRITO";
  }
}
function openCart() {
  window.location.href = "http://falseminigames.github.io/cart.html";
}

// Handle shop items

const data = {
  Popular: [
    "Images/1000x1000.png",
    "Images/StoreDisplay-300.png",
    "Images/stickerShopLogo.png",
    "Images/jojologo.png",
    "Images/bg.png",
    "Images/bg2.png",
    "Images/weatherRisort.png",
    "Images/YardStare.jpg",
    "Images/seamless_stars.png",
    "Images/softandwetoh.png",
  ],
  Nuevo: [
    "Images/1000x1000.png",
    "Images/StoreDisplay-300.png",
    "Images/stickerShopLogo.png",
    "Images/jojologo.png",
    "Images/bg.png",
    "Images/bg2.png",
    "Images/weatherRisort.png",
    "Images/YardStare.jpg",
    "Images/seamless_stars.png",
    "Images/softandwetoh.png",
  ],
  Limitados: [
    "Images/1000x1000.png",
    "Images/StoreDisplay-300.png",
    "Images/stickerShopLogo.png",
    "Images/jojologo.png",
    "Images/bg.png",
    "Images/bg2.png",
    "Images/weatherRisort.png",
    "Images/YardStare.jpg",
    "Images/seamless_stars.png",
    "Images/softandwetoh.png",
  ],
};
const main = document.querySelector("main");

for (let [key, value] of Object.entries(data)) {
  const section = document.createElement("section");
  const title = document.createElement("h2");
  const itemContainer = document.createElement("div");

  section.setAttribute("class", "shopSection");
  itemContainer.setAttribute("class", "gridLayout");
  title.setAttribute("id", key);

  title.textContent = key;

  main.appendChild(section);
  section.appendChild(title);
  section.appendChild(itemContainer);

  value.forEach(function (image, index) {
    const shopItem = document.createElement("div");
    const shopImageContainer = document.createElement("div");
    const shopImage = document.createElement("img");
    const shopButton = document.createElement("button");

    shopImage.setAttribute("src", image);
    shopButton.textContent = "Añadir al carrito";

    shopItem.setAttribute("class", "shopItem");
    shopImageContainer.setAttribute("class", "shopImage");
    shopButton.setAttribute("class", "shopButton pointerOnHover");
    shopButton.setAttribute("onclick", "addItemToCart()");

    shopItem.setAttribute("id", key + "_" + index);

    itemContainer.appendChild(shopItem);
    shopItem.appendChild(shopImageContainer);
    shopImageContainer.appendChild(shopImage);
    shopItem.appendChild(shopButton);
  });
}

// Custom Upload //

const customBG = document.querySelector(".customBackground")
const imagePreview = document.querySelector("#customPreview");
const imageInput = document.querySelector("#imgInp");

function onCustomInputChange(event) {
  console.log(event);
  imagePreview.setAttribute("src", URL.createObjectURL(imageInput.files[0]));
}

function closeCustom(){
  console.log(customBG.style.display)
  customBG.style.display = "none"
}

function openCustom(){
  customBG.style.display = "flex"
}

function addCustomToCart() {
  cartItems = Number(cartItems) + 1;
  cartCounter.textContent = cartItems;
  localStorage.setItem("cartItemCount", cartItems);

  closeCustom()
}
