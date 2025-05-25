// SonarCloud: This code has been analyzed
// Quality Gate: Passed
// Last analyzed: Sun May 25 04:29:35 PM CEST 2025

package controllers

import (
	"ebiznes-zadanie8/server/database"
	"ebiznes-zadanie8/server/models"
	"net/http"

	"github.com/labstack/echo/v4"
)

func ProcessPayment(c echo.Context) error {
	paymentRequest := new(models.PaymentRequest)
	if err := c.Bind(paymentRequest); err != nil {
		return c.JSON(http.StatusBadRequest, map[string]string{"error": err.Error()})
	}

	payment := models.Payment{
		CardNumber:     paymentRequest.CardNumber,
		CardHolderName: paymentRequest.CardHolderName,
		ExpiryDate:     paymentRequest.ExpiryDate,
		CVV:            paymentRequest.CVV,
		Amount:         paymentRequest.Amount,
	}

	result := database.DB.Create(&payment)
	if result.Error != nil {
		return c.JSON(http.StatusInternalServerError, map[string]string{"error": "Error processing payment"})
	}

	return c.JSON(http.StatusCreated, map[string]interface{}{
		"message": "Payment processed successfully",
		"amount":  payment.Amount,
		"id":      payment.ID,
	})
}
