		var monthNames = new Array("Jan", "Feb", "Mar",
		"Apr", "May", "Jun", "Jul", "Aug", "Sep",
		"Oct", "Nov", "Dec");


function getEverythingDropDownData(filterString)
{
	var res = "";
	filterString = escape(filterString);

	$.ajax({
		url: "http://www.castlewalls.com/auths/mid/dropdown.php",
		type: 'GET',
		contentType: "application/json",
		dataType: "json",
		data: {s: filterString},
		success: function (result) {
            var rows = 0;

			$.each(result, function(idx, obj) {
				//alert(obj.login);
				//res = res + "<div class=''>" + obj.name + " " + obj.type + "</div>"
				var icon = "";
				var onClick = "";

				if (obj.type == "0") {
					icon = "personicon";
					onClick = "onClick=loadPersonFromURL('" + obj.id +"')";
				}

				if (obj.type == "1") {
					icon = "shireicon";
					onClick = "onClick=loadListFromURL('" + obj.id +"')";
				}

				if (obj.type == "2") {
					icon = "baronyicon";
					onClick = "onClick=loadRegionFromURL('" + obj.id +"')";
				}

				res = res + "<div class='locitem' "+ onClick +"><div class='" + icon + "'></div>" + unescape(obj.name) + "</div>";
				rows++;
			});

			if (rows == 0 && $.inEditMode) { 
                res = "<div class='locitem' onClick=addPerson('0')><div class='addpersonicon'></div>- Add New User -</div>" 
            }
            
			$("#everythingdropdown").html(res);
		},
		error: function (jqXHR, textStatus, errorThrown) {
			alert('generate drop down: ' + errorThrown);
		}
	});

	return res;
}

function buildPersonHeader(personId)
{
	var res = "";

	$.ajax({
		url: "http://www.castlewalls.com/auths/mid/personheader.php",
		type: 'GET',
		contentType: "application/json",
		dataType: "json",
		data: {pId: personId},
		success: function (result) {


		$.each(result, function(idx, obj) {

		var fname = ""
		var lname = ""
		var space = obj.first_SCA.indexOf('%20');

		//alert('buildPersionHead:' +  obj.first_SCA + '|' + obj.last_SCA);

		//last name was null in DB
		if (obj.last_SCA == "")
		{
			if (space == -1)
			{
				fname = obj.first_SCA.substring(obj.first_SCA.indexOf(' '));
			} else {
				fname = obj.first_SCA.substring(0, obj.first_SCA.indexOf(' '));
				lname = obj.first_SCA.substring(obj.first_SCA.indexOf(' '));
			}

		} else {
			fname = obj.first_SCA;
			lname = obj.last_SCA;
		}

		//alert('buildPersionHead:' +  fname + '|' + lname);

		//basic card info.
		$("#cardscaname").text(unescape(fname) + " " + unescape(lname));
		$("#cardlegalname").text(obj.first_legal + " " + obj.last_legal);

		res = "<div id='innerpersoncard' class='personcard' pid='"+personId+"'><div id='namebox'><div id='personicon'></div><div id='name'>"
if (personId == 5259) res = res + "<div id='vanity'>Conquerer of the land of Sheep and deflower-er of many petals</div>"    
        res = res + "<div id='firstnamedesc' class='smallnametext'>SCA first name only, please do not enter titles</div><div id='firstname'>" + unescape(fname) + "</div><div id='lastnamedesc' class='smallnametext'>SCA middle & last name or anything after the first name</div><div id='lastname'>" + unescape(lname) + "</div></div></div>";
		res = res + "<div id='groupbox' class='groupbox'><div id='locationicon'></div><div id='groupname'><div id='locationname' class='locname' branchid='" + obj.group_id +"' >" + obj.branch + "</div><div id='region'>" + obj.region + "</div><div id='locationdropdown' style='display:none;'></div></div></div>";

		if(!$.inEditMode){ res = res + "<div id='printericon' onClick='generateCard()'></div>"; }

		if($.inEditMode == true){
			res = res + "<div id='editicon' onClick='expandPersonalData(false);'></div>";
		}
		res = res + "<div id='hiddenperson' style='display: none;'>";
		res = res + "<div id='personalinfobox'>";
		res = res + "<div class='infoheader' >Legal First Name</div>";
		res = res + "<input id='legalfirst' class='textinputbar' value='" + obj.first_legal + "' onKeyUp='delay(function(){updatePerson();}, 1500 );' />";
		res = res + "<div class='infoheader'>Legal Last Name</div>";
		res = res + "<input id='legallast' class='textinputbar' value='" + obj.last_legal + "' onKeyUp='delay(function(){updatePerson();}, 1500 );' />";
		res = res + "<div class='infoheader' >Member Number</div>";
		res = res + "<input id='membernumber' class='textinputbar' value='" + obj.member_number + "' onKeyUp='delay(function(){updatePerson();}, 1500 );' />";
		res = res + "<div class='infoheader'>Birthday</div>";
		res = res + "<input id='bod' class='textinputbar' value='" + obj.birthdate + "' onKeyUp='delay(function(){updatePerson();}, 1500 );' />";
		res = res + "<div class='infoheader'>Phone Number</div>";
		res = res + "<input id='phonenum' class='textinputbar' value='"+ obj.phone +"' onKeyUp='delay(function(){updatePerson();}, 1500 );' />";
		res = res + "<div class='infoheader'>Email Address</div>";
		res = res + "<input id='email' class='textinputbar' value='"+obj.email+"' onKeyUp='delay(function(){updatePerson();}, 1500 );' />";
		if($.inEditMode == true){
			res = res + "<div class='infoheader'>Password</div>";
			res = res + "<input id='hpassword' class='textinputbar' type='password' value=''/>";        
			res = res + "<div id='personnoteiconadd' onClick='addPersonNote();'></div>";    
        }
		res = res + "</div>";
		res = res + "<div id='addressinfobox'>";
		res = res + "<div class='infoheader'>Street Address 1</div>";
		res = res + "<input id='address1' class='textinputbar' value='"+obj.address1+"' onKeyUp='delay(function(){updatePerson();}, 1500 );' />";
		res = res + "<div class='infoheader'>Street Address 2</div>";
		res = res + "<input id='address2' class='textinputbar' value='"+obj.address2+"' onKeyUp='delay(function(){updatePerson();}, 1500 );' />";
		res = res + "<div class='infoheader'>City</div>";
		res = res + "<input id='city' class='textinputbar' value='"+obj.city+"' onKeyUp='delay(function(){updatePerson();}, 1500 );' />";
		res = res + "<div class='infoheader'>State</div>";
		res = res + "<input id='state' class='textinputbar' value='"+obj.state+"' onKeyUp='delay(function(){updatePerson();}, 1500 );' />";
		res = res + "<div class='infoheader'>Zip Code</div>";
		res = res + "<input id='zip' class='textinputbar' value='"+obj.zip+"' onKeyUp='delay(function(){updatePerson();}, 1500 );' />";
		res = res + "<div class='infoheader'>Blue Card Exp Date</div>";
		res = res + "<input id='pie' class='textinputbar' value='"+obj.pie+"' onKeyUp='delay(function(){updatePerson();}, 1500 );' />";

		if($.inEditMode == true){
			res = res + "<div class='infoheader'>Confirm Password</div>";
			res = res + "<input id='hconfirmpassword' class='textinputbar' type='password' value='' onKeyUp='delay(function(){updatePerson();}, 1500 );' />";
			res = res + "<div id='trashicon' onClick='removePerson();'></div>";
			res = res + "</div>";
		}
		res = res + "</div> <!-- end personalinfobox -->";
		res = res + "</div>";

		});

		$("#personcard").html(res);
		},
		error: function (jqXHR, textStatus, errorThrown) {
			//alert("Error in buildPersonHeader: " + errorThrown);
		}
	});

    //getPersonNote(personId);
	return res;
}

function addPerson()
{
    var newUserFirstName = escape($("#searchbox").val())
    var newUserLastName = "";
    
    if (newUserFirstName.indexOf('%20') > -1){
        newUserFirstName = newUserFirstName.substring(0, newUserFirstName.indexOf('%20'));
        newUserLastName = escape($("#searchbox").val())
        newUserLastName = newUserLastName.substring(newUserLastName.indexOf('%20')+3, newUserLastName.length);
    }
    
	$.ajax({
		url: "http://www.castlewalls.com/auths/mid/addremoveperson.php",
		type: 'GET',
		contentType: "application/json",
		dataType: "json",
		data: {pId: 0, scaName: newUserFirstName, scaLast: newUserLastName, aFn:1},
		success: function (result) {
			var newid = result;
			loadPersonFromURL(newid);
		},
		error: function (jqXHR, textStatus, errorThrown) {
			alert("Error addPerson:" + errorThrown);
		}
	});

}

function removePerson()
{
	var personId = $('#innerpersoncard').attr('pid');

	$.ajax({
		url: "http://www.castlewalls.com/auths/mid/addremoveperson.php",
		type: 'GET',
		contentType: "application/json",
		dataType: "json",
		data: {pId: $('#innerpersoncard').attr('pid'), scaName: $("#searchbox").val(), aFn:0},
		success: function (result) {
			loadPersonFromURL(-1);
		},
		error: function (jqXHR, textStatus, errorThrown) {
			alert("Error removePerson:" + errorThrown + " " + personId);
		}
	});

}

function clearAuthTypesForReload()
{
						$("#cardssh").addClass("op5");
                        $("#cardtw").addClass("op5");  
                        $("#cardgs").addClass("op5");
                        $("#cardsp").addClass("op5");
                        $("#cardpa").addClass("op5");
                        $("#cardysp").addClass("op5");
                        $("#cardca").addClass("op5");
                        $("#cardsc").addClass("op5");
                        $("#cardse").addClass("op5");
                        $("#cardsr").addClass("op5");
                        $("#cardda").addClass("op5");
                        $("#cardpd").addClass("op5");
                        $("#cardcs").addClass("op5");
                        $("#cardls").addClass("op5");
                        $("#cardep").addClass("op5");
                        
                        $("#cardcut").addClass("op5");
                        $("#cardcutda").addClass("op5");
                        $("#cardcutpa").addClass("op5");
                        $("#cardcutca").addClass("op5");
                        
                        $("#carddiv1").addClass("op5");
                        $("#carddiv1rp").addClass("op5");
                        $("#carddiv2").addClass("op5");
                        $("#carddiv22h").addClass("op5");
                        $("#carddiv2rp").addClass("op5");
                        $("#carddiv3").addClass("op5");
                        $("#carddiv32h").addClass("op5");
                        $("#carddiv3rp").addClass("op5");
                        
                        $("#cardgr").addClass("op5");
                        $("#cardmg").addClass("op5");
                        $("#cardma").addClass("op5");
                        $("#carddr").addClass("op5");
                        $("#cardcc").addClass("op5");
                        $("#cardmc").addClass("op5");
                        $("#cardjs").addClass("op5");
                        $("#cardmar").addClass("op5");
                        $("#cardcae").addClass("op5");
                        $("#cardmrp").addClass("op5");
                        $("#cardmac").addClass("op5");
                        $("#cardmeq").addClass("op5");
                        $("#cardmse").addClass("op5");
                        $("#cardmtw").addClass("op5");
                        $("#cardmyo").addClass("op5");
                        $("#cardmct").addClass("op5");
                            
}


