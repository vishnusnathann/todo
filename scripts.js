//<-- ===============jquery ===============----->

		$(document).ready(function(){
			if(localStorage.getItem('todoList'))
			 	// Getting list from local storage
				var listContents=JSON.parse(localStorage.getItem('todoList'));
			else
				var listContents=[];
			
			if(listContents.length!=0){
				$.each(listContents, function(index, value){
					var listid=index;
					console.log(value.completed,listid);
					if(value.completed==false)
					{	
						
						$('#thelist').append('<li class="li_notcompleted" id=' + listid + ' >' + '<input type="checkbox"> '+value.value + '\t'+'<button type="button" class="delete btn btn-danger btn-xs ">Delete</button>'+'</li>'); //adding list item
					}
					else{
						$('#thelist').append('<li class="li_completed strike" id=' + listid + ' >' + '<input type="checkbox" checked> '+value.value + '\t'+'<button type="button" class="delete btn btn-danger btn-xs ">Delete</button>'+'</li>'); //adding list item
	
					}
		
				});
			}
		

			$("#add").click(function(event)
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
					
					var item={
						completed: false,
						value: data
					}
					listContents.push(item);
					var listid=listContents.length-1;
					// Adding item to list
					$('#thelist').append('<li class="li_notcompleted" id=' + listid + ' >' + '<input type="checkbox"> '+data + '\t'+'<button type="button" class="delete btn btn-danger btn-xs ">Delete</button>'+'</li>'); //adding list item
					$("#err").fadeOut('slow');
					localStorage.setItem('todoList', JSON.stringify(listContents));
					
				
				}
			});

			$(document).on("click", "input:checkbox", function(){ // for marking completed list item 
				
				var listid = $(this).parent().attr( 'id' );
				
				if($(this).prop("checked") == true){
					
					if($(this).parent().hasClass("strike")){
						$(this).parent().removeClass("strike");
						$(this).parent().removeClass("li_completed");
						$(this).parent().addClass("li_notcompleted");
						listContents[listid].completed=true;
						localStorage.setItem('todoList', JSON.stringify(listContents));
					}
					else{
						$(this).parent().addClass("strike");
						$(this).parent().addClass("li_completed");
						$(this).parent().removeClass("li_notcompleted");
						listContents[listid].completed=true;
						localStorage.setItem('todoList', JSON.stringify(listContents));
					}
				}
					else {
						
						$(this).parent().removeClass("strike");
						$(this).parent().removeClass("li_completed");
						$(this).parent().addClass("li_notcompleted");
						listContents[listid].completed=false;
						localStorage.setItem('todoList', JSON.stringify(listContents));
					
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
				var listid = $(this).parent().attr( 'id' )
				// Removing item from list
				listContents.splice(listid,1); 
				$(this).parent().remove();
				localStorage.setItem('todoList', JSON.stringify(listContents));
			});
			
		});
