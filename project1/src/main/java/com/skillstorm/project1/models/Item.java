package com.skillstorm.project1.models;

import javax.persistence.Column;
import javax.persistence.Entity;
import javax.persistence.GeneratedValue;
import javax.persistence.GenerationType;
import javax.persistence.Id;
import javax.persistence.JoinColumn;
import javax.persistence.Table;

@Entity
@Table(name = "ITEMS")
public class Item {

    @Id
    @Column
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private int id;
    
    @JoinColumn(name = "product_id")
    private int productId;

    @JoinColumn(name = "warehouse_id")
    private int warehouse_id;

    @Column(name = "item_quantity")
    private int item_quantity;

    public Item() {
    }

    public Item(int productId, int warehouse_id, int item_quantity) {
        this.productId = productId;
        this.warehouse_id = warehouse_id;
        this.item_quantity = item_quantity;
    }

    public int getId() {
        return id;
    }

    public void setId(int id) {
        this.id = id;
    }

    public int getProductId() {
        return productId;
    }

    public void setProductId(int productId) {
        this.productId = productId;
    }

    public int getWarehouse_id() {
        return warehouse_id;
    }

    public void setWarehouse_id(int warehouse_id) {
        this.warehouse_id = warehouse_id;
    }

    public int getItem_quantity() {
        return item_quantity;
    }

    public void setItem_quantity(int item_quantity) {
        this.item_quantity = item_quantity;
    }

    @Override
    public int hashCode() {
        final int prime = 31;
        int result = 1;
        result = prime * result + id;
        result = prime * result + productId;
        result = prime * result + warehouse_id;
        result = prime * result + item_quantity;
        return result;
    }

    @Override
    public boolean equals(Object obj) {
        if (this == obj)
            return true;
        if (obj == null)
            return false;
        if (getClass() != obj.getClass())
            return false;
        Item other = (Item) obj;
        if (id != other.id)
            return false;
        if (productId != other.productId)
            return false;
        if (warehouse_id != other.warehouse_id)
            return false;
        if (item_quantity != other.item_quantity)
            return false;
        return true;
    }

    @Override
    public String toString() {
        return "Item [id=" + id + ", productId=" + productId + ", warehouse_id=" + warehouse_id + ", item_quantity="
                + item_quantity + "]";
    }

    

}
