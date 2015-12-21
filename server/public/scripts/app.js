

//empty array to hold returned 'data'
var returnInfo = {};
var NUM_PEOPLE = 19;

//counter for prev next button clicks
var prevNextCounter = 0;

$(document).ready(function(){
    getData();

    //Listeners for prev and next buttons
    $("#buttons").on("click", ".prev", prevButtonClick);
    $("#buttons").on("click", ".next", nextButtonClick);
});

function getData(){
    $.ajax({
        type: "GET",
        url:"/data",
        success: function(data){

            //saves 'data' to global variable
            returnInfo=data;

            //adds an index number to each person in the data array
            addIndex(data);

            //displays the first person to start with
            displayPeople(data);

            //appends the index to the DOM
            displayIndex(data.people.length);

        }
    });
}

//display first person to start with
function displayPeople(data) {
    for(var i=0; i<data.people.length; i++) {
        $('#peopleContainer').append('<div class="people" data-index="' + i +'"></div>');
        var $el = $('#peopleContainer').children().last();
        $el.append('<p>Name: ' + data.people[i].name + '</p>');
        $el.append('<p>Location: ' + data.people[i].location + '</p>');
        $el.append('<p>Animal: ' + data.people[i].animal + '</p>');
        $el.append('<p>Index: ' + data.people[i].index + '</p>');
    }
}

//displays the index numbers on the DOM
function displayIndex(arrayLength) {
    for (var i = 0; i < arrayLength; i++) {
        $("#index").append("<div class='indexnum' data-index='" + i + "'>"+ i +"</div>");
    }
}

//adds an index number to each person in the data array
function addIndex(data) {
    for (var i = 0; i < data.people.length; i++) {
        data.people[i].index=i;
    }
    return data;
}

//increment counter if next button clicked
function nextButtonClick(){

    //console.log(prevNextCounter);
    //find the person with dataindex of the counter and hide it so the next person will show
    $('#peopleContainer').find('[data-index="' + prevNextCounter + '"]').hide();


    //highlight the index number and unhighlight the previous index
    var temp = prevNextCounter+1;
    $("#index").find('[data-index="' + temp + '"]').addClass('selected');
    $("#index").find('[data-index="' + prevNextCounter + '"]').removeClass('selected');


    if(prevNextCounter==NUM_PEOPLE){
        prevNextCounter=0;
        $('.people').show();
    } else {
        prevNextCounter++;
    }
}

//decrement counter if prev button clicked
function prevButtonClick(){

    //console.log(prevNextCounter);
    //find the person with dataindex of the counter and show it
    $('#peopleContainer').find('[data-index="' + prevNextCounter + '"]').show();


    //highlight the index number and unhighlight the previous
    var temp=prevNextCounter+1;
    $("#index").find('[data-index="' + prevNextCounter + '"]').addClass('selected');
    $("#index").find('[data-index="' + temp + '"]').removeClass('selected');

    if(prevNextCounter==0){
        prevNextCounter=NUM_PEOPLE;
        $('.people').hide();
    } else {
        prevNextCounter--;
    }
}

////// FOR REFERENCE //////////////
//$('.prev').on('click', function(){
//    $('#person' + currentPositon).hide();
//    currentPositon --;
//    $('#person' + currentPositon).show();
//    if( currentPositon ==(-1)){
//
//        currentPositon = ((array.people.length)-1);
//
//        $('#person' + (currentPositon)).show();
//    }
//
//    console.log(currentPositon);
//})

////// FOR REFERENCE //////////////
//$('.next').on('click', function(){
//    var lastPos = array.people.length;
//    $('#person' + currentPositon).hide();
//    currentPositon++;
//    $('#person' + currentPositon).show();
//    if(currentPositon == (lastPos)){
//        currentPositon = 0;
//        $('#person0').show();
//    }
//    //console.log(lastPos);
//})
//




