package com.ebiznes.discord

import net.dv8tion.jda.api.JDABuilder
import net.dv8tion.jda.api.requests.GatewayIntent
import net.dv8tion.jda.api.utils.cache.CacheFlag
import org.slf4j.LoggerFactory

class DiscordClient(private val token: String) {
    private val logger = LoggerFactory.getLogger(DiscordClient::class.java)
    
    // Use only the necessary intents
    private val jda = JDABuilder.createDefault(token)
        .enableIntents(
            GatewayIntent.GUILD_MESSAGES,
            GatewayIntent.MESSAGE_CONTENT  // This requires explicit enabling in Discord Developer Portal
        )
        .disableCache(
            CacheFlag.VOICE_STATE,
            CacheFlag.EMOJI,
            CacheFlag.STICKER,
            CacheFlag.SCHEDULED_EVENTS
        )
        .build()
        .awaitReady()
    
    init {
        logger.info("Discord client initialized successfully")
    }
    
    suspend fun sendMessage(channelId: String, content: String) {
        try {
            // Get the channel and send a message
            val textChannel = jda.getTextChannelById(channelId)
            
            if (textChannel != null) {
                textChannel.sendMessage(content).queue { message ->
                    logger.info("Message sent to channel $channelId: ${message.id}")
                }
            } else {
                logger.error("Channel with ID $channelId not found")
            }
        } catch (e: Exception) {
            logger.error("Failed to send message: ${e.message}", e)
            throw e
        }
    }
}