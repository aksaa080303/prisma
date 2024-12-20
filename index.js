const express = require("express");
const { PrismaClient } = require("@prisma/client");
const prisma = new PrismaClient();
const app = express();
const port = 3000;

app.use(express.json());

app.get("/ligabelanda", async (req, res) => {
  try {
    const ligabelanda = await prisma.ligabelanda.findMany();
    if (ligabelanda.length === 0) {
      return res.status(404).send("Data masih kosong!");
    }
    res.json(ligabelanda);
  } catch (err) {
    console.log("error: " + err.message);
    res.status(500).send("Terjadi kesalahan pada server!");
  }
});

app.get("/ligainggris", async (req, res) => {
  try {
    const ligainggris = await prisma.ligainggris.findMany();
    if (ligainggris.length === 0) {
      return res.status(404).send("Data masih kosong!");
    }
    res.json(ligainggris);
  } catch (err) {
    console.log("error: " + err.message);
    res.status(500).send("Terjadi kesalahan pada server!");
  }
});

app.get("/ligaspanyol", async (req, res) => {
  try {
    const ligaspanyol = await prisma.ligaspanyol.findMany();
    if (ligaspanyol.length === 0) {
      return res.status(404).send("Data masih kosong!");
    }
    res.json(ligaspanyol);
  } catch (err) {
    console.log("error: " + err.message);
    res.status(500).send("Terjadi kesalahan pada server!");
  }
});

app.get("/ligajerman", async (req, res) => {
  try {
    const ligajerman = await prisma.ligajerman.findMany();
    if (ligajerman.length === 0) {
      return res.status(404).send("Data masih kosong!");
    }
    res.json(ligajerman);
  } catch (err) {
    console.log("error: " + err.message);
    res.status(500).send("Terjadi kesalahan pada server!");
  }
});

app.get("/ligaprancis", async (req, res) => {
  try {
    const ligaprancis = await prisma.ligaprancis.findMany();
    if (ligaprancis.length === 0) {
      return res.status(404).send("Data masih kosong!");
    }
    res.json(ligaprancis);
  } catch (err) {
    console.log("error: " + err.message);
    res.status(500).send("Terjadi kesalahan pada server!");
  }
});

app.post("/pemain/:liga", async (req, res) => {
  const { liga } = req.params;
  const { nama, umur, posisi, NA, KA, KSI, harga } = req.body;

  try {
    const data = await prisma[liga].create({
      data: {
        nama,
        umur,
        posisi,
        NA,
        KA,
        KSI,
        harga,
      },
    });
    res.status(201).send(`Data berhasil ditambahkan ke liga ${liga}!`);
  } catch (err) {
    console.log("error: " + err.message);
    res.status(500).send("Terjadi kesalahan pada server!");
  }
});

app.put("/pemain/:liga/:id", async (req, res) => {
  const { id, liga } = req.params;
  const { nama, umur, posisi, NA, KA, KSI, harga } = req.body;

  try {
    const data = await prisma[liga].update({
      where: { id: parseInt(id) },
      data: {
        nama,
        umur,
        posisi,
        NA,
        KA,
        KSI,
        harga,
      },
    });
    res
      .status(202)
      .send(`Data berhasil diupdate di liga ${liga} dengan id ${id}`);
  } catch (err) {
    console.log("error: " + err.message);
    res.status(500).send("Terjadi kesalahan pada server!");
  }
});

app.delete("/pemain/:liga/:id", async (req, res) => {
  const { id, liga } = req.params;

  try {
    await prisma[liga].delete({
      where: { id: parseInt(id) },
    });
    res
      .status(202)
      .send(`Data berhasil dihapus dari liga ${liga} dengan id ${id}`);
  } catch (err) {
    console.log("error: " + err.message);
    res.status(500).send("Terjadi kesalahan pada server!");
  }
});

app.listen(port, () => {
  console.log(`Server is running on port ${port}`);
});
