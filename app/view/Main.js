Ext.define("ceda.view.Main", {
    extend: 'Ext.Container',
    xtype: 'view',

    config: {
    	layout: 'fit',
    	fullscreen: true,
    	cls: 'desktop',
        items: [
        	{
        		id: 'topbar',
        		xtype: 'toolbar',
          		docked: 'top',
          		items: [
	          		{
	          			id: 'backbutton',
			            iconMask: true,
			            ui: 'back',
			            text: 'Back',
			            pack: 'center',
			            align: 'center'
	          			
	          		},
								{
									id: 'restartbutton',
									iconMask: true,
									ui: 'home',
									text: 'Restart',
									pack: 'center',
									align: 'center'
								}
	          	]
        	},
            {
            	id:"mainpanel",
            	xtype: 'container',
            	layout:'card'
            }
        ]
    }
});
