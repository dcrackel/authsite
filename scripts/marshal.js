$(document).ready(function() {

	var s = readCookie('mrm');
	var xmlDoc = $.parseXML( s );
	var $xml = $( xmlDoc );

	$.pId = $xml.find('pid').text();
	$.rank = parseInt($xml.find('rank').text());
	$.userName = $xml.find('username').text();

	if ($.rank == 46 || $.rank == 47){
		$.inEditMode = true;
	}

	if ($.rank == 46 || $.rank == 47){
		$.canEdit = true;
	}

	if ($.pId.length > 1)
	{
	   $("loginbutton").html("<a href='' onClick=logOut() class='logout' style='text-decoration: none;'></a>");
       //$("#login").css('background-image','url("../images/logout.png")');
	}

    //clear pops for the editing the date area
    $(document).on('touchstart click', function (event) {
       	clearPops(event);
	});

	$(document).on("keypress", function(e) {
		 if (e.which == 13) {
			 if ($.session.changeDateBox) {
			 	changeTextToField($.session.changeDateBoxName, $("#" + $.session.changeDateBoxName + "date").attr('typeid'));
		     }
		 }
	});

	if (window.location.hash.length > 0)
	{
		var id = location.hash.replace('#', '');

		if(id.substring(0, 1) == 'g'){
			id = id.replace('g', '');
			loadList(id);

		} else if(id.substring(0, 1) == 'r'){
			id = id.replace('r', '');
			loadRegion(id);
		} else {
			loadPerson(id);
		}
	}

});

function generateCard()
{
	$("#printablecard").show();
    var img = document.getElementById('cardimage');  /// get image element
	img.setAttribute('crossOrigin', 'anonymous');

    html2canvas(document.querySelector("#printablecard")).then(function(canvas) {
    canvas.id = "cardcanvas";
        //document.body.appendChild(canvas);
  		img.src = canvas.toDataURL();                     /// update image
  		printCard();
    });
 	$("#printablecard").hide();
}

function printCard()
{
	$('#cardimage').width(315);
	$('#cardimage').height(350);
	$("#cardimage").printElement();
}


$(document).click(function(event) {
  	clearPopUp(event);
});

function logIn()
{
	var hash = $().crypt({method: "md5",source: $('#password').val()})
	loginUser($('#username').val(),hash);
}

function forwardToPerson()
{
	window.location.replace("person.html");
}

function forwardToList()
{
	window.location.replace("authorization.html");
}

function expandPersonalData(newuser)
{


	//if (!$.inEditMode) {
	if (!$.personalExpanded) {
		var firstname = $('#firstname').text();
		var lastname = $('#lastname').text();
		var groupname = $('#locationname').text();
		$.currentLocation = groupname;

	    $('#firstname').html("<input id='editfirstname' class='textinputbar' value='"+ firstname + "' onKeyUp='delay(function(){updatePerson();}, 1000 );' ></input>");
	    $('#lastname').html("<input id='editfirstlast'  class='textinputbar' value='"+ lastname + "' onKeyUp='delay(function(){updatePerson();}, 1000 );' ></input>");
		$('#locationname').html("<input id='editlocationname'  class='editlocname' groupId='0' value='"+ groupname + "' onClick='locationDrop()' onKeyUp='filterLocationDropDown()'></input>");
		$('#firstnamedesc').show();
		$('#lastnamedesc').show();

		$('#locationdropdown').html(generateLocationDropDown());

	    if (newuser) {
			$('#hiddenperson').show();
		} else {
	    	$('#hiddenperson').slideDown('slow');
		}
		$.personalExpanded = true;

	} else {

		var firstname = $('#editfirstname').val();
		var lastname = $('#editfirstlast').val();
		var groupname = $('#editlocationname').val();

		$('#firstnamedesc').hide();
		$('#lastnamedesc').hide();

		$('#firstname').text(firstname);
		$('#lastname').text(lastname);
		$('#locationname').text(groupname);
		$('#hiddenperson').slideUp('slow');
		hideLocationDrop();
		$.personalExpanded = false;
	}

}

