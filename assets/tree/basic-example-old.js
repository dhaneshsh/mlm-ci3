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
        $('.nodeExample1').each(function () {
            var base_url = window.location.origin;
            var sd = $(this).find('.node-status').text();
            var am=$(this).find('.node-amount').text();
            if(sd == "1"){
                if (parseInt(am) > 0 ) {
                    $(this).find("img").attr('src',"/assets/tree/images/tree_green.png");
        
                }else{
                    $(this).find("img").attr('src',"/assets/tree/images/tree_black.png");
                }
            }else{
                $(this).find("img").attr('src',  "/assets/tree/images/tree_red.png");
            }
            
        });
      });
   