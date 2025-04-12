package com.ebiznes

import com.ebiznes.config.Config
import com.ebiznes.discord.DiscordClient
import com.ebiznes.discord.SimpleCommandHandler
import com.ebiznes.service.CategoryService
import com.ebiznes.service.ProductService
import kotlinx.coroutines.runBlocking
import org.slf4j.LoggerFactory

private val logger = LoggerFactory.getLogger("Application")

fun main() {
    logger.info("Starting Discord bot application...")
    
    try {
        val config = Config.load()
        
        val categoryService = CategoryService()
        val productService = ProductService(categoryService)
        
        val discordClient = DiscordClient(config.discordToken)
        
        val commandHandler = SimpleCommandHandler(discordClient, categoryService, productService)
        discordClient.addMessageHandler(commandHandler)
        
        runBlocking {
            discordClient.sendMessage(
                channelId = config.defaultChannelId,
                content = "Hello! I'm a Discord bot created with Ktor! Type !help to see available commands."
            )
        }
        
        logger.info("Bot is now running. Press Ctrl+C to exit.")
        
        Thread.currentThread().join()
        
    } catch (e: Exception) {
        logger.error("Error running application: ${e.message}", e)
    }
}