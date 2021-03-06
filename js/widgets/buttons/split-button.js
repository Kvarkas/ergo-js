
//= require <widgets/items/button-item>

Ergo.declare('Ergo.widgets.SplitButton', 'Ergo.widgets.Box', {
	
	defaults: {
		cls: 'e-split-button',
		
		mixins: ['dropdownable', 'selectable'],
		
		components: {
			content: {
				etype: 'button-item',
				autoWidth: true,
				onClick: function() {
					this.events.bubble('action');
				}
			},
			button: {
				etype: 'icon-button',
				icon: 'button-arrow-down',
				onClick: function() {
					this.parent.dropdown.open();
				}				
			}
		},
		
		
		set: {
			'text': function(v) {
				this.content.opt('text', v);
			}
		}
		
/*		
		defaultItem: {
			etype: 'button-item'
		},
		items: [{
			autoWidth: true
		}, {
			icon: 'button-arrow-down',
			onClick: function() {
				this.parent.dropdown.open();
			}
		}],
		
		onSelect: function(e) {
			this.dropdown.close();
			this.item(0).opt('text', e.target.opt('text'));
		},
		
		components: {
			dropdown: {
				etype: 'dropdown-box',
				adjustWidth: true
			}
		}			
*/		
	}
	
	
	// $pre_construct: function(o) {
		// this.$super(o);
// 		
		// if(o.dropdownContent) {
			// Ergo.smart_override(o.components.dropdown, {content: o.dropdownContent});
		// }
// 		
// 		
	// }
	
	
	
/*	
	setDropdownItems: function(list) {
		
		this.dropdown.content.items.remove_all();
		
		for(var i = 0; i < list.length; i++) {
			this.dropdown.content.items.add( list[i] );
		}
		
	}
*/	
	
}, 'split-button');
