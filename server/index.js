const express = require("express");
const app = express();
require("dotenv").config();
const con = require("./connection");
const auth = require("./Router/auth");
const varify = require("./MiddleWare/varify");
const varify2 = require("./MiddleWare/varify2");
const multer = require("multer");
const path = require("path");
const JWT = require("jsonwebtoken");

const cors = require("cors");
const { verify } = require("crypto");
const { useParams } = require("react-router-dom");

app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.use(
  cors({
    origin: "http://localhost:3000",
    credentials: true,
    methods: ["GET", "POST"],
  })
);

app.use("/", auth);

app.use("/images", express.static(path.resolve("../public/uploaded")));

const storage = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, "../public/uploaded/");
  },

  filename: (req, file, cb) => {
    cb(
      null,
      file.fieldname + "-" + Date.now() + path.extname(file.originalname)
    );
  },
});

const upload = multer({ storage: storage });

app.post("/upload/:CName", upload.single("file"), (req, res) => {
  const { CName } = req.params;
  if (!req.file) {
    console.log("No file upload");
  } else {
    var imgsrc = "http://localhost:3500/images/" + req.file.filename;

    con.query(
      `UPDATE company SET logo = (?) WHERE compName = (?)`,
      [imgsrc, CName],
      (error, result) => {
        if (error) {
          console.log(error);
        }
        res.send("Upload File");
      }
    );
  }
});

app.get("/companyList", (req, res) => {
  con.query("SELECT * FROM company", (error, result) => {
    if (error) {
      res.status(401).json({ error: error });
      return;
    }
    res.send(result);
  });
});

app.post("/addCompany", varify2, (req, res) => {
  const {
    compName,
    location,
    technology,
    genEmailId,
    genContact,
    ceoName,
    hrName,
    hrEmailId,
    description,
    payOpt,
    payment,
    intMode,
    role,
  } = req.body;
  const rating = 0;
  console.log(compName);
  try {
    con.query(
      "SELECT * FROM company WHERE compName = ?",
      [compName],
      (error, result) => {
        if (result.length > 0) {
          res.status(401).json({ error: "Company Already Exist" });
          return;
        }

        con.query(
          "INSERT INTO company(compName, location, technology, generalEmail, contact, ceoName, hrName, hrEmail, description, payStatus, stipend, rating, intMode, role) VALUES (?,?,?,?,?,?,?,?,?,?,?,?,?,?)",
          [
            compName,
            location,
            technology,
            genEmailId,
            genContact,
            ceoName,
            hrName,
            hrEmailId,
            description,
            payOpt,
            payment,
            rating,
            intMode,
            role,
          ],
          (error, result) => {
            if (error) {
              res.status(401).json({ error: "Error in submission of data " });
              console.log(error);
              return;
            } else {
              con.query(
                `CREATE TABLE ${compName} (
                      email varchar(30) NOT NULL,
                      userName varchar (20) NOT NULL,
                      comments varchar(250) NOT NULL,
                      rating int(5) NOT NULL,
                      CONSTRAINT ${compName}_PK PRIMARY KEY (email)
                      )`,
                (error, result) => {
                  if (error) {
                    console.log(error);
                    res.status(401).json({
                      error: "Something is wrong in regrestration of compamy",
                    });
                    return;
                  } else {
                    res
                      .status(201)
                      .json({ message: "Successfull Registeration 🤗" });
                    return;
                  }
                }
              );
            }
          }
        );
      }
    );
  } catch (error) {
    console.log(error);
    res
      .status(401)
      .send({ message: "There is something wrong ! Please try later" });
  }
});

app.get("/card/:id", (req, res) => {
  const { id } = req.params;
  con.query(
    "SELECT * FROM company WHERE compId = (?)",
    [id],
    (error, result) => {
      if (error) {
        console.log(error);
        res.status(401).json({ error: "There is Something wrong" });
        return;
      }
      res.send(result);
    }
  );
});

app.post("/updateComp/:compId/:oldCompName", varify2, (req, res) => {
  const { id, oldCompName } = req.params;
  const {
    compName,
    location,
    technology,
    genEmailId,
    genContact,
    ceoName,
    hrName,
    hrEmailId,
    description,
    payOpt,
    payment,
    intMode,
    role,
  } = req.body;
  const { compId } = req.params;
  con.query(
    "UPDATE company SET compName = ?, location = ?, technology = ?, generalEmail = ?, contact = ?, ceoName = ?, hrName = ?, hrEmail = ?, description = ?, payStatus = ?, stipend = ?, intMode = ?, role = ? WHERE compId = ?",
    [
      compName,
      location,
      technology,
      genEmailId,
      genContact,
      ceoName,
      hrName,
      hrEmailId,
      description,
      payOpt,
      payment,
      intMode,
      role,
      compId,
    ],
    (error, result) => {
      if (error) {
        res.status(401).json({ error: "There Is Something Wrong" });
        console.log(compId);
        console.log(error);
        return;
      } else {
        con.query(
          `ALTER TABLE ${oldCompName} RENAME TO ${compName}`,
          // "ALTER TABLE `?` RENAME TO `?`",[oldCompName, compName],
          (error, result) => {
            if (error) {
              console.log(error);
              res
                .status(401)
                .json({ error: "There Is Something Wrong To Update Data" });
              return;
            }
            res.status(201).json({ message: "Successfuly Updated 🤗" });
            return;
          }
        );
      }
    }
  );
});

