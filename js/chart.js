function displayfileData(allData) {

   //console.log(allData);

   //document.querySelector("#chart-container").innerHTML = "<h2 class='Title'>Books</h2>";

   allData.forEach( (book) => {
      let title = book.title;
      let author = book.author;
      let price = book.price;
      let format = book.format;
      let genre = book.genre;

      document.querySelector("#chart-container").innerHTML +=
      "<div class='book'>" +
      "<h3 class='book-title'>" + title + "</h3>" +
      "<strong class='price'> $" + price + "</strong>" +
      "<p class='author'>" + author + "</p>" +
      "<p class='format'>" + format + "</p>" +
      "<p class='genre'>" + genre + "</p>" +
      "<div>";
   });
}

function avePriceByFormat(allData) {

   var numOfEbooks = 0;
   var ebookAcc = 0;

   var numOfHardcovers = 0;
   var hardcoverAcc = 0;

   var numOfPaperBacks = 0;
   var paperbackAcc = 0;

   //console.log(allData);

   allData.forEach( (book) => {

      //console.log(book.format);

      switch (book.format) {
         case "ebook":
            //console.log("in E!");
            numOfEbooks += 1;
            ebookAcc += book.price;
            break;
         case "hardcover":
            //console.log("in H!");
            numOfHardcovers += 1;
            hardcoverAcc += book.price;
            break;
         case "paperback":
            //console.log("in P!");
            numOfPaperBacks += 1;
            paperbackAcc += book.price;
            break;
      }
   });

   var aveEbookPrice = (ebookAcc / numOfEbooks).toFixed(2);
   var aveHardcoverPrice = (hardcoverAcc / numOfHardcovers).toFixed(2);
   var avePaperbackPrice = (paperbackAcc / numOfPaperBacks).toFixed(2);

   //console.log("Average Price of Ebook", aveEbookPrice);
   //console.log("Average Price of Hardcover", aveHardcoverPrice);
   //console.log("Average Price of Paperback", avePaperbackPrice);

   return {
      "title": "Average Price of Book By Book Format",
      "key": "Price",
      "bookFormat": ["ebook", "hardcover", "paperback"],
      "avePrice": [aveEbookPrice, aveHardcoverPrice, avePaperbackPrice]
   };
}

function createChartToDOM(titleInfo, xLabelInfo, legendKeyLabel, dataInfo) {
   var data = {
      //labels: [],
      labels: xLabelInfo,
      datasets: [{
         label: legendKeyLabel,
         borderColor: "rgb(255, 99, 132)",
         backgroundColor: "rgba(255, 99, 132, 0.5)",
         borderWidth: 1,
         data: dataInfo,
         fill: false,
      }]
   }

   var options = {
      scales: {
         xAxes: [{
            //display: false,
            ticks: {}
         }],
         yAxes: [{
            display: true,
            ticks: {
               beginAtZero: true
            }
         }]
      },
      elements: {
         line: {
            tension: 0.1, // disables bezier curves
         }
      },
      layout: {
         padding: {
             left: 10,
             right: 10,
             top: 0,
             bottom: 0
         }
      },
      title: {
         display: true,
         fontSize: 36,
         fontFamily: "monospace",
         fontColor: "#333",
         text: titleInfo,
      },
      legend: {}
   }

   // CREATES AND DISPLAYS CHARTJS OBJECt
   var context = document.getElementById("myChart").getContext("2d");
   var myChart = new Chart(context, {
      type: "bar",
      data: data,
      options: options
   });
}
