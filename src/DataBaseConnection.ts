const mongoose=require('mongoose');


async function buildDatabase() {
    return mongoose.connect(process.env['dbURI'], { useNewUrlParser: true, useUnifiedTopology: true })
    .then(() => {
        console.log("connected to db");
    })
    .catch((err:string) => {
        console.log("Connection Error with the database: "+err);
    });

}

export default buildDatabase;