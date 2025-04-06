package controllers

import javax.inject._
import play.api.mvc._
import scala.collection.mutable.ListBuffer

@Singleton
class ProductsController @Inject()(val controllerComponents: ControllerComponents) extends BaseController {

  // Sample data - a list of products
  private val products = ListBuffer[String]("Laptop", "Smartphone", "Headphones")

  // A basic endpoint to test the controller
  def index() = Action {
    Ok("Products Controller is working")
  }
}