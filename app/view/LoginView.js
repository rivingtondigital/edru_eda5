Ext.define('ceda.view.LoginView', {
	extend: 'Ext.Container',
	xtype: 'loginview',
	config:{
		layout: 'auto',
		fullscreen: true,
		scrollable:{
			direction: 'vertical',
			directionLock: true
		},
		items:[
			{
				xtype: 'fieldset',
				title: lang.AUTHENTICATION,
				items: [
					{
						id: 'txt_login_username',
						xtype: 'textfield',
						label: lang.USER_NAME,
						name: 'user'
					},
					{
						id: 'pass_login_pass',
						xtype: 'passwordfield',
						label: lang.PASSWORD,
						name: 'password'
					},

					{
						id: 'bttn_goto_register',
						xtype: 'button',
						text: lang.REGISTER,
						margin: 20,
						padding: "5 20",
						docked: 'bottom'
					},
					{
						id: 'bttn_login',
						xtype: 'button',
						text:lang.LOGIN,
						//align: 'end',
						//ui: 'action',
						margin: 20,
						padding: "5 20",
						//record: null,
						docked: 'bottom'
					},
					{
						id: 'login_output',
						xtype: 'panel'

					}
				]
			}
		]
	}
})