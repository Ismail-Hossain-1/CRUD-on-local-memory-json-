const fs = require('fs');
const express = require('express');
const crudRoute = express.Router();
const { v4: uuidv4 } = require('uuid');



function readDataFromDB() {
    try {
        const data = JSON.parse(fs.readFileSync('DB.json', 'utf8'));
        return data;

    } catch (e) {
        console.log(e);
    }
}
function wrirteDatainDB(input) {
    fs.writeFileSync('DB.json', JSON.stringify(input));
}




crudRoute.get('/', (req, res) => {
    res.json("running");
    //const uniqueId = uuidv4();
    // console.log(uniqueId);
});

const DB = 'DB.json';


crudRoute.get('/all', (req, res) => {
    res.json(readDataFromDB());
})

crudRoute.post('/item', (req, res) => {
    const newItem = req.body;
    newItem.id = uuidv4();


    try {
        //newItem.id= uuidv4();
        console.log(newItem);
        const data = readDataFromDB(); // Read the entire data


        data.push(newItem); // Add the new item to the existing array

        wrirteDatainDB(data);


        res.json({ newItem });
    } catch (error) {

    }
});
crudRoute.put('/update/:id', (req, res) => {
    const id = req.params.id;
    const updataItem = req.body;
    console.log(id, updataItem);

    try {
        const data = JSON.parse(fs.readFileSync('DB.json', 'utf8'));
        const newData = [...data];

        const index = newData.findIndex(item => item.id === id);
        if (!index) {
            return res.json("ID not found");
        }
        updataItem.id = id;
        newData[index] = updataItem;
        fs.writeFileSync('DB.json', JSON.stringify(newData));
        res.json(updataItem);

    } catch (error) {
        console.log(error);
    }

})


crudRoute.delete('/delete/:id', (req, res) => {
    const id = req.params.id;

    try {
        const data = JSON.parse(fs.readFileSync('DB.json', 'utf8'));
        const newData = [...data];

        const index = newData.findIndex(item => item.id === id);
        if (!index) {
            return res.json("ID not found");
        }

    } catch (error) {
        console.log(error);
    }

    let data = JSON.parse(fs.readFileSync('DB.json', 'utf8'));
    data = data.filter(item => item.id !== id);

    fs.writeFileSync('DB.json', JSON.stringify(data));
    res.json('deleted');


});








module.exports = crudRoute;