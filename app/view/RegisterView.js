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
						label: 'User Name',
						name: 'user'
					},
					{
						id: 'pass_reg_pass',
						xtype: 'passwordfield',
						label: 'Password',
						name: 'password'
					},
					{
						id: 'pass_reg_confirm',
						xtype: 'passwordfield',
						label: 'Confirm',
						name: 'confirm'
					},
					{
						id: 'bttn_register',
						xtype: 'button',
						text: 'register',
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