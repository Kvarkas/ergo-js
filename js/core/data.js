

/**
 * @name Dino.data
 * @namespace
 */


/**
 * @class
 * @name Dino.data.DataSource
 * @extends Dino.events.Observer
 */
Dino.declare('Dino.data.DataSource', 'Dino.events.Observer', /**@lends Dino.data.DataSource.prototype */{
	
	classOptions: {
		useDirty: false
	},
	
	/**
	 * @param {Object} src
	 * @param {Object} id
	 * @param {Object} options
	 */
	initialize: function(src, id, options) {
		Dino.data.DataSource.superclass.initialize.apply(this, arguments);

		if(src)	this.source = src;
		
		if(arguments.length == 2){
			this.source = src;
			if(Dino.isPlainObject(id)) options = id;
			else this.id = id;
		}
		else if(arguments.length == 3) {
			this.id = id;
		}
		
/*		
		if(arguments.length < 2){
			this.source = src;
		}
		else {
			this.source = src;
			this.id = id;
		}
*/		
		this.options = Dino.utils.overrideOpts({}, this.classOptions, options);
		this.items = {};
		this.is_dirty = false;
		this.stop_dirty = false;
	},
	
	
	destroy: function() {
		this.each_item(function(item){ item.destroy(); });
		this.events.unreg_all();
	},
	
	val: function() {
		if(this.source instanceof Dino.data.DataSource){
			return ('id' in this) ? this.source.val()[this.id]: this.source.val();//get(this.id) : this.source.get();
		}
		else{
			return ('id' in this) ? this.source[this.id] : this.source;
		}
	},
	
	// получаем значение
	get: function(i) {
		if(arguments.length == 0)
			return this.val();
		else{
			return this.item(i).val();
			
/*			
			var v = this.val();
			if( _dino.isString(i) ){
				var a = i.split('.');
				for(var j = 0; j < a.length; j++){
					if(v === null || v === undefined) return null;
					v = v[ a[j] ];
					
				}
				return v;
			}
			return v[i];
*/			
		}
	},
	
	// устанавливаем значение
	set: function(i, newValue) {
		if(arguments.length == 1) {
			newValue = i;
			// удаляем все элементы
			for(var j in this.items){
				this.items[j].destroy();
			}
			// теперь список элементов пуст
			this.items = {};
			
			
			var oldValue = ('id' in this) ? this.source.val()[this.id] : this.source;
			
			('id' in this) ? this.source.val()[this.id] = newValue : this.source = newValue;
			
//			if(this.source instanceof Dino.data.DataSource){
//				('id' in this) ? this.source.set(this.id, newValue) : this.source.set(newValue);
//			}
//			else {
//				('id' in this) ? this.source[this.id] = newValue : this.source = newValue;
//			}
			this.events.fire('onValueChanged', {'oldValue': oldValue, 'newValue': newValue});
			
			if(this.source instanceof Dino.data.DataSource)
				this.source.events.fire('onItemChanged', {item: this});
			
			// помечаем источник данных как "грязный"
			if(this.options.useDirty) this.dirty();
		}
		else {
			this.item(i).set(newValue);
/*			
			// получаем объект с данными (PlainObject или Array)
			var v = this.get();
			// если ключ - строка, то он может быть составным 
			if( _dino.isString(i) ){
				var a = i.split('.');
				var i = a.pop();
				// двигаемся внутрь объекта по элементам ключа
				for(var j = 0; j < a.length; j++) v = v[ a[j] ];
			}
			v[i] = newValue;
*/			
//			this.events.fire('onValueChanged');
		}
		
	},
	
	
	// обходим все значения
	each: function(callback) {
		var range = this.range;
		var self = this;
		Dino.each(this.val(), function(val, i){
			if(range){
				if(i < range[0] || i >= range[1]) return;
			}
			callback.call(this, val, i);
		});
//		Dino.each(this.val(), callback);
	},
	
	each_item: function(callback) {
//		var range = this.range;
//		var self = this;
//		Dino.each(this.val(), function(val, i){
//			if(range){
//				if(i < range[0] || i > range[1]) return;
//			}
//			callback.call(this, self.item(i), i);
//		});
		Dino.each(this.items, callback);
//		Dino.each(this.items, function(item, i){
//			if(range){
//				if(i < range[0] || i > range[1]) return;
//			}
//			callback.call(this, item, i);
//		});
	},
	
	
	item: function(i) {
		
		var data_item = this;
		
		// если ключ - строка, то он может быть составным 
		if(Dino.isString(i)) {
			var a = i.split('.');
			var i = a.pop();
			// двигаемся внутрь объекта по элементам ключа
			for(var j = 0; j < a.length; j++) data_item = data_item.item(a[j]);
		}
		
		return data_item.ensure_item(i);
//		//TODO элементы тоже можно получать по составному индексу
//		if(!(i in this.items)) {
//			var item = Dino.isArray(this.get(i)) ? new Dino.data.ArrayDataSource(this, i) : new Dino.data.ObjectDataSource(this, i);
//			this.items[i] = item;
//		}
//		return this.items[i];
	},
	
	
	ensure_item: function(i) {
		// если элемент данных отсутствует, то вызываем метод создания элемента
		if(!(i in this.items))
			this.items[i] = this.create_item(i);
		return this.items[i];		
	},
	
	create_item: function(i) {
		// для массивов используем ArrayDataSource, а для всего остального ObjectDataSource
		return Dino.isArray(this.val()[i]) ? new Dino.data.ArrayDataSource(this, i, this.options) : new Dino.data.ObjectDataSource(this, i, this.options);
	},
	
	dirty: function(flag) {
		
		flag = (arguments.length == 0) ? true : flag;
		
		var event = new Dino.events.CancelEvent();
		
		if(flag) {
			if(this.is_dirty) return;
						
			this.events.fire('onDirty', event);			
			if(event.isCanceled) return true;
			
			this.is_dirty = true;
			
			if(this.stop_dirty) return true; //FIXME использовать флаг не совсем корректно, поскольку он не может быть опцией
			
			if(this.source instanceof Dino.data.DataSource) if( this.source.dirty(true) ) return true;
		}
		else {
			if(!this.is_dirty) return;

			this.events.fire('onClean', event);
			if(event.isCanceled) return;
			
			this.is_dirty = false;

			if(this.stop_dirty) return;
			
			for(var i in this.items) this.items[i].dirty(false);
		}
		
	},
	
	clean_all: function() {
		this.is_dirty = false;
		for(var i in this.items) this.items[i].clean_all();		
	},
	
	
	walk: function(callback) {
		if( callback.call(this, this) ) return;
		for(var i in this.items) this.items[i].walk(callback);
	},
	
	find: function(criteria) {
		return Dino.find(this.items, criteria);
	}
		
//	asArray: function() {
//		return new Dino.data.ArrayDataSource(this);
//	},
//	
//	asObject: function() {
//		return new Dino.data.ObjectDataSource(this);
//	}
	
/*	
	eachItem: function(callback){
		Dino.each(this.items, callback);
	}
*/	
	
});










