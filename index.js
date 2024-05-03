const express = require("express")
const app = express()
const mysql = require("mysql")
const port = 4000
const cors = require("cors")

app.use(express.json())
app.use(cors({
    origin: ['http://localhost:3000']
  }));

app.listen(port, () => {
    console.log("base de datos jlproduccions conected")
})


app.get("/", (req, res) => {
    res.send("Servidor jlProduccions funcionando")
})

// const connect = mysql.createConnection({
//     database: "bcuw2zngebmpdaqofd9z",
//     host: "bcuw2zngebmpdaqofd9z-mysql.services.clever-cloud.com",
//     password: "GNe1y2vIG9FNo3JNsHpw",
//     port: "*",
//     user: "udepn9lhel4o0igh"

// })

// // enviar reseñas al frontend

// app.get("/getReseña", (req, res) => {
//     const sql = "SELECT * FROM resenas";
  
//     // Ejecutar la consulta SQL
//     connection.query(sql, (err, results) => {
//       if (err) {
//         console.error('Error al ejecutar la consulta:', err);
//         res.status(500).json({ error: 'Error al obtener las reseñas' });
//         return;
//       }
//       res.json(results); // Enviar los resultados como respuesta en formato JSON
//     });


// }) 


// // traer reseñas del frontend y enviar a la base de datos
// app.post("/postReseña", (req, res) => {
//     const {name, resena} = req.body

//     const sql = 'INSERT INTO resenas (name, resena) VALUES (?, ?)';
//         connect.query(sql, [name, resena], (error, resultados) => {
//           if (error) {
//             console.error('Error al insertar reseña en la base de datos:', error);
//             res.status(500).send('Error al insertar reseña en la base de datos');
//             return;
//           }
//           console.log('Reseña insertada correctamente en la base de datos');
//           res.status(200).send('Reseña insertada correctamente en la base de datos');
//         });
    
// } )

const connection = mysql.createConnection({
    database: "bcuw2zngebmpdaqofd9z",
    host: "bcuw2zngebmpdaqofd9z-mysql.services.clever-cloud.com",
    password: "GNe1y2vIG9FNo3JNsHpw",
    port: "3306", // Puede que necesites cambiar esto por el puerto correcto de tu base de datos
    user: "udepn9lhel4o0igh"
});

// Establecer la conexión
connection.connect((err) => {
    if (err) {
        console.error('Error al conectar a la base de datos:', err);
        return;
    }
    console.log('Conexión a la base de datos establecida');
});

app.get("/", (req, res) => {
    res.send("Servidor jlProduccions funcionando");
});

// Enviar reseñas al frontend
app.get("/getReseña", (req, res) => {
    const sql = "SELECT * FROM resenas";

    // Ejecutar la consulta SQL
    connection.query(sql, (err, results) => {
        if (err) {
            console.error('Error al ejecutar la consulta:', err);
            res.status(500).json({ error: 'Error al obtener las reseñas' });
            return;
        }
        res.json(results); // Enviar los resultados como respuesta en formato JSON
    });
});

// Traer reseñas del frontend y enviar a la base de datos
app.post("/postReseña", (req, res) => {
    const { name, resena } = req.body;

    const sql = 'INSERT INTO resenas (name, resena) VALUES (?, ?)';
    connection.query(sql, [name, resena], (error, resultados) => {
        if (error) {
            console.error('Error al insertar reseña en la base de datos:', error);
            res.status(500).send('Error al insertar reseña en la base de datos');
            return;
        }
        console.log('Reseña insertada correctamente en la base de datos');
        res.status(200).send('Reseña insertada correctamente en la base de datos');
    });
});