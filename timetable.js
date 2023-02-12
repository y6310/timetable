const add_button=document.getElementById("add_button");//追加ボタン
const delete_button=document.getElementById("delete_button");//削除ボタン
const creat_timetable_button=document.getElementById("creat_timetable_button");//新規作成ボタン
const timetable_store=document.getElementById("timetable_store");//保存した時間割の中
const timetable_name = document.getElementsByClassName("timetable_name");//初期値の時間割の名前
const table_name_change = document.getElementById("table_name_change");//変更ボタンの上のテキストボックス
const change_name_button = document.getElementById("change_name_button");//変更ボタン
let table_name_array = ["timetable_name_0"];//デフォで最初の「時間割」が配列に入っている
let arg=table_name_array[0]//add_objectの引数デフォでtable_name_array[0]

const day=["Mon","Tue","Wed","Thu","Fri"];//曜日の配列、localstorageのgetItemで使用
const td=document.getElementsByClassName('td');//getElementsByClassNameはHTMLCollection(配列)で返ってくる.localstoregeのgetItemとtdクリックのとき使う

const weekday = document.getElementById("select_weekday");
const time = document.getElementById("select_time");
const object_name=document.getElementById("object_name");//textboxの方
const teacher_name=document.getElementById("teacher_name");//textboxの方
const room_name=document.getElementById("room_name");//textboxの方
const color = document.getElementById("color");//textboxの方
let color_td_16;//getItemで使用 16進数の#rrggbbで保存する

const day_EN_JA={"Mon":"月曜日","Tue":"火曜日","Wed":"水曜日","Thu":"木曜日","Fri":"金曜日"};//曜日の日本語の連想配列、tdに何かしら入ってるときのクリックで使用
const time_EN_JA={"one":"1限目","two":"2限目","three":"3限目","four":"4限目","five":"5限目","six":"6限目"};//時間の日本語の連想配列、tdに何かしら入ってるときのクリックで使用

let choice_time_table;//左の時間割名をクリックしたときに時間割名を保持する

window.onload = onLoad;
function onLoad()
{//ロードしたときに実行する、保存した時間割のところにデフォルトで「時間割」を設定
    //localStorageの容量が0のときが初回アクセスのときになるので、localStorageに何か入っているかを判断
    let all_localStorage =Object.keys(localStorage).map(key =>{
        return{
            key: key,
            value: JSON.parse(localStorage.getItem(key))
        };
    });

    if (all_localStorage.length==0){//localStorageに何も入っていないとき=初回アクセスのとき
    creat_timetable();//新規で表をつくる
    add_button.addEventListener('click',default_add_object,false);//デフォルトで「追加」ボタンの動作をつける
    //console.log("onLoaded");//確認
    }else{//localStorageに何か入っているとき=過去にアクセスしたことがあるとき
        //click_timetable_name();

        table_name_array=JSON.parse(localStorage.getItem("timetable_name_array"));//key:timetable_name_array値:["timetable_name_0","timetable_name_1",... ]
        for(let i=0;i<table_name_array.length;i++){

            let value_getItem= JSON.parse(localStorage.getItem(table_name_array[i]));//「timetable_name_X」をキーとして「時間割」を値として取得
            let new_timetable_title_p=document.createElement("p");//pタグ作る
            new_timetable_title_p.innerHTML=value_getItem;
            timetable_store.appendChild(new_timetable_title_p);
            new_timetable_title_p.classList.add('timetable_name');
            new_timetable_title_p.addEventListener('click',click_timetable_name,false);//新しく作った時間割にクリックイベントを設定
            //table_name_array[timetable_name.length-1]="timetable_name_"+(timetable_name.length-1);//配列にいれる名前つける
            //console.log(table_name_array);
            new_timetable_title_p.value="timetable_name_"+(timetable_name.length-1);                
        };
        
    };

};

function default_add_object(){//デフォルトでロードしてから最初に「時間割」だけが表示されていて、他の時間割が追加されていないとき

    const make_table_id=weekday.value + "_" + time.value;
    const table_id = document.getElementById(make_table_id);


    //console.log(make_table_id);
    table_id.innerHTML="<p>"+object_name.value+"</p>"+"<p>"+teacher_name.value+"</p>"+"<p>"+room_name.value+"</p>";   
    //table_id.innerHTML=object_name.value+"<br>"+teacher_name.value+"<br>"+room_name.value;
    table_id.style.backgroundColor=color.value;

    let key= "timetable_name_0"+"_"+make_table_id;
    localStorage_list={
        object:object_name.value,
        teacher:teacher_name.value,
        room:room_name.value,
        color:color.value
    }
    localStorage.setItem(key,JSON.stringify(localStorage_list));
    //localstorageにいれる分かく
}

