(()=>{
	var link=document.createElement("link");
	link.href="css/header.css";
	link.rel="stylesheet";
	document.head.appendChild(link);
	ajax({
		type:"get",
		url:"header.html"
	}).then(html=>{
		document.getElementById("header").innerHTML=html;
		
		var btnSearch=
			document.querySelector("[data-trigger=search]");
		var txtSearch=document.getElementById("txtSearch");
		btnSearch.onclick=function(){
			var kw=txtSearch.value;
			if(kw.trim()!==""){
				var url="products.html?kw="+kw;
				//open(url,"_self");
				location.href=url;
				//location.assign(url);
			}
		}
		txtSearch.onkeyup=function(e){
			if(e.keyCode==13)
				btnSearch.onclick();
		}
		if(location.search!==""){
			txtSearch.value=decodeURI(location.search.split("=")[1]);
		}
	});
})();