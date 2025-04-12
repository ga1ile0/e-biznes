package scopes

import (
	"gorm.io/gorm"
)

func WithProducts(db *gorm.DB) *gorm.DB {
	return db.Preload("Products")
}

func OrderByNameAsc(db *gorm.DB) *gorm.DB {
	return db.Order("name ASC")
}

func CategoryNameContains(name string) func(db *gorm.DB) *gorm.DB {
	return func(db *gorm.DB) *gorm.DB {
		return db.Where("name LIKE ?", "%"+name+"%")
	}
}

func HasProducts(db *gorm.DB) *gorm.DB {
	return db.Where("id IN (SELECT DISTINCT category_id FROM products)")
}