function buildPersonAuths(personId)
{
    if ($.inEditMode)
	{
		buildPersonAuthsEdit(personId);
        //buildPersonNote();
		return
	}
        
	var res = "";
	var resArmored = "";
	var resRapier = "";
    var resCant = ""; 
	var resEq = ""
	var resYouth = "";
	var resMarshal = "";

	var marshaldate = new Date(1900, 1, 1);
	var armoreddate = new Date(1900, 1, 1);
	var rapierdate = new Date(1900, 1, 1);
    var cantdate = new Date(1900, 1, 1);
	var youthdate = new Date(1900, 1, 1);
	var eqdate = new Date(1900, 1, 1);
	var tempDate = new Date(1900, 1, 1);
	var today = new Date();

	$.ajax({
		url: "http://www.castlewalls.com/auths/mid/personauths.php",
		type: 'GET',
		contentType: "application/json",
		dataType: "json",
		data: {pId: personId},
		success: function (result) {


		$.each(result, function(idx, obj) {

				switch(obj.type_id) {

					case '1': //Sword & Shield
						if (obj.expire_date != null){
							tempDate = new Date(obj.expire_date);
							if (tempDate > armoreddate) armoreddate = tempDate;
						}
						resArmored = resArmored + "<div id='ssh' class='auth'><div class='authtext'>" + obj.type + "</div></div>";
						$("#cardssh").removeClass("op5");
						break;
					case '2': //Two Weapon
						if (obj.expire_date != null){
							tempDate = new Date(obj.expire_date);
							if (tempDate > armoreddate) armoreddate = tempDate;
						}
						resArmored = resArmored + "<div id='tw' class='auth'><div class='authtext'>" + obj.type + "</div></div>";
						$("#cardtw").removeClass("op5");
						break;
					case '3': //Great Sword
						if (obj.expire_date != null){
							tempDate = new Date(obj.expire_date);
							if (tempDate > armoreddate) armoreddate = tempDate;
						}
						resArmored = resArmored + "<div id='gs' class='auth'><div class='authtext'>" + obj.type + "</div></div>";
						$("#cardgs").removeClass("op5");
						break;
					case '4': //Spear
						if (obj.expire_date != null){
							tempDate = new Date(obj.expire_date);
							if (tempDate > armoreddate) armoreddate = tempDate;
						}
						resArmored = resArmored + "<div id='sp' class='auth'><div class='authtext'>" + obj.type + "</div></div>";
						$("#cardsp").removeClass("op5");
						break;
					case '5': //Pole Arm
						if (obj.expire_date != null){
							tempDate = new Date(obj.expire_date);
							if (tempDate > armoreddate) armoreddate = tempDate;
						}
						resArmored = resArmored + "<div id='pa' class='auth'><div class='authtext'>" + obj.type + "</div></div>";
						$("#cardpa").removeClass("op5");
						break;
					case '6': //Youth Sparing
						if (obj.expire_date != null){
							tempDate = new Date(obj.expire_date);
							if (tempDate > armoreddate) armoreddate = tempDate;
						}
						resArmored = resArmored + "<div id='ysp' class='auth'><div class='authtext'>" + obj.type + "</div></div>";
						$("#cardysp").removeClass("op5");
						break;
					case '9': //Combat Archery
						if (obj.expire_date != null){
							tempDate = new Date(obj.expire_date);
							if (tempDate > armoreddate) armoreddate = tempDate;
						}
						resArmored = resArmored + "<div id='ca' class='auth'><div class='authtext'>" + obj.type + "</div></div>";
						$("#cardca").removeClass("op5");
						break;
					case '10': //Siege Crew
						if (obj.expire_date != null){
							tempDate = new Date(obj.expire_date);
							if (tempDate > armoreddate) armoreddate = tempDate;
						}
						resArmored = resArmored + "<div id='sc' class='auth'><div class='authtext'>" + obj.type + "</div></div>";
						$("#cardsc").removeClass("op5");
						break;
					case '11': //Siege Engine
						if (obj.expire_date != null){
							tempDate = new Date(obj.expire_date);
							if (tempDate > armoreddate) armoreddate = tempDate;
						}
						resArmored = resArmored + "<div id='se' class='auth'><div class='authtext'>" + obj.type + "</div></div>";
						$("#cardse").removeClass("op5");
						break;
					case '12': //Single Rapier
						if (obj.expire_date != null){
							tempDate = new Date(obj.expire_date);
							if (tempDate > rapierdate) rapierdate = tempDate;
						}
						resRapier = resRapier + "<div id='sr' class='auth'><div class='authtext'>" + obj.type + "</div></div>";
						$("#cardsr").removeClass("op5");
						break;
					case '16': //Dagger
						if (obj.expire_date != null){
							tempDate = new Date(obj.expire_date);
							if (tempDate > rapierdate) rapierdate = tempDate;
						}
						resRapier = resRapier + "<div id='da' class='auth'><div class='authtext'>" + obj.type + "</div></div>";
						$("#cardda").removeClass("op5");
						break;
					case '15': //defensive object
						if (obj.expire_date != null){
							tempDate = new Date(obj.expire_date);
							if (tempDate > rapierdate) rapierdate = tempDate;
						}
						resRapier = resRapier + "<div id='pd' class='auth'><div class='authtext'>" + obj.type + "</div></div>";
						$("#cardpd").removeClass("op5");
						break;
					case '17': //Case
						if (obj.expire_date != null){
							tempDate = new Date(obj.expire_date);
							if (tempDate > rapierdate) rapierdate = tempDate;
						}
						resRapier = resRapier + "<div id='cs' class='auth'><div class='authtext'>" + obj.type + "</div></div>";
						$("#cardcs").removeClass("op5");
						break;
					case '18': //Long Sword
						if (obj.expire_date != null){
							tempDate = new Date(obj.expire_date);
							if (tempDate > rapierdate) rapierdate = tempDate;
						}
						resRapier = resRapier + "<div id='ls' class='auth'><div class='authtext'>" + obj.type + "</div></div>";
						$("#cardls").removeClass("op5");
						break;
					case '19': //Epee
						if (obj.expire_date != null){
							tempDate = new Date(obj.expire_date);
							if (tempDate > rapierdate) rapierdate = tempDate;
						}
						resRapier = resRapier + "<div id='ep' class='auth'><div class='authtext'>" + obj.type + "</div></div>";
						$("#cardep").removeClass("op5");
						break;
                        
        //--- Cut and thrust -----------------------------------------------------------                
					case '20': //Cut & Thrust - Sword
						if (obj.expire_date != null){
							tempDate = new Date(obj.expire_date);
							if (tempDate > cantdate) cantdate = tempDate;
						}
						resCant = resCant + "<div id='cut' class='auth'><div class='authtext'>" + obj.type + "</div></div>";
						$("#cardcut").removeClass("op5");
						break;
					case '21': //Cut & Thrust - Dagger
						if (obj.expire_date != null){
							tempDate = new Date(obj.expire_date);
							if (tempDate > cantdate) cantdate = tempDate;
						}
						resCant = resCant + "<div id='cutda' class='auth'><div class='authtext'>" + obj.type + "</div></div>";
						$("#cardcutda").removeClass("op5");
						break;
                        
					case '49': //Cut & Thrust - parry
						if (obj.expire_date != null){
							tempDate = new Date(obj.expire_date);
							if (tempDate > cantdate) cantdate = tempDate;
						}
						resCant = resCant + "<div id='cutpa' class='auth'><div class='authtext'>" + obj.type + "</div></div>";
						$("#cardcutpa").removeClass("op5");
						break;
                        
					case '50': //Cut & Thrust - case
						if (obj.expire_date != null){
							tempDate = new Date(obj.expire_date);
							if (tempDate > cantdate) cantdate = tempDate;
						}
						resCant = resCant + "<div id='cutca' class='auth'><div class='authtext'>" + obj.type + "</div></div>";
						$("#cardcutca").removeClass("op5");
						break;                        
                        
        //--- Youth -----------------------------------------------------------   
                        
					case '22': //Div I weapon & shield
						if (obj.expire_date != null){
							tempDate = new Date(obj.expire_date);
							if (tempDate > youthdate) youthdate = tempDate;
						}
						resYouth = resYouth + "<div id='div1' class='auth'><div class='authtext'>" + obj.type + "</div></div>";
						$("#carddiv1").removeClass("op5");
						break;
					case '23': //Div I rapier
						if (obj.expire_date != null){
							tempDate = new Date(obj.expire_date);
							if (tempDate > youthdate) youthdate = tempDate;
						}
						resYouth = resYouth + "<div id='div1rp' class='auth'><div class='authtext'>" + obj.type + "</div></div>";
						$("#carddiv1rp").removeClass("op5");
						break;
					case '24': //Div II weapon & shield
						if (obj.expire_date != null){
							tempDate = new Date(obj.expire_date);
							if (tempDate > youthdate) youthdate = tempDate;
						}
						resYouth = resYouth + "<div id='div2' class='auth'><div class='authtext'>" + obj.type + "</div></div>";
						$("#carddiv2").removeClass("op5");
						break;
					case '25': //Div II two handed
						if (obj.expire_date != null){
							tempDate = new Date(obj.expire_date);
							if (tempDate > youthdate) youthdate = tempDate;
						}
						resYouth = resYouth + "<div id='div22h' class='auth'><div class='authtext'>" + obj.type + "</div></div>";
						$("#carddiv22h").removeClass("op5");
						break;
					case '26': //Div II rapier
						if (obj.expire_date != null){
							tempDate = new Date(obj.expire_date);
							if (tempDate > youthdate) youthdate = tempDate;
						}
						resYouth = resYouth + "<div id='div2rp' class='auth'><div class='authtext'>" + obj.type + "</div></div>";
						$("#carddiv2rp").removeClass("op5");
						break;

					case '27': //Div III weapon & shield
						if (obj.expire_date != null){
							tempDate = new Date(obj.expire_date);
							if (tempDate > youthdate) youthdate = tempDate;
						}
						resYouth = resYouth + "<div id='div3' class='auth'><div class='authtext'>" + obj.type + "</div></div>";
						$("#carddiv3").removeClass("op5");
						break;
					case '28': //Div III two handed
						if (obj.expire_date != null){
							tempDate = new Date(obj.expire_date);
							if (tempDate > youthdate) youthdate = tempDate;
						}
						resYouth = resYouth + "<div id='div32h' class='auth'><div class='authtext'>" + obj.type + "</div></div>";
						$("#carddiv32h").removeClass("op5");
						break;
					case '29': //Div III rapier
						if (obj.expire_date != null){
							tempDate = new Date(obj.expire_date);
							if (tempDate > youthdate) youthdate = tempDate;
						}
						resYouth = resYouth + "<div id='div3rp' class='auth'><div class='authtext'>" + obj.type + "</div></div>";
						$("#carddiv3rp").removeClass("op5");
						break;

					case '30': //General Riding
						if (obj.expire_date != null){
							tempDate = new Date(obj.expire_date);
							if (tempDate > eqdate) eqdate = tempDate;
						}
						resEq = resEq + "<div id='gr' class='auth'><div class='authtext'>" + obj.type + "</div></div>";
						$("#cardgr").removeClass("op5");
						break;
					case '31': //Mounted Games
						if (obj.expire_date != null){
							tempDate = new Date(obj.expire_date);
							if (tempDate > eqdate) eqdate = tempDate;
						}
						resEq = resEq + "<div id='mg' class='auth'><div class='authtext'>" + obj.type + "</div></div>";
						$("#cardmg").removeClass("op5");
						break;
					case '32': //Mounted Archery
						if (obj.expire_date != null){
							tempDate = new Date(obj.expire_date);
							if (tempDate > eqdate) eqdate = tempDate;
						}
						resEq = resEq + "<div id='ma' class='auth'><div class='authtext'>" + obj.type + "</div></div>";
						$("#cardma").removeClass("op5");
						break;
					case '33': //Driving
						if (obj.expire_date != null){
							tempDate = new Date(obj.expire_date);
							if (tempDate > eqdate) eqdate = tempDate;
						}
						resEq = resEq + "<div id='dr' class='auth'><div class='authtext'>" + obj.type + "</div></div>";
						$("#carddr").removeClass("op5");
						break;
					case '34': //Crest Combat
						if (obj.expire_date != null){
							tempDate = new Date(obj.expire_date);
							if (tempDate > eqdate) eqdate = tempDate;
						}
						resEq = resEq + "<div id='cc' class='auth'><div class='authtext'>" + obj.type + "</div></div>";
						$("#cardcc").removeClass("op5");
						break;
					case '35': //Mounted Combat
						if (obj.expire_date != null){
							tempDate = new Date(obj.expire_date);
							if (tempDate > eqdate) eqdate = tempDate;
						}
						resEq = resEq + "<div id='mc' class='auth'><div class='authtext'>" + obj.type + "</div></div>";
						$("#cardmc").removeClass("op5");
						break;
					case '36': //Joust
						if (obj.expire_date != null){
							tempDate = new Date(obj.expire_date);
							if (tempDate > eqdate) eqdate = tempDate;
						}
						resEq = resEq + "<div id='js' class='auth'><div class='authtext'>" + obj.type + "</div></div>";
						$("#cardjs").removeClass("op5");
						break;


					case '37': //armor marshal
						if (obj.expire_date != null){
							tempDate = new Date(obj.expire_date);
							if (tempDate > marshaldate) marshaldate = tempDate;
						}
						resMarshal = resMarshal + "<div id='mar' class='auth'><div class='authtext'>" + obj.type + "</div></div>";
						$("#cardmar").removeClass("op5");
						break;
					case '38': //Combat Archery Equipment
						if (obj.expire_date != null){
							tempDate = new Date(obj.expire_date);
							if (tempDate > marshaldate) marshaldate = tempDate;
						}
						resMarshal = resMarshal + "<div id='cae' class='auth'><div class='authtext'>" + obj.type + "</div></div>";
						$("#cardcae").removeClass("op5");
						break;
					case '39': //rapier marshal
						if (obj.expire_date != null){
							tempDate = new Date(obj.expire_date);
							if (tempDate > marshaldate) marshaldate = tempDate;
						}
						resMarshal = resMarshal + "<div id='mrp' class='auth'><div class='authtext'>" + obj.type + "</div></div>";
						$("#cardmrp").removeClass("op5");
						break;
					case '40': //Archery marshal
						if (obj.expire_date != null){
							tempDate = new Date(obj.expire_date);
							if (tempDate > marshaldate) marshaldate = tempDate;
						}
						resMarshal = resMarshal + "<div id='mac' class='auth'><div class='authtext'>" + obj.type + "</div></div>";
						$("#cardmac").removeClass("op5");
						break;
					case '41': //Equestrian marshal
						if (obj.expire_date != null){
							tempDate = new Date(obj.expire_date);
							if (tempDate > marshaldate) marshaldate = tempDate;
						}
						resMarshal = resMarshal + "<div id='meq' class='auth'><div class='authtext'>" + obj.type + "</div></div>";
						$("#cardmeq").removeClass("op5");
						break;
					case '42': //Siege marshal
						if (obj.expire_date != null){
							tempDate = new Date(obj.expire_date);
							if (tempDate > marshaldate) marshaldate = tempDate;
						}
						resMarshal = resMarshal + "<div id='mse' class='auth'><div class='authtext'>" + obj.type + "</div></div>";
						$("#cardmse").removeClass("op5");
						break;
					case '43': //Thrown Weapon	 marshal
						if (obj.expire_date != null){
							tempDate = new Date(obj.expire_date);
							if (tempDate > marshaldate) marshaldate = tempDate;
						}
						resMarshal = resMarshal + "<div id='mtw' class='auth'><div class='authtext'>" + obj.type + "</div></div>";
						$("#cardmtw").removeClass("op5");
						break;
					case '44': //Youth marshal
						if (obj.expire_date != null){
							tempDate = new Date(obj.expire_date);
							if (tempDate > marshaldate) marshaldate = tempDate;
						}
						resMarshal = resMarshal + "<div id='myo' class='auth'><div class='authtext'>" + obj.type + "</div></div>";
						$("#cardmyo").removeClass("op5");
						break;
					case '45': //Cut & Thrust marshal
						if (obj.expire_date != null){
							tempDate = new Date(obj.expire_date);
							if (tempDate > marshaldate) marshaldate = tempDate;
						}
						resMarshal = resMarshal + "<div id='mct' class='auth'><div class='authtext'>" + obj.type + "</div></div>";
						$("#cardmct").removeClass("op5");
						break;
					case '46': //Clerk of Roster
						if (obj.expire_date != null){
							tempDate = new Date(obj.expire_date);
							if (tempDate > marshaldate) marshaldate = tempDate;
						}
						resMarshal = resMarshal + "<div id='cr' class='auth'><div class='authtext'>" + obj.type + "</div></div>";
						break;
					case '47': //Kingdom Earl Marshal
						if (obj.expire_date != null){
							tempDate = new Date(obj.expire_date);
							if (tempDate > marshaldate) marshaldate = tempDate;
						}
						resMarshal = resMarshal + "<div id='kem' class='auth'><div class='authtext'>" + obj.type + "</div></div>";
						break;

					default:
						break;
				}
		});

   		    $("#cardexp").text((tempDate.getMonth() +1) + "-" + tempDate.getDay() + "-" + tempDate.getFullYear());

			if (marshaldate.getFullYear() > 1969){
			  var expiredCard = "postdate";
  			  if (marshaldate < today) { expiredCard = "expiredCard"; }

			  if (resMarshal.length > 0) resMarshal = "<div id='Marshaling' class='card'><div id='armoredheader' class='cardheader'><div id='mashallingicon' class='marshalicon'></div><div class='headertext'>Marshaling</div>	<div id='marshaldate' class='" + expiredCard + "'> <div id='marshalmonth' class='postmonth'>"+monthNames[marshaldate.getMonth()]+"</div><div id='marshalday' class='postday'>"+marshaldate.getDate()+"</div><div id='marshalyear' class='vtext'>"+marshaldate.getFullYear()+"</div>	</div></div><hr class='style-one'><div id='authbox' class='authbox'>" + resMarshal + "</div></div>";
			  } else {
			 	if (resMarshal.length > 0) resMarshal = "<div id='Marshaling' class='card'><div id='armoredheader' class='cardheader'><div id='mashallingicon' class='marshalicon'></div><div class='headertext'>Marshaling</div>	<div id='marshaldate' class='neverCard'> <div id='marshalmonth' class='postmonth'></div><div id='marshalday' class='postday'></div><div id='marshalyear' class='vtext'></div>	</div></div><hr class='style-one'><div id='authbox' class='authbox'>" + resMarshal + "</div></div>";
			  }


			if (armoreddate.getFullYear() > 1969){
			  var expiredCard = "postdate";
			  if (armoreddate < today) { expiredCard = "expiredCard"; }
			  if (resArmored.length > 0) resArmored = "<div id='armored' class='card'><div id='armoredheader' class='cardheader'><div id='armoredicon' class='marshalicon'></div><div class='headertext'>Armored Combat</div>	<div id='amoreddate' class='" + expiredCard + "'>  <div id='amoredmonth' class='postmonth'>"+monthNames[armoreddate.getMonth()]+"</div><div id='amoredday' class='postday'>"+armoreddate.getDate()+"</div><div id='amoredyear' class='vtext'>"+armoreddate.getFullYear()+"</div>		</div></div>				<hr class='style-one'><div id='authbox' class='authbox'>" + resArmored + "</div></div>";
			  } else {
					if (resArmored.length > 0) resArmored = "<div id='armored' class='card'><div id='armoredheader' class='cardheader'><div id='armoredicon' class='marshalicon'></div><div class='headertext'>Armored Combat</div>	<div id='amoreddate' class='neverCard'>  <div id='amoredmonth' class='postmonth'></div><div id='amoredday' class='postday'></div><div id='amoredyear' class='vtext'></div>		</div></div>				<hr class='style-one'><div id='authbox' class='authbox'>" + resArmored + "</div></div>";
			  }


			if (rapierdate.getFullYear() > 1969){
			  var expiredCard = "postdate";
			  if (rapierdate < today) { expiredCard = "expiredCard"; }
			  if (resRapier.length > 0) resRapier = "<div id='Rapier' class='card'><div id='armoredheader' class='cardheader'><div id='rapiericon' class='marshalicon'></div><div class='headertext'>Rapier Combat</div>			<div id='rapierdate' class='" + expiredCard + "'>  <div id='rapiermonth' class='postmonth'>"+monthNames[rapierdate.getMonth()]+"</div><div id='rapierday' class='postday'>"+rapierdate.getDate()+"</div><div id='rapieryear' class='vtext'>"+rapierdate.getFullYear()+"</div>		</div></div><hr class='style-one'><div id='authbox' class='authbox'>" + resRapier + "</div></div>";
			  } else {
			    if (resRapier.length > 0) resRapier = "<div id='Rapier' class='card'><div id='armoredheader' class='cardheader'><div id='rapiericon' class='marshalicon'></div><div class='headertext'>Rapier Combat</div>			<div id='rapierdate' class='postdate'>  <div id='rapiermonth' class='postmonth'></div><div id='rapierday' class='postday'></div><div id='rapieryear' class='vtext'></div>		</div></div><hr class='style-one'><div id='authbox' class='authbox'>" + resRapier + "</div></div>";
		   	  }
            
			if (cantdate.getFullYear() > 1969){
			  var expiredCard = "postdate";
			  if (cantdate < today) { expiredCard = "expiredCard"; }
			  if (resCant.length > 0) resCant = "<div id='Cant' class='card'><div id='armoredheader' class='cardheader'><div id='canticon' class='marshalicon'></div><div class='headertext'>Cut & Thrust Combat</div>			<div id='cantdate' class='" + expiredCard + "'>  <div id='cantmonth' class='postmonth'>"+monthNames[cantdate.getMonth()]+"</div><div id='cantday' class='postday'>"+cantdate.getDate()+"</div><div id='cantyear' class='vtext'>"+cantdate.getFullYear()+"</div>		</div></div><hr class='style-one'><div id='authbox' class='authbox'>" + resCant + "</div></div>";
			  } else {
			    if (resCant.length > 0) resCant = "<div id='Cant' class='card'><div id='armoredheader' class='cardheader'><div id='canticon' class='marshalicon'></div><div class='headertext'>Cut & Thrust Combat</div>			<div id='cantdate' class='postdate'>  <div id='cantmonth' class='postmonth'></div><div id='cantday' class='postday'></div><div id='cantyear' class='vtext'></div>		</div></div><hr class='style-one'><div id='authbox' class='authbox'>" + resCant + "</div></div>";
		   	  }            


			if (youthdate.getFullYear() > 1969){
			  var expiredCard = "postdate";
			  if (youthdate < today) { expiredCard = "expiredCard"; }
		  	  if (resYouth.length > 0) resYouth = "<div id='Youth' class='card'><div id='armoredheader' class='cardheader'><div id='youthicon' class='marshalicon'></div><div class='headertext'>Youth</div>						<div id='youthdate' class='" + expiredCard + "'>   <div id='youthmonth' class='postmonth'>"+monthNames[youthdate.getMonth()]+"</div><div id='youthday' class='postday'>"+youthdate.getDate()+"</div><div id='youthyear' class='vtext'>"+youthdate.getFullYear()+"</div>			</div></div>	<hr class='style-one'><div id='authbox' class='authbox'>" + resYouth + "</div></div>";
			  } else {
			    if (resYouth.length > 0) resYouth = "<div id='Youth' class='card'><div id='armoredheader' class='cardheader'><div id='youthicon' class='marshalicon'></div><div class='headertext'>Youth</div>						<div id='youthdate' class='postdate'>   <div id='youthmonth' class='postmonth'></div><div id='youthday' class='postday'></div><div id='youthyear' class='vtext'></div>			</div></div>	<hr class='style-one'><div id='authbox' class='authbox'>" + resYouth + "</div></div>";
			  }


			if (eqdate.getFullYear() > 1969){
  			  var expiredCard = "postdate";
			  if (eqdate < today) { expiredCard = "expiredCard"; }
			  if (resEq.length > 0) resEq = "<div id='Equestrian' class='card'><div id='armoredheader' class='cardheader'><div id='equestrianicon' class='marshalicon'></div><div class='headertext'>Equestrian</div>			<div id='eqdate' class='" + expiredCard + "'>      <div id='eqmonth' class='postmonth'>"+monthNames[eqdate.getMonth()]+"</div><div id='eqday' class='postday'>"+eqdate.getDate()+"</div><div id='eqyear' class='vtext'>"+eqdate.getFullYear()+"</div>					</div></div><hr class='style-one'><div id='authbox' class='authbox'>" + resEq + "</div></div>";
			  } else {
				if (resEq.length > 0) resEq = "<div id='Equestrian' class='card'><div id='armoredheader' class='cardheader'><div id='equestrianicon' class='marshalicon'></div><div class='headertext'>Equestrian</div>			<div id='eqdate' class='postdate'>      <div id='eqmonth' class='postmonth'></div><div id='eqday' class='postday'></div><div id='eqyear' class='vtext'></div>					</div></div><hr class='style-one'><div id='authbox' class='authbox'>" + resEq + "</div></div>";
			  }



		res = resArmored + resRapier + resCant + resEq + resYouth + resMarshal;

		$("#cardbox").html(res);

		},
		error: function (jqXHR, textStatus, errorThrown) {
			//alert("Error in buildPersonAuths: " + errorThrown);
		}
	});

}

