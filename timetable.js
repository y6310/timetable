const add_button=document.getElementById("add_button");
const creat_timetable_button=document.getElementById("creat_timetable_button");
const timetable_store=document.getElementById("timetable_store");
const timetable_name = document.getElementsByClassName("timetable_name");

function add_object(){
    const weekday = document.getElementById("select_weekday");
    const time = document.getElementById("select_time");
    const make_table_id=weekday.value + "_" + time.value;
    const table_id = document.getElementById(make_table_id);
    const object_name=document.getElementById("object_name");
    const teacher_name=document.getElementById("teacher_name");
    const room_name=document.getElementById("room_name");
    const color = document.getElementById("color");

    table_id.innerHTML=object_name.value+"<br>"+teacher_name.value+"<br>"+room_name.value;
    table_id.style.backgroundColor=color.value;

    //let key= table_id+
    //localstorageにいれる分かく
}

function creat_timetable(){
   const new_timetable_title_input= document.getElementById("new_timetable_title");
   const new_timetable_title_p=document.createElement("p");

   new_timetable_title_p.innerHTML=new_timetable_title_input.value;
   timetable_store.appendChild(new_timetable_title_p);
   new_timetable_title_p.classList.add('timetable_name');
   console.log(new_timetable_title_p);
   console.log(timetable_name.length);
   timetable_name[0].addEventListener('click',click_timetable_name,false);//初期設定の「時間割」にクリックイベントを設定
   new_timetable_title_p.addEventListener('click',click_timetable_name,false);//新しく作った時間割にクリックイベントを設定
}

function click_timetable_name(){
    console.log(this)
    //const timetable_name = 
}

add_button.addEventListener('click',add_object,false);
creat_timetable_button.addEventListener('click',creat_timetable,false);
const timetable_name_click = document.getElementsByClassName("timetable_name");


