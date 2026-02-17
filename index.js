const express = require("express");

const app = express();
app.use(express.json());

const users = [
  { uid: 108243, name: "Devanshi", bonus: 20, att: "80", total_subjects: 14},
  { uid: 108432, name: "Vidhi", bonus: 100, att: "100", total_subjects: 15 },
  { uid: 108475, name: "Rani", bonus: 50, att: "90", total_subjects: 5 },
  { uid: 108444, name: "Yashvi", bonus: 75, att: "95", total_subjects: 9 },

];

app.get("/users", (req, res) => {
  res.status(200).json(users);
});

app.get("/users/:uid", (req, res) => {

    console.log("params :",req.params);

  const userId = Number(req.params.uid);
  const user = users.find(u => u.uid === userId);
console.log("user :",user);

  if (!user) {
    return res.status(404).json({ message: "User not found" });
  }

  res.status(200).json(user);
});

app.post("/users", (req, res) => {
  const newUser = {
    uid: users.length + 1,
    name: req.body.name,
    bonus: req.body.bonus,
    att: req.body.att,
    total_subjects: req.body.total_subjects
  };

  users.push(newUser);

  app.post("/users", (req, res) => {
   
   console.log("Req body: ",req.body);

   const user1={
    id:req.body[0].id,
    name:req.body[0].name,
    role:req.body[0].role
   }
   console.log("user1:",user1);
   users.push(user1);

   const users1={
    id:req.body[0].id,
    name:req.body[0].name,
    role:req.body[0].role
   }
   console.log("user1:",user1);
   users.push(user1);

  })

  res.status(201).json({
    message: "User created",
    user: newUser
  });
});

app.put("/users/:uid", (req, res) => {

  console.log("req body :",req.body);
  console.log("params :",req.params);

  const userId = Number(req.params.uid);
  const index = users.findIndex(u => u.uid === userId);

  if (index === -1) {
    return res.status(404).json({ message: "User not found" });
  }

  users[index] = {
    uid: userId,
    name: req.body.name,
    bonus: req.body.bonus,
    att: req.body.att,
    total_subjects: req.body.total_subjects,
  };

  res.status(200).json({
    message: "User replaced",
    user: users[index]
  });
});

app.patch("/users/:uid", (req, res) => {

    console.log("req body :",req.body);
    console.log("params :",req.params);
     const userId = Number(req.params.uid);
     const user = users.find(u => u.uid === userId);
  console.log("user :",user);
  console.log("users :",users);

  if (!user) {
    return res.status(404).json({ message: "User not found" });
  }

  if (req.body.name) user.name = req.body.name;
  if (req.body.bonus) user.bonus = req.body.bonus;
  if (req.body.att) user.att = req.body.att;
  if (req.body.total_subjects) user.total_subjects = req.body.total_subjects;

  res.status(200).json({
    message: "User updated",
    user
  });
});


app.delete("/users/:uid", (req, res) => {

    console.log("params :",req.params);
  const userId = Number(req.params.uid);
  console.log("userId :",userId);
  console.log("users :",users);
  const index = users.findIndex(u => u.uid === userId);
  console.log("index :",index);

  if (index === -1) {
    return res.status(404).json({ message: "User not found" });
  }

  users.splice(index, 1);

  res.status(204).end();
});

app.listen(3000, () => {
  console.log("Server started on port 3000");
});