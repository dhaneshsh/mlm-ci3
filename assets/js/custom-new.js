(function($) {
    "use strict";

    var alllanguage = '';
    $.ajax({
        url: base_url + 'assets/js/language.json',
        async: false,
        method: 'post',
        dataType: 'json',
        global: false,
        contentType: 'application/json',
        success: function(data) {
            var lngdata = JSON.stringify(data);
            alllanguage = lngdata;
        }
    });
    var display = $.parseJSON(alllanguage);

    /**********************
    | Customer Panel Script|
    ***********************/

    $("#cid").on("change", function(event) {
        event.preventDefault();

        var inputdata = $('#buy_form').serialize();

        $.ajax({
            url: base_url + "customer/buy/buypayable",
            type: "post",
            data: inputdata,
            success: function(data) {
                $(".buy_payable").html(data);
                $("#buy_amount").prop("disabled", false);
            },
            error: function() {}
        });
    });

    $("#buy_amount").on("keyup", function(event) {
        event.preventDefault();
        var buy_amount = parseFloat($("#buy_amount").val()) || 0;
        var cid = $("#cid").val() || 0;

        if (cid == "") {
            alert(display['please_select_cryptocurrency_first'][language]);
            return false;
        } else {

            var inputdata = $('#buy_form').serialize();

            $.ajax({
                url: base_url + "customer/buy/buypayable",
                type: "post",
                data: inputdata,
                success: function(data) {
                    $(".buy_payable").html(data);
                },
                error: function() {
                    return false;
                }
            });
        }
    });

    $("#payment_method").on("change", function(event) {
        event.preventDefault();
        $.getJSON(base_url + 'internal_api/gateway', function(data) {
            var payment_method = $("#payment_method").val() || 0;
            var cid = $("#cid").val() || 0;

            if (payment_method === 'bitcoin' && cid == 1) {
                alert(display['please_select_diffrent_payment_method'][language]);
                $('#payment_method option:selected').removeAttr('selected');
                return false;
            }

            if (payment_method === 'phone') {
                $(".payment_info").html("<div class='form-group row'><label for='send_money' class='col-sm-4 col-form-label'>" + display['send_money'][language] + "</label><div class='col-sm-8'><h2><a href='tel:" + data.public_key + "'>" + data.public_key + "</a></h2></div></div><div class='form-group row'><label for='om_name' class='col-sm-4 col-form-label'>" + display['om_name'][language] + "</label><div class='col-sm-8'><input name='om_name' class='form-control om_name' type='text' id='om_name' autocomplete='off'></div></div><div class='form-group row'><label for='om_mobile' class='col-sm-4 col-form-label'>" + display['om_mobile_no'][language] + "</label><div class='col-sm-8'><input name='om_mobile' class='form-control om_mobile' type='text' id='om_mobile' autocomplete='off'></div></div><div class='form-group row'><label for='transaction_no' class='col-sm-4 col-form-label'>" + display['transaction_no'][language] + "</label><div class='col-sm-8'><input name='transaction_no' class='form-control transaction_no' type='text' id='transaction_no' autocomplete='off'></div></div><div class='form-group row'><label for='idcard_no' class='col-sm-4 col-form-label'>" + display['idcard_no'][language] + "</label><div class='col-sm-8'><input name='idcard_no' class='form-control idcard_no' type='text' id='idcard_no' autocomplete='off'></div></div>");
            } else {
                $(".payment_info").html("<div class='form-group row'><label for='comments' class='col-sm-4 col-form-label'>" + display['comments'][language] + "</label><div class='col-sm-8'><textarea name='comments' class='form-control editor' placeholder='' type='text' id='comments' autocomplete='off'></textarea></div></div>");
            }
        });
    });

    $("#sell_cid").on("change", function(event) {
        event.preventDefault();

        var inputdata = $('#sell_form').serialize();

        $.ajax({
            url: base_url + "customer/sell/sellpayable",
            type: "post",
            data: inputdata,
            success: function(data) {
                $(".sell_payable").html(data);
                $("#sell_amount").prop("disabled", false);
            },
            error: function(x) {
                return false;
            }
        });
    });

    $("#sell_amount").on("keyup", function(event) {
        event.preventDefault();

        var sell_amount = parseFloat($("#sell_amount").val()) || 0;
        var cid = $("#sell_cid").val() || 0;

        if (cid == "") {
            alert(display['please_select_cryptocurrency_first'][language]);
            return false;
        } else {

            var inputdata = $('#sell_form').serialize();
            $.ajax({
                url: base_url + "customer/sell/sellpayable",
                type: "post",
                data: inputdata,
                success: function(data) {
                    $(".sell_payable").html(data);
                },
                error: function() {
                    return false;
                }
            });
        }
    });

    $("#sell_payment_method").on("change", function(event) {
        event.preventDefault();
        $.getJSON(base_url + 'internal_api/gateway', function(data) {

            var payment_method = $("#sell_payment_method").val() || 0;

            if (payment_method === 'bitcoin') {
                $(".payment_info").html("<div class='form-group row'><label for='comments' class='col-sm-4 col-form-label comments_level'>" + display['bitcoin_wallet_id'][language] + "</label><div class='col-sm-8'><textarea name='comments' class='form-control editor' placeholder='' type='text' id='comments' autocomplete='off'></textarea></div></div>");
            } else if (payment_method === 'payeer') {
                $(".payment_info").html("<div class='form-group row'><label for='comments' class='col-sm-4 col-form-label comments_level'>" + display['payeer_wallet_id'][language] + "</label><div class='col-sm-8'><textarea name='comments' class='form-control editor' placeholder='' type='text' id='comments' autocomplete='off'></textarea></div></div>");
            } else if (payment_method === 'phone') {
                $(".payment_info").html("<div class='form-group row'><label for='send_money' class='col-sm-4 col-form-label'>" + display['send_money'][language] + "</label><div class='col-sm-8'><h2><a href='tel:" + data.public_key + "'>" + data.public_key + "</a></h2></div></div><div class='form-group row'><label for='om_name' class='col-sm-4 col-form-label'>" + display['om_name'][language] + "</label><div class='col-sm-8'><input name='om_name' class='form-control om_name' type='text' id='om_name' autocomplete='off'></div></div><div class='form-group row'><label for='om_mobile' class='col-sm-4 col-form-label'>" + display['om_mobile_no'][language] + "</label><div class='col-sm-8'><input name='om_mobile' class='form-control om_mobile' type='text' id='om_mobile' autocomplete='off'></div></div><div class='form-group row'><label for='transaction_no' class='col-sm-4 col-form-label'>" + display['transaction_no'][language] + "</label><div class='col-sm-8'><input name='transaction_no' class='form-control transaction_no' type='text' id='transaction_no' autocomplete='off'></div></div><div class='form-group row'><label for='idcard_no' class='col-sm-4 col-form-label'>" + display['idcard_no'][language] + "</label><div class='col-sm-8'><input name='idcard_no' class='form-control idcard_no' type='text' id='idcard_no' autocomplete='off'></div></div>");
            } else {
                $(".payment_info").html("<div class='form-group row'><label for='comments' class='col-sm-4 col-form-label comments_level'>" + display['account_info'][language] + "</label><div class='col-sm-8'><textarea name='comments' class='form-control editor' placeholder='' type='text' id='comments' autocomplete='off'></textarea></div></div>");
            }
        });
    });

    $('#confirm_withdraw_btn').on('click', function() {
        confirm_withdraw();
    });

    //confirm withdraw
    function confirm_withdraw() {

        var inputdata = $('#verify').serialize();

        swal({
            title: 'Please Wait......',
            type: 'warning',
            showConfirmButton: false,
            onOpen: function() {
                swal.showLoading()
            }
        });


        $.ajax({
            url: base_url + 'customer/withdraw/withdraw_verify',
            type: 'POST', //the way you want to send data to your URL
            data: inputdata,
            success: function(data) {

                if (data != '') {

                    swal({
                        title: "Good job!",
                        text: "Your Custom Email Send Successfully",
                        type: "success",
                        showConfirmButton: false,
                        timer: 1500,

                    });

                    window.location.href = base_url + "customer/withdraw/withdraw_details/" + data;

                } else {

                    swal({
                        title: "Wops!",
                        text: display['wrong_verification_code'][language],
                        type: "error",
                        showConfirmButton: false,
                        timer: 1500
                    });

                }

            }
        });
    }

    $('#deposit_amount').on('keyup', function() {
        deposit_Fee();
    });
    $('#deposit_payment_method').on('change', function() {
        deposit_Fee();
    });

    function deposit_Fee() {

        var amount = document.forms['deposit_form'].elements['amount'].value;
        var method = document.forms['deposit_form'].elements['method'].value;

        if (amount != "" || amount == 0) {
            $("#deposit_payment_method").prop("disabled", false);
        }
        if (amount == "" || amount == 0) {
            $('#fee').text("Fees is " + 0);
        }
        if (amount != "" && method != "") {

            var inputdata = $('#deposit_form').serialize();

            $.ajax({
                'url': base_url + 'customer/ajaxload/fees_load',
                'type': 'POST', //the way you want to send data to your URL
                'data': inputdata,
                'dataType': "JSON",
                'success': function(data) {
                    if (data) {
                        //remove from here, show amount after deduct fees as like fees
                        $('[name="fees"]').val(data.fees);
                        $('#fee').text("Fees is " + data.fees);
                    } else {
                        alert('Error!');
                    }
                }
            });
        }
    }

    $("#deposit_payment_method").on("change", function(event) {
        event.preventDefault();
        $.getJSON(base_url + 'internal_api/gateway', function(data) {
            var payment_method = $("#deposit_payment_method").val() || 0;
            if (payment_method == 'phone') {
                $(".payment_info").html("<div class='form-group row'><label for='send_money' class='col-sm-4 col-form-label'>Send Money</label><div class='col-sm-8'><h2><a href='tel:" + data.public_key + "'>" + data.public_key + "</a></h2></div></div><div class='form-group row'><label for='om_name' class='col-sm-4 col-form-label'>" + display['om_name'][language] + " *</label><div class='col-sm-8'><input name='om_name' class='form-control om_name' type='text' id='om_name' required autocomplete='off'></div></div><div class='form-group row'><label for='om_mobile' class='col-sm-4 col-form-label'>" + display['om_mobile_no'][language] + "*</label><div class='col-sm-8'><input name='om_mobile' class='form-control om_mobile' type='text' id='om_mobile' required autocomplete='off'></div></div><div class='form-group row'><label for='transaction_no' class='col-sm-4 col-form-label'>" + display['transaction_no'][language] + "*</label><div class='col-sm-8'><input name='transaction_no' class='form-control transaction_no' type='text' id='transaction_no' required autocomplete='off'></div></div><div class='form-group row'><label for='idcard_no' class='col-sm-4 col-form-label'>" + display['idcard_no'][language] + "</label><div class='col-sm-8'><input name='idcard_no' class='form-control idcard_no' type='text' id='idcard_no' autocomplete='off'></div></div>");
            } else if (payment_method == 'wrctoken') {
                $(function() {
                    new Clipboard('.copy-text');
                });
                $(".payment_info").html("<div class='form-group row'> <label for='send_money' class='col-sm-4 col-form-label'>Deposit To</label><div class='col-sm-8'><h4><a href='#' class='copy-text' id='content' data-clipboard-target='#content'>" + data.public_key + "</a></h4></div></div><div class='form-group row'> <label for='om_name' class='col-sm-4 col-form-label'>Deposit From *</label><div class='col-sm-8'><input name='transaction_no' class='form-control transaction_no' type='text' id='transaction_no' required autocomplete='off'></div></div><div class='form-group row'> <label for='om_name' class='col-sm-4 col-form-label'>QR Code *</label><div class='col-sm-8'><p><a href='https://link.trustwallet.com/send?coin=20000714&address=" + data.public_key + "&token_id=0xcA04b468F55dFD9E08F61b7cc772D457a5b410Ed' target='_blank'>Pay me via Trust wallet</a></p> <img class='img-responsive' src='https://api.qrserver.com/v1/create-qr-code/?size=300x300&data=" + data.public_key + "' /></div></div>");
            } else {
                $(".payment_info").html("<div class='form-group row'><label for='comments' class='col-sm-4 col-form-label'>" + display['comments'][language] + "</label><div class='col-sm-8'><textarea name='comments' class='form-control editor' placeholder='' type='text' id='comments'></textarea></div></div>");
            }
        });
    });

    $('#profile_confirm_btn').on('click', function() {
        confirm_profile();
    });

    function confirm_profile() {

        var inputdata = $('#verify').serialize();

        swal({
            title: 'Please Wait......',
            type: 'warning',
            showConfirmButton: false,
            onOpen: function() {
                swal.showLoading()
            }
        });

        $.ajax({
            url: base_url + 'customer/profile/profile_update',
            type: 'POST', //the way you want to send data to your URL
            data: inputdata,
            success: function(data) {
                if (data != '') {
                    // alert(data);
                    swal({
                        title: "Good job!",
                        text: "Your Custom Email Send Successfully",
                        type: "success",
                        showConfirmButton: false,
                        timer: 1500,

                    });
                    window.location.href = base_url + "customer/profile";
                } else {
                    swal({
                        title: "Wops!",
                        text: display['wrong_verification_code'][language],
                        type: "error",
                        showConfirmButton: false,
                        timer: 1500
                    });
                }
            }
        });
    }

    $('#receiver_id').on('blur', function() {
        var receiver_id = $(this).val();
        ReciverChack(receiver_id);
    });

    function getQRCode(address, width_height) {
        $.ajax({
            url: 'https://api.qrserver.com/v1/create-qr-code',
            type: 'GET', //the way you want to send data to your URL
            data: { 'size': width_height, 'data': address },
            success: function(data) {},
        });
    }

    function ReciverChack(receiver_id) {

        var csrf_test_name = document.forms['transfer_form'].elements['csrf_test_name'].value;

        $.ajax({
            url: base_url + 'customer/ajaxload/checke_reciver_id',
            type: 'POST', //the way you want to send data to your URL
            data: { 'receiver_id': receiver_id, 'csrf_test_name': csrf_test_name },
            success: function(data) {

                if (data != 0) {
                    $('#receiver_id').css("border", "1px green solid");
                    $('.suc').css("border", "1px green solid");
                    $(".btn-success").prop('disabled', false);
                } else {
                    $(".btn-success").prop('disabled', true);
                    $('#receiver_id').css("border", "1px red solid");
                    $('.suc').css("border", "1px red solid");
                }
            },
        });
    }

    $('#transfer_confirm_btn').on('click', function() {
        confirm_transfer();
    });

    function confirm_transfer() {

        var inputdata = $('#verify').serialize();

        swal({
            title: 'Please Wait......',
            type: 'warning',
            showConfirmButton: false,
            onOpen: function() {
                swal.showLoading()
            }
        });

        $.ajax({
            url: base_url + 'customer/transfer/transfer_verify',
            type: 'POST', //the way you want to send data to your URL
            data: inputdata,
            success: function(data) {

                if (data != '') {

                    var url = $(location).attr('href');
                    var segments = url.split('/');
                    var tx_id = segments[7];

                    swal({
                        title: "Good job!",
                        text: "Your Custom Email Send Successfully",
                        type: "success",
                        showConfirmButton: false,
                        timer: 1500,

                    });
                    window.location.href = base_url + "customer/transfer/transfer_recite/" + tx_id;
                } else {

                    swal({
                        title: "Wops!",
                        text: display['wrong_verification_code'][language],
                        type: "error",
                        showConfirmButton: false,
                        timer: 1500
                    });
                }
            }
        });
    }

    $('#withdraw_payment_method').on('change', function() {
        withdraw($(this).val());
    });

    function withdraw(method) {

        var csrf_test_name = document.forms['withdraw'].elements['csrf_test_name'].value;

        if (method == 'phone') { method = 'phone'; }

        $.ajax({
            'url': base_url + 'customer/ajaxload/walletid',
            'type': 'POST', //the way you want to send data to your URL
            'data': { 'method': method, 'csrf_test_name': csrf_test_name },
            'dataType': 'JSON',
            'success': function(data) {

                if (data) {

                    $('[name="walletid"]').val(data.wallet_id);
                    $('button[type=submit]').prop('disabled', false);
                    $('#walletidis').text('Your Wallet Id Is ' + data.wallet_id);

                } else {
                    $('button[type=submit]').prop('disabled', true);
                    $('#walletidis').text('Your Have No Wallet Id ');
                }
            }
        });
    }

    if (segment === 'home') {
        $('.home').addClass('active');
    } else if (segment === 'team' || segment === 'commission') {
        $('.account').addClass('active');
    } else if (segment === 'withdraw' || segment === 'transfer') {
        $('.finance').addClass('active');
    } else if (segment === 'investment' || segment === 'package') {
        $('.package').addClass('active');
    } else if (segment === 'deposit') {
        $('.deposit').addClass('active');
    } else if (segment === 'transection') {
        $('.transection').addClass('active');
    } else if (segment === 'notification') {
        $('.notification').addClass('active');
    } else if (segment === 'message') {
        $('.message').addClass('active');
    } else if (segment === 'settings') {
        $('.settings').addClass('active');
    } else if (segment === 'currency' || segment === 'buy' || segment === 'sell') {
        $('.exchange').addClass('active');
    }

    /**********************
    | Backend Panel Script|
    ***********************/

    $("#add_type").on("change", function(event) {
        event.preventDefault();

        var url = $(location).attr('href');
        var segments = url.split('/');
        var obj_id = segments[8];

        $.getJSON(base_url + 'internal_api/getAdvertisementinfo/' + obj_id, function(data) {

            var add_type = $("#add_type").val() || 0;

            if (add_type === 'image' && obj_id == null) {
                $("#add_content_load").html("<div class='form-group row'><label for='image' class='col-sm-4 col-form-label'>" + display['image'][language] + "</label><div class='col-sm-8'><input title='728x90 or 320x350 px(jpg, jpeg, png, gif, ico)' name='image' class='form-control image' type='file' id='image'><input type='hidden' name='image_old' value=''></div></div><div class='form-group row'><label for='url' class='col-sm-4 col-form-label'>" + display['url'][language] + "</label><div class='col-sm-8'><input name='url' value='' class='form-control' placeholder='" + display['url'][language] + "' type='text' id='url'></div></div>");
            }

            if (add_type === 'code' && obj_id == null) {
                $("#add_content_load").html("<div class='form-group row'><label for='script' class='col-sm-4 col-form-label'>" + display['embed_code'][language] + "<i class='text-danger'>*</i></label><div class='col-sm-8'><textarea  name='script' class='form-control' placeholder='" + display['embed_code'][language] + "' type='text' id='script'></textarea></div></div>");
            }

            if (add_type === 'image') {
                console.log(data);
                console.log("uper");

                contentdata = "";
                if (data.image != "") {
                    var contentdata = "<img src='" + base_url + data.image + "' width='450'>";
                }
                $("#add_content_load").html("<div class='form-group row'><label for='image' class='col-sm-4 col-form-label'>" + display['image'][language] + "</label><div class='col-sm-8'><input title='728x90 or 320x350 px(jpg, jpeg, png, gif, ico)' name='image' class='form-control image' type='file' id='image'><input type='hidden' name='image_old' value='" + data.image + "'>" + contentdata + "</div></div><div class='form-group row'><label for='url' class='col-sm-4 col-form-label'>" + display['url'][language] + "</label><div class='col-sm-8'><input name='url' value='" + data.url + "' class='form-control' placeholder='" + display['url'][language] + "' type='text' id='url'></div></div>");
            } else if (add_type === 'code') {
                $("#add_content_load").html("<div class='form-group row'><label for='script' class='col-sm-4 col-form-label'>" + display['embed_code'][language] + "<i class='text-danger'>*</i></label><div class='col-sm-8'><textarea  name='script' class='form-control' placeholder='" + display['embed_code'][language] + "' type='text' id='script'>" + data.script + "</textarea></div></div>");
            } else {
                $("#add_content_load").html("");
            }
        });
    });

    $("#gatewayname").on("change", function(event) {
        event.preventDefault();
        var gatewayname = $("#gatewayname").val();

        $.getJSON(base_url + 'internal_api/getemailsmsgateway', function(sms) {

            var host = "";
            var user = "";
            var userid = "";
            var api = "";
            var password = "";
            var sms_sender = "";
            var sms_template_id = "";
            var sms_transaction_type = "";

            if (sms.gatewayname == "budgetsms") {
                host = sms.host;
                user = sms.user;
                userid = sms.userid;
                api = sms.api;
            }
            if (sms.gatewayname == "infobip") {
                host = sms.host;
                user = sms.user;
                password = sms.password;
            }
            if (sms.gatewayname == "smsrank") {
                host = sms.host;
                user = sms.user;
                password = sms.password;
                sms_sender = sms.sms_sender;
                sms_template_id = sms.sms_template_id;
                sms_transaction_type = sms.sms_transaction_type;
            }
            if (sms.gatewayname == "nexmo") {
                api = sms.api;
                password = sms.password;
            }

            if (gatewayname === 'budgetsms') {
                $("#sms_field").html("<div class='form-group row'><label for='host' class='col-xs-3 col-form-label'>" + display['host'][language] + " <i class='text-danger'>*</i></label><div class='col-xs-9'><input name='host' type='text' class='form-control' id='host' placeholder='" + display['host'][language] + "' value='" + host + "' required></div></div><div class='form-group row'><label for='user' class='col-xs-3 col-form-label'>" + display['username'][language] + " <i class='text-danger'>*</i></label><div class='col-xs-9'><input name='user' type='text' class='form-control' id='user' placeholder='" + display['username'][language] + "' value='" + user + "' required></div></div><div class='form-group row'><label for='userid' class='col-xs-3 col-form-label'>" + display['user_id'][language] + " <i class='text-danger'>*</i></label><div class='col-xs-9'><input name='userid' type='text' class='form-control' id='userid' placeholder='" + display['user_id'][language] + "' value='" + userid + "' required></div></div><div class='form-group row'><label for='api' class='col-xs-3 col-form-label'>" + display['apikey'][language] + " <i class='text-danger'>*</i></label><div class='col-xs-9'><input name='api' type='text' class='form-control' id='api' placeholder='" + display['apikey'][language] + "' value='" + api + "' required></div></div>");

            } else if (gatewayname === 'infobip') {
                $("#sms_field").html("<div class='form-group row'><label for='host' class='col-xs-3 col-form-label'>" + display['host'][language] + " <i class='text-danger'>*</i></label><div class='col-xs-9'><input name='host' type='text' class='form-control' id='host' placeholder='" + display['host'][language] + "' value='" + host + "' required></div></div><div class='form-group row'><label for='user' class='col-xs-3 col-form-label'>" + display['username'][language] + " <i class='text-danger'>*</i></label><div class='col-xs-9'><input name='user' type='text' class='form-control' id='user' placeholder='" + display['username'][language] + "' value='" + user + "' required></div></div><div class='form-group row'><label for='password' class='col-xs-3 col-form-label'>" + display['password'][language] + " <i class='text-danger'>*</i></label><div class='col-xs-9'><input name='password' type='password' class='form-control' id='password' placeholder='" + display['password'][language] + "' value='" + password + "' required></div></div>");

            } else if (gatewayname === 'smsrank') {
                $("#sms_field").html("<div class='form-group row'> <label for='host' class='col-xs-3 col-form-label'>" + display['host'][language] + " <i class='text-danger'>*</i></label><div class='col-xs-9'><input name='host' type='text' class='form-control' id='host' placeholder='" + display['host'][language] + "' value='" + host + "' required></div></div><div class='form-group row'> <label for='user' class='col-xs-3 col-form-label'>" + display['username'][language] + " <i class='text-danger'>*</i></label><div class='col-xs-9'><input name='user' type='text' class='form-control' id='user' placeholder='" + display['username'][language] + "' value='" + user + "' required></div></div><div class='form-group row'> <label for='password' class='col-xs-3 col-form-label'>" + display['password'][language] + " <i class='text-danger'>*</i></label><div class='col-xs-9'><input name='password' type='password' class='form-control' id='password' placeholder='" + display['password'][language] + "' value='" + password + "' required></div></div><div class='form-group row'> <label for='sms_sender' class='col-xs-3 col-form-label'>" + display['sms_sender'][language] + " </label><div class='col-xs-9'><input name='sms_sender' type='text' class='form-control' id='sms_sender' placeholder='" + display['sms_sender'][language] + "' value='" + sms_sender + "'></div></div><div class='form-group row'> <label for='sms_transaction_type' class='col-xs-3 col-form-label'>" + display['sms_transaction_type'][language] + " </label><div class='col-xs-9'><input name='sms_transaction_type' type='text' class='form-control' id='sms_transaction_type' placeholder='" + display['sms_transaction_type'][language] + "' value='" + sms_transaction_type + "'></div></div><div class='form-group row'> <label for='sms_template_id' class='col-xs-3 col-form-label'>" + display['sms_template_id'][language] + " </label><div class='col-xs-9'><input name='sms_template_id' type='text' class='form-control' id='sms_template_id' placeholder='" + display['sms_template_id'][language] + "' value='" + sms_template_id + "'></div></div>");

            } else if (gatewayname === 'nexmo') {
                $("#sms_field").html("<div class='form-group row'><label for='api' class='col-xs-3 col-form-label'>" + display['apikey'][language] + "<i class='text-danger'>*</i></label><div class='col-xs-9'><input name='api' type='text' class='form-control' id='api' placeholder='" + display['apikey'][language] + "' value='" + api + "' required></div></div><div class='form-group row'><label for='password' class='col-xs-3 col-form-label'>" + display['app_secret'][language] + " <i class='text-danger'>*</i></label><div class='col-xs-9'><input name='password' type='password' class='form-control' id='password' placeholder='" + display['password'][language] + "' value='" + password + "' required></div></div>");

            } else if (gatewayname === 'twilio') {
                $("#sms_field").html("<h3><a href='https://www.twilio.com'>Twilio</a> Is On Development</h3>");

            } else {
                $("#sms_field").html("<h3>Nothing Found</h3>");

            }

        });
    });

    if ($("#gatewayname").length) {
        var gatewayname = $("#gatewayname").val();
        if (gatewayname) {
            $.getJSON(base_url + 'internal_api/getemailsmsgateway', function(sms) {

                var host = "";
                var user = "";
                var userid = "";
                var api = "";
                var password = "";
                var sms_sender = "";
                var sms_template_id = "";
                var sms_transaction_type = "";

                if (sms.gatewayname == "budgetsms") {
                    host = sms.host;
                    user = sms.user;
                    userid = sms.userid;
                    api = sms.api;
                }
                if (sms.gatewayname == "infobip") {
                    host = sms.host;
                    user = sms.user;
                    password = sms.password;
                }
                if (sms.gatewayname == "smsrank") {
                    host = sms.host;
                    user = sms.user;
                    password = sms.password;
                    sms_sender = sms.sms_sender;
                    sms_template_id = sms.sms_template_id;
                    sms_transaction_type = sms.sms_transaction_type;
                }
                if (sms.gatewayname == "nexmo") {
                    api = sms.api;
                    password = sms.password;
                }

                if (gatewayname === 'budgetsms') {
                    $("#sms_field").html("<div class='form-group row'><label for='host' class='col-xs-3 col-form-label'>" + display['host'][language] + " <i class='text-danger'>*</i></label><div class='col-xs-9'><input name='host' type='text' class='form-control' id='host' placeholder='" + display['host'][language] + "' value='" + host + "' required></div></div><div class='form-group row'><label for='user' class='col-xs-3 col-form-label'>" + display['username'][language] + " <i class='text-danger'>*</i></label><div class='col-xs-9'><input name='user' type='text' class='form-control' id='user' placeholder='" + display['username'][language] + "' value='" + user + "' required></div></div><div class='form-group row'><label for='userid' class='col-xs-3 col-form-label'>" + display['user_id'][language] + " <i class='text-danger'>*</i></label><div class='col-xs-9'><input name='userid' type='text' class='form-control' id='userid' placeholder='" + display['user_id'][language] + "' value='" + userid + "' required></div></div><div class='form-group row'><label for='api' class='col-xs-3 col-form-label'>" + display['apikey'][language] + " <i class='text-danger'>*</i></label><div class='col-xs-9'><input name='api' type='text' class='form-control' id='api' placeholder='" + display['apikey'][language] + "' value='" + api + "' required></div></div>");

                } else if (gatewayname === 'infobip') {
                    $("#sms_field").html("<div class='form-group row'><label for='host' class='col-xs-3 col-form-label'>" + display['host'][language] + " <i class='text-danger'>*</i></label><div class='col-xs-9'><input name='host' type='text' class='form-control' id='host' placeholder='" + display['host'][language] + "' value='" + host + "' required></div></div><div class='form-group row'><label for='user' class='col-xs-3 col-form-label'>" + display['username'][language] + " <i class='text-danger'>*</i></label><div class='col-xs-9'><input name='user' type='text' class='form-control' id='user' placeholder='" + display['username'][language] + "' value='" + user + "' required></div></div><div class='form-group row'><label for='password' class='col-xs-3 col-form-label'>" + display['password'][language] + " <i class='text-danger'>*</i></label><div class='col-xs-9'><input name='password' type='password' class='form-control' id='password' placeholder='" + display['password'][language] + "' value='" + password + "' required></div></div>");

                } else if (gatewayname === 'smsrank') {
                    $("#sms_field").html("<div class='form-group row'> <label for='host' class='col-xs-3 col-form-label'>" + display['host'][language] + " <i class='text-danger'>*</i></label><div class='col-xs-9'><input name='host' type='text' class='form-control' id='host' placeholder='" + display['host'][language] + "' value='" + host + "' required></div></div><div class='form-group row'> <label for='user' class='col-xs-3 col-form-label'>" + display['username'][language] + " <i class='text-danger'>*</i></label><div class='col-xs-9'><input name='user' type='text' class='form-control' id='user' placeholder='" + display['username'][language] + "' value='" + user + "' required></div></div><div class='form-group row'> <label for='password' class='col-xs-3 col-form-label'>" + display['password'][language] + " <i class='text-danger'>*</i></label><div class='col-xs-9'><input name='password' type='password' class='form-control' id='password' placeholder='" + display['password'][language] + "' value='" + password + "' required></div></div><div class='form-group row'> <label for='sms_sender' class='col-xs-3 col-form-label'>" + display['sms_sender'][language] + " </label><div class='col-xs-9'><input name='sms_sender' type='text' class='form-control' id='sms_sender' placeholder='" + display['sms_sender'][language] + "' value='" + sms_sender + "'></div></div><div class='form-group row'> <label for='sms_transaction_type' class='col-xs-3 col-form-label'>" + display['sms_transaction_type'][language] + " </label><div class='col-xs-9'><input name='sms_transaction_type' type='text' class='form-control' id='sms_transaction_type' placeholder='" + display['sms_transaction_type'][language] + "' value='" + sms_transaction_type + "'></div></div><div class='form-group row'> <label for='sms_template_id' class='col-xs-3 col-form-label'>" + display['sms_template_id'][language] + " </label><div class='col-xs-9'><input name='sms_template_id' type='text' class='form-control' id='sms_template_id' placeholder='" + display['sms_template_id'][language] + "' value='" + sms_template_id + "'></div></div>");

                } else if (gatewayname === 'nexmo') {
                    $("#sms_field").html("<div class='form-group row'><label for='api' class='col-xs-3 col-form-label'>" + display['apikey'][language] + "<i class='text-danger'>*</i></label><div class='col-xs-9'><input name='api' type='text' class='form-control' id='api' placeholder='" + display['apikey'][language] + "' value='" + api + "' required></div></div><div class='form-group row'><label for='password' class='col-xs-3 col-form-label'>" + display['app_secret'][language] + " <i class='text-danger'>*</i></label><div class='col-xs-9'><input name='password' type='password' class='form-control' id='password' placeholder='" + display['password'][language] + "' value='" + password + "' required></div></div>");

                } else if (gatewayname === 'twilio') {
                    $("#sms_field").html("<h3><a href='https://www.twilio.com'>Twilio</a> Is On Development</h3>");

                } else {
                    $("#sms_field").html("<h3>Nothing Found</h3>");

                }

            });
        }
    }

    $("#receving_status").on("click", function(event) {
        if ($('#receving_status').is(':checked')) {
            window.setTimeout(function() {
                $(".receving_complete .i-check").html("<label for='receving_status_confirm'><input tabindex='5' type='checkbox' id='receving_status_confirm' name='receving_status_confirm' value='resconf'>Confirm <i class='fa fa-spinner fa-spin' style='font-size:24px'></i><span class='checkmark'></span></label>");

                $("#receving_status_confirm").on("click", function(event) {
                    if ($('#receving_status_confirm').is(':checked')) {

                        var inputdata = $('#exchange_form').serialize();

                        $.ajax({
                            url: base_url + "backend/exchange/exchange/receiveConfirm",
                            type: "post",
                            data: inputdata,
                            success: function(data) {
                                $(".receving_complete .i-check").html(data);
                                location.reload();
                            },
                            error: function() {
                                $(".receving_complete").html("<h1>Error</h1>");
                                location.reload();
                            }
                        });
                    }
                });
            }, 500);
        }
    });

    $("#payment_status").on("click", function(event) {
        if ($('#payment_status').is(':checked')) {
            window.setTimeout(function() {
                $(".payment_complete .i-check").html("<label for='payment_status_confirm'><input tabindex='5' type='checkbox' id='payment_status_confirm' name='payment_status_confirm' value='resconf'>Confirm <i class='fa fa-spinner fa-spin' style='font-size:24px'></i><span class='checkmark'></span></label>");

                $("#payment_status_confirm").on("click", function(event) {
                    if ($('#payment_status_confirm').is(':checked')) {

                        var inputdata = $('#exchange_payment_form').serialize();

                        $.ajax({
                            url: base_url + "backend/exchange/exchange/receiveConfirm",
                            type: "post",
                            data: inputdata,
                            success: function(data) {
                                $(".payment_complete .i-check").html(data);
                                location.reload();
                            },
                            error: function() {
                                $(".payment_complete").html("<h1>Error</h1>");
                                location.reload();
                            }
                        });
                    }
                });
            }, 500);
        }
    });
    //remove from here admin status change but it not work.

    if ($('#lineChart').length) {
        $.getJSON(base_url + 'internal_api/getlinechartdata', function(data) {
            var ctx = document.getElementById("lineChart");
            window.myChart1 = new Chart(ctx, {
                type: 'line',
                data: {
                    labels: data.months,
                    datasets: [{
                            label: "Investment",
                            borderColor: "rgba(0,0,0,.09)",
                            borderWidth: "1",
                            backgroundColor: "rgba(0,0,0,.07)",
                            data: data.investamount
                        },
                        {
                            label: "Profit Share+Refferal Bonus",
                            borderColor: "rgba(55, 160, 0, 0.9)",
                            borderWidth: "1",
                            backgroundColor: "rgba(55, 160, 0, 0.5)",
                            pointHighlightStroke: "rgba(26,179,148,1)",
                            data: data.roiamount
                        }
                    ]
                },
                options: {
                    responsive: true,
                    tooltips: {
                        mode: 'index',
                        intersect: false
                    },
                    hover: {
                        mode: 'nearest',
                        intersect: true
                    }

                }
            });
        });
    }

    if ($('#pieChart').length) {
        $.getJSON(base_url + 'internal_api/getpiechartdata', function(data) {
            var ctx = document.getElementById("pieChart");
            console.log(data);
            window.myChart2 = new Chart(ctx, {
                type: 'pie',
                data: {
                    datasets: [{
                        data: data.transactionamount,
                        backgroundColor: [
                            "rgba(55,160,0,0.9)",
                            "rgba(255,0,0,0.9)"
                        ],
                        hoverBackgroundColor: [
                            "rgba(55,160,0,0.8)",
                            "rgba(255,0,0,0.8)"
                        ]
                    }],
                    labels: data.transactioncat
                },
                options: {
                    responsive: true
                }
            });
        });
    }

    $("#invest_date").on("change", function(event) {
        event.preventDefault();
        var inputdata = $("#invest_date_form").serialize();
        $.ajax({
            url: base_url + "backend/dashboard/home/yearly_invest",
            type: "post",
            data: inputdata,
            dataType: "script",
            success: function(rdata) {
                if (window.myChart1 != undefined) {
                    window.myChart1.destroy();
                }
                $("#linechart").html(rdata);

            },
            error: function(data) {}
        });
    });

    $("#depowith_year").on("change", function(event) {
        event.preventDefault();
        var inputdata = $("#depowith_form").serialize();
        $.ajax({
            url: base_url + "backend/dashboard/home/yearly_depwith",
            type: "post",
            data: inputdata,
            dataType: "script",
            success: function(rdata) {
                if (window.myChart2 != undefined) {
                    window.myChart2.destroy();
                }
                $("#piescript").html(rdata);

            },
            error: function(data) {

            }
        });
    });

    if ($("#weekly_roi").length) {
        var weekly_roi = parseFloat($("#weekly_roi").val()) || 0;
        if (weekly_roi > 0) {
            $("#weekly_roi").prop("disabled", false);
        }
    }

    $("#package_amount").on("keyup", function(event) {
        event.preventDefault();
        var package_amount = parseFloat($("#package_amount").val()) || 0;

        if (package_amount > 0) {

            $("#daily_roi").prop("disabled", false);

            var package_amount = parseFloat($("#package_amount").val()) || 0;
            var daily_roi = parseFloat($("#daily_roi").val()) || 0;
            var weekly_roi = parseFloat($("#weekly_roi").val()) || 0;
            var monthly_roi = parseFloat($("#monthly_roi").val()) || 0;
            var yearly_roi = parseFloat($("#yearly_roi").val()) || 0;
            var total_percent = parseFloat($("#total_percent").val()) || 0;
            var period = parseFloat($("#period").val()) || 0;

            if (daily_roi > 0) {
                if (package_amount) {
                    monthly_roi = (365 / 12) * daily_roi;
                    weekly_roi = 7 * daily_roi;
                    yearly_roi = 365 * daily_roi;
                    total_percent = (daily_roi * period);

                    $("#monthly_roi").val(Math.round(monthly_roi));
                    $("#weekly_roi").val(Math.round(weekly_roi));
                    $("#yearly_roi").val(Math.round(yearly_roi));
                    $("#total_percent").val(Math.round(total_percent));

                } else {
                    alert("Please Enter Package amount!");
                    return false;

                }
            } else {
                $("#daily_roi").val(0);
                $("#weekly_roi").val(0);
                $("#monthly_roi").val(0);
                $("#yearly_roi").val(0);
                $("#total_percent").val(0);
            }

        } else {
            $("#weekly_roi").prop("disabled", true);
            $("#daily_roi").prop("disabled", true);
        }
    });

    $("#daily_roi").on("keyup", function(event) {
        event.preventDefault();
        var package_amount = parseFloat($("#package_amount").val()) || 0;
        var daily_roi = parseFloat($("#daily_roi").val()) || 0;
        var weekly_roi = parseFloat($("#weekly_roi").val()) || 0;
        var monthly_roi = parseFloat($("#monthly_roi").val()) || 0;
        var yearly_roi = parseFloat($("#yearly_roi").val()) || 0;
        var total_percent = parseFloat($("#total_percent").val()) || 0;
        var period = parseFloat($("#period").val()) || 0;

        if (package_amount) {
            monthly_roi = (365 / 12) * daily_roi;
            weekly_roi = 7 * daily_roi;
            yearly_roi = 365 * daily_roi;
            total_percent = (daily_roi * period);

            $("#monthly_roi").val(monthly_roi.toFixed(4));
            $("#weekly_roi").val(Math.round(weekly_roi));
            $("#yearly_roi").val(yearly_roi.toFixed(4));
            $("#total_percent").val(total_percent.toFixed(4));

        } else {
            alert("Please Enter Package amount!");
            return false;
        }
    });

    ///////////////////// Withdraw Panding Lint ////////////////////////////////////////
    $(".AjaxModal").click(function() {
        var url = $(this).attr("href");
        var href = url.split("#");
        jquery_ajax(href[1]);
    });

    function jquery_ajax(id) {
        var discount = 10;
        var dis = parseFloat(discount);
        var amt = 0;
        var charges = 0;
        var paid = 0;
        $.ajax({
            url: base_url + "backend/Ajax_load/user_info_load/" + id,
            type: "GET",
            data: { 'id': id },
            dataType: "JSON",
            success: function(data) {
                $('#user_id').text(data.user_id);
                $('#name').text(data.f_name + ' ' + data.l_name);
                $('#email').text(data.email);
                $('#phone').text(data.phone);
                // $('#pan_no').text(data.pan_no);
                if (data.earning_type == 'type1') {
                    $('#earning_type').text('commission');
                    $('.modal-title').html('Withdraw Commission Info');
                } else {
                    $('#earning_type').text('Profit Share');
                    $('.modal-title').html('Withdraw Profit Share Info');
                }
                $('#method').text(data.method);
                $('#acc_holder_name').text(data.acc_holder_name);
                $('#acc_number').text(data.acc_number);
                $('#ifsc').text(data.ifsc);
                $('#bank').text(data.bank);
                $('#amount').text(data.amount);
                amt = parseFloat(data.amount);
                charges = (amt * dis / 100).toFixed(2);
                $('#charges').text(charges);
                paid = (amt - charges).toFixed(2);
                $('#paid').text(paid);
                if (data.request_date != undefined) {
                    $('#success_date').css("display", "none");
                    $('#success_row').css("display", "none");
                    $('#cancel_date').css("display", "none");
                    $('#cancel_row').css("display", "none");
                    $('#request_date').css("display", "block");
                    $('#request_row').css("display", "block");
                    $('#request_date').text(data.request_date);
                } else if (data.success_date != undefined) {
                    $('#cancel_date').css("display", "none");
                    $('#cancel_row').css("display", "none");
                    $('#request_date').css("display", "none");
                    $('#request_row').css("display", "none");
                    $('#success_date').css("display", "block");
                    $('#success_row').css("display", "block");
                    $('#success_date').text(data.success_date);
                } else {
                    $('#request_date').css("display", "none");
                    $('#request_row').css("display", "none");
                    $('#success_date').css("display", "none");
                    $('#success_row').css("display", "none");
                    $('#cancel_date').css("display", "block");
                    $('#cancel_row').css("display", "block");
                    $('#cancel_date').text(data.cancel_date);
                }

                if (data.status == 1) {
                    $('#status').html('<a href="#" class="btn btn-warning btn-sm" data-toggle="tooltip" data-placement="left" title="pending_withdraw">Pending Withdraw</a>');
                }
                if (data.status == 2) {
                    $('#status').html('<a href="#" class="btn btn-success btn-sm" data-toggle="tooltip" data-placement="left" title="success">Success</a>');
                }
                if (data.status == 3) {
                    $('#status').html('<a href="#" class="btn btn-danger btn-sm" data-toggle="tooltip" data-placement="left" title="cancel">Cancel</a>');
                }
                // alert(data.status);
                switch (data.status) {
                    case data.status < 2:
                        break;
                    case data.status < 3:
                        break;
                    default:
                        $('#success_button').html('<a href=' + base_url + 'backend/withdraw/withdraw/confirm_withdraw?id=' + data.withdraw_id + '&user_id=' + data.user_id + '&set_status=2" class="btn btn-success btn-sm" data-toggle="tooltip" data-placement="left" title="confirm">Confirm</a>');
                        $('#cancel_button').html('<a href=' + base_url + 'backend/withdraw/withdraw/cancel_withdraw?id=' + data.withdraw_id + '&user_id=' + data.user_id + '&set_status=3" class="btn btn-danger btn-sm" data-toggle="tooltip" data-placement="left" title="cancel">Cancel</a>');
                }

            },
            error: function(jqXHR, textStatus, errorThrown) {
                alert('Error get data from ajax');
            }
        });
    } ///////////////////// END Withdraw Panding Lint ////////////////////////////////////////

    /****************************** Start Reward Controller *******************************/
    if ($('#ajaxcustomerrewardtableform').length) {
        var table;
        var ajaxusertableform = JSON.stringify($('#ajaxcustomerrewardtableform').serializeArray());
        var formdata = $.parseJSON(ajaxusertableform);
        var inputname = formdata[0]['name'];
        var inputval = formdata[0]['value'];
        //datatables
        table = $('#ajaxcustomerrewardtable').DataTable({

            "processing": true, //Feature control the processing indicator.
            "serverSide": true, //Feature control DataTables' server-side processing mode.
            "order": [], //Initial no order.
            "pageLength": 10, // Set Page Length
            "lengthMenu": [
                [10, 25, 50, 100, -1],
                [10, 25, 50, 100, "All"]
            ],

            // Load data for the table's content from an Ajax source
            "ajax": {
                "url": base_url + "customer/reward/ajax_list",
                "type": "POST",
                "data": { csrf_test_name: inputval }
            },

            //Set column definition initialisation properties.
            "columnDefs": [{
                "targets": [0], //first column / numbering column
                "orderable": false, //set not orderable
            }, ],
            "fnInitComplete": function(oSettings, response) {}

        });

        $.fn.dataTable.ext.errMode = 'none';
    }
    /****************************** End Rewaed Controller     *******************************/


    /****************************** Start Reward Controller *******************************/
    if ($('#ajaxrewardtableform').length) {
        var table;
        var ajaxusertableform = JSON.stringify($('#ajaxrewardtableform').serializeArray());
        var formdata = $.parseJSON(ajaxusertableform);
        var inputname = formdata[0]['name'];
        var inputval = formdata[0]['value'];
        //datatables
        table = $('#ajaxrewardtable').DataTable({

            "processing": true, //Feature control the processing indicator.
            "serverSide": true, //Feature control DataTables' server-side processing mode.
            "order": [], //Initial no order.
            "pageLength": 10, // Set Page Length
            "lengthMenu": [
                [10, 25, 50, 100, -1],
                [10, 25, 50, 100, "All"]
            ],

            // Load data for the table's content from an Ajax source
            "ajax": {
                "url": base_url + "backend/reward/reward/ajax_list",
                "type": "POST",
                "data": { csrf_test_name: inputval }
            },

            //Set column definition initialisation properties.
            "columnDefs": [{
                "targets": [0], //first column / numbering column
                "orderable": false, //set not orderable
            }, ],
            "fnInitComplete": function(oSettings, response) {}

        });

        $.fn.dataTable.ext.errMode = 'none';
    }
    /****************************** End Rewaed Controller     *******************************/

    /****************************** Start Reward Achiever Controller *******************************/
    if ($('#ajaxrewardachievertableform').length) {
        var table;
        var ajaxusertableform = JSON.stringify($('#ajaxrewardachievertableform').serializeArray());
        var formdata = $.parseJSON(ajaxusertableform);
        var inputname = formdata[0]['name'];
        var inputval = formdata[0]['value'];
        //datatables
        table = $('#ajaxrewardachievertable').DataTable({

            "processing": true, //Feature control the processing indicator.
            "serverSide": true, //Feature control DataTables' server-side processing mode.
            "order": [], //Initial no order.
            "pageLength": 10, // Set Page Length
            "lengthMenu": [
                [10, 25, 50, 100, -1],
                [10, 25, 50, 100, "All"]
            ],

            // Load data for the table's content from an Ajax source
            "ajax": {
                "url": base_url + "backend/reward_achiever/reward_achiever/ajax_list",
                "type": "POST",
                "data": { csrf_test_name: inputval }
            },

            //Set column definition initialisation properties.
            "columnDefs": [{
                "targets": [0], //first column / numbering column
                "orderable": false, //set not orderable
            }, ],
            "fnInitComplete": function(oSettings, response) {}

        });

        $.fn.dataTable.ext.errMode = 'none';
    }
    /****************************** End Rewaed Achiever Controller     *******************************/

    /****************************** Start Reward Achiever Controller *******************************/
    if ($('#ajaxcustomerrewardachievertableform').length) {
        var table;
        var ajaxusertableform = JSON.stringify($('#ajaxcustomerrewardachievertableform').serializeArray());
        var formdata = $.parseJSON(ajaxusertableform);
        var inputname = formdata[0]['name'];
        var inputval = formdata[0]['value'];
        //datatables
        table = $('#ajaxcustomerrewardachievertable').DataTable({

            "processing": true, //Feature control the processing indicator.
            "serverSide": true, //Feature control DataTables' server-side processing mode.
            "order": [], //Initial no order.
            "pageLength": 10, // Set Page Length
            "lengthMenu": [
                [10, 25, 50, 100, -1],
                [10, 25, 50, 100, "All"]
            ],

            // Load data for the table's content from an Ajax source
            "ajax": {
                "url": base_url + "customer/reward_achiever/ajax_list",
                "type": "POST",
                "data": { csrf_test_name: inputval }
            },

            //Set column definition initialisation properties.
            "columnDefs": [{
                "targets": [0], //first column / numbering column
                "orderable": false, //set not orderable
            }, ],
            "fnInitComplete": function(oSettings, response) {}

        });

        $.fn.dataTable.ext.errMode = 'none';
    }
    /****************************** End Rewaed Achiever Controller     *******************************/


    /****************************** Start User Controller *******************************/
    if ($('#ajaxusertableform').length) {
        var table;
        var ajaxusertableform = JSON.stringify($('#ajaxusertableform').serializeArray());
        var formdata = $.parseJSON(ajaxusertableform);
        var inputname = formdata[0]['name'];
        var inputval = formdata[0]['value'];
        //datatables
        table = $('#ajaxtable').DataTable({

            "processing": true, //Feature control the processing indicator.
            "serverSide": true, //Feature control DataTables' server-side processing mode.
            "order": [], //Initial no order.
            "pageLength": 10, // Set Page Length
            "lengthMenu": [
                [10, 25, 50, 100, -1],
                [10, 25, 50, 100, "All"]
            ],

            // Load data for the table's content from an Ajax source
            "ajax": {
                "url": base_url + "backend/user/user/ajax_list",
                "type": "POST",
                "data": { csrf_test_name: inputval }
            },

            //Set column definition initialisation properties.
            "columnDefs": [{
                "targets": [0], //first column / numbering column
                "orderable": false, //set not orderable
            }, ],
            "fnInitComplete": function(oSettings, response) {}

        });

        $.fn.dataTable.ext.errMode = 'none';
    }
    /****************************** End user Controller     *******************************/
    /****************************** Start Active Controller *******************************/
    if ($('#ajaxuseractivetableform').length) {

        var table;
        var ajaxuseractivetableform = JSON.stringify($('#ajaxuseractivetableform').serializeArray());
        var formdata = $.parseJSON(ajaxuseractivetableform);
        var inputname = formdata[0]['name'];
        var inputval = formdata[0]['value'];
        //datatables
        table = $('#ajaxactivetable').DataTable({

            "processing": true, //Feature control the processing indicator.
            "serverSide": true, //Feature control DataTables' server-side processing mode.
            "order": [], //Initial no order.
            "pageLength": 10, // Set Page Length
            "lengthMenu": [
                [10, 25, 50, 100, -1],
                [10, 25, 50, 100, "All"]
            ],

            // Load data for the table's content from an Ajax source
            "ajax": {
                "url": base_url + "backend/active/active/ajax_list",
                "type": "POST",
                "data": { csrf_test_name: inputval }
            },

            //Set column definition initialisation properties.
            "columnDefs": [{
                "targets": [0], //first column / numbering column
                "orderable": false, //set not orderable
            }, ],
            "fnInitComplete": function(oSettings, response) {

            }

        });

        $.fn.dataTable.ext.errMode = 'none';
    }
    /****************************** END Active Controller *******************************/

    /****************************** Start inActive Controller *******************************/
    if ($('#ajaxuserinactivetableform').length) {
        //var table;
        var ajaxuserinactivetableform = JSON.stringify($('#ajaxuserinactivetableform').serializeArray());
        var formdata = $.parseJSON(ajaxuserinactivetableform);
        var inputname = formdata[0]['name'];
        var inputval = formdata[0]['value'];
        //datatables
        table = $('#ajaxinactivetable').DataTable({
            "processing": true, //Feature control the processing indicator.
            "serverSide": true, //Feature control DataTables' server-side processing mode.
            "order": [], //Initial no order.
            "pageLength": 10, // Set Page Length
            "lengthMenu": [
                [10, 25, 50, 100, -1],
                [10, 25, 50, 100, "All"]
            ],

            // Load data for the table's content from an Ajax source
            "ajax": {
                "url": base_url + "backend/inactive/inactive/ajax_list",
                "type": "POST",
                "data": { csrf_test_name: inputval }
            },

            //Set column definition initialisation properties.
            "columnDefs": [{
                "targets": [0], //first column / numbering column
                "orderable": false, //set not orderable
            }, ],
            "fnInitComplete": function(oSettings, response) {

            }

        });

        $.fn.dataTable.ext.errMode = 'none';
    }
    /****************************** END inActive Controller *******************************/

    /****************************** Start payment Controller *******************************/

    var minDate, maxDate;

    // Custom filtering function which will search data in column four between two values
    $.fn.dataTable.ext.search.push(
        function(settings, data, dataIndex) {
            var min = minDate.val();
            var max = maxDate.val();
            var date = new Date(data[4]);

            if (
                (min === null && max === null) ||
                (min === null && date <= max) ||
                (min <= date && max === null) ||
                (min <= date && date <= max)
            ) {
                return true;
            }
            return false;
        }
    );

    if ($('#ajaxpaymentform').length) {

        minDate = new DateTime($('#min'), {
            format: 'YYYY-MM-DD'
        });
        maxDate = new DateTime($('#max'), {
            format: 'YYYY-MM-DD'
        });

        var payment_table;
        var ajaxpaymentform = JSON.stringify($('#ajaxpaymentform').serializeArray());
        var formdata = $.parseJSON(ajaxpaymentform);
        var inputname = formdata[0]['name'];
        var inputval = formdata[0]['value'];
        var min_value = $("#min").val();
        var max_value = $("#max").val();
        //datatables
        var rows_selected = [];
        payment_table = draw_datatable(min_value, max_value);

        // Refilter the table
        $('#min, #max').on('change', function() {
            var min = $("#min").val();
            var max = $("#max").val();

            if (min && max) {
                var payment_table = draw_datatable(min, max);
                payment_table.draw();
            }

        });

        $.fn.dataTable.ext.errMode = 'none';

        // Handle click on checkbox
        $('#ajaxpaymenttable tbody').on('click', 'input[type="checkbox"]', function(e) {

            var $row = $(this).closest('tr');
            // Get row data
            var data = payment_table.row($row).data();
            // Get row ID
            var rowId = data[0];
            // Determine whether row ID is in the list of selected row IDs
            var index = $.inArray(rowId, rows_selected);
            // If checkbox is checked and row ID is not in list of selected row IDs
            if (this.checked && index === -1) {
                rows_selected.push(rowId);
                // Otherwise, if checkbox is not checked and row ID is in list of selected row IDs
            } else if (!this.checked && index !== -1) {
                rows_selected.splice(index, 1);
            }
            if (this.checked) {
                $row.addClass('selected');
            } else {
                $row.removeClass('selected');
            }
            // Update state of "Select all" control
            // updateDataTableSelectAllCtrl(payment_table);
            // Prevent click event from propagating to parent
            e.stopPropagation();
        });

        // Handle click on table cells with checkboxes
        $('#ajaxpaymenttable').on('click', 'tbody td, thead th:first-child', function(e) {
            $(this).parent().find('input[type="checkbox"]').trigger('click');
        });

        // Handle click on "Select all" control
        $('thead input[name="select_all"]', payment_table.table().container()).on('click', function(e) {
            if (this.checked) {
                $('#ajaxpaymenttable tbody input[type="checkbox"]:not(:checked)').trigger('click');
            } else {
                $('#ajaxpaymenttable tbody input[type="checkbox"]:checked').trigger('click');
            }

            // Prevent click event from propagating to parent
            e.stopPropagation();
        });

        // Handle table draw event
        payment_table.on('draw', function() {
            // Update state of "Select all" control
            updateDataTableSelectAllCtrl(payment_table);
        });

        // Handle form submission event
        /////////////////////////////////////////////////////////////////////////////////
        $('#ajaxpaymentform').on('submit', function(e) {
            // var form =  $(this);
            e.preventDefault();
            var tblData = payment_table.rows('.selected').data();
            var tmpData;
            $.each(tblData, function(i, val) {
                //////////// each ////////////////////
                tmpData = tblData[i];

                var user_id = tmpData[2];
                var earning_type = tmpData[5];
                var amount = tmpData[7];
                var method = tmpData[8];
                var walletid = tmpData[9];
                var acc_holder_name = tmpData[10];
                var acc_number = tmpData[11];
                var ifsc = tmpData[12];
                var bank = tmpData[13];
                var earningid = tmpData[15];

                var data2 = {
                    'csrf_test_name': inputval,
                    'user_id': user_id,
                    'earning_type': earning_type,
                    'walletid': walletid,
                    'method': method,
                    'amount': amount,
                    'fees': 0,
                    'acc_holder_name': acc_holder_name,
                    'acc_number': acc_number,
                    'ifsc': ifsc,
                    'bank': bank,
                    'earningid': earningid
                };
                //alert(JSON.stringify(data2));

                $.ajax({
                    type: "POST",
                    url: base_url + "backend/payment/payment/pay",
                    data: data2,
                    dataType: 'json',
                    async: true,
                    global: false,
                    // timeout: 600000,
                    // cache: false,
                    error: function(e) {
                        console.log("ERROR: ", e);
                        alert('Something is wrong' + e);
                    },
                    success: function(data) {
                        // alert(data);
                        // alert(JSON.stringify(data));
                        // payment_table.draw();
                    }
                });
                //////////// each ////////////////////
            });
            $('#ajaxpaymenttable tbody input[type="checkbox"]:checked').trigger('click');
            payment_table.ajax.reload();
        });
        ////////////////////////////////////////////////////////////////////////////////

    }

    //
    function updateDataTableSelectAllCtrl(table) {
        var $table = table.table().node();
        var $chkbox_all = $('tbody input[type="checkbox"]', $table);
        var $chkbox_checked = $('tbody input[type="checkbox"]:checked', $table);
        var chkbox_select_all = $('thead input[name="select_all"]', $table).get(0);

        // If none of the checkboxes are checked
        if ($chkbox_checked.length === 0) {
            chkbox_select_all.checked = false;
            if ('indeterminate' in chkbox_select_all) {
                chkbox_select_all.indeterminate = false;
            }

            // If all of the checkboxes are checked
        } else if ($chkbox_checked.length === $chkbox_all.length) {
            chkbox_select_all.checked = true;
            if ('indeterminate' in chkbox_select_all) {
                chkbox_select_all.indeterminate = false;
            }

            // If some of the checkboxes are checked
        } else {
            chkbox_select_all.checked = true;
            if ('indeterminate' in chkbox_select_all) {
                chkbox_select_all.indeterminate = true;
            }
        }
    }

    function set_minvalue() {
        return $("#min").val();
    }

    function set_maxvalue() {
        return $("#max").val();
    }

    function draw_datatable(min_value, max_value) {
        // $('input[name="min"]').val(min_value);
        // $('input[name="max"]').val(max_value);

        var payementtable = $('#ajaxpaymenttable').DataTable({
            "dom": 'lBfrtip',
            "buttons": [
                'copy', 'csv', 'excel', 'pdf', 'print'
            ],
            "processing": true, //Feature control the processing indicator.
            "serverSide": true, //Feature control DataTables' server-side processing mode.
            "order": [], //Initial no order.
            "pageLength": 10, // Set Page Length
            "lengthMenu": [
                [10, 25, 50, 100, -1],
                [10, 25, 50, 100, "All"]
            ],

            // Load data for the table's content from an Ajax source
            "ajax": {
                "url": base_url + "backend/payment/payment/ajax_list",
                "type": "POST",
                "data": {
                    csrf_test_name: inputval,
                    min: set_minvalue,
                    max: set_maxvalue
                }
            },

            //Set column definition initialisation properties.
            "columnDefs": [{
                "width": "20%",
                "targets": [0], //first column / numbering column
                "orderable": false, //set not orderable                
                "searchable": false, //set not searchable
                'className': 'dt-body-center',
                'render': function(data, type, full, meta) {
                    return '<input type="checkbox">';
                }
            }],
            "fixedColumns": true,
            "select": {
                "style": 'os',
                "selector": 'td:first-child'
            },
            "order": [
                [1, 'asc']
            ],
            "rowCallback": function(row, data, dataIndex) {
                // Get row ID
                var rowId = data[0];
                // debugger;
                // If row ID is in the list of selected row IDs
                if ($.inArray(rowId, rows_selected) !== -1) {
                    $(row).find('input[type="checkbox"]').prop('checked', true);
                    $(row).addClass('selected');
                }
            },
            "fnInitComplete": function(oSettings, response) {}

        });


        return payementtable;
    }

    /****************************** End payment Controller     *******************************/
    /******************************[ Prnding Withdraw Controller ]****************************/
    if ($('#ajaxpwithdrawtableform').length) {
        // alert('hello');
        var pwithdrawtable;
        var ajaxpwithdrawtableform = JSON.stringify($('#ajaxpwithdrawtableform').serializeArray());
        var formdata = $.parseJSON(ajaxpwithdrawtableform);
        var inputname = formdata[0]['name'];
        var inputval = formdata[0]['value'];
        //datatables
        pwithdrawtable = $('#ajaxpwithdrawtable').DataTable({
            "dom": 'lBfrtip',
            "buttons": [
                'copy', 'csv', 'excel', 'pdf', 'print'
            ],
            "processing": true, //Feature control the processing indicator.
            "serverSide": true, //Feature control DataTables' server-side processing mode.
            "targets": 'no-sort',
            "bSort": false,
            "order": [], //Initial no order.
            "pageLength": 10, // Set Page Length
            "lengthMenu": [
                [10, 25, 50, 100, -1],
                [10, 25, 50, 100, "All"]
            ],

            // Load data for the table's content from an Ajax source
            "ajax": {
                "url": base_url + "backend/withdraw/pendingwithdraw/ajax_list",
                "type": "POST",
                "data": { csrf_test_name: inputval }
            },

            "fnInitComplete": function(oSettings, response) {}
        });
        $.fn.dataTable.ext.errMode = 'none';

        $('#master').on('click', function(e) {
            if ($(this).is(':checked', true)) {
                $(".sub_chk").prop('checked', true);
            } else {
                $(".sub_chk").prop('checked', false);
            }
        });

        $('#confirm_all').on('click', function(e) {
            e.preventDefault();
            var inputname = formdata[0]['name'];
            var inputval = formdata[0]['value'];
            var allVals = [];

            $(".sub_chk:checked").each(function() {
                allVals.push($(this).attr('data-id'));
            });

            if (allVals.length <= 0) {
                alert("Please select row.");
            } else {
                var check = confirm("Are you sure you want to confirm withdraw ?");
                if (check == true) {
                    // alert(inputname + ' ' + inputval + ' ' + allVals);
                    var data1 = {
                        'csrf_test_name': inputval,
                        'ids': allVals
                    }
                    $.ajax({
                        type: "POST",
                        url: base_url + "backend/withdraw/pendingwithdraw/confirm_all",
                        data: data1,
                        dataType: 'json',
                        async: true,
                        global: false,
                        error: function(e) {
                            console.log("ERROR: ", e);
                            alert('Something is wrong' + e);
                        },
                        success: function(data) {
                            alert(data);
                            pwithdrawtable.draw();
                        }
                    });


                }
            }

        });
        $('#cancel_all').on('click', function(e) {
            e.preventDefault();
            var inputname = formdata[0]['name'];
            var inputval = formdata[0]['value'];
            var allVals = [];
            $(".sub_chk:checked").each(function() {
                allVals.push($(this).attr('data-id'));
            });

            if (allVals.length <= 0) {
                alert("Please select row.");
            } else {
                var check = confirm("Are you sure you want to cancal withdraw ?");
                if (check == true) {
                    var data1 = {
                        'csrf_test_name': inputval,
                        'ids': allVals
                    }
                    $.ajax({
                        type: "POST",
                        url: base_url + "backend/withdraw/pendingwithdraw/cancel_all",
                        data: data1,
                        dataType: 'json',
                        async: true,
                        global: false,
                        error: function(e) {
                            console.log("ERROR: ", e);
                            alert('Something is wrong' + e);
                        },
                        success: function(data) {
                            alert(data);
                            pwithdrawtable.draw();
                        }
                    });
                }
            }

        });

    }

    /******************************[ End Prnding Withdraw Controller ]**************************/
    /******************************[ Confirm Withdraw Controller ]******************************/
    if ($('#ajaxcwithdrawtableform').length) {
        // alert('hello');
        var cwithdrawtable;
        var ajaxcwithdrawtableform = JSON.stringify($('#ajaxcwithdrawtableform').serializeArray());
        var formdata = $.parseJSON(ajaxcwithdrawtableform);
        var inputname = formdata[0]['name'];
        var inputval = formdata[0]['value'];
        //datatables
        cwithdrawtable = $('#ajaxcwithdrawtable').DataTable({
            "dom": 'lBfrtip',
            "buttons": [
                'copy', 'csv', 'excel', 'pdf', 'print'
            ],
            "processing": true, //Feature control the processing indicator.
            "serverSide": true, //Feature control DataTables' server-side processing mode.
            "targets": 'no-sort',
            "bSort": true,
            "order": [], //Initial no order.
            "pageLength": 10, // Set Page Length
            "lengthMenu": [
                [10, 25, 50, 100, -1],
                [10, 25, 50, 100, "All"]
            ],

            // Load data for the table's content from an Ajax source
            "ajax": {
                "url": base_url + "backend/withdraw/confirmwithdraw/ajax_list",
                "type": "POST",
                "data": { csrf_test_name: inputval }
            },

            "fnInitComplete": function(oSettings, response) {}
        });
        $.fn.dataTable.ext.errMode = 'none';


    }
    /******************************[ End Confirm Withdraw Controller ]**************************/
    /******************************[ Cancel Withdraw Controller ]******************************/
    if ($('#ajaxclwithdrawtableform').length) {
        // alert('hello');
        var clwithdrawtable;
        var ajaxclwithdrawtableform = JSON.stringify($('#ajaxclwithdrawtableform').serializeArray());
        var formdata = $.parseJSON(ajaxclwithdrawtableform);
        var inputname = formdata[0]['name'];
        var inputval = formdata[0]['value'];
        //datatables
        clwithdrawtable = $('#ajaxclwithdrawtable').DataTable({
            "dom": 'lBfrtip',
            "buttons": [
                'copy', 'csv', 'excel', 'pdf', 'print'
            ],
            "processing": true, //Feature control the processing indicator.
            "serverSide": true, //Feature control DataTables' server-side processing mode.
            "targets": 'no-sort',
            "bSort": true,
            "order": [], //Initial no order.
            "pageLength": 10, // Set Page Length
            "lengthMenu": [
                [10, 25, 50, 100, -1],
                [10, 25, 50, 100, "All"]
            ],

            // Load data for the table's content from an Ajax source
            "ajax": {
                "url": base_url + "backend/withdraw/cancelwithdraw/ajax_list",
                "type": "POST",
                "data": { csrf_test_name: inputval }
            },

            "fnInitComplete": function(oSettings, response) {}
        });
        $.fn.dataTable.ext.errMode = 'none';


    }
    /******************************[ End Cancel Withdraw Controller ]**************************/

    /******************************[ User Withdraw Controller ]****************************/
    if ($('#ajaxuserwithdrawtableform').length) {
        // alert('hello');
        var userwithdrawtable;
        var ajaxuserwithdrawtableform = JSON.stringify($('#ajaxuserwithdrawtableform').serializeArray());
        var formdata = $.parseJSON(ajaxuserwithdrawtableform);
        var inputname = formdata[0]['name'];
        var inputval = formdata[0]['value'];

        var userid = formdata[1]['name'];
        var useridval = formdata[1]['value'];
        //datatables
        userwithdrawtable = $('#ajaxuserwithdrawtable').DataTable({
            "dom": 'lBfrtip',
            "buttons": [
                'copy', 'csv', 'excel', 'pdf', 'print'
            ],
            "processing": true, //Feature control the processing indicator.
            "serverSide": true, //Feature control DataTables' server-side processing mode.
            "targets": 'no-sort',
            "bSort": false,
            "order": [], //Initial no order.
            "pageLength": 10, // Set Page Length
            "lengthMenu": [
                [10, 25, 50, 100, -1],
                [10, 25, 50, 100, "All"]
            ],

            // Load data for the table's content from an Ajax source
            "ajax": {
                "url": base_url + "backend/withdraw/userwithdraw/ajax_list",
                "type": "POST",
                "data": { csrf_test_name: inputval, user_id: useridval }
            },

            "fnInitComplete": function(oSettings, response) {}
        });
        $.fn.dataTable.ext.errMode = 'none';

        $('#master').on('click', function(e) {
            if ($(this).is(':checked', true)) {
                $(".sub_chk").prop('checked', true);
            } else {
                $(".sub_chk").prop('checked', false);
            }
        });

        $('#confirm_all').on('click', function(e) {
            e.preventDefault();
            var inputname = formdata[0]['name'];
            var inputval = formdata[0]['value'];
            var allVals = [];

            $(".sub_chk:checked").each(function() {
                allVals.push($(this).attr('data-id'));
            });

            if (allVals.length <= 0) {
                alert("Please select row.");
            } else {
                var check = confirm("Are you sure you want to confirm withdraw ?");
                if (check == true) {
                    // alert(inputname + ' ' + inputval + ' ' + allVals);
                    var data1 = {
                        'csrf_test_name': inputval,
                        'ids': allVals
                    }
                    $.ajax({
                        type: "POST",
                        url: base_url + "backend/withdraw/pendingwithdraw/confirm_all",
                        data: data1,
                        dataType: 'json',
                        async: true,
                        global: false,
                        error: function(e) {
                            console.log("ERROR: ", e);
                            alert('Something is wrong' + e);
                        },
                        success: function(data) {
                            alert(data);
                            pwithdrawtable.draw();
                        }
                    });


                }
            }

        });
        $('#cancel_all').on('click', function(e) {
            e.preventDefault();
            var inputname = formdata[0]['name'];
            var inputval = formdata[0]['value'];
            var allVals = [];
            $(".sub_chk:checked").each(function() {
                allVals.push($(this).attr('data-id'));
            });

            if (allVals.length <= 0) {
                alert("Please select row.");
            } else {
                var check = confirm("Are you sure you want to cancal withdraw ?");
                if (check == true) {
                    var data1 = {
                        'csrf_test_name': inputval,
                        'ids': allVals
                    }
                    $.ajax({
                        type: "POST",
                        url: base_url + "backend/withdraw/pendingwithdraw/cancel_all",
                        data: data1,
                        dataType: 'json',
                        async: true,
                        global: false,
                        error: function(e) {
                            console.log("ERROR: ", e);
                            alert('Something is wrong' + e);
                        },
                        success: function(data) {
                            alert(data);
                            pwithdrawtable.draw();
                        }
                    });
                }
            }

        });


    }



    /******************************[ End User Withdraw Controller ]**************************/

    /****************************** Start withdraw Controller userwise_withdraw_list *******************************/
    if ($('#ajaxwithdrawtableform').length) {
        var withdrawtable_table;
        var ajaxusertableform = JSON.stringify($('#ajaxwithdrawtableform').serializeArray());
        var formdata = $.parseJSON(ajaxusertableform);
        var inputname = formdata[0]['name'];
        var inputval = formdata[0]['value'];
        var rows_selected = [];
        //datatables
        withdrawtable_table = draw_withdrawtable();

        $.fn.dataTable.ext.errMode = 'none';
    }

    function draw_withdrawtable() {

        var withdrawtable = $('#ajaxwithdrawtable').DataTable({
            "dom": 'lBfrtip',
            "buttons": [
                'copy', 'csv', 'excel', 'pdf', 'print'
            ],
            "processing": true, //Feature control the processing indicator.
            "serverSide": true, //Feature control DataTables' server-side processing mode.
            "order": [], //Initial no order.
            "pageLength": 10, // Set Page Length
            "lengthMenu": [
                [10, 25, 50, 100, -1],
                [10, 25, 50, 100, "All"]
            ],

            // Load data for the table's content from an Ajax source
            "ajax": {
                //  "url": base_url+"backend/payment/payment/ajax_list",
                "type": "POST",
                "data": {
                    csrf_test_name: inputval
                }
            },

            //Set column definition initialisation properties.
            "columnDefs": [{
                "width": "20%",
                "targets": [0], //first column / numbering column
                "orderable": false, //set not orderable                
                "searchable": false, //set not searchable
                'className': 'dt-body-center',
                'render': function(data, type, full, meta) {
                    return '<input type="checkbox">';
                }
            }],
            "fixedColumns": true,
            "select": {
                "style": 'os',
                "selector": 'td:first-child'
            },
            "order": [
                [1, 'asc']
            ],
            "rowCallback": function(row, data, dataIndex) {
                // Get row ID
                var rowId = data[0];
                // debugger;
                // If row ID is in the list of selected row IDs
                if ($.inArray(rowId, rows_selected) !== -1) {
                    $(row).find('input[type="checkbox"]').prop('checked', true);
                    $(row).addClass('selected');
                }
            },
            "fnInitComplete": function(oSettings, response) {}

        });

        return withdrawtable;
    }
    /****************************** End user Controller     *******************************/

    $(document).on("focusout", "#getsponsername", function() {
        var sponsor_id = $(this).val();
        var csrf_test_name = $('input[name="csrf_test_name"]').val();

        var data1 = { 'csrf_test_name': csrf_test_name, 'user_id': sponsor_id };

        $.ajax({
            type: "POST",
            url: base_url + "customer/user/get_sponsor_name",
            data: data1,
            dataType: 'json',
            async: false,
            global: false,
            error: function(e) {
                console.log("ERROR: ", e);
                alert('Something is wrong' + e);
            },
            success: function(data) {
                $('#sponsor_full_name').html(data);
                //alert(data);
                //alert(JSON.stringify(data));
            }
        });
    });

    $(document).on("focusout", "#getsponsernamebyadmin", function() {
        var sponsor_id = $(this).val();
        var csrf_test_name = $('input[name="csrf_test_name"]').val();

        var data1 = { 'csrf_test_name': csrf_test_name, 'user_id': sponsor_id };

        $.ajax({
            type: "POST",
            url: base_url + "backend/user/user/get_sponsor_name",
            data: data1,
            dataType: 'json',
            async: false,
            global: false,
            error: function(e) {
                console.log("ERROR: ", e);
                alert('Something is wrong' + e);
            },
            success: function(data) {
                $('#sponsor_full_name_by_admin').html(data);
                //alert(data);
                //alert(JSON.stringify(data));
            }
        });
    });

    $(document).on("focusout", "#getsponsernamebycustomer", function() {
        var sponsor_id = $(this).val();
        var csrf_test_name = $('input[name="csrf_test_name"]').val();

        var data1 = { 'csrf_test_name': csrf_test_name, 'user_id': sponsor_id };

        $.ajax({
            type: "POST",
            url: base_url + "customer/user/get_sponsor_name",
            data: data1,
            dataType: 'json',
            async: false,
            global: false,
            error: function(e) {
                console.log("ERROR: ", e);
                alert('Something is wrong' + e);
            },
            success: function(data) {
                $('#sponsor_full_name_by_customer').html(data);
                //alert(data);
                //alert(JSON.stringify(data));
            }
        });
    });
    // summernote script
    // height: 200,     set editor height
    // minHeight: null, set minimum height of editor
    // maxHeight: null, set maximum height of editor
    // focus: true      set focus to editable area after initializing summernote

    if ($('#summernote').length && $.fn.summernote) {
        $('#summernote').summernote({
            height: 200,
            minHeight: null,
            maxHeight: null,
            focus: true
        });
    }
    if ($('#summernote1').length && $.fn.summernote) {
        $('#summernote1').summernote({
            height: 200,
            minHeight: null,
            maxHeight: null,
            focus: true
        });
    }
    if ($('#summernote2').length && $.fn.summernote) {
        $('#summernote2').summernote({
            height: 200,
            minHeight: null,
            maxHeight: null,
            focus: true
        });
    }
    if ($('#summernote3').length && $.fn.summernote) {
        $('#summernote3').summernote({
            height: 200,
            minHeight: null,
            maxHeight: null,
            focus: true
        });
    }

    $('.print').on('click', function() {
        printContent('printableArea');
    });

    //print a div
    function printContent(el) {
        var restorepage = $('body').html();
        var printcontent = $('#' + el).clone();
        $('body').empty().html(printcontent);
        window.print();
        $('body').html(restorepage);
        location.reload();
    }

    $('.copy').on('click', function() {
        myFunction();
    });

    $('.copy1').on('click', function() {
        myFunction1();
    });

    $('.copy2').on('click', function() {
        myFunction2();
    });

    function myFunction() {
        var copyText = document.getElementById("copyed");
        copyText.select();
        document.execCommand("Copy");
    }

    function myFunction1() {
        var copyText = document.getElementById("copyed1");
        copyText.select();
        document.execCommand("Copy");
    }

    function myFunction2() {
        var copyText = document.getElementById("copyed2");
        copyText.select();
        document.execCommand("Copy");
    }
    $('.numbers').keyup(function() {
        this.value = this.value.replace(/[^0-9\.]/g, '');
    });

    //preloader
    $(document).ready(function() {
        $(".se-pre-con").fadeOut("slow");
    });

}(jQuery));