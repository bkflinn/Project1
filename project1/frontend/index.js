let allProducts = [];
let allWarehouses = [];
let allItems = [];

let productIdToBeUsed = 0;
let warehouseIdToBeUsed = 0;
let itemIdToBeUsed = 0;

let requests = ["products", "warehouses"];

document.addEventListener("DOMContentLoaded", () => {
  let xhr = new XMLHttpRequest();

  (function loop(i, length) {
    if (i >= length) {
      return;
    }
    let URL = "http://localhost:8080/" + requests[i];

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

function getItems(warehouseId) {
  let xhr = new XMLHttpRequest();

  setWarehouseIdToBeUsed(warehouseId);

  let URL = "http://localhost:8080/items/warehouse?warehouseId=" + warehouseId;

  xhr.onreadystatechange = () => {
    if (xhr.readyState == 4) {
      let items = JSON.parse(xhr.responseText);

      while (document.getElementById("item-table-body").firstElementChild) {
        document.getElementById("item-table-body").firstElementChild.remove();
      }

      items.forEach((newItem) => {
        addItemToTable(newItem);
      });
    }
  };

  xhr.open("GET", URL);

  xhr.send();
}

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

  tr.setAttribute("id", "TR" + "product" + newProduct.id);

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
  let viewBtn = document.createElement("td");
  let editBtn = document.createElement("td");
  let deleteBtn = document.createElement("td");

  id.innerText = newWarehouse.id;
  location.innerText = newWarehouse.warehouse_location;
  numberOfItems.innerText = newWarehouse.number_of_items;
  maxCapacity.innerText = newWarehouse.max_capacity;

  viewBtn.innerHTML = `<button type="button" class="btn btn-primary" data-toggle="modal" data-target="#itemsModal" onclick="getItems(${newWarehouse.id})">View</button>`;

  editBtn.innerHTML = `<button type="button" class="btn btn-primary" data-toggle="modal" data-target="#warehouseUpdateModal" onclick="setWarehouseIdToBeUsed(${newWarehouse.id})">Edit</button>`;

  deleteBtn.innerHTML = `<button type="button" class="btn btn-primary" data-toggle="modal" data-target="#warehouseDeleteModal" onclick="setWarehouseIdToBeUsed(${newWarehouse.id})">Delete</button>`;

  tr.appendChild(id);
  tr.appendChild(location);
  tr.appendChild(numberOfItems);
  tr.appendChild(maxCapacity);
  tr.appendChild(viewBtn);
  tr.appendChild(editBtn);
  tr.appendChild(deleteBtn);

  tr.setAttribute("id", "TR" + "warehouse" + newWarehouse.id);

  document.getElementById("warehouse-table-body").appendChild(tr);

  allWarehouses.push(newWarehouse);
}

// add items to table
function addItemToTable(newItem) {
  let tr = document.createElement("tr");
  // let id = document.createElement("td");
  let productId = document.createElement("td");
  //let warehouseId = document.createElement("td");
  let quantity = document.createElement("td");
  let editBtn = document.createElement("td");
  let deleteBtn = document.createElement("td");

  for (let p of allProducts) {
    if (p.id == newItem.productId) {
      productId.innerText = p.product_name;
    }
  }

  // id.innerText = newItem.id;
  //productId.innerText = newItem.productId;
  //warehouseId.innerText = newItem.warehouseId;
  quantity.innerText = newItem.item_quantity;

  editBtn.innerHTML = `<button type="button" class="btn btn-primary" data-toggle="modal" data-target="#itemUpdateModal" onclick="setItemIdToBeUsed(${newItem.id})">Edit</button>`;

  deleteBtn.innerHTML = `<button type="button" class="btn btn-primary" data-toggle="modal" data-target="#itemDeleteModal" onclick="setItemIdToBeUsed(${newItem.id})">Delete</button>`;

  // tr.appendChild(id);
  tr.appendChild(productId);
  //tr.appendChild(warehouseId);
  tr.appendChild(quantity);
  tr.appendChild(editBtn);
  tr.appendChild(deleteBtn);

  tr.setAttribute("id", "TR" + "item" + newItem.id);

  document.getElementById("item-table-body").appendChild(tr);

  allItems.push(newItem);
}

// set the id of the product that is to be used
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

// set the id of the warehouse that is to be used
function setWarehouseIdToBeUsed(warehouseId) {
  warehouseIdToBeUsed = warehouseId;

  for (let w of allWarehouses) {
    if (w.id == warehouseId) {
      document.getElementById("update-warehouse-id").value = w.id;
      document.getElementById("update-warehouse-location").value =
        w.warehouse_location;
      document.getElementById("update-warehouse-number-of-items").value =
        w.number_of_items;
      document.getElementById("update-warehouse-max-capacity").value =
        w.max_capacity;
    }
  }
}

// set the id of the item that is to be used
function setItemIdToBeUsed(itemId) {
  itemIdToBeUsed = itemId;

  for (let i of allItems) {
    if (i.id == itemIdToBeUsed) {
      document.getElementById("update-item-id").value = i.id;
      document.getElementById("update-item-product").value = i.productId;
      document.getElementById("update-item-quantity").value = i.item_quantity;
    }
  }
}

// add product
document.getElementById("add-product").addEventListener("click", (event) => {
  event.preventDefault();

  let inputData = new FormData(document.getElementById("add-product-form"));

  let newProduct = {
    product_name: inputData.get("add-product-name"),
    color: inputData.get("add-product-color"),
  };

  let URL = "http://localhost:8080/products";

  fetch(URL + "/product", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(newProduct),
  })
    .then((data) => {
      return data.json();
    })
    .then((productJson) => {
      addProductToTable(productJson);
      document.getElementById("add-product-form").reset();
    })
    .catch((error) => {
      console.error(error);
    });
});

// update product
document.getElementById("update-product").addEventListener("click", (event) => {
  event.preventDefault();

  let inputData = new FormData(document.getElementById("update-product-form"));

  let product = {
    id: document.getElementById("update-product-id").value,
    product_name: inputData.get("update-product-name"),
    color: inputData.get("update-product-color"),
  };

  let URL = "http://localhost:8080/products";

  fetch(URL + "/product", {
    method: "PUT",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(product),
  })
    .then((data) => {
      return data.json();
    })
    .then((productJson) => {
      updateProductInTable(productJson);
    })
    .catch((error) => {
      console.error(error);
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
      if (data.status === 204) {
        removeProductFromTable(product);
        allWarehouses.forEach((warehouse) => {
          setWarehouseIdToBeUsed(warehouse.id);
          document.getElementById("update-warehouse").click();
        });
      }
    })
    .catch((error) => {
      console.error(error);
    });
});

// add warehouse
document.getElementById("add-warehouse").addEventListener("click", (event) => {
  event.preventDefault();

  let inputData = new FormData(document.getElementById("add-warehouse-form"));

  let newWarehouse = {
    warehouse_location: inputData.get("add-warehouse-location"),
    number_of_items: inputData.get("add-warehouse-number-of-items"),
    max_capacity: inputData.get("add-warehouse-max-capacity"),
  };

  let URL = "http://localhost:8080/warehouses";

  fetch(URL + "/warehouse", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(newWarehouse),
  })
    .then((data) => {
      return data.json();
    })
    .then((warehouseJson) => {
      addWarehouseToTable(warehouseJson);
      document.getElementById("add-warehouse-form").reset();
    })
    .catch((error) => {
      console.error(error);
    });
});

// update warehouse
document
  .getElementById("update-warehouse")
  .addEventListener("click", (event) => {
    event.preventDefault();

    let inputData = new FormData(
      document.getElementById("update-warehouse-form")
    );

    let warehouse = {
      id: document.getElementById("update-warehouse-id").value,
      warehouse_location: inputData.get("update-warehouse-location"),
      number_of_items: inputData.get("update-warehouse-number-of-items"),
      max_capacity: inputData.get("update-warehouse-max-capacity"),
    };

    let URL = "http://localhost:8080/warehouses";

    fetch(URL + "/warehouse", {
      method: "PUT",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(warehouse),
    })
      .then((data) => {
        return data.json();
      })
      .then((warehouseJson) => {
        updateWarehouseInTable(warehouseJson);
      })
      .catch((error) => {
        console.error(error);
      });
  });

// delete warehouse
document
  .getElementById("delete-warehouse")
  .addEventListener("click", (event) => {
    event.preventDefault();

    let warehouse = 0;

    for (let w of allWarehouses) {
      if (w.id == warehouseIdToBeUsed) {
        warehouse = w;
      }
    }

    let URL = "http://localhost:8080/warehouses";

    // sending delete request
    fetch(URL + "/warehouse", {
      method: "DELETE",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(warehouse),
    })
      .then((data) => {
        if (data.status === 204) {
          removeWarehouseFromTable(warehouse);
        }
      })
      .catch((error) => {
        console.error(error);
      });
  });

// add item
document.getElementById("add-item").addEventListener("click", (event) => {
  event.preventDefault();

  let inputData = new FormData(document.getElementById("add-item-form"));

  let newItem = {
    productId: inputData.get("add-item-product"),
    warehouseId: warehouseIdToBeUsed,
    item_quantity: inputData.get("add-item-quantity"),
  };

  let URL = "http://localhost:8080/items";

  fetch(URL + "/item", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(newItem),
  })
    .then((data) => {
      return data.json();
    })
    .then((itemJson) => {
      addItemToTable(itemJson);
      setWarehouseIdToBeUsed(newItem.warehouseId);
      document.getElementById("update-warehouse").click();
      document.getElementById("add-item-form").reset();
    })
    .catch((error) => {
      document.getElementById("add-item-form").reset();
      console.error(error);
    });
});

