const mongoose = require('mongoose');
const shortid = require('shortid');
const Url = require('../models/url');
const { randomInt } = require('crypto');
const { escape } = require('querystring');

const MANGODB_URI = process.env.MONGODB || "mongodb+srv://dbadmin:aniket8318@cluster0.asqex.mongodb.net/shorturl?retryWrites=true&w=majority";

mongoose.connect(MANGODB_URI);

async function converts(body, res) {
    if (!body.url) return res.status(400).render("home", { msg: "No URL Found" });

    try {
        var shrtid = shortid.generate();
        const srt = "https://urlshortner-Aniket.vercel.app/" + shrtid;
    
        const [ipData] = await Promise.all([
            fetch('https://api.ipify.org?format=json').then(response => response.json()),
            ]);

        const ip = ipData.ip;
    
        await Url.create({
            shortid: shrtid,
            actualurl: body.url,
            ipadd: ip
        });

       
        return srt;

    } catch (err) {
        console.error("Error in URL creation:", err);
        return res.status(500).render("home", { msg: "Error in URL creation" });
    }
}


async function display() {
    try {
        const ipData = await fetch('https://api.ipify.org?format=json').then(response => response.json());
        const ip = ipData.ip;

        const result = await Url.find({ ipadd: ip }); 
        console.log(result);
        return result || null;
    } catch (err) {
        throw new Error("Error fetching URL: " + err.message);
    }
}


async function redrct(req, res) {
    const srt = req.params.srt;
    try {
        const result = await Url.findOne({ shortid: srt }); 
        if (result) {
            return res.redirect(result.actualurl);
        } else {
            return res.status(404).send("URL not found");
        }
    } catch (err) {
        return res.status(500).send("Error fetching redirection URL: " + err.message);
    }
}

module.exports = {
    converts,
    redrct,
    display
};