function locationDrop()
{
	if ($('#editlocationname').val() == "Not Selected")
	{
		$('#editlocationname').val("");
	}

	if ($.inEditMode) {
		if ($('#locationdropdown').is(":visible"))
		{
			hideLocationDrop();
		} else {
			$('#locationdropdown').show();
			$('#editlocationname').css("-moz-border-radius","10px 10px 0px 0px");
			$('#editlocationname').css("border-radius","10px 10px 0px 0px");
		}
	}
}

function hideLocationDrop()
{
	$('#locationdropdown').hide();
	$('#editlocationname').css("-moz-border-radius","10px 10px 10px 10px");
	$('#editlocationname').css("border-radius","10px 10px 10px 10px");
}

function hideEverythingDrop()
{
	$('#everythingdropdown').hide();
}

function showEverythingDrop()
{
	if ($("#searchbox").val().length > 0)
	{
		$('#everythingdropdown').show();
	}
}

function changeLocation(locationName, group_id)
{

	$('#editlocationname').val(locationName.replace(/_/g,' '));
	$('#editlocationname').attr('groupid', group_id);
	$('#editlocationname').attr('value', locationName);
	updatePerson();
	getRegionByGroupID(group_id);
	hideLocationDrop();
}


function generateLocationDropDown()
{
	//var ret = "";

	/*for (i = 0; i < $.locations.length; i++) {
		var icon = "<div class='shireicon' />";

		if($.locationtypes[i] == 2) icon = "<div class='baronyicon' />";

		ret = ret + "<div class='locitem' onClick=changeLocation('"+$.locations[i]+"');>" + icon + $.locations[i] +"</div>";
	}*/

	return populateLocations();
}

function filterLocationDropDown()
{
	$('.locitem').hide() // hide all the selected elements
                 .filter(':icontains(' + $('#editlocationname').val()  + ')')
                 .show(); // show the filtered elements
}


function clearPopUp(event)
{

	if ($(event.target).attr("id") == "locationdropdown" || $(event.target).attr("id") == "editlocationname" || $(event.target).attr("id") == "everythingdropdown" ||  $(event.target).attr("id") == "searchbox")
	{

	} else {
		//hideLocationDrop();
		hideEverythingDrop();
	}

}

jQuery.expr[':'].icontains = function(a, i, m) {
  return jQuery(a).text().toUpperCase().indexOf(m[3].toUpperCase()) >= 0;
};


function flipCat(event)
{
	var target = event.target || event.srcElement;
	var id = target.id;
	id = id.substring(3);

	$('.' + id).toggle();

	if($('#' + target.id).hasClass('fade'))
	{
	  $('#' + target.id).removeClass('fade');
	} else {
	  $('#' + target.id).addClass('fade');
	}


};

function toggleVisibility(tagname)
{
	$("#" + tagname).toggle();
}


function generateEverythingDropDown()
{
	if ($("#searchbox").val().length == 0)
	{
		$("#everythingdropdown").hide();
	} else {

		getEverythingDropDownData($("#searchbox").val());
		$("#everythingdropdown").show();
	}
}

function loadPersonFromURL(personId)
{
	parent.location.hash = personId;
    
    if (window.location.href.indexOf('authorization.html') == -1)
    {
        //window.location = 'authorization.html#' + personId;
        window.location.replace("authorization.html#" + personId);
    }
    

	loadPerson(personId);
}


function loadPerson(personId)
{

	if (parseInt(personId) == 0)
	{
		addPerson();
		$("#listcard").hide();
		$("#personcard").show();

        buildPersonNote(personId);        
		$("#personote").show();
        
	} else if (parseInt(personId) == -1) {
		$("#searchbox").val("");
		$("#cardbox").hide();
		$("#personote").hide();
		$("#personcard").hide();

	} else {
        clearAuthTypesForReload();        
		buildPersonHeader(personId);
		$("#listcard").hide();
		$("#personcard").show();

        buildPersonNote(personId);        
        
		buildPersonAuths(personId);
		$("#cardbox").show();
	}

}

