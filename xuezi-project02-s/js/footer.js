(()=>{
	var link=document.createElement("link");
	link.rel="stylesheet";
	link.href="css/footer.css";
	document.head.appendChild(link);
	ajax({
		type:"get",
		url:"footer.html"
	}).then(html=>{
		document.getElementById("footer").innerHTML=html;
	});
})();