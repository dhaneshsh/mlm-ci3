    function loadtree(obj, url){
      
        var config = {
            container: "#basic-example",
            //animateOnInit: true,
            //animation: {
            //    nodeAnimation: "easeOutBounce",
            //    nodeSpeed: 700,
            //    connectorsAnimation: "bounce",
            //    connectorsSpeed: 700
            //},
            connectors: {
                type: 'step'
            },
            node: {
                HTMLclass: 'nodeExample1'
                //collapsable: false
            }
        },

        chart_config = [
            config
        ];
        var b=[];
        var data2 = obj;
        var markers = [];
        var sample = new Array();
        sample.push(new Object());
        var chart = [];
        function getobject(){
          
            for(i=0;i<data2.length;i++){
                if(i==0)
                {
                    b={
                        //parent: markers[data2[i]],
                        text: {
                            name: (data2[i].username != null ? data2[i].username : '0'),
                            title: data2[i].f_name + ' ' + data2[i].l_name,
                            parent: (data2[i].sponsor_id != null ? data2[i].sponsor_id : '0'),
                            amount: (data2[i].amount != null ? data2[i].amount : 0),
                            level: data[i].level,
                            status: data[i].status
                        },
                        image: url + "assets/tree/images/tree_red.png"
                    };
                    chart.push(b);
                    chart_config.push(b);
                }
                else
                {
                    for(j=0;j<chart.length;j++)
                    {
                        if(data2[i].sponsor_id==chart[j].text.name)
                        {
                            b={
                                parent: chart[j],
                                text: {
                                    name: (data2[i].username != null ? data2[i].username : '0'),
                                    title: data2[i].f_name + ' ' + data2[i].l_name,
                                    parent: (data2[i].sponsor_id != null ? data2[i].sponsor_id : '0'),
                                    amount: (data2[i].amount != null ? data2[i].amount : 0),
                                    level: data[i].level,
                                    status: data[i].status
                                },
                                image: url + "assets/tree/images/tree_red.png"
                            };
                            chart.push( b);
                            chart_config.push(b);
                        }
                    }
                }


            }
        }
         getobject();
        new Treant(chart_config);
        /// load tree without refresh
    }

    

    
    $(document).ready(function(){
        var base_url = window.location.origin;
        $("#button_1").on("click", function(e) {
            var input = $("#inputbox").val();
            if(parentval){
                $("#back_button_url").val(input);
            }
            if(input){
                e.preventDefault();
                $.ajax({type: "GET",
                    url: base_url+"/customer/team/tuser_id/"+ input,
                    //data: { id: $(this).val(), access_token: $("#access_token").val() },
                    success:function(result) {
                        var base_url = window.location.origin;
                        var data = JSON.parse(result);
                        loadtree(data, base_url);
                        load_tree_images();
                    },
                    error:function(result) {
                    alert('error');
                    }
                });
            }
        });
        
        $("#back_button").on("click", function(e) {
            var input = $("#back_button_url").val();
            if(input){
                e.preventDefault();
                $.ajax({type: "GET",
                    url: base_url+"/whiteroomcreation/customer/team/tuser_id/"+ input,
                    //data: { id: $(this).val(), access_token: $("#access_token").val() },
                    success:function(result) {
                        var base_url = window.location.origin;
                        var data = JSON.parse(result);
                        loadtree(data, base_url);
                        load_tree_images();
                    },
                    error:function(result) {
                    alert('error');
                    }
                });
            }
        });
        
        load_tree_images();

        $(".node").on("click", function(e) {
            var input=$(this).find(".node-name").text();
            if(input){
                var parentval = $(this).find(".node-parent").text();
                if(parentval){
                    $("#back_button_url").val(parentval);
                }
                $.ajax({type: "GET",
                    url: base_url+"/customer/team/tuser_id/"+ input,
                    //data: { id: $(this).val(), access_token: $("#access_token").val() },
                    success:function(result) {
                        var base_url = window.location.origin;
                        var data = JSON.parse(result);
                        loadtree(data, base_url);
                        load_tree_images();
                    },
                    error:function(result) {
                    alert('error');
                    }
                });
            }
        });

        $(".node").mouseover(function () {
            $(".box").css('display', 'block');
            var title = $(this).find(".node-title").text();
            var name = $(this).find(".node-name").text();
            var sponserid = $(this).find(".node-sponserid").text();
            // var idstatus = $(this).find(".node-idstatus").text();
            // var parent = $(this).find(".node-parent").text();
            // var position = $(this).find(".node-position").text();
            // var amount = $(this).find(".node-amount").text();
            // var leftbusssiness = $(this).find(".node-leftbusssiness").text();
            // var rightbussiness = $(this).find(".node-rightbusssiness").text();
            // var documentstatus = $(this).find(".node-documentstatus").text();
            // var leg = "";
            // var sta = "";
            // var color = "";
            // if (position != "") {
            //     if (position == "1") {
            //         leg = "L";
            //     }
            //     else {
            //         leg = "R";
            //     }
            // }

            // if (idstatus == "true") {
            //     if (documentstatus == "true")
            //     {
            //         color = "green";
            //         sta = "Active";
            //     }
            //     else {
            //         color = "orange";
            //         sta = "Inactive";
            //     }
            // }
            // else {
            //     if (idstatus == "false") {
            //         color = "black";
            //         sta = "Inactive";
            //     }

            // }
            // if(name!="OPEN")
            // {
            //     var kl="<ul class='list-unstyled'>";

            //     var u = "<li>Amount : " + amount +" Rs" + "</li>";
            //     $(this).css('cursor','wait');
            //     var finaldata = "";
            //     $(this).css('border-color', color);

            //     $.ajax({
            //         url: "/User/Team/TreeLegsCount/" + name,
            //         async: false,
            //         success: function (result) {
            //             var getresult = JSON.parse(result);
            //             var newdata3 = "<li>Left Vol: " + getresult.LeftBussines + " ("+ getresult.LeftCount +")</li>";
            //             var newdata4 = "<li>Right Vol: " + getresult.RightBussines + " ("+ getresult.RightCount +")</li></ul>";
            //             //var newdata5 = "<li>Full Name: " + getresult.FullName + "</li>";
            //             var username = "<li>User Name: " + getresult.UserName + "</li>";
            //             var fullname = "<li>Full Name: " + getresult.FullName + "</li>";
            //             var sponsername = "<li>Sponser ID: " + getresult.SponserName + " ("+ leg+")</li>";
            //             var sponserfullname = "<li>Sponser Name: " + getresult.sponserName + " ("+ leg+")</li>";
            //             var totalcoins = "<li>Total Coins: " + getresult.TotalCoins + "</li>";
            //             var q = "<li>Sponser ID : " + sponserid + " ("+ leg+")</li>";
            //             var idtree = "";
            //             finaldata = kl + username + fullname +sponsername+ sponserfullname + u + newdata3 + newdata4;

            //             $('.node').css('cursor','pointer');

            //         }
            //     });
            //     var ds = $('.box').html(finaldata);
            //     $(this).append(ds);

            //     var x = event.clientX;
            //     var y = event.clientY;
            //     var coords = "X coords: " + x + ", Y coords: " + y;
            //     //alert(coords);

            //     var xs = $('.box.box-show').height();
            //     var bw = $('.box.box-show').width();

            //     var chartHeight = $('.chart.Treant.Treant-loaded').height()+20;
            //     var chartWidth = $('.chart.Treant.Treant-loaded').width();
            //     var fs = chartHeight - y;

            //     var hs = chartWidth - x;

            //     if(hs > 0){
            //         if(hs > (bw+20))
            //         {
            //             $('.box.box-show').css({left:'70px'});
            //         }
            //         else
            //         {
            //             $('.box.box-show').css({left: -bw});
            //         }
            //     }
            //     if(fs > 0){
            //         if(fs > (xs+20))
            //         {
            //             $('.box.box-show').css({top:'50px'});
            //         }
            //         else
            //         {
            //             $('.box.box-show').css({top: -xs});
            //         }
            //     }
            // }
        });
        $(".node").mouseleave(function () {
            $(".box").css('display', 'none');
            $(".box").html("");
        });
      });
   
      function load_tree_images(){
        $('.nodeExample1').each(function () {
            var base_url = window.location.origin;
            var sd = $(this).find('.node-status').text();
            var am=$(this).find('.node-amount').text();
            if(sd == "1"){
                if (parseInt(am) > 0 ) {
                    $(this).find("img").attr('src', base_url + "/assets/tree/images/tree_green.png");
        
                }else{
                    $(this).find("img").attr('src', base_url + "/assets/tree/images/tree_black.png");
                }
            }else{
                $(this).find("img").attr('src', base_url + "/assets/tree/images/tree_red.png");
            }
            
        });
      }

      