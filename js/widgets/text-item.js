


Dino.declare('Dino.widgets.TextItem', 'Dino.Widget', {
	
	defaultOptions: {
		layout: 'dock-layout',
		components: {
			leftIcon: {
				dtype: 'icon',
				dock: 'left'
			},
			content: {
				dtype: 'text'
			},
			rightIcon: {
				dtype: 'icon',
				dock: 'right'
			}
		}
	},
	
	
	_opt: function(o) {
		Dino.widgets.TextItem.superclass._opt.apply(this, arguments);
		
		if('leftCls' in o) this.leftIcon.opt('cls', o.leftCls);
		if('contentCls' in o) this.content.opt('cls', o.contentCls);
		if('rightCls' in o) this.rightIcon.opt('cls', o.rightCls);
	}
	
	
	
}, 'text-item');