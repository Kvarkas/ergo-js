    
var tgTreeData = new Dino.data.ArrayDataSource([]);


$.getJSON('ajax/file_system.json', {}, function(data) { tgTreeData.set(data) });

    
$.dino({
  dtype: 'tree-grid',
  renderTo: '.preview',
  tag: 'aaa',
  cls: 'tree-grid dino-border-all dino-corner-all',
  data: tgTreeData,
//  dataId: 'children',
  width: 600,
//  debug: true,
  content: {
//    autoHeight: true,
    height: 300,//'auto',
    style: {'padding-right': '3px'}
  },
  headerCls: 'dino-bg-highlight',
  headerModel: {
    cell: {
      cls: 'tg-header'
    },
    columns: [{
      innerText: '#',
      width: 40
    }, {
      innerText: 'Файл'
    }, {
      innerText: 'Размер',
      width: 100
    }]
  },
  tableModel: {
    cell: {
      cls: 'tg-cell'
    },
    row: {
      cls: 'tg-row',
      state: 'expanded'
    },
    columns: [{
      dataId: 'id',
      width: 40,
      binding: 'auto'
    }, {
      dtype: 'tree-table-cell',
      style: {'text-align': 'left'},
      expandOnShow: true,
      content: {
        content: {
          icon: true,
          components: {
            leftIcon: {
              dataId: 'type',
              format: function(val) { return 'led-icon-'+val; },
              binding: function(val) {  this.states.setOnly(val); }
            },
            content: {
              dataId: 'name'
            }
          },
          state: 'nonselectable'
        }        
      },
      binding: function(val) {
        this.opt('isLeaf', (val.type == 'film'));
      }
    }, {
      width: 100,
      dataId: 'value',
      binding: 'auto'
    }]
  }
});  


    