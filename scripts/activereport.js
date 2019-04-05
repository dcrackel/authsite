var selectedRegion = 0;
var selectedAuth = 0;
    isLoggedIn();

function isLoggedIn()
{
	 var s = readCookie('mrm');
	var xmlDoc = $.parseXML( s );
	var $xml = $( xmlDoc );

	$.pId = $xml.find('pid').text();
	$.rank = parseInt($xml.find('rank').text());
	$.userName = $xml.find('username').text();
    $.loggedInUserName = "";
    
	if ($.rank == 46 || $.rank == 47){
		$.inEditMode = true;
	}

	if ($.rank == 46 || $.rank == 47){
		$.canEdit = true;
	} 
    
    if (!$.inEditMode) window.location.href = "https://marshaldb.midrealm.org/authorization.html";
}

function rowClick(pid)
{
    window.location.href = "https://marshaldb.midrealm.org/authorization.html#"+pid;
}

function selectRegion(region)
{
    resetRegion();
    $('region'+region).removeClass('region'+region).addClass('region'+region+'select');
    selectedRegion = region;
    shouldRunReport();
}

function resetRegion()
{
    for(var i = 1; i<6;i++){
        $('region'+i).removeClass('region'+i+'select').addClass('region'+i);
    } 
}

function selectAuthType(authType)
{
    resetAuthTypes();
    $('authType'+authType).removeClass('authType'+authType).addClass('authType'+authType+'select');
    selectedAuth = authType;
    shouldRunReport();
}

function resetAuthTypes()
{
    for(var i = 1; i<9;i++){
        $('authType'+i).removeClass('authType'+i+'select').addClass('authType'+i);
    } 
}

function shouldRunReport()
{
    if (selectedRegion > 0 && selectedAuth > 0) populateReport();
}


function populateReport()
{
	var res = "";
    var lastPersonId = 0;
    var lastName = "";
    var lastBranch = "";

	$.ajax({
		url: "https://marshaldb.midrealm.org/mid/dynamicreport.php?rId="+selectedRegion+"&aId="+selectedAuth,
		type: 'GET',
		contentType: "application/json",
		dataType: "json",
		data: {},
		success: function (result) {
            var auths = [];
            var extraStyle = "expired";
			$.each(result, function(idx, obj) {                    
               if (lastPersonId == 0){
                   res += buildHeader();
               } 
               if (obj.person_id == 4960)
                   console.log("hello there");
               if ((obj.person_id != lastPersonId) && (lastPersonId != 0)){         
                   extraStyle = "expired";
                   var expireDate = new Date (obj.expire_date);                  
                   var today = new Date();
                   if (lastExpire > today) extraStyle = "";  
                    res += "<reportrow><rowdata onClick='rowClick("+lastPersonId+")'><rowitem id='sca' class='"+ extraStyle +"'>" + lastName +"</rowitem><rowitem id='branch'>"+lastBranch+"</rowitem>";
                    res += "</rowdata><rowcheckboxes>" + makeCheckBoxes(auths, lastPersonId) + "</rowcheckboxes></reportrow>";
                    auths = [];
                    
               }
                 if (obj.person_id == 4960)
                   console.log("hello there");
               

               auths.push(obj.type_id);
               lastPersonId = obj.person_id;
               lastExpire = new Date (obj.expire_date);
               lastName = obj.first_SCA.replace(/\%20/g, ' ') + " " + obj.last_SCA.replace(/\%20/g, ' ');
               lastBranch = obj.branch
			});
            
            res += "<reportrow><rowdata onClick='rowClick("+lastPersonId+")'><rowitem id='sca'>" + lastName +"</rowitem><rowitem id='branch'>"+lastBranch+"</rowitem>";
            res += "</rowdata><rowcheckboxes>" + makeCheckBoxes(auths, lastPersonId) + "</rowcheckboxes></reportrow>";
            
            res += "</reportrow>";
            $('reportbody').html(res);
		},
		error: function (jqXHR, textStatus, errorThrown) {
			alert("Error updateAuth:" + errorThrown);
		}
	});
    
	return res;
}

