/*-----------------------------------------------------------------------------------
/* Styles Switcher
-----------------------------------------------------------------------------------*/

jQuery(document).ready(function($) {

		$("#style-switcher h2 a").on("click", toggleStyleSwitcher);
		function toggleStyleSwitcher(e){
		
			e.preventDefault();
			var div = $("#style-switcher");

			if (div.css("right") === "-186px") {
				$("#style-switcher").animate({
					right: "0px"
				});
			} else {
				$("#style-switcher").animate({
					right: "-186px"
				});
			}
		}


		$("body").addClass('preset-on');


});


