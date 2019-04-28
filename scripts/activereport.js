var selectedRegion = 0;
var selectedAuth = 0;
isLoggedIn();
var personAuths = new Array();

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

function filterReportData()
{ 
    var value = $("#activereportfilter").val().toLowerCase();
    $("reportrow").filter(function() {
      $(this).toggle($(this).text().toLowerCase().indexOf(value) > -1)
    });
}

function clearField()
{
    if ($("#activereportfilter").val() == "Type here to filter results...")
    {
        $("#activereportfilter").val("");
    }
}

function addToAuthArray(auth)
{
    var found = false;
    //look over collection to see if this Pid is in it
    $.each(personAuths, function(index, value){
        if (this.pId == auth.pId)
        {
            //it is found, so add the authId to the one in the collection
            this.authTypes.push(auth.authTypes[0]); 
            found = true;
            return;
        }
    });
    
    //it wasn't found if we get here, so add this auth to the collection
    if (!found) personAuths.push(auth);
}

function writeAuthReportBody(personAuths)
{
    var today = new Date();
	var res = "";
    
    $.each(personAuths, function(index, value){
        var extraStyle = "expired";
        var expireDate = new Date (this.expDate);                  

        if (expireDate > today) extraStyle = "";  
        res += "<reportrow><rowdata onClick='rowClick("+this.pId+")'><rowitem id='sca' class='"+ extraStyle +"'>" + this.name +"</rowitem><rowitem id='branch'>"+this.branch+"</rowitem>";
        res += "</rowdata><rowcheckboxes>" + makeCheckBoxes(this.authTypes, this.pId) + "</rowcheckboxes></reportrow>";         
    });

    $('reportbody').html(res);   
    
    /*
               if ((obj.person_id != lastPersonId) && (lastPersonId != 0)){         
                   extraStyle = "expired";
                   var expireDate = new Date (obj.expire_date);                  
                   var today = new Date();
                   if (count == 1) lastExpire = expireDate; //this person only had 1 auth total, the last row is this row.               
                   if (lastExpire > today) extraStyle = "";  
                    res += "<reportrow><rowdata onClick='rowClick("+lastPersonId+")'><rowitem id='sca' class='"+ extraStyle +"'>" + lastName +"</rowitem><rowitem id='branch'>"+lastBranch+"</rowitem>";
                    res += "</rowdata><rowcheckboxes>" + makeCheckBoxes(auths, lastPersonId) + "</rowcheckboxes></reportrow>";
                    auths = [];
                    count = 1;
               }
               
               auths.push(obj.type_id);
               lastPersonId = obj.person_id;
               lastExpire = new Date (obj.expire_date);
               lastName = obj.first_SCA.replace(/\%20/g, ' ') + " " + obj.last_SCA.replace(/\%20/g, ' ');
               lastBranch = obj.branch;
               count++;
			});
            
            res += "<reportrow><rowdata onClick='rowClick("+lastPersonId+")'><rowitem id='sca'>" + lastName +"</rowitem><rowitem id='branch'>"+lastBranch+"</rowitem>";
            res += "</rowdata><rowcheckboxes>" + makeCheckBoxes(auths, lastPersonId) + "</rowcheckboxes></reportrow>";
            
            res += "</reportrow>";
            $('reportbody').html(res);
            */
}