function add_object(arg){
    console.log(arg);

    const make_table_id=weekday.value + "_" + time.value;
    const table_id = document.getElementById(make_table_id);

    //console.log(this.name);
    //console.log(make_table_id);
    
    table_id.innerHTML="<p>"+object_name.value+"</p>"+"<p>"+teacher_name.value+"</p>"+"<p>"+room_name.value+"</p>";//表に入れる
    table_id.style.backgroundColor=color.value;//表のtdの色変える

    //let key= this.name+"_"+make_table_id;
    let key= arg+"_"+make_table_id;//localstorageに入れるキーをつくる
    localStorage_list={//localStorageに入れるリストを作る
        object:object_name.value,
        teacher:teacher_name.value,
        room:room_name.value,
        color:color.value
    }
    localStorage.setItem(key,JSON.stringify(localStorage_list));//JSONにして保存

}

function creat_timetable(){//表を作る
    if(localStorage.hasOwnProperty("timetable_name_array")){//"timetable_name_array"がlocalstorageに存在していたらその値を使う
    table_name_array=[];
    table_name_array=JSON.parse(localStorage.getItem("timetable_name_array"));
    }; 
   const new_timetable_title_input= document.getElementById("new_timetable_title");//追加した時間割名を入れるinputタグ
   let new_timetable_title_p=document.createElement("p");
   new_timetable_title_p.innerHTML=new_timetable_title_input.value;
   timetable_store.appendChild(new_timetable_title_p);
   new_timetable_title_p.classList.add('timetable_name');
   console.log(new_timetable_title_p);
   console.log(timetable_name.length);
   new_timetable_title_p.addEventListener('click',click_timetable_name,false);//新しく作った時間割にクリックイベントを設定
   table_name_array[timetable_name.length-1]="timetable_name_"+(timetable_name.length-1);//配列にいれる名前つける
   new_timetable_title_p.value="timetable_name_"+(timetable_name.length-1);
    //valueに配列と同じ値をつける(時間割の名前をクリックして、切り替えてからtd追加したときの関数add_objectの引数argにthisで紐づけるため)
   //console.log(table_name_array);

   
   localStorage.removeItem("timetable_name_array");//前あった配列をlocalStorageから削除
   localStorage.setItem("timetable_name_array",JSON.stringify(table_name_array));//配列を保存
   localStorage.setItem(new_timetable_title_p.value,JSON.stringify(new_timetable_title_p.innerHTML));//key:timetable_name_0"//値:時間割
   //一つのkeyに対して一つの時間割名だからJSONにしなくていいけど、getのときに全部JSONから戻すからJSONにしとく



}

function click_timetable_name(){//右の時間割の名前をクリックしたとき
    change_name_button.onclick=null;//前に時間割名をクリックしたときにつけていた時間割名変更ボタンonclickを外しておく
    ////////////////////////localstorageからgetして表に入れる部分//////////////////////////////////////
    for (let each_td_getItem of td){//td(配列)のそれぞれの値をeach_tdに代入
        //console.log(each_td);
        each_td_getItem.innerHTML="";//いったんtdのinnerHTMLを空にしてからlocalStorageからget
        each_td_getItem.style.backgroundColor="Gray";//#808080=Gray背景を元に戻す
    }
    //とりあえずlocalstorageのものすべて取得
    let all_localStorage =Object.keys(localStorage).map(key =>{
        return{
            key: key,
            value: JSON.parse(localStorage.getItem(key))
        };
    });
    //console.log(all_localStorage);
    for (let i=0;i<all_localStorage.length;i++){
        //console.log(all_localStorage[i]);//{key: 'timetable_name_0_Wed_four', value: {…}}のかたまりがいくつも入っている配列が返る
        //console.log(all_localStorage[i].key);//timetable_name_0_Mon_twoの形
        //console.log(all_localStorage.length);
        //console.log(this.value);//this.value=timetable_name_X
        choice_time_table=this.value;//クリックした時間割を保持timetable_name_Xの形
        let key_getItem=all_localStorage[i].key;//timetable_name_0_Mon_twoの形
        if(key_getItem.indexOf(this.value)==0){//this.value=timetable_name_Xから始まるkeyをすべて取得
            for(let j=0;j<day.length;j++){//どの曜日が入っているかを見る
                if(key_getItem.indexOf(day[j])> -1){//timetable_name_0_Mon_twoを０文字目から調べて、曜日の文字="Mon"があったとき
                    console.log(key_getItem.indexOf(day[j]));//曜日の単語が入っている部分のindexを調べる.timetable_name_0_Mon_twoなら17
                    let dayname_start=key_getItem.indexOf(day[j]);//timetable_name_0_Mon_twoなら17
                    let table_id_getItem = document.getElementById(key_getItem.substring(dayname_start));//key_getItem.substring(dayname_start)で曜日以降の文字列を取得.timetable_name_0_Mon_twoならMon_two←これがそのままtdのidになる
                    console.log(table_id_getItem);
                    table_id_getItem.innerHTML="<p>"+all_localStorage[i].value.object+"</p>"+"<p>"+all_localStorage[i].value.teacher+"</p>"+"<p>"+all_localStorage[i].value.room+"</p>";//表に入れる
                    table_id_getItem.style.backgroundColor=all_localStorage[i].value.color;//表のtdの色変える styleだとrgb(rr,gg,bb)で入る
                    color_td_16=all_localStorage[i].value.color;//16進数の#rrggbbで保存
                };
            };
        };
    };
    ////////////////////////////localstorageからget終わり//////////////////////////////////////////

    add_button.removeEventListener('click',default_add_object,false);//最初のonloadで付けたイベントリスナーは重複して動作するので切っておく
    console.log("done");
    //console.log(this)
    table_name_change.value = this.innerHTML;//左下の時間割の名前の変更のところ、this.innerHTMLは「時間割」とか「新しい時間割」とか
    console.log(this.value)//this.valueはtimetable_name_X
    arg=this.value;
    console.log(arg);
    //const timetable_name =
    //let result_object=add_object(arg);
    add_button.addEventListener('click',function(){add_object(arg)},false);//クリックしたらadd_object(arg)の結果を入れる
    //add_button.addEventListener('click',{name:arg, handleEvent: add_object},false);//関数add_object、引数arg

    
    weekday.value="choice_day";//左側すべて空欄またはデフォルトの値にする
    time.value="choice_time";
    object_name.value="";
    teacher_name.value="";
    room_name.value="";
    color.value="#2285E2";//デフォルトの値

    weekday.disabled=false;//それぞれを編集(入力)可にする
    time.disabled=false;
    object_name.disabled=false;
    teacher_name.disabled=false;
    room_name.disabled=false;
    color.disabled=false;

    let this_is_2=this
    console.log(this_is_2);//クリックした時間割<p class="timetable_name">時間割</p>
    change_name_button.onclick=function(){change_name_button_click(this_is_2,arg)}//時間割名変更ボタンクリックしたときに変更させる

};
//timetable_name_0のときlocalstorageに空行入るけどまあ無視しよ

