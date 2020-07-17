var rpi;
var today = new Date();
var year = today.getUTCFullYear();
var month = today.getMonth() + 1;
var day = today.getDate() - 2;
var testDate = year.toString() +
  "-" + month.toString() +
  "-" + day.toString() +
  "T00:00:00.00";
$.ajax({
	url: "https://health.data.ny.gov/resource/xdss-u53e.json",
	type: "GET",
	data: {
    "test_date": testDate,
    "county": "Rensselaer",
		"$limit" : 5000,
		"$$app_token" : "j8DMx2sS3mZ2vpHHlBp4k76xg"
	}
}).done(function(data) {
  console.log(data);
	rpi = data;
	var test_date = rpi[0]["test_date"];
	test_date = test_date.split("T")[0]
	$("#testDate").text(test_date);
	$("#county").text(rpi[0]["county"]);
	$("#cumPosCases").text(rpi[0]["cumulative_number_of_positives"]);
	$("#newPosCases").text(rpi[0]["new_positives"]);
	$("#cumTests").text(rpi[0]["cumulative_number_of_tests"]);
	$("#dailyTests").text(rpi[0]["total_number_of_tests"]);

  var cum_inf_rate = rpi[0]["cumulative_number_of_positives"] /
    rpi[0]["cumulative_number_of_tests"];
  cum_inf_rate = cum_inf_rate.toFixed(2).toString();
  cum_inf_rate = cum_inf_rate + "%";
	$("#cumInfectionRate").text(cum_inf_rate);

  var daily_inf_rate = rpi[0]["new_positives"] /
    rpi[0]["total_number_of_tests"];
  daily_inf_rate = daily_inf_rate.toFixed(2).toString();
  daily_inf_rate = daily_inf_rate + " % ";
	$("#dailyInfectionRate").text(daily_inf_rate);
});