function buildPersonNote(personId)
{
    if ($.inEditMode)
	{
        $("#personote").show();
        getPersonNote(personId);
        return
	}    
    
}

function buildPersonAuthsEdit(personId)
{

	var res = "";
	var resArmored = "";
	var resRapier = "";
    var resCant = "";
	var resEq = ""
	var resYouth = "";
	var resMarshal = "";

	$.ajax({
		url: "http://www.castlewalls.com/auths/mid/personauths.php",
		type: 'GET',
		contentType: "application/json",
		dataType: "json",
		data: {pId: personId},
		success: function (result) {

		var marshaldate = new Date(1966, 1, 1);
		var armoreddate = new Date(1966, 1, 1);
		var rapierdate = new Date(1966, 1, 1);
        var cantdate = new Date(1966,1,1);
		var youthdate = new Date(1966, 1, 1);
		var eqdate = new Date(1966, 1, 1);
		var tempDate = new Date(1966, 1, 1);

		var armorednotes = "";
		var rapiernotes = "";
        var cantnotes = "";
		var youthnotes = "";
		var eqnotes = "";
		var marshalnotes = "";


		resArmored = resArmored + "<div id='ssh' authid='1' class='auth op5' onClick='auth(event)'><div class='authtext'>Sword & Shield</div></div>";
		resArmored = resArmored + "<div id='tw' authid='2' class='auth op5' onClick='auth(event)'><div class='authtext'>Two Weapon</div></div>";
		resArmored = resArmored + "<div id='gs' authid='3' class='auth op5' onClick='auth(event)'><div class='authtext'>Great Sword</div></div>";
		resArmored = resArmored + "<div id='sp' authid='4' class='auth op5' onClick='auth(event)'><div class='authtext'>Spear</div></div>";
		resArmored = resArmored + "<div id='pa' authid='5' class='auth op5' onClick='auth(event)'><div class='authtext'>Polearm</div></div>";
		resArmored = resArmored + "<div id='ysp' authid='6' class='auth op5' onClick='auth(event)'><div class='authtext'>Youth Sparring</div></div>";
		resArmored = resArmored + "<div id='ca' authid='9' class='auth op5' onClick='auth(event)'><div class='authtext'>Combat Archery</div></div>";
		resArmored = resArmored + "<div id='sc' authid='10' class='auth op5' onClick='auth(event)'><div class='authtext'>Siege Crew</div></div>";
		resArmored = resArmored + "<div id='se' authid='11' class='auth op5' onClick='auth(event)'><div class='authtext'>Siege Engine</div></div>";

		resRapier = resRapier + "<div id='sr' authid='12' class='auth op5' onClick='auth(event)'><div class='authtext'>Single</div></div>";
		resRapier = resRapier + "<div id='da' authid='16' class='auth op5' onClick='auth(event)'><div class='authtext'>Dagger</div></div>";
		resRapier = resRapier + "<div id='pd' authid='15' class='auth op5' onClick='auth(event)'><div class='authtext'>Parry</div></div>";
		resRapier = resRapier + "<div id='cs' authid='17' class='auth op5' onClick='auth(event)'><div class='authtext'>Case</div></div>";
		resRapier = resRapier + "<div id='ls' authid='18' class='auth op5' onClick='auth(event)'><div class='authtext'>Two Hander</div></div>";
        resRapier = resRapier + "<div id='yrs' authid='52' class='auth op5' onClick='auth(event)'><div class='authtext'>Youth Sparring</div></div>";
            
		resCant = resCant + "<div id='cut' authid='20' class='auth op5' onClick='auth(event)'><div class='authtext'>Sword</div></div>";
		resCant = resCant + "<div id='cutda' authid='21' class='auth op5' onClick='auth(event)'><div class='authtext'>Dagger</div></div>";
		resCant = resCant + "<div id='cutpa' authid='49' class='auth op5' onClick='auth(event)'><div class='authtext'>Pary</div></div>";
		resCant = resCant + "<div id='cutca' authid='50' class='auth op5' onClick='auth(event)'><div class='authtext'>Case</div></div>";            

		resYouth = resYouth + "<div id='div1' authid='22' class='auth op5' onClick='auth(event)'><div class='authtext'>Weapon & Shield</div></div>";
		resYouth = resYouth + "<div id='div1rp' authid='23' class='auth op5' onClick='auth(event)'><div class='authtext'>Rapier</div></div>";
		resYouth = resYouth + "<div id='div2' authid='24' class='auth op5' onClick='auth(event)'><div class='authtext'>Weapon & Shield</div></div>";
		resYouth = resYouth + "<div id='div22h' authid='25' class='auth op5' onClick='auth(event)'><div class='authtext'>Two Handed</div></div>";
		resYouth = resYouth + "<div id='div2rp' authid='26' class='auth op5' onClick='auth(event)'><div class='authtext'>Rapier</div></div>";
		resYouth = resYouth + "<div id='div3' authid='27' class='auth op5' onClick='auth(event)'><div class='authtext'>Weapon & Shield</div></div>";
		resYouth = resYouth + "<div id='div32h' authid='28' class='auth op5' onClick='auth(event)'><div class='authtext'>Two Handed</div></div>";
		resYouth = resYouth + "<div id='div3rp' authid='29' class='auth op5' onClick='auth(event)'><div class='authtext'>Rapier</div></div>";

		resEq = resEq + "<div id='gr' authid='30' class='auth op5' onClick='auth(event)'><div class='authtext'>General Riding</div></div>";
		resEq = resEq + "<div id='mg' authid='31' class='auth op5' onClick='auth(event)'><div class='authtext'>Mounted Games</div></div>";
		resEq = resEq + "<div id='ma' authid='32' class='auth op5' onClick='auth(event)'><div class='authtext'>Mounted Archery</div></div>";
		resEq = resEq + "<div id='dr' authid='33' class='auth op5' onClick='auth(event)'><div class='authtext'>Driving</div></div>";
		resEq = resEq + "<div id='cc' authid='34' class='auth op5' onClick='auth(event)'><div class='authtext'>Crest Combat</div></div>";
		resEq = resEq + "<div id='mc' authid='35' class='auth op5' onClick='auth(event)'><div class='authtext'>Mouted Combat</div></div>";
		resEq = resEq + "<div id='js' authid='36' class='auth op5' onClick='auth(event)'><div class='authtext'>Joust</div></div>";

		resMarshal = resMarshal + "<div id='mar' authid='37' class='auth op5' onClick='auth(event)'><div class='authtext'>Armored</div></div>";
		resMarshal = resMarshal + "<div id='cae' authid='38' class='auth op5' onClick='auth(event)'><div class='authtext'>Combat Archery</div></div>";
		resMarshal = resMarshal + "<div id='mrp' authid='39' class='auth op5' onClick='auth(event)'><div class='authtext'>Rapier</div></div>";
		resMarshal = resMarshal + "<div id='mac' authid='40' class='auth op5' onClick='auth(event)'><div class='authtext'>Archery</div></div>";
		resMarshal = resMarshal + "<div id='meq' authid='41' class='auth op5' onClick='auth(event)'><div class='authtext'>Equestrian</div></div>";
		resMarshal = resMarshal + "<div id='mse' authid='42' class='auth op5' onClick='auth(event)'><div class='authtext'>Siege Engine</div></div>";
		resMarshal = resMarshal + "<div id='mtw' authid='43' class='auth op5' onClick='auth(event)'><div class='authtext'>Thrown Weapons</div></div>";
		resMarshal = resMarshal + "<div id='myo' authid='44' class='auth op5' onClick='auth(event)'><div class='authtext'>Armored Youth</div></div>";
        resMarshal = resMarshal + "<div id='mry' authid='51' class='auth op5' onClick='auth(event)'><div class='authtext'>Rapier Youth</div></div>";
		resMarshal = resMarshal + "<div id='mct' authid='45' class='auth op5' onClick='auth(event)'><div class='authtext'>Cut & Thrust</div></div>";
        resMarshal = resMarshal + "<div id='mhc' authid='53' class='auth op5' onClick='auth(event)'><div class='authtext'>Hound Coursing</div></div>";
		resMarshal = resMarshal + "<div id='cr' authid='46' class='auth op5' onClick='auth(event)'><div class='authtext'>Clerk of the Roster</div></div>";
		resMarshal = resMarshal + "<div id='kem' authid='47' class='auth op5' onClick='auth(event)'><div class='authtext'>Kingdom Earl Marshal</div></div>";


		if (resArmored.length > 0){
			resArmored = "<div id='armored' class='card'><div id='armoredheader' class='cardheader'><div id='armoredicon' class='marshalicon'></div><div id='headertext' class='headertext'>Armored Combat</div><div id='amoreddate' prefix='amored' class='postdate' typeid='3' onclick=changeToTextField('amored','3') >  <div id='amoredmonth' prefix='amored' class='postmonth'>Jan</div><div id='amoredday' prefix='amored' class='postday'>1</div><div prefix='amored' id='amoredyear' class='vtext'>2000</div>		</div></div><hr class='style-one'><div id='authbox' class='authbox'>" + resArmored + "</div></div>";
			resArmored = resArmored + "<div id='armorednotes' class='card'><div id='armoredheader' class='cardheader'><div id='armoredicon' class='marshalicon'></div><div class='headertext'>Armored Auth Notes</div></div>				<hr class='style-one'><div id='armorednotesbox' class='authbox'></div></div>";
			}

		if (resRapier.length > 0){
			resRapier = "<div id='Rapier' class='card'><div id='armoredheader' class='cardheader'><div id='rapiericon' class='marshalicon'></div><div class='headertext'>Rapier Combat</div>			<div id='rapierdate' class='postdate' prefix='rapier' typeid='5' onclick=changeToTextField('rapier','5') >  <div id='rapiermonth' class='postmonth'>Jan</div><div id='rapierday' class='postday'>1</div><div id='rapieryear' class='vtext'>2000</div>		</div></div><hr class='style-one'><div id='authbox' class='authbox'>" + resRapier + "</div></div>";
			resRapier = resRapier + "<div id='rapiernotes' class='card'><div id='rapierheader' class='cardheader'><div id='rapiericon' class='marshalicon'></div><div class='headertext'>Rapier Auth Notes</div></div>				<hr class='style-one'><div id='rapiernotesbox' class='authbox'></div></div>";
			}

		if (resCant.length > 0){
			resCant = "<div id='Cant' class='card'><div id='armoredheader' class='cardheader'><div id='canticon' class='marshalicon'></div><div class='headertext'>Cut & Thrust Combat</div>			<div id='cantdate' class='postdate' prefix='cant' typeid='5' onclick=changeToTextField('cant','9') >  <div id='cantmonth' class='postmonth'>Jan</div><div id='cantday' class='postday'>1</div><div id='cantyear' class='vtext'>2000</div>		</div></div><hr class='style-one'><div id='authbox' class='authbox'>" + resCant + "</div></div>";
			resCant = resCant + "<div id='rapiernotes' class='card'><div id='rapierheader' class='cardheader'><div id='canticon' class='marshalicon'></div><div class='headertext'>Cut & Thrust Auth Notes</div></div>				<hr class='style-one'><div id='cantnotesbox' class='authbox'></div></div>";
			}            
            

		if (resEq.length > 0){
			resEq = "<div id='Equestrian' class='card'><div id='armoredheader' class='cardheader'><div id='equestrianicon' class='marshalicon'></div><div class='headertext'>Equestrian</div>			<div id='eqdate' class='postdate' prefix='eq' typeid='8' onclick=changeToTextField('eq','8')>      <div id='eqmonth' class='postmonth'>Jan</div><div id='eqday' class='postday'>1</div><div id='eqyear' class='vtext'>2000</div>					</div></div><hr class='style-one'><div id='authbox' class='authbox'>" + resEq + "</div></div>";
			resEq = resEq + "<div id='eqnotes' class='card'><div id='eqheader' class='cardheader'><div id='equestrianicon' class='marshalicon'></div><div class='headertext'>Equestrian Auth Notes</div></div>				<hr class='style-one'><div id='eqnotesbox' class='authbox'></div></div>";
		}

		if (resYouth.length > 0){
			resYouth = "<div id='Youth' class='card'><div id='armoredheader' class='cardheader'><div id='youthicon' class='marshalicon'></div><div class='headertext'>Youth</div>						<div id='youthdate' class='postdate' prefix='youth' typeid='6'  onclick=changeToTextField('youth','6')>   <div id='youthmonth' class='postmonth'>Jan</div><div id='youthday' class='postday'>1</div><div id='youthyear' class='vtext'>2000</div>			</div></div>	<hr class='style-one'><div id='authbox' class='authbox'>" + resYouth + "</div></div>";
			resYouth = resYouth + "<div id='youthnotes' class='card'><div id='youthheader' class='cardheader'><div id='youthicon' class='marshalicon'></div><div class='headertext'>Youth Auth Notes</div></div>				<hr class='style-one'><div id='youthnotesbox' class='authbox'></div></div>";
		}

		if (resMarshal.length > 0){
			resMarshal = "<div id='Marshaling' class='card'><div id='armoredheader' class='cardheader'><div id='mashallingicon' class='marshalicon'></div><div class='headertext'>Marshaling</div>	<div id='marshaldate' class='postdate'  prefix='marshal' typeid='1' onclick=changeToTextField('marshal','1')> <div id='marshalmonth' prefix='marshal' class='postmonth'>Jan</div><div id='marshalday' prefix='marshal' class='postday'>1</div><div prefix='marshal' id='marshalyear' class='vtext'>2000</div>	</div></div><hr class='style-one'><div id='authbox' class='authbox'>" + resMarshal + "</div></div>";
			resMarshal = resMarshal + "<div id='marshalnotes' class='card'><div id='marshalheader' class='cardheader'><div id='mashallingicon' class='marshalicon'></div><div class='headertext'>Marshal Notes</div></div>				<hr class='style-one'><div id='marshalnotesbox' class='authbox'></div></div>";
		}
		res = resArmored + resRapier + resCant + resEq + resYouth + resMarshal;
		$("#cardbox").html(res);

		$.each(result, function(idx, obj) {

				switch(obj.type_id) {
					case '1': //Sword & Shield
						if (obj.expire_date != null){
							tempDate = new Date(obj.expire_date);
							if (tempDate > armoreddate) armoreddate = tempDate;
						}
						armorednotes = armorednotes + "<div id='ssh' class='catarmored smallicon twenty'></div><div id='sshissued' class='authdate'>"+obj.issued+"</div><div id='sshenote' class='authnote' onClick='swapTextEdit(event)'; onChange=updateAuth("+obj.auth_id+",'ssh');>"+obj.note+"</div>";
						$('#ssh').removeClass("op5");
						break;
					case '2': //Two Weapon
						if (obj.expire_date != null){
							tempDate = new Date(obj.expire_date);
							if (tempDate > armoreddate) armoreddate = tempDate;
						}
						armorednotes = armorednotes + "<div id='tw' class='catarmored smallicon twenty'></div><div id='twissued' class='authdate'>"+obj.issued+"</div><div id='twnote' class='authnote' onClick='swapTextEdit(event)'; onChange=updateAuth("+obj.auth_id+",'tw');>"+obj.note+"</div>";
						$('#tw').removeClass("op5");
						break;
					case '3': //Great Sword
						if (obj.expire_date != null){
							tempDate = new Date(obj.expire_date);
							if (tempDate > armoreddate) armoreddate = tempDate;
						}
						armorednotes = armorednotes + "<div id='gs' class='catarmored smallicon twenty'></div><div id='gsissued' class='authdate'>"+obj.issued+"</div><div id='gsnote' class='authnote' onClick='swapTextEdit(event)'; onChange=updateAuth("+obj.auth_id+",'gs');>"+obj.note+"</div>";
						$('#gs').removeClass("op5");
						break;
					case '4': //Spear
						if (obj.expire_date != null){
							tempDate = new Date(obj.expire_date);
							if (tempDate > armoreddate) armoreddate = tempDate;
						}
						armorednotes = armorednotes + "<div id='sp' class='catarmored smallicon twenty'></div><div id='spissued' class='authdate'>"+obj.issued+"</div><div id='spnote' class='authnote' onClick='swapTextEdit(event)'; onChange=updateAuth("+obj.auth_id+",'sp');>"+obj.note+"</div>";
						$('#sp').removeClass("op5");
						break;
					case '5': //Pole Arm
						if (obj.expire_date != null){
							tempDate = new Date(obj.expire_date);
							if (tempDate > armoreddate) armoreddate = tempDate;
						}
						armorednotes = armorednotes + "<div id='pa' class='catarmored smallicon twenty'></div><div id='paissued' class='authdate'>"+obj.issued+"</div><div id='panote' class='authnote' onClick='swapTextEdit(event)'; onChange=updateAuth("+obj.auth_id+",'pa');>"+obj.note+"</div>";
						$('#pa').removeClass("op5");
						break;
					case '6': //Youth Sparing
						if (obj.expire_date != null){
							tempDate = new Date(obj.expire_date);
							if (tempDate > armoreddate) armoreddate = tempDate;
						}
						armorednotes = armorednotes + "<div id='ysp' class='catarmored smallicon twenty'></div><div id='paissued' class='authdate'>"+obj.issued+"</div><div id='panote' class='authnote' onClick='swapTextEdit(event)'; onChange=updateAuth("+obj.auth_id+",'ysp');>"+obj.note+"</div>";
						$('#ysp').removeClass("op5");
						break;
					case '9': //Combat Archery
						if (obj.expire_date != null){
							tempDate = new Date(obj.expire_date);
							if (tempDate > armoreddate) armoreddate = tempDate;
						}
						armorednotes = armorednotes + "<div id='ca' class='catarmored smallicon twenty'></div><div id='caissued' class='authdate'>"+obj.issued+"</div><div id='canote' class='authnote' onClick='swapTextEdit(event)'; onChange=updateAuth("+obj.auth_id+",'ca');>"+obj.note+"</div>";
						$('#ca').removeClass("op5");
						break;
					case '10': //Siege Crew
						if (obj.expire_date != null){
							tempDate = new Date(obj.expire_date);
							if (tempDate > armoreddate) armoreddate = tempDate;
						}
						armorednotes = armorednotes + "<div id='sc' class='catarmored smallicon twenty'></div><div id='scissued' class='authdate'>"+obj.issued+"</div><div id='scnote' class='authnote' onClick='swapTextEdit(event)'; onChange=updateAuth("+obj.auth_id+",'sc');>"+obj.note+"</div>";
						$('#sc').removeClass("op5");
						break;
					case '11': //Siege Engine
						if (obj.expire_date != null){
							tempDate = new Date(obj.expire_date);
							if (tempDate > armoreddate) armoreddate = tempDate;
						}
						armorednotes = armorednotes + "<div id='se' class='catarmored smallicon twenty'></div><div id='seissued' class='authdate'>"+obj.issued+"</div><div id='senote' class='authnote' onClick='swapTextEdit(event)'; onChange=updateAuth("+obj.auth_id+",'se'); >"+obj.note+"</div>";
						$('#se').removeClass("op5");
						break;
					case '12': //Single Rapier
						if (obj.expire_date != null){
							tempDate = new Date(obj.expire_date);
							if (tempDate > rapierdate) rapierdate = tempDate;
						}
						rapiernotes = rapiernotes + "<div id='sr' class='catarmored smallicon twenty'></div><div id='srissued' class='authdate'>"+obj.issued+"</div><div id='srnote' class='authnote' onClick='swapTextEdit(event)'; onChange=updateAuth("+obj.auth_id+",'sr');>"+obj.note+"</div>";
						$('#sr').removeClass("op5");
						break;
					case '16': //Dagger
						if (obj.expire_date != null){
							tempDate = new Date(obj.expire_date);
							if (tempDate > rapierdate) rapierdate = tempDate;
						}
						rapiernotes = rapiernotes + "<div id='da' class='catarmored smallicon twenty'></div><div id='daissued' class='authdate'>"+obj.issued+"</div><div id='danote' class='authnote' onClick='swapTextEdit(event)'; onChange='updateAuth("+obj.auth_id+",'da')';>"+obj.note+"</div>";
						$('#da').removeClass("op5");
						break;
					case '15': //defensive object
						if (obj.expire_date != null){
							tempDate = new Date(obj.expire_date);
							if (tempDate > rapierdate) rapierdate = tempDate;
						}
						rapiernotes = rapiernotes + "<div id='pd' class='catarmored smallicon twenty'></div><div id='pdissued' class='authdate'>"+obj.issued+"</div><div id='pdnote' class='authnote' onClick='swapTextEdit(event)'; onChange='updateAuth("+obj.auth_id+",'pd')';>"+obj.note+"</div>";
						$('#pd').removeClass("op5");
						break;
					case '17': //Case
						if (obj.expire_date != null){
							tempDate = new Date(obj.expire_date);
							if (tempDate > rapierdate) rapierdate = tempDate;
						}
						rapiernotes = rapiernotes + "<div id='cs' class='catarmored smallicon twenty'></div><div id='csissued' class='authdate'>"+obj.issued+"</div><div id='csnote' class='authnote' onClick='swapTextEdit(event)'; onChange='updateAuth("+obj.auth_id+",'cs')';>"+obj.note+"</div>";
						$('#cs').removeClass("op5");
						break;
					case '18': //Long Sword
						if (obj.expire_date != null){
							tempDate = new Date(obj.expire_date);
							if (tempDate > rapierdate) rapierdate = tempDate;
						}
						rapiernotes = rapiernotes + "<div id='ls' class='catarmored smallicon twenty'></div><div id='lsissued' class='authdate'>"+obj.issued+"</div><div id='lsnote' class='authnote' onClick='swapTextEdit(event)'; onChange='updateAuth("+obj.auth_id+",'ls')';>"+obj.note+"</div>";
						$('#ls').removeClass("op5");
						break;
					case '19': //Epee
						if (obj.expire_date != null){
							tempDate = new Date(obj.expire_date);
							if (tempDate > rapierdate) rapierdate = tempDate;
						}
						rapiernotes = rapiernotes + "<div id='ls' class='catarmored smallicon twenty'></div><div id='lsissued' class='authdate'>"+obj.issued+"</div><div id='lsnote' class='authnote' onClick='swapTextEdit(event)'; onChange='updateAuth("+obj.auth_id+",'ls')';>"+obj.note+"</div>";
						$('#ls').removeClass("op5");
						break;
                    case '52': //Rapier Youth Sparring
						if (obj.expire_date != null){
							tempDate = new Date(obj.expire_date);
							if (tempDate > rapierdate) rapierdate = tempDate;
						}
						rapiernotes = rapiernotes + "<div id='yrs' class='catyouth smallicon twenty'></div><div id='yrsissued' class='authdate'>"+obj.issued+"</div><div id='yrsnote' class='authnote' onClick='swapTextEdit(event)'; onChange=updateAuth("+obj.auth_id+",'yrs');>"+obj.note+"</div>";
						$('#yrs').removeClass("op5");
						break;
//-----------------------------------------------------------------------------------------------
					case '20': //Cut & Thrust - Sword
						if (obj.expire_date != null){
							tempDate = new Date(obj.expire_date);
							if (tempDate > cantdate) cantdate = tempDate;
						}
						cantnotes = cantnotes + "<div id='cut' class='catarmored smallicon twenty'></div><div id='cutissued' class='authdate'>"+obj.issued+"</div><div id='cutnote' class='authnote' onClick='swapTextEdit(event)'; onChange='updateAuth("+obj.auth_id+",'cut')';>"+obj.note+"</div>";
						$('#cut').removeClass("op5");
						break;
					case '21': //Cut & Thrust - dagger
						if (obj.expire_date != null){
							tempDate = new Date(obj.expire_date);
							if (tempDate > cantdate) cantdate = tempDate;
						}
						cantnotes = cantnotes + "<div id='cutda' class='catarmored smallicon twenty'></div><div id='cutdaissued' class='authdate'>"+obj.issued+"</div><div id='cutdanote' class='authnote' onClick='swapTextEdit(event)'; onChange='updateAuth("+obj.auth_id+",'cutda')';>"+obj.note+"</div>";
						$('#cutda').removeClass("op5");
						break;
					case '49': //Cut & Thrust - parry
						if (obj.expire_date != null){
							tempDate = new Date(obj.expire_date);
							if (tempDate > cantdate) cantdate = tempDate;
						}
						cantnotes = cantnotes + "<div id='cutpa' class='catarmored smallicon twenty'></div><div id='cutpaissued' class='authdate'>"+obj.issued+"</div><div id='cupatnote' class='authnote' onClick='swapTextEdit(event)'; onChange='updateAuth("+obj.auth_id+",'cutpa')';>"+obj.note+"</div>";
						$('#cutpa').removeClass("op5");
						break;
					case '50': //Cut & Thrust - case
						if (obj.expire_date != null){
							tempDate = new Date(obj.expire_date);
							if (tempDate > cantdate) cantdate = tempDate;
						}
						cantnotes = cantnotes + "<div id='cutca' class='catarmored smallicon twenty'></div><div id='cutcaissued' class='authdate'>"+obj.issued+"</div><div id='cutcanote' class='authnote' onClick='swapTextEdit(event)'; onChange='updateAuth("+obj.auth_id+",'cutca')';>"+obj.note+"</div>";
						$('#cutca').removeClass("op5");
						break;                        
//-----------------------------------------------------------------------------------------------
                    case '22': //Div I weapon & shield
						if (obj.expire_date != null){
							tempDate = new Date(obj.expire_date);
							if (tempDate > youthdate) youthdate = tempDate;
						}
						youthnotes = youthnotes + "<div id='div1' class='catarmored smallicon twenty'></div><div id='div1issued' class='authdate'>"+obj.issued+"</div><div id='div1note' class='authnote' onClick='swapTextEdit(event)'; onChange='updateAuth("+obj.auth_id+",'div1')';>"+obj.note+"</div>";
						$('#div1').removeClass("op5");
						break;
					case '23': //Div I Rapier
						if (obj.expire_date != null){
							tempDate = new Date(obj.expire_date);
							if (tempDate > youthdate) youthdate = tempDate;
						}
						youthnotes = youthnotes + "<div id='div1rp' class='catarmored smallicon twenty'></div><div id='div1issued' class='authdate'>"+obj.issued+"</div><div id='div1note' class='authnote' onClick='swapTextEdit(event)'; onChange='updateAuth("+obj.auth_id+",'div1rp')';>"+obj.note+"</div>";
						$('#div1rp').removeClass("op5");
						break;

					case '24': //Div II weapon & shield
						if (obj.expire_date != null){
							tempDate = new Date(obj.expire_date);
							if (tempDate > youthdate) youthdate = tempDate;
						}
						youthnotes = youthnotes + "<div id='div2' class='catarmored smallicon twenty'></div><div id='div2issued' class='authdate'>"+obj.issued+"</div><div id='div2note' class='authnote' onClick='swapTextEdit(event)'; onChange='updateAuth("+obj.auth_id+",'div2')';>"+obj.note+"</div>";
						$('#div2').removeClass("op5");
						break;

					case '25': //Div II two handed
						if (obj.expire_date != null){
							tempDate = new Date(obj.expire_date);
							if (tempDate > youthdate) youthdate = tempDate;
						}
						youthnotes = youthnotes + "<div id='div22h' class='catarmored smallicon twenty'></div><div id='div2issued' class='authdate'>"+obj.issued+"</div><div id='div2note' class='authnote' onClick='swapTextEdit(event)'; onChange='updateAuth("+obj.auth_id+",'div22h')';>"+obj.note+"</div>";
						$('#div22h').removeClass("op5");
						break;

					case '26': //Div II rapier
						if (obj.expire_date != null){
							tempDate = new Date(obj.expire_date);
							if (tempDate > youthdate) youthdate = tempDate;
						}
						youthnotes = youthnotes + "<div id='div2rp' class='catarmored smallicon twenty'></div><div id='div2issued' class='authdate'>"+obj.issued+"</div><div id='div2note' class='authnote' onClick='swapTextEdit(event)'; onChange='updateAuth("+obj.auth_id+",'div2rp')';>"+obj.note+"</div>";
						$('#div2rp').removeClass("op5");
						break;
					case '27': //Div III weapon & shield
						if (obj.expire_date != null){
							tempDate = new Date(obj.expire_date);
							if (tempDate > youthdate) youthdate = tempDate;
						}
						youthnotes = youthnotes + "<div id='div3' class='catarmored smallicon twenty'></div><div id='div3issued' class='authdate'>"+obj.issued+"</div><div id='div3note' class='authnote' onClick='swapTextEdit(event)'; onChange='updateAuth("+obj.auth_id+",'div3')';>"+obj.note+"</div>";
						$('#div3').removeClass("op5");
						break;
					case '28': //Div III two handed
						if (obj.expire_date != null){
							tempDate = new Date(obj.expire_date);
							if (tempDate > youthdate) youthdate = tempDate;
						}
						youthnotes = youthnotes + "<div id='div32h' class='catarmored smallicon twenty'></div><div id='div3issued' class='authdate'>"+obj.issued+"</div><div id='div3note' class='authnote' onClick='swapTextEdit(event)'; onChange='updateAuth("+obj.auth_id+",'div32h')';>"+obj.note+"</div>";
						$('#div32h').removeClass("op5");
						break;
					case '29': //Div III rapier
						if (obj.expire_date != null){
							tempDate = new Date(obj.expire_date);
							if (tempDate > youthdate) youthdate = tempDate;
						}
						youthnotes = youthnotes + "<div id='div3rp' class='catarmored smallicon twenty'></div><div id='div3issued' class='authdate'>"+obj.issued+"</div><div id='div3note' class='authnote' onClick='swapTextEdit(event)'; onChange='updateAuth("+obj.auth_id+",'div3rp')';>"+obj.note+"</div>";
						$('#div3rp').removeClass("op5");
						break;


					case '30': //General Riding
						if (obj.expire_date != null){
							tempDate = new Date(obj.expire_date);
							if (tempDate > eqdate) eqdate = tempDate;
						}
						eqnotes = eqnotes + "<div id='gr' class='catarmored smallicon twenty'></div><div id='grissued' class='authdate'>"+obj.issued+"</div><div id='grnote' class='authnote' onClick='swapTextEdit(event)'; onChange='updateAuth("+obj.auth_id+",'drn')';>"+obj.note+"</div>";
						$('#gr').removeClass("op5");
						break;
					case '31': //Mounted Games
						if (obj.expire_date != null){
							tempDate = new Date(obj.expire_date);
							if (tempDate > eqdate) eqdate = tempDate;
						}
						eqnotes = eqnotes + "<div id='mg' class='catarmored smallicon twenty'></div><div id='mgissued' class='authdate'>"+obj.issued+"</div><div id='mgnote' class='authnote' onClick='swapTextEdit(event)'; onChange='updateAuth("+obj.auth_id+",'mg')';>"+obj.note+"</div>";
						$('#mg').removeClass("op5");
						break;
					case '32': //Mounted Archery
						if (obj.expire_date != null){
							tempDate = new Date(obj.expire_date);
							if (tempDate > eqdate) eqdate = tempDate;
						}
						eqnotes = eqnotes + "<div id='ma' class='catarmored smallicon twenty'></div><div id='maissued' class='authdate'>"+obj.issued+"</div><div id='manote' class='authnote' onClick='swapTextEdit(event)'; onChange='updateAuth("+obj.auth_id+",'ma')';>"+obj.note+"</div>";
						$('#ma').removeClass("op5");
						break;
					case '33': //Driving
						if (obj.expire_date != null){
							tempDate = new Date(obj.expire_date);
							if (tempDate > eqdate) eqdate = tempDate;
						}
						eqnotes = eqnotes + "<div id='dr' class='catarmored smallicon twenty'></div><div id='drissued' class='authdate'>"+obj.issued+"</div><div id='drnote' class='authnote' onClick='swapTextEdit(event)'; onChange='updateAuth("+obj.auth_id+",'dr')';>"+obj.note+"</div>";
						$('#dr').removeClass("op5");
						break;
					case '34': //Crest Combat
						if (obj.expire_date != null){
							tempDate = new Date(obj.expire_date);
							if (tempDate > eqdate) eqdate = tempDate;
						}
						eqnotes = eqnotes + "<div id='cc' class='catarmored smallicon twenty'></div><div id='ccissued' class='authdate'>"+obj.issued+"</div><div id='ccnote' class='authnote' onClick='swapTextEdit(event)'; onChange='updateAuth("+obj.auth_id+",'cc')';>"+obj.note+"</div>";
						$('#cc').removeClass("op5");
						break;
					case '35': //Armored Combat
						if (obj.expire_date != null){
							tempDate = new Date(obj.expire_date);
							if (tempDate > eqdate) eqdate = tempDate;
						}
						eqnotes = eqnotes + "<div id='mc' class='catarmored smallicon twenty'></div><div id='acissued' class='authdate'>"+obj.issued+"</div><div id='acnote' class='authnote' onClick='swapTextEdit(event)'; onChange='updateAuth("+obj.auth_id+",'ac')'; >"+obj.note+"</div>";
						$('#mc').removeClass("op5");
						break;
					case '36': //Joust
						if (obj.expire_date != null){
							tempDate = new Date(obj.expire_date);
							if (tempDate > eqdate) eqdate = tempDate;
						}
						eqnotes = eqnotes + "<div id='js' class='catarmored smallicon twenty'></div><div id='jsissued' class='authdate'>"+obj.issued+"</div><div id='jsnote' class='authnote' onClick='swapTextEdit(event)'; onChange='updateAuth("+obj.auth_id+",'js')';>"+obj.note+"</div>";
						$('#js').removeClass("op5");
						break;
					case '37': //armor marshal
						if (obj.expire_date != null){
							tempDate = new Date(obj.expire_date);
							if (tempDate > marshaldate) marshaldate = tempDate;
						}
						marshalnotes = marshalnotes + "<div id='mar' class='catarmored smallicon twenty'></div><div id='marissued' class='authdate'>"+obj.issued+"</div><div id='armnote' class='authnote' onClick='swapTextEdit(event)'; onChange=updateAuth("+obj.auth_id+", 'mar');>"+obj.note+"</div>";
						$('#mar').removeClass("op5");
						break;
					case '38': //Combat Archery Equipment
						if (obj.expire_date != null){
							tempDate = new Date(obj.expire_date);
							if (tempDate > marshaldate) marshaldate = tempDate;
						}
						marshalnotes = marshalnotes + "<div id='cae' class='catarmored smallicon twenty'></div><div id='macissued' class='authdate'>"+obj.issued+"</div><div id='macnote' class='authnote' onClick='swapTextEdit(event)'; onChange=updateAuth("+obj.auth_id+", 'cae');>"+obj.note+"</div>";
						$('#cae').removeClass("op5");
						break;
					case '39': //rapier marshal
						if (obj.expire_date != null){
							tempDate = new Date(obj.expire_date);
							if (tempDate > marshaldate) marshaldate = tempDate;
						}
						marshalnotes = marshalnotes + "<div id='mrp' class='catarmored smallicon twenty'></div><div id='mrpissued' class='authdate'>"+obj.issued+"</div><div id='mrpnote' class='authnote' onClick='swapTextEdit(event)'; onChange=updateAuth("+obj.auth_id+", 'mrp');>"+obj.note+"</div>";
						$('#mrp').removeClass("op5");
						break;
					case '40': //Archery marshal
						if (obj.expire_date != null){
							tempDate = new Date(obj.expire_date);
							if (tempDate > marshaldate) marshaldate = tempDate;
						}
						marshalnotes = marshalnotes + "<div id='mac' class='catarmored smallicon twenty'></div><div id='macissued' class='authdate'>"+obj.issued+"</div><div id='macnote' class='authnote' onClick='swapTextEdit(event)'; onChange=updateAuth("+obj.auth_id+", 'mac');>"+obj.note+"</div>";
						$('#mac').removeClass("op5");
						break;
					case '41': //Equestrian marshal
						if (obj.expire_date != null){
							tempDate = new Date(obj.expire_date);
							if (tempDate > marshaldate) marshaldate = tempDate;
						}
						marshalnotes = marshalnotes + "<div id='meq' class='catarmored smallicon twenty'></div><div id='meqissued' class='authdate'>"+obj.issued+"</div><div id='meqnote' class='authnote' onClick='swapTextEdit(event)'; onChange=updateAuth("+obj.auth_id+", 'meq');>"+obj.note+"</div>";
						$('#meq').removeClass("op5");
						break;
					case '42': //Siege marshal
						if (obj.expire_date != null){
							tempDate = new Date(obj.expire_date);
							if (tempDate > marshaldate) marshaldate = tempDate;
						}
						marshalnotes = marshalnotes + "<div id='mse' class='catarmored smallicon twenty'></div><div id='mseissued' class='authdate'>"+obj.issued+"</div><div id='msenote' class='authnote' onClick='swapTextEdit(event)'; onChange=updateAuth("+obj.auth_id+", 'mse');>"+obj.note+"</div>";
						$('#mse').removeClass("op5");
						break;
					case '43': //Thrown Weapon	 marshal
						if (obj.expire_date != null){
							tempDate = new Date(obj.expire_date);
							if (tempDate > marshaldate) marshaldate = tempDate;
						}
						marshalnotes = marshalnotes + "<div id='mtw' class='catarmored smallicon twenty'></div><div id='mtwissued' class='authdate'>"+obj.issued+"</div><div id='mtwnote' class='authnote' onClick='swapTextEdit(event)'; onChange=updateAuth("+obj.auth_id+", 'mtw');>"+obj.note+"</div>";
						$('#mtw').removeClass("op5");
						break;
					case '44': //Armored Youth marshal
						if (obj.expire_date != null){
							tempDate = new Date(obj.expire_date);
							if (tempDate > marshaldate) marshaldate = tempDate;
						}
						marshalnotes = marshalnotes + "<div id='myo' class='catarmored smallicon twenty'></div><div id='myoissued' class='authdate'>"+obj.issued+"</div><div id='myonote' class='authnote' onClick='swapTextEdit(event)'; onChange=updateAuth("+obj.auth_id+",'myo');>"+obj.note+"</div>";
						$('#myo').removeClass("op5");
						break;
                    case '51': //Rapier Youth marshal
						if (obj.expire_date != null){
							tempDate = new Date(obj.expire_date);
							if (tempDate > marshaldate) marshaldate = tempDate;
						}
						marshalnotes = marshalnotes + "<div id='mry' class='catarmored smallicon twenty'></div><div id='mryissued' class='authdate'>"+obj.issued+"</div><div id='mrynote' class='authnote' onClick='swapTextEdit(event)'; onChange=updateAuth("+obj.auth_id+",'mry');>"+obj.note+"</div>";
						$('#mry').removeClass("op5");
						break;
					case '45':  //Cut and Thrust Marshal
						if (obj.expire_date != null){
							tempDate = new Date(obj.expire_date);
							if (tempDate > marshaldate) marshaldate = tempDate;
						}
						marshalnotes = marshalnotes + "<div id='mct' class='catarmored smallicon twenty'></div><div id='mctissued' class='authdate'>"+obj.issued+"</div><div id='mctnote' class='authnote' onClick='swapTextEdit(event)'; onChange=updateAuth("+obj.auth_id+",'mct');>"+obj.note+"</div>";
						$('#mct').removeClass("op5");
						break;
                    case '53':  //Hound Coursing Marshal
						if (obj.expire_date != null){
							tempDate = new Date(obj.expire_date);
							if (tempDate > marshaldate) marshaldate = tempDate;
						}
						marshalnotes = marshalnotes + "<div id='mhc' class='catarmored smallicon twenty'></div><div id='mhcissued' class='authdate'>"+obj.issued+"</div><div id='mhcnote' class='authnote' onClick='swapTextEdit(event)'; onChange=updateAuth("+obj.auth_id+",'mhc');>"+obj.note+"</div>";
						$('#mhc').removeClass("op5");
						break;
					case '46': //Clerk of Roster
						if (obj.expire_date != null){
							tempDate = new Date(obj.expire_date);
							if (tempDate > marshaldate) marshaldate = tempDate;
						}
						marshalnotes = marshalnotes + "<div id='cr' class='catarmored smallicon twenty'></div><div id='mctissued' class='authdate'>"+obj.issued+"</div><div id='mctnote' class='authnote' onClick='swapTextEdit(event)'; onChange=updateAuth("+obj.auth_id+",'cr');>"+obj.note+"</div>";
						$('#cr').removeClass("op5");
						break;
					case '47': //Kingdom Earl Marshal
						if (obj.expire_date != null){
							tempDate = new Date(obj.expire_date);
							if (tempDate > marshaldate) marshaldate = tempDate;
						}
						marshalnotes = marshalnotes + "<div id='kem' class='catarmored smallicon twenty'></div><div id='mctissued' class='authdate'>"+obj.issued+"</div><div id='mctnote' class='authnote' onClick='swapTextEdit(event)'; onChange=updateAuth("+obj.auth_id+",'kem');>"+obj.note+"</div>";
						$('#kem').removeClass("op5");
						break;
					default:
						break;
				}
			});


			if (marshaldate.getFullYear() > 1969){
				$('#marshalyear').text(marshaldate.getFullYear());
				$('#marshalmonth').text(monthNames[marshaldate.getMonth()]);
				$('#marshalmonth').attr('monthnum',armoreddate.getMonth());
				$('#marshalday').text(marshaldate.getDate()+1);
			} else if (marshaldate.getFullYear() == 1966) {
				$('#marshalyear').text('');
				$('#marshalmonth').text('');
				$('#marshalday').text('');
				$('#marshaldate').fadeTo( "slow" , 0.5, function() {
					// Animation complete.
				});
			} else {
				$('#marshalyear').text('');
				$('#marshalmonth').text('');
				$('#marshalday').text('');
			}
			$('#marshalnotesbox').html(marshalnotes);

			if (armoreddate.getFullYear() > 1969){
				$('#amoredyear').text(armoreddate.getFullYear());
				$('#amoredmonth').text(monthNames[armoreddate.getMonth()]);
				$('#amoredmonth').attr('monthnum',armoreddate.getMonth());
				$('#amoredday').text(armoreddate.getDate()+1);
			} else if (armoreddate.getFullYear() == 1966) {
				$('#amoredyear').text('');
				$('#amoredmonth').text('');
				$('#amoredday').text('');
				$('#amoreddate').fadeTo( "slow" , 0.5, function() {
					// Animation complete.
				  });
			} else {
				$('#amoredyear').text('');
				$('#amoredmonth').text('');
				$('#amoredday').text('');
				$('#amoreddate').removeClass('postdate');
				$('#amoreddate').addClass('expiredCard');
				$('#amoredmonth').removeClass('postmonth');
				$('#amoredmonth').addClass('expiredbox');
				$('#amoredmonth').text('expired');

			}
			$('#armorednotesbox').html(armorednotes);

			if (rapierdate.getFullYear() > 1969){
				$('#rapieryear').text(rapierdate.getFullYear());
				$('#rapiermonth').text(monthNames[rapierdate.getMonth()]);
				$('#rapiermonth').attr('monthnum',armoreddate.getMonth());
				$('#rapierday').text(rapierdate.getDate()+1);
			} else if (rapierdate.getFullYear() == 1966) {
				$('#rapieryear').text('');
				$('#rapiermonth').text('');
				$('#rapierday').text('');
				$('#rapierdate').fadeTo( "slow" , 0.5, function() {
					// Animation complete.
				  });
			} else {
				$('#rapieryear').text('');
				$('#rapiermonth').text('');
				$('#rapierday').text('');
			}
			$('#rapiernotesbox').html(rapiernotes);
            
			if (cantdate.getFullYear() > 1969){
				$('#cantyear').text(rapierdate.getFullYear());
				$('#cantmonth').text(monthNames[rapierdate.getMonth()]);
				$('#cantmonth').attr('monthnum',armoreddate.getMonth());
				$('#cantday').text(rapierdate.getDate()+1);
			} else if (rapierdate.getFullYear() == 1966) {
				$('#cantyear').text('');
				$('#cantmonth').text('');
				$('#cantday').text('');
				$('#cantdate').fadeTo( "slow" , 0.5, function() {
					// Animation complete.
				  });
			} else {
				$('#cantyear').text('');
				$('#cantmonth').text('');
				$('#cantday').text('');
			}
			$('#cantnotesbox').html(cantnotes);            
            

			if (youthdate.getFullYear() > 1969){
				$('#youthyear').text(youthdate.getFullYear());
				$('#youthmonth').text(monthNames[youthdate.getMonth()]);
				$('#youthmonth').attr('monthnum',armoreddate.getMonth());
				$('#youthday').text(youthdate.getDate()+1);
			} else {
				$('#youthyear').text('');
				$('#youthmonth').text('');
				$('#youthday').text('');
				$('#youthdate').fadeTo( "slow" , 0.5, function() {
					// Animation complete.
				  });
			}
			$('#youthnotesbox').html(youthnotes);

			if (eqdate.getFullYear() > 1969){
				$('#eqyear').text(eqdate.getFullYear());
				$('#eqmonth').text(monthNames[eqdate.getMonth()]);
				$('#eqmonth').attr('monthnum',armoreddate.getMonth());
				$('#eqday').text(eqdate.getDate()+1);
			} else if (eqdate.getFullYear() == 1966) {
				$('#eqyear').text('');
				$('#eqmonth').text('');
				$('#eqday').text('');
				$('#eqdate').fadeTo( "slow" , 0.5, function() {
					// Animation complete.
				  });
			} else {
				$('#eqyear').text('');
				$('#eqmonth').text('');
				$('#eqday').text('');
			}
			$('#eqnotesbox').html(eqnotes);

		},
		error: function (jqXHR, textStatus, errorThrown) {
			//alert("Error in buildPersonAuthsEdit: " + errorThrown);
		}
	});

}

