const URL = "http://localhost:8080/products";

let allProducts = [];

document.addEventListener("DOMContentLoaded", () => {
  let xhr = new XMLHttpRequest();

  xhr.onreadystatechange = () => {
    if (xhr.readyState == 4) {
      let products = JSON.parse(xhr.responseText);

      products.forEach((newProduct) => {
        addProductToTable(newProduct);
      });
    }
  };

  xhr.open("GET", URL);

  xhr.send();
});

function addProductToTable(newProduct) {
  let tr = document.createElement("tr");
  let id = document.createElement("td");
  let name = document.createElement("td");
  let color = document.createElement("td");
  let editBtn = document.createElement("td");
  let deleteBtn = document.createElement("td");

  id.innerText = newProduct.id;
  name.innerText = newProduct.product_name;
  color.innerText = newProduct.color;

  //editBtn.innerHTML = `<button class="btn btn-primary" id="edit-button" onclick="activateEditForm(${newProduct.id})">Edit</button>`;
  editBtn.innerHTML = `<button class="btn btn-primary" id="edit-button" onclick="showProducts()">Edit</button>`;

  deleteBtn.innerHTML = `<button class="btn btn-primary" id="delete-button" onclick="activateDeleteForm(${newProduct.id})">Delete</button>`;

  tr.appendChild(id);
  tr.appendChild(name);
  tr.appendChild(color);
  tr.appendChild(editBtn);
  tr.appendChild(deleteBtn);

  tr.setAttribute("id", "TR" + newProduct.id);

  document.getElementById("product-table-body").appendChild(tr);

  allProducts.push(newProduct);
}

// Tab Functionality

function showProducts() {
  document.getElementById("products").style.display = "block";
  document.getElementById("warehouses").style.display = "none";

  document.getElementById("products-tab").className = "nav-link active";
  document.getElementById("warehouses-tab").className = "nav-link";
}

function showWarehouses() {
  document.getElementById("products").style.display = "none";
  document.getElementById("warehouses").style.display = "block";

  document.getElementById("products-tab").className = "nav-link";
  document.getElementById("warehouses-tab").className = "nav-link active";
}
