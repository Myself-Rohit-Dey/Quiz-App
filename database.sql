-- select* from train;
-- select * from coach;
-- select * from train_class;
-- select * from train_stop;


-- drop table train_stop;
-- drop table train_class;
-- drop table coach;
-- drop table train;

drop table user;
create table user (
    id int primary key auto_increment ,
    first_name varchar(20) NOT NULL,
    last_name varchar(20) NOT NULL,
    gender enum('m','f') NOT NULL,
    email  varchar(30) NOT NULL unique,
    password varchar(70) NOT NULL,
    role enum('ADMIN','USER') NOT NULL
);
desc user;
select * from user;


INSERT into user (first_name,last_name,gender,email,password,role) values('Admin','Admin','M','admin@mail.com');


drop table quiz;
create table quiz(
	id int auto_increment,
    user_id int NOT NULL,
	title_id int NOT NULL,
	title varchar(20) NOT NULL,
    difficulty enum('EASY','MEDIUM','HARD') NOT NULL,
	no_of_question int NOT NULL,
	total_marks int,
	time time,
	primary key (id),
   	foreign key(user_id) references user(id)  on delete cascade
);
select * from quiz;


drop table quiz_question;
create table quiz_question(
	id int auto_increment,
	title_id int NOT NULL,
	question varchar(500) NOT NULL,
    answer_id varchar(2) NOT NULL,
    answer_text varchar(500) NOT NULL,
    explanation varchar(500),
    difficulty enum('EASY','MEDIUM','HARD') NOT NULL,
    marks int NOT NULL,
	primary key (id)
);

INSERT INTO quiz_question(id,title_id,question,answer_id,answer_text,explanation,difficulty,marks)
VALUES(1,1,'HTML stands for-',3,'HyperText Markup Language','NA','EASY',1),
(2,1,'The correct sequence of HTML tags for starting a webpage is -',4,'HTML, Head, Title, Body','The correct sequence of HTML tags to start a webpage is html, head, title, and body.','MEDIUM',1),
(3,1,'Which of the following element is responsible for making the text bold in HTML?',3,'<b>','The <b> (bold tag) tag in HTML is used to display the written text in bold format.','HARD',2),
(4,1,'Which of the following tag is used for inserting the largest heading in HTML?',2,'<h1>','The <h1> tag is used to insert the main heading or the highest level heading.','HARD',2),
(5,1,'Which of the following tag is used to insert a line-break in HTML?',1,'<br>','The <br> tag in the HTML document is used to create a line break in a text. If we place the <br> tag in HTML code, then it works the same as pressing the enter key in a word processor.','MEDIUM',1),
(6,1,'How to create an unordered list (a list with the list items in bullets) in HTML?',1,'<ul>','The <ul> tag in HTML is used to display the list items in a bulleted format. There can be four types of an unordered list: disc, circle, square, and none.','EASY',1),
(7,1,'Which character is used to represent the closing of a tag in HTML?',3,'/','The forward-slash (/) character is used to indicate the closing of a tag in HTML.','EASY',1),
(8,1,'How to create a hyperlink in HTML?',1,'<a href = "www.javatpoint.com"> javaTpoint.com </a>','The anchor tag and the href attribute is used to create the link in HTML.','MEDIUM',1),
(9,1,'How to create an ordered list (a list with the list items in numbers) in HTML?',2,'<ol>','The <ol> tag in HTML is used to display the list items in a numbered format. There can be different types of numbered list: numeric number, capital alphabet, small alphabet, etc.','HARD',2),
(10,1,'Which of the following element is responsible for making the text italic in HTML?',1,'<i>','The <i> (italic tag) tag in HTML is used to display the written text in italic format.','EASY',1),

