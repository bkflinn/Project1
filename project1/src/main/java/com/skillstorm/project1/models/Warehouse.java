package com.skillstorm.project1.models;

import javax.persistence.Column;
import javax.persistence.Entity;
import javax.persistence.GeneratedValue;
import javax.persistence.GenerationType;
import javax.persistence.Id;
import javax.persistence.Table;

@Entity
@Table(name = "WAREHOUSES")
public class Warehouse {

    @Id
    @Column
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private int id;

    @Column(name = "warehouse_location")
    private String warehouse_location;

    @Column(name = "max_capacity")
    private int max_capacity;

    public Warehouse() {
    }

    public Warehouse(int id, String warehouse_location, int max_capacity) {
        this.id = id;
        this.warehouse_location = warehouse_location;
        this.max_capacity = max_capacity;
    }

    public int getId() {
        return id;
    }

    public void setId(int id) {
        this.id = id;
    }

    public String getWarehouse_location() {
        return warehouse_location;
    }

    public void setWarehouse_location(String warehouse_location) {
        this.warehouse_location = warehouse_location;
    }

    public int getMax_capacity() {
        return max_capacity;
    }

    public void setMax_capacity(int max_capacity) {
        this.max_capacity = max_capacity;
    }

    @Override
    public int hashCode() {
        final int prime = 31;
        int result = 1;
        result = prime * result + id;
        result = prime * result + ((warehouse_location == null) ? 0 : warehouse_location.hashCode());
        result = prime * result + max_capacity;
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
        Warehouse other = (Warehouse) obj;
        if (id != other.id)
            return false;
        if (warehouse_location == null) {
            if (other.warehouse_location != null)
                return false;
        } else if (!warehouse_location.equals(other.warehouse_location))
            return false;
        if (max_capacity != other.max_capacity)
            return false;
        return true;
    }

    @Override
    public String toString() {
        return "Warehouse [id=" + id + ", warehouse_location=" + warehouse_location + ", max_capacity=" + max_capacity
                + "]";
    }

    
    
}
