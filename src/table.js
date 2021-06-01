

function datetime() {
    var d = new Date();
    var n = d.toDateString();
    var t = d.toLocaleTimeString();
  
    return [n, t];
  }


  function readTextFile(file, callback) {
    var rawFile = new XMLHttpRequest();
    rawFile.overrideMimeType("application/json");
    rawFile.open("GET", file, true);
    rawFile.onreadystatechange = function() {
        if (rawFile.readyState === 4 && rawFile.status == "200") {
            callback(rawFile.responseText);
        }
    }
    rawFile.send(null);
}


var updateValue;



//usage:
readTextFile("value.json", function(text){
    var data = JSON.parse(text);
    console.log("data received");
    console.log(data);
    updateValue = data;
    });


  
$(document).ready(function ($) {

    //ajax row data
    dt = datetime();
    var ajax_data =  updateValue;
    //   [
    //     {
    //       date: "Date", date_val: dt[0],
    //       time: "Time", time_val: dt[1],
    //       licen: "ทะเบียนรถ", licen_val: "12345",
    //       provin: "จังหวัด", provin_val: "กรุงเทพ"
    //       , brand: "ยี่ห้อรถ", brand_val: "TOYOTA",
    //       color: "สี", color_val: "PINK",
    //       iso: "ISO CODE", iso_val: "A234N"
    //     },
    //   ]


    //--->create data table > start
    var tbl = '';
    tbl += '<table class="table table-hover mytable">'

    //--->create table header > start
    tbl += '<thead>';
    tbl += '<tr>';
    tbl += '<th>Details</th>';
    tbl += '<th>Value</th>';
    tbl += '<th>Options</th>';
    tbl += '</tr>';
    tbl += '</thead>';
    //--->create table header > end

    //--->create table body > start
    tbl += '<tbody>';

    //--->create table body rows > start
    $.each(ajax_data, function (index, val) {


      //you can replace with your database row id

      tbl += '<tr row_id="date">';
      tbl += '<th ><div col_name="date">' + val['date'] + '</div></th>';
      tbl += '<td ><div col_name="date_val">' + val['date_val'] + '</div></td>';
      tbl += '</tr>';

      tbl += '<tr row_id="time">';
      tbl += '<th ><div col_name="time">' + val['time'] + '</div></th>';
      tbl += '<td ><div col_name="time_val">' + val['time_val'] + '</div></td>';
      tbl += '</tr>';



      // new
      //loop through ajax row data
      tbl += '<tr row_id="licen">';
      tbl += '<th ><div col_name="licen">' + val['licen'] + '</div></th>';
      tbl += '<td ><div class="row_data" edit_type="click" col_name="licen_val">' + val['licen_val'] + '</div></td>';

      //--->edit options > start
      tbl += '<td>';

      tbl += '<span class="btn_edit" > <a href="#" class="btn btn-outline-primary " row_id="licen" > Edit</a> </span>';

      //only show this button if edit button is clicked
      tbl += '<span class="btn_save"> <a href="#" class="btn btn-outline-success "  row_id="licen"> Save</a> </span>';
      tbl += '<span class="btn_cancel"> <a href="#" class="btn btn-outline-danger" row_id="licen"> Cancel</a> </span>';

      tbl += '</td>';
      //--->edit options > end

      tbl += '</tr>';

      tbl += '<tr row_id="brand">';
      tbl += '<th ><div col_name="brand">' + val['brand'] + '</div></th>';
      tbl += '<td ><div class="row_data" edit_type="click" col_name="brand_val">' + val['brand_val'] + '</div></td>';

      //--->edit options > start
      tbl += '<td>';

      tbl += '<span class="btn_edit" > <a href="#" class="btn btn-outline-primary " row_id="brand" > Edit</a> </span>';

      //only show this button if edit button is clicked
      tbl += '<span class="btn_save"> <a href="#" class="btn btn-outline-success"  row_id="brand"> Save</a> </span>';
      tbl += '<span class="btn_cancel"> <a href="#" class="btn btn-outline-danger" row_id="brand"> Cancel</a> </span>';

      tbl += '</td>';
      //--->edit options > end

      tbl += '</tr>';

      tbl += '<tr row_id="color">';
      tbl += '<th ><div col_name="brand">' + val['color'] + '</div></th>';
      tbl += '<td ><div class="row_data" edit_type="click" col_name="color_val">' + val['color_val'] + '</div></td>';

      //--->edit options > start
      tbl += '<td>';

      tbl += '<span class="btn_edit" > <a href="#" class="btn btn-outline-primary " row_id="color" > Edit</a> </span>';

      //only show this button if edit button is clicked
      tbl += '<span class="btn_save"> <a href="#" class="btn btn-outline-success"  row_id="color"> Save</a> </span>';
      tbl += '<span class="btn_cancel"> <a href="#" class="btn btn-outline-danger" row_id="color"> Cancel</a> </span>';

      tbl += '</td>';
      //--->edit options > end

      tbl += '</tr>';
    });

    //--->create table body rows > end

    tbl += '</tbody>';
    //--->create table body > end

    tbl += '</table>'
    //--->create data table > end

    //out put table data
    $(document).find('.tbl_user_data').html(tbl);

    $(document).find('.btn_save').hide();
    $(document).find('.btn_cancel').hide();


    //--->make div editable > start
    $(document).on('click', '.row_data', function (event) {
      event.preventDefault();

      if ($(this).attr('edit_type') == 'button') {
        return false;
      }

      //make div editable
      $(this).closest('div').attr('contenteditable', 'true');
      //add bg css
      $(this).addClass('bg-warning').css('padding', '2px');
      $(this).addClass('bg-warning').css('border-radius', '5px');
      $(this).focus();
    })
    //--->make div editable > end


    //--->save single field data > start
    $(document).on('focusout', '.row_data', function (event) {
      event.preventDefault();

      if ($(this).attr('edit_type') == 'button') {
        return false;
      }

      var row_id = $(this).closest('tr').attr('row_id');

      var row_div = $(this)
        .removeClass('bg-warning') //add bg css
        .css('padding', '')

      var col_name = row_div.attr('col_name');
      var col_val = row_div.html();

      var arr = {};
      arr[col_name] = col_val;

      //use the "arr"	object for your ajax call
      $.extend(arr, { row_id: row_id });

      //out put to show
      $('.post_msg').html('<pre class="bg-success">' + JSON.stringify(arr, null, 2) + '</pre>');
      var row_changed = arr['row_id'];
      var col_changed = row_changed + '_val'

      ajax_data[0][col_changed] = arr[col_changed];
      update_table(ajax_data);


    })
    //--->save single field data > end


    //--->button > edit > start	
    $(document).on('click', '.btn_edit', function (event) {
      event.preventDefault();
      var tbl_row = $(this).closest('tr');

      var row_id = tbl_row.attr('row_id');

      tbl_row.find('.btn_save').show();
      tbl_row.find('.btn_cancel').show();

      //hide edit button
      tbl_row.find('.btn_edit').hide();

      //make the whole row editable
      tbl_row.find('.row_data')
        .attr('contenteditable', 'true')
        .attr('edit_type', 'button')
        .addClass('bg-warning')
        .css('padding', '3px')

      //--->add the original entry > start
      tbl_row.find('.row_data').each(function (index, val) {
        //this will help in case user decided to click on cancel button
        $(this).attr('original_entry', $(this).html());
      });
      //--->add the original entry > end

    });
    //--->button > edit > end


    //--->button > cancel > start	
    $(document).on('click', '.btn_cancel', function (event) {
      event.preventDefault();

      var tbl_row = $(this).closest('tr');

      var row_id = tbl_row.attr('row_id');

      //hide save and cacel buttons
      tbl_row.find('.btn_save').hide();
      tbl_row.find('.btn_cancel').hide();

      //show edit button
      tbl_row.find('.btn_edit').show();

      //make the whole row editable
      tbl_row.find('.row_data')
        .attr('edit_type', 'click')
        .removeClass('bg-warning')
        .css('padding', '')

      tbl_row.find('.row_data').each(function (index, val) {
        $(this).html($(this).attr('original_entry'));
      });
    });
    //--->button > cancel > end

    //--->save whole row entery > start	
    $(document).on('click', '.btn_save', function (event) {
      event.preventDefault();
      var tbl_row = $(this).closest('tr');

      var row_id = tbl_row.attr('row_id');


      //hide save and cacel buttons
      tbl_row.find('.btn_save').hide();
      tbl_row.find('.btn_cancel').hide();

      //show edit button
      tbl_row.find('.btn_edit').show();


      //make the whole row editable
      tbl_row.find('.row_data')
        .attr('edit_type', 'click')
        .removeClass('bg-warning')
        .css('padding', '')

      //--->get row data > start
      var arr = {};
      tbl_row.find('.row_data').each(function (index, val) {
        var col_name = $(this).attr('col_name');
        var col_val = $(this).html();
        arr[col_name] = col_val;
      });
      //--->get row data > end

      //use the "arr"	object for your ajax call
      $.extend(arr, { row_id: row_id });

      //out put to show
      $('.post_msg').html('<pre class="bg-success">' + JSON.stringify(arr, null, 2) + '</pre>')
      var row_changed = arr['row_id'];
      var col_changed = row_changed + '_val'

      ajax_data[0][col_changed] = arr[col_changed];
      update_table(ajax_data);

    });
    //--->save whole row entery > end
  });
  function update_table(ajax_data) {
    //--->create data table > start
    var tbl = '';
    tbl += '<table class="table table-hover mytable">'

    //--->create table header > start
    tbl += '<thead>';
    tbl += '<tr>';
    tbl += '<th>Details</th>';
    tbl += '<th>Value</th>';
    tbl += '<th>Options</th>';
    tbl += '</tr>';
    tbl += '</thead>';
    //--->create table header > end

    //--->create table body > start
    tbl += '<tbody>';

    //--->create table body rows > start
    $.each(ajax_data, function (index, val) {
      //you can replace with your database row id


      tbl += '<tr row_id="date">';
      tbl += '<th ><div col_name="date">' + val['date'] + '</div></th>';
      tbl += '<td ><div col_name="date_val">' + val['date_val'] + '</div></td>';
      tbl += '</tr>';

      tbl += '<tr row_id="time">';
      tbl += '<th ><div col_name="time">' + val['time'] + '</div></th>';
      tbl += '<td ><div col_name="time_val">' + val['time_val'] + '</div></td>';
      tbl += '</tr>';


      //loop through ajax row data
      tbl += '<tr row_id="licen">';
      tbl += '<th ><div col_name="licen">' + val['licen'] + '</div></th>';
      tbl += '<td ><div class="row_data" edit_type="click" col_name="licen_val">' + val['licen_val'] + '</div></td>';

      //--->edit options > start
      tbl += '<td>';

      tbl += '<span class="btn_edit" > <a href="#" class="btn btn-outline-primary " row_id="licen" > Edit</a> </span>';

      //only show this button if edit button is clicked
      tbl += '<span class="btn_save"> <a href="#" class="btn btn-outline-success "  row_id="licen"> Save</a> </span>';
      tbl += '<span class="btn_cancel"> <a href="#" class="btn btn-outline-danger" row_id="licen"> Cancel</a> </span>';

      tbl += '</td>';
      //--->edit options > end

      tbl += '</tr>';

      tbl += '<tr row_id="brand">';
      tbl += '<th ><div col_name="brand">' + val['brand'] + '</div></th>';
      tbl += '<td ><div class="row_data" edit_type="click" col_name="brand_val">' + val['brand_val'] + '</div></td>';

      //--->edit options > start
      tbl += '<td>';

      tbl += '<span class="btn_edit" > <a href="#" class="btn btn-outline-primary " row_id="brand" > Edit</a> </span>';

      //only show this button if edit button is clicked
      tbl += '<span class="btn_save"> <a href="#" class="btn btn-outline-success"  row_id="brand"> Save</a> </span>';
      tbl += '<span class="btn_cancel"> <a href="#" class="btn btn-outline-danger" row_id="brand"> Cancel</a> </span>';

      tbl += '</td>';
      //--->edit options > end

      tbl += '</tr>';

      tbl += '<tr row_id="color">';
      tbl += '<th ><div col_name="brand">' + val['color'] + '</div></th>';
      tbl += '<td ><div class="row_data" edit_type="click" col_name="color_val">' + val['color_val'] + '</div></td>';

      //--->edit options > start
      tbl += '<td>';

      tbl += '<span class="btn_edit" > <a href="#" class="btn btn-outline-primary " row_id="color" > Edit</a> </span>';

      //only show this button if edit button is clicked
      tbl += '<span class="btn_save"> <a href="#" class="btn btn-outline-success"  row_id="color"> Save</a> </span>';
      tbl += '<span class="btn_cancel"> <a href="#" class="btn btn-outline-danger" row_id="color"> Cancel</a> </span>';

      tbl += '</td>';
      //--->edit options > end

      tbl += '</tr>';
    });

    //--->create table body rows > end

    tbl += '</tbody>';
    //--->create table body > end

    tbl += '</table>'
    //--->create data table > end

    //out put table data
    $(document).find('.tbl_user_data').html(tbl);

    $(document).find('.btn_save').hide();
    $(document).find('.btn_cancel').hide();


  }


// In this file you can include the rest of your app1's specific main process
// code. You can also put them in separate files and import them here.