(11,2,'CSS stands for -',3,'Cascading style sheets','NA','EASY',1),
(12,2,'Which of the following is the correct syntax for referring the external style sheet?',4,'<link rel="stylesheet" type="text/css" href="example.css">','The external style sheet is generally used when you want to make changes on multiple pages. It uses the <link> tag on every pages and the <link> tag should be put inside the head section.','MEDIUM',1),
(13,2,'The property in CSS used to change the background color of an element is -',3,'background-color','The background-color property is used to specify the background color of an element. The background of an element covers the total size, including the padding and border and excluding margin.','HARD',2),
(14,2,'The property in CSS used to change the text color of an element is -',2,'color','The color property in CSS is used to set the color of HTML elements. Typically, this property is used to set the font color of an element. In CSS, we use color values for specifying the color. We can also use this property for the border-color and other decorative effects.','HARD',2),
(15,2,'The CSS property used to control the elements font-size is -',3,'font-size','The font-size property in CSS is used to specify the height and size of the font. It affects the size of the text of an element. Its default value is medium and can be applied to every element.','MEDIUM',1),
(16,2,'The HTML attribute used to define the inline styles is -',1,'style','If you want to use inline CSS, you should use the style attribute to the relevant tag. The inline CSS is also a method to insert style sheets in HTML document. This method mitigates some advantages of style sheets so it is advised to use this method sparingly.','EASY',1),
(17,2,'The HTML attribute used to define the internal stylesheet is -',1,'<style>','The internal style sheet is used to add a unique style for a single document. It is defined in <head> section of the HTML page inside the <style> tag.','EASY',1),
(18,2,'Which of the following CSS property is used to set the background image of an element?',2,'background-image','The background-image property is used to set an image as a background of an element. By default the image covers the entire element.','EASY',1),
(19,2,'Which of the following is the correct syntax to make the background-color of all paragraph elements to yellow?',1,'p {background-color : yellow;}','The background-color property in CSS is used to change the background color of an element. The correct syntax to make the background color of all paragraph elements to yellow is: p {background-color : yellow;}.','HARD',2),
(20,2,'Which of the following is the correct syntax to display the hyperlinks without any underline?',3,'a {text-decoration : none;}','The text-decoration property in CSS is used to decorate the content of the text. It adds lines under, above, and through the text. It sets the appearance of decorative lines on text. The correct syntax to display the hyperlinks without any underline is: a {text-decoration : none;}.','HARD',2),

