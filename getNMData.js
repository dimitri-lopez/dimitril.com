var alertsURL = "https://www.nmhealth.org/news/all/";
var sampleAlert = "https://www.nmhealth.org/news/alert/2020/7/?view=1071";
var data;
var el;
var alertLinks;
var links;
var lists;
var newCases;
var oldCases;
var counties;
var done = false;

function updatePage(){
  link = links[0];
  var site = link;
  $(function(){
    $.get('proxy.php', {site:site}, function(data){
      scrapeAlert(data);
      links.shift();
    }, 'html');
  })
}

function scrapeAlert(html){
  data = html;
  html = html.toString()
  if(!html.includes("Updated New Mexico COVID-19 cases")){
    updatePage();
  }
  console.log("Scraping Alert Page...");

  lists = html.split("the most recent cases are:")[1];
	newCases = lists.split("<ul>")[1].split("<\/ul>")[0];
	oldCases = lists.split("<ul>")[3].split("<\/ul>")[0];


  counties = [];
  countyCounts = [];

  newCaseSplit = newCases.split("<li>");
  nonCounty = [];
  for(var i = 0; i < newCaseSplit.length; i++){
    entry = newCaseSplit[i];
    if(entry.includes("County ")){
      nonCounty.push(entry);
      continue;
    }
    county = entry.split(" County<\/li>")[0];
    county = county.split("in ")[1];
    count = entry.split(" ")[0];
    counties.push(county);
    countyCounts.push(count);
  }

  newCases = "";
  countySplit = oldCases.split("<li>");
  for(var i = 0; i < countySplit.length; i++){
    entry = countySplit[i]
    if(!entry.includes("County")){
      continue;
    }
    county = entry.split(" County")[0];

    index = counties.indexOf(county);

    if(index == -1){ //Not found
      count = 0;
    }else{
      count = countyCounts[index];
    }
    li = "<li>" + county + " County: " + count + "</li>\n"; 
    newCases = newCases + li;
  }

  otherNewCases = "";
  for(var i = 0; i < nonCounty.length; i++){
    entry = nonCounty[i]
    li = "<li>" + entry + "\n";
    otherNewCases = otherNewCases + li
  }


	document.getElementById("nmNewCases").innerHTML = newCases;
	document.getElementById("nmOldCases").innerHTML = oldCases;
  console.log("Done scraping.");
  return(true);
}


function processHTML(html){
  data = html;

  alertLinks = data.toString().split("table cellspacing");
  alertLinks = alertLinks[1];
  alertLinks = alertLinks.split("a href")

  links = [];

  for(var i = 0; i < alertLinks.length; i++){
    entry = alertLinks[i];
    if(!entry.includes("alert")){
      continue;
    }
    url = entry.split("\"")[1]
    url = "https://www.nmhealth.org" + url;
    links.push(url);
  }
  
  links = links;
  console.log("Got Links")
  //console.log(links)
  //END OF FUNCTION
  //TRANSITION TO OTHER FN
  //
  //
  updatePage();
}

$(function(){
  var site = alertsURL;
  //var site = sampleAlert;
  $.get('proxy.php', {site:site}, function(data){
    processHTML(data);
    //scrapeAlert(data);

  }, 'html');
})



