package controllers

import javax.inject._
import play.api.mvc._
import scala.collection.mutable.ListBuffer
import scala.concurrent.{ExecutionContext, Future}

@Singleton
class ProductsController @Inject()(val controllerComponents: ControllerComponents)(implicit ec: ExecutionContext) extends BaseController {

  // Sample data - a list of products
  private val products = ListBuffer[String]("Laptop", "Smartphone", "Headphones")

  // List all products (GET /products)
  def list() = Action {
    Ok(products.mkString(", "))
  }

  // Get a product by ID (GET /products/:id)
  def get(id: Int) = Action {
    if (id >= 0 && id < products.length) {
      Ok(s"Product: ${products(id)}")
    } else {
      NotFound(s"No product found with ID $id")
    }
  }

  // Create a new product (POST /products)
  def create() = Action(parse.text) { (request: Request[String]) =>
    val productName = request.body.trim
    if (productName.nonEmpty) {
      products += productName
      Created(s"Product added: $productName")
    } else {
      BadRequest("Product name cannot be empty")
    }
  }

  // Update a product (PUT /products/:id)
  def update(id: Int) = Action(parse.text) { (request: Request[String]) =>
    val newName = request.body.trim
    if (id >= 0 && id < products.length) {
      if (newName.nonEmpty) {
        val oldName = products(id)
        products(id) = newName
        Ok(s"Product with ID $id updated from: $oldName to: $newName")
      } else {
        BadRequest("Updated product name cannot be empty")
      }
    } else {
      NotFound(s"No product found with ID $id")
    }
  }

  // Delete a product (DELETE /products/:id)
  def delete(id: Int) = Action {
    if (id >= 0 && id < products.length) {
      val removedProduct = products.remove(id)
      Ok(s"Successfully removed product: $removedProduct")
    } else {
      NotFound(s"No product found with ID $id")
    }
  }

  // The original test endpoint (GET /products/test)
  def index() = Action {
    Ok("Products Controller is working")
  }
}