(21,3,'Which type of JavaScript language is ___',2,'Object-Based','JavaScript is not a pure OOPs (object oriented programming) based languages such as PHP, java or many other languages, although it is an object-based language. It is not OOPs based language, because it does not have three basic properties of object-oriented programming languages, such as polymorphism, encapsulation, and inheritance.','MEDIUM',1),
(22,3,'Which one of the following also known as Conditional Expression:',4,'immediate if','A conditional expression can only evaluate two things, which either true or false, that are purely based on the evaluation of the condition','EASY',1),
(23,3,'In JavaScript, what is a block of statement?',2,'block that combines a number of statements into a single compound statement','A block of statement can be understand as the set of the zero or more statements. In general, a block of statement has common definition "which combines one or a number of statements into a single statement for ease.','HARD',2),
(24,3,'When interpreter encounters an empty statements, what it will do:',4,'Ignores the statements','In JavaScript, when the interpreter encounters a empty statements it normally ignores or not response to that empty statement. The empty statements also sometimes very useful like we use the empty statements for creating loop for nothing.','EASY',1),
(25,3,'The "function" and " var" are known as:',3,'Declaration statements','The "function" and "var" both are the Declaration statements. These both are used for defining, and declaring variable, function in anywhere in the program.','MEDIUM',1),
(26,3,'Which of the following variables takes precedence over the others if the names are the same?',2,'The local element','In JavaScript, the local variable takes precedence over the global variable if the name of both local and global variables is the same.','HARD',2),
(27,3,'Which one of the following is the correct way for calling the JavaScript code?',4,'Function/Method','The JavaScript code can be called simply by making the function call to the element on which the JavaScript code execution has to be run. There are several other ways to call JavaScript code such as submit, onclick, and onload, etc.','EASY',1),
(28,3,'Which of the following type of a variable is volatile?',1,'Mutable variable','The variables whose value can be modified that kind of variable are known as Mutable variable. In the JavaScript, only arrays and objects are mutable but not the primitive values.','MEDIUM',1),
(29,3,'Which of the following option is used as hexadecimal literal beginning?',4,'Both 0x and 0X','In general, the X and x both can be used to denote the hexadecimal values, so any integer literal that begins with either 0X or 0x denotes a hexadecimal number.','EASY',1),
(30,3,'When there is an indefinite or an infinite value during an arithmetic computation in a program, then JavaScript prints______.',3,'Displays "Infinity"','In the case, where the result of any arithmetic expression is beyond the largest represent-able number,JavaScript prints the infinity. Similarly, if the result of any numerical operation is beyond the largest negative number, JavaScript prints negative infinity.','MEDIUM',1),
(31,1,' How to insert an image in HTML?',4,'<img src = "jtp.png" />','The img tag and the src attribute is used to display an image on the webpage.','EASY',1),
(32,1,'How to add a background color in HTML?',3,'<marquee bgcolor = "red">','The bgcolor attribute is used to set the background color of an HTML element.','EASY',1),
(33,1,'<input> is -',3,'an empty tag.','The <input> tag in HTML is used to represent a form input control in HTML document.','EASY',1),
(34,1,'Which of the following tag is used to make the underlined text?',3,'<u>','The <u> (underline tag) tag in HTML is used to display the underlined text. It rendered as a solid underlined text, but it can be changed using CSS properties.','EASY',1),
(35,1,'How to create a checkbox in HTML?',1,'<input type = "checkbox">','To create a checkbox in HTML, we have to use the <input> tag and give the value checkbox to its type attribute.','EASY',1),
(36,1,'Which of the following tag is used to define options in a drop-down selection list?',4,'<option>','The <option> tag in HTML is used to define options in a dropdown list within <select> or <datalist> element. A dropdown list must have at least one <option> element.','EASY',1),
(37,1,'HTML tags are enclosed in-',4,'< and >','All HTML tags must be enclosed within angular < > brackets.','EASY',1),
(38,1,'Which of the following tag is used to add rows in the table?',3,'<tr> and </tr>','The <tr> tag in HTML is used to define the rows in the table. It can consist one or more <th> head cells and <td> data cells to define a single row of HTML table.','EASY',1),
(39,1,'The <hr> tag in HTML is used for -',4,'horizontal ruler','The <hr> tag is used to specify a paragraph-level thematic break in HTML document. It is called a horizontal rule and draws a horizontal line.','EASY',1),
(40,1,'Which of the following attribute is used to provide a unique name to an element?',2,'id','The id attribute is used to specify a unique id for an element of the HTML document. It allocates the unique identifier which can be used by the JavaScript and CSS to perform certain tasks.','EASY',1),
(41,1,'Which of the following HTML tag is used to display the text with scrolling effect?',1,'<marquee>','The <marquee> tag is a non-standard HTML element that is used to scroll a text or image either horizontally or vertically. In simple words, we can say that it automatically scrolls the image or text in up, down, left, and right direction.','EASY',1),
(42,1,'Which of the following HTML tag is the special formatting tag?',3,'<pre>','The HTML <pre> tag is used to specify pre-formatted texts. Texts within <pre>…</pre> tag is displayed in a fixed-width font. Usually, it is displayed in courier font. It maintains both line break space.','EASY',1),
(43,1,'Which of the following is the correct way to send mail in HTML?',1,'<a href = "mailto: xy@y">','We can use the <a> (anchor tag) tag, and the href attribute to mail a person.','EASY',1),
(44,1,'Which of the following is the container for <tr>, <th>, and <td> ?',2,'<table>','The <table> tag in HTML, is generally used to display data in tabular format. We can create a table to display the data in the tabular form using the <table> element, with the help of <tr>, <th>, and <td> elements.','EASY',1),
(45,1,'How to insert a background image in HTML?',1,'<body background = "img.png">','To apply a background image on entire document, we have to specify the background attribute in the <body> of the HTML document.','EASY',1),
(46,1,'What are the types of unordered or bulleted list in HTML?',3,'disc, circle, square','The unordered or bulleted list in HTML is used to display the elements in a bulleted format. Mainly, there are three types of an unordered list: disc, circle, and square.','EASY',1),
(47,1,'Which of the following is the correct way to create a list using the lowercase letters?',2,'<ol type = "a">','The type attribute is used with the <ol> tag to specify the type of list items.','EASY',1),
(48,1,'Which of the following is the correct way to start an ordered list with the count of numeric value 4?',4,'<ol type = "1" start = "4">','The start attribute is used with the <ol> tag to specify where to start the list items.','EASY',1),
(49,1,'Which of the following HTML attribute is used to define inline styles?',3,'style','The style attribute in HTML is used to change the style of existing HTML elements. It can be used with any HTML tag. To apply the style on the HTML tag, you should have the basic knowledge of CSS properties.','EASY',1),
(50,1,'Which of the following is the paragraph tag in HTML?',1,'<p>','The <p> (paragraph tag) tag in HTML is used to define a paragraph in a webpage. The HTML <p> tag indicates the starting of new paragraph.','EASY',1),
(51,1,'An HTML program is saved by using the ____ extension.',2,'.html','The .html or .htm extension both are used to save the HTML program. We can save our HTML file either by using the .html extension or by .htm extension. When the file delivered to the network, the HTML extension indicates that the content of file is HTML.','EASY',1),
(52,1,'A program in HTML can be rendered and read by -',1,'Web browser','HTML programs can be read and rendered by the web browser. A web browser can support several web pages.','EASY',1),
(53,1,'The tags in HTML are -',3,'not case sensitive','HTML is a case-insensitive language, which means we can use tags either in the upper-case or in lower-case. It is recommended to write all tags in the lowercase for readability, consistency, etc.','EASY',1),
(54,1,'Which of the following is the root tag of the HTML document?',4,'<html>','The <html> tag represents the root of an HTML document, hence also called as the root element. It is a container of all elements (except !Doctype) such as <head>, <body> and each element which appears in the HTML document.','EASY',1),
(55,1,'In HTML5, which of the following tag is used to initialize the document type?',4,'<!DOCTYPE html>','The <!DOCTYPE html> tag is used to inform the browser about the version of HTML used in the document. It is called as the document type declaration (DTD).','EASY',1),
(56,1,'Which of the following tag is used to create a combo box (or drop-down box)?',2,'<select>','HTML <select> tag is used to create a drop down list with multiple options. The <option> element is nested within the <select> tag to define options in a list.','EASY',1),
(57,1,'Which of the following are the attributes of the tag?',3,'Both (a) & (b)','NA','EASY',1),
(58,1,'Which is the correct way to comment out something in HTML?',2,'Using <!-- and -->','NA','EASY',1),
(59,1,'Which HTML tag is used to display the power in expression, i.e., (x2 - y2)?',1,'<sup>','NA','EASY',1),
(60,1,'Which of the following is the correct way to change the font face in HTML?',2,'<font face = "Calibri"> ……… </font>','NA','EASY',1);

