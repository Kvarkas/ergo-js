


test('widgets/box', function(){
	
	var w;
	
	
	w = $.ergo({
		etype: 'box',
		content: {
		}
	});
	
	equals(w.el[0].tagName, 'DIV', 'Создан элемент с тегом DIV');
	equals(w.content._class_name, 'Ergo.widgets.Box', 'Содержимым бокса по умолчанию является бокс');

	
	
});