function addPersonNote()
{
    if($('#personnote').is(':visible')) {
        $('#personnote').hide();
    } else {
        $('#personnote').show();
    }
    
}

function loadListFromURL(groupId)
{
	parent.location.hash = 'g' + groupId;
    
    if (window.location.href.indexOf('authorization.html') == -1)
    {
        //window.location = 'authorization.html#' + personId;
        window.location.replace("authorization.html#g" + groupId);
    }
    
	loadList(groupId);
}

function loadList(groupId)
{
	$("#personcard").hide();
	$("#cardbox").hide();

	buildGroupHeader(groupId, 0);
	buildGroupList(groupId, 0);
	$("#listcard").show();
}

function loadRegionFromURL(regionId)
{
	parent.location.hash = 'r' + regionId;
    
    if (window.location.href.indexOf('authorization.html') == -1)
    {
        //window.location = 'authorization.html#' + personId;
        window.location.replace("authorization.html#r" + regionId);
    }
    
	loadRegion(regionId);
}

function loadRegion(regionId)
{
	$("#personcard").hide();
	$("#cardbox").hide();

	buildGroupHeader(0, regionId);
	buildGroupList(0, regionId);
	$("#listcard").show();
}


function getParameterByName(name) {
    name = name.replace(/[\[]/, "\\[").replace(/[\]]/, "\\]");
    var regex = new RegExp("[\\?&]" + name + "=([^&#]*)"),
        results = regex.exec(location.search);
    return results === null ? "" : decodeURIComponent(results[1].replace(/\+/g, " "));
}


function swapTextEdit(event){
		var objId = event.target.id;
        var text = $('#' + objId).text();
        $('#' + objId).text('');
        //$('<input type="text" value="' + text + '" id="temptxt" class="" maxlength="8"/>').appendTo($('#' + objId)).val(text).select().blur(
        $('<textarea cols="20" rows="4" id="temptxt" class="tmptext">"' + text + '"</textarea>').appendTo($('#' + objId)).val(text).focus().focusout(
        function () {
            var newText = $('#temptxt').val();  //.attr('value');
            $('#' + objId).text(newText).find('textarea').remove();

        });

}

function setCaretToPos (input, pos) {
  setSelectionRange(input, pos, pos);
}

function setSelectionRange(input, selectionStart, selectionEnd) {
  if (input.setSelectionRange) {
    input.focus();
    input.setSelectionRange(selectionStart, selectionEnd);
  }
  else if (input.createTextRange) {
    var range = input.createTextRange();
    range.collapse(true);
    range.moveEnd('character', selectionEnd);
    range.moveStart('character', selectionStart);
    range.select();
  }
}