function auth(authId, personId)
{
	var tid = event.target.id;
	var userId = 'testApp'; 
	var addremove = 0; //is delete
    
    var isCheck = $("#at" + authId).prop('checked');
    if ($("#at" + authId).prop('checked'))
    {
        addremove = 1;
    }

	$.ajax({
		url: server + "addremoveauth.php",
		type: 'GET',
		contentType: "application/json",
		dataType: "json",
		data: {pId: personId, aId: authId, aFn: addremove, user: userId},
		success: function (result) {
			//buildPersonAuths(personId);
            //alert(result);
		},
		error: function (jqXHR, textStatus, errorThrown) {
			alert("Error in auth: " + errorThrown + " " + textStatus + " " + authId);
		}
	});

}

function buildHeader(auths)
{
    var res = "";
    
    if (selectedAuth == 1) res = buildMarshalHeader();
    if (selectedAuth == 3) res = buildArmoredHeader();
    if (selectedAuth == 5) res = buildRapierHeader();
    if (selectedAuth == 6) res = buildYouthHeader();
    if (selectedAuth == 8) res = buildHorseyHeader();
    
    return res;
}


function buildArmoredHeader()
{ 
    var ret = "<reportrow2><rowdata><rowitem id=''></rowitem><rowitem id=''></rowitem></rowdata><rowcheckboxes>";
        ret += "<rowitem id='authtype'><div id='ssh' class='catarmored smallicon twenty container2'></div></rowitem>";
        ret += "<rowitem id='authtype'><div id='tw' class='catarmored smallicon twenty container2'></div></rowitem>";
        ret += "<rowitem id='authtype'><div id='gs' class='catarmored smallicon twenty container2'></div></rowitem>";
        ret += "<rowitem id='authtype'><div id='sp' class='catarmored smallicon twenty container2'></div></rowitem>";
        ret += "<rowitem id='authtype'><div id='pr' class='catarmored smallicon twenty container2'></div></rowitem>";
        ret += "<rowitem id='authtype'><div id='ysp' class='catarmored smallicon twenty container2'></div></rowitem>";
        ret += "<rowitem id='authtype'><div id='ca' class='catarmored smallicon twenty container2'></div></rowitem>";
        ret += "<rowitem id='authtype'><div id='sc' class='catarmored smallicon twenty container2'></div></rowitem>";
        ret += "<rowitem id='authtype'><div id='se' class='catarmored smallicon twenty container2'></div></rowitem>";       
        ret += "</rowcheckboxes></reportrow2>";
   
    
    return ret;
}

function buildRapierHeader()
{ //rapier ids 12sr 16da 15pd 17cs 18ls 19ep 20c&t 52youthspar
    var ret = "<reportrow2><rowdata><rowitem id=''></rowitem><rowitem id=''></rowitem></rowdata><rowcheckboxes>";
        ret += "<rowitem id='authtype'><div id='sr' class='catarmored smallicon twenty container2'></div></rowitem>";
        ret += "<rowitem id='authtype'><div id='da' class='catarmored smallicon twenty container2'></div></rowitem>";
        ret += "<rowitem id='authtype'><div id='pd' class='catarmored smallicon twenty container2'></div></rowitem>";
        ret += "<rowitem id='authtype'><div id='cs' class='catarmored smallicon twenty container2'></div></rowitem>";
        ret += "<rowitem id='authtype'><div id='ls' class='catarmored smallicon twenty container2'></div></rowitem>";
        ret += "<rowitem id='authtype'><div id='yrs' class='catarmored smallicon twenty container2'></div></rowitem>";
        ret += "<rowitem id='authtype'><div id='cut' class='catarmored smallicon twenty container2'></div></rowitem>";
        ret += "</rowcheckboxes></reportrow2>";
    
    return ret;
}

