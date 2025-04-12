package com.ebiznes.discord

import kotlinx.coroutines.runBlocking
import org.slf4j.LoggerFactory

class SimpleCommandHandler(private val discordClient: DiscordClient) : MessageHandler {
    private val logger = LoggerFactory.getLogger(SimpleCommandHandler::class.java)
    
    override fun onMessageReceived(content: String, channelId: String, userId: String) {
        logger.info("Processing message: $content")
        
        when {
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
                        !help - Shows this help message
                        """.trimIndent()
                    )
                }
            }
        }
    }
}