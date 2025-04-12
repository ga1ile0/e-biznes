package com.ebiznes.discord

import net.dv8tion.jda.api.JDABuilder
import net.dv8tion.jda.api.events.message.MessageReceivedEvent
import net.dv8tion.jda.api.hooks.ListenerAdapter
import net.dv8tion.jda.api.requests.GatewayIntent
import net.dv8tion.jda.api.utils.cache.CacheFlag
import org.slf4j.LoggerFactory

class DiscordClient(private val token: String) {
    private val logger = LoggerFactory.getLogger(DiscordClient::class.java)
    private val messageHandlers = mutableListOf<MessageHandler>()
    
    private val jda = JDABuilder.createDefault(token)
        .enableIntents(
            GatewayIntent.GUILD_MESSAGES,
            GatewayIntent.MESSAGE_CONTENT,
            GatewayIntent.DIRECT_MESSAGES
        )
        .disableCache(
            CacheFlag.VOICE_STATE,
            CacheFlag.EMOJI,
            CacheFlag.STICKER,
            CacheFlag.SCHEDULED_EVENTS
        )
        .addEventListeners(MessageListener()) 
        .build()
        .awaitReady()
    
    init {
        logger.info("Discord client initialized successfully")
    }
    
    suspend fun sendMessage(channelId: String, content: String) {
        try {
            logger.info("Attempting to send message to channel $channelId: '$content'")
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
    
    fun addMessageHandler(handler: MessageHandler) {
        messageHandlers.add(handler)
        logger.info("Added message handler: ${handler.javaClass.simpleName}")
    }
    
    private inner class MessageListener : ListenerAdapter() {
        override fun onMessageReceived(event: MessageReceivedEvent) {
            if (event.author.isBot) return
            
            logger.info("Received message from ${event.author.name}: ${event.message.contentDisplay}")
            
            messageHandlers.forEach { handler ->
                try {
                    handler.onMessageReceived(
                        event.message.contentDisplay,
                        event.channel.id,
                        event.author.id
                    )
                } catch (e: Exception) {
                    logger.error("Error in message handler: ${e.message}", e)
                }
            }
        }
    }
}