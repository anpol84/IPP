const client = require("./client");
const path = require("path");
const express = require("express");
const bodyParser = require("body-parser");
const app = express();

app.set("views", path.join(__dirname, "views"));
app.set("view engine", "hbs");
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));

app.get("/", (req, res) => {
  client.getAll(null, (err, data) => {
    if (!err) {
      const t = req.query.t; // Извлекаем значение параметра "t"
      
      res.render("subscribers", {
        results: data.subscribers,
        t: t
      });
    }
  });
});

app.post("/save", (req, res) => {
  let newSubscriber = {
    username: req.body.username,
    password: req.body.password,
    
  };

  client.insert(newSubscriber, (err, data) => {
    if (err) throw err;
    console.log("Пользователь создан", data);
    res.redirect("/");
  });
});

app.post("/update", (req, res) => {
  console.log(req.body);
  const updateSubscriber = {
    _id: req.body._id,
    username: req.body.username,
    password: req.body.password,
    olderPassword: req.body.olderPassword
  };

  client.update(updateSubscriber, (t, data) => {
    if (t != null){
      res.redirect("/?t=" + encodeURIComponent(t.details));
    }else{
      res.redirect("/");
    }
  });
});

app.post("/remove", (req, res) => {
  console.log(req.body._id);  
  client.remove({ _id: req.body._id, olderPassword: req.body.olderPassword }, (t, _) => {
    if (t != null){
      res.redirect("/?t=" + encodeURIComponent(t.details));
    }else{
      res.redirect("/");
    }
  });
});

app.post("/hello", (req, res) => {
    const subscriber = {
        username: req.body.username,
        password: req.body.password
      };
      client.hello(subscriber, (t, ans) => {
        console.log(t.details);
        res.redirect("/?t=" + encodeURIComponent(t.details));
    });
  });

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
  console.log("Сервер запущен на порту %d", PORT);
});