function buildGroupHeader(groupId, regionId)
{
	var res = "";

	$.ajax({
		url: "http://www.castlewalls.com/auths/mid/groupheader.php",
		type: 'GET',
		contentType: "application/json",
		dataType: "json",
		data: {lId: groupId, rId: regionId},
		success: function (result) {

			$.each(result, function(idx, obj) {

				res = "<div id='namebox2'><div id='shireicon' class='largeicon2 largeshireicon'></div>";
				res = res + "<div id='name2'><div id='firstname2'>"+ obj.branch +"</div><div id='lastname'>"+ obj.region +"</div></div></div>";
				res = res + "<div class='filler'></div><div id='catarmored' class='cat catarmored' onClick='flipCat(event)'></div><div class='filler'></div>";
				res = res + "<div id='catrapier'  class='cat catrapier' onClick='flipCat(event)'></div><div class='filler'></div>";
				res = res + "<div id='cateq'      class='cat cateq' onClick='flipCat(event)'></div><div class='filler'></div>";
				res = res + "<div id='catyouth'   class='cat catyouth' onClick='flipCat(event)'></div>";
				res = res + "<div class='filler'></div><div id='catmarshal' class='cat catmarshal' onClick='flipCat(event)'></div>";

			});

			$("#groupheader").html(res);
		},
		error: function (jqXHR, textStatus, errorThrown) {
			//alert("Error buildGroupHeader:" + errorThrown);
		}
	});

	return res;

}