function populateReport()
{
    var today = new Date(); 


    $('reportheader').html(buildHeader(selectedAuth));
    personAuths = new Array();

	$.ajax({
		url: "https://marshaldb.midrealm.org/mid/dynamicreport.php?rId="+selectedRegion+"&aId="+selectedAuth,
		type: 'GET',
		contentType: "application/json",
		dataType: "json",
		data: {},
		success: function (result) {
            res = "";   
            
			$.each(result, function(idx, obj) { 
              var expireDate = new Date (obj.expire_date);    
              res += "<reportrow><rowdata onClick='rowClick("+obj.person_id+")'>";
              res += "<rowitem";
              if (expireDate < today) res +=  " class='expired' ";
              res += ">" + obj.first_SCA.replace(/\%20/g, ' ') + " " + obj.last_SCA.replace(/\%20/g, ' ') + "</rowitem><rowitem id='branch'>"+obj.branch+"</rowitem></rowdata>";
              res += 
                  "<rowcheckboxes><rowitem id='authtype'><label class='container'><input id='at1' title='Sword and Board' type ='checkbox' onChange='auth("+obj.a1+" , "+obj.person_id+")'"; 
                   if (obj.a1 == 1 ) res += " checked='checked' ";
                   res += "></input><span title='Sword and Board' class='checkmark'></span></label></rowitem>";
              res +=
                  "<rowitem id='authtype'><label class='container'><input id='2' title='Two Stick' type ='checkbox' onChange='auth("+obj.a2+" , "+obj.person_id+")'"; 
                   if (obj.a2 == 1 ) res += " checked='checked' ";
                   res += "></input><span title='Two Stick' class='checkmark'></span></label></rowitem>";
              res += 
                  "<rowitem id='authtype'><label class='container'><input id='3' title='Great Weapon' type ='checkbox' onChange='auth("+obj.a3+" , "+obj.person_id+")'"; 
                   if (obj.a3 == 1 ) res += " checked='checked' ";
                   res += "></input><span title='Great Weapon' class='checkmark'></span></label></rowitem>";
              res += 
                  "<rowitem id='authtype'><label class='container'><input id='4' title='Spear' type ='checkbox' onChange='auth("+obj.a4+" , "+obj.person_id+")'"; 
                   if (obj.a4 == 1 ) res += " checked='checked' ";
                   res += "></input><span title='Spear' class='checkmark'></span></label></rowitem>";
              res += 
                  "<rowitem id='authtype'><label class='container'><input id='5' title='Polearm' type ='checkbox' onChange='auth("+obj.a5+" , "+obj.person_id+")'"; 
                   if (obj.a5 == 1 ) res += " checked='checked' ";
                   res += "></input><span title='Polearm' class='checkmark'></span></label></rowitem>";
              res += 
                  "<rowitem id='authtype'><label class='container'><input id='6' title='Youth Sparring' type ='checkbox' onChange='auth("+obj.a6+" , "+obj.person_id+")"; 
                   if (obj.a6 == 1 ) res += " checked='checked' ";
                   res += "'></input><span title='Youth Sparring' class='checkmark'></span></label></rowitem>";
              res += 
                  "<rowitem id='authtype'><label class='container'><input id='9' title='Combat Archery' type ='checkbox' onChange='auth("+obj.a9+" , "+obj.person_id+")'"; 
                   if (obj.a1 == 9 ) res += " checked='checked' ";
                   res += "></input><span title='Combat Archery' class='checkmark'></span></label></rowitem>";
              res += 
                  "<rowitem id='authtype'><label class='container'><input id='10' title='Seige Crew' type ='checkbox' onChange='auth("+obj.a10+" , "+obj.person_id+")'"; 
                   if (obj.a10 == 1 ) res += " checked='checked' ";
                   res += "></input><span title='Seige Crew' class='checkmark'></span></label></rowitem>";
              res += 
                  "<rowitem id='authtype'><label class='container'><input id='11' title='Seige Engine' type ='checkbox' onChange='auth("+obj.a11+" , "+obj.person_id+")'"; 
                   if (obj.a11 == 1 ) res += " checked='checked' ";
                   res += "></input><span title='Seige Engine' class='checkmark'></span></label></rowitem></rowcheckboxes>";
                
                
                
                
            //  res += "<rowitem>" + obj.expire_date + "</rowitem>";
              res += "</reportrow>";
                
        /*       <rowitem id='authtype'><label class='container'><input id='at1' title='Sword and Board' type='checkbox' onChange='auth(1,"+pid+")' "; 
    if ($.inArray("1", auths) > -1) ret += " checked='checked' ";
    ret += "><span title='Sword and Board' class='checkmark'></span></label></rowitem> 
                
              /*var auth = {
                pId : obj.person_id,
                name : obj.first_SCA.replace(/\%20/g, ' ') + " " + obj.last_SCA.replace(/\%20/g, ' '),
                branch : obj.branch,
                expDate : obj.expire_date,
                authTypes : new Array(obj.type_id)
                };
            
                addToAuthArray(auth);
                writeAuthReportBody(personAuths); */
            });
            
            $('reportbody').html(res);  
		},
		error: function (jqXHR, textStatus, errorThrown) {
			alert("Error updateAuth:" + errorThrown);
		}
	});

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
    var ret = "<reportrow2><rowdata><rowitem id='name'><input id='activereportfilter' class='activereportfilter' onClick='clearField()' onKeyUp='filterReportData()' type='text' value='Type here to filter results...' /></rowitem><rowitem id='branch'></rowitem></rowdata><rowcheckboxes>";
        ret += "<rowitem id='authtype'><div id='ssh' title='Sword and Board' class='catarmored smallicon twenty container2'></div></rowitem>";
        ret += "<rowitem id='authtype'><div id='tw'  title='Two Sword' class='catarmored smallicon twenty container2'></div></rowitem>";
        ret += "<rowitem id='authtype'><div id='gs'  title='Great Sword' class='catarmored smallicon twenty container2'></div></rowitem>";
        ret += "<rowitem id='authtype'><div id='sp'  title='Spear' class='catarmored smallicon twenty container2'></div></rowitem>";
        ret += "<rowitem id='authtype'><div id='pa'  title='Polearm' class='catarmored smallicon twenty container2'></div></rowitem>";
        ret += "<rowitem id='authtype'><div id='ysp' title='Your Sparing armored' class='catarmored smallicon twenty container2'></div></rowitem>";
        ret += "<rowitem id='authtype'><div id='ca'  title='Combat Archery' class='catarmored smallicon twenty container2'></div></rowitem>";
        ret += "<rowitem id='authtype'><div id='sc' title='Seige Crew' class='catarmored smallicon twenty container2'></div></rowitem>";
        ret += "<rowitem id='authtype'><div id='se' title='Seige Engine' class='catarmored smallicon twenty container2'></div></rowitem>";       
        ret += "</rowcheckboxes></reportrow2>";
   
    
    return ret;
}

