package com.ebiznes

import com.ebiznes.config.Config
import com.ebiznes.discord.DiscordClient
import kotlinx.coroutines.runBlocking
import org.slf4j.LoggerFactory

private val logger = LoggerFactory.getLogger("Application")

fun main() {
    logger.info("Starting Discord bot application...")
    
    try {
        val config = Config.load()
        
        // Initialize Discord client
        val discordClient = DiscordClient(config.discordToken)
        
        // Example: Send a message to Discord
        runBlocking {
            discordClient.sendMessage(
                channelId = config.defaultChannelId,
                content = "Hello! I'm a Discord bot created with Ktor!"
            )
        }
        
        logger.info("Bot is now running. Press Ctrl+C to exit.")
        
        // Keep the application running
        Thread.currentThread().join()
        
    } catch (e: Exception) {
        logger.error("Error running application: ${e.message}", e)
    }
}