function buildHorseyHeader()
{
    var ret = "<reportrow2><rowdata><rowitem id=''></rowitem><rowitem id=''></rowitem></rowdata><rowcheckboxes>";
        ret += "<rowitem id='authtype'><div id='gr' class='catarmored smallicon twenty container2'></div></rowitem>";
        ret += "<rowitem id='authtype'><div id='mg' class='catarmored smallicon twenty container2'></div></rowitem>";
        ret += "<rowitem id='authtype'><div id='ma' class='catarmored smallicon twenty container2'></div></rowitem>";
        ret += "<rowitem id='authtype'><div id='dr' class='catarmored smallicon twenty container2'></div></rowitem>";
        ret += "<rowitem id='authtype'><div id='cc' class='catarmored smallicon twenty container2'></div></rowitem>";
        ret += "<rowitem id='authtype'><div id='mc' class='catarmored smallicon twenty container2'></div></rowitem>";
        ret += "<rowitem id='authtype'><div id='js' class='catarmored smallicon twenty container2'></div></rowitem>";
        ret += "</rowcheckboxes></reportrow2>";
    
    return ret;
}

function buildYouthHeader()
{
    var ret = "<reportrow2><rowdata><rowitem id=''></rowitem><rowitem id=''></rowitem></rowdata><rowcheckboxes>";
        ret += "<rowitem id='authtype'><div id='div1' class='catarmored smallicon twenty container2'></div></rowitem>";
        ret += "<rowitem id='authtype'><div id='divrp' class='catarmored smallicon twenty container2'></div></rowitem>";
        ret += "<rowitem id='authtype'><div id='div2' class='catarmored smallicon twenty container2'></div></rowitem>";
        ret += "<rowitem id='authtype'><div id='div22h' class='catarmored smallicon twenty container2'></div></rowitem>";
        ret += "<rowitem id='authtype'><div id='divrp' class='catarmored smallicon twenty container2'></div></rowitem>";
        ret += "<rowitem id='authtype'><div id='div3' class='catarmored smallicon twenty container2'></div></rowitem>";
        ret += "<rowitem id='authtype'><div id='div32h' class='catarmored smallicon twenty container2'></div></rowitem>";
        ret += "<rowitem id='authtype'><div id='div3rp' class='catarmored smallicon twenty container2'></div></rowitem>";
        ret += "</rowcheckboxes></reportrow2>";
    
    return ret;
}

function buildMarshalHeader()
{ //37 armored 38 ca 39 rapier 40 archer 41 horse 42 seige 43 thrown 44 armored youth 51 youth rapier 53 hound
    var ret = "<reportrow2><rowdata><rowitem id=''></rowitem><rowitem id=''></rowitem></rowdata><rowcheckboxes>";
        ret += "<rowitem id='authtype'><div id='mar' class='catarmored smallicon twenty container2'></div></rowitem>";
        ret += "<rowitem id='authtype'><div id='cae' class='catarmored smallicon twenty container2'></div></rowitem>";
        ret += "<rowitem id='authtype'><div id='mrp' class='catarmored smallicon twenty container2'></div></rowitem>";
        ret += "<rowitem id='authtype'><div id='mac' class='catarmored smallicon twenty container2'></div></rowitem>";
        ret += "<rowitem id='authtype'><div id='meq' class='catarmored smallicon twenty container2'></div></rowitem>";
        ret += "<rowitem id='authtype'><div id='mse' class='catarmored smallicon twenty container2'></div></rowitem>";
        ret += "<rowitem id='authtype'><div id='mtw' class='catarmored smallicon twenty container2'></div></rowitem>";
        ret += "<rowitem id='authtype'><div id='myo' class='catarmored smallicon twenty container2'></div></rowitem>";
        ret += "<rowitem id='authtype'><div id='mry' class='catarmored smallicon twenty container2'></div></rowitem>";
        ret += "<rowitem id='authtype'><div id='mhc' class='catarmored smallicon twenty container2'></div></rowitem>";
        ret += "</rowcheckboxes></reportrow2>";
    
    return ret;
}


function makeCheckBoxes(auths, pid)
{
    var res = "";
    
    if (selectedAuth == 1) res = makeMarshalCheckedBoxes(auths, pid);
    if (selectedAuth == 3) res = makeArmoredCheckedBoxes(auths, pid);
    if (selectedAuth == 5) res = makeRapierCheckedBoxes(auths, pid);
    if (selectedAuth == 6) res = makeYouthCheckedBoxes(auths, pid);
    if (selectedAuth == 8) res = makeHorseyCheckedBoxes(auths, pid);
    
    return res;
}

