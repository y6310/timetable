const add_button=document.getElementById("add_button");//追加ボタン
const creat_timetable_button=document.getElementById("creat_timetable_button");//新規作成ボタン
const timetable_store=document.getElementById("timetable_store");//保存した時間割の中
const timetable_name = document.getElementsByClassName("timetable_name");//初期値の時間割の名前
const table_name_change = document.getElementById("table_name_change");//変更ボタンの上のテキストボックス
const table_name_array = ["timetable_name_0"];//デフォで最初の「時間割」が配列に入っている
let arg=table_name_array[0]//add_objectの引数デフォでtable_name_array[0]

window.onload = onLoad;
function onLoad()
{//ロードしたときに実行する、保存した時間割のところにデフォルトで「時間割」を設定
    creat_timetable();//新規で表をつくる
    add_button.addEventListener('click',default_add_object,false);//デフォルトで「追加」ボタンの動作をつける
    console.log("onLoaded");//確認
}

function default_add_object(){//デフォルトでロードしてから最初に「時間割」だけが表示されていて、他の時間割が追加されていないとき
    const weekday = document.getElementById("select_weekday");
    const time = document.getElementById("select_time");
    const make_table_id=weekday.value + "_" + time.value;
    const table_id = document.getElementById(make_table_id);
    const object_name=document.getElementById("object_name");
    const teacher_name=document.getElementById("teacher_name");
    const room_name=document.getElementById("room_name");
    const color = document.getElementById("color");

    //console.log(make_table_id);
    table_id.innerHTML=object_name.value+"<br>"+teacher_name.value+"<br>"+room_name.value;
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
    //console.log(this.name);
    const weekday = document.getElementById("select_weekday");
    const time = document.getElementById("select_time");
    const make_table_id=weekday.value + "_" + time.value;
    const table_id = document.getElementById(make_table_id);
    const object_name=document.getElementById("object_name");
    const teacher_name=document.getElementById("teacher_name");
    const room_name=document.getElementById("room_name");
    const color = document.getElementById("color");

    //console.log(make_table_id);
    table_id.innerHTML=object_name.value+"<br>"+teacher_name.value+"<br>"+room_name.value;//表に入れる
    table_id.style.backgroundColor=color.value;//表のtdの色変える

    //let key= this.name+"_"+make_table_id;
    let key= arg+"_"+make_table_id;//localstorageに入れるキーをつくる
    localStorage_list={//localStorageに入れるリストを作る
        object:object_name.value,
        teacher:teacher_name.value,
        room:room_name.value,
        color:color.value
    }
    localStorage.setItem(key,JSON.stringify(localStorage_list));

}



function localStorage_getItem(table_name){


}

function creat_timetable(){//表を作る
   const new_timetable_title_input= document.getElementById("new_timetable_title");
   const new_timetable_title_p=document.createElement("p");
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
   if(timetable_name.length==2){
 
    console.log("done");
   }
}

function click_timetable_name(){//右の時間割の名前をクリックしたとき
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

}
//timetable_name_0のときlocalstorageに空行入るけどまあ無視しよ


function click_td(){
//各tdを選択したときに編集したり削除したり
}


//add_button.addEventListener('click',{name:arg, handleEvent: add_object},false);//関数add_object、引数arg
//add_button.removeEventListener("click", {name:arg, handleEvent: add_object},false);
creat_timetable_button.addEventListener('click',creat_timetable,false);
const timetable_name_click = document.getElementsByClassName("timetable_name");

//デフォでtimetable_name_0で教科入力してから、timetable_name_1でも入力、そのあとまたtimetable_name_0で教科入力するとtimetable_name_1でも
//localstorage入るの直す
