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
        .addEventListeners(MessageListener())  // Add the message listener
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
    
    // Method to register message handlers
    fun addMessageHandler(handler: MessageHandler) {
        messageHandlers.add(handler)
        logger.info("Added message handler: ${handler.javaClass.simpleName}")
    }
    
    // Inner class to handle incoming messages
    private inner class MessageListener : ListenerAdapter() {
        override fun onMessageReceived(event: MessageReceivedEvent) {
            // Ignore messages from bots (including our own bot)
            if (event.author.isBot) return
            
            logger.info("Received message from ${event.author.name}: ${event.message.contentDisplay}")
            
            // Process the message with registered handlers
            messageHandlers.forEach { handler ->
                handler.onMessageReceived(
                    event.message.contentDisplay,
                    event.channel.id,
                    event.author.id
                )
            }
        }
    }
}