function makeArmoredCheckedBoxes(auths, pid)
{
    var ret = "";
    ret += "<rowitem id='authtype'><label class='container'><input id='at1' type='checkbox' onChange='auth(1,"+pid+")' "; 
    if ($.inArray("1", auths) > -1) ret += " checked='checked' ";
    ret += "><span class='checkmark'></span></label></rowitem>";
        
    ret += "<rowitem id='authtype'><label class='container'><input id='2' authid='' type='checkbox'";
    if ($.inArray("2", auths) > -1) ret += " checked='checked' ";
    ret += "><span class='checkmark'></span></label></rowitem>";
    
    ret += "<rowitem id='authtype'><label class='container'><input id='3' authid='' type='checkbox'";
    if ($.inArray("3", auths) > -1) ret += " checked='checked' ";
    ret += "><span class='checkmark'></span></label></rowitem>";
    
    ret += "<rowitem id='authtype'><label class='container'><input id='4' authid='' type='checkbox'";
    if ($.inArray("4", auths) > -1) ret += " checked='checked' ";
    ret += "><span class='checkmark'></span></label></rowitem>";
    
    ret += "<rowitem id='authtype'><label class='container'><input id='5' authid='' type='checkbox'";
    if ($.inArray("5", auths) > -1) ret += " checked='checked' ";
    ret += "><span class='checkmark'></span></label></rowitem>";
    
    ret += "<rowitem id='authtype'><label class='container'><input id='6' authid='' type='checkbox'";
    if ($.inArray("6", auths) > -1) ret += " checked='checked' ";
    ret += "><span class='checkmark'></span></label></rowitem>";
    
    ret += "<rowitem id='authtype'><label class='container'><input id='9' authid='' type='checkbox'";
    if ($.inArray("9", auths) > -1) ret += " checked='checked' ";
    ret += "><span class='checkmark'></span></label></rowitem>";
    
    ret += "<rowitem id='authtype'><label class='container'><input id='10' authid='' type='checkbox'";
    if ($.inArray("10", auths) > -1) ret += " checked='checked' ";
    ret += "><span class='checkmark'></span></label></rowitem>";
    
    ret += "<rowitem id='authtype'><label class='container'><input id='11' authid='' type='checkbox'";
    if ($.inArray("11", auths) > -1) ret += " checked='checked' ";    
    ret += "><span class='checkmark'></span></label></rowitem>";
    
    return ret;
}

//rapier ids 12 15 16 17 18 19 20 52
function makeRapierCheckedBoxes(auths)
{
    var ret = "";
    ret += "<rowitem id='authtype'><label class='container'><input id='12' authid='' type='checkbox'"; 
    if ($.inArray("12", auths) > -1) ret += " checked='checked' ";
    ret += "><span class='checkmark'></span></label></rowitem>";
        
    ret += "<rowitem id='authtype'><label class='container'><input id='15' authid='' type='checkbox'";
    if ($.inArray("15", auths) > -1) ret += " checked='checked' ";
    ret += "><span class='checkmark'></span></label></rowitem>";
    
    ret += "<rowitem id='authtype'><label class='container'><input id='16' authid='' type='checkbox'";
    if ($.inArray("16", auths) > -1) ret += " checked='checked' ";
    ret += "><span class='checkmark'></span></label></rowitem>";
    
    ret += "<rowitem id='authtype'><label class='container'><input id='17' authid='' type='checkbox'";
    if ($.inArray("17", auths) > -1) ret += " checked='checked' ";
    ret += "><span class='checkmark'></span></label></rowitem>";
    
    ret += "<rowitem id='authtype'><label class='container'><input id='18' authid='' type='checkbox'";
    if ($.inArray("18", auths) > -1) ret += " checked='checked' ";
    ret += "><span class='checkmark'></span></label></rowitem>";
    
    /* ret += "<rowitem id='authtype'><label class='container'><input id='19' authid='' type='checkbox'";
    if ($.inArray("19", auths) > -1) ret += " checked='checked' "; //19 is epee Midrealm doesn't approve
    ret += "><span class='checkmark'></span></label></rowitem>"; */
    
    ret += "<rowitem id='authtype'><label class='container'><input id='20' authid='' type='checkbox'";
    if ($.inArray("20", auths) > -1) ret += " checked='checked' ";
    ret += "><span class='checkmark'></span></label></rowitem>";
    
    ret += "<rowitem id='authtype'><label class='container'><input id='52' authid='' type='checkbox'";
    if ($.inArray("52", auths) > -1) ret += " checked='checked' ";
    ret += "><span class='checkmark'></span></label></rowitem>";
    
    return ret;
}