select * from quiz_question;

drop table quiz_question_option;
create table quiz_question_option(
	question_id int NOT NULL,
    option_id varchar(2) NOT NULL,
    option_text varchar(500) NOT NULL,/*quiz_question_option_text*/
	foreign key (question_id) references quiz_question(id) on delete cascade
);

INSERT INTO  quiz_question_option(question_id,option_id,option_text)
VALUES(1,1,'HighText Machine Language'),(1,2,'HyperText and links Markup Language'),(1,3,'HyperText Markup Language'),(1,4,'None of these'),
(2,1,'Head, Title, HTML, body'),(2,2,'HTML, Body, Title, Head'),(2,3,'HTML, Head, Body, Title'),(2,4,'HTML, Head, Title, Body'),
(3,1,'<pre>'),(3,2,'<a>'),(3,3,'<b>'),(3,4,'<br>'),
(4,1,'<h3>'),(4,2,'<h1>'),(4,3,'<h5>'),(4,4,'<h6>'),
(5,1,'<br>'),(5,2,'<a>'),(5,3,'<pre>'),(5,4,'<b>'),
(6,1,'<ul>'),(6,2,'<ol>'),(6,3,'<li>'),(6,4,'<i>'),
(7,1,'"\"'),(7,2,'!'),(7,3,'/'),(7,4,'.'),
(8,1,'<a href = "www.javatpoint.com"> javaTpoint.com </a>'),(8,2,'<a url = "www.javatpoint.com" javaTpoint.com /a>'),(8,3,'<a link = "www.javatpoint.com"> javaTpoint.com </a>'),(8,4,'<a> www.javatpoint.com <javaTpoint.com /a>'),
(9,1,'<ul>'),(9,2,'<ol>'),(9,3,'<li>'),(9,4,'<i>'),
(10,1,'<i>'),(10,2,'<italic>'),(10,3,'<it>'),(10,4,'<pre>'),

