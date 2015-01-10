function printer(){
	var info = JSON.parse(document.getElementById('hddnInfo').value);
	var notes = JSON.parse(document.getElementById('hddnNotes').value);
	win = window.open();
	body = win.document.getElementsByTagName('body')[0];
	var ret = '<style>';
	ret += 'body{font-family: sans-serif;}';
	ret += 'h1{text-align:center}';
	ret += '.tabheader{width: 100%; font-size: larger; border-bottom: 1px solid gray;}';
	ret += '.outputtable{width: 80%; margin: auto; border-collapse:collapse}';
	ret += '.outputtable td{border-bottom: 1px dashed gray; vertical-align: top;padding-right: 10px;}';
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
			subkey_disp = subkey.replace(/([A-Z][a-z]+)([A-Z]+[a-z]*)/g, '$1 $2')
			ret += "<tr>";
			ret += "<td>"+subkey_disp+"</td>";
			ret += "<td><span class='value'>"+content[subkey]+"</span></td>";
			ret += "</tr>";
		}
		ret += "</table><br/><br/>";
		ret += "</div>";
	}
	ret += "<div class='sectiondiv'>";
	ret += "<div class='tabheader'>Notes</div>";
	ret += "<pre style='font-family:inherit;padding:15px'>"+notes+"</pre>";

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
