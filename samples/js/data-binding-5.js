sample('Обновление данных', {
	etype: 'box',
	
	// за счет иерархического связывания оба дочерних виджета будут
	// иметь один и тот же источник данных
	data: '',
	
	// задаем отступы для дочерних элементов
	defaultItem: {
		style: {'margin-right': 20}
	},
	
	items: [{
		etype: 'text-input'
	}, {
		etype: 'text'
	}]
	
	
}, 'Введенный текст изменяет содержимое источника данных, который обновляет текст другого связанного с ним виджета.');
