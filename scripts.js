//<-- ===============jquery ===============----->

		$(document).ready(function(){
			var count=0; // for countig active lists
			$("#add").click(function()
			{	

				$('#ipget').focus(function() { // onfocus clearing of input field
					$(this).val("");
				});

				var data=$("#ipget").val();
				if(data=="")// checking input feild is empty
				{
					$("#err").text("Please enter some value").css("color","#f00");
					

				}
				else{
					count++;
					$('ul').append('<li class="li_notcompleted">' + '<input type="checkbox"> '+data + '\t'+'<button type="button" class="delete btn btn-danger btn-xs ">Delete</button>'+'</li>'); //adding list item
					$("#err").fadeOut('slow');
					$("#count").text(count);
				}
			});

			$(document).on("click", "input:checkbox", function(){ // for marking completed list item 

				if($(this).prop("checked") == true){
					count--;
					$("#count").text(count);// showing active list item count
					$(this).parent().addClass("strike");
					$(this).parent().addClass("li_completed");
					$(this).parent().removeClass("li_notcompleted");
					
				}
				else if($(this).prop("checked") == false){
					count++;
					$("#count").text(count);// showing active list item count
					$(this).parent().removeClass("strike");
					$(this).parent().removeClass("li_completed");
					$(this).parent().addClass("li_notcompleted");

				}
			});
			$("#all").click(function(){// for showing all list

				$("li").show(500);
			});
			$("#completed").click(function(){// for showing completed list

				$("li.li_notcompleted").hide(500);
				$("li.li_completed").show(500);
			});
			$("#active").click(function(){ // for showing active list

				$("li.li_completed").hide(500);
				$("li.li_notcompleted").show(500);
			});
			
			$(document).on("click", ".delete", function(){ // for deleting a list element
				
				$(this).parent().hide(500);
				if($(this).parent().hasClass("li_notcompleted")) // TO reduce active list count if it is not completed
				{
					count--;
					$("#count").text(count);// showing active list item count
				}
				
				$(this).parent().remove();
			});
			$("#count").text(count);// showing active list item count
		});
