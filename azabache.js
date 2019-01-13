$(function(){
	//Efecto de entrada:
	
	/*
	Función recursiva que hace aparecer los .poligonos-intro del 1 al 4 con intervalos de 0.8 segundos
	Al finalizar, dichos polígonos serán desvanecidos, al tiempo que se hacen aparecer los poligonos del
	logo funcional.
	Luego de esto los polígonos de intro serán eliminados del DOM
	*/

	function aparecer_poligono(i){
		if(i<5){
			$('polygon[intro="'+i+'"]').fadeIn(800,function(){
				aparecer_poligono(i+1);
			});
		}else{
			$('.poligono-intro').fadeOut(1000,function(){
				$('.poligono-intro').remove();
			});
			$('.contenedor-poligono').fadeIn(1000);
			$('#container-menu').fadeIn(1000);
		}
	}
	//Al cargar la página se esperarán dos segundos y se llamará a la función que ejecutará la animación
	//del comienzo
	setTimeout(function(){

		aparecer_poligono(1);

	},2000);


	//Variables que indicarán si los botones y/o links ver demo están o no visibles
	var boton_desplegado = false;
	var contenido_desplegado = false;

	//variable que indica si el menú está o no desplegado
	var menu_desplegado = false;

	//variable que indica qué vista está desplegada (lienzo, formulario o video)
	var vista_visible = 'lienzo';

	//Recordar que esta función se ejecutará cuando el mouse este encima y tambien cuando el mouse deje
	//de estarlo
	$('.contenedor-poligono').hover(function(){

		//Al pasar el mouse por encima de un polígono identificamos cual es (1,2,3, o 4)
		var poligono = $(this).attr('contenedor');

		//Si los botones no están desplegados:
		if (boton_desplegado===false){

			//se desplegarán
			$("a[boton-poligono='"+poligono+"']").fadeIn(400);

			//y se indicará que hay botones desplegados
			boton_desplegado = $(this).attr('contenedor');

		}else{//si los botones están desplegados:

			//se ocultarán apenas el mouse deje de estar encima del polígono
			$("a[boton-poligono='"+poligono+"']").fadeOut(400);

			//si hay un link ver demo desplegado:
			if(contenido_desplegado!=false){
			
				//se ocultará al quitar el mouse de encima del polígono
				$("g[contenido='"+contenido_desplegado+"']").fadeOut(400);
				contenido_desplegado = false;
			}

			//Se indicará que no hay botones desplegados
			boton_desplegado = false;
		}
	});

	//Al dar clic en un botón:
	$('.boton-hidden').click(function(){

		//identificamos cual fué (se obtiene un numero del 1 al 8)
		var boton = $(this).attr('boton');

		//se obtiene el elemento que contiene el link
		var contenido = $("#contenido-"+boton);

		//si dicho elemento está oculto:
		if(contenido.css('display')=='none'){

			//se desplegará en 0.4 segundos
			contenido.fadeIn(400);

			//se pregunta si hay un contenido ya desplegado.
			//En caso de que si lo haya:
			if(contenido_desplegado!==false){
				//Se desvanece
				$("#contenido-"+contenido_desplegado).fadeOut(400);
			}
			
			//y se guardará el numero del contenido visible
			contenido_desplegado = contenido.attr('contenido');

		}else{//si dicho elemento está visible:

			//se ocultará en 0.4 segundos
			contenido.fadeOut(400);

			//y se indica que no hay ningun link desplegado
			contenido_desplegado = false;
		}
	});

	//Al pasar el mouse por encima del logo menú
	$('#menu').hover(function(){

		//Se obtiene el elemento que guarda las opciones
		var opciones_menu = $('#opciones-menu');

		//si dicho elemento está visible:
		if(menu_desplegado){
			//se ocultará
			opciones_menu.fadeOut(400);
			menu_desplegado = false;

		}else{//Si dicho elemento está oculto

			//Se hará aparecer
			opciones_menu.fadeIn(400);
			menu_desplegado = true;
		}
	});
	var mivideo = document.getElementById('video');

	mivideo.onended = function(){//Cuando el video termine
		//Se desaparecerá el contenedor del video en 1 segundo
		$('#contenedor-video').fadeOut(1000,function(){

			//y al terminar de desaparecer el video será eliminado del reproductor
			$(mivideo).attr('src','');

			//y se desplegará el lienzo
			setTimeout(function(){

				$('#lienzo').fadeIn(600);
				vista_visible = 'lienzo';
			},500);
		});

	}
	function mostrar_vista(obj_destino){

		var destino = obj_destino.attr('destino');
		if(destino == 'contenedor-video'){
			$(mivideo).attr('src',obj_destino.attr('video')+'.mp4');
			mivideo.play();
			
		}
		$('#'+vista_visible).fadeOut(1000,function(){
			if(vista_visible=='contenedor-video'){

				$(mivideo).attr('src','');
			}
			setTimeout(function(){
				$('#'+destino).fadeIn(600);
				vista_visible = destino;

			},500);
		});
	}
	$('.cambiar-vista').click(function(){
		var destino=$(this);
		if(destino.attr('destino')!=vista_visible){

			mostrar_vista(destino);
		}

	});
	$('.demo').click(function(){
		var demo =$(this);
		demo.fadeOut(400,function(){
			setTimeout(function(){

				$('a[boton-poligono="'+boton_desplegado+'"]').fadeOut(400,function(){
					setTimeout(function(){
						mostrar_vista(demo);
					},500);
				});
			},500);
		});
	});


})