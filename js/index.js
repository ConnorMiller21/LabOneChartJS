const xmlhttp = new XMLHttpRequest();
const formats = ["ebook", "hardcover", "paperback"]

// Get JSON File
xmlhttp.onreadystatechange = function() {
   if (this.readyState == 4 && this.status == 200) {
      var myObj = JSON.parse(this.responseText); // Parse JSON file
      var dataInFile = myObj.books; // JSON data

      const priceByFormatData = avePriceByFormat(dataInFile);
      //console.log(priceByFormatData);

      displayfileData(dataInFile);
      createChartToDOM(priceByFormatData.title, priceByFormatData.bookFormat, priceByFormatData.key, priceByFormatData.avePrice);
   }
};
xmlhttp.open("GET", "js/books.json", true);
xmlhttp.send();
