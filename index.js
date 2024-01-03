const sellerForm = document.getElementById('sellerForm');
const addBtn = document.getElementById('addBtn');
const electronicsList = document.getElementById('electronicsList');
const foodList = document.getElementById('foodList');
const skinCareList = document.getElementById('skinCareList');

addBtn.addEventListener('click',function(e) {
    e.preventDefault();
    const price = document.getElementById('price').value;
    const name = document.getElementById('name').value;
    const category = document.getElementById('category').value;

    const productDetails = {
        price:price,
        name:name,
        category:category,
    };

    saveToCrud(productDetails);
});

function showProductDetails(id, price, name, category) {
    const li = document.createElement('li');
    li.id = id; 
    li.innerHTML=`${price}-${name}-${category}`;

    const delBtn = document.createElement('button');
    delBtn.innerHTML='Delete';

    delBtn.addEventListener('click', function() {
        axios.delete(`https://crudcrud.com/api/1ffa5ab19a7e49a782cb793abed75e14/adminPage/${li.id}`)
        .then((res) => {
            li.remove();
        })
        .catch(err => console.log(err));
    });

    li.appendChild(delBtn);

    switch (category) {
        case "Electronics":
            electronicsList.appendChild(li);
            break;
        case "Food":
            foodList.appendChild(li);
            break;
        case "Skin Care":
            skinCareList.appendChild(li);
            break;
        default:
            console.log("Invalid category");
    }
}

function saveToCrud(productDetails) {
    axios.post("https://crudcrud.com/api/1ffa5ab19a7e49a782cb793abed75e14/adminPage", productDetails)
    .then((res) => {
        showProductDetails(res.data._id, productDetails.price, productDetails.name, productDetails.category)
    })
    .catch((err) => {
        console.log(err);
    });
}

function loadSavedData() {
    axios.get("https://crudcrud.com/api/1ffa5ab19a7e49a782cb793abed75e14/adminPage")
    .then((res) => {
        res.data.forEach((product) => {
            showProductDetails(product._id, product.price, product.name, product.category);
        });
    })
    .catch(err => console.log(err));
}

window.addEventListener("load", function() {
    loadSavedData();
});