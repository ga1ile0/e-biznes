package com.ebiznes.discord

interface MessageHandler {
    fun onMessageReceived(content: String, channelId: String, userId: String)
}