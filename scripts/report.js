$(document).ready(function() {
    
    $('#alllocation').html(populateLocations());
    $('#allauthtype').html(populateAuthTypes());

    
});


function addfilter(tagname)
{
    $('#'+ tagname).after('<searchbox><filtertype><select><option value="authtype">----</option></select></filtertype><filterdata><select><option value="">----</option></select></filterdata><removebox onClick="$(this).parent().remove();"><removeicon></removeicon><removetext>Remove</removetext></removebox></searchbox>');
    
}

/*
function removefilter(this)
{
    $(this).remove();
}
*/

function authTypeDrop(tagname)
{

		if ($('#'+tagname).is(":visible"))
		{
			hideAuthTypeDrop(tagname);
		} else {
			$('#'+tagname).show();
			$('#editlocationname').css("-moz-border-radius","10px 10px 0px 0px");
			$('#editlocationname').css("border-radius","10px 10px 0px 0px");
		}
	
}

function hideAuthTypeDrop(tagname)
{
	$('#'+tagname).hide();
	$('#editlocationname').css("-moz-border-radius","10px 10px 10px 10px");
	$('#editlocationname').css("border-radius","10px 10px 10px 10px");
}


function locationDrop(tagname)
{

		if ($('#'+tagname).is(":visible"))
		{
			hideLocationDrop(tagname);
		} else {
			$('#'+tagname).show();
			$('#editlocationname').css("-moz-border-radius","10px 10px 0px 0px");
			$('#editlocationname').css("border-radius","10px 10px 0px 0px");
		}
	
}

function hideLocationDrop(tagname)
{
	$('#'+tagname).hide();
	$('#editlocationname').css("-moz-border-radius","10px 10px 10px 10px");
	$('#editlocationname').css("border-radius","10px 10px 10px 10px");
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