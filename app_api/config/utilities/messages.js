function formatMessage(username, message) {
    return {
        username,
        message,
        createdAt: new Date().getTime()
    }
}

module.exports = { formatMessage }