

Ergo.defineClass('Ergo.widgets.Pagination', 'Ergo.widgets.List', {
	
	defaults: {
		
		cls: 'pagination',
		mixins: ['selectable'],
		dynamic: false,  // отключаем динамическое построение элементов
		components: {
			nextBtn: {
				etype: 'html:li',
				weight: 100,
				$content: {
					etype: 'link',
					text: '»',
					binding: false,
					events: {
						'jquery:mousedown': function(e) {
							this.events.rise('nextIndex');
							e.preventDefault(); // блокируем выделение текста
						}
					}
				}
			},
			prevBtn: {
				etype: 'html:li',
				weight: -100,
				$content: {
					etype: 'link',
					text: '«',
					binding: false,
					events: {
						'jquery:mousedown': function(e) {
							this.events.rise('prevIndex');
							e.preventDefault(); // блокируем выделение текста
						}
					}
				}			
			}
		},
		defaultItem: {
			$content: {
				etype: 'link',
				events: {
					'jquery:mousedown': function(e) {
	//				this.parent.parent.opt('index', this.parent);
						var index = this.parent.opt('name');
						if(index)
							this.events.rise('changeIndex', {index: index});
						e.preventDefault(); // блокируем выделение текста
					}
				}
			},
			autoBind: false					
		},
//		dynamic: true,
		selectionFinder: function(key) {
			return this.item({_name: key});
		},
		onChangeIndex: function(e) {
			this.opt('index', e.index);
		},
		onNextIndex: function() {
			this.opt('index', this.opt('index')+1);
		},
		onPrevIndex: function() {
			this.opt('index', this.opt('index')-1);
		}
	},
	
	
	setIndex: function(index) {

		var count = this.data.opt('count');
		
		var before_pages = 2;
		var after_pages = 2;
		var wrap_pages = 2;
		
		this.items.apply_all('destroy');

		var min_float = Math.min(before_pages, count);
		var max_float = Math.max(before_pages, count-after_pages);
		var min_block = Math.max(min_float, index-wrap_pages-1);
		var max_block = Math.min(max_float, index+wrap_pages);
		
		// BEFORE
		for(var i = 0; i < min_float; i++)
			this.items.add({text: i+1, name: i+1});
		
		if(min_block - min_float > 0)
			this.items.add({text: '...'});
		
		for(var i = min_block; i < max_block; i++)
			this.items.add({text: i+1, name: i+1});

		if(max_float - max_block > 0)
			this.items.add({text: '...'});
		
		// AFTER
		for(var i = max_float; i < count; i++)
			this.items.add({text: i+1, name: i+1});
		
		this.$render();
		
		this.opt('selected', index);
		
//		data.opt('index', index);
//		data.fetch();
		
		this.events.fire('indexChanged', {index: index});
	}
	
	
	
}, 'widgets:pagination');