// update item
document.getElementById("update-item").addEventListener("click", (event) => {
  event.preventDefault();

  let inputData = new FormData(document.getElementById("update-item-form"));

  let item = {
    id: document.getElementById("update-item-id").value,
    productId: inputData.get("update-item-product"),
    warehouseId: warehouseIdToBeUsed,
    item_quantity: inputData.get("update-item-quantity"),
  };

  let URL = "http://localhost:8080/items";

  fetch(URL + "/item", {
    method: "PUT",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(item),
  })
    .then((data) => {
      return data.json();
    })
    .then((itemJson) => {
      updateItemInTable(itemJson);
      setWarehouseIdToBeUsed(item.warehouseId);
      document.getElementById("update-warehouse").click();
    })
    .catch((error) => {
      console.error(error);
    });
});

// delete item
document.getElementById("delete-item").addEventListener("click", (event) => {
  event.preventDefault();

  let item = 0;

  for (let i of allItems) {
    if (i.id == itemIdToBeUsed) {
      item = i;
    }
  }

  let URL = "http://localhost:8080/items";

  // sending delete request
  fetch(URL + "/item", {
    method: "DELETE",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(item),
  })
    .then((data) => {
      if (data.status === 204) {
        removeItemFromTable(item);
        setWarehouseIdToBeUsed(item.warehouseId);
        document.getElementById("update-warehouse").click();
      }
    })
    .catch((error) => {
      console.error(error);
    });
});

