var topButClass = document.getElementsByClassName('top_but');
var address = ''
//--------------------------------contact map-----------------------------------------------
function initMap() {
    var map = new google.maps.Map(document.getElementById('map'), {
        center: { lat: 49.283387, lng: -123.115097 },
        zoom: 15
    });
    var messagebox = new google.maps.InfoWindow({ map: map });

    var marker = new google.maps.Marker({
          position: { lat: 49.283387, lng: -123.115097 },
          map: map,
          title: '2K!'
        });


    if (navigator.geolocation) {
        navigator.geolocation.getCurrentPosition(function(position) {
            var pos = {
                lat: position.coords.latitude,
                lng: position.coords.longitude
            };
        }, ()=> {
            handleLocationError(true, messagebox, map.getCenter());
        });
    } else {
        handleLocationError(false, messagebox, map.getCenter());
    }
}

// ------------------------------functions-------------------------------------------------
function address_no_empty(){
	if(document.getElementById("address_input").value == ''){
		alert("Please enter address");
		return false;
	}else if(document.getElementById("city_input").value == ''){
		alert("Please enter city");
		return false;
	}else if(document.getElementById("zip_input").value == ''){
		alert("Please enter Postal Code");
		return false;
	}else{
		return true;
	}
}

function address_check(validity){
	var xmlhttp = new XMLHttpRequest();
	xmlhttp.open("POST", "/address_check", true);
	xmlhttp.setRequestHeader('Content-type', "application/x-www-form-urlencoded");
	xmlhttp.onreadystatechange = () => {
		if (xmlhttp.readyState == 4 && xmlhttp.status == 200){
			if(xmlhttp.responseText == "invalid"){
				alert("invalid address.\nPlesae enter again");
			}
			else if(xmlhttp.responseText == "valid"){
				alert('Found the matching address!');
				location.reload();
			}else if(xmlhttp.responseText == "reload"){
				location.reload();
			}
		}
	}
	xmlhttp.send(`address=${address}&validity=${validity}`);
}

// ------------------------------interaction-------------------------------------------------
for (var ind = 0; ind < topButClass.length; ind++){
	document.getElementById(topButClass[ind].id).addEventListener('click',(ev)=>{
		document.getElementById('contact_display').style.display = 'none'
		document.getElementById('about_display').style.display = 'none'
		document.getElementById('main_display').style.display = 'none'
		document.getElementById(ev.target.id + '_display').style.display='block';
	});
};

document.getElementById("address_submit").addEventListener("click",()=>{
	address = String(document.getElementById('address_input').value) +', '+ String(document.getElementById('city_input').value) +', '+ 'BC' + ', CA'
	if(address_no_empty()){
		address_check(1);
	}
});

// fix this
document.getElementById("address_input").addEventListener('keydown',(ev)=>{
	if(ev.keyCode == 13 && address_no_empty()){
		address_check(1);
	}
});
document.getElementById('login_submit').addEventListener('click',()=>{
	window.location ='/signin';
});

document.getElementById('re_address').addEventListener('click',()=>{
	address_check(0);
});
document.getElementById('next_submit').addEventListener('click',()=>{
	window.location="/location";
})

