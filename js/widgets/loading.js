
/**
 * @class
 * @extends Dino.containers.Box
 */
Dino.widgets.LoadingOverlay = Dino.declare('Dino.widgets.LoadingOverlay', 'Dino.containers.Box', /** @lends Dino.widgets.LoadingOverlay.prototype */{
	
	defaultOptions: {
		components: {
			overlay: {
				weight: 1,
				dtype: 'box',
				cls: 'dino-loading-overlay',
				opacity: .7				
			},
			message: {
				weight: 2,
				dtype: 'box',
				opacity: 1,
				cls: 'dino-loading-message',
				content: {
					dtype: 'text-item',
					text: 'Загрузка...',
					showLeftIcon: true,
					leftIconCls: 'dino-icon-spinner'			
				}				
			}
		}
	}
	
}, 'loading-overlay');