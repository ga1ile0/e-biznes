package com.ebiznes.discord

import com.ebiznes.service.CategoryService
import kotlinx.coroutines.runBlocking
import org.slf4j.LoggerFactory

class SimpleCommandHandler(
    private val discordClient: DiscordClient,
    private val categoryService: CategoryService
) : MessageHandler {
    private val logger = LoggerFactory.getLogger(SimpleCommandHandler::class.java)
    
    override fun onMessageReceived(content: String, channelId: String, userId: String) {
        logger.info("Processing message: $content")
        
        when {
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
                        !help - Shows this help message
                        """.trimIndent()
                    )
                }
            }
        }
    }
}