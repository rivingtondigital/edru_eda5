Ext.define('ceda.view.RegisterView', {
	extend: 'Ext.Container',
	xtype: 'registerview',
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
				title: 'Register',
				items: [
					{
						id: 'txt_reg_username',
						xtype: 'textfield',
						label: lang.USER_NAME,
						name: 'user'
					},
					{
						id: 'pass_reg_pass',
						xtype: 'passwordfield',
						label: lang.PASSWORD,
						name: 'password'
					},
					{
						id: 'pass_reg_confirm',
						xtype: 'passwordfield',
						label: lang.CONFIRM,
						name: 'confirm'
					},
					{
						id: 'bttn_register',
						xtype: 'button',
						text: lang.REGISTER,
						margin: 20,
						padding: "5 20",
						docked: 'bottom'
					},
					{
						id: 'reg_output',
						xtype: 'panel'

					}
				]
			}
		]

	},
})