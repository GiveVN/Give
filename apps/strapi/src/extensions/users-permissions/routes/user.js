module.exports = (plugin) => {
    // Add custom routes to the existing users-permissions routes
    plugin.routes['content-api'].routes.push(
        // Profile by vanity URL
        {
            method: 'GET',
            path: '/users/u/:vanityUrl',
            handler: 'user.getByVanityUrl',
            config: {
                auth: false,
                prefix: '',
            },
        },

        // Check vanity URL availability
        {
            method: 'GET',
            path: '/users/check-vanity/:vanityUrl',
            handler: 'user.checkVanityUrl',
            config: {
                auth: false,
                prefix: '',
            },
        },

        // Current user's donation history
        {
            method: 'GET',
            path: '/users/me/donations',
            handler: 'user.getDonationHistory',
            config: {
                prefix: '',
            },
        },

        // Current user's project statistics
        {
            method: 'GET',
            path: '/users/me/stats',
            handler: 'user.getProjectStats',
            config: {
                prefix: '',
            },
        }
    );

    return plugin;
};