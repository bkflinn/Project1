drop table if exists PRODUCTS;
drop table if exists WAREHOUSES;
drop table if exists ITEMS;

create table PRODUCTS (
	id INT AUTO_INCREMENT PRIMARY KEY,
	product_name VARCHAR(50),
	color VARCHAR(50)
);

create table WAREHOUSES (
	id INT AUTO_INCREMENT PRIMARY KEY,
	warehouse_location VARCHAR(50),
	number_of_items INT,
	max_capacity INT
);

create table ITEMS (
	product_id INT,
	warehouse_id INT,
	item_quantity INT,
	FOREIGN KEY (product_id) REFERENCES PRODUCTS(id),
	FOREIGN KEY (warehouse_id) REFERENCES WAREHOUSES(id)
);