"use strict";
$(document).ready(function () {

    $('#package_purchase').on('change', function(){
        var packageuser = $(this).val();
        
        if(packageuser=="other"){
            $("#packageuser").css("display", "block");
        }else{
            $("#packageuser").css("display", "none");
        }
    });

    // ONCHANGE DROPDOWN
    $('#leveldropdown').on('change',function() {
        var selected1 = $(this).val();
        var tabtable1 = '#datatable_'+selected1; 
        //id Dynamically   
        $(tabtable1).DataTable({ 
                responsive: true, 
                paging: true,
                searching: true,
                "bDestroy": true,
                dom: "<'row'<'col-sm-4'l><'col-sm-4 text-center'B><'col-sm-4'f>>tp", 
                "lengthMenu": [[10, 25, 50, -1], [10, 25, 50, "All"]], 
                buttons: [  
                    {extend: 'copy', className: 'btn-sm'}, 
                    {extend: 'csv', title: 'ExampleFile', className: 'btn-sm'}, 
                    {extend: 'excel', title: 'ExampleFile', className: 'btn-sm', title: 'exportTitle'}, 
                    {extend: 'pdf', title: 'ExampleFile', className: 'btn-sm'}, 
                    {extend: 'print', className: 'btn-sm'} 
                ]
               
        });    

           // $('#leveldropdown').data.reload();
          
    });  

    //id datatable_label      
    $('#datatable_label').DataTable({ 
        responsive: true, 
        paging: true,
        searching: true,
        "bDestroy": true,
        dom: "<'row'<'col-sm-4'l><'col-sm-4 text-center'B><'col-sm-4'f>>tp", 
        "lengthMenu": [[10, 25, 50, -1], [10, 25, 50, "All"]], 
        buttons: [  
            {extend: 'copy', className: 'btn-sm'}, 
            {extend: 'csv', title: 'ExampleFile', className: 'btn-sm'}, 
            {extend: 'excel', title: 'ExampleFile', className: 'btn-sm', title: 'exportTitle'}, 
            {extend: 'pdf', title: 'ExampleFile', className: 'btn-sm'}, 
            {extend: 'print', className: 'btn-sm'} 
        ] 
    });     
           
    
    //tooltips
    $('[data-toggle="tooltip"]').tooltip();

    //calss datatable
    $('.datatable').DataTable({ 
        responsive: true, 
        dom: "<'row'<'col-sm-4'l><'col-sm-4 text-center'B><'col-sm-4'f>>tp", 
        "lengthMenu": [[10, 25, 50, -1], [10, 25, 50, "All"]], 
        buttons: [  
            {extend: 'copy', className: 'btn-sm'}, 
            {extend: 'csv', title: 'ExampleFile', className: 'btn-sm'}, 
            {extend: 'excel', title: 'ExampleFile', className: 'btn-sm', title: 'exportTitle'}, 
            {extend: 'pdf', title: 'ExampleFile', className: 'btn-sm'}, 
            {extend: 'print', className: 'btn-sm'} 
        ] 
    });

    //class datatable2
    $('.datatable2').DataTable({ 
        responsive: true, 
        paging:false,
        dom: "<'row'<'col-sm-4'B><'col-sm-4'l><'col-sm-4'f>>tp", 
        buttons: [  
            {extend: 'copy', className: 'btn-sm'}, 
            {extend: 'csv', title: 'ExampleFile', className: 'btn-sm'}, 
            {extend: 'excel', title: 'ExampleFile', className: 'btn-sm', title: 'exportTitle'}, 
            {extend: 'pdf', title: 'ExampleFile', className: 'btn-sm'}, 
            {extend: 'print', className: 'btn-sm'} 
        ] 
    });
    
    //class datatable3
    $('.datatable3').DataTable({ 
       responsive: true,
    //    responsive: {
    //         details: {
    //             type: 'column',
    //             target: 'tr'
    //         }
    //     },
    //     columnDefs: [ {
    //         className: 'control',
    //         orderable: false,
    //         targets:   0
    //     } ],
    //     order: [ 1, 'asc' ], 
        dom: "<'row'<'col-sm-4'l><'col-sm-4 text-center'B><'col-sm-4'f>>tp", 
        "lengthMenu": [[10, 25, 50, -1], [10, 25, 50, "All"]], 
        buttons: [  
            {extend: 'copy', className: 'btn-sm'}, 
            {extend: 'csv', title: 'ExampleFile', className: 'btn-sm'}, 
            {extend: 'excel', title: 'ExampleFile', className: 'btn-sm', title: 'exportTitle'}, 
            {extend: 'pdf', title: 'ExampleFile', className: 'btn-sm'}, 
            {extend: 'print', className: 'btn-sm'} 
        ] 
    });


    //datepicker
    $(".datepicker").datepicker({
        dateFormat: "dd-mm-yy"
    }); 

    //timepicker
    $('.timepicker').timepicker({
        timeFormat: 'HH:mm:ss',
        stepMinute: 5,
        stepSecond: 15
    });

    //timepicker
    $('.timepicker-hour-min-only').timepicker({
        timeFormat: 'HH:mm:00',
        stepHour: 1,
        stepMinute: 5,
    });

    // semantic button
    $('.ui.selection.dropdown').dropdown();
    $('.ui.menu .ui.dropdown').dropdown({
        on: 'hover'
    });
 

    // select 2 dropdown 
    $("select.form-control:not(.dont-select-me)").select2({
        placeholder: "Select option",
        allowClear: true
    });

    //counter
    $('.count-number').counterUp({
        delay: 10,
        time: 3000
    });
 
    //Sparklines Charts
    $('.sparkline1').sparkline([4, 6, 7, 7, 4, 3, 2, 4, 6, 7, 4, 6, 7, 7, 4, 3, 2, 4, 6, 7, 7, 4, 3, 1, 5, 7, 6, 6, 5, 5, 4, 4, 3, 3, 4, 4, 5, 5, 6, 6, 7, 7], {
        type: 'bar',
        barColor: '#37a000',
        height: '35',
        barWidth: '3',
        barSpacing: 2
    });

    $(".sparkline2").sparkline([-8, 2, 4, 3, 5, 4, 3, 5, 5, 6, 3, 9, 7, 3, 5, 6, 9, 5, 6, 7, 2, 3, 9, 6, 6, 7, 8, 10, 15, 16, 17, 15], {
        type: 'line',
        height: '35',
        width: '100%',
        lineColor: '#37a000',
        fillColor: '#fff'
    });
    $(".sparkline3").sparkline([2, 5, 3, 7, 5, 10, 3, 6, 5, 7], {
        type: 'line',
        height: '35',
        width: '100%',
        lineColor: '#37a000',
        fillColor: '#fff'
    });
    $(".sparkline4").sparkline([10, 34, 13, 33, 35, 24, 32, 24, 52, 35], {
        type: 'line',
        height: '35',
        width: '100%',
        lineColor: '#37a000',
        fillColor: 'rgba(55, 160, 0, 0.7)'
    }); 


    //preloader
    $(document).ready(function() {
        $(".se-pre-con").fadeOut("slow");
    });

    // fixed table head
    $("#fixTable").tableHeadFixer();

    $("#allteam").DataTable({ 
        "responsive": true,              
        "paging": true,
        "searching": true,
        "bDestroy": true,

        "processing": true, //Feature control the processing indicator.
        "serverSide": false, //Feature control DataTables' server-side processing mode.
        "order": [], //Initial no order.
        "dom": "<'row'<'col-sm-4'l><'col-sm-4 text-center'B><'col-sm-4'f>>tp", 
        "lengthMenu": [[10, 25, 50, -1], [10, 25, 50, "All"]], 
        "buttons": [  
            {extend: 'copy', className: 'btn-sm'}, 
            {extend: 'csv', title: 'ExampleFile', className: 'btn-sm'}, 
            {extend: 'excel', title: 'ExampleFile', className: 'btn-sm', title: 'exportTitle'}, 
            {extend: 'pdf', title: 'ExampleFile', className: 'btn-sm'}, 
            {extend: 'print', className: 'btn-sm'} 
        ],
        "columnDefs": [
            { 
                "targets": [ 0 ], //first column / numbering column
                "orderable": false, //set not orderable
                "searchable": false //set not searchable
            },
        ]
       
    });    

});

//print a div
function printContent(el){
    var restorepage  = $('body').html();
    var printcontent = $('#' + el).clone();
    $('body').empty().html(printcontent);
    window.print();
    $('body').html(restorepage);
    location.reload();
}

$('.owl-carousel').owlCarousel({
    loop: true,
    dots: false,
    nav: true,
    navText: [
        "<i class='pe-7s-angle-left'></i>",
        "<i class='pe-7s-angle-right'></i>"
    ],
    responsiveClass: true,
    responsive: {
        0: {
            items: 1,
            nav: true
        },
        480: {
            items: 2,
            nav: true
        },
        768: {
            items: 2,
            nav: true
        },
        1000: {
            items: 3,
            nav: true,
            loop: false,
            margin: 20
        },
        1200: {
            items: 4,
            nav: true,
            loop: false,
            margin: 20
        }
    }
})


//Copy text
function myFunction() {
    var copyText = document.getElementById("copyed");
    copyText.select();
    document.execCommand("Copy");
}
 

