
var dlg = $.dino({
  dtype: 'dialog',
  renderTo: '.preview',
  content: {
    dtype: 'box',
    layout: 'stack-layout',
    items: [{
      width: 100,
      innerText: 'Нажмите кнопку "Далее"'
    }, {
      width: 400,
      innerText: Samples.loremipsum
    }]
  },
  buttonSet: {
    'next': {text: 'Далее >>', tag: 'next'},
    'prev': {text: '<< Назад', tag: 'prev'},
  },
  onClose: function(e) {
    if(this.dialogButton == 'next'){
      dlg.opt({
        title: 'Шаг 2',
        buttons: ['prev', 'ok', 'cancel']
      });
      dlg.content.layout.activate(1);
      dlg.layout.update();
      e.cancel();
    }
    else if(this.dialogButton == 'prev') {
      dlg.opt({
        title: 'Шаг 1',
        buttons: ['next', 'cancel']
      });
      dlg.content.layout.activate(0);
      dlg.layout.update();
      e.cancel();      
    }
  }
  
});  

$.dino({
  dtype: 'text-button',
  renderTo: '.preview',
  text: 'Открыть диалог',
  onAction: function() {
    dlg.opt({
      title: 'Шаг 1',
      buttons: ['next', 'cancel']
    });
    dlg.content.layout.activate(0);
    dlg.open();
  }
});
    
    