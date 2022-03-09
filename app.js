const express = require("express");
const app = express();

const port = 8080;

app.use(express.json());

const recipes = [
  {
    Rid: 1234,
    Rname: "chicken curry",
    Rtype: "non-veg",
    IngridentsReq: "chicken and masala",
    StepsToPrepare: "clean chicken and add masala",
  },
  {
    Rid: 12345,
    Rname: "chicken thandoori",
    Rtype: "non-veg",
    IngridentsReq: "chicken and masala",
    StepsToPrepare: "clean chicken and add masala",
  },
];

//to fetch all the recipes
app.get("/recipes", (req, res) => {
  res.send(recipes);
});

//to fetch a single recipe
app.get("/recipes/:id", (req, res) => {
  const recipe = recipes.find((recipe) => recipe.Rid == req.params.id);
  if (!recipe) {
    return res.status(404).json({
      message: `${req.params.id} is not found`,
    });
  }
  res.send(recipe);
});

//add a single recipe
app.post("/recipes", (req, res) => {
  const payload = req.body;
  if (!payload.Rname) {
    return res.send(404).json({ message: "payload must have a name" });
  }
  payload.id = new Date().getTime();
  recipes.push(payload);
  res.send(payload);
});

//delete recipe
app.delete("/recipes/:id", (req, res) => {
  const index = recipes.findIndex((recipe) => recipe.Rid == req.params.id);
  if (index == -1) {
    return res.status(404).json({ message: `${req.params.id} is not found` });
  }
  const deletedrecipe = recipes[index];
  recipes.splice(index, 1);
  res.send(deletedrecipe);
});

//use method

app.use((req, res, next) => {
  return res.status(404).json({ message: "Resourse not found" });
});

app.listen(port, (err) => {
  if (err) {
    console.log(err);
    process.exit(1);
  }
  console.log(`server is running on ${port}`);
});
