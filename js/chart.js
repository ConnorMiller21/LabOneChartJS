function displayfileData(allData) {

   allData.forEach( (book) => {
      let title = book.title;
      let author = book.author;
      let price = book.price;
      let format = book.format;
      let genre = book.genre;

      document.querySelector("#chart-container").innerHTML +=
      "<div class='book'>" +
      "<h3 class='book-title'>" + title + "</h3>" +
      "<p class='price'> $" + price + "</p>" +
      "<p class='author'>Author: " + author + "</p>" +
      "<p class='format'>Format: " + format + "</p>" +
      "<p class='genre'>Genre: " + genre + "</p>" +
      "<div>";
   });
}

function avePriceByFormat(allData) {
   //console.log(allData);
   var ebookArr = [];
   var hardcoverArr = [];
   var paperbackArr = [];

   allData.forEach( (book) => {
      //console.log(book.format);
      switch (book.format) {
         case "ebook":
            //console.log("in E!");
            ebookArr.push(book.price);
            break;
         case "hardcover":
            //console.log("in H!");
            hardcoverArr.push(book.price);
            break;
         case "paperback":
            //console.log("in P!");
            paperbackArr.push(book.price);
            break;
         default:
            break;
      }
   });

   console.log(ebookArr, hardcoverArr, paperbackArr);

   var aveEbookPrice = getArrayAverage(ebookArr);
   var aveHardcoverPrice = getArrayAverage(hardcoverArr);
   var avePaperbackPrice = getArrayAverage(paperbackArr);

   console.log(aveEbookPrice, aveHardcoverPrice, avePaperbackPrice);

   return {
      "title": "Average Price of Book By Book Format",
      "key": "Price",
      "bookFormat": ["ebook", "hardcover", "paperback"],
      "avePrice": [aveEbookPrice, aveHardcoverPrice, avePaperbackPrice]
   };
}

function getArrayAverage(arr) {
   total = 0;
   arr.forEach( (price) => {
      total += price;
   });
   var average = (total / arr.length).toFixed(2);
   return average
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
