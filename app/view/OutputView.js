Ext.define('ceda.view.OutputView', {
	extend: 'Ext.Container',
	xtype: 'oview',
	config:{
		data:true,
		scrollable:{
		    direction: 'vertical',
		    directionLock: true
		},

	},
	setCollectedInfo: function(info){
		var ret = "<div> <input type='button' value='print' style='float:right' class='x-button' onclick='printer()'/><h1 class='questionheader'>Results</h1></div>";
		ret += "<input type='hidden' id='hddnInfo' value='"+ JSON.stringify(info) +"'/>"
		for(key in info){
			var header = key;
			var content = info[key];
			ret += "<div class='sectiondiv'>";
			ret += "<div class='tabheader'>"+header+"</div><br/>";
			ret += "<table class='outputtable'>";
			for(subkey in content){
				subkey = subkey.replace(/([A-Z][a-z]+)([A-Z]+[a-z]*)/g, '$1 $2')
				ret += "<tr>";
				ret += "<td>"+subkey+"</td>";
				ret += "<td>"+content[subkey]+"</td>";
				ret += "</tr>";
			}
			ret += "</table><br/><br/>";
		}
		this.setHtml(ret);
	}
});