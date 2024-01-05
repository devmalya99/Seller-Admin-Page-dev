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

    if(!price || !name || !category)
    {
        alert('Please Fill in All the details')
    }
    else
    {
        const productDetails = {
        price:price,
        name:name,
        category:category,
    };

    saveToCrud(productDetails);
    }
    
});

function showProductDetails(id, price, name, category) {
    const li = document.createElement('li');
    li.id = id; 
    li.innerHTML=`${price}-${name}-${category}`;

    const delBtn = document.createElement('button');
    delBtn.innerHTML='Delete';
    delBtn.setAttribute('class','del')

    delBtn.addEventListener('click', async function() {
        try {
            const res = await axios.delete(`https://crudcrud.com/api/305e202ae8f0402c8fb77e2003b59579/adminPage/${li.id}`);
            li.remove();
        } catch(err) {
            console.log(err);
        }
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

async function saveToCrud(productDetails) {
    try {
        const res = await axios.post("https://crudcrud.com/api/305e202ae8f0402c8fb77e2003b59579/adminPage", productDetails);
        showProductDetails(res.data._id, productDetails.price, productDetails.name, productDetails.category);
    } catch(err) {
        console.log(err);
    } finally {
        sellerForm.reset();
    }
}

async function loadSavedData() 
{
  try{
    const res=await axios.get("https://crudcrud.com/api/305e202ae8f0402c8fb77e2003b59579/adminPage")
     res.data.forEach((product) => {
            showProductDetails(product._id, product.price, product.name, product.category);
        });
    
  }
  catch(err)
  {
   console.log(err);
  }
}

window.addEventListener("load", function() {
    loadSavedData();
});
