package scopes

import (
	"gorm.io/gorm"
)

func PriceGreaterThan(price float64) func(db *gorm.DB) *gorm.DB {
	return func(db *gorm.DB) *gorm.DB {
		return db.Where("price > ?", price)
	}
}

func PriceLessThan(price float64) func(db *gorm.DB) *gorm.DB {
	return func(db *gorm.DB) *gorm.DB {
		return db.Where("price < ?", price)
	}
}

func PriceBetween(min, max float64) func(db *gorm.DB) *gorm.DB {
	return func(db *gorm.DB) *gorm.DB {
		return db.Where("price BETWEEN ? AND ?", min, max)
	}
}

func InCategory(categoryID uint) func(db *gorm.DB) *gorm.DB {
	return func(db *gorm.DB) *gorm.DB {
		return db.Where("category_id = ?", categoryID)
	}
}

func WithCategory(db *gorm.DB) *gorm.DB {
	return db.Preload("Category")
}

func OrderByPriceAsc(db *gorm.DB) *gorm.DB {
	return db.Order("price ASC")
}

func OrderByPriceDesc(db *gorm.DB) *gorm.DB {
	return db.Order("price DESC")
}

func NameContains(name string) func(db *gorm.DB) *gorm.DB {
	return func(db *gorm.DB) *gorm.DB {
		return db.Where("name LIKE ?", "%"+name+"%")
	}
}