function changeToTextField(tagid, typeid)
{
	//if (!$.session.changeDateBox) {
            if ($('#' + tagid + "txt").length){

            } else {
				//alert($('#' + tagid + 'date').css('opacity'));
				if ($('#' + tagid + 'date').css('opacity') == '0.5') return;
                var expmonth = $('#' + tagid + 'date').find(".postmonth").attr("monthnum");
                var expday = $('#' + tagid  + 'date').find(".postday").text();
                var expyear = $('#' + tagid  + 'date').find(".vtext").text();

                var m = parseInt(expmonth) + 1;

				var t = m + "/" + expday + "/" + expyear;
                //$('#' + tagid).text('').append($('<input />',{'value' : t}).val(t));
                $('#' + tagid + 'date').html('<input id="'+tagid +'txt" class="dateeditbox" value="' + t + '">');

			 };
			 $.session.changeDateBox = true;
             $.session.changeDateBoxName = tagid;
	//}
}

    function clearPops(event) {
      //  alert("clicked: " + event.target.id + " nodeName=" + event.target.nodeName + "\n " + $(event.target).parent().attr('id') + " " + $(event.target).parent().parent().parent().attr('id'));
      //  alert(event.srcElement.nodeName + " " + event.srcElement.id);

        if ($.session.browser == "Explorer") {

            if (event.srcElement.nodeName == "STAFFLOCATION" || event.srcElement.id == "locationdownarrow" || event.srcElement.nodeName == "DEFAULTSELECTION") {
                 //do nothing
            } else {

            }
        } else {

            if (event.target.nodeName == "INPUT" || event.target.id.indexOf('month') > -1 || event.target.id.indexOf('day') > -1 || event.target.id.indexOf('year') > -1) {
                //do nothing
                //alert("clicked: " + event.target.id + " nodeName=" + event.target.nodeName + "\n " + $(event.target).parent().attr('id') + " " + $(event.target).parent().parent().parent().attr('id'));
            } else {

				if ($.session.changeDateBox){
					//alert('this is it:' + $(event.target).attr('prefix') + "  " + event.target.id );
					changeTextToField($("#" + $.session.changeDateBoxName + "date").attr('prefix'), $("#" + $.session.changeDateBoxName + "date").attr('typeid'));
					$.session.changeDateBox = false;
				}
            }

        }

    }

function changeTextToField(tagid, typeid)
{
	//alert($("#" + $.session.changeDateBoxName + "date").attr('prefix'));
	$.session.changeDateBox = false;

   	var strDate = $('#'+tagid+'txt').val();
   	if (typeof strDate === "undefined") {
		return;
	}

	var res = strDate.split("/");
	var intM = parseInt(res[0])-1;
	var expmonth = monthNames[intM];
    var expday = res[1];
    var expyear = res[2];

	updateAuthExpireDate(typeid, expyear + '-' + (intM+1) + '-' + expday, tagid);

    $('#' + tagid + 'date').html('<div id="'+tagid+'month" class="postmonth" monthnum="'+intM+'">'+expmonth+'</div><div id="'+tagid+'day" class="postday">'+expday+'</div><div id="'+tagid+'year" class="vtext">'+expyear+'</div>');

}


function popCalendar(tagid, typeid)
{
	var d = new Date();
	var n = d.getFullYear();


    // Initialise the datepicker
	$('#' + tagid).mobiscroll().date({
		dateFormat: 'M dd, yyyy',
		theme: 'wp',
		accent: 'none',
		display: 'bubble',
		mode: 'mixed',
		Animation: 'fade',
		endYear: n + 5,
		onShow: function () {
			$(this).mobiscroll('setDate', new Date(), false);
		},
	    onSelect: function (valueText, inst) {
                //$('#' + tagname).text(valueText);
				changeAuthExpDate(tagid, valueText, typeid);
        }

	});


    $('#amoreddate').mobiscroll('show');
    return false;
}


function changeAuthExpDate(tagid, valueText, typeid)
{
	var newDate = new Date(valueText);
	var m = newDate.getMonth()+1;
	var d = newDate.getDate();

	updateAuthExpireDate(typeid, newDate.getFullYear() + '-' + m + '-' + d, tagid);
}

function logOut()
{
	eraseCookie('mrm');
}


var delay = (function(){
  var timer = 0;
  return function(callback, ms){
    clearTimeout (timer);
    timer = setTimeout(callback, ms);
  };
})();


function check()
{
	if ($('#username').val().length > 5 && $('#password').val().length > 5)
	{
		$('#signin').css('border-color','#ea0001')
		$('#signin').css('background-color', '#800000');
		$('#signin').css('color', '#FFFFFF');
	} else {
		$('#signin').css('border-color','rgb( 186, 186, 186 )')
		$('#signin').css('background-color', '#FFFFFF');
		$('#signin').css('color', 'rgb( 186, 186, 186 )');
	}
}