let this_is;
function click_td(){
//各tdを選択したときに削除したり 
    if(this.innerHTML==""){//tdに何も入れられてないときは、tdをクリックしたら曜日と時間がに自動的に選ばれるように
        //console.log(this);//<td class="td" id="Mon_two"></td>の形
        //console.log(this.id);//"Mon_two"の形
        weekday.value=this.id.substring(0,3)//"Mon_two"のうち"Mon"
        time.value=this.id.substring(4)//"Mon_two"のうち"two"(twoのt以降)
        object_name.value="";
        teacher_name.value="";
        room_name.value="";
        color.value="#2285E2";//デフォルトの値

        weekday.disabled=false;//それぞれを編集(入力)可にする
        time.disabled=false;
        object_name.disabled=false;
        teacher_name.disabled=false;
        room_name.disabled=false;
        color.disabled=false;

        add_button.style.display="block";
        delete_button.style.display="none";

    }
    else{//tdに何か入っているとき
        const left = document.getElementById("left");//表の左側を取得
        console.log(this);
        //console.log(this.children.item(0).innerHTML);//thisの子要素の1つ目=科目名
        //console.log(this.children.item(1).innerHTML);//thisの子要素の2つ目=担当教員名
        //console.log(this.children.item(2).innerHTML);//thisの子要素の3つ目=教室名
        const object_td= this.children.item(0).innerHTML;
        const teacher_td=this.children.item(1).innerHTML;
        const room_td=this.children.item(2).innerHTML;
        const color_td=this.style;
        console.log(this.style.backgroundColor);
        console.log(typeof(this.style.backgroundColor));//string
        //カラーピッカーのところの取得をする、テキストボックスとカラーピッカーが変更不可にする

        //stringの「rgb(rr,gg,bb)」から#rrggbbに変換
        let color_rgb10 =this.style.backgroundColor;
        const paren_1="(";
        const comma=","
        const paren_2=")"
        let result_paren_1=this.style.backgroundColor.indexOf(paren_1);//最初のかっこの場所
        let result_comma_1=this.style.backgroundColor.indexOf(comma);//最初のコンマの場所
        let result_comma_2=this.style.backgroundColor.lastIndexOf(comma);//2つ目のコンマ indexOfは最初に出てきた場所を返すlastIndexOfは最後に出てきた場所を返す
        let result_paren_2=this.style.backgroundColor.indexOf(paren_2);//最後のかっこの場所

        //console.log(result_paren_1);
        //console.log(result_comma_1);
        //console.log(result_comma_2);
        //console.log(result_paren_2);
        console.log(color_rgb10.substr(result_paren_1+1,result_comma_1-(result_paren_1+1)));
        console.log(color_rgb10.substr(result_comma_1+2,result_comma_2-(result_comma_1+2)));//コンマの次の空白は入れない
        console.log(color_rgb10.substr(result_comma_2+2,result_paren_2-(result_comma_2+2)));//コンマの次の空白は入れない

        let rgb_10_r=color_rgb10.substr(result_paren_1+1,result_comma_1-(result_paren_1+1));//rgb(rr,gg,bb)のrr
        let rgb_10_g=color_rgb10.substr(result_comma_1+2,result_comma_2-(result_comma_1+2));//rgb(rr,gg,bb)のgg
        let rgb_10_b=color_rgb10.substr(result_comma_2+2,result_paren_2-(result_comma_2+2));//rgb(rr,gg,bb)のbb

        weekday.value=this.id.substring(0,3)//"Mon_two"のうち"Mon"
        time.value=this.id.substring(4)//"Mon_two"のうち"two"(twoのt以降)
        object_name.value=object_td;
        teacher_name.value=teacher_td;
        room_name.value=room_td;
        color.value=rgb_to_hex(rgb_10_r, rgb_10_g,rgb_10_b);

        weekday.disabled=true;//それぞれを編集(入力)不可にする
        time.disabled=true;
        object_name.disabled=true;
        teacher_name.disabled=true;
        room_name.disabled=true;
        color.disabled=true;



        add_button.style.display="none";//追加ボタンを消す
        delete_button.style.display="block";//削除ボタンを見えるようにする
        console.log(this);//<td class="td" id="Fri_three" style="background-color: rgb(138, 232, 255);"><p>asdf</p><p>asdf</p><p>sdf</p></td>の形
        //this_is=this;
        //console.log(this_is);

        let delete_td_key=arg+"_"+this.id;//消去するtdのlocalStorageを消去するためにkeyをつくる this_is.id="Fri_three"の形
        console.log(arg);//timetable_name_Xの形
        console.log(delete_td_key);//timetable_name_1_Tue_fourの形
        let td_outerHTML=this;
        delete_button.addEventListener('click',function(){delete_object(delete_td_key,td_outerHTML),click_td},{ once: true });//1回しか実行しない、毎回addEventlistner付けなおす       
        };          
};

