/*	Simple Javascript Wysiwyg Version 1.0
	Copyright (c) 2009 CS Truter
	Written by Christoff Truter
	email: Christoff@cstruter.com 
	url: http://www.cstruter.com/blog/45
	note: Simply include this file and assign class="richtextbox" to textareas
		  To set the width & height of a textbox make use of the style attribute
		  on the textarea eg. style="width:300px;height:200px"
	Updated: 2011/11/09 - Improved Support for Firefox/Chrome
*/


function richtextbox(textarea)
{
	function format_button(html, action)
	{
		var button = document.createElement('button');
		button.setAttribute("type", "button");
		button.innerHTML = html;		
		button.onclick = function()
		{
			richtextarea.contentWindow.document.execCommand(action, false, null);
		}
		return button;				
	}

    function url_button(html, type) 
    { 
    	var button = document.createElement('button');
		button.setAttribute("type", "button");
		button.innerHTML = html;
		button.onclick = function()
		{
            if (!document.all) 
            {
                var url = prompt("Enter an url",""); 
                if(!url.match("(^(http|https|ftp|ftps)://)")) 
                { 
                    url="http://"+url; 
                }
                
                if (type == "url")
                {
                    richtextarea.contentWindow.document.execCommand("inserthtml", false, '<a href="' + url + '">' + url + '</a>'); 
                }
                else if (type == "image")
                {
                    richtextarea.contentWindow.document.execCommand("inserthtml", false, '<img src="' + url + '" />'); 
                }
            } 
            else 
            { 
                if (type== "url")
                {
                    richtextarea.contentWindow.document.execCommand("CreateLink",true); 
                }
                else if (type == "image")
                {
                    richtextarea.contentWindow.document.execCommand("InsertImage",true);
                }
            }
        } 
        return button;
    }
	
	function set_textbox()
	{
		textarea.value = richtextarea.contentWindow.document.body.innerHTML;
	}
	
	function get_richtextbox()
	{
		var richtextarea = document.createElement('iframe');		
		richtextarea.style.width = textarea.style.width;
		richtextarea.style.height = textarea.style.height;
		return richtextarea;
	}
	
	var richtextarea = get_richtextbox();
	
	var bar = document.createElement('div');
	textarea.parentNode.appendChild(bar);
	bar.appendChild(format_button('<b>B</b>','bold'));
	bar.appendChild(format_button('<i>I</i>','italic'));
	bar.appendChild(format_button('<u>U</u>','underline'));	
	bar.appendChild(url_button('URL', 'url'));	
	bar.appendChild(url_button('IMG', 'image'));	
	textarea.parentNode.appendChild(richtextarea);
	textarea.style.display = "none";

	richtextarea.contentWindow.document.designMode = "on";

	if (richtextarea.contentWindow.attachEvent) // IE
	{
		richtextarea.contentWindow.attachEvent('onload', function()	
		{
			richtextarea.contentWindow.document.designMode = "on";
			richtextarea.contentWindow.document.body.innerHTML = textarea.value;
		});
		textarea.form.attachEvent('onsubmit', set_textbox);
	}
	else
	{

		if (window.globalStorage) // FireFox
		{

			richtextarea.contentWindow.addEventListener('load', function()	
			{
				richtextarea.contentWindow.document.designMode = "on";
				richtextarea.contentWindow.document.body.innerHTML = textarea.value;
			}, false);
		}
		else // Chrome/Safari/Opera
		{
			richtextarea.contentWindow.addEventListener('load', setTimeout(function()	
			{
				richtextarea.contentWindow.document.designMode = "on";
				richtextarea.contentWindow.document.body.innerHTML = textarea.value;
			}, 0), false);
		}
		textarea.form.addEventListener('submit', set_textbox, false);
	} 
}
			
function loadTextboxes()
{
	var textareas = document.getElementsByTagName('textarea');
	
	for(var i=0; i < textareas.length; i++)
	{
		if (textareas.item(i).className == "richtextbox")
		{
			richtextbox(textareas.item(i));
		}
	}				
}

if (window.attachEvent) {
	window.attachEvent('onload',loadTextboxes);
} else {
	window.addEventListener('load',loadTextboxes, false);
}