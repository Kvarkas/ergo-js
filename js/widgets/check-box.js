
//= require <widgets/natives/box>


Ergo.declare('Ergo.widgets.CheckBox', 'Ergo.widgets.Box', {
	
	defaults: {
		cls: 'e-check-box',
		content: {
			cls: 'e-checker'
		},
		onClick: function() {
			this.states.toggle('checked');
		}
	}
	
}, 'check-box');