function buildRapierHeader()
{ //rapier ids 12sr 16da 15pd 17cs 18ls 19ep 20c&t 52youthspar
    var ret = "<reportrow2><rowdata><rowitem id=''><input id='activereportfilter' class='activereportfilter' onClick='clearField()' onKeyUp='filterReportData()' type='text' value='Type here to filter results...' /></rowitem><rowitem id=''></rowitem></rowdata><rowcheckboxes>";
        ret += "<rowitem id='authtype'><div id='sr' title='Single Rapier' class='catarmored smallicon twenty container2'></div></rowitem>";
        ret += "<rowitem id='authtype'><div id='da' title='Dagger' class='catarmored smallicon twenty container2'></div></rowitem>";
        ret += "<rowitem id='authtype'><div id='pd' title='Parry Device' class='catarmored smallicon twenty container2'></div></rowitem>";
        ret += "<rowitem id='authtype'><div id='cs' title='Case' class='catarmored smallicon twenty container2'></div></rowitem>";
        ret += "<rowitem id='authtype'><div id='ls' title='Sword and Board' class='catarmored smallicon twenty container2'></div></rowitem>";
        ret += "<rowitem id='authtype'><div id='yrs' title='Youth Rapier' class='catarmored smallicon twenty container2'></div></rowitem>";
        ret += "<rowitem id='authtype'><div id='cut' title='Cut and Thrust' class='catarmored smallicon twenty container2'></div></rowitem>";
        ret += "</rowcheckboxes></reportrow2>";
    
    return ret;
}

function buildHorseyHeader()
{
    var ret = "<reportrow2><rowdata><rowitem id=''><input id='activereportfilter' class='activereportfilter' onClick='clearField()' onKeyUp='filterReportData()' type='text' value='Type here to filter results...' /></rowitem><rowitem id=''></rowitem></rowdata><rowcheckboxes>";
        ret += "<rowitem id='authtype'><div id='gr' title='General Riding' class='catarmored smallicon twenty container2'></div></rowitem>";
        ret += "<rowitem id='authtype'><div id='mg' title='Games' class='catarmored smallicon twenty container2'></div></rowitem>";
        ret += "<rowitem id='authtype'><div id='ma' title='Archery' class='catarmored smallicon twenty container2'></div></rowitem>";
        ret += "<rowitem id='authtype'><div id='dr' title='Driving' class='catarmored smallicon twenty container2'></div></rowitem>";
        ret += "<rowitem id='authtype'><div id='cc' title='Crest Combat' class='catarmored smallicon twenty container2'></div></rowitem>";
        ret += "<rowitem id='authtype'><div id='mc' title='Mounted Combat' class='catarmored smallicon twenty container2'></div></rowitem>";
        ret += "<rowitem id='authtype'><div id='js' title='Joust' class='catarmored smallicon twenty container2'></div></rowitem>";
        ret += "</rowcheckboxes></reportrow2>";
    
    return ret;
}

