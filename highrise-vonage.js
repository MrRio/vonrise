
var contact_numbers = document.querySelectorAll('.contact_methods td');
var i = 0;
for(var el in contact_numbers) {
	i ++;
	var contact = contact_numbers[el].innerHTML;
	if(contact != undefined) {
		var parts = contact_numbers[el].innerHTML.split(/<span/);
		var number = parts[0].replace(/^\s+|\s+$/, '').replace('+', '00');
		if(number.indexOf('href') == -1) {
			var phone_icon = ' <a href="#" data-number="' + number + '" id="vonage_hook_' + i + '" style="background-color: transparent"><img src="' + chrome.extension.getURL("phone.png") + '" /></a>';
			contact_numbers[el].innerHTML = number + phone_icon + '<span' + parts[1];
			document.getElementById('vonage_hook_' + i).addEventListener("click", function(e) {
				var number = e.srcElement.parentElement.getAttribute('data-number');
				chrome.extension.sendRequest({'action': 'getSettings'}, function(settings) {					
					if(confirm('Are you sure you wish to call ' + number + '?')) {						
						// Get from numbers
						var url = 'https://secure.click2callu.com/tpcc/getnumbers?username='  + settings.username + '&password=' + settings.password;
						chrome.extension.sendRequest({'action' : 'doAjaxRequest', 'url' : url}, function(data) {
							var from_numbers = data.split(/,/);
							var url = 'https://secure.click2callu.com/tpcc/makecall?username=' + settings.username + '&password=' + settings.password + '&fromnumber=' + from_numbers[0] + '&tonumber=' + number;
							//console.log(url);
							chrome.extension.sendRequest({'action' : 'doAjaxRequest', 'url' : url}, function(data) {
								// Callback
								console.log(data);
								if(data == '100:Authentication Failed') {
									alert('Vonrise\n\nSorry, your username and password for Vonage was incorrect. Please check your settings.')
								}
							});								
							
						});
							
					};
					
			
				});
			});
		}
	}
}

