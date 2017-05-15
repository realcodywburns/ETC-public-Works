// basic information about the dapp
var uri = 'https://mewapi.epool.io';
var web3 = new Web3(new Web3.providers.HttpProvider(uri));
var abiArray = [{"constant":true,"inputs":[],"name":"dateUpdated","outputs":[{"name":"","type":"uint256"}],"payable":false,"type":"function"},{"constant":false,"inputs":[{"name":"_newipfs","type":"string"}],"name":"updater","outputs":[],"payable":false,"type":"function"},{"constant":false,"inputs":[],"name":"kill","outputs":[],"payable":false,"type":"function"},{"constant":true,"inputs":[{"name":"_id","type":"uint256"}],"name":"olddate","outputs":[{"name":"","type":"uint256"}],"payable":false,"type":"function"},{"constant":true,"inputs":[{"name":"_id","type":"uint256"}],"name":"oldstate","outputs":[{"name":"","type":"string"}],"payable":false,"type":"function"},{"constant":true,"inputs":[],"name":"currentAddr","outputs":[{"name":"","type":"string"}],"payable":false,"type":"function"},{"anonymous":false,"inputs":[{"indexed":false,"name":"comment","type":"string"}],"name":"stateUpdate","type":"event"}];
var contractAddress = "0x28bfbf40bf22e3e78767fa3ba321e7311374ddda";
var contract = web3.eth.contract(abiArray).at(contractAddress);


window.onload = function() {
	var currentAddr = contract.currentAddr();
	var contractTime = contract.dateUpdated();
	$('#currentAccount').html("http://ipfs.io/ipfs/" + currentAddr);
	var a = document.getElementById('currentAccount'); 
	a.href = "http://ipfs.io/ipfs/" + currentAddr;
	<!-- Countdown Timer -->
	// Set the date we're counting down to
	var countDownDate = contractTime*1000 + 604800000;
	// Update the count down every 1 second
	var x = setInterval(function() {

	// Get todays date and time
	var now = new Date().getTime();

	// Find the distance between now an the count down date
	var distance = countDownDate - now;

  // Time calculations for days, hours, minutes and seconds
  var days = Math.floor(distance / (1000 * 60 * 60 * 24));
  var hours = Math.floor((distance % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));
  var minutes = Math.floor((distance % (1000 * 60 * 60)) / (1000 * 60));
  var seconds = Math.floor((distance % (1000 * 60)) / 1000);

  // Display the result in the element with id="demo"
  document.getElementById("demo").innerHTML = days + "d " + hours + "h "
  + minutes + "m " + seconds + "s ";

  // If the count down is finished, write some text
  if (distance < 0) {
    clearInterval(x);
    document.getElementById("demo").innerHTML = "Processing";
  }
}, 1000);

	//fill the table with old elements
	
	var table = document.getElementById("oldFileTable");
	var oldcount = 1;
	
	for (i = 1; i < 52; i++){
		var oldCT = contract.oldstate(i);
		var oldDT = contract.olddate(i);
		if(oldDT == 0){break};
		var row = table.insertRow(i-1);
		var cell1 = row.insertCell(0);
		var cell2 = row.insertCell(1);
		var cell3 = row.insertCell(2);
		cell1.innerHTML = i;
		cell2.innerHTML = oldCT;
		cell3.innerHTML = new Date(oldDT*1000);
		oldcount += 1;
	}
	};