package com.ebiznes.discord

import com.ebiznes.service.CategoryService
import com.ebiznes.service.ProductService
import kotlinx.coroutines.runBlocking
import org.slf4j.LoggerFactory

class SimpleCommandHandler(
    private val discordClient: DiscordClient,
    private val categoryService: CategoryService,
    private val productService: ProductService
) : MessageHandler {
    private val logger = LoggerFactory.getLogger(SimpleCommandHandler::class.java)
    
    override fun onMessageReceived(content: String, channelId: String, userId: String) {
        logger.info("Processing message: $content")
        
        when {
            content.startsWith("!products") -> {
                val parts = content.split(" ")
                if (parts.size > 1) {
                    try {
                        val categoryId = parts[1].toInt()
                        val category = categoryService.getCategory(categoryId)
                        
                        if (category != null) {
                            val products = productService.getProductsByCategory(categoryId)
                            
                            val message = if (products.isEmpty()) {
                                "No products found in category **${category.name}**."
                            } else {
                                val formattedProducts = products.joinToString("\n") { 
                                    "• ${it.id} - **${it.name}** - $${it.price}: ${it.description}" 
                                }
                                "**Products in Category: ${category.name}**\n$formattedProducts"
                            }
                            
                            runBlocking {
                                discordClient.sendMessage(channelId, message)
                            }
                        } else {
                            runBlocking {
                                discordClient.sendMessage(channelId, "Category with ID $categoryId not found.")
                            }
                        }
                    } catch (e: NumberFormatException) {
                        runBlocking {
                            discordClient.sendMessage(channelId, "Please provide a valid category ID. Type !categories to see available categories.")
                        }
                    }
                } else {
                    runBlocking {
                        discordClient.sendMessage(channelId, "Please specify a category ID. Example: !products 1")
                    }
                }
            }
            content.startsWith("!categories") -> {
                val categories = categoryService.getAllCategories()
                val message = if (categories.isEmpty()) {
                    "No categories found."
                } else {
                    val formattedCategories = categories.joinToString("\n") { 
                        "• ${it.id} - **${it.name}**: ${it.description}" 
                    }
                    "**Available Categories:**\n$formattedCategories"
                }
                
                runBlocking {
                    discordClient.sendMessage(channelId, message)
                }
            }
            content.startsWith("!hello") -> {
                runBlocking {
                    discordClient.sendMessage(channelId, "Hello there, <@$userId>!")
                }
            }
            content.startsWith("!ping") -> {
                runBlocking {
                    discordClient.sendMessage(channelId, "Pong!")
                }
            }
            content.startsWith("!help") -> {
                runBlocking {
                    discordClient.sendMessage(
                        channelId,
                        """
                        Available commands:
                        !hello - Greets you
                        !ping - Responds with "Pong!"
                        !categories - Lists all available product categories
                        !products <categoryId> - Lists products in the specified category
                        !help - Shows this help message
                        """.trimIndent()
                    )
                }
            }
        }
    }
}