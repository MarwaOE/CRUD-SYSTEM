var productName = document.getElementById("productName");
var productPrice = document.getElementById("productPrice");
var productDescription = document.getElementById("productDescription");
var productCategory = document.getElementById("productCategory");

var ProductList = JSON.parse(localStorage.getItem("Products")) || [];
var itemIndex = -1; // track which item is being edited

displayProducts();

// ✅ Add new product
function getInputValues() {
    var pro = {
        name: productName.value,
        price: productPrice.value,
        desc: productDescription.value,
        category: productCategory.value
    };

    ProductList.push(pro);
    localStorage.setItem("Products", JSON.stringify(ProductList));

    clearInputs();
    displayProducts();
}

// ✅ Clear input values
function clearInputs() {
    productName.value = "";
    productPrice.value = "";
    productDescription.value = "";
    productCategory.value = "";
}

// ✅ Display products
function displayProducts() {
    var box = "";

    for (var i = 0; i < ProductList.length; i++) {
        box += `
        <div class="col-md-3">
            <div class="card shadow h-100" style="width: 100%;">
                <img src="images/Apple_16-inch_MacBook_Pro_rend.png.avif" class="card-img-top" alt="...">
                <div class="card-body">
                    <h5 class="card-title">${ProductList[i].name}</h5>
                    <h5>${ProductList[i].category}</h5>
                    <p class="card-text">${ProductList[i].desc}</p>
                    <p>Price: ${ProductList[i].price}$</p>
                    
                    <!-- Edit button -->
                    <button onclick="update(${i})" class="btn btn-warning">
                        <i class="fa-solid fa-pen-to-square"></i>
                    </button>
                    
                    <!-- Delete button -->
                    <button onclick="Remove(${i})" class="btn btn-danger">
                        <i class="fa-solid fa-trash"></i>
                    </button>
                </div>
            </div>
        </div>`;
    }

    document.getElementById("productList").innerHTML = box;
}

// ✅ Delete product
function Remove(index) {
    ProductList.splice(index, 1);
    localStorage.setItem("Products", JSON.stringify(ProductList));
    displayProducts();
}

// ✅ Load product into form (Edit mode)
function update(index) {
        // Switch buttons
    document.getElementById("saveBtn").style.display = "block";
    document.getElementById("addBtn").style.display = "none";
    itemIndex = index;

    productName.value = ProductList[index].name;
    productPrice.value = ProductList[index].price;
    productDescription.value = ProductList[index].desc;
    productCategory.value = ProductList[index].category;


}

// ✅ Save edited product
function save() {
    ProductList[itemIndex].name = productName.value;
    ProductList[itemIndex].price = productPrice.value;
    ProductList[itemIndex].desc = productDescription.value;
    ProductList[itemIndex].category = productCategory.value;

    localStorage.setItem("Products", JSON.stringify(ProductList));
    displayProducts();
    clearInputs();

    // Switch buttons back
    document.getElementById("saveBtn").style.display = "none";
    document.getElementById("addBtn").style.display = "block";

    itemIndex = -1; // reset edit mode
}