/**
 * @class
 * @name Dino.data.ArrayDataSource
 * @extends Dino.data.DataSource
 * @param {Object} src
 * @param {Object} id
 * @param {Object} options
 */
Dino.declare('Dino.data.ArrayDataSource', 'Dino.data.DataSource', /** @lends Dino.data.ArrayDataSource.prototype */{
	
	initialize: function(src, id, options) {
		this.source = [];
		Dino.data.ArrayDataSource.superclass.initialize.apply(this, arguments);
	},
	
	
	del: function(i) {
	
		if(arguments.length == 0) {
			
			if(this.source) this.source.del(this.id);
			
			return;
		}
	
	
		// удаляем элемент, если он есть
		if(i in this.items){
			this.items[i].destroy();
			delete this.items[i];
		}
		
		var a = this.val();
		// оповещаем элементы о смене индекса и меняем ключ в кэше элементов
		for(var j = i+1; j < a.length; j++){
//			if(j in this.items){
				//this.items[j]
			this.events.fire('onIndexChanged', {'oldIndex': j, 'newIndex': (j-1)});
			if(j in this.items){
				this.items[j].id = j-1;
				this.items[j-1] = this.items[j];
				delete this.items[j];
			}
			
//			}
		}
		
		// удаляем элемент массива
		a.splice(i, 1);
		
		this.events.fire('onItemDeleted', {'index': i});
		
		// помечаем источник данных как "грязный"
//		this.dirty();		
	},
	
	add: function(value, index) {
		var a = this.val();
		
		var isLast = false;
		
		if(index == null){
			a.push(value);
			index = a.length-1;
			isLast = true;
		}
		else {
			// меняем индексы элементов данных
			for(var i = a.length-1; i >= index; i--){
				if(this.items[i]){
//					this.events.fire('onIndexChanged', {'oldIndex': j, 'newIndex': (j-1)});
					this.items[i].id = i+1;
					this.items[i+1] = this.items[i];
				}
			}
			
			delete this.items[index];
			
			// добавляем новый элемент массива
			a.splice(index, 0, value);
		}
		
		var item = this.item(index);
		
		this.events.fire('onItemAdded', {'index': index, 'item': item, 'isLast': isLast});
		
		// помечаем новый источник данных как "грязный" ?
//		this.dirty();
		
		return item;
	},	
	
	size: function() {
		return this.val().length;
	}
	
});


/**
 * @class
 * @name Dino.data.ObjectDataSource
 * @extends Dino.data.DataSource
 * @param {Object} src
 * @param {Object} id
 * @param {Object} options
 */
Dino.declare('Dino.data.ObjectDataSource', 'Dino.data.DataSource', /** @lends Dino.data.ObjectDataSource.prototype */{
	
	initialize: function(src, id, options) {
		this.source = {};
		Dino.data.ObjectDataSource.superclass.initialize.apply(this, arguments);
	},
	
	del: function(i){
	
		if(arguments.length == 0) {
			
			if(this.source) this.source.del(this.id);
			
			return;
		}
	
	
		// удаляем элемент из кэша, если он есть
		if(i in this.items){
			this.items[i].destroy();
			delete this.items[i];
		}
		
		var obj = this.val();
		delete obj[i];
		
		this.events.fire('onItemDeleted', {'index': i});
		
		// помечаем источник данных как "грязный"
//		this.dirty();
	}
	
	
});











