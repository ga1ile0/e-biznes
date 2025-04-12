package com.ebiznes.config

import com.typesafe.config.ConfigFactory
import java.io.File
import org.slf4j.LoggerFactory

class Config(
    val discordToken: String,
    val defaultChannelId: String,
) {
    companion object {
        private val logger = LoggerFactory.getLogger(Config::class.java)
        
        fun load(): Config {
            val envVariables = mutableMapOf<String, String>()
            
            val envFile = File(".env")
            if (envFile.exists()) {
                logger.info("Loading environment variables from .env file")
                envFile.readLines().forEach { line ->
                    if (!line.startsWith("#") && line.contains("=")) {
                        val parts = line.split("=", limit = 2)
                        if (parts.size == 2) {
                            val key = parts[0].trim()
                            val value = parts[1].trim()
                            envVariables[key] = value
                            logger.info("Loaded variable: $key")
                        }
                    }
                }
            } else {
                logger.warn("No .env file found at ${envFile.absolutePath}")
            }
            
            val token = System.getenv("DISCORD_BOT_TOKEN") 
                ?: envVariables["DISCORD_BOT_TOKEN"]
                ?: throw RuntimeException("Discord token not found. Set DISCORD_BOT_TOKEN environment variable or provide it in .env file")
                
            val channelId = System.getenv("DISCORD_CHANNEL_ID") 
                ?: envVariables["DISCORD_CHANNEL_ID"]
                ?: throw RuntimeException("Channel ID not found. Set DISCORD_CHANNEL_ID environment variable or provide it in .env file")
            
            return Config(
                discordToken = token,
                defaultChannelId = channelId
            )
        }
    }
}