function buildYouthHeader()
{
    var ret = "<reportrow2><rowdata><rowitem id=''><input id='activereportfilter' class='activereportfilter' onClick='clearField()' onKeyUp='filterReportData()' type='text' value='Type here to filter results...' /></rowitem><rowitem id=''></rowitem></rowdata><rowcheckboxes>";
        ret += "<rowitem id='authtype'><div id='div1'   title='Division 1 Armored (6-9)' class='catarmored smallicon twenty container2'></div></rowitem>";
        ret += "<rowitem id='authtype'><div id='divrp'  title='Division 1 Rapier (6-9)' class='catarmored smallicon twenty container2'></div></rowitem>";
        ret += "<rowitem id='authtype'><div id='div2'   title='Division 2 Armored (10-14)' class='catarmored smallicon twenty container2'></div></rowitem>";
        ret += "<rowitem id='authtype'><div id='div22h' title='Division 2 Armored Two Handed Weapons' class='catarmored smallicon twenty container2'></div></rowitem>";
        ret += "<rowitem id='authtype'><div id='divrp'  title='Division 2 Rapier (10-14)' class='catarmored smallicon twenty container2'></div></rowitem>";
        ret += "<rowitem id='authtype'><div id='div3'   title='Division 3 Armored (14-17)' class='catarmored smallicon twenty container2'></div></rowitem>";
        ret += "<rowitem id='authtype'><div id='div32h' title='Division 3 Armored Two Handed Weapons' class='catarmored smallicon twenty container2'></div></rowitem>";
        ret += "<rowitem id='authtype'><div id='div3rp' title='Division 3 Rapier (14-17)' class='catarmored smallicon twenty container2'></div></rowitem>";
        ret += "</rowcheckboxes></reportrow2>";
    
    return ret;
}

