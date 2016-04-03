
(function(global) {

	var API = 'http://localhost:8080';


	var _render_recipe_overview = function(recipes) {

		var code    = '';
		var recipe  = recipes[0];
		var header  = document.querySelector('#recipe-overview header');
		var article = document.querySelector('#recipe-overview article');

		if (header !== null) {
			header.style.backgroundImage = 'url(' + recipe.image + ')';
		}

		code += '<h2>' + recipe.title + '</h2>';
		code += '<p>Cooking time: ' + recipe.minutes + 'min</p>';

		article.innerHTML = code;
		code = '';


		for (var r = 1, rl = recipes.length; r < rl; r++) {

			recipe = recipes[r];

			code += '<li>';
			code += '<figure style="background-image:url(' + recipe.image + ');"/>';
			code += '<div>';
			code += '<h3>' + recipe.title + '</h3>';
			code += '<p>Cooking time: ' + recipe.minutes + 'min</p>';
			code += '</div>';
			code += '</li>';

		}

		$('#recipe-overview fieldset ul').html(code);

	};


	$('#recipe-overview input').on('blur', function() {

		var val = $(this).val();

		$.get(API + '/api/Recipes', {
			search: val
		}, function(raw) {

			var data = null;

			try {
				data = JSON.parse(raw);
			} catch(e) {
				data = null;
			}


			if (data !== null && data instanceof Array) {
				_render_recipe_overview(data);
			}

		});

	});

})(window);

