function Prompt(str,contentcolor){
            'use strict';
            var msgw,msgh,bordercolor;    
            msgw=150;//提示窗口的宽度    
            msgh=100;//提示窗口的高度  
           // str="保存成功！";  
           // titleheight=25; //提示窗口标题高度    
            bordercolor="silver";//提示窗口的边框颜色    
           // titlecolor="#99CCFF";//提示窗口的标题颜色    
            var sWidth,sHeight;    
            //获取当前窗口尺寸    
            sWidth = document.body.offsetWidth;    
            sHeight = document.body.offsetHeight;
            console.log(sWidth);  
            console.log(sHeight);   
        //    //背景div    
            var bgObj=document.createElement("div");    
            bgObj.setAttribute('id','alertbgDiv');    
            bgObj.style.position="absolute";    
            bgObj.style.top="0";    
            bgObj.style.background="black";    
            bgObj.style.filter="progid:DXImageTransform.Microsoft.Alpha(style=3,opacity=0.3,finishOpacity=95";    
            bgObj.style.opacity="0.3";    
            bgObj.style.left="0";    
            bgObj.style.width = sWidth + "px";    
            bgObj.style.height = (sHeight+300) + "px";    
            bgObj.style.zIndex = "10000";    
            document.body.appendChild(bgObj);    
            //创建提示窗口的div    
            var msgObj = document.createElement("div");    
            msgObj.setAttribute("id","alertmsgDiv");    
            msgObj.setAttribute("align","center");    
            msgObj.style.background="white";    
            //msgObj.style.border="1px solid " + bordercolor;    
            msgObj.style.position = "absolute";    
            msgObj.style.left = "50%";    
            msgObj.style.font="14px/1.6em Verdana bold, Geneva bold, Arial bold, Helvetica bold, sans-serif bold";    
            //窗口距离左侧和顶端的距离     
            msgObj.style.marginLeft = "-70px";    
            //窗口被卷去的高+（屏幕可用工作区高/2）-150 
            //document.body.scrollTop+(window.screen.availHeight/3)-150 +"px"   
            msgObj.style.top ="50%" ;    
            msgObj.style.width = msgw + "px";    
            msgObj.style.height = 50 + "px";    
            msgObj.style.textAlign = "center";    
            msgObj.style.lineHeight ="15px";    
            msgObj.style.zIndex = "10001";  
            msgObj.style.borderRadius="10px";  
            document.body.appendChild(msgObj);    
            // //提示信息标题    
            // var title=document.createElement("h4");    
            // title.setAttribute("id","alertmsgTitle");    
            // title.setAttribute("align","left");    
            // title.style.margin="0";    
            // title.style.padding="3px";    
            // //title.style.background = bordercolor;    
            // title.style.filter="progid:DXImageTransform.Microsoft.Alpha(startX=20, startY=20, finishX=100, finishY=100,style=1,opacity=75,finishOpacity=100);";    
            // title.style.opacity="0.75";    
            // title.style.borderBottom="1px solid " + bordercolor;    
            // title.style.height="30px";    
            // title.style.font="16px Verdana, Geneva, Arial, Helvetica, sans-serif";    
            // title.style.color="black";    
            // title.innerHTML="提示";    
            // document.getElementById("alertmsgDiv").appendChild(title);    
            //提示信息    
            var txt = document.createElement("p");    
            txt.setAttribute("id","msgTxt");    
            txt.style.margin="15px 0";
            txt.style.color=contentcolor;    
            txt.innerHTML =str ;    
            document.getElementById("alertmsgDiv").appendChild(txt); 
             //设置关闭时间
           window.setTimeout( function () {
                    document.body.removeChild(document.getElementById("alertbgDiv"));    
                    // document.getElementById("alertmsgDiv").removeChild(document.getElementById("alertmsgTitle"));    
                    document.body.removeChild(document.getElementById("alertmsgDiv"));  
                }, 2000);
                      
           }