function buildMarshalHeader()
{ //37 armored 38 ca 39 rapier 40 archer 41 horse 42 seige 43 thrown 44 armored youth 51 youth rapier 53 hound
    var ret = "<reportrow2><rowdata><rowitem id=''><input id='activereportfilter' class='activereportfilter' onClick='clearField()' onKeyUp='filterReportData()' type='text' value='Type here to filter results...' /></rowitem><rowitem id=''></rowitem></rowdata><rowcheckboxes>";
        ret += "<rowitem id='authtype'><div id='mar' title='Armored Marshal' class='catarmored smallicon twenty container2'></div></rowitem>";
        ret += "<rowitem id='authtype'><div id='cae' title='Combat Archery Marshal' class='catarmored smallicon twenty container2'></div></rowitem>";
        ret += "<rowitem id='authtype'><div id='mrp' title='Rapier Marshal' class='catarmored smallicon twenty container2'></div></rowitem>";
        ret += "<rowitem id='authtype'><div id='mac' title='Target Archery Marshal' class='catarmored smallicon twenty container2'></div></rowitem>";
        ret += "<rowitem id='authtype'><div id='meq' title='Equestrian Marshal' class='catarmored smallicon twenty container2'></div></rowitem>";
        ret += "<rowitem id='authtype'><div id='mse' title='Seige Marshal' class='catarmored smallicon twenty container2'></div></rowitem>";
        ret += "<rowitem id='authtype'><div id='mtw' title='Thrown Weapon Marshal' class='catarmored smallicon twenty container2'></div></rowitem>";
        ret += "<rowitem id='authtype'><div id='myo' title='Youth Marshal (Armored)' class='catarmored smallicon twenty container2'></div></rowitem>";
        ret += "<rowitem id='authtype'><div id='mry' title='Youth Marshal (Rapier)' class='catarmored smallicon twenty container2'></div></rowitem>";
        ret += "<rowitem id='authtype'><div id='mhc' title='Hound Coursing Marshal' class='catarmored smallicon twenty container2'></div></rowitem>";
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
    ret += "<rowitem id='authtype'><label class='container'><input id='at1' title='Sword and Board' type='checkbox' onChange='auth(1,"+pid+")' "; 
    if ($.inArray("1", auths) > -1) ret += " checked='checked' ";
    ret += "><span title='Sword and Board' class='checkmark'></span></label></rowitem>";
        
    ret += "<rowitem id='authtype'><label class='container'><input id='2' title='Two Stick' authid='' type='checkbox'";
    if ($.inArray("2", auths) > -1) ret += " checked='checked' ";
    ret += "><span title='Two Stick' class='checkmark'></span></label></rowitem>";
    
    ret += "<rowitem id='authtype'><label class='container'><input id='3' title='Great Weapon' authid='' type='checkbox'";
    if ($.inArray("3", auths) > -1) ret += " checked='checked' ";
    ret += "><span title='Great Weapon' class='checkmark'></span></label></rowitem>";
    
    ret += "<rowitem id='authtype'><label class='container'><input id='4' title='Spear' authid='' type='checkbox'";
    if ($.inArray("4", auths) > -1) ret += " checked='checked' ";
    ret += "><span title='Spear' class='checkmark'></span></label></rowitem>";
    
    ret += "<rowitem id='authtype'><label class='container'><input id='5' title='Polearm' authid='' type='checkbox'";
    if ($.inArray("5", auths) > -1) ret += " checked='checked' ";
    ret += "><span title='Polearm' class='checkmark'></span></label></rowitem>";
    
    ret += "<rowitem id='authtype'><label class='container'><input id='6' title='Youth Sparing' authid='' type='checkbox'";
    if ($.inArray("6", auths) > -1) ret += " checked='checked' ";
    ret += "><span title='Youth Sparing' class='checkmark'></span></label></rowitem>";
    
    ret += "<rowitem id='authtype'><label class='container'><input id='9' title='Combat Archery' authid='' type='checkbox'";
    if ($.inArray("9", auths) > -1) ret += " checked='checked' ";
    ret += "><span title='Combat Archery' class='checkmark'></span></label></rowitem>";
    
    ret += "<rowitem id='authtype'><label class='container'><input id='10' title='Seige Crew' authid='' type='checkbox'";
    if ($.inArray("10", auths) > -1) ret += " checked='checked' ";
    ret += "><span title='Seige Crew' class='checkmark'></span></label></rowitem>";
    
    ret += "<rowitem id='authtype'><label class='container'><input id='11' title='Seige Engine' authid='' type='checkbox'";
    if ($.inArray("11", auths) > -1) ret += " checked='checked' ";    
    ret += "><span title='Seige Engine' class='checkmark'></span></label></rowitem>";
    
    return ret;
}

//rapier ids 12 15 16 17 18 19 20 52
function makeRapierCheckedBoxes(auths)
{
    var ret = "";
    ret += "<rowitem id='authtype'><label class='container'><input id='12' title='Single Rapier' authid='' type='checkbox'"; 
    if ($.inArray("12", auths) > -1) ret += " checked='checked' ";
    ret += "><span title='Single Rapier' class='checkmark'></span></label></rowitem>";
        
    ret += "<rowitem id='authtype'><label class='container'><input id='15' title='Dagger' authid='' type='checkbox'";
    if ($.inArray("15", auths) > -1) ret += " checked='checked' ";
    ret += "><span title='Dagger' class='checkmark'></span></label></rowitem>";
    
    ret += "<rowitem id='authtype'><label class='container'><input id='16' title='Parry Device' authid='' type='checkbox'";
    if ($.inArray("16", auths) > -1) ret += " checked='checked' ";
    ret += "><span title='Parry Device' class='checkmark'></span></label></rowitem>";
    
    ret += "<rowitem id='authtype'><label class='container'><input id='17' title='Case' authid='' type='checkbox'";
    if ($.inArray("17", auths) > -1) ret += " checked='checked' ";
    ret += "><span title='Case' class='checkmark'></span></label></rowitem>";
    
    ret += "<rowitem id='authtype'><label class='container'><input id='18' title='Long Sword' authid='' type='checkbox'";
    if ($.inArray("18", auths) > -1) ret += " checked='checked' ";
    ret += "><span title='Long Sword' class='checkmark'></span></label></rowitem>";
    
    ret += "<rowitem id='authtype'><label class='container'><input id='20' title='Youth Sparing' authid='' type='checkbox'";
    if ($.inArray("20", auths) > -1) ret += " checked='checked' ";
    ret += "><span title='Youth Sparing' class='checkmark'></span></label></rowitem>";
    
    ret += "<rowitem id='authtype'><label class='container'><input id='52' title='Cut and Thrust' authid='' type='checkbox'";
    if ($.inArray("52", auths) > -1) ret += " checked='checked' ";
    ret += "><span title='Cut and Thrust' class='checkmark'></span></label></rowitem>";
    
    return ret;
}

