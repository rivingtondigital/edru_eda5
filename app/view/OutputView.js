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
	setCollectedInfo: function(info, notes){

        var ret = "<div> <input type='button' value='"+ lang.PRINT +"' style='float:left;margin-top:5px;margin-bottom:5px' class='x-button' onclick='printer()'/><h1 class='questionheader'>"+ lang.RESULTS +"</h1></div>";
        for(key in info){
            var header = key;
	    if (lang.hasOwnProperty(header)){
		header = lang[header];
	    }
            var content = info[key];
            ret += "<div class='sectiondiv'>";
            ret += "<div class='tabheader'>"+header+"</div><br/>";
            ret += "<table class='outputtable'>";
            for(subkey in content){
		if (lang.hasOwnProperty(subkey)){
			subkey_disp = lang[subkey];
		}
		else{
                	subkey_disp = subkey.replace(/([A-Z][a-z]+)([A-Z]+[a-z]*)/g, '$1 $2')
		}
                ret += "<tr>";
                ret += "<td>"+subkey_disp+"</td>";
                ret += "<td>"+content[subkey]+"</td>";
                ret += "</tr>";
            }
            ret += "</table><br/><br/>";
        }
        ret += "<div class='sectiondiv'>";
        ret += "<div class='tabheader'>"+ lang.NOTES +"</div>";
        ret += "<pre style='white-space: pre-line; float: left;clear: both;margin: 10px; font-family: inherit'>"+notes+"</pre>";

        var info_tag = document.getElementById('hddnInfo');
	    var notes_tag = document.getElementById('hddnNotes');

	    if (info_tag == null){
            ret += "<input type='hidden' id='hddnInfo' value='"+ JSON.stringify(info) +"'/>";
            ret += "<input type='hidden' id='hddnNotes' value='"+ notes +"'/>";
	    }
	    else{
	        info_tag.value = JSON.stringify(info);
	        notes_tag.value = notes;
	    }
        this.setHtml(ret);
	}
});