app.post("/deleteCompany/:id/:compName", varify2, (req, res) => {
  const { id, compName } = req.params;
  console.log(compName);

  con.query("DELETE FROM company WHERE compId = ?", [id], (error, result) => {
    if (error) {
      console.log(error);
      res.status(422).json("Error in Removing This Company ");
      return;
    } else {
      con.query(`DROP TABLE ${compName}`, (error, result) => {
        if (error) {
          console.log(error);
          res.status(422).json("Error in Removing This Company ");
          return;
        } else {
          res.status(201).json({ message: "Company Deleted 🤗" });
          return;
        }
      });
    }
  });
});

app.post("/addReview/:compName", varify, (req, res) => {
  const { compName } = req.params;
  const { comments, rating } = req.body;
  const { token } = req.body;

  const payload = JWT.verify(token, process.env.JWT_SECRET_KEY);
  const userName = payload.userName;
  const email = payload.email;

  try {
    con.query(
      `SELECT * FROM ${compName} WHERE email = ?`,
      [email],
      (error, result) => {
        if (result.length > 0) {
          con.query(
            `UPDATE ${compName} SET comments = ?,rating = ? WHERE email = ?`,
            [comments, rating, email],
            (error, result) => {
              if (error) {
                console.log(error);
                res.status(422).json("Error In Updating Your Review");
                return;
              } else {
                con.query(
                  `SELECT AVG(rating) FROM ${compName}`,
                  (error, result) => {
                    console.log(result);
                    if (error) {
                      res.status(422).json("Error In Adding Rating");
                      // console.log(error);1
                      return;
                    } else {
                      const avgRating = JSON.parse(JSON.stringify(result));
                      const newVab = avgRating[0]['AVG(rating)']
                      // console.log(newVab);
                      con.query(
                        "UPDATE company SET rating = ? WHERE compName = ?",
                        [newVab, compName],
                        (error, result) => {
                          if (error) {
                            console.log(error);
                            res.status(422).json("Error In Adding Rating");
                            return;
                          } else {
                            console.log(result);
                            res
                              .status(201)
                              .json({ message: "Successfuly Update Your Review 🤗" });
                            return;
                          }
                        }
                      );
                    }
                  }
                );
              }
            }
          );
        } else {
          con.query(
            `INSERT INTO ${compName} (email, userName, comments, rating) VALUES (?,?,?,?)`,
            [email, userName, comments, rating],
            (error, result) => {
              if (error) {
                res.status(422).json("Error In Adding Review");
                return;
              } else {
                con.query(
                  `SELECT AVG(rating) FROM ${compName}`,
                  (error, result) => {
                    // console.log(result);
                    if (error) {
                      res.status(422).json("Error In Calculating Rating");
                      console.log(error);
                      return;
                    } else {
                      const avgRating = JSON.parse(JSON.stringify(result));
                      const newVab = avgRating[0]['AVG(rating)']
                      // console.log(newVab);
                      con.query(
                        "UPDATE company SET rating = ? WHERE compName = ?",
                        [newVab, compName],
                        (error, result) => {
                          if (error) {
                            console.log(error);
                            res.status(422).json("Error In Adding Rating");
                            return;
                          } else {
                            console.log(result);
                            res
                              .status(201)
                              .json({ message: "Successfuly Added Review 🤗" });
                            return;
                          }
                        }
                      );
                    }
                  }
                );
              }
            }
          );
        }
      }
    );
  } catch (error) {
    console.log(error);
    res
      .status(401)
      .send({ message: "There is something wrong ! Please try later" });
  }
});

app.get('/companyReview/:compName',(req,res)=>{
  const {compName} = req.params;

  con.query(`SELECT * FROM ${compName}`, (error, result) => {
    if (error) {
      res.status(401).json({ error: 'Error In Presenting Reviews !' });
      console.log(error)
      return;
    }
    res.send(result);
  });
})

app.listen(3500, () => {
  console.log("Your Server Is On 3500 Port");
});
