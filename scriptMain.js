function refreshData(){ 		//für webserver
	console.log("aktualisiere Aufträge...");
	var xmlhttp = new XMLHttpRequest();
	xmlhttp.onreadystatechange = function(error) {
		if (error) {console.log("fehler bei Anfrage!");}
		if (this.readyState == 4 && this.status == 200) {
			var JSONobj = JSON.parse(this.responseText);
			updateTable(JSONobj);
			console.log("empfanegn!");
			console.log(JSONobj);
			}
	};
	xmlhttp.open("GET", "/ToDos.json", true);
	xmlhttp.send();
}
function refreshDataLokal(){	//zum lokalen testen (danke Chrome!)
	console.log("aktualisiere Aufträge lokal...");
	var JSONobj = JSON.parse("[{\"task\":\"Die Weltherrschaft übernehmen\",\"date\":\"24.04.2020\",\"stat\":\"0.0001\"},{\"task\":\"30 Sekunden die Luft anhalten\",\"date\":\"24.04.2020\",\"stat\":\"0.2\"}]");
	updateTable(JSONobj);
}

function updateTable(JSONobj){
	var tbody = document.getElementById("todotbody");
	tbody.innerHTML = "";
	console.log(JSONobj);
	for(var i = 0; i < JSONobj.length; i++) {
		var task = JSONobj[i];
		addTableRow(tbody,task,i)
	}
}

function addTableRow(tbody,task,id){
	var row = document.createElement("tr")
	row.setAttribute("id",id);
	tbody.appendChild(row)
	
	var td = document.createElement("td");
	td.appendChild(document.createTextNode(task.task))
	row.appendChild(td)
	
	var td = document.createElement("td");
	td.appendChild(document.createTextNode(task.date))
	row.appendChild(td)
	
	var td = document.createElement("td");
	td.appendChild(document.createTextNode(task.stat*100  +"%"))
	row.appendChild(td)
	
	var td = document.createElement("td");
	var btn = document.createElement("button");
	btn.innerHTML = "löschen";
	btn.setAttribute("onclick","deleteItem(" + id + ");");
	td.appendChild(btn);
	row.appendChild(td);
}
function deleteItem(id){
	//http DELETE request auf die ressource todos/{id} 
	console.log("lösche Todo "+ id) 
	 $("#"+id).hide(1000);		//show
}