

//= require "collection"


Ergo.data.RESTCollection = Ergo.declare('Ergo.data.RESTCollection', 'Ergo.data.Collection', {
	
	
  initialize: function() {
  	this.$super.apply(this, arguments);
//    Ergo.data.AjaxCollection.superclass.initialize.apply(this, arguments);
    
//    this._from = 0;
//    this._to = 0;
    this._fetched = false;
  },
  
  
  
  fetch: function() {
    
    var self = this;
    
    return $.getJSON(this.options.path, Ergo.override({_: Ergo.timestamp()}, this.options.queryParams))
    	.always(function(){
    		self._fetched = true;
    	})
    	.success(function(json){
    		self.set(json);
    	});
  }
  
/*  
  range: function(from, to) {
    this._from = from;
    this._to = to;
    return this;
  }
*/  
  
  
  
});