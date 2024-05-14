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
    const productCollection = client.db("csc").collection("product");
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


    app.get('/showProduct/:id', async (req, res) =>{
      const id = req.params.id;
      const objectId = new ObjectId(id);
      const result = await productCollection.findOne({_id: objectId});
      res.send(result)
    })

    // app.patch('/updateProduct/:id', async (req, res) => {
    //   const id = req.params.id;
    //   const filter = new ObjectId(id);
    //   const updatedData = req.body;
    //   const update = { $set: updatedData };
    //   const result = await productCollection.updateOne(filter, update);

    //   if (result.modifiedCount === 1) {
    //     res.json({ message: 'Product updated successfully' });
    //     console.log('updated successfully')
    //   } else {
    //     res.status(404).json({ message: 'Product not found' });
    //   }
    // })

    app.post('/products', async (req, res) =>{
      const data = req.body;
      const result = await productCollection.insertOne(data);
      console.log('porduct added successfully with category')
      res.send(result)
    })

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

    app.get('/showDetail/:id', async (req, res) => {
      const id = req.params.id;
      const objectId = new ObjectId(id);
      const productDetail = await productCollection.find({_id: objectId}).toArray();
      if (!productDetail) {
        return res.status(404).json({ message: "Product not found" });
      }
      return res.status(200).json(productDetail);
    })


    app.get("/ratings/:id", async (req, res) => {
      try {
        const connectorsId = req.params.id;
        console.log(connectorsId, "this is query");
    
        const allRatings = await reviewCollection
          .find({
            connectorsId: { $eq: connectorsId },
          })
          .toArray();
    
        if (allRatings.length === 0) {
          // Handle case where no ratings are found
          return res.status(404).json({ success: false, error: "No ratings found for the given ID" });
        }
    
        const totalRatings = allRatings.length;
        const sum = allRatings.reduce((acc, rating) => acc + rating.rating, 0);
        const averageRating = sum / totalRatings;
    
        res.status(200).json({ success: true, averageRating, totalRatings });
        console.log(averageRating, "this is averageRating");
      } catch (error) {
        console.error(error);
        res.status(500).json({ success: false, error: "Internal server error" });
      }
    });




    app.get("/hydraulicValves", async (req, res) => {
      const query = {category: {$eq : 'hydraulicValves'}}
      const result = await productCollection.find(query).toArray();
      res.send(result);
    });
    
    app.get("/mistFan", async (req, res) => {
      const query = {category: {$eq : 'mistFan'}}
      const result = await productCollection.find(query).toArray();
      res.send(result);
    });
    
    app.get("/fogNuzzles", async (req, res) => {
      const query = {category: {$eq : 'fogNuzzles'}}
      const result = await productCollection.find(query).toArray();
      res.send(result);
    });
    
    app.get("/fogAndMistPumps", async (req, res) => {
      const query = {category: {$eq : 'fogAndMistPumps'}}
      const result = await productCollection.find(query).toArray();
      res.send(result);
    });
    
    app.get("/filter", async (req, res) => {
      const query = {category: {$eq : 'filter'}}
      const result = await productCollection.find(query).toArray();
      res.send(result);
    });
    
    app.get("/connectors", async (req, res) => {
      const query = {category: {$eq : 'connectors'}}
      const result = await productCollection.find(query).toArray();
      res.send(result);
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
