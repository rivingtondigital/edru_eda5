Ext.define("ceda.view.Main", {
    extend: 'Ext.Container',
    xtype: 'view',

    config: {
    	layout: 'fit',
    	fullscreen: true,
    	cls: 'desktop',
        items: [
            {
                id: 'titlebar',
                xtype: 'container',
                docked: 'top',
                cls: 'title_cls'
            },
            {
        		id: 'topbar',
        		xtype: 'toolbar',
          		docked: 'top',
          		items: [
					{
						id: 'backbutton',
						iconMask: true,
						ui: 'back',
						text: lang.BACK,
						pack: 'center',
						align: 'center'
					},
					{
						id: 'restartbutton',
						iconMask: true,
						ui: 'home',
						text: lang.RESTART,
						pack: 'center',
						align: 'center'
					},
					{
						id: 'sbutton',
						iconMask: true,
						ui: 'home',
						text: lang.SAVE,
						pack: 'center',
						align: 'center'
					},
					{
						id: 'xnotesbutton',
						iconMask: true,
						ui: 'back',
						text: lang.SAVE,
						pack: 'end',
						align: 'center'
					},
					{
						xtype:'spacer',
						ui: 'home',
						pack: 'center',
						align: 'bottom'
					},
					{
						id: 'notesbutton',
						iconMask: true,
						ui: 'home',
						text: lang.NOTES,
						pack: 'end',
						align: 'center'
					}
//                    {
//                        id: 'updatebutton',
//                        iconMask: true,
//                        ui: 'home',
//                        pack: 'right',
//                        align: 'center',
//                        xtype: 'button',
//                        text: lang.UPDATE
//                    }
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
