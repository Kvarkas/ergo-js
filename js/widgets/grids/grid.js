
//= require <widgets/table>



Dino.declare('Dino.widgets.Grid', 'Dino.core.Container', {
	
	defaults: {
		html: '<table cellspacing="0"></table>',
		style: {'border-collapse': 'collapse', 'table-layout': 'fixed'},
		width: '100%',
		dynamic: true,
		defaultItem: {
			dtype: 'table-row'
		},
		components: {
			cols: {
				dtype: 'table-row'
			}
		},
		gridModel: {
			row: {},
			cell: {},
			columns: []
		}
	},
	
	
	$init: function(o) {
		Dino.widgets.Grid.superclass.$init.apply(this, arguments);
		
		var cols = [];
		Dino.each(o.gridModel.columns, function(col){
			var w = ('width' in col) ? {width: col.width} : {};
			delete col.width;
			cols.push(w);
		});
		
		Dino.smart_override(o.defaultItem, o.gridModel.row, {defaultItem: o.gridModel.cell, items: o.gridModel.columns});
		Dino.smart_override(o.components.cols, {items: cols});		
		
	}
	
	
	
}, 'grid');





/*
Dino.widgets.Grid = Dino.declare('Dino.widgets.Grid', 'Dino.widgets.Box', { 
	
	defaults: {
		baseCls: 'dino-grid',
		components: {
			header: {
				dtype: 'box',
				layout: {
					dtype: 'plain-layout',
					html: '<div style="overflow-x: hidden;"></div>'
				},
				content: {
					dtype: 'table',
					width: '100%',
					binding: false,
					headerModel: {
						cell: {
							cls: 'dino-grid-h-cell',
							layout: {
								dtype: 'plain-layout',
								html: '<div class="nowrap"></div>'
							}
						}						
					}
				}
			},
			content: {
				// скроллируемый контейнер
				dtype: 'box',
				style: {'overflow-y': 'auto', 'overflow-x': 'hidden'},
				height: 'auto',
				content: {
					dtype: 'table',
//					width: '100%',
					tableModel: {
						row: {
							cls: 'dino-grid-row'
						},
						cell: {
							cls: 'dino-grid-cell',
							layout: {
								dtype: 'plain-layout',
								html: '<div class="nowrap"></div>'
							}
						}
					}
				}
			}
		}
	},
	
	
	
	$init: function() {
		Dino.widgets.Grid.superclass.$init.apply(this, arguments);
		
		var o = this.options;
		
		// переносим параметр width из колонок в заголовки
		var h_columns = [];
		Dino.each(o.tableModel.columns, function(column, i){
			h_col = {};
			if('width' in column) h_col.width = column.width;
			if('header' in column) {
				if(Dino.isString(column.header)) h_col.text = column.header;
				else Dino.smart_override(h_col, column.header);
			}
			h_columns[i] = h_col;
		})
		
		
		Dino.smart_override(o.components.content.content, {'tableModel': o.tableModel});
		Dino.smart_override(o.components.header.content, {'headerModel': o.headerModel || {}}, {headerModel: {columns: h_columns}});
		
	},
	
//	$opt: function(o) {
//		Dino.widgets.Grid.superclass.$opt.apply(this, arguments);
//		
//		if('isDynamic' in o) this.content.body.opt('dynamic', true);
//	},
	
	
	$layoutChanged: function() {
		Dino.widgets.Grid.superclass.$layoutChanged.apply(this, arguments);
		
		var total_w = this.layout.el.innerWidth();
		
		total_w -= 17;
		
		// выполняем настройку ширины полей
		var body = this.content.content.body;
		var head = this.header.content.head;
//		var total_w = body.el.innerWidth();
//		var htotal_w = this.content.content.el.width();

		// если максимальная ширина контейнера равна 0 (как правило, это означает, что он еще не виден), 
		// расчет ширины колонок не выполняем  
		if(total_w == 0) return;
		
		
		var t_columns = [];
//		var h_columns = [];
		var t_nowrap = [];
		var w = 0;
		var n = 0;
		Dino.each(body.options.defaultItem.items, function(column, i){
			h_col = {};
			if('width' in column) {
				t_columns[i] = column.width;
				w += column.width;
			}
			else {
				t_columns[i] = null;
				n++;
			}
			t_nowrap[i] = column.nowrap;
		});
		
		if(n > 0) {
			var eq_w = (total_w - w) / n;
			for(var i = 0; i < t_columns.length; i++) if(t_columns[i] === null) t_columns[i] = eq_w;
		}

		var real_width = [];
		
		var head0 = head.items.get(0);
		
		for(var i = 0; i < t_columns.length; i++) {
			// определим фактическую ширину поля
			var th = head0.items.get(i).el;
			var dw = th.outerWidth() - th.innerWidth();
			real_width[i] = t_columns[i] - dw;
			
			head0.items.get(i).layout.el.width(real_width[i]);//.opt('width', t_columns[i]);
			
//			if(t_nowrap[i])

			body.options.defaultItem.items[i].layout = {html: '<div class="nowrap" style="width:'+real_width[i]+'px"></div>'};//.width = t_columns[i];
			
			
//			else
//				body.options.defaultItem.items[i].width = t_columns[i];
//			head.options.defaultItem.items[i].width = h_columns[i];
		}
		
		// обходим все строки
		body.items.each(function(row){
			// обходим все поля
			row.items.each(function(col, i){
				col.layout.el.width(real_width[i]);//t_columns[i]);
//				col.opt('width', t_columns[i]);
			});
		});
		

		this.content.content.layout.el.width(total_w);		
		this.header.layout.el.width(total_w);		
		
//		var tableWidth = this.content.content.el.width();
	},
	
	
	eachRow: function(callback) {
		this.content.content.eachRow(callback);
	},
	
	getRow: function(i) {
		return this.content.content.getRow(i);
	}
	
//	$dataChanged: function() {
//		Dino.widgets.Grid.superclass.$dataChanged.apply(this, arguments);
//		
////		this.$layoutChanged();
//		
//	}
	
	
	
	
}, 'grid');

*/