function buildGroupList(groupId, regionId)
{
	var res = "";
	var x = 0;
	var personId = 0;

	var armoredStr = "";
	var rapierStr = "";
	var eqStr = "";
	var youthStr = "";
	var marshalStr = "";



	$.ajax({
		url: "http://www.castlewalls.com/auths/mid/groupauths.php",
		type: 'GET',
		contentType: "application/json",
		dataType: "json",
		data: {lId: groupId, rId: regionId},
		success: function (result) {

			$.each(result, function(idx, obj){
				//p.person_id, first_SCA, last_SCA, category_id, a.type_id
				x++;

				if (personId != obj.person_id){

						//new person, close row, and start new.
						if (x > 1) {
							if (armoredStr.length == 0){
								armoredStr = "<div id='armored' class='armored catcard'><div id='caticons'><div id='armored' class='smallbutton smallicon'></div></div></div>";
							}
							if (rapierStr.length == 0){
								rapierStr = "<div id='rapier' class='rapier catcard'><div id='caticons'><div id='armored' class='smallbutton smallicon'></div></div></div>";
							}
							if (eqStr.length == 0){
								eqStr = "<div id='equestrian' class='eq catcard'><div id='caticons'><div id='armored' class='smallbutton smallicon'></div></div></div>";
							}
							if (youthStr.length == 0){
								youthStr = "<div id='youth' class='youth catcard'><div id='caticons'><div id='armored' class='smallbutton smallicon'></div></div></div>";
							}
							marshalStr = "<div id='marshal' class='marshal catcard'><div id='caticons'>" + marshalStr + "</div></div>";


							res = res + armoredStr + rapierStr + eqStr + youthStr + marshalStr + "</row>";
							res = res + "<row id='personrow"+ x +"' class='row'><div id='catcard' class='catcard' onClick='loadPersonFromURL("+ obj.person_id +");'><div class='listname'>" + unescape(obj.first_SCA) + " " + unescape(obj.last_SCA) + "</div></div>";

							armoredStr = "";
							rapierStr = "";
							eqStr = "";
							youthStr = "";
							marshalStr = "";
						} else {
							res = res + "<row id='personrow"+ x +"' class='row'><div id='catcard' class='catcard' onClick='loadPersonFromURL("+ obj.person_id +");'><div class='listname'>" + unescape(obj.first_SCA) + " " + unescape(obj.last_SCA) + "</div></div>";
						}
					}


					if (obj.category_id == 3 ){
						armoredStr = "<div id='armored' class='armored catcard'><div id='caticons'><div id='iarmored' class='catarmored smallbutton smallicon'></div></div></div>";
					}

					if (obj.category_id == 5){
						rapierStr = "<div id='rapier' class='rapier catcard'><div id='caticons'><div id='irapier' class='catrapier smallbutton smallicon'></div></div></div>";
					}

					if (obj.category_id == 8){
						eqStr = "<div id='equestrian' class='eq catcard'><div id='caticons'><div id='ieq' class='cateq smallbutton smallicon'></div></div></div>";
					}

					if (obj.category_id == 22 || obj.category_id == 24 || obj.category_id == 27){
						youthStr = "<div id='youth' class='youth catcard'><div id='caticons'><div id='iyouth' class='catyouth smallbutton smallicon'></div></div></div>";
					}

					if (obj.category_id == 1)
					{
						if (obj.type_id == 37) marshalStr = marshalStr + "<div id='mmar1' class='armoredicon smallbutton smallicon'></div>";
						if (obj.type_id == 38) marshalStr = marshalStr + "<div id='mmar1' class='camarshalicon smallbutton smallicon'></div>";
						if (obj.type_id == 39) marshalStr = marshalStr + "<div id='mmar2' class='rapiericon smallbutton smallicon'></div>";
						if (obj.type_id == 40) marshalStr = marshalStr + "<div id='mmar3' class='archeryicon smallbutton smallicon'></div>";
						if (obj.type_id == 41) marshalStr = marshalStr + "<div id='mmar4' class='equestrianicon smallbutton smallicon'></div>";
						if (obj.type_id == 42) marshalStr = marshalStr + "<div id='mmar5' class='siegeicon smallbutton smallicon'></div>";
						if (obj.type_id == 43) marshalStr = marshalStr + "<div id='mmar6' class='thorwnicon smallbutton smallicon'></div>";
						if (obj.type_id == 44) marshalStr = marshalStr + "<div id='mmar7' class='youthicon smallbutton smallicon'></div>";
					}


				personId = obj.person_id;
			});

			if (armoredStr.length == 0) armoredStr = "<div id='armored' class='armored catcard'><div id='caticons'><div id='armored' class='smallbutton smallicon'></div></div></div>";
			if (rapierStr.length == 0) rapierStr = "<div id='rapier' class='rapier catcard'><div id='caticons'><div id='armored' class='smallbutton smallicon'></div></div></div>";
			if (eqStr.length == 0) eqStr = "<div id='equestrian' class='eq catcard'><div id='caticons'><div id='armored' class='smallbutton smallicon'></div></div></div>";
			if (youthStr.length == 0) youthStr = "<div id='youth' class='youth catcard'><div id='caticons'><div id='armored' class='smallbutton smallicon'></div></div></div>";
			marshalStr = "<div id='marshal' class='marshal catcard'><div id='caticons'>" + marshalStr + "</div></div>";

			res = res + armoredStr + rapierStr + eqStr + youthStr + marshalStr + "</row>";


			$("#rows").html(res);
		},
		error: function (jqXHR, textStatus, errorThrown) {
			//alert("Error in buildGroupList: " + errorThrown);
		}
	});

	return res;

}

