
//= require "box"

Dino.declare('Dino.widgets.GlassPane', 'Dino.widgets.Box', {
	
//	defaultClass: 'dino-glass-box',
	
	defaults: {
		html: '<div class="dino-glass-pane" autoheight="ignore"/>',
		events: {
			'mousedown': function(e) {
				e.preventDefault();
				return false;
			}
			
//    this.glass_panel.bind('click', function(e){
//      self.hide();
//			e.stopPropagation();
//    });
		}
	}
	
}, 'glass-pane');