function printer(){
	var info = JSON.parse(document.getElementById('hddnInfo').value);
	win = window.open();
	body = win.document.getElementsByTagName('body')[0];
	var ret = '<style>';
	ret += 'body{font-family: sans-serif;}';
	ret += 'h1{text-align:center}';
	ret += '.tabheader{width: 100%; font-size: larger; border-bottom: 1px solid gray;}';
	ret += '.outputtable{width: 80%; margin: auto; border-collapse:collapse}';
	ret += '.outputtable td{border-bottom: 1px dashed gray}';
	ret += '.value{float:right}'
	ret += '</style>';
	ret += "<div><h1>EDA-5 Results</h1></div>";
	for(key in info){
		var header = key;
		var content = info[key];
		ret += "<div class='sectiondiv'>";
		ret += "<div class='tabheader'>"+header+"</div><br/>";
		ret += "<table class='outputtable'>";
		for(subkey in content){
			ret += "<tr>";
			ret += "<td>"+subkey+"</td>";
			ret += "<td><span class='value'>"+content[subkey]+"</span></td>";
			ret += "</tr>";
		}
		ret += "</table><br/><br/>";
		ret += "</div>";
	}
	body.innerHTML = ret;
	console.info(ret);
}

function calcBMI(w_ele, h_ele, bmi_ele){
	var weight = parseFloat(document.getElementById(w_ele).value);
	var height = parseFloat(document.getElementById(h_ele).value);
	//console.debug("this is called");
	var bmi = weight/(height*height) * 703;
	bmi = bmi.toPrecision(3);
	document.getElementById(bmi_ele).value = bmi;
}