//youth auths type6: 22 23 24 25 26 27 28 29
function makeYouthCheckedBoxes(auths)
{
    var ret = "";
    ret += "<rowitem id='authtype'><label class='container'><input id='22' authid='' type='checkbox'"; 
    if ($.inArray("22", auths) > -1) ret += " checked='checked' ";
    ret += "><span class='checkmark'></span></label></rowitem>";
        
    ret += "<rowitem id='authtype'><label class='container'><input id='23' authid='' type='checkbox'";
    if ($.inArray("23", auths) > -1) ret += " checked='checked' ";
    ret += "><span class='checkmark'></span></label></rowitem>";
    
    ret += "<rowitem id='authtype'><label class='container'><input id='24' authid='' type='checkbox'";
    if ($.inArray("24", auths) > -1) ret += " checked='checked' ";
    ret += "><span class='checkmark'></span></label></rowitem>";
    
    ret += "<rowitem id='authtype'><label class='container'><input id='25' authid='' type='checkbox'";
    if ($.inArray("25", auths) > -1) ret += " checked='checked' ";
    ret += "><span class='checkmark'></span></label></rowitem>";
    
    ret += "<rowitem id='authtype'><label class='container'><input id='26' authid='' type='checkbox'";
    if ($.inArray("26", auths) > -1) ret += " checked='checked' ";
    ret += "><span class='checkmark'></span></label></rowitem>";
    
    ret += "<rowitem id='authtype'><label class='container'><input id='27' authid='' type='checkbox'";
    if ($.inArray("27", auths) > -1) ret += " checked='checked' ";
    ret += "><span class='checkmark'></span></label></rowitem>";
    
    ret += "<rowitem id='authtype'><label class='container'><input id='28' authid='' type='checkbox'";
    if ($.inArray("28", auths) > -1) ret += " checked='checked' ";
    ret += "><span class='checkmark'></span></label></rowitem>";
    
    ret += "<rowitem id='authtype'><label class='container'><input id='29' authid='' type='checkbox'";
    if ($.inArray("29", auths) > -1) ret += " checked='checked' ";
    ret += "><span class='checkmark'></span></label></rowitem>";
    
    return ret;
}

//horsey types: 30 31 32 33 34 35 36
function makeHorseyCheckedBoxes(auths)
{
    var ret = "";
    ret += "<rowitem id='authtype'><label class='container'><input id='30' authid='' type='checkbox'"; 
    if ($.inArray("30", auths) > -1) ret += " checked='checked' ";
    ret += "><span class='checkmark'></span></label></rowitem>";
        
    ret += "<rowitem id='authtype'><label class='container'><input id='31' authid='' type='checkbox'";
    if ($.inArray("31", auths) > -1) ret += " checked='checked' ";
    ret += "><span class='checkmark'></span></label></rowitem>";
    
    ret += "<rowitem id='authtype'><label class='container'><input id='32' authid='' type='checkbox'";
    if ($.inArray("32", auths) > -1) ret += " checked='checked' ";
    ret += "><span class='checkmark'></span></label></rowitem>";
    
    ret += "<rowitem id='authtype'><label class='container'><input id='33' authid='' type='checkbox'";
    if ($.inArray("33", auths) > -1) ret += " checked='checked' ";
    ret += "><span class='checkmark'></span></label></rowitem>";
    
    ret += "<rowitem id='authtype'><label class='container'><input id='34' authid='' type='checkbox'";
    if ($.inArray("34", auths) > -1) ret += " checked='checked' ";
    ret += "><span class='checkmark'></span></label></rowitem>";
    
    ret += "<rowitem id='authtype'><label class='container'><input id='35' authid='' type='checkbox'";
    if ($.inArray("35", auths) > -1) ret += " checked='checked' ";
    ret += "><span class='checkmark'></span></label></rowitem>";
    
    ret += "<rowitem id='authtype'><label class='container'><input id='36' authid='' type='checkbox'";
    if ($.inArray("36", auths) > -1) ret += " checked='checked' ";
    ret += "><span class='checkmark'></span></label></rowitem>";
        
    return ret;
}