function getAuthDate(authid)
{
	ret = '';

	if (authid > 1 && authid < 10)
	{
		ret = $("#marshaldate")
	}

	return ret
}

function auth(event)
{
	var tid = event.target.id;
	var personId = $('#innerpersoncard').attr('pid');
	var authId = $('#'+ tid).attr('authid');
	//var issued = getAuthDate(authid);
	var userId = $.userName;
	var addremove = 1;
	//alert('pid:' + $('#personcard').attr('pid') + ' authid:' + $('#cs').attr('authid'));


	if (!$('#'+ tid).hasClass('op5'))
	{
		addremove = 0;
	}


	$.ajax({
		url: "http://www.castlewalls.com/auths/mid/addremoveauth.php",
		type: 'GET',
		contentType: "application/json",
		dataType: "json",
		data: {pId: personId, aId: authId, aFn: addremove, user: userId},
		success: function (result) {
			buildPersonAuths(personId);
		},
		error: function (jqXHR, textStatus, errorThrown) {
			alert("Error in auth: " + errorThrown + " " + textStatus + " " + authId);
		}
	});


	//return res;
}


function updateAuthExpireDate(typeId, expireDate, tagid)
{
	var personId = $('#innerpersoncard').attr('pid');

	var timestamp = Date.parse(expireDate);
	if (isNaN(timestamp) == true) return;

	$.ajax({
		url: "http://www.castlewalls.com/auths/mid/updateexpiredate.php",
		type: 'GET',
		contentType: "application/json",
		dataType: "json",
		data: {pId: personId, tId: typeId, e:expireDate},
		success: function (result) {
			//alert(result);
				//var newDate = new Date(expireDate);
				//var m = newDate.getMonth()+1;
				//var d = newDate.getDate()+1;

				//$('#' + tagid + 'month').text(monthNames[m-1]);
				//$('#' + tagid + 'day').text(d);
				//$('#' + tagid + 'year').text(newDate.getFullYear());

		},
		error: function (jqXHR, textStatus, errorThrown) {
			alert("Error updateAuthExpireDate:" + errorThrown);
		}
	});
}


