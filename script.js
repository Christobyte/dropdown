const productTitle = document.getElementById('product-title');
const picture = document.getElementById('picture');
const materialCode = document.getElementById('code-value');
const price = document.getElementById('price-value');
const stock = document.getElementsByClassName('stock')[0];
const dropdownOption = document.getElementsByClassName('select')[0];
const optionText = document.getElementById('option-text');
const selectUl = document.getElementsByClassName('select_ul')[0];
const btn = document.getElementById('btn');
const chosenItem = document.getElementsByClassName('chosenitem')[0];

productData();

let liList = [];

// Dropdown open 
dropdownOption.addEventListener('click', function(){
    selectUl.classList.toggle('active')
});

// Button click to see message with id
btn.addEventListener('click', () => {
    chosenItem.classList.add('active');
});

// Fetching data from json file
async function productData() {
    const res = await fetch('products.json');
    const result = await res.json();


    // Creating dynamically new elements for each product in json file
    for(let i = 0; i < result.length; i++) {
        let product = result[i];
        selectUl.innerHTML = '';
        let li = document.createElement('li');
        li.innerHTML =`
        <div class="option">
            <p>${product.name}</p>
        </div>`   

        // Getting each new List-Element in an Array
        liList.push(li);
    }

    for(let i = 0; i < liList.length; i++) {
        let currentLi = liList[i];
        // Clicking on a specific item in dropdown gets the data of the right item
        currentLi.addEventListener('click', () => selectProduct(result[i]));
        // Getting every li-Element into the ul
        selectUl.appendChild(currentLi);
    }

    // Select first product as default
    selectProduct(result[0]);
}

// Get every product detail dynamically 
function selectProduct(result) {
    productTitle.innerText = result.name;
    picture.src = result.picture;
    materialCode.innerText = result.code;
    price.innerText = result.price;
    optionText.innerText = result.name;
    if (result.onstock) {
        stock.innerText = "Auf Lager";
        stock.style.color = "green";
    } else {
        stock.innerText = "Kein Lagerbestand";
        stock.style.color = "red";
    }

    // Chosing item and close dropdown
    selectUl.classList.remove('active');
    // Chose new item and remove the current message with ID
    chosenItem.classList.remove('active');
    // Setting message with ID
    chosenItem.innerText = "Sie haben das Produkt mit der Product ID: " + result.id + " ausgewählt";
    // chosenItem.innerText = BigInt(result.id);
}

// if (!Number.MAX_SAFE_INTEGER) {
//     Number.MAX_SAFE_INTEGER = 9007199254740991; // Math.pow(2, 53) - 1;
// }