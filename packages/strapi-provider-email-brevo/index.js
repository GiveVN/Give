const BrevoApi = require('@getbrevo/brevo')

module.exports = {
  init(providerOptions = {}, settings = {}) {
    const { apiKey } = providerOptions
    if (!apiKey) {
      throw new Error('Brevo API key is missing – please set BREVO_API_KEY')
    }

    const apiInstance = new BrevoApi.TransactionalEmailsApi()
    apiInstance.setApiKey(BrevoApi.TransactionalEmailsApiApiKeys.apiKey, apiKey)

    const normaliseAddresses = (value) => {
      const arr = Array.isArray(value) ? value : [value]
      return arr.map((email) => ({ email }))
    }

    return {
      async send(options) {
        const senderEmail = options.from || settings.defaultFrom || 'admin@give.local'
        const senderName = settings.defaultSenderName || 'Give Platform'
        const replyTo = options.replyTo || settings.defaultReplyTo || senderEmail

        const payload = new BrevoApi.SendSmtpEmail()
        payload.sender = { email: senderEmail, name: senderName }
        payload.to = normaliseAddresses(options.to)
        payload.subject = options.subject
        if (options.html) payload.htmlContent = options.html
        if (options.text) payload.textContent = options.text
        if (replyTo) payload.replyTo = { email: replyTo, name: senderName }

        try {
          const { data } = await apiInstance.sendTransacEmail(payload)
          return data
        } catch (error) {
          const message =
            error?.response?.body?.message || error.message || 'Unknown Brevo error'
          throw new Error(`Brevo provider error: ${message}`)
        }
      },
    }
  },
} 