function loginUser(username, pass)
{
	var rank = 0;
	var pId = 0;


	$.ajax({
		url: "http://www.castlewalls.com/auths/mid/login.php",
		type: 'GET',
		contentType: "application/json",
		dataType: "json",
		data: {uId: username, p: pass},
		success: function (result) {

			$.each(result, function(idx, obj){
				thisrank = obj.rank_id;
				pId = obj.person_id;
				$.userName = obj.first_SCA;

				//set rank to the highest rank the person has any card.
				if (thisrank != null)
				{
					if (parseInt(thisrank) > parseInt(rank))
					{
						rank = parseInt(thisrank);
					}
				}
			});

			if (pId > 0)
			{
				createCookie('mrm', '<session><rank>'+ rank +'</rank><pid>'+ pId +'</pid><username>'+ $.userName +'</username></session>',1);
				window.location.replace("authorization.html");
			} else {
				alert("Account information is invalid.");
			}

		},
		error: function (jqXHR, textStatus, errorThrown) {
			alert("Error updateAuthExpireDate:" + errorThrown);
		}
	});
}


function updatePerson()
{
	var gId = $('#editlocationname').attr('groupid');
	var personId = $('#innerpersoncard').attr('pid');
	var editfirstname = unescape($('#editfirstname').val());
	var editfirstlast = unescape($('#editfirstlast').val());
	var legalfirst = $('#legalfirst').val();
	var legallast = $('#legallast').val();
	var membernumber = $('#membernumber').val();
	var bod = $('#bod').val();
	var phonenum = $('#phonenum').val();
	var email = $('#email').val();
	var address1 = $('#address1').val();
	var address2 = $('#address2').val();
	var city = $('#city').val();
	var state = $('#state').val();
	var zip = $('#zip').val();
	var pie = $('#pie').val();

	var hpassword = $('#hpassword').val();
	var hpasswordconfirm = $('#hconfirmpassword').val();
	var passhash = '';

	if (hpassword.length > 3)
	{
		if(hpassword == hpasswordconfirm)
		{
			passhash = $().crypt({method:"md5",source:$("#hpassword").val()});
		}
	}

	if (zip.length < 5)
	{
		zip = '12345';
	}

	if(gId == 0)
	{
		//id='locationname' class='locname' branchid='" + obj.group_id +"'
		gId = "";
	}

	$.ajax({
		url: "http://www.castlewalls.com/auths/mid/updateperson.php",
		type: 'GET',
		contentType: "application/json",
		dataType: "json",
		data: {pId: personId, editfirstname: escape(editfirstname), editfirstlast: escape(editfirstlast), legalfirst: legalfirst, legallast: legallast, membernumber: membernumber, bod: bod, phonenum: phonenum, email: email, address1: address1, address2: address2, city: city, state: state, zip: zip, passhash: passhash, groupid: gId, pietext: pie},
		success: function (result) {
			//prompt(result, result);
		},
		error: function (jqXHR, textStatus, errorThrown) {
			alert("Error updatePerson:" + errorThrown);
		}
	});
}


