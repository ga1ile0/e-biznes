package controllers

import (
    "github.com/labstack/echo/v4"
    "net/http"
    "strconv"
    "sync"
)

type Product struct {
    ID          int    `json:"id"`
    Name        string `json:"name"`
    Description string `json:"description"`
    Price       float64 `json:"price"`
}

var (
    products = []Product{
        {ID: 1, Name: "Laptop", Description: "High-performance laptop", Price: 1299.99},
        {ID: 2, Name: "Smartphone", Description: "Latest smartphone model", Price: 799.99},
        {ID: 3, Name: "Headphones", Description: "Noise-canceling headphones", Price: 199.99},
    }
    nextID = 4
    mutex  = &sync.Mutex{} 
)

func GetProducts(c echo.Context) error {
    return c.JSON(http.StatusOK, products)
}

func GetProduct(c echo.Context) error {
    id, err := strconv.Atoi(c.Param("id"))
    if err != nil {
        return c.JSON(http.StatusBadRequest, map[string]string{"error": "Invalid ID format"})
    }

    for _, product := range products {
        if product.ID == id {
            return c.JSON(http.StatusOK, product)
        }
    }

    return c.JSON(http.StatusNotFound, map[string]string{"error": "Product not found"})
}

func CreateProduct(c echo.Context) error {
    product := new(Product)
    if err := c.Bind(product); err != nil {
        return c.JSON(http.StatusBadRequest, map[string]string{"error": err.Error()})
    }

    mutex.Lock()
    defer mutex.Unlock()

    product.ID = nextID
    nextID++
    products = append(products, *product)

    return c.JSON(http.StatusCreated, product)
}

func UpdateProduct(c echo.Context) error {
    id, err := strconv.Atoi(c.Param("id"))
    if err != nil {
        return c.JSON(http.StatusBadRequest, map[string]string{"error": "Invalid ID format"})
    }

    updatedProduct := new(Product)
    if err := c.Bind(updatedProduct); err != nil {
        return c.JSON(http.StatusBadRequest, map[string]string{"error": err.Error()})
    }

    mutex.Lock()
    defer mutex.Unlock()

    for i, product := range products {
        if product.ID == id {
            updatedProduct.ID = id 
            products[i] = *updatedProduct
            return c.JSON(http.StatusOK, updatedProduct)
        }
    }

    return c.JSON(http.StatusNotFound, map[string]string{"error": "Product not found"})
}

func DeleteProduct(c echo.Context) error {
    id, err := strconv.Atoi(c.Param("id"))
    if err != nil {
        return c.JSON(http.StatusBadRequest, map[string]string{"error": "Invalid ID format"})
    }

    mutex.Lock()
    defer mutex.Unlock()

    for i, product := range products {
        if product.ID == id {
            products = append(products[:i], products[i+1:]...)
            return c.JSON(http.StatusOK, map[string]string{"message": "Product deleted successfully"})
        }
    }

    return c.JSON(http.StatusNotFound, map[string]string{"error": "Product not found"})
}