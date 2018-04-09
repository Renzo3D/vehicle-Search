const express = require('express');
const morgan = require('morgan');
const axios = require('axios');

const app = express();

app.use(morgan('dev'));
app.use(express.static('dist'));
app.use(express.static('public'));


app.get("/cardata", (req, res) => {
    let searchTerm = req.query.searchTerm;
    let apiUrl = 'https://www.carimagery.com/api.asmx/GetImageUrl?searchTerm=' + searchTerm;

    axios.get(apiUrl)
    .then(response => {
        let xmlData = response.data;
        console.log("this is the response I am looking for ", xmlData);

        let searchKey1 = '<string xmlns="http://carimagery.com/">';
        let searchKey2 = '</string>';
        let searchKey1Length = searchKey1.length;
        let index1 = xmlData.indexOf(searchKey1);
        let index2 = xmlData.indexOf(searchKey2);
        let startIndex = index1 + searchKey1Length;
        let length = index2 - startIndex;
        let imgUrl = xmlData.substr(startIndex, length);

        res.json({url: imgUrl});
       
    });
});

module.exports = app;

        // This is a sample for XML data
        // <?xml version="1.0" encoding="utf-8"?>
        //<string xmlns="http://carimagery.com/">
        //  http://www.regcheck.org.uk/image.aspx/@dG95b3RhY29yb2xsYTIwMTI=
        //</string>




        // var parser = new DOMParser();
        // var xmlDoc = parser.parseFromString(xmlData, "xmlData/xml");

        // var finalAnswer = xmlDoc.getElementsByTagName("string")
        // [0].childNodes[0].nodeValue;

        // console.log(finalAnswer);
        
        
        // Here you need to parse the XML and get the URL information
        //How?
        // Options:
        // 1. You can find an XML parser and get the first child element, it has the URL
        // 2. Use RegEx to extract directly the URL for the image
        // 3. Or use your string manipulation skill to get the URL


