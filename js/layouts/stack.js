
//= require "plain"


/**
 * @class
 * @extends Dino.layouts.PlainLayout
 */
Dino.layouts.StackLayout = Dino.declare('Dino.layouts.StackLayout', 'Dino.layouts.PlainLayout', /** @lends Dino.layouts.StackLayout.prototype */{
	
	defaults: {
//		containerCls: 'dino-stack-layout',
		name: 'stack',
		itemCls: 'hidden'
	},
	
	
	attach: function(){
		Dino.layouts.StackLayout.superclass.attach.apply(this, arguments);
		
		var self = this;
		
		this.container.setActive = function(i) {
			self.activate(i);
		};
		
	},
	
	detach: function() {
		Dino.layouts.StackLayout.superclass.detach.apply(this, arguments);
		
		delete this.container.setActive;
	},
	
	
	
	activate: function(i) {
		
		var child = (i instanceof Dino.core.Widget) ? i : this.container.children.find( Dino.utils.widget_filter(i) );
		
		this.container.children.each(function(c){
			c.el.toggleClass('hidden', (c != child));
		});
		
		if(child.layout) child.$layoutChanged();
		
		this.active = child;
		
	}
		
}, 'stack-layout');