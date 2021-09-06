export default () => ({
    secret_key: process.env.SECRET_KEY || "example",
    auth: {
        port: +process.env.AUTH_PORT || 3000,
        swagger: {
            title: 'Api Authentication',
            description: 'All Microservice need to auth here'
        }
    }
});