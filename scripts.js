let count_type;
let endTime; 

startProgram();

function getDate(){
    let months = ["ene","feb","mar","abr","may","jun","jul","ago","set","oct","nov","dic"];
    let now    = new Date();
    let day    = now.getDate();
    let mon    = now.getMonth() + 1;
    let month  = months[ mon - 1 ];
    let year   = now.getFullYear()
    let nday   = day < 10 ? '0' + day : day;
    let nmonth = mon < 10 ? '0' + mon : mon;
    let nyear  = year % 100
    nyear      = nyear < 10 ? '0' + nyear : nyear;

    let returnedObject = {};
    returnedObject["day"]    = day;
    returnedObject["month"]  = month;
    returnedObject["year"]   = year;
    returnedObject["nday"]   = nday;
    returnedObject["nmonth"] = nmonth;
    returnedObject["nyear"]  = nyear;
    return returnedObject;
}

function setDate( val ){
    document.getElementById("full_date").innerHTML = val.day + " de " + val.month + " de " + val.year;
    document.getElementById("date").innerHTML      = val.nday + "/" + val.nmonth + "/" + val.nyear;
}

function getTime( time ){
    let now = time == undefined ? new Date() : new Date(time);
    let hour   = now.getHours();
    let minute = now.getMinutes();
    let second = now.getSeconds();

    hour   = hour   < 10 ? '0' + hour   : hour;
    minute = minute < 10 ? '0' + minute : minute;
    second = second < 10 ? '0' + second : second;

    let returnedObject = {};
    returnedObject["hour"]   = hour;
    returnedObject["minute"] = minute;
    returnedObject["second"] = second;
    return returnedObject;
}

function setTime( val ){
    document.getElementById("hour").innerHTML   = val.hour;
    document.getElementById("minute").innerHTML = val.minute;
    document.getElementById("second").innerHTML = val.second;
}

function setLabelTime( id, time ){
    let color = document.getElementById(id).style.color != 'transparent' ? 'springgreen' : 'transparent'; 
    document.getElementById(id).innerHTML =
        time.hour + '<span style="color: '+ color +';">:</span>' + 
        time.minute + '<span style="color: '+ color +';">:</span>' +
        time.second;
}

function showTime(){
    switch( count_type ){
        case "countdown":
            let now = new Date().getTime();
            let distance = endTime - now;

            if( distance < 0 ) {
                setTime( {'hour':'00', 'minute':'00', 'second':'00'} );
            }
            else{
                let hour = Math.floor((distance % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));
                let minute = Math.floor((distance % (1000 * 60 * 60)) / (1000 * 60));
                let second = Math.floor((distance % (1000 * 60)) / 1000);
                hour   = hour   < 10 ? '0' + hour   : hour;
                minute = minute < 10 ? '0' + minute : minute;
                second = second < 10 ? '0' + second : second;
                setTime( {'hour':hour, 'minute':minute, 'second':second} );
            }
            break;

        case "countup":
            setTime( getTime() );
            break;
    }

    setLabelTime( 'current_time', getTime() );
}

function fillupList( sel, len, indx ) {
    let select = document.getElementById(sel);
    let str    = "0";

    for (let i=0; i < len; i++) {
        if (i > 9 ) str = "";
        select.options[select.options.length] = new Option(str+i, i);
    }
    select.selectedIndex = indx;
}

function toggleDisplayTime( id, color, time ){
    document.getElementById(id+'_label').style.color = color == 'transparent' ? color : 'deepskyblue'
    document.getElementById(id).style.color          = color == 'transparent' ? color : 'white';
    setLabelTime( id, time );
}

function toggleDisplayTable(){
    let datatable = document.getElementById("data_table");

    if (datatable.style.display == "none") {
        datatable.style.display = "block";
        document.getElementById("toggle_display").innerHTML = "OCULTAR DATOS DE LA EVALUACI&Oacute;N";
        toggleDisplayTime( 'end_time', 'transparent', getTime(endTime) );
        if( document.getElementById('current_time').style.color == 'transparent' )
            document.getElementById('current_end_time').style.display = "none";
    } else {
        datatable.style.display = "none";
        document.getElementById("toggle_display").innerHTML = "MOSTRAR DATOS DE LA EVALUACI&Oacute;N";
        toggleDisplayTime( 'end_time', 'deepskyblue', getTime(endTime) );
        document.getElementById('current_end_time').style.display = "block";
    }
}

function toggleDisplayModal( id ){
    let table = document.getElementById(id);
    table.style.display = table.style.display == "block" ? "none" : "block";
}

function setEndTime(){
    let hour   = document.getElementById('hour_end').value;
    let minute = document.getElementById('minute_end').value;
    let time   = new Date();
    time.setHours(hour, minute, 0);
    endTime = time.getTime();
}

function toggleCount(){
    if( document.getElementById("toggle_count").innerHTML == 'REGRESIVO'){
        document.getElementById("tittle").innerHTML       = "LA EVALUACI&Oacute;N ACABA EN";
        document.getElementById("toggle_count").innerHTML = 'PROGRESIVO';
        toggleDisplayTime('current_time', 'deepskyblue', getTime());
        count_type = "countdown";
        setEndTime();
        document.getElementById('current_end_time').style.display = "block";
    }
    else{
        document.getElementById("tittle").innerHTML       = "LA HORA ACTUAL ES";
        document.getElementById("toggle_count").innerHTML = 'REGRESIVO';
        toggleDisplayTime('current_time', 'transparent', getTime());
        count_type = "countup";
        if( document.getElementById('end_time').style.color == 'transparent' )
            document.getElementById('current_end_time').style.display = "none";
    }
}

function onChange(){
    let hour   = document.getElementById('hour_end').value;
    let minute = document.getElementById('minute_end').value;
    hour   = hour   < 10 ? '0' + hour   : hour;
    minute = minute < 10 ? '0' + minute : minute;
    setLabelTime( 'end_time', {'hour':hour, 'minute':minute, 'second':'00'} );
    setEndTime();
}

function changeFontSize( action ){
    const noteText = document.getElementById('note_text');
    let currentSize = parseFloat(window.getComputedStyle(noteText, null).getPropertyValue('font-size'));

    if (action === 'increase') {
        currentSize += 2;
    } else if (action === 'decrease') {
        currentSize -= 2;
    }

    noteText.style.fontSize = currentSize + 'px';
}

function startProgram(){
    let time = getTime();
    setDate( getDate() );
    setLabelTime( 'end_time', {'hour':time.hour, 'minute':50, 'second':'00'} );
    fillupList( 'hour_start', 24, time.hour );
    fillupList( 'minute_start', 60, 0 );
    fillupList( 'hour_end', 24, time.hour );
    fillupList( 'minute_end', 60, 50 );
    setEndTime();
    setTime( time );
    count_type = "countup";
    setInterval( showTime, 1000 );
}

