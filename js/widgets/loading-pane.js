
//= require <widgets/box>
//= require <extensions/effects>


/**
 * @class
 * @extends Ergo.containers.ListBox
 */
Ergo.widgets.LoadingPane = Ergo.declare('Ergo.widgets.LoadingPane', 'Ergo.widgets.Box', /** @lends Ergo.widgets.LoadingOverlay.prototype */{
	
	defaults: {
		components: {
			overlay: {
				weight: 1,
				etype: 'box',
				cls: 'ergo-loading-overlay',
				opacity: .7				
			},
			message: {
				weight: 2,
				etype: 'box',
				opacity: 1,
				cls: 'ergo-loading-message',
				content: {
					etype: 'text-item',
					text: 'Загрузка...',
					icon: 'ergo-icon-loader'
				}				
			}
		},
		style: {'display': 'none'},
		showOnRender: false,
		extensions: ['effects']
	}
	
}, 'loading-pane');