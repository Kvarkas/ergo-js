
/**
 * Коллекция представляет собой буфер страницы, 
 * заполняемый запросами к серверу
 * 
 */
AjaxCollection = Ergo.data.Collection.extend({
  
  
  initialize: function() {
    AjaxCollection.superclass.initialize.apply(this, arguments);
    
    this._from = 0;
    this._to = 0;
    this._fetched = false;
  },
  
  fetch: function() {
    
    var self = this;
    var deferred = $.Deferred();
    
    // эмулируем ajax-запрос, который возвращает результат через 1 сек
    setTimeout(function(){
      
      self.set( Samples.generate_grid_page(self._from, self._to) );
      self._fetched = true;
      deferred.resolve();
      
    }, 1000);
    
    return deferred;
  },
  
  range: function(from, to) {
    this._from = from;
    this._to = to;
    return this;
  }
  
  
  
  
});




var gridData = new AjaxCollection([]);



var grid = $.ergo({
  etype: 'table-grid',
  renderTo: '.preview',
  cls: 'ergo-border-all',
  
  data: gridData,
  
  width: 600,
  height: 400,
  
  tableModel: {
    columns: [{
      dataId: 'id',
      header: 'ID',
      width: 50,
    }, {
      dataId: 'string',
      header: 'Строка',
    }, {
      dataId: 'number',
      header: 'Число',
    }]
  },
  
  
  components: {
    pager: {
      etype: 'pager',
      count: 155,
      pageSize: 40,
      cls: 'ergo-border-top',
      onIndexChanged: function(e) {
        var g = this.parent;
        g.loader.show();
        g.data.range(e.from, e.to).fetch().then(function(){ g.$layoutChanged(); g.loader.hide(); });        
      }      
    },
    loader: {
      etype: 'loading-pane'
    }
  }
  
  
});


grid.pager.setIndex(0);