function updateProductInTable(product) {
  document.getElementById("TR" + "product" + product.id).innerHTML = `
    <td>${product.id}</td>
    <td>${product.product_name}</td>
    <td>${product.color}</td>
    <td><button type="button" class="btn btn-primary" data-toggle="modal" data-target="#productUpdateModal" onclick="setProductIdToBeUsed(${product.id})">Edit</button></td>
    <td><button type="button" class="btn btn-primary" data-toggle="modal" data-target="#productDeleteModal" onclick="setProductIdToBeUsed(${product.id})">Delete</button></td>
    `;
}

function updateWarehouseInTable(warehouse) {
  document.getElementById("TR" + "warehouse" + warehouse.id).innerHTML = `
    <td>${warehouse.id}</td>
    <td>${warehouse.warehouse_location}</td>
    <td>${warehouse.number_of_items}</td>
    <td>${warehouse.max_capacity}</td>
    <td><button type="button" class="btn btn-primary" data-toggle="modal" data-target="#itemsModal" onclick="getItems(${warehouse.id})">View</button></td>
    <td><button type="button" class="btn btn-primary" data-toggle="modal" data-target="#warehouseUpdateModal" onclick="setWarehouseIdToBeUsed(${warehouse.id})">Edit</button></td>
    <td><button type="button" class="btn btn-primary" data-toggle="modal" data-target="#warehouseDeleteModal" onclick="setWarehouseIdToBeUsed(${warehouse.id})">Delete</button></td>
    `;
}

function updateItemInTable(item) {
  let productName = "";

  for (let p of allProducts) {
    if (p.id == item.productId) {
      productName = p.product_name;
    }
  }
  document.getElementById("TR" + "item" + item.id).innerHTML = `
    <td>${productName}</td>
    <td>${item.item_quantity}</td>
    <td><button type="button" class="btn btn-primary" data-toggle="modal" data-target="#itemUpdateModal" onclick="setItemIdToBeUsed(${item.id})">Edit</button></td>
    <td><button type="button" class="btn btn-primary" data-toggle="modal" data-target="#itemDeleteModal" onclick="setItemIdToBeUsed(${item.id})">Delete</button></td>
    `;
}

function removeProductFromTable(product) {
  const element = document.getElementById("TR" + "product" + product.id);
  element.remove();
}

function removeWarehouseFromTable(warehouse) {
  const element = document.getElementById("TR" + "warehouse" + warehouse.id);
  element.remove();
}

function removeItemFromTable(item) {
  const element = document.getElementById("TR" + "item" + item.id);
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
