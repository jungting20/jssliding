        function imgobj(index){
            this.index = index;
            return {
                getobjindex:function(){
                    return index;
                },
                setobjindex:function(id){
                    index = id;
                }
            }
        }
        /*
        현재 이미지 기준으로 앞 뒤 img setting
        이미지 초기화 함수 초기 시작 시 시작 이미지 index 0 으로
        전환시 계속 호출   
        */
        function initimg(imgs,index){
          var index = index ? index : 0;  
            for(var i = 0 ; i < imgs.length ; i++){
                if(i == index){
                    imgs[i].style.left = '0px';
                    var setpxvalue = -1 * imgdivwidth;
                    console.log(setpxvalue);
                    imgs[checkimgindex(i+1)].style.left = setpxvalue + 'px';
                    i++;
                }else{
                    imgs[i].style.left = parseInt(imgdivwidth)+'px';
                }
            }
        }


        //이미지 움직이기
        function sliding(imgs,img,frame,direction){

            var beforeimgindex = checkimgindex(img.getobjindex()-1);
            var curimgindex = checkimgindex(img.getobjindex());
            var nextimgindex = checkimgindex(img.getobjindex() + 1);
            //direction 으로 방향 파악 후 이미지 index 확인
            var changeimgindex = direction == 1 ? nextimgindex : beforeimgindex;
            var curimgleft = imgs[curimgindex].style.left;
            var changeimgleft = imgs[changeimgindex].style.left;
            //var beforeimgleft = imgs[beforeimgindex].style.left;
            //var nextimgleft = imgs[nextimgindex].style.left;

            //이미지 x축 변경
            curimgleft = parseInt(curimgleft) + frame * direction; 
            changeimgleft = parseInt(changeimgleft) + frame * direction;

            //left 값 추가
            imgs[curimgindex].style.left = curimgleft + 'px';
            imgs[changeimgindex].style.left = changeimgleft + 'px';

            //다음 이미지로 넘길 경우
             if(direction == 1){
            if(changeimgleft >= 0){
                img.setobjindex(checkimgindex(changeimgindex));
                console.log(img.getobjindex(),'음');
                initimg(imgs,img.getobjindex());
                return;
            }
            //이전 이미지로 넘길 경우
            }else{
            if(changeimgleft <= 0){
                img.setobjindex(checkimgindex(changeimgindex));
                console.log(img.getobjindex());
                initimg(imgs,img.getobjindex());
                return;
            }

            } 
           

            setTimeout(function(){
                sliding(imgs,img,frame,direction);
            },20) 

        }

        //이미지 인덱스 받아서 넘어가면 0으로 변환
        function checkimgindex(index){
            return index > imgs.length -1 ? 0 : index < 0 ? imgs.length - 1 : index;
        }