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
create table Quiz(
	id int auto_increment,
    user_id int NOT NULL,
	title_id int NOT NULL,
	title varchar(20) NOT NULL,
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
(30,3,'When there is an indefinite or an infinite value during an arithmetic computation in a program, then JavaScript prints______.',3,'Displays "Infinity"','In the case, where the result of any arithmetic expression is beyond the largest represent-able number,JavaScript prints the infinity. Similarly, if the result of any numerical operation is beyond the largest negative number, JavaScript prints negative infinity.','MEDIUM',1);

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
(30,1,'Prints an exception error'),(30,2,'Prints an overflow error'),(30,3,'Displays "Infinity"'),(30,4,'Prints the value as such');

select * from quiz_question_option;
