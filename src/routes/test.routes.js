const express = require("express");
const router = express.Router();
const db = require("../database/db");

router.get("/db-test", async (req, res) => {
  try {
    const [result] = await db.query("SELECT NOW() as now");
    res.json({ message: "Conexión exitosa", result });
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: "Error conectando a RDS" });
  }
});

module.exports = router;
