
Array.matrix = function(numrows, numcols, initial){
   var arr = [];
   for (var i = 0; i < numrows; ++i){
      var columns = [];
      for (var j = 0; j < numcols; ++j){
         columns[j] = initial;
      }
      arr[i] = columns;
    }
    return arr;
}

//var sumdata = Array.matrix(10,10,0);
var sumdata = [];
var contssummery;
var midsummery;
var pentsummery;
var soakensummery;
var noakensummery;
var marshaldetails = [] ;
var armoreddetails = [] ;
var rapierdetails = [] ;
var equestriandetails = [] ;
var youthdetails = [] ;
var ctdetails = [] ;

var color1 = '#BB9B00';
var color2 = '#009600';
var color3 = '#BB0000';
var color4 = '#35149E';
var color5 = '#016872';
var color6 = '#BB5800';

var marshalsmalltext 	= 'This includes all people who have any type of Marshal. This does not include those who are Marshals In Training.';
var armoredsmalltext 	= 'This includes all people who have any type of Armored, Combat Archery, or Siege Authorization.';
var rapiersmalltext 	= 'This includes all people who have any type of Rapier authorization.';
var equestriansmalltext = 'This includes all people who have any type of Equestrian authorization.';
var youthsmalltext 		= 'This includes all Youth fighters.  A youth is anyone under 18 who has not authorized to fight with adults after age 16.';
var ctsmalltext 		= 'This includes all people who have any type of Cut & Thrust authorization.';


$( document ).ready(function() {
	sumdata = getSummeryData();
	fillInMapData(sumdata);

	marshaldetails = getDetailForCategory(1);
	armoreddetails = getDetailForCategory(3);
	rapierdetails = getDetailForCategory(5);
	equestriandetails = getDetailForCategory(8);
	youthdetails = getDetailForCategory(6);
	ctdetails = getDetailForCategory(9);




	$('summerydetails').html('');
	$('summerydetails').append(buildSummeryDetail('Marshal', marshaldetails, marshalsmalltext, 1));
	$('summerydetails').append(buildSummeryDetail('Armored', armoreddetails, armoredsmalltext, 3));
	$('summerydetails').append(buildSummeryDetail('Rapier', rapierdetails, rapiersmalltext, 5));
	$('summerydetails').append(buildSummeryDetail('Equestrian', equestriandetails, equestriansmalltext, 8));
	$('summerydetails').append(buildSummeryDetail('Youth', youthdetails, youthsmalltext, 6));
	$('summerydetails').append(buildSummeryDetail('ct', ctdetails, ctsmalltext, 9));
});

function buildSummeryDetail(category, array, smalltext, typeId)
{
	var ret = "";
	var mid = "";
	var grandTot = 0;
	var bigtitle = category;

	if (bigtitle == "ct") bigtitle = "Cut & Thrust";

	$.each( array, function( key, value ) {
		//console.log(value.typeid + ' ' + value.type + ' ' + value.tots);
		mid = mid + "<detail><sumtot class='"+category+"'><sumnum>"+value.tots+"</sumnum></sumtot><sumtype>"+value.type+"</sumtype></detail>";
	});

	//find grand total from map data
	$.each( sumdata, function (key, value){
		if (value.category == typeId) grandTot = grandTot + parseInt(value.tots);
	});

	var header = "<marshaldetail>";
	header = header + "<marshaldetailheader>";
	header = header + "<bigtext id='marshalbigtext' class='"+category+"fg'>"+bigtitle+"</bigtext>";
	header = header + "<littletext id='marshallittletext'>"+smalltext+"</littletext>";
	header = header + "<colorbox2 class='"+category+"'>";
	header = header + "<upper><box1></box1><box2></box2><box3></box3><box4></box4></upper>";
	header = header + "<lower><box5></box5><box6></box6><box7></box7><box8></box8></lower>";
	header = header + "</colorbox2><total id='marshaltotal'>"+grandTot+"</total>";
	header = header + "</marshaldetailheader>";
	header = header + "<line></line>";
	header = header + "<detailbox>";

	var footer 	=	"<detailbox></marshaldetail>";

	ret = header + mid + footer;
	return ret;
}

