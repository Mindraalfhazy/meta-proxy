const express = require("express");
const fetch = require("node-fetch");

const app = express();
app.use(express.json());

const TARGET_URL = "https://gadgetfix.rsudsayangrakyat.id/tesmeta.php";

app.all("/", async (req, res) => {
  try {
    if (req.method === "GET") {
      const query = new URLSearchParams(req.query).toString();
      const r = await fetch(`${TARGET_URL}?${query}`);
      const text = await r.text();
      return res.status(r.status).send(text);
    }

    const r = await fetch(TARGET_URL, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(req.body),
    });

    const text = await r.text();
    res.status(200).send(text);
  } catch (err) {
    console.error(err);
    res.status(500).send("Proxy error");
  }
});

const port = process.env.PORT || 3000;
app.listen(port, () => console.log("Proxy running on", port));