(11,1,'Cascade style sheets'),(11,2,'Color and style sheets'),(11,3,'Cascading style sheets'),(11,4,'None of the above'),
(12,1,'<style src = example.css>'),(12,2,'<link unt rel="stylesheet" type="text/css" href="example.css">'),(12,3,'<stylesheet> example.css </stylesheet>'),(12,4,'<link rel="stylesheet" type="text/css" href="example.css">'),
(13,1,'bgcolor'),(13,2,'color'),(13,3,'background-color'),(13,4,'All of the above'),
(14,1,'bgcolor'),(14,2,'color'),(14,3,'background-color'),(14,4,'All of the above'),
(15,1,'text-style'),(15,2,'text-size'),(15,3,'font-size'),(15,4,'None of the above'),
(16,1,'style'),(16,2,'styles'),(16,3,'class'),(16,4,'None of the above'),
(17,1,'<style>'),(17,2,'<style>'),(17,3,'<link>'),(17,4,'<script>'),
(18,1,'background-attachment'),(18,2,'background-image'),(18,3,'background-color'),(18,4,'None of the above'),
(19,1,'p {background-color : yellow;}'),(19,2,'p {background-color : #yellow;}'),(19,3,'all {background-color : yellow;}'),(19,4,'all p {background-color : #yellow;}'),
(20,1,'a {text-decoration : underline;}'),(20,2,'a {decoration : no-underline;}'),(20,3,'a {text-decoration : none;}'),(20,4,'None of the above'),