function getSummeryData()
{

	var ret = [];
	var rows = 0;

	$.ajax({
		url: "http://www.castlewalls.com/auths/mid/summerytotals.php",
		type: 'GET',
		contentType: "application/json",
		dataType: "json",
		data: {},
		async: false,
		success: function (result) {

			$.each(result, function(idx, obj) {
				//sumdata[obj.region_id][obj.category_id] = obj.tots;
				var sum = new Object();
				sum.category = obj.category_id;
				sum.region = obj.region_id;
				sum.tots = obj.tots;
				ret.push(sum);

			});

		},
		error: function (jqXHR, textStatus, errorThrown) {
			alert(errorThrown + ' ' + textStatus);
		}
	});

	return ret;
}


function fillInMapData(sumdata)
{
	var constTot = 0;
	var midTot = 0;
	var pentTot = 0;
	var naokTot = 0;
	var saokTot = 0;

    //get tots
	$.each( sumdata, function( key, value ) {
		//console.log(value.category + ' ' + value.region + ' ' + value.tots);
		if (value.region == 1) constTot = constTot + parseInt(value.tots);
		if (value.region == 2) midTot = midTot + parseInt(value.tots);
		if (value.region == 3) pentTot = pentTot + parseInt(value.tots);
		if (value.region == 4) saokTot = saokTot + parseInt(value.tots);
		if (value.region == 5) naokTot = naokTot + parseInt(value.tots);
	});


	$.each( sumdata, function( key, value ) {
		if (value.region == 1 && parseInt(value.category) == 1) $('#constellationbar1').css('border-right', Math.round((value.tots / constTot) * 100) + 'px solid #b80000').text(value.tots);
		if (value.region == 1 && parseInt(value.category) == 3) $('#constellationbar2').css('border-right', Math.round((value.tots / constTot) * 100) + 'px solid #BB9B00').text(value.tots);
		if (value.region == 1 && parseInt(value.category) == 5) $('#constellationbar3').css('border-right', Math.round((value.tots / constTot) * 100) + 'px solid #BB5800').text(value.tots);
		if (value.region == 1 && parseInt(value.category) == 8) $('#constellationbar4').css('border-right', Math.round((value.tots / constTot) * 100) + 'px solid #009600').text(value.tots);
		if (value.region == 1 && parseInt(value.category) == 6) $('#constellationbar5').css('border-right', Math.round((value.tots / constTot) * 100) + 'px solid #016872').text(value.tots);
		if (value.region == 1 && parseInt(value.category) == 9) $('#constellationbar6').css('border-right', Math.round((value.tots / constTot) * 100) + 'px solid #35149E').text(value.tots);

		if (value.region == 2 && value.category == 1) $('#midlandsbar1').css('border-right', Math.round((value.tots / midTot) * 100) + 'px solid #b80000').text(value.tots);
		if (value.region == 2 && value.category == 3) $('#midlandsbar2').css('border-right', Math.round((value.tots / midTot) * 100) + 'px solid #BB9B00').text(value.tots);
		if (value.region == 2 && value.category == 5) $('#midlandsbar3').css('border-right', Math.round((value.tots / midTot) * 100) + 'px solid #BB5800').text(value.tots);
		if (value.region == 2 && value.category == 8) $('#midlandsbar4').css('border-right', Math.round((value.tots / midTot) * 100) + 'px solid #009600').text(value.tots);
		if (value.region == 2 && value.category == 6) $('#midlandsbar5').css('border-right', Math.round((value.tots / midTot) * 100) + 'px solid #016872').text(value.tots);
		if (value.region == 2 && value.category == 9) $('#midlandsbar6').css('border-right', Math.round((value.tots / midTot) * 100) + 'px solid #35149E').text(value.tots);

		if (value.region == 3 && value.category == 1) $('#pentamerebar1').css('border-left', Math.round((value.tots / pentTot) * 100) + 'px solid #b80000').text(value.tots);
		if (value.region == 3 && value.category == 3) $('#pentamerebar2').css('border-left', Math.round((value.tots / pentTot) * 100) + 'px solid #BB9B00').text(value.tots);
		if (value.region == 3 && value.category == 5) $('#pentamerebar3').css('border-left', Math.round((value.tots / pentTot) * 100) + 'px solid #BB5800').text(value.tots);
		if (value.region == 3 && value.category == 8) $('#pentamerebar4').css('border-left', Math.round((value.tots / pentTot) * 100) + 'px solid #009600').text(value.tots);
		if (value.region == 3 && value.category == 6) $('#pentamerebar5').css('border-left', Math.round((value.tots / pentTot) * 100) + 'px solid #016872').text(value.tots);
		if (value.region == 3 && value.category == 9) $('#pentamerebar6').css('border-left', Math.round((value.tots / pentTot) * 100) + 'px solid #35149E').text(value.tots);

		if (value.region == 4 && value.category == 1) $('#southoakenbar1').css('border-left', Math.round((value.tots / saokTot) * 100) + 'px solid #b80000').text(value.tots);
		if (value.region == 4 && value.category == 3) $('#southoakenbar2').css('border-left', Math.round((value.tots / saokTot) * 100) + 'px solid #BB9B00').text(value.tots);
		if (value.region == 4 && value.category == 5) $('#southoakenbar3').css('border-left', Math.round((value.tots / saokTot) * 100) + 'px solid #BB5800').text(value.tots);
		if (value.region == 4 && value.category == 8) $('#southoakenbar4').css('border-left', Math.round((value.tots / saokTot) * 100) + 'px solid #009600').text(value.tots);
		if (value.region == 4 && value.category == 6) $('#southoakenbar5').css('border-left', Math.round((value.tots / saokTot) * 100) + 'px solid #016872').text(value.tots);
		if (value.region == 4 && value.category == 9) $('#southoakenbar6').css('border-left', Math.round((value.tots / saokTot) * 100) + 'px solid #35149E').text(value.tots);

		if (value.region == 5 && value.category == 1) $('#northoakenbar1').css('border-left', Math.round((value.tots / naokTot) * 100) + 'px solid #b80000').text(value.tots);
		if (value.region == 5 && value.category == 3) $('#northoakenbar2').css('border-left', Math.round((value.tots / naokTot) * 100) + 'px solid #BB9B00').text(value.tots);
		if (value.region == 5 && value.category == 5) $('#northoakenbar3').css('border-left', Math.round((value.tots / naokTot) * 100) + 'px solid #BB5800').text(value.tots);
		if (value.region == 5 && value.category == 8) $('#northoakenbar4').css('border-left', Math.round((value.tots / naokTot) * 100) + 'px solid #009600').text(value.tots);
		if (value.region == 5 && value.category == 6) $('#northoakenbar5').css('border-left', Math.round((value.tots / naokTot) * 100) + 'px solid #016872').text(value.tots);
		if (value.region == 5 && value.category == 9) $('#northoakenbar6').css('border-left', Math.round((value.tots / naokTot) * 100) + 'px solid #35149E').text(value.tots);

	});


}


function getDetailForCategory(categoryId)
{
	var ret = [] ;
	$.ajax({
		url: "http://www.castlewalls.com/auths/mid/summerydetails.php",
		type: 'GET',
		contentType: "application/json",
		dataType: "json",
		data: {cId: categoryId},
		async: false,
		success: function (result) {

			$.each(result, function(idx, obj) {
				var detail = new Object();
				detail.typeid = obj.type_id;
				detail.type = obj.type;
				detail.tots = obj.tots;
				ret.push(detail);

			});
		},
		error: function (jqXHR, textStatus, errorThrown) {
			alert(errorThrown + ' ' + textStatus);
		}
	});

	return ret;
}


