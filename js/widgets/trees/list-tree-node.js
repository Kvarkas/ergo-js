
//= require "basic-tree-node"


Ergo.declare('Ergo.widgets.IndentTreeNode', 'Ergo.widgets.BasicTreeNode', {
	
	defaultCls: 'ergo-list-tree-node',
	
	defaults: {
		indent: 0,
		components: {
			content: {
				components: {
					indent: {
						etype: 'box',
						style: {
							'display': 'inline'
						},
						weight: 5,
						defaultItem: {
							etype: 'text',
							binding: false,
							cls: 'indent',
							innerHtml: '&nbsp;'
						}
					}
				}
			}
		}				
	},
	
	$init: function(o) {
		this.$super(o);
//		Ergo.widgets.IndentTreeNode.superclass.$init.apply(this, arguments);
		
		o.components.subtree.defaultItem.indent = o.indent+1;		
	},
	
	
	$construct: function(o) {
		this.$super(o);
//		Ergo.widgets.IndentTreeNode.superclass.$construct.apply(this, arguments);
		
		for(var i = 0; i < o.indent; i++) {
			this.content.indent.items.add({});
		}		
	}
	
		
}, 'indent-tree-node');