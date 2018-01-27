var database_link = "https://api.mlab.com/api/1/databases/hackroll/collections";
var lesson_collection_link = "https://api.mlab.com/api/1/databases/hackroll/collections/lesson";
var attendance_collection_link = "https://api.mlab.com/api/1/databases/hackroll/collections/lesson_attendace";
var result_collection_link = "https://api.mlab.com/api/1/databases/hackroll/collections/result";
var student_collection_link = "https://api.mlab.com/api/1/databases/hackroll/collections/student";
var apiKey = "apiKey=6158q4S1oyjh0rE3MDtYdYoqKYCQSPIL";
var domain = "";
var lesson_id ="5a6c42cec2ef1663f11a7fa7";
var lesson ="";


// create_new_lesson();

//create new lesson
function create_new_lesson()
{
	lesson = document.getElementById("lesson").value;
	var class_time = document.getElementById("time").value;
	var class_date = document.getElementById("date").value;
	var new_lesson = get_lesson_json(lesson, date, time, "", "open");

	$.ajax({
		url: lesson_collection_link.concat("?" + apiKey),
		data: new_lesson,
		type: "POST",
		contentType: "application/json",
		success: function(return_data)
		{

		}
	});
}

//create new attendance
function create_new_attendance()
{
	var student_name = document.getElementById("Name").value;
	var student_id = document.getElementById("number").value;
	var new_attendance = get_attendance_json("5a6c42cec2ef1663f11a7fa7", student_id, student_name);

	$.ajax({
			url: attendance_collection_link.concat("?" + apiKey),
			data: new_attendance,
			type: "POST",
			contentType: "application/json",
			success: function(return_data)
			{
				//return single attendance obj
			}
	});

}

//get lesson by lesson id
function get_attendance_by_id(lesson_id)
{
	var get_attendance_link = attendance_collection_link.concat('?q={"lesson_id" : "' + lesson_id + '"}&' + apiKey);
	
	$.ajax({
			url: get_attendance_link.concat(apiKey),
			type: "GET",
			contentType: "application/json",
			success: function(return_data)
			{
			    compare_student_lists(return_data));
			}
	});
}

//compare student lists
function compare_student_lists(return_data)
{
    $.ajax({
        url: student_collection_link.concat(apiKey),
        type: "GET",
        contentType: "application/json",
        success: function(student_list)
        {
            List<JSONObject> studentList = student_list;
            List<JSONObject> attendance = return_data;
            Collections.sort(studentList);
            Collections.sort(attendance);
            var j = 0;
            for(var i = 0; i < studentList; i++) {
                if(studentList[j] !== attendance[i]) {
                    var no_attendance = studentList[j];
                    j++;
                    $.ajax({
                    			url: result_collection_link.concat("?" + apiKey),
                    			data: no_attendance,
                    			type: "POST",
                    			contentType: "application/json",
                    			success: function(return_data)
                    			{
                    			}
                    	});
                }j++;
            }
        }
    })
}

//create lesson json obj 
function get_lesson_json(lesson, date, time, unique_code, unique_code_status)
{
	var lesson_json = JSON.stringify(
	{
		"lesson" : lesson,
		"date" : date,
		"time" : time,
		"unique_code" : unique_code,
		"unique_code_status" : unique_code_status
	});

	return lesson_json;
}

//create attendance json object
function get_attendance_json(lesson_id, student_number, student_name)
{
	var attendance_json = JSON.stringify(
	{
		"lesson_id" : lesson_id,
		"student_number" : student_number,
		"student_name" : student_name
	});

	return attendance_json;
}


