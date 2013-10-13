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
				title: 'Login',
				items: [
					{
						id: 'txt_login_username',
						xtype: 'textfield',
						label: 'User Name',
						name: 'user'
					},
					{
						id: 'pass_login_pass',
						xtype: 'passwordfield',
						label: 'Password',
						name: 'password'
					},

					{
						id: 'bttn_goto_register',
						xtype: 'button',
						text: 'register',
						margin: 20,
						padding: "5 20",
						docked: 'bottom'
					},
					{
						id: 'bttn_login',
						xtype: 'button',
						text:'login',
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