//youth auths type6: 22 23 24 25 26 27 28 29
function makeYouthCheckedBoxes(auths)
{
    var ret = "";
    ret += "<rowitem id='authtype'><label class='container'><input id='22' title='Division 1 Armored (6-9)' authid='' type='checkbox'"; 
    if ($.inArray("22", auths) > -1) ret += " checked='checked' ";
    ret += "><span title='Division 1 Armored (6-9)' class='checkmark'></span></label></rowitem>";
        
    ret += "<rowitem id='authtype'><label class='container'><input id='23' title='Division 1 Rapier (6-9)' authid='' type='checkbox'";
    if ($.inArray("23", auths) > -1) ret += " checked='checked' ";
    ret += "><span title='Division 1 Rapier (6-9)' class='checkmark'></span></label></rowitem>";
    
    ret += "<rowitem id='authtype'><label class='container'><input id='24' title='Division 2 Armored (10-14)' authid='' type='checkbox'";
    if ($.inArray("24", auths) > -1) ret += " checked='checked' ";
    ret += "><span title='Division 2 Armored (10-14)' class='checkmark'></span></label></rowitem>";
    
    ret += "<rowitem id='authtype'><label class='container'><input id='25' title='Division 2 Armored Two Handed' authid='' type='checkbox'";
    if ($.inArray("25", auths) > -1) ret += " checked='checked' ";
    ret += "><span title='Division 2 Armored Two Handed' class='checkmark'></span></label></rowitem>";
    
    ret += "<rowitem id='authtype'><label class='container'><input id='26' title='Division 2 Rapier (10-14)' authid='' type='checkbox'";
    if ($.inArray("26", auths) > -1) ret += " checked='checked' ";
    ret += "><span title='Division 2 Rapier (10-14)' class='checkmark'></span></label></rowitem>";
    
    ret += "<rowitem id='authtype'><label class='container'><input id='27' title='Division 3 Armored (14-17)' authid='' type='checkbox'";
    if ($.inArray("27", auths) > -1) ret += " checked='checked' ";
    ret += "><span title='Division 3 Armored (14-17)' class='checkmark'></span></label></rowitem>";
    
    ret += "<rowitem id='authtype'><label class='container'><input id='28' title='Division 3 Armored Two Handed' authid='' type='checkbox'";
    if ($.inArray("28", auths) > -1) ret += " checked='checked' ";
    ret += "><span title='Division 3 Armored Two Handed' class='checkmark'></span></label></rowitem>";
    
    ret += "<rowitem id='authtype'><label class='container'><input id='29' title='Division 3 Armored Rapier (14-17)' authid='' type='checkbox'";
    if ($.inArray("29", auths) > -1) ret += " checked='checked' ";
    ret += "><span title='Division 3 Armored Rapier (14-17)' class='checkmark'></span></label></rowitem>";
    
    return ret;
}

//horsey types: 30 31 32 33 34 35 36
function makeHorseyCheckedBoxes(auths)
{
    var ret = "";
    ret += "<rowitem id='authtype'><label class='container'><input id='30' title='General Riding' authid='' type='checkbox'"; 
    if ($.inArray("30", auths) > -1) ret += " checked='checked' ";
    ret += "><span title='General Riding' class='checkmark'></span></label></rowitem>";
        
    ret += "<rowitem id='authtype'><label class='container'><input id='31' title='Games' authid='' type='checkbox'";
    if ($.inArray("31", auths) > -1) ret += " checked='checked' ";
    ret += "><span title='Games' class='checkmark'></span></label></rowitem>";
    
    ret += "<rowitem id='authtype'><label class='container'><input id='32' title='Archery' authid='' type='checkbox'";
    if ($.inArray("32", auths) > -1) ret += " checked='checked' ";
    ret += "><span title='Archery' class='checkmark'></span></label></rowitem>";
    
    ret += "<rowitem id='authtype'><label class='container'><input id='33' title='Driving' authid='' type='checkbox'";
    if ($.inArray("33", auths) > -1) ret += " checked='checked' ";
    ret += "><span title='Driving' class='checkmark'></span></label></rowitem>";
    
    ret += "<rowitem id='authtype'><label class='container'><input id='34' title='Crest Combat' authid='' type='checkbox'";
    if ($.inArray("34", auths) > -1) ret += " checked='checked' ";
    ret += "><span title='Crest Combat' class='checkmark'></span></label></rowitem>";
    
    ret += "<rowitem id='authtype'><label class='container'><input id='35' title='Mounted Combat' authid='' type='checkbox'";
    if ($.inArray("35", auths) > -1) ret += " checked='checked' ";
    ret += "><span title='Mounted Combat' class='checkmark'></span></label></rowitem>";
    
    ret += "<rowitem id='authtype'><label class='container'><input id='36' title='Joust' authid='' type='checkbox'";
    if ($.inArray("36", auths) > -1) ret += " checked='checked' ";
    ret += "><span title='Joust' class='checkmark'></span></label></rowitem>";
        
    return ret;
}

