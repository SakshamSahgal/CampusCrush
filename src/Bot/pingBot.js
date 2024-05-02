const axios = require('axios');

module.exports = (app) => {

    const urlToPing = process.env.HOST + "/ping";

    async function pingUrl() {
        try {
            const response = await axios.get(urlToPing, {
                headers: {
                    'pingedBy': 'Keep-Alive-Bot', // Custom header
                },
            });
            // console.log(`Ping successful! Keep-Alive-Bot return status Status code: ${response.status}`);
        } catch (error) {
            console.error(`Ping failed: ${error.message}`);
        }
    }
    

    app.get("/ping", (req, res) => {

        if (req.headers.pingedby == "Keep-Alive-Bot") {
            // console.log("Keep-Alive-Bot visited!");
        } else {
            console.log("Someone visited!");
        }

        res.send("pong");
    })

    setInterval(pingUrl, parseInt(process.env.PING_BOT_DURATION_IN_MINUTES*60*1000)); // Ping every x minutes
}

