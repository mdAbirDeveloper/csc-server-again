const express = require("express");
const cors = require("cors");
const { MongoClient, ObjectId } = require("mongodb");

const app = express();
const PORT = 5000;

const corsConfig = {
  origin: "*",
  credential: true,
  methods: ["GET", "POST", "PUT", "DELETE"],
};

app.options("", cors(corsConfig));
app.use(express.json());
app.use(cors(corsConfig));

const uri =
  "mongodb+srv://abdullah:MJsodSF9rnyxjyE5@cluster0.rlhccww.mongodb.net/?retryWrites=true&w=majority&appName=Cluster0";
const client = new MongoClient(uri);

async function run() {
  try {
    client.connect();
    const productCollection = client.db("csc").collection("products");
    const connectorsCollection = client.db("csc").collection("connectors");
    const filterCollection = client.db("csc").collection("filter");
    const pumpsCollection = client.db("csc").collection("fogAndMistPumps");
    const fogNuzzlesCollection = client.db("csc").collection("fogNuzzles");
    const hydraulicValvesCollection = client
      .db("csc")
      .collection("hydraulicValves");
    const mistFanCollection = client.db("csc").collection("mistFan");
    const reviewCollection = client.db("csc").collection("ratings");

    app.post("/ratings", async (req, res) => {
      const data = req.body;
      const result = await reviewCollection.insertOne(data);
      if (result) {
        console.log("rating submitted successfully");
        res.send(result);
      }
    });

    app.get('/products', async (req, res) =>{
      const query = {};
      const result = await productCollection.find(query).toArray();
      res.send(result)
    })

    app.get("/ratings/:id", async (req, res) => {
      try {
        const connectorsId = req.params.id; // Use req.params.id to get the product ID from the route parameter
        console.log(connectorsId, "this is query");

        // Find all reviews for the given product ID
        const allRatings = await reviewCollection
          .find({
            connectorsId: { $eq: connectorsId },
          })
          .toArray(); // Use productId field for filtering
        let sum = 0;
        allRatings.forEach((rating) => {
          sum += rating.rating; // Assuming each rating has a field named "rating"
        });
        const totalRatings = allRatings.length; 
        const averageRating = sum / totalRatings;
        res.status(200).json({ success: true, averageRating, totalRatings });
        console.log(averageRating, "this is averageRating");
      } catch (error) {
        console.error(error);
        res
          .status(500)
          .json({ success: false, error: "Internal server error" });
      }
    });

    app.post("/connectors", async (req, res) => {
      const product = req.body;
      try {
        const result = await productCollection.insertOne(product);
        const connectors = await connectorsCollection.insertOne(product);
        if (result && connectors) {
          res.status(201).send("Product and connectors added successfully");
        } else {
          res.status(500).send("Failed to add product  and connectors");
          console.error("Failed to add products and connectors");
        }
      } catch (error) {
        console.error("Error adding product and connectors:", error);
        res.status(500).send("Failed to add product and connectors");
      }
    });



    app.post("/filter", async (req, res) => {
      const filter = req.body;
      try {
        const result = await productCollection.insertOne(filter);
        const connectors = await filterCollection.insertOne(filter);
        if (result && connectors) {
          res.status(201).send("filter and connectors added successfully");
          console.log("filter added successfully");
        } else {
          res.status(500).send("Failed to add filter  and connectors");
          console.error("Failed to add filters and connectors");
        }
      } catch (error) {
        console.error("Error adding filter and connectors:", error);
        res.status(500).send("Failed to add filter and connectors");
      }
    });



    app.post("/fogAndMistPumps", async (req, res) => {
      const pumps = req.body;
      try {
        const result = await productCollection.insertOne(pumps);
        const pump = await pumpsCollection.insertOne(pumps);
        if (result && pump) {
          res.status(201).send("product and pumps added successfully");
          console.log("pumps added successfully");
        } else {
          res.status(500).send("Failed to add pumps  and product");
          console.error("Failed to add product and pumps");
        }
      } catch (error) {
        console.error("Error adding pumps and product:", error);
        res.status(500).send("Failed to add pumps and product");
      }
    });



    app.post("/fogNuzzles", async (req, res) => {
      const fogNuzzles = req.body;
      try {
        const result = await productCollection.insertOne(fogNuzzles);
        const fogNuzzle = await fogNuzzlesCollection.insertOne(fogNuzzles);
        if (result && fogNuzzle) {
          res.status(201).send("fogNuzzles and product added successfully");
          console.log("fogNuzzles added successfully");
        } else {
          res.status(500).send("Failed to add product  and fogNuzzles");
          console.error("Failed to add fogNuzzless and product");
        }
      } catch (error) {
        console.error("Error adding product and fogNuzzles:", error);
        res.status(500).send("Failed to add product and fogNuzzles");
      }
    });



    app.post("/hydraulicValves", async (req, res) => {
      const hydraulicValves = req.body;
      try {
        const result = await productCollection.insertOne(hydraulicValves);
        const hydraulicValve = await hydraulicValvesCollection.insertOne(
          hydraulicValves
        );
        if (result && hydraulicValve) {
          res.status(201).send("product and hydraulicValve added successfully");
          console.log("hydraulicValve added successfully");
        } else {
          res.status(500).send("Failed to add hydraulicValve  and product");
          console.error("Failed to add product and hydraulicValve");
        }
      } catch (error) {
        console.error("Error adding hydraulicValve and product:", error);
        res.status(500).send("Failed to add product and hydraulicValve");
      }
    });



    app.post("/mistFan", async (req, res) => {
      const mistFan = req.body;
      try {
        const result = await productCollection.insertOne(mistFan);
        const mistFans = await mistFanCollection.insertOne(mistFan);
        if (result && mistFans) {
          res.status(201).send("product and mistFan added successfully");
          console.log("mistFan added successfully");
        } else {
          res.status(500).send("Failed to add mistFan  and product");
          console.error("Failed to add product and mistFan");
        }
      } catch (error) {
        console.error("Error adding mistFan and product:", error);
        res.status(500).send("Failed to add product and mistFan");
      }
    });






    // this is for showing 
    app.get("/connectors", async (req, res) => {
      const query = {};
      const result = await connectorsCollection.find(query).toArray();
      res.send(result);
    });

    app.delete('/connectors/:id', async (req, res) =>{
      const id = req.params.id;
      const objectId = new ObjectId(id);
      const deleted = await connectorsCollection.findOneAndDelete({_id: objectId});
      res.send(deleted)
    })

    app.get("/filter", async (req, res) => {
      const query = {};
      const result = await filterCollection.find(query).toArray();
      res.send(result);
    });

    app.delete('/filter/:id', async (req, res) =>{
      const id = req.params.id;
      const objectId = new ObjectId(id);
      const deleted = await filterCollection.findOneAndDelete({_id: objectId});
      res.send(deleted)
    })

    app.get("/fogAndMistPumps", async (req, res) => {
      const query = {};
      const result = await fogNuzzlesCollection.find(query).toArray();
      res.send(result);
    });

    app.delete('/fogAndMistPumps/:id', async (req, res) =>{
      const id = req.params.id;
      const objectId = new ObjectId(id);
      const deleted = await pumpsCollection.findOneAndDelete({_id: objectId});
      res.send(deleted)
    })

    app.get("/fogNuzzles", async (req, res) => {
      const query = {};
      const result = await fogNuzzlesCollection.find(query).toArray();
      res.send(result);
    });

    app.delete('/fogNuzzles/:id', async (req, res) =>{
      const id = req.params.id;
      const objectId = new ObjectId(id);
      const deleted = await fogNuzzlesCollection.findOneAndDelete({_id: objectId});
      res.send(deleted)
    })

    app.get("/hydrulicValves", async (req, res) => {
      const query = {};
      const result = await hydraulicValvesCollection.find(query).toArray();
      res.send(result);
    });

    app.delete('/hydrulicValves/:id', async (req, res) =>{
      const id = req.params.id;
      const objectId = new ObjectId(id);
      const deleted = await hydraulicValvesCollection.findOneAndDelete({_id: objectId});
      res.send(deleted)
    })

    app.get("/mistFan", async (req, res) => {
      const query = {};
      const result = await mistFanCollection.find(query).toArray();
      res.send(result);
    });

    app.delete('/mistFan/:id', async (req, res) =>{
      const id = req.params.id;
      const objectId = new ObjectId(id);
      const deleted = await mistFanCollection.findOneAndDelete({_id: objectId});
      res.send(deleted)
    })

    app.get("/showDetail/:id", async (req, res) => {
      const id = req.params.id;
      const objectId = new ObjectId(id);
      // Use a filter to match the product with the specified ID
      const product = await productCollection.findOne({
        _id: objectId,
      });
      if (!product) {
        return res.status(404).json({ message: "Product not found" });
      }
      return res.status(200).json(product);
    });

    app.get("/products", async (req, res) => {
      const query = {};
      const products = await productCollection.find(query).toArray();
      if (products) {
        return res.send(products);
      }
    });


    app.delete("/products/:id", async (req, res) => {
      const id = req.params.id;
      // Convert the blog_id to ObjectId
      const objectId = new ObjectId(id);
      // Use a filter to match the blog with the specified ID
      const deleteProducts = await productCollection.findOneAndDelete({
        _id: objectId,
      });

      if (deleteProducts) {
        res
          .status(200)
          .json({ success: true, message: "Blog deleted successfully" });
      } else {
        res.status(404).json({ success: false, message: "Blog not found" });
      }
    });

    


    app.get("/", async (req, res) => {
      res.send("server is running");
    });
  } finally {
    // No need to close the client here, it should remain open
  }
}
run();

app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
