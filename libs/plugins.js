// Инструкция по применению:

// 1. Добавьте разметку:
// 	<div id="accordion">
// 		<h2>Heading 1 - при клике откроется контент!</h2>
// 		<div class="contentOf">
// 			Ваш контент размещается здесь!
// 		</div>
// 		<h2>Heading 2 - при клике откроется контент!</h2>
// 		<div class="contentOf">
// 			Ваш контент размещается здесь!
// 		</div>
// 		<h2>Heading 3 - при клике откроется контент!</h2>
// 		<div class="contentOf">
// 			Ваш контент размещается здесь!
// 		</div> 		
// 	</div>

// 2. Добавьте стили по своему усмотрению

// 3.Добавьте скрипт(указав свои настройки):
			// $('#accordion').accordionCool({
			//    	closeRest: false, 
			//    	fade: false, 
			//    	speed: 1000
		 //   });

(function($){

    jQuery.fn.accordionCool = function(options){ 

    	var settings = $.extend({
            // These are the defaults.
            closeRest: false,
            fade:false,
            speed:400
        }, options );   	
	    //  реализация метода
	    var buttons = this.find("h2");	

	    
	    buttons.each( function(){
	    	var content = $(this).next();

	    	$(".contentOf").css("display", "none");
	    	$(this).on('click', function(){
	    		// при открытии одного остальные закрываются
	    		$(".contentOf").removeClass("activeContent");
	    		content.addClass("activeContent")
	    		if(settings.closeRest === true){	
	    			// fade effect condition  
	    			if(settings.fade === true){
		    			$("#accordion > div:not(.activeContent)").fadeOut(settings.speed);	    			
		    		} else {
		    			$("#accordion > div:not(.activeContent)").slideUp(settings.speed); 
		    			// slideUp by default	    			
		    		}  		    				    			
	    		}; 

	    		// fade effect condition for content after clicked button
	    		if(settings.fade === true){
	    			$(content).fadeToggle(settings.speed);	    			
	    		} else {
	    			$(content).slideToggle(settings.speed); // slideToggle by default	    			
	    		}	    			    		
	    	});

		}); // each() ends
	}; // accordion() ends	

})(jQuery);

// Переменная this, в теле метода, всегда содержит текущий объект jQuery 
// (тот, на котором и был вызван метод). Для того, чтобы обойти все выбранные элементы
//  по отдельности, используем метод .each(). А для возможности продолжить цепочку методов
//   наш метод должен будет возвратить текущий объект jQuery 

(function($){

	jQuery.fn.carouselCool = function(options){

		var settings = $.extend({
            // These are the defaults.           
            fade:false,
            speed:400
        }, options );   

		var slides = $(".slide");
		var dots = $(".circle");		
		var current = 0;
		
		
		$(slides[current]).addClass("visibleSlide");
		$(dots[current]).addClass("dotChosen");

		function changeSlide(param){
			if(settings.fade === true){
				$(slides[current]).animate({opacity:'0'}, settings.speed);
			} else {
				$(slides[current]).removeClass("visibleSlide");
			};
			
			$(dots[current]).removeClass("dotChosen");
				if( parseInt(param) === 1 && current === (slides.length - 1)){
					current = 0;				
				} else if(parseInt(param) !== 1 && current === 0){
					current = slides.length - 1;				
				} else {
					current +=	parseInt(param);
				};

			if(settings.fade === true){
				$(slides[current]).animate({opacity:'1'}, settings.speed);
			} else {
				$(slides[current]).addClass("visibleSlide");
			};			
			$(dots[current]).addClass("dotChosen");					
		};

		function changeCircle(circleIndex){

			if(settings.fade === true){
				$(slides[current]).animate({opacity:'0'}, settings.speed);
			} else {
				$(slides[current]).removeClass("visibleSlide");
			}; 
			$(dots[current]).removeClass("dotChosen"); 
			current = circleIndex; 

			if(settings.fade === true){
				$(slides[current]).animate({opacity:'1'}, settings.speed);
			} else {
				$(slides[current]).addClass("visibleSlide");
			};	
			$(dots[circleIndex]).addClass("dotChosen");
		};

		$(".switchSlide").on('click', function(){
			var param = $(this).attr("data-param"); // 1 or -1			
			changeSlide(param);			
		});
		$(".circle").on('click', function(){
			var circleIndex = $(this).index(".circle");	// index of circle in collection						
			changeCircle(circleIndex);
		});
	};

})( jQuery );