//37 armored 38 ca 39 rapier 40 archer 41 horse 42 seige 43 thrown 44 armored youth 51 youth rapier 53 hound
function makeMarshalCheckedBoxes(auths)
{
    var ret = "";
    ret += "<rowitem id='authtype'><label class='container'><input id='37' authid='' type='checkbox'"; 
    if ($.inArray("37", auths) > -1) ret += " checked='checked' ";
    ret += "><span class='checkmark'></span></label></rowitem>";
        
    ret += "<rowitem id='authtype'><label class='container'><input id='38' authid='' type='checkbox'";
    if ($.inArray("38", auths) > -1) ret += " checked='checked' ";
    ret += "><span class='checkmark'></span></label></rowitem>";
    
    ret += "<rowitem id='authtype'><label class='container'><input id='39' authid='' type='checkbox'";
    if ($.inArray("39", auths) > -1) ret += " checked='checked' ";
    ret += "><span class='checkmark'></span></label></rowitem>";
    
    ret += "<rowitem id='authtype'><label class='container'><input id='40' authid='' type='checkbox'";
    if ($.inArray("40", auths) > -1) ret += " checked='checked' ";
    ret += "><span class='checkmark'></span></label></rowitem>";
    
    ret += "<rowitem id='authtype'><label class='container'><input id='41' authid='' type='checkbox'";
    if ($.inArray("41", auths) > -1) ret += " checked='checked' ";
    ret += "><span class='checkmark'></span></label></rowitem>";
    
    ret += "<rowitem id='authtype'><label class='container'><input id='42' authid='' type='checkbox'";
    if ($.inArray("42", auths) > -1) ret += " checked='checked' ";
    ret += "><span class='checkmark'></span></label></rowitem>";
    
    ret += "<rowitem id='authtype'><label class='container'><input id='43' authid='' type='checkbox'";
    if ($.inArray("43", auths) > -1) ret += " checked='checked' ";
    ret += "><span class='checkmark'></span></label></rowitem>";
        
    ret += "<rowitem id='authtype'><label class='container'><input id='44' authid='' type='checkbox'";
    if ($.inArray("44", auths) > -1) ret += " checked='checked' ";
    ret += "><span class='checkmark'></span></label></rowitem>";
    
    /*ret += "<rowitem id='authtype'><label class='container'><input id='45' authid='' type='checkbox'";
    if ($.inArray("45", auths) > -1) ret += " checked='checked' ";
    ret += "><span class='checkmark'></span></label></rowitem>";
    
    ret += "<rowitem id='authtype'><label class='container'><input id='46' authid='' type='checkbox'";
    if ($.inArray("46", auths) > -1) ret += " checked='checked' ";
    ret += "><span class='checkmark'></span></label></rowitem>";
    
    ret += "<rowitem id='authtype'><label class='container'><input id='47' authid='' type='checkbox'";
    if ($.inArray("47", auths) > -1) ret += " checked='checked' ";
    ret += "><span class='checkmark'></span></label></rowitem>"; */
    
    ret += "<rowitem id='authtype'><label class='container'><input id='51' authid='' type='checkbox'";
    if ($.inArray("51", auths) > -1) ret += " checked='checked' ";
    ret += "><span class='checkmark'></span></label></rowitem>";
    
    ret += "<rowitem id='authtype'><label class='container'><input id='53' authid='' type='checkbox'";
    if ($.inArray("53", auths) > -1) ret += " checked='checked' ";
    ret += "><span class='checkmark'></span></label></rowitem>";
    
    return ret;
}