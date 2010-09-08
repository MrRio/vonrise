
var contact_numbers = document.querySelectorAll('.contact_methods td');
var i = 0;
for(var el in contact_numbers) {
	i ++;
	var contact = contact_numbers[el].innerHTML;
	if(contact != undefined) {
		var parts = contact_numbers[el].innerHTML.split(/<span/);
		var number = parts[0].replace(/^\s+|\s+$/, '');
		if(number.indexOf('href') == -1) {
			var phone_icon = ' <a href="#" data-number="' + number + '" id="vonage_hook_' + i + '" style="background-color: transparent"><img src="chrome-extension://lgjnmiemnghmdpkhkfdgmcablokenkph/phone.png" /></a>';
			contact_numbers[el].innerHTML = number + phone_icon + '<span' + parts[1];
			document.getElementById('vonage_hook_' + i).addEventListener("click", function(e) {
				var number = e.srcElement.parentElement.getAttribute('data-number');
				if(confirm('Are you sure you wish to call ' + number + '?')) {

					
					chrome.extension.sendRequest({'action': 'getSettings'}, function(settings) {
						var url = 'https://secure.click2callu.com/tpcc/makecall?username= ' + settings.username + '&password=' + settings.password + '&fromnumber=441904236363&tonumber=' + number;
						console.log(url);
						chrome.extension.sendRequest({'action' : 'doAjaxRequest', 'url' : url}, function(data) {
							// Callback
						});		
					});
					
			
				}
			});
		}
	}
}

