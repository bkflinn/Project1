let allProducts = [];
let allWarehouses = [];

let productIdToBeUsed = 0;

let requests = ["products", "warehouses"];

document.addEventListener("DOMContentLoaded", () => {
  let xhr = new XMLHttpRequest();

  (function loop(i, length) {
    if (i >= length) {
      return;
    }
    let URL = "http://localhost:8080/" + requests[i];

    console.log(URL);

    xhr.onreadystatechange = () => {
      if (xhr.readyState == 4) {
        if (i == 0) {
          let products = JSON.parse(xhr.responseText);

          products.forEach((newProduct) => {
            addProductToTable(newProduct);
          });
          loop(i + 1, length);
        } else {
          let warehouses = JSON.parse(xhr.responseText);

          warehouses.forEach((newWarehouse) => {
            addWarehouseToTable(newWarehouse);
          });
        }
      }
    };

    xhr.open("GET", URL);

    xhr.send();
  })(0, requests.length);
});

// add products to table
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

  editBtn.innerHTML = `<button type="button" class="btn btn-primary" data-toggle="modal" data-target="#productUpdateModal" onclick="setProductIdToBeUsed(${newProduct.id})">Edit</button>`;

  deleteBtn.innerHTML = `<button type="button" class="btn btn-primary" data-toggle="modal" data-target="#productDeleteModal" onclick="setProductIdToBeUsed(${newProduct.id})">Delete</button>`;

  tr.appendChild(id);
  tr.appendChild(name);
  tr.appendChild(color);
  tr.appendChild(editBtn);
  tr.appendChild(deleteBtn);

  tr.setAttribute("id", "TR" + newProduct.id);

  document.getElementById("product-table-body").appendChild(tr);

  allProducts.push(newProduct);
}

// add warehouses to table
function addWarehouseToTable(newWarehouse) {
  let tr = document.createElement("tr");
  let id = document.createElement("td");
  let location = document.createElement("td");
  let numberOfItems = document.createElement("td");
  let maxCapacity = document.createElement("td");
  let editBtn = document.createElement("td");
  let deleteBtn = document.createElement("td");

  id.innerText = newWarehouse.id;
  location.innerText = newWarehouse.warehouse_location;
  numberOfItems.innerText = newWarehouse.number_of_items;
  maxCapacity.innerText = newWarehouse.max_capacity;

  editBtn.innerHTML = `<button class="btn btn-primary" id="edit-button" onclick="activateEditForm(${newWarehouse.id})">Edit</button>`;

  deleteBtn.innerHTML = `<button class="btn btn-primary" id="delete-button" onclick="activateDeleteForm(${newWarehouse.id})">Delete</button>`;

  tr.appendChild(id);
  tr.appendChild(location);
  tr.appendChild(numberOfItems);
  tr.appendChild(maxCapacity);
  tr.appendChild(editBtn);
  tr.appendChild(deleteBtn);

  tr.setAttribute("id", "TR" + newWarehouse.id);

  document.getElementById("warehouse-table-body").appendChild(tr);

  allWarehouses.push(newWarehouse);
}

// set the id of the product that is to be deleted
function setProductIdToBeUsed(productId) {
  productIdToBeUsed = productId;

  for (let p of allProducts) {
    if (p.id == productIdToBeUsed) {
      document.getElementById("update-product-id").value = p.id;
      document.getElementById("update-product-name").value = p.product_name;
      document.getElementById("update-product-color").value = p.color;
    }
  }
}

// update product
document.getElementById("update-product").addEventListener("click", (event) => {
  event.preventDefault();

  let inputData = new FormData(document.getElementById("update-product-form"));

  let product = {
    id: document.getElementById("update-product-id").value,
    product_name: inputData.get("update-product-name"),
    color: inputData.get("update-product-color"),
  };

  // for (let p of allProducts) {
  //   if (p.id == productIdToBeUsed) {
  //     product = p;
  //   }
  // }

  let URL = "http://localhost:8080/products";

  fetch(URL + "/product", {
    method: "PUT",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(product),
  })
    .then((data) => {
      // this will handle all 100, 200, and 300 status code responses

      // we still need to serialize the response into JSON
      console.log(data);
      return data.json();
    })
    .then((productJson) => {
      // handling the promise returned by data.json (*** this is where we update the table ***)

      // adding the updated movie to our table
      updateProductInTable(productJson);

      // reset the forms
      //document.getElementById("update-movie-form").reset();
      //document.getElementById("new-movie-form").style.display = "block";
      //document.getElementById("update-movie-form").style.display = "none";
    })
    .catch((error) => {
      // this will handle all 400 and 500 status code responses

      console.error(error); // generally, you never want to use console.log() - especially in a production environment
    });
});

// delete product
document.getElementById("delete-product").addEventListener("click", (event) => {
  event.preventDefault();

  let product = 0;

  for (let p of allProducts) {
    if (p.id == productIdToBeUsed) {
      product = p;
    }
  }

  let URL = "http://localhost:8080/products";

  // sending delete request
  fetch(URL + "/product", {
    method: "DELETE",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(product),
  })
    .then((data) => {
      // delete request returns no-content so there's no need to deserialize the response and wait for that promie
      // just need to check that the response we got back is 204 - No Content and we can delete it on the front end
      if (data.status === 204) {
        // remove movie from table
        removeProductFromTable(product);

        // resetting all forms
        //resetAllForms();
      }
    })
    .catch((error) => {
      console.error(error);
    });
});

function updateProductInTable(product) {
  document.getElementById("TR" + product.id).innerHTML = `
    <td>${product.id}</td>
    <td>${product.product_name}</td>
    <td>${product.color}</td>
    <td><button type="button" class="btn btn-primary" data-toggle="modal" data-target="#productUpdateModal" onclick="setProductIdToBeUsed(${product.id})">Edit</button></td>
    <td><button type="button" class="btn btn-primary" data-toggle="modal" data-target="#productDeleteModal" onclick="setProductIdToBeUsed(${product.id})">Delete</button></td>
    `;
}

function removeProductFromTable(product) {
  // removing the <tr> from the table when a movie gets deleted
  const element = document.getElementById("TR" + product.id);
  element.remove();
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
