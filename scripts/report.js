var x = 0;

$(document).ready(function() {
    
    $('#alllocation').html(populateLocations());
    $('#allauthtype').html(populateAuthTypes());

    
});


function addfilter(tagname)
{
    // $(  "searchbox" ).clone().appendTo( "everythingbar" );
   $('#'+ tagname).after('<searchbox id="everythinsearch'+x+'">' +
                         '<locationdropdown id="allauthtype" class="allauthtype" style="display: none;"><div id="updateauthtype" authtypeid="1" class="locitem" onclick="changeType()" ;="">' +
                         '<div class=""></div> Please Select </div>' +
                         '<div id="updateauthtype" authtypeid="1" class="locitem" onclick="changeType()" ;=""><div class=""></div> Authorization</div>' +
                         '<div id="updateauthtype" authtypeid="1" class="locitem" onclick="changeType()" ;=""><div class=""></div> Location</div></locationdropdown><filtertype id="topfilter">' +
                         '<input id="edittype" class="authtype" groupid="0" value="" onclick="authTypeDrop("allauthtype","edittype")" onkeyup="" style="border-radius: 10px;"></filtertype>     <locationdropdown id="alllocation" class="allauthtype" style="display: none;"></locationdropdown><filterdata>'+                        
                         '<input id="editlocationname" class="locationtype" groupid="0" value="" onclick="locationDrop("alllocation", "editlocationname")" onkeyup="filterLocationDropDown()" style="border-radius: 10px;"></filterdata>'+
                         '<removebox onclick="$(this).parent().remove();"><removeicon></removeicon><removetext>Remove</removetext></removebox>'+            
                         '</searchbox>'); 
    
    x++;
}

/*
function removefilter(this)
{
    $(this).remove();
}
*/

function authTypeDrop(tagname, parenttag)
{

		if ($('#'+tagname).is(":visible"))
		{
			hideAuthTypeDrop(tagname, parenttag);
		} else {
			$('#'+tagname).show();
			$('#'+parenttag).css("-moz-border-radius","10px 10px 0px 0px");
			$('#'+parenttag).css("border-radius","10px 10px 0px 0px");
		}
	
}

function hideAuthTypeDrop(tagname, parenttag)
{
	$('#'+tagname).hide();
	$('#'+parenttag).css("-moz-border-radius","10px 10px 10px 10px");
	$('#'+parenttag).css("border-radius","10px 10px 10px 10px");
}


function locationDrop(tagname, parenttag)
{

		if ($('#'+tagname).is(":visible"))
		{
			hideLocationDrop(tagname, parenttag);
		} else {
			$('#'+tagname).show();
			$('#'+parenttag).css("-moz-border-radius","10px 10px 0px 0px");
			$('#'+parenttag).css("border-radius","10px 10px 0px 0px");
		}
	
}

function hideLocationDrop(tagname, parenttag)
{
	$('#'+tagname).hide();
	$('#'+parenttag).css("-moz-border-radius","10px 10px 10px 10px");
	$('#'+parenttag).css("border-radius","10px 10px 10px 10px");
}

function filterLocationDropDown()
{
	$('.locitem').hide() // hide all the selected elements
                 .filter(':icontains(' + $('#editlocationname').val()  + ')')
                 .show(); // show the filtered elements
}

//$('#locationdropdown').html(generateLocationDropDown());
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


function populateAuthTypes()
{
    var res = "";
  
    res = res + "<div id='updateauthtype' authTypeId='1' class='locitem' onClick='changeType()'; ><div class=''></div> Please Select </div>";    
    
    res = res + "<div id='updateauthtype' authTypeId='1' class='locitem' onClick='changeType()'; ><div class=''></div> Authorization</div>";

    res = res + "<div id='updateauthtype' authTypeId='1' class='locitem' onClick='changeType()'; ><div class=''></div> Location</div>";
    
    return res
}