(21,1,'Object-Oriented'),(21,2,'Object-Based'),(21,3,'Assembly-language'),(21,4,'High-level'),
(22,1,'Alternative to if-else'),(22,2,'Switch statement'),(22,3,'If-then-else statement'),(22,4,'immediate if'),
(23,1,'Conditional block'),(23,2,'block that combines a number of statements into a single compound statement'),(23,3,'both conditional block and a single statement'),(23,4,'block that contains a single statement'),
(24,1,'Shows a warning'),(24,2,'Prompts to complete the statement'),(24,3,'Throws an error'),(24,4,'Ignores the statements'),
(25,1,'Keywords'),(25,2,'Data types'),(25,3,'Declaration statements'),(25,4,'Prototypes'),
(26,1,'Global variable'),(26,2,'The local element'),(26,3,'The two of the above'),(26,4,'None of the above'),
(27,1,'Preprocessor'),(27,2,'Triggering Event'),(27,3,'RMI'),(27,4,'Function/Method'),
(28,1,'Mutable variable'),(28,2,'Dynamic variable'),(28,3,'Volatile variable'),(28,4,'Immutable variable'),
(29,1,'00'),(29,2,'0x'),(29,3,'0X'),(29,4,'Both 0x and 0X'),
(30,1,'Prints an exception error'),(30,2,'Prints an overflow error'),(30,3,'Displays "Infinity"'),(30,4,'Prints the value as such'),
(31,1,'<img href = "jtp.png" />'),(31,2,'<img url = "jtp.png" />'),(31,3,'<img link = "jtp.png" />'),(31,4,'<img src = "jtp.png" />'),
(32,1,'<marquee bg color: "red">'),(32,2,'<marquee bg-color = "red">'),(32,3,'<marquee bgcolor = "red">'),(32,4,'<marquee color = "red">'),
(33,1,'a format tag.'),(33,2,'an empty tag.'),(33,3,'All of the above'),(33,4,'None of the above'),
(34,1,'<i>'),(34,2,'<ul>'),(34,3,'<u>'),(34,4,'<pre>'),
(35,1,'<input type = "checkbox">'),(35,2,'<input type = "button">'),(35,3,'<checkbox>'),(35,4,'<input type = "check">'),
(36,1,'<select>'),(36,2,'<list>'),(36,3,'<dropdown>'),(36,4,'<option>'),
(37,1,'# and #'),(37,2,'{ and }'),(37,3,'! and ?'),(37,4,'< and >'),
(38,1,'<td> and </td>'),(38,2,'<th> and </th>'),(38,3,'<tr> and </tr>'),(38,4,'None of the above'),
(39,1,'new line'),(39,2,'vertical ruler'),(39,3,'new paragraph'),(39,4,'horizontal ruler'),
(40,1,'class'),(40,2,'id'),(40,3,'type'),(40,4,'None of the above'),
(41,1,'<marquee>'),(41,2,'<scroll>'),(41,3,'<div>'),(41,4,'None of the above'),
(42,1,'<p>'),(42,2,'<b>'),(42,3,'<pre>'),(42,4,'None of the above'),
(43,1,'<a href = "mailto: xy@y">'),(43,2,'<a href = "xy@y">'),(43,3,'<mail xy@y</mail>'),(43,4,'None of the above'),
(44,1,'<data>'),(44,2,'<table>'),(44,3,'<group>'),(44,4,'All of the above'),
(45,1,'<body background = "img.png">'),(45,2,'<img background = "img.png">'),(45,3,'<bg-image = "img.png">'),(45,4,'None of the above'),
(46,1,'disc, square, triangle'),(46,2,'polygon, triangle, circle'),(46,3,'disc, circle, square'),(46,4,'All of the above'),
(47,1,'<ol alpha = "a" >'),(47,2,'<ol type = "a">'),(47,3,'<ol letter = "a">'),(47,4,'None of the above'),
(48,1,'<ol type = "1" initial = "4">'),(48,2,'<ol type = "1" begin = "4">'),(48,3,'<ol type = "1" num = "4">'),(48,4,'<ol type = "1" start = "4">'),
(49,1,'style'),(49,2,'type'),(49,3,'class'),(49,4,'None of the above'),
(50,1,'<p>'),(50,2,'<b>'),(50,3,'<pre>'),(50,4,'None of the above'),
(51,1,'.ht'),(51,2,'.html'),(51,3,'.hml'),(51,4,'None of the above'),
(52,1,'Web browser'),(52,2,'Server'),(52,3,'Interpreter'),(52,4,'None of the above'),
(53,1,'case-sensitive'),(53,2,'in upper case'),(53,3,'not case sensitive'),(53,4,'in lowercase'),
(54,1,'<body>'),(54,2,'<head>'),(54,3,'<title>'),(54,4,'<html>'),
(55,1,'<Doctype HTML>'),(55,2,'<\Doctype html>'),(55,3,'<Doctype>'),(55,4,'<!DOCTYPE html>'),
(56,1,'<list>'),(56,2,'<select>'),(56,3,'<input type = "dropdown">'),(56,4,'<ul>'),
(57,1,'method'),(57,2,'action'),(57,3,'Both (a) & (b)'),(57,4,'None of the above'),
(58,1,'Using ## and #'),(58,2,'Using <!-- and -->'),(58,3,'Using </-- and -/->'),(58,4,'Using <!-- and -!>'),
(59,1,'<sup>'),(59,2,'<sub>'),(59,3,'<p>'),(59,4,'None of the above'),
(60,1,'<font name = "Calibri"> ……… </font>'),(60,2,'<font face = "Calibri"> ……… </font>'),(60,3,'<font = "Calibri"> ……… </font>'),(60,4,'None of the above');


select * from quiz_question_option;

-- SELECT * FROM quiz 
-- WHERE (user_id, title_id, id) IN 
--   (SELECT user_id, title_id, MAX(id) AS max_id 
--    FROM quiz 
--    WHERE user_id = 1
--      AND time <> 0
--    GROUP BY user_id, title_id, difficulty)
   
   
