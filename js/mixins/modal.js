

Ergo.defineMixin('Ergo.mixins.Window', function(o) {
	
	
	this.open = function() {
		
		
		if(arguments.length == 2) {
			// x, y
			var x = arguments[0];
			var y = arguments[1];
			
			this.el.css({'top': y, 'left': x});
		}
		
		// получаем новый индекс z-слоя
		var z = Ergo.context._z || 0;
		z++;
		
		// устанавливаем z-index
		this.overlay.el.css({'z-index': z*1000});
		this.el.css({'z-index': z*1000+1});
		
		$('body').append(this.overlay.el);
		$('body').append(this.el);
		
		this.el.show();
		
		// здесь, в зависимости от методики позиционирования, расчитываются параметры
		
		// center
		var w = this.el.width();
		var h = this.el.height();
		
		var x = w/2;
		var y = h/2;
		
		this.el.css({'margin-left': -x, 'margin-top': -y});
		
		this.el.hide();
		
		this.overlay.show();
		
		return this.show();
	};
	
	
	this.close = function() {
		
		Ergo.context._z--;
		
		
//		this.overlay.el.detach();
		this.overlay.hide().then(function(){
			this.overlay.el.detach();
		}.bind(this));
		
		return this.hide().then(function(){
			this.el.detach();
		}.bind(this));
	};
	
	
	this.resize = function(w, h, comp) {
		
		var el = (comp) ? this.component(comp).el : this.el;
		
		var w0 = this.el.width();
		var h0 = this.el.height();
		
		el.css({'width': w, 'height': h});
		
		var w1 = this.el.width();
		var h1 = this.el.height();
		
		el.css({'width': w0, 'height': h0});
		
		el.animate({
			width: w,
			height: h,
			// 'margin-left': -w/2,
			// 'margin-top': -h/2
		});
		
		return $.when(this.el.animate({
			'margin-left': -w1/2,
			'margin-top': -h1/2
		}));
		
	};
	




	o.components = Ergo.smart_override({
		overlay: {
			etype: 'html:div',
			cls: 'overlay',
			autoHeight: 'ignore',
//			render: 'body',
			events: {
				'jquery:click': function(e, w) {
					
					if(w.parent.options.closeOn == 'outerClick')
						w.parent.close();
					
					// блокируем всплывание событий
					e.preventDefault();
					return false;
				}
			}
		}
	}, o.components);
	
	
	
	o.appearance = Ergo.smart_override({
		
	}, o.appearance);
	
	
	
}, 'mixins:modal');