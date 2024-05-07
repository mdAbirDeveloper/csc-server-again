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
    const projectCollection = client.db("csc").collection("projects");
    const reviewCollection = client.db("csc").collection("review");
    const contactCollection = client.db("csc").collection("contact");
    const cetegoryCollection = client.db("csc").collection("category");

    app.post("/products", async (req, res) => {
      const product = req.body;
      try {
        const result = await productCollection.insertOne(product);
        if (result) {
          res.status(201).send("Product added successfully");
        } else {
          res.status(500).send("Failed to add product");
          console.error("Failed to add products");
        }
      } catch (error) {
        console.error("Error adding product:", error);
        res.status(500).send("Failed to add product");
      }
    });

    app.get("/products/:id", async (req, res) => {
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

    app.post("/projects", async (req, res) => {
      const project = req.body;
      try {
        const result = await projectCollection.insertOne(project);
        if (result) {
          res.status(201).send("projects added successfully");
        } else {
          res.status(500).send("Failed to add projects");
          console.error("Failed to add projects");
        }
      } catch (error) {
        console.error("Error adding projects:", error);
        res.status(500).send("Failed to add projects");
      }
    });

    app.get("/projects", async (req, res) => {
      const query = {};
      const products = await projectCollection.find(query).toArray();
      if (products) {
        return res.send(products);
      }
    });

    app.get("/projects/:id", async (req, res) => {
      const id = req.params.id;
      const objectId = new ObjectId(id);
      // Use a filter to match the product with the specified ID
      const project = await projectCollection.findOne({
        _id: objectId,
      });
      if (!project) {
        return res.status(404).json({ message: "project not found" });
      }
      return res.status(200).json(project);
    });

    app.delete("/projects/:id", async (req, res) => {
      const id = req.params.id;
      // Convert the blog_id to ObjectId
      const objectId = new ObjectId(id);
      // Use a filter to match the blog with the specified ID
      const deleteProject = await projectCollection.findOneAndDelete({
        _id: objectId,
      });

      if (deleteProject) {
        res
          .status(200)
          .json({ success: true, message: "Blog deleted successfully" });
      } else {
        res.status(404).json({ success: false, message: "Blog not found" });
      }
    });


    app.post("/category", async (req, res) => {
      const product = req.body;
      try {
        const result = await cetegoryCollection.insertOne(product);
        if (result) {
          res.status(201).send("category added successfully");
        } else {
          res.status(500).send("Failed to add category");
          console.error("Failed to add category");
        }
      } catch (error) {
        console.error("Error adding category:", error);
        res.status(500).send("Failed to add category");
      }
    });

    app.get("/category", async (req, res) => {
      const query = {};
      const category = await cetegoryCollection.find(query).toArray();
      if (category) {
        return res.send(category);
      }
    });

    app.delete("/category/:id", async (req, res) => {
      const id = req.params.id;
      // Convert the blog_id to ObjectId
      const objectId = new ObjectId(id);
      // Use a filter to match the blog with the specified ID
      const categoryProject = await cetegoryCollection.findOneAndDelete({
        _id: objectId,
      });

      if (categoryProject) {
        res
          .status(200)
          .json({ success: true, message: "category deleted successfully" });
      } else {
        res.status(404).json({ success: false, message: "category not found" });
      }
    });

    app.post("/review", async (req, res) => {
      const review = req.body;
      try {
        const result = await reviewCollection.insertOne(review);
        if (result) {
          res.status(201).send("review added successfully");
        } else {
          res.status(500).send("Failed to add review");
          console.error("Failed to add review");
        }
      } catch (error) {
        console.error("Error adding review:", error);
        res.status(500).send("Failed to add review");
      }
    });

    app.get("/review", async (req, res) => {
      const query = {};
      const review = await reviewCollection.find(query).toArray();
      if (review) {
        return res.send(review);
      }
    });

    app.delete("/review/:id", async (req, res) => {
      const id = req.params.id;
      // Convert the blog_id to ObjectId
      const objectId = new ObjectId(id);
      // Use a filter to match the blog with the specified ID
      const deleteReview = await reviewCollection.findOneAndDelete({
        _id: objectId,
      });

      if (deleteReview) {
        res
          .status(200)
          .json({ success: true, message: "review deleted successfully" });
      } else {
        res.status(404).json({ success: false, message: "review not found" });
      }
    });

    app.post("/contact", async (req, res) => {
      const connect = req.body;
      try {
        const result = await contactCollection.insertOne(connect);
        if (result) {
          res.status(201).send(result);
        } else {
          res.status(500).send("Failed to add massage");
          console.error("Failed to add message");
        }
      } catch (error) {
        console.error("Error adding message:", error);
        res.status(500).send("Failed to add message");
      }
    });

    // this line just for check
    app.get("/contact", async (req, res) => {
      const query = {};
      const review = await contactCollection.find(query).toArray();
      if (review) {
        return res.send(review);
      }
    });

    app.delete("/contact/:id", async (req, res) => {
      const id = req.params.id;
      // Convert the blog_id to ObjectId
      const objectId = new ObjectId(id);
      // Use a filter to match the blog with the specified ID
      const deleteMessage = await contactCollection.findOneAndDelete({
        _id: objectId,
      });

      if (deleteMessage) {
        res
          .status(200)
          .json({ success: true, message: "message deleted successfully" });
      } else {
        res.status(404).json({ success: false, message: "message not found" });
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