for (let each_td of td){//td(配列)のそれぞれの値にtdがクリックされたときのイベントを設定する
    each_td.addEventListener('click',click_td,false);
};

function rgb_10_to_16(color){//16進数に変換する関数
    let color_16=parseInt(color).toString(16);//16進数に変換
    console.log(color_16);
    if(color_16.length==1){//もし1桁なら上に0をつける01とか0eとか
    color_16="0"+color_16;
    };
    return color_16;
};

function rgb_to_hex(red, green,blue){//#rrggbbの形にする関数
    return "#" + rgb_10_to_16(red)+rgb_10_to_16(green)+rgb_10_to_16(blue);
};


function delete_object(delete_td_key,td_outerHTML){//削除ボタン押したときの処理

    console.log(delete_td_key);//timetable_name_1_Tue_fourの形
    localStorage.removeItem(delete_td_key);//delete_td_keyのkeyのlocalStorageを削除

    weekday.value="choice_day";//左側すべて空欄またはデフォルトの値にする
    time.value="choice_time";
    object_name.value="";
    teacher_name.value="";
    room_name.value="";
    color.value="#2285E2";//デフォルトの値

    td_outerHTML.style.backgroundColor="Gray";//tdの背景をデフォに戻す
    console.log(td_outerHTML.innerHTML);
    td_outerHTML.innerHTML="";//tdのinnerHTML消す
    add_button.style.display="block";//追加ボタンを見えるようにする
    delete_button.style.display="none";//削除ボタンを消す

    weekday.disabled=false;//それぞれを編集(入力)可にする
    time.disabled=false;
    object_name.disabled=false;
    teacher_name.disabled=false;
    room_name.disabled=false;
    color.disabled=false;

};

function change_name_button_click(clicked_table_name,key_arg){
    console.log(table_name_change);
    console.log(clicked_table_name);
    clicked_table_name.innerHTML=table_name_change.value;
    localStorage.removeItem(key_arg);
    localStorage.setItem(key_arg,JSON.stringify(table_name_change.value));
}




//add_button.addEventListener('click',{name:arg, handleEvent: add_object},false);//関数add_object、引数arg
//add_button.removeEventListener("click", {name:arg, handleEvent: add_object},false);
creat_timetable_button.addEventListener('click',creat_timetable,false);
const timetable_name_click = document.getElementsByClassName("timetable_name");

//デフォでtimetable_name_0で教科入力してから、timetable_name_1でも入力、そのあとまたtimetable_name_0で教科入力するとtimetable_name_1でも
//localstorage入るの直す