function updateAuth(authid, authtype)
{
	//alert('authid: ' + authid + " authtype: " + authtype + " issued:" + $('#' + authtype + 'issued').text() + " note: " + $('#temptxt').val());

	$.ajax({
		url: "http://www.castlewalls.com/auths/mid/updateauth.php",
		type: 'GET',
		contentType: "application/json",
		dataType: "json",
		data: {aId: authid, authnote: $('#temptxt').val(), iss:$('#' + authtype + 'issued').text()},
		success: function (result) {
			//alert(result);
		},
		error: function (jqXHR, textStatus, errorThrown) {
			alert("Error updateAuth:" + errorThrown);
		}
	});

}


function populateLocations()
{
	var res = "";


	$.ajax({
		url: "http://www.castlewalls.com/auths/mid/locationsdropdown.php",
		type: 'GET',
		contentType: "application/json",
		dataType: "json",
		data: {},
		success: function (result) {

			$.each(result, function(idx, obj) {
				//alert(obj.login); group_id, branch, branch_type
				//res = res + <div class="locitem" onclick="changeLocation('Afonlyn');"><div class="shireicon"></div>Afonlyn</div>
				var icon = "";
				var onClick = "";

				if (obj.branch_type == "1") {
					icon = "shireicon";
				}

				if (obj.branch_type == "2") {
					icon = "baronyicon";
				}

				var branch = obj.branch;
				branch = branch.replace(/ /g, '_');
				res = res + "<div id='updateloc' groupId="+obj.group_id+" class='locitem' onClick=changeLocation('"+branch+"',"+obj.group_id+"); ><div class='" + icon + "'></div>" + obj.branch + "</div>";
			});

		},
		async:   false,
		error: function (jqXHR, textStatus, errorThrown) {
			alert("Error updateAuth:" + errorThrown);
		}
	});


	return res;
}


function getRegionByGroupID(groupId)
{
	var res = "";
	//groupId = $('#locationname').attr("branchid");

	$.ajax({
		url: "http://www.castlewalls.com/auths/mid/getregionbygroupid.php",
		type: 'GET',
		contentType: "application/json",
		dataType: "json",
		data: {gId: groupId},
		success: function (result) {

			$.each(result, function(idx, obj) {
				//alert('obj' + obj.region);
				$('#region').text(obj.region);
			});

		},
		error: function (jqXHR, textStatus, errorThrown) {
			alert("Error updateAuth:" + errorThrown);
		}
	});

	return res;
}



function getPersonNote(personId)
{

	$.ajax({
		url: "http://www.castlewalls.com/auths/mid/getpersonnote.php",
		type: 'GET',
		contentType: "application/json",
		dataType: "json",
		data: {pId: personId},
		success: function (result) {
            var personNote = "";
            
            $.each(result, function(idx, obj) {
                personNote = personNote + obj.person_note;
            });

            var note = "<div id='innerpersonnote' class='personcard' >";
            note = note + "<div id='personnoteicon'></div>";
            note = note + "<personnotetext>Person Note</personnotetext>";
            note = note + "<textarea placeholder='Enter note here...' id='personnotetxt' onKeyUp='delay(function(){updatePersonNote("+personId+");}, 1500 );' >"; 
            note = note + unescape(personNote) + "</textarea></div>";
            $("#personnote").html(note);         
            $("#personnote").hide();
            
            if (personNote.length > 2){    
                addPersonNote();
            } 
        },
		error: function (jqXHR, textStatus, errorThrown) {
			//alert("Error getPersonNote:" + errorThrown);
		}
	});    
    
}


function updatePersonNote(personId)
{
	//alert('authid: ' + authid + " authtype: " + authtype + " issued:" + $('#' + authtype + 'issued').text() + " note: " + $('#temptxt').val());

    var personnote = escape($('#personnotetxt').val());
    
	$.ajax({
		url: "http://www.castlewalls.com/auths/mid/updatepersonnote.php",
		type: 'GET',
		contentType: "application/json",
		dataType: "json",
		data: {pId: personId, txt: personnote},
		success: function (result) {
			//alert(result);
		},
		error: function (jqXHR, textStatus, errorThrown) {
			alert("Error updatePersonNote:" + errorThrown);
		}
	});
}