//37 armored 38 ca 39 rapier 40 archer 41 horse 42 seige 43 thrown 44 armored youth 51 youth rapier 53 hound
function makeMarshalCheckedBoxes(auths)
{
    var ret = "";
    ret += "<rowitem id='authtype'><label class='container'><input id='37' title='Armored Marshal' authid='' type='checkbox'"; 
    if ($.inArray("37", auths) > -1) ret += " checked='checked' ";
    ret += "><span title='Armored Marshal' class='checkmark'></span></label></rowitem>";
        
    ret += "<rowitem id='authtype'><label class='container'><input id='38' title='Combat Archery Marshal' authid='' type='checkbox'";
    if ($.inArray("38", auths) > -1) ret += " checked='checked' ";
    ret += "><span title='Combat Archery Marshal' class='checkmark'></span></label></rowitem>";
    
    ret += "<rowitem id='authtype'><label class='container'><input id='39' title='Rapier Mashal' authid='' type='checkbox'";
    if ($.inArray("39", auths) > -1) ret += " checked='checked' ";
    ret += "><span title='Rapier Mashal' class='checkmark'></span></label></rowitem>";
    
    ret += "<rowitem id='authtype'><label class='container'><input id='40' title='Target Archery Marshal' authid='' type='checkbox'";
    if ($.inArray("40", auths) > -1) ret += " checked='checked' ";
    ret += "><span title='Target Archery Marshal' class='checkmark'></span></label></rowitem>";
    
    ret += "<rowitem id='authtype'><label class='container'><input id='41' title='Equestrian Marshal' authid='' type='checkbox'";
    if ($.inArray("41", auths) > -1) ret += " checked='checked' ";
    ret += "><span title='Equestrian Marshal' class='checkmark'></span></label></rowitem>";
    
    ret += "<rowitem id='authtype'><label class='container'><input id='42' title='Seige Marshal' authid='' type='checkbox'";
    if ($.inArray("42", auths) > -1) ret += " checked='checked' ";
    ret += "><span title='Seige Marshal' class='checkmark'></span></label></rowitem>";
    
    ret += "<rowitem id='authtype'><label class='container'><input id='43' title='Thrown Weapons Marshal' authid='' type='checkbox'";
    if ($.inArray("43", auths) > -1) ret += " checked='checked' ";
    ret += "><span title='Thrown Weapons Marshal' class='checkmark'></span></label></rowitem>";
        
    ret += "<rowitem id='authtype'><label class='container'><input id='44' title='Youth Marshal (armored)' authid='' type='checkbox'";
    if ($.inArray("44", auths) > -1) ret += " checked='checked' ";
    ret += "><span title='Youth Marshal (armored)' class='checkmark'></span></label></rowitem>";
    
    ret += "<rowitem id='authtype'><label class='container'><input id='51' title='Youth Marshal (rapier)' authid='' type='checkbox'";
    if ($.inArray("51", auths) > -1) ret += " checked='checked' ";
    ret += "><span title='Youth Marshal (rapier)' class='checkmark'></span></label></rowitem>";
    
    ret += "<rowitem id='authtype'><label class='container'><input id='53' title='Hound Coursing Marshal' authid='' type='checkbox'";
    if ($.inArray("53", auths) > -1) ret += " checked='checked' ";
    ret += "><span title='Hound Coursing Marshal' class='checkmark'></span></label></rowitem>";
    
    return ret;
}