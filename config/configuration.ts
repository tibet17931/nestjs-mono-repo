export default () => ({
    secret_key: process.env.SECRET_KEY || "example",
    authentication: {
        port: +process.env.AUTH_PORT || 3000
    }
});